import { useState } from "react";
import RoundedButton from "../../RoundedButton";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "../../ErrorText";
import useContactForm, { ContactInfo } from "../../../hooks/useContactForm";
import ErrorBanner from "../../ErrorBanner";
import SuccessBanner from "../../SuccessBanner";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

const schema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, { message: "ContactPage.error_first_name_required" }),
    lastName: z
        .string()
        .trim()
        .min(1, { message: "ContactPage.error_last_name_required" }),
    email: z
        .string()
        .trim()
        .email({ message: "ContactPage.error_invalid_email" }),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{6,14}$/, {
            message: "ContactPage.error_invalid_phone",
        }),
    message: z
        .string()
        .trim()
        .min(1, { message: "ContactPage.error_message_required" }),
    language: z.enum(["english", "ukrainian", "russian"], {
        errorMap: () => ({ message: "ContactPage.error_invalid_language" }),
    }),
});

type FormData = z.infer<typeof schema>;

const ContactUsForm = () => {
    const { t } = useTranslation();

    const { sendContactMessage, isContactLoading, contactError } =
        useContactForm();
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (data: FormData) => {
        const contactInfo: ContactInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            message: data.message,
            language: data.language,
        };

        await sendContactMessage(contactInfo, reset, setShowSuccess);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    return (
        <>
            <form
                action="#"
                method="POST"
                className="relative px-6 pt-12 pb-24 sm:pb-32 lg:px-8 lg:py-32"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="lg:absolute top-10 w-[100%]">
                    {showSuccess && (
                        <SuccessBanner
                            onClick={() => {
                                setShowSuccess(false);
                            }}
                        >
                            {t("ContactPage.message_submitted")}
                        </SuccessBanner>
                    )}
                    {contactError && (
                        <ErrorBanner>{t(contactError as string)}</ErrorBanner>
                    )}
                </div>

                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="first-name"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_first_name")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("firstName")}
                                />
                                <ErrorText>
                                    {errors.firstName &&
                                        t(errors.firstName.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="last-name"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_last_name")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("lastName")}
                                />
                                <ErrorText>
                                    {errors.lastName &&
                                        t(errors.lastName.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_email")}
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
                                htmlFor="phone-number"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_phone")}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="phone-number"
                                    type="tel"
                                    autoComplete="tel"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    {...register("phoneNumber")}
                                />
                                <ErrorText>
                                    {errors.phoneNumber &&
                                        t(errors.phoneNumber.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_message")}
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                    defaultValue={""}
                                    {...register("message")}
                                />
                                <ErrorText>
                                    {errors.message &&
                                        t(errors.message.message as string)}
                                </ErrorText>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="language"
                                className="block text-sm/6 font-semibold text-gray-900"
                            >
                                {t("ContactPage.form_language_label")}
                            </label>
                            <div className="mt-2.5 grid grid-cols-1">
                                <select
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    id="language"
                                    {...register("language")}
                                >
                                    <option value="english">
                                        {t("language_option_english")}
                                    </option>
                                    <option value="ukrainian">
                                        {t("language_option_ukrainian")}
                                    </option>
                                    <option value="russian">
                                        {t("language_option_russian")}
                                    </option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <RoundedButton
                            type="submit"
                            disabled={isContactLoading}
                            onClick={() => {}}
                        >
                            {t("ContactPage.form_button_send")}
                        </RoundedButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ContactUsForm;
