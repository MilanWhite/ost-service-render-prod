import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RoundedButton = ({ children, type, disabled, onClick }: Props) => {
    return (
        <button
            type={type}
            className="cursor-pointer rounded-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs disabled:opacity-75 disabled:cursor-not-allowed hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default RoundedButton;
