import { useTranslation } from "react-i18next";
import { translateStatus, Vehicle } from "../../hooks/interfaces";

import ImageCarousel from "../ImageCarousel";

interface Props {
    vehicle: Vehicle;
}

const UserVehiclePage = ({ vehicle }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:max-w-8xl lg:px-8">
                <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                    {/* Image section */}
                    <div className="lg:col-span-4 lg:row-end-1">
                        <ImageCarousel
                            images={vehicle.vehicleImages!}
                            videos={vehicle.vehicleVideos!}
                        />
                    </div>

                    {/* Info & actions section */}
                    <div className="w-full mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                        {/* Title & Edit Controls */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {vehicle?.vehicle_name}
                            </h1>
                        </div>

                        {/* Details sections */}
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium text-gray-900">
                                {t("AuthenticatedView.price")}
                            </h3>
                            <div className="mt-4 grid grid-cols-2 gap-x-4">
                                {/* Delivery Price */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.price_delivery")}
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        ${vehicle?.price_delivery}
                                    </p>
                                </div>

                                {/* Shipping Price */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.price_shipping")}
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        ${vehicle?.price_shipping}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium text-gray-900">
                                {t("AuthenticatedView.general_info")}
                            </h3>
                            <div className="mt-4 space-y-4">
                                {/* Location */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.location")}
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.location}
                                    </p>
                                </div>

                                {/* Auction Name */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.auction_name")}
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.auction_name}
                                    </p>
                                </div>

                                {/* Lot # */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.lot_number")}
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.receiver_id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium text-gray-900">
                                {t("AuthenticatedView.shipping_status")}
                            </h3>
                            <div className="mt-4">
                                <p className="text-gray-900">
                                    {t(
                                        translateStatus(
                                            vehicle?.shipping_status
                                        ) as string
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Logistics / Shipping Details Section */}
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-medium text-gray-900">
                                {t(
                                    "AuthenticatedView.logistics_shipping_details"
                                )}
                            </h3>
                            <div className="mt-4 space-y-4">
                                {/* Container Number */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t(
                                            "AuthenticatedView.container_number"
                                        )}
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.container_number}
                                    </p>
                                </div>

                                {/* Port of Origin */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.port_of_origin")}
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.port_of_origin}
                                    </p>
                                </div>

                                {/* Port of Destination */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t(
                                            "AuthenticatedView.port_of_destination"
                                        )}
                                    </p>

                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.port_of_destination}
                                    </p>
                                </div>

                                {/* Delivery Address */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t(
                                            "AuthenticatedView.delivery_address"
                                        )}
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.delivery_address}
                                    </p>
                                </div>

                                {/* Receiver ID */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.receiver_id")}
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {vehicle?.receiver_id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="border-t border-gray-200 pt-8 lg:col-span-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {t("AuthenticatedView.documents")}
                        </h3>
                        <div className="mt-4 space-y-4 text-sm font-medium">
                            {/* Bill of Sale */}
                            {vehicle.vehicleBillOfSaleDocument && (
                                <div>
                                    <a
                                        href={vehicle.vehicleBillOfSaleDocument}
                                        target="_blank"
                                        rel="noopener"
                                        className="text-primary hover:text-primary-hover"
                                    >
                                        {t(
                                            "AuthenticatedView.view_bill_of_sale"
                                        )}
                                    </a>
                                </div>
                            )}
                            {/* Title Document */}
                            {vehicle.vehicleTitleDocument && (
                                <div className="flex">
                                    <a
                                        href={vehicle.vehicleTitleDocument}
                                        target="_blank"
                                        rel="noopener"
                                        className="text-primary hover:text-primary-hover"
                                    >
                                        {t(
                                            "AuthenticatedView.view_title_document"
                                        )}
                                    </a>
                                </div>
                            )}
                            {/* Bill of Lading # */}
                            {vehicle.vehicleBillOfLadingDocument && (
                                <div>
                                    <a
                                        href={
                                            vehicle.vehicleBillOfLadingDocument
                                        }
                                        target="_blank"
                                        rel="noopener"
                                        className="text-primary hover:text-primary-hover"
                                    >
                                        {t(
                                            "AuthenticatedView.view_bill_of_lading"
                                        )}
                                    </a>
                                </div>
                            )}
                            {/* Sea Waybill Release # */}
                            {vehicle.vehicleSWBReleaseDocument && (
                                <div>
                                    <a
                                        href={
                                            vehicle.vehicleSWBReleaseDocument
                                        }
                                        target="_blank"
                                        rel="noopener"
                                        className="text-primary hover:text-primary-hover"
                                    >
                                        {t(
                                            "AuthenticatedView.view_swb_release_document"
                                        )}
                                    </a>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserVehiclePage;
