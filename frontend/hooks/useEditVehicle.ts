import { useState, useCallback } from "react"
import apiClient from "../services/api-client"
import { Vehicle } from "./interfaces"
import { CanceledError } from "axios"

export interface EditVehicleHook {
    vehicle: Vehicle
    isEditing: boolean
    isEditVehicleLoading: boolean
    editVehicleError: string | null
    startEditing: () => void
    cancelEditing: () => void
    handleChange: (
        field: keyof Vehicle
    ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    saveChanges: () => Promise<void>
}

export function useEditVehicle(initial: Vehicle, on_singular_vehicle_page: boolean ): EditVehicleHook {
    const [vehicle, setVehicle] = useState<Vehicle>(initial)
    const [isEditing, setIsEditing] = useState(false)
    const [isEditVehicleLoading, setIsEditVehicleLoading] = useState(false)
    const [editVehicleError, setEditVehicleError] = useState<string | null>(null)

    const startEditing = useCallback(() => {
        setIsEditing(true)
    }, [])

    const cancelEditing = useCallback(() => {
        setVehicle(initial)
        setIsEditing(false)
    }, [initial])

    const handleChange = useCallback(
        (field: keyof Vehicle) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setVehicle((v) => ({
            ...v,
            [field]: e.target.value,
        }))
    }, [])

    const saveChanges = useCallback(async () => {

        setIsEditVehicleLoading(true)
        try {
            const { data } = await apiClient.put(`/api/admin/vehicles/edit/${vehicle.id}/${on_singular_vehicle_page ? 1 : 0}`, vehicle)

            const updated = data.message.vehicle
            setVehicle(updated)
            setIsEditing(false)
            setEditVehicleError(null)
        } catch (err) {
            if (err instanceof CanceledError) return;

            setEditVehicleError("AuthenticatedView.Errors.failed_to_edit_vehicle")
        } finally {
            setIsEditVehicleLoading(false)
        }

    }, [vehicle])

    return {
        vehicle,
        isEditing,
        isEditVehicleLoading,
        editVehicleError,
        startEditing,
        cancelEditing,
        handleChange,
        saveChanges
    }
}
