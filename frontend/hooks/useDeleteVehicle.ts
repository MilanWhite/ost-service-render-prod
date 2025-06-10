import { Dispatch, SetStateAction, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface UseDeleteVehicleResult {
    isDeleteVehicleLoading: boolean;
    deleteVehicleError: string | null;
    setDeleteVehicleError: Dispatch<SetStateAction<string | null>>;
    deleteVehicle: (sub: string, vehicleId: number) => Promise<boolean>;
}

export function useDeleteVehicle(): UseDeleteVehicleResult {
    const [isDeleteVehicleLoading, setIsDeleteVehicleLoading] = useState<boolean>(false);
    const [deleteVehicleError, setDeleteVehicleError] = useState<string | null>(null);

    async function deleteVehicle(sub: string, vehicleId: number) {
        setIsDeleteVehicleLoading(true);
        setDeleteVehicleError(null);

        try {
            await apiClient.post(
                `/api/admin/vehicles/${sub}/delete-vehicle/${vehicleId}`
            );
            return false; // this represents an error response, ie error = false
        } catch (err: any) {
            if (err instanceof CanceledError) return false; // no error on canceled error

            setDeleteVehicleError("AuthenticatedView.Errors.failed_to_delete_vehicle");
            return true; // this represents an error response, ie error = true
        } finally {
            setIsDeleteVehicleLoading(false);
        }

    }

    return { isDeleteVehicleLoading, deleteVehicleError, setDeleteVehicleError, deleteVehicle };
}
