"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@hubble/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient(): JSX.Element {
  const session = useSession();
  const router = useRouter()

  return (
   <div>
      <Appbar router={router} onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}