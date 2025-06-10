import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { URLS } from "../../src/config/navigation";

interface Props {
    children: ReactNode;
}

const LoginWrapper = ({ children }: Props) => {
    return (
        <Link to={URLS.login} className="w-[100%] sm:w-auto">
            {children}
        </Link>
    );
};

export default LoginWrapper;
