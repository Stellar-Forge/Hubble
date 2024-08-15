"use client";

import { useSession } from "next-auth/react";

export default function Landing() {
    const session = useSession();
    console.log(session);
    return (
        <div>
            Landing
            <br />
        </div>
    );
}
