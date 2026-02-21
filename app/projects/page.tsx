"use client";
import Image from "next/image";
import allProjects from "../../lib/allProjects";
import { FiGithub } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="flex flex-col items-center w-full py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo2 dark:text-[#acbacf] text-[#4e201c]">projects</h1>
          <Link
            href="/projects/mini-projects"
            className="px-4 py-2 dark:text-[#acbacf] text-[#4e201c] italic hover:underline"
          >
            mini-projects?
          </Link>
        </div>

        <div className="space-y-24">
          {allProjects.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-8 lg:gap-16"
              >
                <div className="lg:w-1/2">
                  <h3 className="text-3xl py-3 font-exo2">{data.name}</h3>
                  <p className="text-lg opacity-90 mb-6">
                    {data.description}
                  </p>

                  <div className="flex flex-wrap -ml-2 mb-6">
                    {data.skills?.map((skills, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center pt-2 transition-all ease-in-out duration-300 mx-2"
                      >
                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-full backdrop-blur-3xl dark:bg-slate-800/70 bg-black/10 grid place-items-center hover:-translate-y-2 transition-all m-2 duration-200">
                          <img
                            src={skills.url}
                            height="25"
                            width="25"
                            alt={skills.name}
                            loading="lazy"
                          />
                        </div>
                        <p className="text-sm mt-1">{skills.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-6 mt-4">
                    <a
                      href={data.appLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-slate-800/50 bg-slate-200/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <IoIosLink size={20} />
                      <span>Live Link</span>
                    </a>
                    <a
                      href={data.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-slate-800/50 bg-slate-200/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <FiGithub size={18} />
                      <span>Repo</span>
                    </a>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image
                      className="w-full h-auto hover:scale-105 transition-transform duration-500"
                      src={data.image}
                      height={800}
                      width={800}
                      alt={data.name}
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
