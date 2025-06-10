import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, type SignInInput } from "aws-amplify/auth";

import ErrorBanner from "../../../components/ErrorBanner";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";

import { ConfirmPassword } from "./ConfirmPassword";

import { URLS } from "../../../src/config/navigation";
import Logo from "../../../components/Logo";
import ErrorText from "../../../components/ErrorText";
import { useTranslation } from "react-i18next";

const schema = z.object({
    email: z.string().trim().email({ message: "Auth.error_invalid_email" }),
    password: z.string().trim(),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {

    const {t} = useTranslation()

    const [signInError, setSignInError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState(false);

    const navigateToHome = async () => {
        const session = await fetchAuthSession(); // is this unsafe ?????

        const groups = session.tokens?.accessToken.payload["cognito:groups"];
        if (groups && Array.isArray(groups)) {
            if ((groups as string[]).includes("RegularUser")) {
                window.location.replace(URLS.home);
            } else if ((groups as string[]).includes("Admin")) {
                window.location.replace(URLS.adminHome);
            }
        }
    };

    const { route, user } = useAuthenticator((ctx) => [ctx.route, ctx.user]);

    useEffect(() => {
        if (route === "authenticated") {
            navigateToHome();
        }
    }, [route, user, navigateToHome]);

    const onSubmit = async (data: FormData) => {
        const signInInput: SignInInput = {
            username: data.email,
            password: data.password,
        };

        try {
            const { isSignedIn, nextStep } = await signIn(signInInput);

            if (
                nextStep.signInStep ===
                "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
            ) {
                setConfirmPassword(true);
            } else if (isSignedIn) {
                navigateToHome();
            }
        } catch (error: any) {
            const errorType = error.name || error.code;

            let message: string;
            switch (errorType) {
                case "NotAuthorizedException":
                    message =
                        "Auth.error_invalid_email_or_password";
                    break;

                default:
                    message =
                        "Auth.error_login_failed";
            }

            setSignInError(message);
        }
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
            {confirmPassword ? (
                <ConfirmPassword navigateToHome={navigateToHome} />
            ) : (
                <div className="flex h-[90dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <Logo to={URLS.root} height={60} />
                        <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            {t("Auth.sign_in_heading")}
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
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        {t("Auth.password_label")}
                                    </label>
                                    <div className="text-sm">
                                        <Link
                                            to={URLS.resetPassword}
                                            className="font-semibold text-primary hover:text-primary-hover"
                                        >
                                            {t("Auth.forgot_password")}
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                        {...register("password")}
                                    />
                                    <ErrorText>
                                        {errors.password &&
                                            t(errors.password.message as string)}
                                    </ErrorText>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    {t("Auth.sign_in_button")}
                                </button>
                            </div>
                        </form>
                        <div className="pt-4"></div>
                        {signInError && (
                            <ErrorBanner>
                                {t(signInError as string)}
                            </ErrorBanner>
                        )}
                        <div className="text-sm">
                            <Link
                                to={URLS.root}
                                className="font-semibold text-primary hover:text-primary-hover"
                            >
                                ← {t("Auth.back_to_home")}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
