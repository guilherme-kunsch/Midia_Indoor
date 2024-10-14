import { useEffect, useState } from "react";
import API from "../../lib/api";
import { Midia, Playlist } from "../../types/playlist";
import TextView from "../../components/TextView";

export const Teste = () => {
    const playListId = "ED5DRESAPD6WF";
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0)
    const fetchPlaylistFromAPI = async (id: string) => {
        return new API()
            .get("/playlist/" + id)
            .then((response) => {
                if (response.status !== 200) throw new Error("Erro ao buscar playlists");
                return response.data as Playlist;
            });
    };

    const cacheMidias = async () => {
        try {
            const existCache = await caches.has(playListId);
            if (!existCache) {
                const cache = await caches.open(playListId);
                const fetchedPlaylist = await fetchPlaylistFromAPI(playListId);
                setPlaylist(fetchedPlaylist);

                // Cache das mídias
                await Promise.all(
                    fetchedPlaylist.midias.map(async (midia: Midia) => {
                        const response = await fetch("http://localhost:8080/midia/file/" + midia.file_name);
                        if (response.ok) {
                            await cache.put(midia.file_url, response);
                        }
                    })
                );
            } else {
                    const fetchedPlaylist = await fetchPlaylistFromAPI(playListId);
                    setPlaylist(fetchedPlaylist);

            }
        } catch (error) {
            console.error("Erro ao carregar mídias:", error);
        } finally {
            setIsLoading(false);
        }
    };
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

            // Definir a duração com base no tipo de mídia
            let duration = 6000; // 6 segundos para imagem ou texto por padrão
            if (currentMedia.file_type === "video") {
                const videoElement = document.createElement("video");
                videoElement.src = currentMedia.file_url;

                // Espera o vídeo carregar para pegar sua duração
                videoElement.onloadedmetadata = () => {
                    duration = videoElement.duration * 1000; // Duração do vídeo em milissegundos
                    setTimeout(nextMedia, duration);
                };
            } else {
                const timer = setTimeout(nextMedia, duration);
                return () => clearTimeout(timer); // Limpa o timer ao desmontar ou quando o índice muda
            }
        }
    }, [currentIndex, playlist]);
    const renderMidia = (midia: Midia) => {
        switch (midia.file_type) {
            case "image":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <img src={midia.file_url} alt="" className="object-contain w-full h-full" />
                    </div>
                );
            case "video":
                return (
                    <div key={midia.id} className="w-full h-full flex justify-center items-center">
                        <video
                            src={midia.file_url}
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

    useEffect(() => {
        cacheMidias();
    }, [playListId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(!playlist) {
        return <>Nenhuma playlist encontrada</>
    }
    return (
        <div className="w-screen h-screen bg-black">
            {playlist.midias && renderMidia(playlist.midias[currentIndex])}
        </div>
    );
};
