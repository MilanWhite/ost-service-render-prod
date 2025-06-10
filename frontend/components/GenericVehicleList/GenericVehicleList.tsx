import { Link } from "react-router-dom";
import { RecentVehicle, translateStatus } from "../../hooks/interfaces";
import { URLS } from "../../src/config/navigation";
import { TruckIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface Props {
    title: string;
    vehicles: RecentVehicle[];
    type: "Admin" | "User";
}

const GenericVehicleList = ({ title, vehicles, type }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-base font-semibold text-gray-900">
                {t(title as string)}
            </h1>

            <div className="px-5 rounded-lg border border-gray-200 shadow-sm mt-4 ">
                <ul role="list" className="divide-y divide-gray-100">
                    {vehicles.map((vehicle) => (
                        <li
                            key={vehicle.id}
                            className="flex justify-between gap-x-6 py-5"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="flex justify-center rounded-sm w-12 h-12 bg-primary-100">
                                    <TruckIcon className="w-7 text-primary" />
                                </div>
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                        {vehicle.vehicleName}
                                    </p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                                        {vehicle.userEmail ??
                                            t(
                                                translateStatus(
                                                    vehicle.shippingStatus
                                                ) as string
                                            )}
                                    </p>
                                </div>
                            </div>
                            <div className="justify-center shrink-0 flex flex-col items-end">
                                <Link
                                    to={
                                        type === "User"
                                            ? URLS.regularUserViewUserSingularVehicle(
                                                  vehicle.id
                                              )
                                            : URLS.adminViewClientSingularVehicle(
                                                  vehicle.cognitoSub,
                                                  vehicle.id
                                              )
                                    }
                                >
                                    <p className="text-sm text-primary font-semibold hover:text-primary-hover">
                                        {t("AuthenticatedView.view")}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default GenericVehicleList;
