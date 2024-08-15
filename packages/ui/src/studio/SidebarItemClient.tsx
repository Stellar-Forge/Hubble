"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import "./style.css";

export const SidebarItem = ({
    href,
    title,
    icon,
}: {
    href: string;
    title: string;
    icon: React.ReactNode;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div className="group">
            <div
                className={`flex ${selected ? "text-[#F3F3F2] bg-black " : "text-black"} cursor-pointer p-4 text-lg border-b hover:bg-black hover:text-[#F3F3F2] border-black w-full`}
                onClick={() => {
                    router.push(href);
                }}
            >
                <div className="pr-2">{icon}</div>
                <div
                    className={`font-medium ${selected ? "text-[#F3F3F2]" : "text-black"} group-hover:text-[#F3F3F2] group hover-parent`}
                >
                    <span className="underline-transition relative inline-block">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
};
