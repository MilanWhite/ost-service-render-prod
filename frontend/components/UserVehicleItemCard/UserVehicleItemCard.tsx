import { Link } from "react-router-dom";
import { translateStatus, Vehicle } from "../../hooks/interfaces";
import { URLS } from "../../src/config/navigation";
import { useTranslation } from "react-i18next";

interface Props {
    vehicle: Vehicle;
}

const UserVehicleItemCard = ({ vehicle }: Props) => {
    const { t } = useTranslation();

    return (
        <section aria-labelledby="vehicle-heading" className="mt-6">
            <h2 id="vehicle-heading" className="sr-only">
                {t("AuthenticatedView.vehicle_info")}
            </h2>

            <div
                key={vehicle.id}
                className="sm:relative border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border"
            >
                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    {/* LEFT: image + basic info */}
                    <div className="sm:flex lg:col-span-5">
                        <img
                            alt={vehicle.vehicle_name}
                            src={
                                vehicle.vehicleThumbnail
                                    ? vehicle.vehicleThumbnail
                                    : undefined
                            }
                            className="aspect-square w-full shrink-0 rounded-lg object-cover sm:size-40"
                        />

                        <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
                            <h3 className="text-base font-medium text-gray-900">
                                {vehicle.vehicle_name}
                            </h3>
                            <p className="mt-2 text-sm font-small text-gray-900">
                                {t("AuthenticatedView.price_delivery")}: $
                                {vehicle.price_delivery}
                            </p>
                            <p className="mt-2 text-sm font-small text-gray-900">
                                {t("AuthenticatedView.price_shipping")}: $
                                {vehicle.price_shipping}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: details + actions */}
                    <div className="mt-6 lg:col-span-7 lg:mt-0">
                        <dl className="grid grid-cols-1 gap-x-6 text-sm">
                            {/* Location / Auction / Lot # */}
                            <div className="space-y-4 lg:flex space-x-10">
                                <div className="lg:w-50">
                                    <dt className="font-medium text-gray-900 ">
                                        {t(
                                            "AuthenticatedView.location_auction_lot_number"
                                        )}
                                    </dt>
                                    <dd className="mt-3 space-y-1 text-gray-500">
                                        <span className="block">
                                            {vehicle.location}
                                        </span>
                                        <span className="block">
                                            {vehicle.auction_name}
                                        </span>
                                        <span className="block">
                                            {vehicle.lot_number}
                                        </span>
                                    </dd>
                                </div>
                                {/* Logistics / Dispatch Info */}
                                <div className="lg:w-70 block lg:hidden xl:block">
                                    <dt className="font-medium text-gray-900">
                                        {t(
                                            "AuthenticatedView.cont_po_pd_deliv_add_rec_id"
                                        )}
                                    </dt>
                                    <dd className="mt-3 space-y-1 text-gray-500 ">
                                        <span className="block">
                                            {vehicle.container_number}
                                        </span>
                                        <span className="block">
                                            {vehicle.port_of_origin}
                                        </span>
                                        <span className="block">
                                            {vehicle.port_of_destination}
                                        </span>
                                        <span className="block">
                                            {vehicle.delivery_address}
                                        </span>
                                        <span className="block">
                                            {vehicle.receiver_id}
                                        </span>
                                    </dd>
                                </div>

                                {/* Status */}
                                <div className="lg:w-50">
                                    <dt className="font-medium text-gray-900">
                                        {t("AuthenticatedView.shipping_status")}
                                    </dt>
                                    <dd className="mt-3 space-y-2 text-gray-500">
                                        <p>
                                            {t(
                                                translateStatus(
                                                    vehicle.shipping_status
                                                ) as string
                                            )}
                                        </p>
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="sm:absolute right-8 bottom-8">
                    <div className="mt-5sm:mt-4 sm:flex sm:flex-row-reverse">
                        <Link
                            to={URLS.regularUserViewUserSingularVehicle(
                                vehicle.id.toString()
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => {}}
                                className="cursor-pointer inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover sm:ml-3 sm:w-auto"
                            >
                                {t("AuthenticatedView.view")}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserVehicleItemCard;
