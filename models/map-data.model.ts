export interface CoordinatesData {
    lat: string;
    lng: string;
    foodPlaceName: string;
    type: PlaylistItemType;
    id: string;
    description: string;
}

export interface MarkerProps {
    foodPlaceName: string;
    foodPlaceType: PlaylistItemType;
}

export enum PlaylistItemType {
    FOOD = '🍽',
    DRINK = '🥤',
    CHILL = '🏞'
}
