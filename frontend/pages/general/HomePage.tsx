
import Navbar from "../../components/Navbar";
import LandingBanner from "../../components/LandingBanner";
import HowItWorks from "../../components/HowItWorks";
import WhyChooseUs from "../../components/WhyChooseUs";
import InfoSectionRightImage from "../../components/InfoSectionRightImage";
import InfoSectionLeftImage from "../../components/InfoSectionLeftImage";
import Footer from "../../components/Footer";

export function HomePage() {
    return (
        <>
            <Navbar />
            <LandingBanner />
            <HowItWorks />
            <WhyChooseUs />
            <InfoSectionRightImage />
            <InfoSectionLeftImage />
            <Footer />
        </>
    );
}
