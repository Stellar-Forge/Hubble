import { signup } from "@hubble/actions/signup";
import { toast } from "sonner";

interface UserParams {
    username: string;
    email: string;
    password: string;
    onSignIn: () => void;
}

export function Button({ username, email, password, onSignIn }: UserParams) {
    return (
        <button
            onClick={async () => {
                const res = await signup({ username, email, password });
                if (res.success) {
                    toast.success(res.msg);
                    setTimeout(onSignIn, 1500);
                } else {
                    toast.error(res.msg);
                }
                console.log(
                    `This is the client receiving the response: ${res}`,
                );
            }}
            type="button"
            className="mt-8 w-full text-[#F3F3F2] bg-black focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2"
        >
            Sign Up
        </button>
    );
}
