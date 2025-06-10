import React from "react";
import { Link } from "react-router-dom";
import RoundedButton from "../RoundedButton";
import { URLS } from "../../src/config/navigation";
import { useTranslation } from "react-i18next";

const GetAFreeQuoteButton: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Link to={URLS.contact}>
            <RoundedButton type="button" onClick={() => {}}>
                {t("HomePage.get_free_quote")}
            </RoundedButton>
        </Link>
    );
};

export default GetAFreeQuoteButton;
