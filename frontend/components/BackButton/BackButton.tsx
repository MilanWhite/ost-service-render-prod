import { Link } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";

interface Props {
    href: string;
    text?: string;
}

const BackButton = ({ text, href }: Props) => {
    return (
        <>
            <div className="flex pb-2 mb-4 sm:mb-6">
                <Link className="text-gray-500 hover:text-gray-400" to={href}>
                    <ArrowLeftIcon className="w-6" />
                    <p className="text-md font-semibold pl-1">{text}</p>
                </Link>
            </div>
        </>
    );
};

export default BackButton;
