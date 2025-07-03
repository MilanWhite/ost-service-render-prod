import React from "react";
import LandingBannerImage from "../../src/assets/images/LandingBannerImage2.webp";

import LandingCTA from "./LandingCTA";

const LandingBanner: React.FC = () => {
    return (
        <div
            className="relative lg:h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${LandingBannerImage})` }}
        >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-primary-dark/75 lg:via-primary/30 to-primary/50 lg:to-transparent" />

            <div className="relative z-10 text-white">
                <LandingCTA />
            </div>
        </div>
    );
};

export default LandingBanner;
