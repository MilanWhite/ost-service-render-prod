import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";

interface Props {
    title: string;
    options: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ title, options, onChange }: Props) => {
    const { t } = useTranslation();

    return (
        <div className=" w-full">
            <label
                htmlFor={title}
                className="block text-sm/6 font-medium text-gray-900"
            >
                {t(title as string)}
            </label>
            <div className="mt-2 grid grid-cols-1">
                <select
                    id={title}
                    name={title}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    onChange={onChange}
                >
                    {Object.entries(options).map(([key, name]) => (
                        <option key={key} value={key}>
                            {t(name as string)}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </div>
        </div>
    );
};

export default Dropdown;
