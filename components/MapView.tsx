import React from 'react'
import GoogleMapReact, { Maps, MapOptions } from 'google-map-react';
import { NextPage } from 'next';
import { CoordinatesData, MarkerProps } from '../models/map-data.model';
import PlaylistItem from './PlaylistItem';

interface Props {
    data: CoordinatesData[];
}


const CMarker: NextPage<MarkerProps> = ({ foodPlaceName, foodPlaceType }: MarkerProps) => <div className='tooltip tooltip-open text-2xl text-purple-700' data-tip={foodPlaceName}>{foodPlaceType}</div>

const MapView: NextPage<Props> = ({ data }: Props) => {
    console.log('key: ', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!)
    
    return (
        <>
            <div className='h-[300px] card rounded-none card-bordered border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)]'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! }}
                    defaultCenter={{
                        // lat: parseFloat(data[0].lat),
                        // lng: parseFloat(data[0].lng)
                        lat: 18.02119918520381,
                        lng: -76.77268917281683
                    }}
                    defaultZoom={18}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {
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
                    }
                </GoogleMapReact>

            </div>
            <div className="flex flex-col space-y-8">
            {
                    data.map((place) => (
                        <PlaylistItem data={place} key={place.id} />
                    ))
                }
            </div>
        </>
    )
}



export default MapView