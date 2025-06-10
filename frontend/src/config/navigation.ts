export const URLS = {
    // Social links
    facebook: "https://www.facebook.com/ostservic/",
    linkedin: "https://www.linkedin.com/company/ost-service/",

    // login
    login: "/login",

    //reset password
    resetPassword: "/reset-password",

    // Frontend routes
    root: "/",
    about: "/about",
    contact: "/contact",
    authCallback: "/auth/callback",

    // Regular user
    home: "/home",
    vehicles: "/vehicles",

    regularUserViewUserSingularVehicle: (vehicle_id: string) => `/vehicles/${vehicle_id}`,

    // Admin routes
    adminHome: "/admin/home",
    adminClientManager: "/admin/client-manager",

    adminViewClientVehicles: (sub: string) => `/admin/clients/${sub}/vehicles`,

    adminViewClientSingularVehicle: (sub: string, vehicle_id: string) => `/admin/clients/${sub}/vehicles/${vehicle_id}`,

} as const;