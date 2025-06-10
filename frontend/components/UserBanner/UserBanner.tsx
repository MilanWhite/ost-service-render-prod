import { getAvatarSrc } from "../../src/config/AvatarConfig";

import { User } from "../../hooks/interfaces";
import { useCreateVehicle } from "../../contexts/CreateVehicleContext";
import { useTranslation } from "react-i18next";

interface Props {
    user: User;
}

const UserBanner = ({ user }: Props) => {
    const { t } = useTranslation();

    const { openCreateVehicle } = useCreateVehicle();

    return (
        <>
            <div className="bg-white">
                <h2 id="profile-overview-title" className="sr-only">
                    Profile Overview
                </h2>

                <div className="bg-white pb-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                            <div className="shrink-0">
                                <img
                                    alt=""
                                    src={getAvatarSrc(user.email)}
                                    className="mx-auto size-20 rounded-full"
                                />
                            </div>
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {user.username}
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                    {user.email}
                                </p>
                                <p className="text-xs font-medium text-gray-600 mt-0.5">
                                    {user.phone_number}
                                </p>
                            </div>
                        </div>
                        <div className=" mt-5 flex justify-center sm:mt-0">
                            <button
                                onClick={openCreateVehicle}
                                className="cursor-pointer ml-2 rounded bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
                            >
                                {t("AuthenticatedView.add_vehicle")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserBanner;
