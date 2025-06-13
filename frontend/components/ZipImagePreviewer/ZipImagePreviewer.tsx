import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import JSZip from "jszip";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

interface Props {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    thumbnail: File | null;
    setThumbnail: Dispatch<SetStateAction<File | null>>;
    disableThumbnailSelection?: boolean;
}

export default function ZipImagePreviewer({
    files,
    setFiles,
    thumbnail,
    setThumbnail,
    disableThumbnailSelection = false,
}: Props) {
    const { t } = useTranslation();

    const [urlMap, setUrlMap] = useState<Map<string, string>>(new Map());
    const key = (f: File) => f.name + f.lastModified;
    const dragIndex = useRef<number | null>(null);

    // Add or unzip file
    const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (!picked) return;

        let incoming: File[] = [];

        if (picked.name.endsWith(".zip")) {
            const buf = await picked.arrayBuffer();
            const zip = await JSZip.loadAsync(buf);

            await Promise.all(
                Object.values(zip.files)
                    .filter(
                        (f) =>
                            !f.dir &&
                            /\.(png|jf?if|jpe?g|gif|webp|bmp|svg)$/i.test(
                                f.name
                            )
                    )
                    .map(async (entry) => {
                        const blob = await entry.async("blob");
                        incoming.push(
                            new File([blob], entry.name, { type: blob.type })
                        );
                    })
            );
        } else if (/\.(png|jf?if|jpe?g|gif|webp|bmp|svg)$/i.test(picked.name)) {
            incoming = [picked];
        } else {
            alert("Unsupported file type.");
            e.target.value = "";
            return;
        }

        setFiles((prev) => {
            const next = [...prev, ...incoming];
            if (!thumbnail && next.length) setThumbnail(next[0]);
            return next;
        });

        e.target.value = "";
    };

    useEffect(() => {
        const m = new Map<string, string>();
        files.forEach((f) => m.set(key(f), URL.createObjectURL(f)));
        setUrlMap(m);
        return () => m.forEach((u) => URL.revokeObjectURL(u));
    }, [files]);

    const removeFile = (f: File) => {
        setFiles((prev) => {
            const next = prev.filter((x) => key(x) !== key(f));
            if (thumbnail && key(thumbnail) === key(f))
                setThumbnail(next[0] ?? null);
            return next;
        });
        const url = urlMap.get(key(f));
        if (url) URL.revokeObjectURL(url);
    };

    const reorder = (from: number, to: number) => {
        if (from === to) return;
        setFiles((prev) => {
            const next = [...prev];
            const [moved] = next.splice(from, 1);
            next.splice(to, 0, moved);
            return next;
        });
    };

    return (
        <div className="space-y-4">
            <input
                type="file"
                accept=".zip,image/*"
                onChange={handleSelect}
                className="block w-full text-sm text-gray-700"
            />

            {files.length > 0 && (
                <div className="relative max-h-[32rem] overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {files.map((file, idx) => {
                            const isThumb =
                                thumbnail && key(file) === key(thumbnail);
                            return (
                                <div
                                    key={key(file)}
                                    draggable
                                    onDragStart={() =>
                                        (dragIndex.current = idx)
                                    }
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => {
                                        if (dragIndex.current !== null) {
                                            reorder(dragIndex.current, idx);
                                            dragIndex.current = null;
                                        }
                                    }}
                                    className={`relative flex flex-col cursor-move select-none ${
                                        isThumb
                                            ? "ring-2 ring-primary ring-offset-2"
                                            : "hover:ring-2 hover:ring-gray-300"
                                    } rounded-md`}
                                >
                                    {/* remove */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file);
                                        }}
                                        className="absolute top-1 right-1 z-20 bg-white/80 backdrop-blur-sm rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white"
                                        title="Remove"
                                    >
                                        <XMarkIcon className="w-3" />
                                    </button>

                                    {/* pick thumbnail if possible */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!disableThumbnailSelection) {
                                                setThumbnail(file);
                                            }
                                        }}
                                        className="focus:outline-none"
                                    >
                                        {!disableThumbnailSelection &&
                                            isThumb && (
                                                <span className="absolute top-1 left-1 z-10 bg-primary text-white text-[10px] px-1.5 py-[1px] rounded">
                                                    {t(
                                                        "AuthenticatedView.thumbnail"
                                                    )}
                                                </span>
                                            )}
                                        <img
                                            src={urlMap.get(key(file))}
                                            alt={file.name}
                                            className="w-full h-auto object-contain rounded-md"
                                        />
                                    </button>

                                    <figcaption className="text-xs mt-1 truncate px-1">
                                        {file.name}
                                    </figcaption>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
