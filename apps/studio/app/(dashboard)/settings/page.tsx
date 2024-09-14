"use client";

import { getUserInfo } from "@hubble/actions/getUserInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
    const [userInfo, setUserInfo] = useState<any>();

    const router = useRouter();

    useEffect(() => {
        async function retrieveData() {
            const userInfo = await getUserInfo();
            setUserInfo(userInfo);
        }

        retrieveData();
    }, []);

    return (
        <div>
            <div>
                <div className="flex flex-col">
                    Your Profile:
                    <div>Username: {userInfo?.username}</div>
                    <div>First Name: {userInfo?.firstName}</div>
                    <div>Last Name: {userInfo?.lastName}</div>
                </div>
                <button onClick={() => router.push("http://localhost:3001/")}>
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
