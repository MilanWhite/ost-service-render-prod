import { ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

interface Props {
    children: ReactNode;
}

const ErrorBanner = ({ children }: Props) => {
    return (
        <div className=" mb-10 p-4 w-[100%] rounded-md bg-red-50  ">
            <div className="flex">
                <div className="shrink-0">
                    <XCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-400"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                        {children}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ErrorBanner;
