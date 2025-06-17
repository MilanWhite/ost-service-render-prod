import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useEditVehicle } from "../../hooks/useEditVehicle";
import { Vehicle, translateStatus } from "../../hooks/interfaces";
import { URLS } from "../../src/config/navigation";
import ErrorBanner from "../ErrorBanner";

interface Props {
    vehicle: Vehicle;
}

const AdminVehicleItemCard = ({ vehicle: initial }: Props) => {
    const { t } = useTranslation();

    const {
        vehicle,
        isEditing,
        isEditVehicleLoading,
        editVehicleError,
        startEditing,
        cancelEditing,
        handleChange,
        saveChanges,
    } = useEditVehicle(initial, false);

    const handleSave = async () => {
        await saveChanges();
    };

    return (
        <section aria-labelledby="vehicle-heading" className="mt-6">
            {editVehicleError && (
                <ErrorBanner>{t(editVehicleError)}</ErrorBanner>
            )}

            <h2 id="vehicle-heading" className="sr-only">
                {t("AuthenticatedView.vehicle_info")}
            </h2>

            <div
                key={initial.id}
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
                            {isEditing ? (
                                <>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t("AuthenticatedView.vehicle_name")}
                                    </label>
                                    <input
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                        value={vehicle.vehicle_name}
                                        onChange={handleChange("vehicle_name")}
                                    />
                                    
                                    <label className="block text-sm font-medium text-gray-700 mt-4">
                                        {t("AuthenticatedView.price_delivery")}
                                    </label>
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                            $
                                        </div>
                                        <input
                                            type="number"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            value={vehicle.price_delivery}
                                            onChange={handleChange(
                                                "price_delivery"
                                            )}
                                        />
                                        <div
                                            id="price-currency"
                                            className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                                        >
                                            USD
                                        </div>
                                    </div>

                                    <label className="block text-sm font-medium text-gray-700 mt-4">
                                        {t("AuthenticatedView.price_shipping")}
                                    </label>
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                            $
                                        </div>
                                        <input
                                            type="number"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            value={vehicle.price_shipping}
                                            onChange={handleChange(
                                                "price_shipping"
                                            )}
                                        />
                                        <div
                                            id="price-currency"
                                            className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                                        >
                                            USD
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-base font-medium text-gray-900">
                                        {vehicle.vehicle_name}
                                    </h3>
                                    <p className="mt-2 text-sm font-small text-gray-900">
                                        {t("AuthenticatedView.price_delivery")}:
                                        ${vehicle.price_delivery}
                                    </p>
                                    <p className="mt-2 text-sm font-small text-gray-900">
                                        {t("AuthenticatedView.price_shipping")}:
                                        ${vehicle.price_shipping}
                                    </p>
                                </>
                            )}
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
                                        {isEditing ? (
                                            <>
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={vehicle.location}
                                                    onChange={handleChange(
                                                        "location"
                                                    )}
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={vehicle.auction_name}
                                                    onChange={handleChange(
                                                        "auction_name"
                                                    )}
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={vehicle.lot_number}
                                                    onChange={handleChange(
                                                        "lot_number"
                                                    )}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="block">
                                                    {vehicle.location}
                                                </span>
                                                <span className="block">
                                                    {vehicle.auction_name}
                                                </span>
                                                <span className="block">
                                                    {vehicle.lot_number}
                                                </span>
                                            </>
                                        )}
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
                                        {isEditing ? (
                                            <>
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={
                                                        vehicle.container_number
                                                    }
                                                    onChange={handleChange(
                                                        "container_number"
                                                    )}
                                                    placeholder="Container Number"
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={
                                                        vehicle.port_of_origin
                                                    }
                                                    onChange={handleChange(
                                                        "port_of_origin"
                                                    )}
                                                    placeholder="Port of Origin"
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={
                                                        vehicle.port_of_destination
                                                    }
                                                    onChange={handleChange(
                                                        "port_of_destination"
                                                    )}
                                                    placeholder="Port of Destination"
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={
                                                        vehicle.delivery_address
                                                    }
                                                    onChange={handleChange(
                                                        "delivery_address"
                                                    )}
                                                    placeholder="Delivery Address"
                                                />
                                                <input
                                                    className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                    value={vehicle.receiver_id}
                                                    onChange={handleChange(
                                                        "receiver_id"
                                                    )}
                                                    placeholder="Receiver ID"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="block">
                                                    {vehicle.container_number}
                                                </span>
                                                <span className="block">
                                                    {vehicle.port_of_origin}
                                                </span>
                                                <span className="block">
                                                    {
                                                        vehicle.port_of_destination
                                                    }
                                                </span>
                                                <span className="block">
                                                    {vehicle.delivery_address}
                                                </span>
                                                <span className="block">
                                                    {vehicle.receiver_id}
                                                </span>
                                            </>
                                        )}
                                    </dd>
                                </div>

                                {/* Status */}
                                <div className="lg:w-50">
                                    <dt className="font-medium text-gray-900">
                                        {t("AuthenticatedView.shipping_status")}
                                    </dt>
                                    <dd className="mt-3 space-y-2 text-gray-500">
                                        {isEditing ? (
                                            <>
                                                <div className="mt-2 grid grid-cols-1">
                                                    <select
                                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                                        value={
                                                            vehicle.shipping_status
                                                        }
                                                        onChange={handleChange(
                                                            "shipping_status"
                                                        )}
                                                    >
                                                        <option value="Auction">
                                                            {t(
                                                                "AuthenticatedView.auction"
                                                            )}
                                                        </option>
                                                        <option value="In transit">
                                                            {t(
                                                                "AuthenticatedView.in_transit"
                                                            )}
                                                        </option>
                                                        <option value="Out for delivery">
                                                            {t(
                                                                "AuthenticatedView.out_for_delivery"
                                                            )}
                                                        </option>
                                                        <option value="Delivered">
                                                            {t(
                                                                "AuthenticatedView.delivered"
                                                            )}
                                                        </option>
                                                    </select>
                                                    <ChevronDownIcon
                                                        aria-hidden="true"
                                                        className="pointer-events-none col-start-1 row-start-1 mr-2 h-5 w-5 self-center justify-self-end text-gray-500 sm:h-4 sm:w-4"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <p>
                                                {t(
                                                    translateStatus(
                                                        vehicle.shipping_status
                                                    ) as string
                                                )}
                                            </p>
                                        )}
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                {/* Action Btns */}
                <div className="sm:absolute right-8 bottom-8">
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isEditVehicleLoading}
                                    className="cursor-pointer inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-75 sm:ml-3 sm:w-auto"
                                >
                                    {isEditVehicleLoading
                                        ? t("AuthenticatedView.saving")
                                        : t("AuthenticatedView.save")}
                                </button>
                                <button
                                    onClick={cancelEditing}
                                    disabled={isEditVehicleLoading}
                                    className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 sm:mt-0 sm:w-auto"
                                >
                                    {t("AuthenticatedView.cancel")}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={URLS.adminViewClientSingularVehicle(
                                        vehicle.cognito_sub,
                                        vehicle.id.toString()
                                    )}
                                >
                                    <button
                                        className="cursor-pointer inline-flex w-full cursor-pointer justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover sm:ml-3 sm:w-auto"
                                        type="button"
                                    >
                                        {t("AuthenticatedView.view")}
                                    </button>
                                </Link>
                                <button
                                    onClick={startEditing}
                                    className="cursor-pointer mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    type="button"
                                >
                                    {t("AuthenticatedView.edit")}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminVehicleItemCard;
