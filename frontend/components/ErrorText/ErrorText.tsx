import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ErrorText = ({ children }: Props) => {
    return (
        <div className="pt-2 text-sm text-red-500 rounded-lg" role="alert">
            {children}
        </div>
    );
};

export default ErrorText;
