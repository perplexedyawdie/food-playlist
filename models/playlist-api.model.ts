import { PlaylistData, PlaylistDataDto } from "./create-playlist.model";

export interface IApiResponse {
    success: boolean;
    error?: string;
    playlistData?: PlaylistData[] | any;
}