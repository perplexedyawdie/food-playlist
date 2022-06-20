import { ClickEventValue } from "google-map-react";
import { ObjectId } from "mongodb";
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

export default class Playlists {
    constructor(
        public title: string, 
        public description: string, 
        public playlistItem: CoordinatesData[], 
        public _id?: ObjectId
        ) {}
}

export interface PlaylistDataRetriever {
    userClickLoc: ClickEventValue | null;
    setuserClickLoc: React.Dispatch<React.SetStateAction<ClickEventValue | null>>;
}

export function isPlaylistDto(playlistData: any): playlistData is PlaylistDataDto {
    return ((playlistData as PlaylistDataDto).title !== undefined && (playlistData as PlaylistDataDto).description !== undefined && Array.isArray((playlistData as PlaylistDataDto).playlistItem));
}