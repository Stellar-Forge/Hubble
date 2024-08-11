import { Button } from "./Button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: what type should be here?
    onSignin: any,
    onSignout: any,
    router: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    router
}: AppbarProps) => {
    return <div className="flex justify-between px-4 w-full bg-gradient-to-t from-[#7096D1] to-[#334EAC]">
        <div className="text-lg flex flex-col justify-center items-center ml-10 ">
            <a href="/" className="font-bold text-[#F7F2EB]">Hubble</a>
        </div>
        <div className="flex items-center space-x-10 mr-10 my-2">
            <div>
                <a href="/" className="text-[#F7F2EB] font-medium">{user?.name}</a>
            </div>
            <div className="flex justify-center pt-2">

                {user ? "" : <Button onClick={() => router.push("/signup")}>Signup</Button>}
                
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>

            </div>
        </div>
    </div>
}