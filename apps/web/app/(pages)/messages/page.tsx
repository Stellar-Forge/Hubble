import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Landing() {
    await checkAuth();

    return (
        <div>
            Messages
            <br />
            Personal Inbox for User and Sidebar to redirect to other routes
        </div>
    );
}
