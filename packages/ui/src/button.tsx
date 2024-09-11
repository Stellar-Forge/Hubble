"use client";

import { toast } from "sonner";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
    return (
        <button
            className={className}
            onClick={() => toast(`Hello from your ${appName} app!`)}
        >
            {children}
        </button>
    );
};
