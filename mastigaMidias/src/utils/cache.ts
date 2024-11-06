import { CacheInfo } from "@/types/cache";
import { Playlist } from "@/types/playlist";
import { fetchPlaylistFromAPI } from "./playlist";

const FETCH_FILE_API_URL = import.meta.env.VITE_API_URL + "/midia/file/"
export const fillCache =  async (playlist: Playlist) : Promise<CacheInfo[]>=> {
    const dados: CacheInfo[] = []
    const cache = await caches.open(playlist.id)
    for(const midia of playlist.midias) {
        const cachedResponse = await cache.match(FETCH_FILE_API_URL+ midia.file_name)
        if(cachedResponse) {
            dados.push({cacheData: await getContentType(midia.file_type, cachedResponse), fileType: midia.file_type, duration: midia.duration})
        } else {
            await fetch(FETCH_FILE_API_URL+ midia.file_name).then(async (response) => {
                if (!response.ok) throw new Error('Erro no Download do Arquivo ' + midia.file_url);
                const clone = response.clone()
                dados.push({cacheData: await getContentType(midia.file_type, response), fileType: midia.file_type, duration: midia.duration})
                await cache.put(FETCH_FILE_API_URL+ midia.file_name, clone)
            }).catch(err => console.log(err))
        }
    }
    return dados
}


const getContentType = async (fileType: string, response: Response) => {
    switch (fileType) {
        case "text":
            return await response.text()
        default:
            const blob = await response.blob()
            return URL.createObjectURL(blob)
    }
}

export const updateCache = async (playlistId: string) => {
    const playlist = await fetchPlaylistFromAPI(playlistId)
    const cache = await caches.open(playlistId)
    const dados: CacheInfo[] = []
    for(const midia of playlist.midias) {
        const cachedResponse = await cache.match(FETCH_FILE_API_URL+ midia.file_name)
        if(cachedResponse) {
            dados.push({cacheData: await getContentType(midia.file_type, cachedResponse), fileType: midia.file_type, duration: midia.duration})
        } else {
            fetch(FETCH_FILE_API_URL+ midia.file_name).then(async (response) => {
                if (!response.ok) throw new Error('Erro no Download do Arquivo ' + midia.file_url);
                const responseClone = response.clone()
                const clone = responseClone.clone()
                cache.put(FETCH_FILE_API_URL+ midia.file_name, responseClone)
                dados.push({cacheData: await getContentType(midia.file_type, clone), fileType: midia.file_type, duration: midia.duration})
            }).catch(err => console.log(err))
        }
    }
    return dados
}
