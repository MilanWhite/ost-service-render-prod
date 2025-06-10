import ActionButton from "../ActionButton";
import AdminCreateUserDialog from "../AdminCreateUserDialog";
import { useCreateUser } from "../../contexts/CreateUserContext";
import SuccessBanner from "../SuccessBanner";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import ErrorBanner from "../ErrorBanner";
import { Link } from "react-router-dom";
import { URLS } from "../../src/config/navigation";
import { getAvatarSrc } from "../../src/config/AvatarConfig";
import { useTranslation } from "react-i18next";

import UsersTableSkeleton from "../Skeletons/UsersTableSkeleton";

const AdminClientList = () => {
    const { t } = useTranslation();

    const { openCreateUser, showCreateUserSuccess, setShowCreateUserSuccess } =
        useCreateUser();

    const {
        allUsers,
        getAllUsersLoading,
        getAllUsersError,
        getAllUsersRefetch,
    } = useGetAllUsers();

    return (
        <>
            {getAllUsersError && (
                <ErrorBanner>{t(getAllUsersError as string)}</ErrorBanner>
            )}
            {showCreateUserSuccess && (
                <SuccessBanner
                    onClick={() => {
                        setShowCreateUserSuccess(false);
                    }}
                >
                    {t(
                        "AuthenticatedView.Success.user_invite_sent_successfully"
                    )}
                </SuccessBanner>
            )}
            <AdminCreateUserDialog getAllUsersRefetch={getAllUsersRefetch} />
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold text-gray-900">
                                {t("AuthenticatedView.client_list")}
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                {t(
                                    "AuthenticatedView.clients_signed_up_description"
                                )}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <ActionButton onClick={openCreateUser}>
                                {t("AuthenticatedView.invite_user")}
                            </ActionButton>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <table className="w-full text-left">
                            <thead className="bg-white">
                                <tr>
                                    <th
                                        scope="col"
                                        className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        {t("AuthenticatedView.client")}
                                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                                    >
                                        {t("AuthenticatedView.phone_number")}
                                    </th>

                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3"
                                    >
                                        <span className="sr-only">
                                            {t("AuthenticatedView.view")}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!getAllUsersLoading ? (
                                    allUsers.map((user) => (
                                        <tr key={user.sub}>
                                            <td className="py-5 pr-3 text-sm whitespace-nowrap sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="size-11 shrink-0">
                                                        <img
                                                            alt=""
                                                            src={getAvatarSrc(
                                                                user.email
                                                            )}
                                                            className="size-11 rounded-full"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {user.username}
                                                        </div>
                                                        <div className="mt-1 text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                                                {user.phone_number}
                                            </td>

                                            <td className="relative py-4 pl-3 text-right text-sm font-medium">
                                                <Link
                                                    to={URLS.adminViewClientVehicles(
                                                        user.sub
                                                    )}
                                                    className="text-primary hover:text-primary-hover"
                                                >
                                                    {t(
                                                        "AuthenticatedView.view"
                                                    )}
                                                    <span className="sr-only">
                                                        , {user.username}
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <UsersTableSkeleton />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminClientList;
