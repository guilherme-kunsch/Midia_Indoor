import { Playlist } from "../types/playlist";
import {Cache} from "../types/cache"
export const cacheMidias = async (playlist: Playlist): Promise<Cache> =>  {
    const cache = await caches.open("midias-" + playlist.id);
    const newCacheUrls: Cache = {};

    const mediaPromises = playlist.midias.map(async (midia) => {
        const cachedResponse = await cache.match(midia.file_url);
        if (!cachedResponse) {
            const fetchResponse = await fetch("http://localhost:8080/midia/file/" + midia.file_name);
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
    return newCacheUrls
};
