interface UsersTableSkeletonProps {
    rows?: number;
}

export default function UsersTableSkeleton({
    rows = 6,
}: UsersTableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                    {/* Avatar + name/email cell */}
                    <td className="py-5 pr-3 whitespace-nowrap sm:pl-0">
                        <div className="flex items-center">
                            {/* circle for avatar */}
                            <div className="h-11 w-11 bg-gray-200 rounded-full" />
                            <div className="ml-4 flex-1 space-y-2">
                                {/* line for username */}
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                {/* line for email */}
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>
                    </td>

                    {/* Phone number cell (hidden on small) */}
                    <td className="hidden px-3 py-4 md:table-cell">
                        <div className="h-4 bg-gray-200 rounded w-2/4 mr-auto" />
                    </td>

                    {/* “View” link cell */}
                    <td className="relative py-4 pl-3 text-right">
                        {/* short button placeholder */}
                        <div className="h-4 bg-gray-200 rounded w-16 ml-auto" />
                    </td>
                </tr>
            ))}
        </>
    );
}
