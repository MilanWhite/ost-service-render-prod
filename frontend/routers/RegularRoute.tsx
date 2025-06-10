import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenteredSpinner from "../components/CenteredSpinner";
import { URLS } from "../src/config/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

interface Props {
    children: ReactNode;
}

export const RegularRoute = ({ children }: Props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        async function checkGroup() {
            try {
                const session = await fetchAuthSession();
                const groups =
                    session.tokens?.accessToken.payload["cognito:groups"];
                if (Array.isArray(groups) && groups.includes("Admin")) {
                    navigate(URLS.adminClientManager, { replace: true });
                } else if (Array.isArray(groups)) {
                    setAllowed(true);
                } else {
                    navigate(URLS.root, { replace: true });
                }
            } catch (err) {
                navigate(URLS.root, { replace: true });
            } finally {
                setLoading(false);
            }
        }

        checkGroup();
    }, [navigate]);

    if (loading) return <CenteredSpinner />;

    return <>{allowed ? children : null}</>;
};
