import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="text-[#F3F3F2] bg-black font-bold text-xl px-7 py-2.5 me-2 mb-2 rounded-[40px] transition-all hover:rounded-xl ease-in-out duration-300"
        >
            {children}
        </button>
    );
};
