import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { User } from "./interfaces";
import { useCreateVehicle } from "../contexts/CreateVehicleContext";

export interface CreateVehicleInfo {
    lotNumber: string;
    auctionName: string;
    location: string;
    shippingStatus: string;
    priceDelivery: string;
    priceShipping: string;
    vehicleName: string;

    // new fields
    deliveryAddress: string,
    portOfOrigin: string,
    portOfDestination: string,
    containerNumber: string,
    receiverId: string,
}

export interface CreateVehicleMedia {
    images: File[];
    thumbnail: File | null;
    videos: File[];
    billOfSaleDocument: File | null;
    titleDocument: File | null;
    billOfLadingDocument: File | null;
    swbReleaseDocument: File | null;
}

const useCreateVehicleForm = (user: User) => {

    const {closeCreateVehicle, setShowCreateVehicleSuccess} = useCreateVehicle();

    const [createVehicleError, setCreateVehicleError] = useState<string | null>(null);
    const [isCreateVehicleLoading, setCreateVehicleLoading] = useState(false);

    const createVehicle = async (createVehicleInfo: CreateVehicleInfo, createVehicleMedia: CreateVehicleMedia, vehicleRefetch: () => void) => {
        try {
            const formData = new FormData();
            formData.append("lotNumber", createVehicleInfo.lotNumber);
            formData.append("auctionName", createVehicleInfo.auctionName);
            formData.append("location", createVehicleInfo.location);
            formData.append("shippingStatus", createVehicleInfo.shippingStatus);
            formData.append("priceDelivery", createVehicleInfo.priceDelivery);
            formData.append("priceShipping", createVehicleInfo.priceShipping);
            formData.append("vehicleName", createVehicleInfo.vehicleName);

            formData.append("deliveryAddress", createVehicleInfo.deliveryAddress);
            formData.append("portOfOrigin", createVehicleInfo.portOfOrigin);
            formData.append("portOfDestination", createVehicleInfo.portOfDestination);
            formData.append("containerNumber", createVehicleInfo.containerNumber);
            formData.append("receiverId", createVehicleInfo.receiverId);

            createVehicleMedia.images.forEach((file) => formData.append("images", file, file.name))
            {createVehicleMedia.thumbnail && formData.append("thumbnail", createVehicleMedia.thumbnail, createVehicleMedia.thumbnail.name)}
            createVehicleMedia.videos.forEach((file) => formData.append("videos", file, file.name))

            if (createVehicleMedia.billOfSaleDocument) {
                formData.append("billOfSaleDocument", createVehicleMedia.billOfSaleDocument, createVehicleMedia.billOfSaleDocument.name)
            }
            if (createVehicleMedia.titleDocument) {
                formData.append("titleDocument", createVehicleMedia.titleDocument, createVehicleMedia.titleDocument.name)
            }
            if (createVehicleMedia.billOfLadingDocument) {
                formData.append("billOfLadingDocument", createVehicleMedia.billOfLadingDocument, createVehicleMedia.billOfLadingDocument.name)
            }
            if (createVehicleMedia.swbReleaseDocument) {
                formData.append("swbReleaseDocument", createVehicleMedia.swbReleaseDocument, createVehicleMedia.swbReleaseDocument.name)
            }

            setCreateVehicleLoading(true);
            await apiClient.post(`/api/admin/vehicles/${user.sub}/create-vehicle`, formData);
            setCreateVehicleError(null);
            setShowCreateVehicleSuccess(true);
            closeCreateVehicle();
            vehicleRefetch();

        } catch (err: any) {
            if (err instanceof CanceledError) return;

            setCreateVehicleError("AuthenticatedView.Errors.failed_to_create_vehicle");
            setShowCreateVehicleSuccess(false);
        } finally {
            setCreateVehicleLoading(false);
        }
    };

    return { createVehicle, isCreateVehicleLoading, createVehicleError };
};

export default useCreateVehicleForm;
