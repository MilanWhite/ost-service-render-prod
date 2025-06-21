interface Props {
    mobileSrc: string;
    desktopSrc: string;
    alt?: string;
    className?: string;
}

const VehicleThumbnail = ({
    mobileSrc,
    desktopSrc,
    alt = "",
    className = "",
}: Props) => {
    return (
        <>
            <img
                src={mobileSrc || desktopSrc || ""}
                alt={alt}
                className={`block sm:hidden ${className}`}
                onError={(e) => {
                    const img = e.currentTarget;

                    if (desktopSrc && img.src !== desktopSrc) {
                        img.src = desktopSrc;
                        return;
                    }

                    img.style.display = "none";
                }}
            />

            <img
                src={desktopSrc || mobileSrc || ""}
                alt={alt}
                className={`hidden sm:block ${className}`}
            />
        </>
    );
};

export default VehicleThumbnail;
