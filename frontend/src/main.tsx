import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    useLocation,
    Outlet,
} from "react-router-dom";

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";

import { LoginPage } from "../pages/general/AuthPages/LoginPage.tsx";
import { ResetPasswordPage } from "../pages/general/AuthPages/ResetPasswordPage.tsx";

import { HomePage } from "../pages/general/HomePage.tsx";
import { AboutPage } from "../pages/general/AboutPage.tsx";
import { NotFoundPage } from "../pages/general/NotFoundPage.tsx";
import { ContactPage } from "../pages/general/ContactPage.tsx";
// import { Callback } from "../pages/general/Callback.tsx";

import { AdminDashboard } from "../pages/admin/AdminDashboard.tsx";
import { AdminClientManager } from "../pages/admin/AdminClientManager.tsx";
import { AdminViewClientVehicles } from "../pages/admin/AdminViewClientVehicles.tsx";
import { AdminViewClientSingularVehicle } from "../pages/admin/AdminViewClientSingularVehicle.tsx";

import { RegularUserDashboard } from "../pages/regular_user/RegularUserDashboard.tsx";
import { RegularUserVehicles } from "../pages/regular_user/RegularUserVehicles.tsx";
import { RegularUserViewUserSingularVehicle } from "../pages/regular_user/RegularUserViewUserSingularVehicle.tsx";

import { PublicRoute } from "../routers/PublicRoute.tsx";
import { RegularRoute } from "../routers/RegularRoute.tsx";
import { AdminRoute } from "../routers/AdminRoute.tsx";

import "./index.css";

import { URLS } from "./config/navigation.ts";

import { abortAllRequests } from "../services/api-client.ts";

import "./i18.ts";

Amplify.configure(config);

function RootLayout() {
    const location = useLocation();
    useEffect(() => {
        abortAllRequests();
    }, [location]);
    return <Outlet />;
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            // Public (unauthenticated) routes

            {
                path: URLS.root,
                element: (
                    <PublicRoute>
                        <HomePage />
                    </PublicRoute>
                ),
            },
            {
                path: URLS.about,
                element: (
                    <PublicRoute>
                        <AboutPage />
                    </PublicRoute>
                ),
            },
            {
                path: URLS.contact,
                element: (
                    <PublicRoute>
                        <ContactPage />
                    </PublicRoute>
                ),
            },

            {
                path: URLS.login,
                element: (
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                ),
            },

            {
                path: URLS.resetPassword,
                element: (
                    <PublicRoute>
                        <ResetPasswordPage />
                    </PublicRoute>
                ),
            },

            // {
            //     path: URLS.authCallback,
            //     element: (
            //         <PublicRoute>
            //             <Callback />
            //         </PublicRoute>
            //     ),
            // },

            // Regular user routes
            {
                path: URLS.home,
                element: (
                    <RegularRoute>
                        <RegularUserDashboard />
                    </RegularRoute>
                ),
            },

            {
                path: URLS.vehicles,
                element: (
                    <RegularRoute>
                        <RegularUserVehicles />
                    </RegularRoute>
                ),
            },

            {
                path: URLS.regularUserViewUserSingularVehicle(":vehicle_id"),
                element: (
                    <RegularRoute>
                        <RegularUserViewUserSingularVehicle />
                    </RegularRoute>
                ),
            },

            // Admin-only routes
            {
                path: URLS.adminHome,
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                ),
            },

            {
                path: URLS.adminClientManager,
                element: (
                    <AdminRoute>
                        <AdminClientManager />
                    </AdminRoute>
                ),
            },

            {
                path: URLS.adminViewClientVehicles(":sub"),
                element: (
                    <AdminRoute>
                        <AdminViewClientVehicles />
                    </AdminRoute>
                ),
            },

            {
                path: URLS.adminViewClientSingularVehicle(
                    ":sub",
                    ":vehicle_id"
                ),
                element: (
                    <AdminRoute>
                        <AdminViewClientSingularVehicle />
                    </AdminRoute>
                ),
            },

            // 404
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <Authenticator.Provider>
        <RouterProvider router={router} />
    </Authenticator.Provider>
);
