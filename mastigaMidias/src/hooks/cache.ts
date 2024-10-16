import { useState, useEffect } from "react";
import { Playlist, Midia } from "../types/playlist";
import { Cache } from "../types/cache";
import { fetchPlaylistFromAPI } from "../utils/playlist";

export function useCache (playlistId: string) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [cachedUrls, setCachedUrls] = useState<Cache>({});
  const [isLoading, setIsLoading] = useState(true);

  const cacheMidias = async (playlist: Playlist) => {
    const cache = await caches.open("midias-" + playlist.id);
    const newCacheUrls: Cache = {};

    const mediaPromises = playlist.midias.map(async (midia: Midia) => {
      const cachedResponse = await cache.match(midia.file_url);
      if (!cachedResponse) {
        const fetchResponse = await fetch(import.meta.env.VITE_API_URL + "/midia/file/" + midia.file_name);
        if (fetchResponse.ok) {
          await cache.put(midia.file_url, fetchResponse.clone());

          if (midia.file_type === "text") {
            const text = await fetchResponse.text();
            newCacheUrls[midia.file_url] = text;
          } else {
            const blob = await fetchResponse.blob();
            const url = URL.createObjectURL(blob);
            newCacheUrls[midia.file_url] = url;
          }
        }
      } else {
        if (midia.file_type === "text") {
          const text = await cachedResponse.text();
          newCacheUrls[midia.file_url] = text;
        } else {
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

        const cacheExists = await caches.has("midias-" + playlistId);
        if (cacheExists) {
          const cache = await caches.open("midias-" + playlistId);
          const cachedResponse = await cache.match(playlistId);
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setPlaylist(cachedData);
          }
        }

        if (!cacheExists || !playlist) {
          const fetchedPlaylist = await fetchPlaylistFromAPI(playlistId);
          setPlaylist(fetchedPlaylist);

          const cache = await caches.open("midias-" + playlistId);
          const response = new Response(JSON.stringify(fetchedPlaylist));
          await cache.put(playlistId, response);

          await cacheMidias(fetchedPlaylist);
        }
      } catch (error) {
        console.error("Erro ao carregar a playlist ou o cache:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndLoadCache();
  }, [playlistId]);

  return { playlist, cachedUrls, setPlaylist, isLoading, cacheMidias };
};
