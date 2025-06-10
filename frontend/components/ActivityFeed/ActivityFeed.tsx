import { UserCircleIcon, TruckIcon } from "@heroicons/react/20/solid";
import { ActivityEvent, translateActivity } from "../../hooks/interfaces";

import ActivityLink from "./ActivityLink";
import { useTranslation } from "react-i18next";
import i18n from "../../src/i18";

interface Props {
    activityFeed: ActivityEvent[];
}

const ActivityFeed = ({ activityFeed }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-base font-semibold text-gray-900 mt-13">
                {t("AuthenticatedView.activity_feed")}
            </h1>
            <div className="flow-root p-6">
                <ul role="list" className="-mb-8">
                    {activityFeed.map((activity) => (
                        <li key={activity.id}>
                            <div className="relative pb-8">
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="flex size-8 items-center justify-center rounded-full ring-8 ring-white">
                                            {activity.type === "User" && (
                                                <UserCircleIcon className="text-primary" />
                                            )}
                                            {activity.type === "Vehicle" && (
                                                <TruckIcon className="w-7 text-primary" />
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-sm ">
                                                {t(
                                                    translateActivity(
                                                        activity.action
                                                    ) as string
                                                )}{" "}
                                                <ActivityLink
                                                    activity={activity}
                                                />
                                            </p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                            <time dateTime={activity.timestamp}>
                                                {new Intl.DateTimeFormat(
                                                    i18n.language,
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                ).format(
                                                    new Date(activity.timestamp)
                                                )}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ActivityFeed;
