import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { confirmSignIn } from "aws-amplify/auth";

import { URLS } from "../../../src/config/navigation";
import Logo from "../../../components/Logo";
import ErrorText from "../../../components/ErrorText";
import { useState } from "react";
import ErrorBanner from "../../../components/ErrorBanner";
import { useTranslation } from "react-i18next";

interface Props {
    navigateToHome: () => Promise<void>;
}

const schema = z
    .object({
        password1: z
            .string()
            .min(8, "Auth.error_password_min_chars")
            .regex(/[0-9]/, {
                message: "Auth.error_password_number",
            })
            .regex(/[A-Z]/, {
                message: "Auth.error_password_uppercase",
            })
            .regex(/[a-z]/, {
                message: "Auth.error_password_lowercase",
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "Auth.error_password_special_char",
            }),
        password2: z.string().min(1, "Auth.error_confirm_password_required"),
    })
    .refine((data) => data.password1 === data.password2, {
        message: "Auth.error_passwords_match",
        path: ["password2"],
    });

type FormData = z.infer<typeof schema>;

export function ConfirmPassword({ navigateToHome }: Props) {

    const {t} = useTranslation()


    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const onSubmit = async (data: FormData) => {
        try {
            const { isSignedIn, nextStep } = await confirmSignIn({
                challengeResponse: data.password1,
            });

            if (isSignedIn && nextStep.signInStep === "DONE") {
                navigateToHome();
            }
        } catch (error: any) {

            const errorType = error.name || error.code;

            let message: string;
            switch (errorType) {
                case "AuthValidationErrorCode":
                case "RespondToAuthChallengeException":
                    message =
                        "Auth.error_invalid_or_no_password";
                    break;

                default:
                    message =
                        "Auth.error_password_set_failed";
            }

            setConfirmPasswordError(message as string);
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const pwd1 = watch("password1", "");

    const lengthValid = pwd1.length >= 8;
    const hasLowercase = /[a-z]/.test(pwd1);
    const hasUppercase = /[A-Z]/.test(pwd1);
    const hasNumber = /[0-9]/.test(pwd1);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd1);

    const pwd2 = watch("password2", "");

    const pwdMatch = pwd1 === pwd2 && pwd1 != "";

    return (
        <>
            <div className="flex h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                    <Logo to={URLS.root} height={60} />
                    <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {t("Auth.change_password_button")}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        action="#"
                        method="POST"
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                {t("Auth.new_password_label")}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password1"
                                    type="password"
                                    required
                                    autoComplete="password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    {...register("password1")}
                                />
                                <div className="mt-2 space-y-1 text-xs">
                                    <p
                                        className={
                                            lengthValid
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.password_min_chars")}
                                    </p>
                                    <p
                                        className={
                                            hasLowercase
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.password_lowercase")}
                                    </p>
                                    <p
                                        className={
                                            hasUppercase
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.password_uppercase")}
                                    </p>
                                    <p
                                        className={
                                            hasNumber
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.password_number")}
                                    </p>
                                    <p
                                        className={
                                            hasSpecial
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.password_special_char")}
                                    </p>
                                </div>
                                <ErrorText>
                                    {errors.password1 &&
                                        t(errors.password1.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    {t("Auth.verify_password_label")}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password2"
                                    type="password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    {...register("password2")}
                                />
                                <div className="mt-2 text-xs">
                                    <p
                                        className={
                                            pwdMatch
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }
                                    >
                                        • {t("Auth.passwords_match")}
                                    </p>
                                </div>

                                <ErrorText>
                                    {errors.password2 &&
                                        t(errors.password2.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {t("Auth.change_password_button")}
                            </button>
                        </div>
                    </form>
                    <div className="pt-4"></div>
                    {confirmPasswordError && (
                        <ErrorBanner>
                            {t(confirmPasswordError as string)}
                        </ErrorBanner>
                    )}
                </div>
            </div>
        </>
    );
}
