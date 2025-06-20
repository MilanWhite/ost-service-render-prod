import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";

import CreateUserForm from "./CreateUserForm";
import { useCreateUser } from "../../contexts/CreateUserContext";
import { useTranslation } from "react-i18next";

interface Props {
    getAllUsersRefetch: () => void;
}

const AdminCreateUserDialog = ({ getAllUsersRefetch }: Props) => {
    const { t } = useTranslation();

    const { isCreateUserOpen, openCreateUser } = useCreateUser();

    return (
        <>
            <Dialog
                open={isCreateUserOpen}
                onClose={openCreateUser}
                className="relative z-60"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-100 sm:mx-0 sm:size-10">
                                        <UserIcon
                                            aria-hidden="true"
                                            className="size-6 text-primary"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="text-base font-semibold text-gray-900"
                                        >
                                            {t("AuthenticatedView.invite_user")}
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {t(
                                                    "AuthenticatedView.invite_user_description"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <CreateUserForm
                                getAllUsersRefetch={getAllUsersRefetch}
                            />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AdminCreateUserDialog;
