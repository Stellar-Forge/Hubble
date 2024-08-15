import { ChangeEventHandler, useState } from "react";
import { Button } from "./Button";
import "./style.css";

interface CardProps {
    // TODO: what type should be here?
    onSignIn: any;
}

export function SignupCard({ onSignIn }: CardProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="block max-w-sm p-6 rounded-lg  border-2 border-black bg-[#F3F3F2] drop-shadow-[25px_25px_15px_rgba(0,0,0,0.45)]">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-extrabold">
                                Sign up
                            </div>
                        </div>
                        <div className="pt-2">
                            <LabelledInput
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                label="Username"
                                placeholder="Username"
                            />
                            <LabelledInput
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                label="Email"
                                placeholder="Email"
                            />
                            <LabelledInput
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type={"password"}
                                placeholder="Password"
                            />
                            <Button
                                username={username}
                                email={email}
                                password={password}
                                onSignIn={onSignIn}
                            />
                        </div>
                        <div className="m-5">
                            Already have an account?
                            <br />
                            <div className="flex justify-center">
                                <a
                                    href="/auth/login"
                                    className="cursor-pointer"
                                >
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LabelledInput({
    label,
    placeholder,
    type,
    onChange,
}: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                className="bg-[#F3F3F2] border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
