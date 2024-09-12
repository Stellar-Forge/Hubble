import { toast } from "sonner";

export function Loader() {
    return <div className="m-7 text-xl font-bold">Generating Response...</div>;
}

let toastId: any;
export function LoadingAlert(isLoading: boolean) {
    if (isLoading) toastId = toast.loading("Waiting For Response...");
    else toast.dismiss(toastId);
}
