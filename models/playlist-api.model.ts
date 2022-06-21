import { PlaylistData, PlaylistDataDto } from "./create-playlist.model";

export interface IApiResponse {
    success: boolean;
    error?: string;
    playlistData?: PlaylistDataDto[] | any;
}

export enum ApiEndpoint {
    'ADD_PLAYLIST' = '/api/playlist'
}