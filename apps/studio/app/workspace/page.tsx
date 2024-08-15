import WorkspaceLanding from "@hubble/ui/WorkspaceLanding";
import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Page() {
    await checkAuth();

    return (
        <div>
            <WorkspaceLanding />
        </div>
    );
}
