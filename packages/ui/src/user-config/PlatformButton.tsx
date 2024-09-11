"use client";

import { useState } from "react";
import { toast } from "sonner";

export function PlatformButton({
    platform,
    apiKey,
    deleteAPIKey,
    savedKeys,
}: {
    platform: string;
    apiKey: string;
    deleteAPIKey: any;
    savedKeys: any;
}) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <div>
                <button onClick={() => setIsVisible(!isVisible)}>
                    {platform}
                </button>
            </div>
            <div>
                {isVisible && (
                    <div>
                        Your Saved API Key For {platform} is {apiKey}
                        <br />
                        <button
                            onClick={async () => {
                                const res = await deleteAPIKey(platform);
                                if (res) {
                                    toast.success(
                                        `Your API For ${platform} Is Deleted Successfully!`,
                                    );
                                    await savedKeys();
                                }
                            }}
                        >
                            Delete API Key
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
