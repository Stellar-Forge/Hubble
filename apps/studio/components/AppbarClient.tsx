"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient(): JSX.Element {
  const session = useSession();
  const router = useRouter()
  console.log(session.data?.user)
  return (
   <div>
      <Appbar router={router} onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}
