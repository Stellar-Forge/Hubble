import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Home() {
    const session = await checkAuth();

    console.log(session?.user);
    return <div>STUDIO DASHBOARD</div>;
}
