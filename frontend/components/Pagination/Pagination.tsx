import React from "react";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { Meta } from "../../hooks/interfaces";
import { useTranslation } from "react-i18next";

type PageItem = number | "...";

function getPageItems(totalPages: number): PageItem[] {
    if (totalPages <= 6) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
}

interface Props {
    meta: Meta;
    setPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ meta, setPage }) => {
    const { t } = useTranslation();

    const currentPage = meta.page;
    const totalPages = meta.total_pages;
    const items = getPageItems(totalPages);

    return (
        <nav
            className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
            aria-label="Pagination"
        >
            {/* Previous */}
            <div className="-mt-px flex w-0 flex-1">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setPage(currentPage - 1);
                    }}
                    aria-disabled={currentPage === 1 ? "true" : undefined}
                    className={
                        "inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium " +
                        (currentPage === 1
                            ? "text-gray-300 cursor-default"
                            : "text-gray-500 hover:border-gray-300 hover:text-gray-700")
                    }
                >
                    <ArrowLongLeftIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    {t("AuthenticatedView.previous")}
                </a>
            </div>

            {/* Page numbers */}
            <div className="hidden md:-mt-px md:flex">
                {items.map((item, idx) =>
                    item === "..." ? (
                        <span
                            key={`ell-${idx}`}
                            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                        >
                            …
                        </span>
                    ) : (
                        <a
                            key={item}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (item !== currentPage) setPage(item);
                            }}
                            aria-current={
                                item === currentPage ? "page" : undefined
                            }
                            className={
                                item === currentPage
                                    ? "inline-flex items-center border-t-2 border-primary px-4 pt-4 text-sm font-medium text-primary"
                                    : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }
                        >
                            {item}
                        </a>
                    )
                )}
            </div>

            {/* Next */}
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setPage(currentPage + 1);
                    }}
                    aria-disabled={
                        currentPage === totalPages ? "true" : undefined
                    }
                    className={
                        "inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium " +
                        (currentPage === totalPages
                            ? "text-gray-300 cursor-default"
                            : "text-gray-500 hover:border-gray-300 hover:text-gray-700")
                    }
                >
                    {t("AuthenticatedView.next")}
                    <ArrowLongRightIcon
                        className="ml-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </nav>
    );
};

export default Pagination;
