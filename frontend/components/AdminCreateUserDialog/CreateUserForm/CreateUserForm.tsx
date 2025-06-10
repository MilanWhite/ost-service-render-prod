import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateUserForm, {
    CreateUserInfo,
} from "../../../hooks/useCreateUserForm";

import ErrorBanner from "../../ErrorBanner";
import ErrorText from "../../ErrorText";

import { useCreateUser } from "../../../contexts/CreateUserContext";
import { useTranslation } from "react-i18next";

const schema = z.object({
    username: z
        .string()
        .trim()
        .min(1, { message: "AuthenticatedView.Error.username_required" }),
    email: z
        .string()
        .trim()
        .email({ message: "AuthenticatedView.Error.invalid_email_address" }), // Zod’s .email() enforces standard email formatting :contentReference[oaicite:1]{index=1}
    phoneNumber: z.string().trim(),
});

type FormData = z.infer<typeof schema>;

interface Props {
    getAllUsersRefetch: () => void;
}

const CreateUserForm = ({ getAllUsersRefetch }: Props) => {
    const { t } = useTranslation();

    const { createUser, isCreateUserLoading, createUserError } =
        useCreateUserForm(); // hook

    const { closeCreateUser } = useCreateUser(); // context

    const onSubmit = async (data: FormData) => {
        const createUserInfo: CreateUserInfo = {
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
        };
        await createUser(createUserInfo, getAllUsersRefetch);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    return (
        <>
            <form
                action="#"
                method="POST"
                className="relative px-6 py-6 lg:px-8 lg:pb-12"
                onSubmit={handleSubmit(onSubmit)}
            >
                {createUserError && (
                    <ErrorBanner>{t(createUserError as string)}</ErrorBanner>
                )}

                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg pb-4">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="username"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.company_name_name")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="username"
                                    type="username"
                                    autoComplete="username"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("username")}
                                />
                                <ErrorText>
                                    {errors.username &&
                                        t(errors.username.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.email")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("email")}
                                />
                                <ErrorText>
                                    {errors.email &&
                                        t(errors.email.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("AuthenticatedView.phone_number")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="phoneNumber"
                                    type="phoneNumber"
                                    autoComplete="phoneNumber"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("phoneNumber")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="submit"
                        onClick={() => {}}
                        disabled={isCreateUserLoading}
                        className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover disabled:opacity-75 disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
                    >
                        {isCreateUserLoading
                            ? t("AuthenticatedView.inviting_loading")
                            : t("AuthenticatedView.invite_user")}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            closeCreateUser();
                        }}
                        disabled={isCreateUserLoading}
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-75 disabled:cursor-not-allowed sm:mt-0 sm:w-auto mt-3"
                    >
                        {t("AuthenticatedView.cancel")}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateUserForm;
