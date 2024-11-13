import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { fetchPlaylistFromAPI } from "../../utils/playlist";
import { fetchDeviceFromAPI } from "../../utils/device";
import { CacheInfo } from "@/types/cache";
import { fillCache, updateCache } from "@/utils/cache";
import { FILETYPES } from "@/types/playlist";
import TextView from "@/components/TextView";
import Marquee from "@/components/Marquee";
import alerta from '../../assets/alerta.mp3'

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

    const [senhas, _ ] = useState([
        {
            senha: "UCL001", guiche: "001"
        },
        {
            senha: "UCL002", guiche: "002"
        },
        {
            senha: "UCL003", guiche: "003"
        },
        {
            senha: "UCL004", guiche: "004"
        },
        {
            senha: "UCL005", guiche: "005"
        },
    ])


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
                const newCache = await updateCache(topic);
                setCache(newCache);
            } else if (msg === "delete") {
                navigate("/");
            }
        }
        else if (topic === deviceId) {
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
        else if (topic === "password"){
            const msg = message.toString()

            if (msg === "ping") {
                const audio = new Audio(alerta);
                audio.play().catch((error) => console.error("Erro ao reproduzir o áudio:", error));
            }
        }
    }
    useEffect(() => {
        const client = mqtt.connect(MQTT_URL, { username: MQTT_USER, password: MQTT_PASSWORD })
        client.on("error", console.error)
        client.on('connect', () => {
            console.log("conneted")
            client.subscribe([playlistId!, deviceId!, "password"])
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
        const midiaClassName = "flex top-0 left-0 w-full max-h-1/4 object-cover"
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
        <div className="h-screen w-screen flex flex-col">
            <div className="flex h-[92%] w-full">
                <div className="w-3/4 h-full overflow-hidden border-0 align-baseline list-none">
                    {cache && cache.length > 0 && renderMidia(cache[currentIndex])}
                </div>
                <div className="w-1/4 h-full bg-dark-blue justify-center items-center">
                    <div className="text-white">
                        <div className="flex px-4 justify-between rounded-lg py-12 border-b text-6xl">
                            <h2 className="animate-blink">{senhas[0].senha}</h2>
                            <h2 className="animate-blink">{senhas[0].guiche}</h2>
                        </div>
                        <div className="px-8 flex w-full bg-dark-purple rounded-lg justify-between py-2 border-b text-xl">
                            <h2>Senha</h2>
                            <h2>Guichê</h2>
                        </div>
                        {senhas.map(senha => (
                            <div className="flex px-8 justify-between py-5 rounded-lg border-b text-4xl">
                                <h2>{senha.senha}</h2>
                                <h2>{senha.guiche}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Marquee/>
        </div>
    );
};
