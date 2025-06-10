import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

import { useCreateUser } from "../contexts/CreateUserContext";


export interface CreateUserInfo {
    username: string;
    email: string;
    phoneNumber: string;
}

const useCreateUserForm = () => {

    const [createUserError, setCreateUserError] = useState< string | null>(null);
    const [isCreateUserLoading, setCreateUserLoading] = useState(false)

    const {closeCreateUser, setShowCreateUserSuccess} = useCreateUser(); // context

    const createUser = async (createUserInfo: CreateUserInfo, getAllUsersRefetch: () => void) => {

        try {
            const formData = new FormData();
            formData.append("username", createUserInfo.username)
            formData.append("email", createUserInfo.email)
            formData.append("phoneNumber", createUserInfo.phoneNumber)

            setCreateUserLoading(true)
            await apiClient.post("/api/admin/users/create-user", formData, {});
            setCreateUserError(null)
            setShowCreateUserSuccess(true)
            closeCreateUser()
            getAllUsersRefetch();

        } catch (err: any) {
            if (err instanceof CanceledError) return;

            if (err.response) {
                setCreateUserError("AuthenticatedView.Errors.failed_to_create_user")
                setShowCreateUserSuccess(false)
            }
        } finally {
            setCreateUserLoading(false)
        }
    }

    return { createUser, isCreateUserLoading, createUserError };
}

export default useCreateUserForm