export type VehicleFilterField =
    | "lot_number"
    | "auction_name"
    | "location"
    | "shipping_status"
    | "vehicle_name"
    | "container_number"
    | "port_of_origin"
    | "port_of_destination"
    | "delivery_address"
    | "receiver_id";

export const VehicleFilterChoices = {
    vehicle_name: "AuthenticatedView.vehicle_name",
    lot_number: "AuthenticatedView.lot_number",
    auction_name: "AuthenticatedView.auction_name",
    location: "AuthenticatedView.location",
    shipping_status: "AuthenticatedView.shipping_status",

    container_number: "AuthenticatedView.container_number",
    port_of_origin: "AuthenticatedView.port_of_origin",
    port_of_destination: "AuthenticatedView.port_of_destination",
    delivery_address: "AuthenticatedView.delivery_address",
    receiver_id: "AuthenticatedView.receiver_id",
}

// export const VehicleFilterChoices = {
//     vehicle_name: "Vehicle Name",
//     lot_number: "Lot Number",
//     auction_name: "Auction Name",
//     location: "Location",
//     shipping_status: "Shipping Status",

//     container_number: "Container Number",
//     port_of_origin: "Port of Origin",
//     port_of_destination: "Port of Destination",
//     delivery_address: "Delivery Address",
//     receiver_id: "Reciever Id",
// }

export const LanguageFilterChoices = {
    english: "English",
    russian: "Russian",
    ukrainian: "Ukrainian",

}