import React, { createContext, useContext, useState, ReactNode } from "react";

type CreateUserContextType = {
    isCreateUserOpen: boolean;
    openCreateUser: () => void;
    closeCreateUser: () => void;

    showCreateUserSuccess: boolean;
    setShowCreateUserSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateUserContext = createContext<CreateUserContextType | null>(null);

export const CreateUserContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const openCreateUser = () => setIsCreateUserOpen(true);
    const closeCreateUser = () => setIsCreateUserOpen(false);

    const [showCreateUserSuccess, setShowCreateUserSuccess] = useState(false);

    return (
        <CreateUserContext.Provider
            value={{
                isCreateUserOpen,
                openCreateUser,
                closeCreateUser,
                showCreateUserSuccess,
                setShowCreateUserSuccess,
            }}
        >
            {children}
        </CreateUserContext.Provider>
    );
};

export const useCreateUser = () => {
    const ctx = useContext(CreateUserContext);
    if (!ctx)
        throw new Error(
            "useCreateUser use must be inside a CreateUserContextProvider"
        );
    return ctx;
};
