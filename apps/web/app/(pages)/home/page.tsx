import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Landing() {
    await checkAuth();

    return (
        <div>
            Home
            <br />
            Feed and Sidebar to redirect to other routes
        </div>
    );
}
