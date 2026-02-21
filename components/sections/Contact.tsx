import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin, SlSocialTwitter } from "react-icons/sl";

const socials = [
    { href: "https://www.linkedin.com/in/sahilkr04", icon: SlSocialLinkedin, label: "LinkedIn" },
    { href: "https://github.com/sahiwl", icon: FiGithub, label: "GitHub" },
    { href: "http://twitter.com/sahilwithocd", icon: SlSocialTwitter, label: "Twitter" },
];

export default function Contact() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <p className="text-sm uppercase tracking-widest dark:text-[#00ADB5] text-[#4e201c] font-exo2 mb-3">
                    what&apos;s next
                </p>
                <h2 className="text-4xl md:text-5xl font-exo2 font-bold dark:text-[#acbacf] text-[#4e201c] mb-6">
                    Let&apos;s connect.
                </h2>
                <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto">
                    Got a project in mind, want to collaborate, or just want to say hi?
                    My inbox is always open.
                </p>

                <a
                    href="mailto:work.saahilkr@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg dark:bg-[#00ADB5] bg-[#4e201c] text-white font-exo2 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg mb-8"
                >
                    <IoMailOutline size={20} />
                    <span>work.saahilkr@gmail.com</span>
                </a>

                <div className="flex items-center justify-center gap-5 mb-6">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full dark:bg-slate-800/50 bg-slate-200/50 dark:text-[#acbacf] text-[#4e201c] hover:scale-110 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300"
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>

                <Link
                    href="/links"
                    className="text-sm dark:text-[#00ADB5] text-[#4e201c] hover:underline font-exo2 transition-all duration-300"
                >
                    find me everywhere →
                </Link>
            </div>
        </section>
    );
}
