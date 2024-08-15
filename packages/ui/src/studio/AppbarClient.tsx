"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@hubble/ui/appbar";

export function AppbarClient(): JSX.Element {
    const session = useSession();

    return (
        <div>
            <Appbar
                onSignin={signIn}
                onSignout={signOut}
                user={session.data?.user}
            />
        </div>
    );
}
