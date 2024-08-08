"use client"

import { Card } from "@hubble/ui/signupCard"
import { signIn } from "next-auth/react";

export default function() {

    return <>
        <Card onSignIn={signIn}/>
    </>
} 