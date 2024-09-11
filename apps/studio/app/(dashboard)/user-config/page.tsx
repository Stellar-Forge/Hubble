import { Content } from "@hubble/ui/Content";
import { checkAuth } from "@hubble/actions/checkAuth";

export default async function Page() {
    console.log("INSIDE PAGE");
    await checkAuth();

    return (
        <>
            <Content />
        </>
    );
}
