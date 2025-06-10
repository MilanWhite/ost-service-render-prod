export default function SingularVehiclePageSkeleton() {
    return (
        <div className="bg-white animate-pulse">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:max-w-8xl lg:px-8">
                <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                    {/* ──────────────────────────── IMAGE SECTION ──────────────────────────── */}
                    <div className="lg:col-span-4 lg:row-end-1 space-y-4">
                        {/* large slide placeholder */}
                        <div className="w-full aspect-[4/3] rounded-lg bg-gray-200" />
                        {/* thumbnail strip */}
                    </div>

                    {/* ───────────────────── INFO & ACTIONS SECTION ───────────────────── */}
                    <div className="w-full mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none space-y-8">
                        {/* title */}
                        <div className="h-7 w-3/4 bg-gray-200 rounded" />

                        {/* Price block */}
                        <div className="border-t border-gray-200 pt-12 space-y-4">
                            <div className="h-5 w-28 bg-gray-200 rounded" />
                            <div className="grid grid-cols-2 gap-x-4">
                                {[0, 1].map((c) => (
                                    <div key={c} className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded" />
                                        <div className="h-4 w-20 bg-gray-200 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* General info */}
                        <div className="border-t border-gray-200 pt-12 space-y-4">
                            <div className="h-5 w-40 bg-gray-200 rounded" />
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="h-4 w-32 bg-gray-200 rounded" />
                                    <div className="h-4 w-44 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Shipping status */}
                        <div className="border-t border-gray-200 pt-12 space-y-4">
                            <div className="h-5 w-40 bg-gray-200 rounded" />
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                        </div>

                        {/* Logistics / shipping details */}
                        <div className="border-t border-gray-200 pt-12 space-y-4">
                            <div className="h-5 w-56 bg-gray-200 rounded" />
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="h-4 w-40 bg-gray-200 rounded" />
                                    <div className="h-4 w-48 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ───────────────────────── DOCUMENT LINKS ───────────────────────── */}
                    <div className="mt-12 border-t border-gray-200 pt-8 lg:col-span-4 space-y-4">
                        <div className="h-5 w-32 bg-gray-200 rounded" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-4 w-48 bg-gray-200 rounded"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
