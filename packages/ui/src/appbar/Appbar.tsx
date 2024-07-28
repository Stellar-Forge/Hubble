import { Button } from "./Button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: what type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 w-full">
        <div className="text-lg flex flex-col justify-center">
            Hubble
        </div>
        <div className="flex items-center space-x-10">
            <div>
                {user?.name}
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    </div>
}