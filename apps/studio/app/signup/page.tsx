"use client"

import { Card } from "@repo/ui/signupCard"
import { signIn } from "next-auth/react";

export default function() {

    return <>
        <Card onSignIn={signIn}/>
    </>
} 