import React, { ReactNode } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import { NextPage } from 'next';
import { MapCoordinates } from '../models/map-data.model';

interface Props {
    mapCoords: MapCoordinates;
    markers?: ReactNode;
    playlistItems?: ReactNode;
}

const MapView: NextPage<Props> = ({ mapCoords, markers, playlistItems }: Props) => {
    function handleMapClick(e: ClickEventValue) {
        console.log("Map Click");
        console.log(e);
    }
  
    return (
        <>
            <div className='h-[300px] card rounded-none card-bordered border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)]'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! }}
                    defaultCenter={{
                        lat: mapCoords.lat,
                        lng: mapCoords.lng
                    }}
                    defaultZoom={16}
                    onClick={handleMapClick}
                >
                    {/* {
                        data.map((place) => (
                            <CMarker
                                key={place.id}
                                // @ts-ignore
                                lat={parseFloat(place.lat)}
                                lng={parseFloat(place.lng)}
                                foodPlaceName={place.foodPlaceName}
                                foodPlaceType={place.type}
                            />
                        ))
                    } */}
                    {markers}

                </GoogleMapReact>

            </div>
            {playlistItems}
        </>
    )
}



export default MapView