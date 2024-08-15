"use client";

import { useSession } from "next-auth/react";

export default function Landing() {
    const session = useSession();
    console.log(session);
    return (
        <header className="h-screen flex flex-row grow items-center justify-center">
            <div className="text-center -mt-56">
                <h1 className=" text-9xl font-bold drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)] transition hover:drop-shadow-[10px_10px_5px_rgba(0,0,0,0.45)] ease-out duration-500">Hubble</h1>
                <div className="flex justify-center">
                    <p className="mt-4 font-medium max-w-[50%] ">
                        Imagine a world where every post, every image, and every video is a unique piece of AI-generated art. Welcome to Hubble, where the future of social media is unfolding!
                    </p>
                </div>
            </div>
        </header>
    );
}
