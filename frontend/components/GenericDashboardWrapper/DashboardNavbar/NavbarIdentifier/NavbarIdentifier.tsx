import { MenuButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getAvatarSrc } from "../../../../src/config/AvatarConfig";

import { useAuthenticator } from "@aws-amplify/ui-react";

const NavbarIdentifier = () => {

    const { user } = useAuthenticator((ctx) => [ctx.user]);

    return (
        <>
            {" "}
            <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                    alt=""
                    src={getAvatarSrc(user.signInDetails?.loginId)}
                    className="size-8 rounded-full bg-gray-50"
                />

                <span className="hidden lg:flex lg:items-center">
                    <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                    >
                        {user.signInDetails?.loginId ?? ""}
                    </span>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                    />
                </span>
            </MenuButton>
        </>
    );
};

export default NavbarIdentifier;
