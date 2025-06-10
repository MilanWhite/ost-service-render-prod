import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ErrorBanner from "../../../components/ErrorBanner";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";

import { URLS } from "../../../src/config/navigation";
import Logo from "../../../components/Logo";
import ErrorText from "../../../components/ErrorText";
import { useTranslation } from "react-i18next";

const emailSchema = z.object({
    email: z.string().trim().email({ message: "Auth.error_invalid_email" }),
});

type EmailFormData = z.infer<typeof emailSchema>;

export const newPasswordSchema = z
    .object({
        verificationCode: z
            .string()
            .trim()
            .length(6, "Auth.error_verification_code_length")
            .regex(/^\d{6}$/, "Auth.error_verification_code_numbers"),
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

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export function ResetPasswordPage() {
    const navigate = useNavigate();

    const [successPasswordChange, setSuccessPasswordChange] = useState(false);

    const [emailSent, setEmailSent] = useState(false);

    const [emailProvided, setEmailProvided] = useState("");

    // if verified and new password set successfully go back to login page
    useEffect(() => {
        if (successPasswordChange) {
            navigate(URLS.login);
        }
    }, [successPasswordChange, navigate]);

    return (
        <>
            {emailSent ? (
                <VerificationCodeAndNewPasswordStep
                    setSuccessPasswordChange={setSuccessPasswordChange}
                    emailProvided={emailProvided}
                />
            ) : (
                <EmailStep
                    setEmailSent={setEmailSent}
                    setEmailProvided={setEmailProvided}
                />
            )}
        </>
    );
}

export function EmailStep({
    setEmailSent,
    setEmailProvided,
}: {
    setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
    setEmailProvided: React.Dispatch<React.SetStateAction<string>>;
}) {

    const {t} = useTranslation()

    const [emailStepError, setEmailStepError] = useState("");

    const onSubmit = async (data: EmailFormData) => {
        try {
            const { nextStep } = await resetPassword({
                username: data.email,
            });
            setEmailProvided(data.email);
            if (
                nextStep.resetPasswordStep ===
                "CONFIRM_RESET_PASSWORD_WITH_CODE"
            ) {
                setEmailSent(true);
            }
        } catch (error: any) {
            setEmailStepError(
                "Auth.error_send_code_failed"
            );
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
    });

    return (
        <>
            <div className="flex h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                    <Logo to={URLS.root} height={60} />
                    <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {t("Auth.reset_password_heading")}
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
                                {t("Auth.email_address")}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    {...register("email")}
                                />
                                <ErrorText>
                                    {errors.email && t(errors.email.message as string)}
                                </ErrorText>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {t("Auth.send_code_button")}
                            </button>
                        </div>
                    </form>
                    <div className="pt-4"></div>
                    <div className="text-sm">
                        <Link
                            to={URLS.login}
                            className="font-semibold text-primary hover:text-primary-hover"
                        >
                            ← {t("Auth.back_to_sign_in")}
                        </Link>
                    </div>
                    {emailStepError && (
                        <ErrorBanner>{t(emailStepError as string)}</ErrorBanner>
                    )}
                </div>
            </div>
        </>
    );
}

export function VerificationCodeAndNewPasswordStep({
    setSuccessPasswordChange,
    emailProvided,
}: {
    setSuccessPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
    emailProvided: string;
}) {

    const {t} = useTranslation()

    const [
        verificationCodeAndNewPasswordError,
        setVerificationCodeAndNewPasswordError,
    ] = useState("");

    const onSubmit = async (data: NewPasswordFormData) => {
        try {
            await confirmResetPassword({
                username: emailProvided,
                confirmationCode: data.verificationCode,
                newPassword: data.password1,
            });
            setSuccessPasswordChange(true);
        } catch (error: any) {

            const errorType = error.name || error.code;

            let message: string;
            switch (errorType) {
                case "CodeMismatchException":
                    message =
                        "Auth.error_code_mismatch";
                    break;

                case "LimitExceededException":
                    message =
                        "Auth.error_limit_exceeded";
                    break;

                default:
                    message =
                        "Auth.error_reset_password_failed";
            }

            setVerificationCodeAndNewPasswordError(message);
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema),
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
                        {t("Auth.reset_password_heading")}
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
                                {t("Auth.verification_code_label")}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    placeholder={t("Auth.enter_6_digit_code")}
                                    {...register("verificationCode")}
                                />
                                <ErrorText>
                                    {errors.verificationCode &&
                                        t(errors.verificationCode.message as string)}
                                </ErrorText>
                            </div>
                        </div>

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

                    {verificationCodeAndNewPasswordError && (
                        <ErrorBanner>
                            {t(verificationCodeAndNewPasswordError as string)}
                        </ErrorBanner>
                    )}
                    <div className="text-sm">
                        <Link
                            to={URLS.login}
                            className="font-semibold text-primary hover:text-primary-hover"
                        >
                            ← {t("Auth.back_to_sign_in")}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
