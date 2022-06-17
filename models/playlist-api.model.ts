import { PlaylistDataDto } from "./create-playlist.model";

export interface IApiResponse {
    success: boolean;
    error?: string;
    playlistData?: PlaylistDataDto | any;
}