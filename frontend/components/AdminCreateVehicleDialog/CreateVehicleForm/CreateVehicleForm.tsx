import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateVehicleForm, {
    CreateVehicleInfo,
    CreateVehicleMedia,
} from "../../../hooks/useCreateVehicleForm";

import useDecodeVin from "../../../hooks/useDecodeVin";

import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import ErrorBanner from "../../ErrorBanner";
import ErrorText from "../../ErrorText";

import { useCreateVehicle } from "../../../contexts/CreateVehicleContext";
import { User } from "../../../hooks/interfaces";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ZipImagePreview from "../../ZipImagePreviewer";

export const createVehicleSchema = z.object({
    vehicleName: z
        .string()
        .trim()
        .min(1, { message: "AuthenticatedView.Errors.vehicle_name_required" })
        .max(100, { message: "AuthenticatedView.Errors.exceeded_length" }),

    lotNumber: z
        .string()
        .trim()
        .max(50, { message: "AuthenticatedView.Errors.exceeded_length" }),

    auctionName: z
        .string()
        .trim()
        .max(100, { message: "AuthenticatedView.Errors.exceeded_length" }),

    location: z
        .string()
        .trim()
        .max(100, { message: "AuthenticatedView.Errors.exceeded_length" }),

    shippingStatus: z
        .string()
        .trim()
        .max(50, { message: "AuthenticatedView.Errors.exceeded_length" }),

    // ─── Prices (regex unchanged) ─────────────────────────────────────────────
    priceDelivery: z
        .string()
        .trim()
        .regex(/^(?:\d+(?:\.\d{1,2})?)?$/, {
            message: "AuthenticatedView.Errors.delivery_price_invalid",
        }),

    priceShipping: z
        .string()
        .trim()
        .regex(/^(?:\d+(?:\.\d{1,2})?)?$/, {
            message: "AuthenticatedView.Errors.shipping_price_invalid",
        }),

    // ─── Logistics / Dispatch ────────────────────────────────────────────────
    deliveryAddress: z.string().trim(),

    portOfOrigin: z
        .string()
        .trim()
        .max(255, { message: "AuthenticatedView.Errors.exceeded_length" }),

    portOfDestination: z
        .string()
        .trim()
        .max(255, { message: "AuthenticatedView.Errors.exceeded_length" }),

    containerNumber: z
        .string()
        .trim()
        .max(20, { message: "AuthenticatedView.Errors.exceeded_length" }),

    receiverId: z
        .string()
        .trim()
        .max(255, { message: "AuthenticatedView.Errors.exceeded_length" }),

    // ─── Vehicle Details ─────────────────────────────────────────────────────
    vin: z.string()
        .trim()
        .toUpperCase()
        .regex(/^[A-HJ-NPR-Z0-9]{17}$/, { message: "AuthenticatedView.Errors.invalid_vin" }),

    powertrain: z
        .string()
        .trim()
        .max(50, { message: "AuthenticatedView.Errors.exceeded_length" }),

    model: z
        .string()
        .trim()
        .max(100, { message: "AuthenticatedView.Errors.exceeded_length" }),

    color: z
        .string()
        .trim()
        .max(30, { message: "AuthenticatedView.Errors.exceeded_length" }),
});

type FormData = z.infer<typeof createVehicleSchema>;

interface Props {
    user: User;
    vehicleRefetch: () => void;
}

const CreateVehicleForm = ({ user, vehicleRefetch }: Props) => {
    const { t } = useTranslation();

    const { createVehicle, isCreateVehicleLoading, createVehicleError } =
        useCreateVehicleForm(user);

    const { closeCreateVehicle } = useCreateVehicle();

    const [billOfSaleDocument, setBillOfSaleDocument] = useState<File | null>(
        null
    );
    const [titleDocument, setTitleDocument] = useState<File | null>(null);
    const [billOfLadingDocument, setBillOfLadingDocument] =
        useState<File | null>(null);
    const [swbReleaseDocument, setSWBReleaseDocument] = useState<File | null>(
        null
    );

    const [files, setFiles] = useState<File[]>([]);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    const [videos, setVideos] = useState<File[]>([]);

    const onSubmit = async (data: FormData) => {
        if (files.length === 0) {
            setImageError("AuthenticatedView.Errors.image_required");
            return;
        }

        setImageError(null);

        const createVehicleInfo: CreateVehicleInfo = {
            lotNumber: data.lotNumber,
            auctionName: data.auctionName,
            location: data.location,
            shippingStatus: data.shippingStatus,
            priceDelivery: data.priceDelivery,
            priceShipping: data.priceShipping,
            vehicleName: data.vehicleName,

            deliveryAddress: data.deliveryAddress,
            portOfOrigin: data.portOfOrigin,
            portOfDestination: data.portOfDestination,
            containerNumber: data.containerNumber,
            receiverId: data.receiverId,

            vin: data.vin,
            powertrain: data.powertrain,
            model: data.model,
            color: data.color,
        };

        const createVehicleMedia: CreateVehicleMedia = {
            images: files,
            thumbnail: thumbnail,
            videos: videos,
            billOfSaleDocument: billOfSaleDocument,
            titleDocument: titleDocument,
            billOfLadingDocument: billOfLadingDocument,
            swbReleaseDocument: swbReleaseDocument,
        };

        await createVehicle(
            createVehicleInfo,
            createVehicleMedia,
            vehicleRefetch
        );
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = e.target.files && e.target.files[0];
        if (!video) return;
        setVideos([...videos, video]);
        e.target.value = "";
    };

    const handleBillOfSaleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const billOfSale = e.target.files && e.target.files[0];
        if (!billOfSale) return;
        setBillOfSaleDocument(billOfSale);
        e.target.value = "";
    };

    const handleTitleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.files && e.target.files[0];
        if (!title) return;
        setTitleDocument(title);
        e.target.value = "";
    };

    const handleBillOfLadingUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const billOfLading = e.target.files && e.target.files[0];
        if (!billOfLading) return;
        setBillOfLadingDocument(billOfLading);
        e.target.value = "";
    };

    const handleSWBReleaseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const swbRelease = e.target.files && e.target.files[0];
        if (!swbRelease) return;
        setSWBReleaseDocument(swbRelease);
        e.target.value = "";
    };

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createVehicleSchema),
        defaultValues: { shippingStatus: "Auction" },
    });

    // VIN DECODE LOGIC
    const [vinState, setVinState] = useState<string>("");
    const watched_vin = watch("vin")
    useEffect(() => {
        setVinState(watched_vin);
        console.log(vinState)
    }, [watched_vin])

    const {decodeVin, decodedVin, isDecoding, decodeError} = useDecodeVin()

    useEffect(() => {
        const newPowertrain = decodedVin?.powertrain
        if (newPowertrain) {
            setValue('powertrain', newPowertrain, { shouldValidate: true });
        }
        const newModel = decodedVin?.model
        if (newModel) {
            setValue('model', newModel, { shouldValidate: true });
        }

        const newMake = decodedVin?.make
        const newModelYear = decodedVin?.modelYear
        if (newModel && newMake && newModelYear) {
            setValue('vehicleName', `${newModelYear} ${newMake} ${newModel}`, { shouldValidate: true });
        }

    console.log(newPowertrain, newModel)

    }, [decodedVin])



    return (
        <>
            <form
                action="#"
                method="POST"
                className="relative px-6 py-6 lg:px-8 lg:pb-12"
                onSubmit={handleSubmit(onSubmit)}
            >
                {createVehicleError && (
                    <ErrorBanner>{t(createVehicleError as string)}</ErrorBanner>
                )}

                <div>
                    <div className="mb-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                {t("AuthenticatedView.upload_images")}
                            </label>

                            <ZipImagePreview
                                files={files}
                                setFiles={setFiles}
                                thumbnail={thumbnail}
                                setThumbnail={setThumbnail}
                            />
                            <ErrorText>
                                {imageError && t(imageError as string)}
                            </ErrorText>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                {t("AuthenticatedView.upload_videos")}
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                multiple
                                onChange={handleVideoUpload}
                                className="block w-full text-sm text-gray-700"
                            />
                        </div>

                        {videos.map((video, index) => (
                            <div key={index} className="flex mt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setVideos((prev) =>
                                            prev.filter((_, i) => i !== index)
                                        );
                                    }}
                                    className="cursor-pointer text-red-700"
                                >
                                    <XMarkIcon className="w-4" />
                                </button>
                                <p className="text-sm text-gray-700">
                                    {video.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="vin"
                        className="block text-sm/6 font-semibold text-gray-900"
                    >
                        {t("AuthenticatedView.vin")}
                    </label>

                    <div className="flex w-full items-start gap-3 mt-2.5">
                        <input
                            id="vin"
                            type="text"
                            autoComplete="vin"
                            className="flex-1 min-w-0 rounded-md bg-white px-3.5 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                            {...register("vin")}
                        />

                        <button
                            type="button"
                            onClick={async () => {await decodeVin(vinState)}}
                            className="shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover disabled:opacity-75 disabled:cursor-not-allowed"
                            disabled={isDecoding}
                        >
                            <MagnifyingGlassIcon className="w-5"/>
                        </button>
                    </div>

                    <ErrorText>
                        {errors.vin && t(errors.vin.message as string)}
                    </ErrorText>
                    <ErrorText>
                        {decodeError && t(decodeError as string)}
                    </ErrorText>
                </div>
                <label className="block mt-4 mb-2 font-medium">
                    {t("AuthenticatedView.general_info")}
                </label>
                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg pb-4">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="vehicleName"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.vehicle_name")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="vehicleName"
                                    type="vehicleName"
                                    autoComplete="vehicleName"
                                    className={`block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${decodedVin?.make && decodedVin?.model && decodedVin?.modelYear && "bg-green-50"}`}
                                    {...register("vehicleName")}
                                />
                                <ErrorText>
                                    {errors.vehicleName &&
                                        t(errors.vehicleName.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="lotNumber"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.lot_number")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="lotNumber"
                                    type="lotNumber"
                                    autoComplete="lotNumber"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("lotNumber")}
                                />
                                <ErrorText>
                                    {errors.lotNumber &&
                                        t(errors.lotNumber.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="auctionName"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.auction_name")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="auctionName"
                                    type="auctionName"
                                    autoComplete="auctionName"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("auctionName")}
                                />
                                <ErrorText>
                                    {errors.auctionName &&
                                        t(errors.auctionName.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="location"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.location")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="location"
                                    type="location"
                                    autoComplete="location"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("location")}
                                />
                                <ErrorText>
                                    {errors.location &&
                                        t(errors.location.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="shippingStatus"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.shipping_status")}
                            </label>
                            <div className="mt-2.5 grid grid-cols-1">
                                <select
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    id="shippingStatus"
                                    {...register("shippingStatus")}
                                >
                                    <option value="Auction">
                                        {t("AuthenticatedView.auction")}
                                    </option>
                                    <option value="In transit">
                                        {t("AuthenticatedView.in_transit")}
                                    </option>
                                    <option value="Out for Delivery">
                                        {t(
                                            "AuthenticatedView.out_for_delivery"
                                        )}
                                    </option>
                                    <option value="Delivered">
                                        {t("AuthenticatedView.delivered")}
                                    </option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>
                        {/* Prices  */}
                        <div className="sm:col-span-2 mt-4 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="priceShipping"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.price_delivery")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                            $
                                        </div>
                                        <input
                                            id="priceDelivery"
                                            type="number"
                                            autoComplete="priceDelivery"
                                            placeholder="0.00"
                                            aria-describedby="price-currency"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("priceDelivery")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.priceDelivery &&
                                            t(
                                                errors.priceDelivery
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="priceShipping"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.price_shipping")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                            $
                                        </div>
                                        <input
                                            id="priceShipping"
                                            type="number"
                                            autoComplete="priceShipping"
                                            placeholder="0.00"
                                            aria-describedby="price-currency"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("priceShipping")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.priceShipping &&
                                            t(
                                                errors.priceShipping
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="powertrain"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.powertrain")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="powertrain"
                                    type="powertrain"
                                    autoComplete="powertrain"
                                    className={`block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${decodedVin?.powertrain && "bg-green-50"}`}
                                    {...register("powertrain")}
                                />
                                <ErrorText>
                                    {errors.powertrain &&
                                        t(errors.powertrain.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="model"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.model")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="model"
                                    type="model"
                                    autoComplete="model"
                                    className={`block w-full rounded-md px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${decodedVin?.model && "bg-green-50"}`}
                                    {...register("model")}
                                />
                                <ErrorText>
                                    {errors.model &&
                                        t(errors.model.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="color"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.color")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="color"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("color")}
                                />
                                <ErrorText>
                                    {errors.color &&
                                        t(errors.color.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <label className="block mt-4 mb-2 font-medium">
                            {t("AuthenticatedView.dispatch_info")}
                        </label>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="deliveryAddress"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.delivery_address")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="deliveryAddress"
                                    type="deliveryAddress"
                                    autoComplete="deliveryAddress"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("deliveryAddress")}
                                />
                                <ErrorText>
                                    {errors.deliveryAddress &&
                                        t(
                                            errors.deliveryAddress
                                                .message as string
                                        )}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="portOfOrigin"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.port_of_origin")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <input
                                            id="portOfOrigin"
                                            type="portOfOrigin"
                                            autoComplete="portOfOrigin"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("portOfOrigin")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.portOfOrigin &&
                                            t(
                                                errors.portOfOrigin
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="portOfDestination"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.port_of_destination")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <input
                                            id="portOfDestination"
                                            type="portOfDestination"
                                            autoComplete="portOfDestination"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("portOfDestination")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.portOfDestination &&
                                            t(
                                                errors.portOfDestination
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="containerNumber"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.container_number")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <input
                                            id="containerNumber"
                                            type="containerNumber"
                                            autoComplete="containerNumber"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("containerNumber")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.containerNumber &&
                                            t(
                                                errors.containerNumber
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="receiverId"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.receiver_id")}
                                </label>

                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                                        <input
                                            id="receiverId"
                                            type="receiverId"
                                            autoComplete="receiverId"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            {...register("receiverId")}
                                        />
                                    </div>
                                    <ErrorText>
                                        {errors.receiverId &&
                                            t(
                                                errors.receiverId
                                                    .message as string
                                            )}
                                    </ErrorText>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="mt-4">
                        <div className="mb-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    {t("AuthenticatedView.bill_of_sale")}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .txt"
                                    onChange={handleBillOfSaleUpload}
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                            {billOfSaleDocument && (
                                <div className="flex my-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBillOfSaleDocument(null);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <XMarkIcon className="w-4" />
                                    </button>

                                    <p className="text-sm text-gray-700">
                                        {billOfSaleDocument.name}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    {t("AuthenticatedView.title_document")}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .txt"
                                    onChange={handleTitleUpload}
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                            {titleDocument && (
                                <div className="flex my-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTitleDocument(null);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <XMarkIcon className="w-4" />
                                    </button>

                                    <p className="text-sm text-gray-700">
                                        {titleDocument.name}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    {t("AuthenticatedView.bill_of_lading")}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .txt"
                                    onChange={handleBillOfLadingUpload}
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                            {billOfLadingDocument && (
                                <div className="flex my-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBillOfLadingDocument(null);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <XMarkIcon className="w-4" />
                                    </button>

                                    <p className="text-sm text-gray-700">
                                        {billOfLadingDocument.name}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    {t(
                                        "AuthenticatedView.swb_release_document"
                                    )}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .txt"
                                    onChange={handleSWBReleaseUpload}
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                            {swbReleaseDocument && (
                                <div className="flex my-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSWBReleaseDocument(null);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <XMarkIcon className="w-4" />
                                    </button>

                                    <p className="text-sm text-gray-700">
                                        {swbReleaseDocument.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="submit"
                        // onClick={}
                        disabled={isCreateVehicleLoading}
                        className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover disabled:opacity-75 disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
                    >
                        {t("AuthenticatedView.add_vehicle")}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            closeCreateVehicle();
                        }}
                        disabled={isCreateVehicleLoading}
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-75 disabled:cursor-not-allowed sm:mt-0 sm:w-auto mt-3"
                    >
                        {t("AuthenticatedView.cancel")}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateVehicleForm;
