"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export function Appbar2(): JSX.Element {
  const session = useSession();
  console.log(session.data?.user)
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}
