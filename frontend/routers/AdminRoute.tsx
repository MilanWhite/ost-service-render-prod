import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenteredSpinner from "../components/CenteredSpinner";
import { URLS } from "../src/config/navigation";

import { fetchAuthSession } from "aws-amplify/auth";

interface AdminProps {
    children: ReactNode;
}

export function AdminRoute({ children }: AdminProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const session = await fetchAuthSession();
                const groups =
                    session.tokens?.accessToken.payload["cognito:groups"];
                if (Array.isArray(groups) && groups.includes("Admin")) {
                    setAllowed(true);
                } else if (Array.isArray(groups)) {
                    navigate(URLS.home, { replace: true });
                } else {
                    navigate(URLS.root, { replace: true });
                }
            } catch {
                navigate(URLS.root, { replace: true });
            } finally {
                setLoading(false);
            }
        }
        checkAdmin();
    }, [navigate]);

    if (loading) return <CenteredSpinner />;
    return <>{allowed ? children : null}</>;
}
