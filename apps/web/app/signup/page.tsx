"use client";

import { SignupCard } from "@hubble/ui/SignupCard";
import { signIn } from "next-auth/react";

export default function Page() {
    return (
        <>
            <SignupCard onSignIn={signIn} />
        </>
    );
}
