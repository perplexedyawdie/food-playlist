import { ClickEventValue } from "google-map-react";
import { CoordinatesData } from "./map-data.model";

export interface PlaylistData {
    title: string;
    description: string;
    _id?: string;
    playlistItem: CoordinatesData;
}

export interface PlaylistDataDto {
    title: string;
    description: string;
    _id?: string;
    playlistItem: CoordinatesData[];
}

export interface PlaylistDataRetriever {
    userClickLoc: ClickEventValue | null;
    setuserClickLoc: React.Dispatch<React.SetStateAction<ClickEventValue | null>>;
}

export function isPlaylistDto(playlistData: any): playlistData is PlaylistDataDto {
    return ((playlistData as PlaylistDataDto).title !== undefined && (playlistData as PlaylistDataDto).description !== undefined && Array.isArray((playlistData as PlaylistDataDto).playlistItem));
}