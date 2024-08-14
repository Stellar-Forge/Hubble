import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Landing() {
    await checkAuth();

    return (
        <div>
            Notifications
            <br />
            All notifications about new follows, likes, comments etc... and
            Sidebar to redirect to other routes
        </div>
    );
}
