// src/hooks/useDecodeVin.ts
import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { DecodedVin } from "../src/types/types";

const useDecodeVin = () => {
    const [decodedVin, setDecodedVin] = useState<DecodedVin | null>(null);
    const [decodeError, setDecodeError] = useState<string | null>(null);
    const [isDecoding, setDecoding] = useState(false);

    const decodeVin = async (vin: string) => {
        if (vin.length !== 17 || /[IOQioq]/.test(vin)) {
            setDecodeError("AuthenticatedView.Errors.invalid_vin");
            setDecodedVin(null);
            return;
        }

        try {
            setDecoding(true);
            const { data } = await apiClient.post<DecodedVin>(
                `/api/admin/vehicles/decode-vin/${vin}`
            );

            setDecodedVin(data.data);
            setDecodeError(null);
            } catch (err: any) {
            if (err instanceof CanceledError) return;

            const fallback = "AuthenticatedView.Errors.failed_to_decode_vin";

            setDecodeError(fallback);
            setDecodedVin(null);
        } finally {
            setDecoding(false);
        }
    };

    return { decodeVin, decodedVin, isDecoding, decodeError };
};

export default useDecodeVin;
