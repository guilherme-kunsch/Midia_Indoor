import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { fetchPlaylistFromAPI } from "../../utils/playlist";
import { fetchDeviceFromAPI } from "../../utils/device";
import { useCache } from "../../hooks/cache";
import MidiaRenderer from "../../components/ShowMidias";

const MQTT_URL = import.meta.env.VITE_MQTT_URL;
const MQTT_USER = import.meta.env.VITE_MQTT_USER;
const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD;
export const Content = () => {
    const navigate = useNavigate()
    const { playlistId } = useParams();
    if(!playlistId) {
        return <>Loading...</>
    }
    const {search} = useLocation()
    const queryParams = new URLSearchParams(search)
    const deviceId = queryParams.get("device")
    const [currentIndex, setCurrentIndex] = useState(0);
    const {cachedUrls,isLoading,playlist,setPlaylist, cacheMidias} = useCache(playlistId)
    const updateCache = async () => {
        try {
          const fetchedPlaylist = await fetchPlaylistFromAPI(playlistId!);
          setPlaylist(fetchedPlaylist);
          await caches.delete("midias-" + playlistId!);

          if (fetchedPlaylist.midias && fetchedPlaylist.midias.length > 0) {
            await cacheMidias(fetchedPlaylist);
          }

          console.log("Cache atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar o cache via MQTT:", error);
        }
      };
    const onMessage = async (topic: string, message: Buffer) => {
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
    }
    useEffect(() => {
        const client = mqtt.connect(MQTT_URL, { username: MQTT_USER, password: MQTT_PASSWORD })
        client.on("error", console.error)
        client.on('connect', () => {
            console.log("conneted")
            client.subscribe([playlistId!, deviceId!])
        })

        client.on("message",onMessage)

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
            if(!currentMedia){
                setCurrentIndex(0)
                return
            }
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

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!playlist) {
        return <>Nenhuma playlist encontrada.</>;
    }
    return (
        <div className="w-screen h-screen bg-black">
            {playlist.midias && <MidiaRenderer cachedUrls={cachedUrls} midia={playlist.midias[currentIndex]} />}
        </div>
    );
};
