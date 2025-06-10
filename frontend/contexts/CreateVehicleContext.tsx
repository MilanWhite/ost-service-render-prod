import React, { createContext, useContext, useState, ReactNode } from "react";

type CreateVehicleContextType = {
    isCreateVehicleOpen: boolean;
    openCreateVehicle: () => void;
    closeCreateVehicle: () => void;

    showCreateVehicleSuccess: boolean;
    setShowCreateVehicleSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateVehicleContext = createContext<CreateVehicleContextType | null>(
    null
);

export const CreateVehicleContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isCreateVehicleOpen, setIsCreateVehicleOpen] = useState(false);
    const openCreateVehicle = () => setIsCreateVehicleOpen(true);
    const closeCreateVehicle = () => setIsCreateVehicleOpen(false);

    const [showCreateVehicleSuccess, setShowCreateVehicleSuccess] =
        useState(false);

    return (
        <CreateVehicleContext.Provider
            value={{
                isCreateVehicleOpen,
                openCreateVehicle,
                closeCreateVehicle,
                showCreateVehicleSuccess,
                setShowCreateVehicleSuccess,
            }}
        >
            {children}
        </CreateVehicleContext.Provider>
    );
};

export const useCreateVehicle = () => {
    const ctx = useContext(CreateVehicleContext);
    if (!ctx)
        throw new Error(
            "useCreateVehicle use must be inside a CreateVehicleContextProvider"
        );
    return ctx;
};
