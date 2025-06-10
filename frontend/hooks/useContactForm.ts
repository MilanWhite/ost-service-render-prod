import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface ContactInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    language: string;
}

const useContactForm = () => {

    const [contactError, setContactError] = useState< string | null>(null);
    const [isContactLoading, setIsContactLoading] = useState(false)

    const sendContactMessage = async (contactInfo: ContactInfo, reset?: () => void, setShowSuccess?: (arg0: boolean) => void) => {

        try {
            const formData = new FormData();
            formData.append("firstName", contactInfo.firstName)
            formData.append("lastName", contactInfo.lastName)
            formData.append("email", contactInfo.email)
            formData.append("phoneNumber", contactInfo.phoneNumber)
            formData.append("message", contactInfo.message)
            formData.append("language", contactInfo.language)

            setIsContactLoading(true)
            await apiClient.post("/api/contact/message", formData, {});
            setContactError(null)
            setShowSuccess?.(true)
            reset?.()
        } catch (err: any) {
            if (err instanceof CanceledError) return;

            if (err.response) {
                setContactError("AuthenticatedView.Errors.failed_to_send_message")
                setShowSuccess?.(false)
            }
        } finally {
            setIsContactLoading(false)
        }
    }

    return { sendContactMessage, isContactLoading, contactError };
}

export default useContactForm