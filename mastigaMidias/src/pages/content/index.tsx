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
import { Password } from "@/types/password";

export const Content = () => {
    const navigate = useNavigate()
    const { playlistId } = useParams();
    const MQTT_URL = import.meta.env.VITE_MQTT_URL;
    const MQTT_USER = import.meta.env.VITE_MQTT_USER;
    const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const deviceId = queryParams.get("device");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cache, setCache] = useState<CacheInfo[] | null>(null);

    const [ senhaAtual, setSenhaAtual] = useState<string>("N/A")

    const [senhas, setSenhas ] = useState<Password[]>([])

    async function atualizaSenhas() {
        try {
            const response = await fetch(`${VITE_API_URL}/password/cinco`, {
                method: "GET"
            });
            const responseAtual = await fetch(`${VITE_API_URL}/password/atual`, {
                method: "GET"
            });
            const data = await response.json();
            let dataAtual = await responseAtual.json();
            setSenhas(data)
            setSenhaAtual(dataAtual.password)
        } catch (error) {
            console.error("Erro ao buscar as senhas:", error);
        }
    }

    if(!playlistId) return <>Loading...</>
    if(!senhaAtual) return <>Loading...</>
    if(!senhas) return <>Loading...</>

    useEffect(() => {
        const fetchCache = async () => {
            const playlist = await fetchPlaylistFromAPI(playlistId!);
            const fetchedCache = await fillCache(playlist);
            atualizaSenhas()
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
                atualizaSenhas()
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
    console.log(senhaAtual)
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="flex h-[90%] w-full">
                <div className="w-3/4 h-full overflow-hidden border-0 align-baseline list-none">
                    {cache && cache.length > 0 && renderMidia(cache[currentIndex])}
                </div>
                <div className="w-1/4 h-full bg-dark-blue justify-center items-center">
                    <div className="text-white">
                        <div className="px-8 flex w-full bg-dark-purple justify-center py-2 border-t text-xl">
                            <h2>Senha Atual</h2>
                        </div>
                        <div className="flex text-center justify-center py-12 border-t text-6xl">
                            <h2 className="animate-blink">{senhaAtual}</h2>
                        </div>
                        <div className="px-8 flex w-full bg-dark-purple justify-center py-2 border-t text-xl">
                            <h2>Últimas Senha</h2>
                        </div>
                        {senhas && senhas.map(senha => (
                            <div className="flex px-8 justify-center py-5 border-t text-3xl">
                                <h2>{senha.password}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Marquee/>
        </div>
    );
};
