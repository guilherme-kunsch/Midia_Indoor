import API from "../lib/api";
import { Playlist } from "../types/playlist";

export const fetchPlaylistFromAPI = async (id: string) => {
    return new API()
        .get("/playlist/" + id)
        .then((response) => {
            if (response.status !== 200) throw new Error("Erro ao buscar playlists");
            return response.data as Playlist;
        });
};
