import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { fetchPlaylistFromAPI } from "../../utils/playlist";
import { fetchDeviceFromAPI } from "../../utils/device";
import { CacheInfo } from "@/types/cache";
import { fillCache, updateCache } from "@/utils/cache";
import { FILETYPES } from "@/types/playlist";
import TextView from "@/components/TextView";

export const Content = () => {
    const navigate = useNavigate()
    const { playlistId } = useParams();
    const MQTT_URL = import.meta.env.VITE_MQTT_URL;
    const MQTT_USER = import.meta.env.VITE_MQTT_USER;
    const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const deviceId = queryParams.get("device");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cache, setCache] = useState<CacheInfo[] | null>(null);
    if(!playlistId) return <>Loading...</>
    useEffect(() => {
        const fetchCache = async () => {
            const playlist = await fetchPlaylistFromAPI(playlistId);
            const fetchedCache = await fillCache(playlist);
            setCache(fetchedCache);
        };
        fetchCache();
    }, [playlistId]);
    const onMessage = async (topic: string, message: Buffer) => {
        if (topic === playlistId) {
            const msg = message.toString()
            if (msg === "update") {
                console.log("updating cache")
               setCache(await updateCache(topic))
            }
            if (msg === "delete") {
                navigate("/")
            }
        }
        if (topic === deviceId) {
            const msg = message.toString()
            if (msg === "delete") {
                navigate("/")
            }

            if (msg === "update") {
                const device = await fetchDeviceFromAPI(deviceId)
                if (device.playlist_id) {
                    const result = await caches.delete("midias-" + playlistId!)
                    if (result) {
                        console.log("cache deletado")
                    }
                    navigate(`/${device.playlist_id}?device=${device.id}`)
                    window.location.reload()

                } else {
                    navigate("/")
                }
            }

        }
    }
    useEffect(() => {
        const client = mqtt.connect(MQTT_URL, { username: MQTT_USER, password: MQTT_PASSWORD })
        client.on("error", console.error)
        client.on('connect', () => {
            console.log("conneted")
            client.subscribe([playlistId!, deviceId!])
        })

        client.on("message", onMessage)

        return () => {
            client.end(() => console.log("end"))
        }
    }, [playlistId, deviceId]);
    const nextMedia = () => {
        if (cache && cache.length > 0) {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 < cache.length ? prevIndex + 1 : 0
            );
        }
    };

    useEffect(() => {
        if (cache && cache.length > 0) {
            const currentMedia = cache[currentIndex];
            if (!currentMedia) {
                setCurrentIndex(0);
                return;
            }

            let duration = 6000;
            if (currentMedia.fileType === "video") {
                const videoElement = document.createElement("video");
                videoElement.src = currentMedia.cacheData

                videoElement.onloadedmetadata = () => {
                    duration = videoElement.duration * 1000;
                    setTimeout(nextMedia, duration);
                };
            } else {
                const timer = setTimeout(nextMedia, duration);
                return () => clearTimeout(timer);
            }
        }
    }, [currentIndex, cache]);

    if (!cache) {
        return <>Loading...</>;
    }
    const renderMidia = (midia: CacheInfo) => {
        if (!midia) return null
        const midiaClassName = "absolute top-0 left-0 w-full h-full object-cover"
        switch (midia.fileType) {
            case FILETYPES.TEXT:
                return (
                    <div className="w-full h-full flex justify-center items-center">
                        <TextView content={midia.cacheData} className="text-center text-white text-3xl" />
                    </div>
                );

            case FILETYPES.VIDEO:
                return (
                    <div className="">
                        <video
                            src={midia.cacheData}
                            className={midiaClassName}
                            autoPlay
                            muted
                            playsInline
                        />
                    </div>
                );
            case FILETYPES.IMAGE:
                return (
                    <div className="">
                        <img src={midia.cacheData} alt="" className={midiaClassName} />
                    </div>
                );
            default:
                return null

        }
    }
    return (
        <div className="h-full overflow-hidden p-0 m-0 border-0 align-baseline list-none">{cache && cache.length > 0 && renderMidia(cache[currentIndex])}</div>
    );
};
