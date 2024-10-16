import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Playlist, Midia } from "../../types/playlist";
import TextView from "../../components/TextView";
import mqtt from "mqtt";
import { fetchPlaylistFromAPI } from "../../utils/playlist";
import {Cache} from "../../types/cache"
import { fetchDeviceFromAPI } from "../../utils/device";
const MQTT_URL = import.meta.env.VITE_MQTT_URL
const MQTT_USER = import.meta.env.VITE_MQTT_USER
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD
export const Content = () => {
    const navigate = useNavigate()
    const { playlistId } = useParams();
    const {search} = useLocation()
    const queryParams = new URLSearchParams(search)
    const deviceId = queryParams.get("device")
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [cachedUrls, setCachedUrls] = useState<Cache>({});


    const cacheMidias = async (playlist: Playlist) => {
        const cache = await caches.open("midias-"+playlist.id);
        const newCacheUrls: Cache = {};

        const mediaPromises = playlist.midias.map(async (midia) => {
            const cachedResponse = await cache.match(midia.file_url);
            if (!cachedResponse) {
                const fetchResponse = await fetch(import.meta.env.VITE_API_URL + "/midia/file/" + midia.file_name);
                if (fetchResponse.ok) {
                    await cache.put(midia.file_url, fetchResponse.clone());
                    if(midia.file_type === "text") {
                        const text = await fetchResponse.text()
                        newCacheUrls[midia.file_url] = text
                    }else {
                        const blob = await fetchResponse.blob();
                        const url = URL.createObjectURL(blob);
                        newCacheUrls[midia.file_url] = url;
                    }

                }
            } else {
                if(midia.file_type === "text") {
                    const text = await cachedResponse.text()
                    newCacheUrls[midia.file_url] = text
                }else {
                    const blob = await cachedResponse.blob();
                    const url = URL.createObjectURL(blob);
                    newCacheUrls[midia.file_url] = url;
                }
            }
        });

        await Promise.all(mediaPromises);
        setCachedUrls(newCacheUrls);
    };


    useEffect(() => {
        const checkAndLoadCache = async () => {
            try {
                setIsLoading(true);

                const cacheExists = await caches.has("midias-"+playlistId!);
                if (cacheExists) {
                    const cache = await caches.open("midias-"+playlistId!);
                    const cachedResponse = await cache.match(playlistId!);
                    if (cachedResponse) {
                        const cachedData = await cachedResponse.json();
                        setPlaylist(cachedData);
                    }
                }
                if (!cacheExists || !playlist) {
                    const fetchedPlaylist = await fetchPlaylistFromAPI(playlistId!);
                    setPlaylist(fetchedPlaylist);

                    const cache = await caches.open("midias-"+playlistId!);
                    const response = new Response(JSON.stringify(fetchedPlaylist));
                    await cache.put(playlistId!, response);

                    await cacheMidias(fetchedPlaylist);
                }
            } catch (error) {
                console.error("Erro ao carregar a playlist ou o cache:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAndLoadCache();
        const updateCache = async () => {
            try {
                const fetchedPlaylist = await fetchPlaylistFromAPI(playlistId!);
                setPlaylist(fetchedPlaylist);
                const cache = await caches.open("midias-"+playlistId!);
                const response = new Response(JSON.stringify(fetchedPlaylist));
                await cache.put(playlistId!, response.clone());

                await cacheMidias(fetchedPlaylist);
            } catch (error) {
                console.error("Erro ao atualizar o cache via MQTT:", error);
            }
        };
        const client = mqtt.connect(MQTT_URL, { username: MQTT_USER, password: MQTT_PASSWORD })
        client.on("error", console.error)
        client.on('connect', () => {
            console.log("conneted")
            client.subscribe([playlistId!, deviceId!])
        })

        client.on("message", async (topic, message) => {
            if(topic === playlistId) {
                const msg = message.toString()
                if(msg === "update") {
                    updateCache()
                }
                if(msg === "delete") {
                    navigate("/")
                }
            }
            if(topic === deviceId) {
                const msg = message.toString()
                if(msg === "delete") {
                    navigate("/")
                }

                if(msg === "update") {
                    const device = await fetchDeviceFromAPI(deviceId)
                    if(device.playlist_id) {
                        const result = await caches.delete("midias-"+playlistId!)
                        if(result) {
                            console.log("cache deletado")
                        }
                        navigate(`/${device.playlist_id}?device=${device.id}`)
                        window.location.reload()

                    } else {
                        navigate("/")
                    }
                }

            }
        })

        return () =>  {
            client.end(() => console.log("end"))
        }
    }, [playlistId, deviceId]);

    const nextMedia = () => {
        if (playlist && playlist.midias) {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 < playlist.midias.length ? prevIndex + 1 : 0
            );
        }
    };

    useEffect(() => {
        if (playlist && playlist.midias && playlist.midias.length > 0) {
            const currentMedia = playlist.midias[currentIndex];
            let duration = 6000;

            if (currentMedia.file_type === "video") {
                const videoElement = document.createElement("video");
                videoElement.src = currentMedia.file_url;

                videoElement.onloadedmetadata = () => {
                    duration = videoElement.duration * 1000;
                    setTimeout(nextMedia, duration);
                };
            } else {
                const timer = setTimeout(nextMedia, duration);
                return () => clearTimeout(timer);
            }
        }
    }, [currentIndex, playlist]);

    const renderMidia = (midia: Midia) => {
        const cached = cachedUrls[midia.file_url];
        if (!cached) return null;
        console.log(cached)
        switch (midia.file_type) {
            case "image":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <img src={cached} alt="" className="object-contain w-full h-full" />
                    </div>
                );
            case "video":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <video
                            src={cached}
                            className="w-full h-full object-contain"
                            autoPlay
                            muted
                            playsInline
                        />
                    </div>
                );
            case "text":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <TextView content={cached} className="text-center text-white text-3xl" />
                    </div>
                );
            default:
                return null;
        }
    };
    if (isLoading) {
        return <>Loading...</>;
    }

    if (!playlist) {
        return <>Nenhuma playlist encontrada.</>;
    }
    return (
        <div className="w-screen h-screen bg-black">
            {playlist.midias && renderMidia(playlist.midias[currentIndex])}
        </div>
    );
};
