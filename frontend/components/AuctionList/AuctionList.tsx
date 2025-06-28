import iaa from "../../src/assets/auction_logos/iaa.webp";
import copart from "../../src/assets/auction_logos/copart.svg";
import starkAutoSales from "../../src/assets/auction_logos/stark_auto_sales.png";
import progipixAutoAuction from "../../src/assets/auction_logos/progipix_auto_auction.svg";
import openlaneAutoAuction from "../../src/assets/auction_logos/openlane_auto_auction.svg";
import rbauction from "../../src/assets/auction_logos/rbauction.png";

import { useTranslation } from "react-i18next";

const AuctionList = () => {
  const { t } = useTranslation();

  const logos = [
    { src: iaa, alt: "IAA" },
    { src: copart, alt: "Copart" },
    { src: starkAutoSales, alt: "Stark Auto Sales" },
    { src: progipixAutoAuction, alt: "Progipix Auto Auction" },
    { src: openlaneAutoAuction, alt: "Openlane Auto Auction" },
    { src: rbauction, alt: "Ritchie Bros. Auctioneers" },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl text-center font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          {t("HomePage.our_auction_partners")}
        </h2>

        <div className="mx-auto mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center items-center">
          {logos.map(({ src, alt }, idx) => {
            let extra = "";
            if (idx === 4) {
              extra = "md:col-start-2 lg:col-start-auto";
            } else if (idx === 5) {
              extra = "md:col-start-3 lg:col-start-auto";
            }
            return (
              <img
                key={alt}
                src={src}
                alt={alt}
                className={`max-h-12 w-full object-contain ${extra}`}
                loading="lazy"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AuctionList;
