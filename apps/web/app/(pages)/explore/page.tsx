import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Landing() {
    await checkAuth();

    return (
        <div>
            Explore
            <br />
            Random posts album curated for user and Sidebar to redirect to other
            routes
        </div>
    );
}
