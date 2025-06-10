import { Link } from "react-router-dom";

import { ActivityEvent } from "../../../hooks/interfaces";
import { URLS } from "../../../src/config/navigation";

interface Props {
    activity: ActivityEvent;
}

const ActivityLink = ({ activity }: Props) => {
    if (!activity.cognitoSub) return;

    if (activity.type === "Vehicle" && !activity.id) return;

    const path =
        activity.type === "Vehicle"
            ? URLS.adminViewClientSingularVehicle(
                  activity.cognitoSub,
                  activity.id!
              )
            : URLS.adminViewClientVehicles(activity.cognitoSub);

    const label =
        activity.type === "Vehicle" ? activity.vehicleName : activity.username;

    return (
        <Link
            to={path}
            className="font-medium text-primary hover:text-primary-hover"
        >
            {label}
        </Link>
    );
};

export default ActivityLink;
