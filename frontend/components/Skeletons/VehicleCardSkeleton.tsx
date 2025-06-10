interface Props {
    appear_size?: string;
}

export default function VehicleCardSkeleton({ appear_size }: Props) {
    return (
        <div className={appear_size && `hidden ${appear_size}:block`}>
            <section aria-hidden className="mt-6">
                {/* hidden heading still useful for layout spacing if needed */}
                <h2 className="sr-only">Vehicle info skeleton</h2>

                <div className="sm:relative border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border animate-pulse">
                    <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                        {/* ───────────────── LEFT: image + basic info ───────────────── */}
                        <div className="sm:flex lg:col-span-5">
                            {/* square image placeholder */}
                            <div className="aspect-square w-full shrink-0 rounded-lg bg-gray-200 sm:size-40" />

                            {/* name + prices */}
                            <div className="mt-6 sm:mt-0 sm:ml-6 flex-1 space-y-3">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" />{" "}
                                {/* vehicle name */}
                                <div className="h-3 w-1/2 bg-gray-200 rounded" />{" "}
                                {/* price delivery */}
                                <div className="h-3 w-1/2 bg-gray-200 rounded" />{" "}
                                {/* price shipping */}
                            </div>
                        </div>

                        {/* ───────────────── RIGHT: details ───────────────── */}
                        <div className="mt-6 lg:col-span-7 lg:mt-0">
                            <dl className="grid grid-cols-1 gap-x-6 text-sm">
                                <div className="space-y-4 lg:flex lg:space-x-10">
                                    {/* Location / Auction / Lot # */}
                                    <div className="lg:w-50 space-y-2">
                                        <div className="h-3 mb-4 w-40 bg-gray-200 rounded" />
                                        <div className="h-3 w-24 bg-gray-200 rounded" />
                                        <div className="h-3 w-32 bg-gray-200 rounded" />
                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                    </div>

                                    {/* Logistics / Dispatch Info (hidden on lg breakpoint exactly as real comp) */}
                                    <div className="lg:w-70 space-y-2 block lg:hidden xl:block">
                                        <div className="h-3 mb-4 w-40 bg-gray-200 rounded" />
                                        <div className="h-3 w-15 bg-gray-200 rounded" />
                                        <div className="h-3 w-26 bg-gray-200 rounded" />
                                        <div className="h-3 w-18 bg-gray-200 rounded" />
                                        <div className="h-3 w-22 bg-gray-200 rounded" />
                                        <div className="h-3 w-12 bg-gray-200 rounded" />
                                    </div>

                                    {/* Status */}
                                    <div className="lg:w-50 space-y-2">
                                        <div className="h-3 mb-4 w-28 bg-gray-200 rounded" />
                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* bottom‑right “View” button placeholder */}
                    <div className="sm:absolute right-8 bottom-8">
                        <div className="h-8 w-24 bg-gray-200 rounded" />
                    </div>
                </div>
            </section>
        </div>
    );
}
