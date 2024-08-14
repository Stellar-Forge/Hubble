import { Button } from "./Button";
import { Pill } from "./Pill";

interface AppbarProps {
    user?: {
        name?: string | null;
    };
    // TODO: what type should be here?
    onSignin: any;
    onSignout: any;
    router: any;
}

export const Appbar = ({ user, onSignin, onSignout, router }: AppbarProps) => {
    return (
        <div className="flex justify-between px-4 w-full">
            <div className="text-lg flex flex-col justify-center ml-5">
                <a href="/" className="font-bold text-4xl drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)]">
                    Hubble
                </a>
            </div>
            <div className="flex justify-center items-center pr-4">
                <Pill />
            </div>
            <div className="flex items-center space-x-10 drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]">
                <div className="flex justify-center pt-2">
                    {/* {user ? (
                        ""
                    ) : (
                        <Button onClick={() => router.push("/signup")}>
                            Signup
                        </Button>
                    )} */}

                    <Button onClick={user ? onSignout : onSignin}>
                        {user ? "Logout" : "Login"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
