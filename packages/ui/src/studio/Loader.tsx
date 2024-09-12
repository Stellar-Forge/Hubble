import { toast } from "sonner";

export function Loader() {
    return <div className="m-7 text-xl font-bold">Generating Response...</div>;
}

let toastId: any;
export function LoadingAlert(isLoading: boolean, content?: string) {
    if (isLoading)
        toastId = toast.loading(content || "Waiting For Response...");
    else toast.dismiss(toastId);
}
