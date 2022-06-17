import React, { ReactNode, useContext } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import { NextPage } from 'next';
import { MapCoordinates } from '../models/map-data.model';
import { CreatePlaylistContext } from '../context/CreatePlaylistContext';

interface Props {
    mapCoords: MapCoordinates;
    markers?: ReactNode;
    playlistItems?: ReactNode;
}

const MapView: NextPage<Props> = ({ mapCoords, markers, playlistItems }: Props) => {
    const dataRetriever = useContext(CreatePlaylistContext);
    function handleMapClick(e: ClickEventValue) {
        try {
            console.log("Map Click");
            console.log(e);
            /**
             * *Clicking a control is registered as a map click & gives a coordinate.
             * *I want to check that a control is not clicked before setting the coord state
             */
            if (e.event?.target?.localName == 'div') {
                dataRetriever?.setuserClickLoc(e);
            }
        } catch (error) {
            console.error('in handleMapClick');
            console.error(error);
        }

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
                    defaultZoom={12}
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
                    {
                        playlistItems || dataRetriever?.userClickLoc ?
                            markers : null
                    }

                </GoogleMapReact>

            </div>
            {playlistItems}
        </>
    )
}



export default MapView