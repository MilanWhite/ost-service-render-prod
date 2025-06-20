export default function UserDashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 grid-rows-[auto,1fr]">
            {/* ────────────────────────── TOP ROW ────────────────────────── */}
            <div className="md:col-span-2 flex gap-6 animate-pulse">
                {/* ── AdminOverview skeleton (¾ width on 2xl) ── */}
                <div className="basis-full 2xl:basis-2/4 space-y-6">
                    {/* Overview heading */}
                    <div className="h-8 w-48 bg-gray-200 rounded" />
                    <div className="h-5 w-15 bg-gray-200 rounded" />

                    {/* Stats grid: 4 cards */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-900/5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-24 sm:h-38 bg-white px-8 py-8 space-y-4"
                            >
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                <div className="h-8 w-12 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ────────────────────────── BOTTOM LEFT ────────────────────────── */}
            <div className="flex flex-col space-y-4 animate-pulse">
                {/* Title */}
                <div className="h-5 w-48 bg-gray-200 rounded" />
                {/* Vehicle rows */}
                <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-lg border border-gray-200 shadow-sm"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li
                            key={i}
                            className="flex justify-between gap-x-6 py-5 px-5"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="w-12 h-12 rounded-sm bg-gray-200" />
                                <div className="min-w-0 flex-auto space-y-2">
                                    <div className="h-4 w-40 bg-gray-200 rounded" />
                                    <div className="h-3 w-24 bg-gray-200 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-12 bg-gray-200 rounded" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ────────────────────────── BOTTOM RIGHT ────────────────────────── */}
            <div className="flex flex-col space-y-4 animate-pulse">
                {/* Title */}
                <div className="h-5 w-48 bg-gray-200 rounded" />
                {/* Vehicle rows */}
                <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-lg border border-gray-200 shadow-sm"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li
                            key={i}
                            className="flex justify-between gap-x-6 py-5 px-5"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="w-12 h-12 rounded-sm bg-gray-200" />
                                <div className="min-w-0 flex-auto space-y-2">
                                    <div className="h-4 w-40 bg-gray-200 rounded" />
                                    <div className="h-3 w-28 bg-gray-200 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-12 bg-gray-200 rounded" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
