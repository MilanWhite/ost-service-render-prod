import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CanceledError } from "axios";

import ImageCarousel from "../ImageCarousel";
import ZipImagePreviewer from "../ZipImagePreviewer";
import AdminDeleteVehicleDialog from "../AdminDeleteVehicleDialog";
import ErrorBanner from "../ErrorBanner";

import { useEditVehicle } from "../../hooks/useEditVehicle";
import { translateStatus, Vehicle } from "../../hooks/interfaces";

interface Props {
    vehicle: Vehicle;
}

const AdminVehiclePage = ({ vehicle: initial }: Props) => {
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
    } = useEditVehicle(initial, true);

    // image editor states
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [thumb] = useState<File | null>(null); // thumbnail picking disabled

    // create vehicle File out of URL
    useEffect(() => {
        let cancelled = false;

        (async () => {
            const urls = initial.vehicleImages ?? [];
            if (urls.length === 0) {
                if (!cancelled) setImageFiles([]);
                return;
            }

            // Fetch each URL; return null on error
            const filePromises = urls.map(async (rawUrl) => {
                const [url] = rawUrl.split("?");
                try {
                    const res = await fetch(rawUrl);
                    if (!res.ok) return null; //
                    const blob = await res.blob();
                    const name = url.split("/").pop()!;
                    return new File([blob], name, { type: blob.type });
                } catch {
                    return null; // network err etc.
                }
            });

            const files = (await Promise.all(filePromises)).filter(
                // filter failures we dont want THAT!
                (f): f is File => f !== null
            );

            if (!cancelled) {
                setImageFiles(files);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [initial.vehicleImages]);

    const normName = (u: string) =>
        decodeURIComponent(u.split("/").pop()!.split("?")[0])
          .replace(/\+/g, " ")
          .toLowerCase();

    // determine existing & deleted files
    const { toAdd, toDelete } = useMemo(() => {
        const originalNames = new Set(
          (initial.vehicleImages ?? []).map(normName)
        );
      
        const add = imageFiles.filter(f => !originalNames.has(normName(f.name)));
      
        const del = (initial.vehicleImages ?? []).filter(
          url => !imageFiles.some(f => normName(url) === normName(f.name))
        );
      
        return { toAdd: add, toDelete: del };
      }, [imageFiles, initial.vehicleImages]);

    const [saveError, setSaveError] = useState<string | null>(null);

    const handleSave = async () => {
        setSaveError(null);

        try {
            await saveChanges({ newImages: toAdd, deleteKeys: toDelete });

            window.location.reload();
        } catch (err) {
            if (err instanceof CanceledError) return;

            setSaveError("AuthenticatedView.Errors.failed_to_edit_vehicle");
        }
    };

    const [isDeleteVehicleDialogOpen, setDeleteVehicleDialogOpen] =
        useState(false);

    return (
        <>
            {(editVehicleError || saveError) && (
                <ErrorBanner>
                    {t((editVehicleError ?? saveError) as string)}
                </ErrorBanner>
            )}

            <AdminDeleteVehicleDialog
                vehicle={vehicle}
                isDeleteVehicleDialogOpen={isDeleteVehicleDialogOpen}
                setDeleteVehicleDialogOpen={setDeleteVehicleDialogOpen}
            />

            <div className="bg-white">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:max-w-8xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                        <div className="lg:col-span-4 lg:row-end-1">
                            <ImageCarousel
                                images={vehicle.vehicleImages ?? []}
                                videos={vehicle.vehicleVideos ?? []}
                            />
                        </div>
                        <div className="w-full mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                {/* title */}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={vehicle?.vehicle_name}
                                        onChange={handleChange("vehicle_name")}
                                        className="block w-full font-bold rounded-md bg-white px-3 py-1 text-2xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-3xl"
                                    />
                                ) : (
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                        {vehicle?.vehicle_name}
                                    </h1>
                                )}
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
                                            {t(
                                                "AuthenticatedView.price_delivery"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                                    $
                                                </div>
                                                <input
                                                    type="number"
                                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md/6"
                                                    value={
                                                        vehicle.price_delivery
                                                    }
                                                    onChange={handleChange(
                                                        "price_delivery"
                                                    )}
                                                />
                                                <div
                                                    id="price-currency"
                                                    className="shrink-0 text-md text-gray-500 select-none sm:text-sm/6"
                                                >
                                                    USD
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                ${vehicle?.price_delivery}
                                            </p>
                                        )}
                                    </div>

                                    {/* Shipping Price */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t(
                                                "AuthenticatedView.price_shipping"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                                    $
                                                </div>
                                                <input
                                                    type="number"
                                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md/6"
                                                    value={
                                                        vehicle.price_shipping
                                                    }
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
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                ${vehicle?.price_shipping}
                                            </p>
                                        )}
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
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.location}
                                                onChange={handleChange(
                                                    "location"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.location}
                                            </p>
                                        )}
                                    </div>

                                    {/* Auction Name */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t(
                                                "AuthenticatedView.auction_name"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.auction_name}
                                                onChange={handleChange(
                                                    "auction_name"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.auction_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Lot # */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t("AuthenticatedView.lot_number")}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.lot_number}
                                                onChange={handleChange(
                                                    "lot_number"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.receiver_id}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {t("AuthenticatedView.shipping_status")}
                                </h3>
                                <div className="mt-4">
                                    {isEditing ? (
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.shipping_status}
                                                onChange={handleChange(
                                                    "shipping_status"
                                                )}
                                            >
                                                <option>
                                                    {t(
                                                        "AuthenticatedView.auction"
                                                    )}
                                                </option>
                                                <option>
                                                    {t(
                                                        "AuthenticatedView.in_transit"
                                                    )}
                                                </option>
                                                <option>
                                                    {t(
                                                        "AuthenticatedView.out_for_delivery"
                                                    )}
                                                </option>
                                                <option>
                                                    {t(
                                                        "AuthenticatedView.delivered"
                                                    )}
                                                </option>
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-gray-900">
                                            {t(
                                                translateStatus(
                                                    vehicle?.shipping_status
                                                ) as string
                                            )}
                                        </p>
                                    )}
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
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.container_number}
                                                onChange={handleChange(
                                                    "container_number"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.container_number}
                                            </p>
                                        )}
                                    </div>

                                    {/* Port of Origin */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t(
                                                "AuthenticatedView.port_of_origin"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.port_of_origin}
                                                onChange={handleChange(
                                                    "port_of_origin"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.port_of_origin}
                                            </p>
                                        )}
                                    </div>

                                    {/* Port of Destination */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t(
                                                "AuthenticatedView.port_of_destination"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={
                                                    vehicle.port_of_destination
                                                }
                                                onChange={handleChange(
                                                    "port_of_destination"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.port_of_destination}
                                            </p>
                                        )}
                                    </div>

                                    {/* Delivery Address */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t(
                                                "AuthenticatedView.delivery_address"
                                            )}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.delivery_address}
                                                onChange={handleChange(
                                                    "delivery_address"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.delivery_address}
                                            </p>
                                        )}
                                    </div>

                                    {/* Receiver ID */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {t("AuthenticatedView.reciever_id")}
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md bg-white px-2 py-1 text-md text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-md/6"
                                                value={vehicle.receiver_id}
                                                onChange={handleChange(
                                                    "receiver_id"
                                                )}
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-900">
                                                {vehicle?.receiver_id}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons  */}
                            <div className="mt-8">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={cancelEditing}
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-75 sm:mt-0 sm:w-auto mt-3"
                                            disabled={isEditVehicleLoading}
                                        >
                                            {t("AuthenticatedView.cancel")}
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isEditVehicleLoading}
                                            className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover disabled:opacity-75 sm:ml-3 sm:w-auto"
                                        >
                                            {isEditVehicleLoading
                                                ? t("AuthenticatedView.saving")
                                                : t("AuthenticatedView.save")}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={startEditing}
                                            className="rounded bg-white w-full px-5 py-2 text-sm font-semibold text-gray-900 shadow ring-1 ring-gray-300 hover:bg-gray-50"
                                        >
                                            {t("AuthenticatedView.edit")}
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteVehicleDialogOpen(true)
                                            }
                                            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto"
                                        >
                                            {t("AuthenticatedView.delete")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Editor */}

                        {isEditing && (
                            <div className="border-t border-gray-200 lg:col-span-4">
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {t("AuthenticatedView.edit_images")}
                                    </h3>
                                    <ZipImagePreviewer
                                        files={imageFiles}
                                        setFiles={setImageFiles}
                                        thumbnail={thumb}
                                        setThumbnail={() => {}}
                                        disableThumbnailSelection
                                    />
                                </div>
                            </div>
                        )}

                        {/* Documents */}

                        <div className="mt-8 border-t border-gray-200 pt-8 lg:col-span-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {t("AuthenticatedView.documents")}
                            </h3>
                            <div className="mt-4 space-y-4 text-sm font-medium">
                                {vehicle.vehicleBillOfSaleDocument && (
                                    <div>
                                        <a
                                            href={
                                                vehicle.vehicleBillOfSaleDocument
                                            }
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
                                {vehicle.vehicleTitleDocument && (
                                    <div>
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
                                {vehicle.vehicleBillOfLandingDocument && (
                                    <div>
                                        <a
                                            href={
                                                vehicle.vehicleBillOfLandingDocument
                                            }
                                            target="_blank"
                                            rel="noopener"
                                            className="text-primary hover:text-primary-hover"
                                        >
                                            {t(
                                                "AuthenticatedView.view_bill_of_landing"
                                            )}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminVehiclePage;
