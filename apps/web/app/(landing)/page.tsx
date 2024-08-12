"use client";

import { useRouter } from "next/navigation";

export default function Landing() {
    const router: any = useRouter();

    return (
        <div>
            Landing <br />
            <br />
            <button onClick={() => router.push("/home")}>WEB</button> <br />
            <button onClick={() => router.push("http://localhost:3000/")}>
                STUDIO
            </button>
        </div>
    );
}
