export interface User {
    sub: string;
    username: string;
    email: string;
    phone_number: string;
}

export interface Vehicle {
    id: number;
    vehicle_name: string;
    lot_number: string;
    auction_name: string;
    location: string;
    delivery_status: string;
    shipping_status: string;
    price_delivery: number;
    price_shipping: number;
    cognito_sub: string;
    user_email: string;
    created_at: string;

    container_number: string;
    port_of_origin: string;
    port_of_destination: string;
    delivery_address: string;
    receiver_id: string;

    vin: string;
    powertrain: string;
    model: string;
    color: string;

    // optional
    vehicleImages?: string[];
    vehicleVideos?: string[];
    vehicleThumbnail?: string;

    vehicleBillOfSaleDocument?: string;
    vehicleTitleDocument?: string;
    vehicleBillOfLadingDocument?: string;
    vehicleSWBReleaseDocument?: string;
}

export interface UseVehicleImagesResult {
    vehicleImages: string[];
    vehicleVideos: string[];
    vehicleImagesLoading: boolean;
    vehicleImagesError: string | null;
    vehicleImagesRefetch: () => Promise<void>;
}

export interface UseVehicleThumbnailResult {
    vehicleThumbnail: string | null;
    vehicleThumbnailLoading: boolean;
    vehicleThumbnailError: string | null;
    vehicleThumbnailRefetch: () => Promise<void>;
}

export interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
    has_next: boolean;
    has_prev: boolean;
}


// Dashboard Types:

export interface Stats {
    totalCars: number;
    totalUsers: number;
    vehiclesDelivered: number;
    vehiclesNotDelivered: number;
}

export interface ActivityEvent {
    type: "Vehicle" | "User";
    action: string;
    id: string;
    vehicleName?: string;
    lotNumber?: string;
    username?: string;
    cognitoSub?: string;
    timestamp: string;
}

export interface RecentUser {
    id: string;
    username: string;
    email: string;
    cognitoSub: string;
    createdAt: string;
}

export interface RecentVehicle {
    id: string;
    vehicleName: string;
    lotNumber: string;
    auctionName: string;
    shippingStatus: string;
    createdAt: string;
    userEmail: string;
    cognitoSub: string;
}

export interface AdminDashboardData {
    stats: Stats;
    activityFeed: ActivityEvent[];
    recentUsers: RecentUser[];
    recentVehicles: RecentVehicle[];
    vehiclesNotDelivered: RecentVehicle[];
}

export interface UserDashboardData {
    stats: Stats;
    recentlyCreated: RecentVehicle[];
    notDelivered: RecentVehicle[];
}

// TRANSLATORS

// shipping status translator

export const translateStatus = (status: string) => {

    let translatedStatus = "AuthenticatedView.auction";

    switch (status) {
        case "Auction":
            translatedStatus = "AuthenticatedView.auction"
            break;
        case "In transit":
            translatedStatus = "AuthenticatedView.in_transit"
            break;
        case "Out for delivery":
            translatedStatus = "AuthenticatedView.out_for_delivery"
            break;
        case "Delivered":
            translatedStatus = "AuthenticatedView.delivered"
            break;
    }

    return translatedStatus;
}


export const translateActivity = (status: string) => {

    let translatedActivity = "AuthenticatedView.auction";

    switch (status) {
        case "Vehicle Created":
            translatedActivity = "AuthenticatedView.vehicle_created"
            break;
        case "User Created":
            translatedActivity = "AuthenticatedView.user_created"
            break;

    }

    return translatedActivity;
}