import { useParams } from "react-router-dom";
import API from "../../lib/api";
import { useEffect, useState } from "react";
import { Playlist, Midia } from "../../types/playlist";
import TextView from "../../components/TextView";
import mqtt from "mqtt";

export const Content = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [cachedUrls, setCachedUrls] = useState<{ [key: string]: string }>({});

    const fetchPlaylistFromAPI = async (id: string) => {
        return new API()
            .get("/playlist/" + id)
            .then((response) => {
                if (response.status !== 200) throw new Error("Erro ao buscar playlists");
                return response.data as Playlist;
            });
    };

    const cacheMidias = async (playlist: Playlist) => {
        const cache = await caches.open("midias-cache");
        const newCacheUrls: { [key: string]: string } = {};

        const mediaPromises = playlist.midias.map(async (midia) => {
            const cachedResponse = await cache.match(midia.file_url);
            if (!cachedResponse) {
                const fetchResponse = await fetch("http://localhost:8080/midia/file/" + midia.file_name);
                if (fetchResponse.ok) {
                    await cache.put(midia.file_url, fetchResponse);
                    const blob = await fetchResponse.blob();
                    const url = URL.createObjectURL(blob);
                    newCacheUrls[midia.file_url] = url;
                }
            } else {
                const blob = await cachedResponse.blob();
                const url = URL.createObjectURL(blob);
                newCacheUrls[midia.file_url] = url;
            }
        });

        await Promise.all(mediaPromises);
        setCachedUrls(newCacheUrls);
    };

    useEffect(() => {
        const checkAndLoadCache = async () => {
            try {
                setIsLoading(true);

                const cacheExists = await caches.has("midias-cache");
                if (cacheExists) {
                    const cache = await caches.open("midias-cache");
                    const cachedResponse = await cache.match(playlistId!);

                    if (cachedResponse) {
                        const cachedData = await cachedResponse.json();
                        setPlaylist(cachedData);
                    }
                }

                if (!cacheExists || !playlist) {
                    const fetchedPlaylist = await fetchPlaylistFromAPI(playlistId!);
                    setPlaylist(fetchedPlaylist);

                    const cache = await caches.open("midias-cache");
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
        const client = mqtt.connect("wss://a83b4fdcecf5450f96b470717e18f7e6.s1.eu.hivemq.cloud:8884/mqtt", { username: "ronandev", password: "@Ronan1605" })
        client.on("error", console.error)
        client.on('connect', () => {
            console.log("conneted")
        })
        client.on("message", (topic, message) => {
            if(topic === playlistId) {

            }
        })
        checkAndLoadCache();
        return () =>  {
            client.end(() => console.log("end"))
        }
    }, [playlistId]);

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
        const cachedUrl = cachedUrls[midia.file_url];
        if (!cachedUrl) return null;

        switch (midia.file_type) {
            case "image":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <img src={cachedUrl} alt="" className="object-contain w-full h-full" />
                    </div>
                );
            case "video":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <video
                            src={cachedUrl}
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
                        <TextView id={midia.id} className="text-center text-white text-3xl" />
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
