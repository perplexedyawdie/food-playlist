export interface CoordinatesData {
    lat: string;
    lng: string;
    foodPlaceName: string;
    type: PlaylistItemType;
    id: string;
    description: string;
}

export interface MarkerCoords {
    lat: string;
    lng: string;
}

export enum PlaylistItemType {
    FOOD = '🍽',
    DRINK = '🥤',
    CHILL = '🏞'
}

export interface MapCoordinates {
    lat: number;
    lng: number;
}
