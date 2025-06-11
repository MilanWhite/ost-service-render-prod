import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import ErrorBanner from "../ErrorBanner";
import { URLS } from "../../src/config/navigation";
import { useTranslation } from "react-i18next";
import { useDeleteUser } from "../../hooks/useDeleteUser";

interface Props {
    sub: string;
    isDeleteUserDialogOpen: boolean;
    setDeleteUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDeleteUserDialog = ({
    sub,
    isDeleteUserDialogOpen,
    setDeleteUserDialogOpen,
}: Props) => {
    const { t } = useTranslation();

    const {
        isDeleteUserLoading,
        deleteUserError,
        setDeleteUserError,
        deleteUser,
    } = useDeleteUser();

    const handleDelete = async () => {
        const error = await deleteUser(sub);

        if (!error) {
            setDeleteUserDialogOpen(false);

            window.location.replace(URLS.adminClientManager);
        }
    };
    return (
        <>
            <Dialog
                open={isDeleteUserDialogOpen}
                onClose={setDeleteUserDialogOpen}
                className="relative z-60"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                {deleteUserError && (
                    <ErrorBanner>{t(deleteUserError as string)}</ErrorBanner>
                )}

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            {deleteUserError && (
                                <ErrorBanner>
                                    {t(deleteUserError as string)}
                                </ErrorBanner>
                            )}
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="size-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                    >
                                        {t("AuthenticatedView.delete_user")}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {t(
                                                "AuthenticatedView.delete_user_description"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex cursor-pointer w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 disabled:opacity-75 disabled:cursor-not-allowed  sm:ml-3 sm:w-auto"
                                    disabled={isDeleteUserLoading}
                                >
                                    {t("AuthenticatedView.delete")}
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => {
                                        setDeleteUserError(null);
                                        setDeleteUserDialogOpen(false);
                                    }}
                                    className="mt-3 cursor-pointer inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    {t("AuthenticatedView.cancel")}
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AdminDeleteUserDialog;
