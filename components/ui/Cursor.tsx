"use client";
import React, { useEffect, useRef, useState } from "react";

type CatState = "idle" | "walking-right" | "walking-left";

export default function Cursor() {
  const [catPos, setCatPos] = useState({ x: 100, y: 100 });
  const [catState, setCatState] = useState<CatState>("idle");
  const catPosRef = useRef({ x: 100, y: 100 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [isVisible]);

  // Animate cat walking toward mouse
  useEffect(() => {
    let animFrame: number;
    const speed = 4.5;
    const stopDistance = 25;

    const tick = () => {
      const cat = catPosRef.current;
      const mouse = mousePosRef.current;
      const dx = mouse.x - cat.x;
      const dy = mouse.y - cat.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > stopDistance) {
        const newX = cat.x + (dx / dist) * speed;
        const newY = cat.y + (dy / dist) * speed;
        catPosRef.current = { x: newX, y: newY };
        setCatPos({ x: newX, y: newY });
        setCatState(dx > 0 ? "walking-right" : "walking-left");
      } else {
        setCatState("idle");
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  if (!isVisible) return null;

  const isWalking = catState !== "idle";
  const flipX = catState === "walking-left";
  const gifSrc = isWalking ? "/cat/black_walk_8fps.gif" : "/cat/black_idle_8fps.gif";

  return (
    <div
      className="fixed top-0 left-0 z-50 pointer-events-none select-none"
      style={{
        transform: `translate(${catPos.x - 32}px, ${catPos.y - 32}px)`,
        willChange: "transform",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gifSrc}
        alt=""
        width={64}
        height={64}
        style={{
          imageRendering: "pixelated",
          transform: flipX ? "scaleX(-1)" : "none",
        }}
      />
    </div>
  );
}
