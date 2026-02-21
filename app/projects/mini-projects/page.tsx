"use client"
import Link from "next/link"
import Image from "next/image"
import { FiGithub } from "react-icons/fi"
import { IoIosLink } from "react-icons/io"
import miniProjects from "@/lib/miniProjects"

export default function MiniProjects() {
  return (
    <div className="flex flex-col items-center w-full py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <div className="">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo2 dark:text-[#acbacf] text-[#4e201c] block">mini projects
            </h1>
            <span className=" pl-64 inline text-sm italic dark:text-[#acbacf] text-[#4e201c]"> i made while learning stuff~</span>
          </div>
          <Link
            href="/projects"
            className="
            px-4 py-2 dark:text-[#acbacf] text-[#4e201c] italic"
          >
            <span className="inline hover:underline">back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {miniProjects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col bg-slate-100/50 dark:bg-slate-800/30 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <Image
                  className="w-full h-48 object-contain hover:scale-105 transition-transform duration-500"
                  src={project.image}
                  height={400}
                  width={600}
                  alt={project.name}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-exo2 font-semibold mb-2">{project.name}</h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md dark:bg-slate-700/70 bg-slate-200/80 hover:bg-slate-300/70 dark:hover:bg-slate-600/70 transition-all duration-300 text-sm flex-grow text-center justify-center"
                  >
                    <IoIosLink size={16} />
                    <span>Live Link</span>
                  </a>
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-md dark:bg-slate-700/70 bg-slate-200/80 hover:bg-slate-300/70 dark:hover:bg-slate-600/70 transition-all duration-300"
                  >
                    <FiGithub size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}