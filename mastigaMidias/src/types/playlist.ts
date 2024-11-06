export interface Playlist {
    id: string
    name: string
    midias: Midia[]

}

export interface Midia {
    id: string
    file_name: string
    file_original_name: string
    file_url: string
    file_type: string
    duration: number
}

export enum FILETYPES {
    VIDEO = "video",
    IMAGE = "image",
    TEXT = "text"
}
