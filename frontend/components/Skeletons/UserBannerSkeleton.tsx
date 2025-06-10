export default function UserBannerSkeleton() {
    return (
        <div className="bg-white animate-pulse">
            <div className="bg-white pb-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* ────────────────────── Avatar + basic info ────────────────────── */}
                    <div className="sm:flex sm:space-x-5">
                        {/* Avatar circle */}
                        <div className="shrink-0">
                            <div className="mx-auto size-20 rounded-full bg-gray-200" />
                        </div>

                        {/* Name + email + phone */}
                        <div className="mt-4 sm:mt-0 sm:pt-1 space-y-2">
                            <div className="h-5 w-40 bg-gray-200 rounded mx-auto sm:mx-0" />{" "}
                            {/* username */}
                            <div className="h-4 w-48 bg-gray-200 rounded mx-auto sm:mx-0" />{" "}
                            {/* email */}
                            <div className="h-3 w-28 bg-gray-200 rounded mx-auto sm:mx-0" />{" "}
                            {/* phone */}
                        </div>
                    </div>

                    {/* ────────────────────── “Add vehicle” button ────────────────────── */}
                    <div className="mt-5 flex justify-center sm:mt-0">
                        <div className="h-9 w-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
