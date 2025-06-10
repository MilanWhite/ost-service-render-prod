import { useState, useEffect, useCallback } from "react"
import apiClient from "../services/api-client"
import { Vehicle } from "./interfaces"
import { CanceledError } from "axios"


export function useGetVehicle(
    userSub: string,
    vehicleId: string | number
) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    const [vehicleLoading, setVehicleLoading] = useState(false)
    const [vehicleError, setVehicleError] = useState<string | null>(null)

    const fetchVehicle = useCallback(async () => {
        if (!userSub || !vehicleId) return

        setVehicleLoading(true)
        setVehicleError(null)

        try {
            const resp = await apiClient.get(`/api/main/${userSub}/vehicles/${vehicleId}`)
            setVehicle(resp.data.message.vehicle)
        } catch (err: any) {
            if (err instanceof CanceledError) return;

            setVehicleError("AuthenticatedView.Errors.failed_to_load_vehicle")
        } finally {
            setVehicleLoading(false)
        }
    }, [userSub, vehicleId])

    useEffect(() => {
        fetchVehicle()
    }, [fetchVehicle])

    return {
        vehicle,
        vehicleLoading,
        vehicleError,
        refetch: fetchVehicle,
    } as const
}
