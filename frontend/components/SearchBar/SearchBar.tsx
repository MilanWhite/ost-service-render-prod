import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

interface Props {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearch }: Props) => {
    const { t } = useTranslation();

    const [term, setTerm] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(term);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [term, setSearch]);

    const onSearch = () => {
        setSearch(term);
    };

    return (
        <div>
            <label
                htmlFor="search"
                className="block text-sm/6 font-medium text-gray-900"
            >
                {t("AuthenticatedView.search")}
            </label>
            <div className="mt-2">
                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        onChange={(e) => setTerm(e.currentTarget.value)}
                    />
                    <div className="flex py-1.5 pr-1.5">
                        <button type="button" className="" onClick={onSearch}>
                            <MagnifyingGlassIcon className="cursor-pointer w-4.5 text-gray-500 hover:text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
