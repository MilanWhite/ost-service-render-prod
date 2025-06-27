import copart from "../../src/assets/auction_logos/copart.svg";
import stark_auto_sales from "../../src/assets/auction_logos/stark_auto_sales.png";
import progipix_auto_auction from "../../src/assets/auction_logos/progipix_auto_auction.svg";
import openlane_auto_auction from "../../src/assets/auction_logos/openlane_auto_auction.svg";
import rbauction from "../../src/assets/auction_logos/rbauction.png";
import { useTranslation } from "react-i18next";

const AuctionList = () => {
    const { t } = useTranslation();

    return (
        <div className=" py-12 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-4xl text-center font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                {t("HomePage.our_auction_partners")}
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <img
                    alt="Transistor"
                    src={copart}
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                />
                <img
                    alt="Reform"
                    src={stark_auto_sales}
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                />
                <img
                    alt="Tuple"
                    src={progipix_auto_auction}
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                />
                <img
                    alt="SavvyCal"
                    src={openlane_auto_auction}
                    width={158}
                    height={48}
                    className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                />
                <img
                    alt="Statamic"
                    src={rbauction}
                    width={158}
                    height={48}
                    className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                />
                </div>
            </div>
        </div>
    );
};

export default AuctionList;
