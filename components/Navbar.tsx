"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FiHeadphones, FiSun } from "react-icons/fi";
import { PiMoonFill } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { MobileNav } from "./MobileNavbar";

export const navLinks = [
  { href: "/about", label: "About", icon: <LuUser size={20} /> },
  { href: "/links", label: "Links", icon: <IoIosLink size={22} /> },
  {
    href: "/projects",
    label: "Projects",
    icon: <LiaLaptopCodeSolid size={25} />,
  },
  { href: "/listensto", label: "ListensTo", icon: <FiHeadphones size={20} /> },
];

export const NavLinks = () => {
  return (
    <div>
      <ul className="md:flex md:items-center dark:text-[#00adb5] text-[#4e201c] sm:flex-wrap md:justify-around gap-x-6 gap-y-4">
        {navLinks.map((link, index) => (
          <li key={index}>
            <div className="relative inline-flex py-1 items-center group hover:scale-110 duration-300 ease-in-out">
              {/* Button */}
              <Link href={link.href}>
                <button className="rounded-lg flex items-center justify-center">
                  {link.icon}
                </button>
              </Link>
              {/* Tooltip */}
              <div className="dark:bg-slate-800 bg-zinc-700 absolute -left-7 top-full ml-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-white text-sm px-3 py-1 rounded-lg shadow-lg">
                {link.label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Navbar = function () {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    console.log("toggleNavbar");
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {/* Mobile Navbar (visible only on small screens) */}
      <MobileNav />

      {/* Old Navbar (visible only on medium and larger screens) */}
      <div className="hidden md:block">
        <article className="w-full flex gap-4 justify-center mb-6 p-2">
          <section className="w-1/2 p-2 rounded-lg mb-12 fixed top-4 z-100 border-[1px] shadow-xl dark:border-neutral-800 border-neutral-200 backdrop-blur-md">
            <div className="flex items-center justify-between mx-auto w-full dark:text-[#00ADB5] text-[#4e201c] px-2">
              <div className="hover:scale-110 duration-300 ease-in-out -translate-y-0.5">
                <Link href="/">
                  <h1 className="font-exo2">sahiwl</h1>
                </Link>
              </div>
              <nav className="w-1/3 py-1 justify-end">
                <div className="hidden justify-around md:flex">
                  <NavLinks />
                </div>
                <div className="md:hidden">
                  <button onClick={toggleNavbar}>
                    {isOpen ? <X /> : <Menu />}
                  </button>
                </div>
              </nav>
              <div className="">
                {mounted === true && (
                  <button
                    className="w-full flex justify-center items-center shadow-sm dark:bg-transparent hover:shadow-xl rounded-sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    <div className="p-2">
                      {theme === "dark" ? <FiSun /> : <PiMoonFill />}
                    </div>
                  </button>
                )}
              </div>
            </div>
            {/* Mobile navigation links - visible when isOpen is true */}
            {isOpen && (
              <div className="md:hidden flex basis-full flex-col items-center">
                <NavLinks />
              </div>
            )}
          </section>
        </article>
      </div>
    </>
  )
}