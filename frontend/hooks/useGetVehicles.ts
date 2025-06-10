// hooks/usePaginatedVehicles.ts
import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-client";
import { Vehicle, Meta } from "./interfaces";
import { VehicleFilterField } from "../src/types/types";
import { CanceledError } from "axios";

export function useGetVehicles(
    userSub: string,
    perPage = 10,
    { vehicleSearch, vehicleFilterBy }: { vehicleSearch?: string; vehicleFilterBy: VehicleFilterField | null }
): {
    vehicles: Vehicle[];
    meta: Meta;
    vehiclesLoading: boolean;
    vehiclesError: string | null;
    setPage: (page: number) => void;
    vehicleRefetch: () => void;
} {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const [meta, setMeta] = useState<Meta>({
        page: 1,
        per_page: perPage,
        total_pages: 1,
        total_items: 0,
        has_next: false,
        has_prev: false,
    });
    const [vehiclesLoading, setLoading] = useState<boolean>(false);
    const [vehiclesError, setVehiclesError] = useState<string | null>(null);

    const fetchPage = useCallback(
        async (page: number) => {
            setLoading(true);
            setVehiclesError(null);

            try {
                const resp = await apiClient.get<{
                    message: { vehicles: Vehicle[]; meta: Meta };
                }>(`/api/main/${userSub}/vehicles`, {
                    params: { page, per_page: perPage, vehicle_search: vehicleSearch, vehicle_filter_by: vehicleFilterBy},
                });

                setVehicles(resp.data.message.vehicles);
                setMeta(resp.data.message.meta);
            } catch (err: any) {
                if (err instanceof CanceledError) return;

                setVehiclesError("AuthenticatedView.Errors.failed_to_load_vehicles");
            } finally {
                setLoading(false);
            }
        },
        [userSub, perPage, vehicleSearch, vehicleFilterBy]
    );

    // fetch whenever userSub or meta.page changes
    useEffect(() => {
        if (userSub) {
            fetchPage(meta.page);
        }
    }, [meta.page, fetchPage]);

    return {
        vehicles,
        meta,
        vehiclesLoading,
        vehiclesError,
        setPage: (page: number) =>
            setMeta((m) => ({
                ...m,
                page: Math.max(1, Math.min(page, m.total_pages)),
            })),
        vehicleRefetch: () => fetchPage(meta.page),
    };
}
