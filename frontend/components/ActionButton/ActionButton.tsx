import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton = ({ children, type, onClick }: Props) => {
    return (
        <button
            type={type}
            className="block cursor-pointer rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ActionButton;
