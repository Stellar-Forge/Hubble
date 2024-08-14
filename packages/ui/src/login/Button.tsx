"use client";

import { signIn } from "next-auth/react";

interface UserParams {
    username?: string;
    password?: string;
    authType: string;
}

function mapAuthType(authType: string) {
    if (authType === "credentials") return "Log In";
    else if (authType === "google") return "Continue With Google";
    else return "Continue With Github";
}

export function Button({ username, password, authType }: UserParams) {
    return (
        <div>
            <button
                onClick={async () => {
                    if (authType === "credentials") {
                        await signIn(authType, {
                            username,
                            password,
                            redirect: true,
                        });
                    } else await signIn(authType);
                }}
                type="button"
                className="mt-8 w-full text-[#F3F3F2] bg-black focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2"
            >
                {mapAuthType(authType)}
            </button>
        </div>
    );
}
