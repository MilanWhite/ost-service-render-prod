import { useState } from "react";

interface Props {
    images: string[];
    videos: string[];
}

import { Dialog, DialogBackdrop } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const ImageCarousel = ({ images, videos }: Props) => {
    const { t } = useTranslation();

    const [isCarouselFullscreen, setIsCarouselFullscreen] = useState(false);

    const total = images.length + videos.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevImage = () => setCurrentIndex((i) => (i - 1 + total) % total);
    const nextImage = () => setCurrentIndex((i) => (i + 1) % total);

    if (!images || images.length === 0) {
        return (
            <div className="text-center text-gray-500">
                {t("AuthenticatedView.Errors.no_images_available")}
            </div>
        );
    }

    const isVideo = currentIndex >= images.length;
    const src = isVideo
        ? videos[currentIndex - images.length]
        : images[currentIndex];

    return (
        <>
            <Dialog
                open={isCarouselFullscreen}
                onClose={() => setIsCarouselFullscreen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/80 data-[state=closed]:opacity-0 transition-opacity duration-300"
                />

                <div className="relative z-60 w-full h-full flex flex-col items-center justify-center">
                    <button
                        onClick={() => setIsCarouselFullscreen(false)}
                        className="absolute cursor-pointer p-2 pt-1 top-5 right-5 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full text-2xl z-50"
                    >
                        &times;
                    </button>

                    <div className="relative w-full sm:p-4 h-full flex items-center justify-center overflow-hidden">
                        {isVideo ? (
                            <video
                                src={src}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={src}
                                alt={`Slide ${currentIndex + 1}`}
                                className="w-full h-full object-contain"
                            />
                        )}

                        <button
                            onClick={prevImage}
                            className="absolute cursor-pointer p-3 pb-4 left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full z-40 text-2xl"
                        >
                            &#8249;
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute cursor-pointer p-3 pb-4 right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 p-3 rounded-full z-40 text-2xl"
                        >
                            &#8250;
                        </button>
                    </div>

                    <div className="absolute bottom-6 text-white text-sm bg-black/60 px-3 py-1 rounded">
                        {currentIndex + 1} / {total}
                    </div>
                </div>
            </Dialog>

            <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                    <div
                        onClick={() => {
                            setIsCarouselFullscreen(true);
                        }}
                    >
                        {isVideo ? (
                            <video
                                src={src}
                                controls
                                autoPlay
                                className="w-full rounded-lg shadow-md object-contain"
                            />
                        ) : (
                            <img
                                src={src}
                                alt={`Slide ${currentIndex + 1}`}
                                className="w-full rounded-lg shadow-md object-cover"
                            />
                        )}
                    </div>

                    <button
                        onClick={prevImage}
                        className="cursor-pointer text-lg text-primary absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
                    >
                        &#8249;
                    </button>

                    <button
                        onClick={nextImage}
                        className="cursor-pointer text-lg text-primary absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
                    >
                        &#8250;
                    </button>
                </div>

                <div className="text-sm text-gray-700">
                    {currentIndex + 1} / {total}
                </div>
            </div>
        </>
    );
};

export default ImageCarousel;
