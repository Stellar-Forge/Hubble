import WorkspaceLanding from "../../components/WorkspaceLanding";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function() {

    const session = await getServerSession()
    if (!session?.user){
      redirect("/api/auth/signin")
    } 
    return <div>
        <WorkspaceLanding/>
    </div>
}