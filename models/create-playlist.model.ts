import { ClickEventValue } from "google-map-react";
import { CoordinatesData } from "./map-data.model";

export interface PlaylistData {
    title: string;
    description: string;
    id?: string;
    playlistItem: CoordinatesData;
}

export interface PlaylistDataRetriever {
    userClickLoc: ClickEventValue | null;
    setuserClickLoc: React.Dispatch<React.SetStateAction<ClickEventValue | null>>;
}