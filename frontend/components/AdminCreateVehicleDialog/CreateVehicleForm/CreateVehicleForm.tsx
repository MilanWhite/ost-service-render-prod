import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateVehicleForm, {
    CreateVehicleInfo,
    CreateVehicleMedia,
} from "../../../hooks/useCreateVehicleForm";

import { XMarkIcon } from "@heroicons/react/20/solid";

import ErrorBanner from "../../ErrorBanner";
import ErrorText from "../../ErrorText";

import { useCreateVehicle } from "../../../contexts/CreateVehicleContext";
import { User } from "../../../hooks/interfaces";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const createVehicleSchema = z.object({
    vehicleName: z
        .string()
        .trim()
        .min(1, { message: "AuthenticatedView.Errors.vehicle_name_required" }),

    lotNumber: z.string().trim(),

    auctionName: z.string().trim(),

    location: z.string().trim(),

    shippingStatus: z.string().trim(),

    priceDelivery: z
        .string()
        .trim()
        .regex(/^(?:\d+(?:\.\d{1,2})?)?$/, { // empty input is valid
            message: "AuthenticatedView.Errors.delivery_price_invalid",
        }),

    priceShipping: z
        .string()
        .trim()
        .regex(/^(?:\d+(?:\.\d{1,2})?)?$/, {
            message: "AuthenticatedView.Errors.shipping_price_invalid",
        }),

    deliveryAddress: z.string().trim(),

    portOfOrigin: z.string().trim(),

    portOfDestination: z.string().trim(),

    containerNumber: z.string().trim(),

    receiverId: z.string().trim(),
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
    const [billOfLandingDocument, setBillOfLandingDocument] =
        useState<File | null>(null);

    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);

    const onSubmit = async (data: FormData) => {
        const createVehicleInfo: CreateVehicleInfo = {
            lotNumber: data.lotNumber,
            auctionName: data.auctionName,
            location: data.location,
            shippingStatus: data.shippingStatus,
            priceDelivery: data.priceDelivery,
            priceShipping: data.priceShipping,
            vehicleName: data.vehicleName,

            // new fields
            deliveryAddress: data.deliveryAddress,
            portOfOrigin: data.portOfOrigin,
            portOfDestination: data.portOfDestination,
            containerNumber: data.containerNumber,
            receiverId: data.receiverId,
        };

        const createVehicleMedia: CreateVehicleMedia = {
            images: images,
            videos: videos,
            billOfSaleDocument: billOfSaleDocument,
            titleDocument: titleDocument,
            billOfLandingDocument: billOfLandingDocument,
        };

        await createVehicle(
            createVehicleInfo,
            createVehicleMedia,
            vehicleRefetch
        );
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (!image) return;
        setImages([...images, image]);
        e.target.value = "";
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

    const handleBillOfLandingUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const billOfLanding = e.target.files && e.target.files[0];
        if (!billOfLanding) return;
        setBillOfLandingDocument(billOfLanding);
        e.target.value = "";
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createVehicleSchema),
        defaultValues: { shippingStatus: "Auction" },
    });

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
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-700"
                            />
                        </div>

                        {images.map((image, index) => (
                            <div key={index} className="flex my-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImages((prev) =>
                                            prev.filter((_, i) => i !== index)
                                        );
                                    }}
                                    className="cursor-pointer text-red-700"
                                >
                                    <XMarkIcon className="w-4" />
                                </button>
                                <p className="text-sm text-gray-700">
                                    {image.name}
                                </p>
                            </div>
                        ))}
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
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
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
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="receiverId"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("AuthenticatedView.reciever_id")}
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
                                    {t("AuthenticatedView.bill_of_landing")}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .txt"
                                    onChange={handleBillOfLandingUpload}
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                            {billOfLandingDocument && (
                                <div className="flex my-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBillOfLandingDocument(null);
                                        }}
                                        className="cursor-pointer text-red-700"
                                    >
                                        <XMarkIcon className="w-4" />
                                    </button>

                                    <p className="text-sm text-gray-700">
                                        {billOfLandingDocument.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="submit"
                        onClick={() => {
                            // closeCreateVehicle();
                        }}
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
