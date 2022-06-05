import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import MapView from '../components/MapView'
import { useGeolocation } from 'react-use';
import { GeoLocationSensorState } from 'react-use/lib/useGeolocation';
import { FaRegSave } from 'react-icons/fa';
import { PlaylistItemTypeDesc } from '../models/map-data.model';

interface CreatePlaylistMapViewProps {
    geoLoc: GeoLocationSensorState;
}

function CreatePlaylistForm() {
    return (
        <>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What&apos;s the name of the place?</span>
                </label>
                <input type="text" className="input bg-white input-bordered rounded-none border-black text-black font-extrabold w-full" />
            </div>
            <div>
                <div className="form-control w-full max-w-md">
                    <label className="label">
                        <span className="label-text text-black font-extrabold">What can I do here?</span>
                    </label>
                </div>
                <div className="flex justify-between">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.FOOD}</span> &nbsp; <input type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.DRINK}</span>&nbsp;<input type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.CHILL}</span> &nbsp;<input type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What should I do here?</span>
                </label>
                <textarea className="textarea rounded-none border-black text-black font-extrabold w-full bg-white" ></textarea>
                <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt font-bold">chars remaining</span>
                </label>
            </div>
        </>
    )

}

function MapLoadingSkeleton() {
    return (
        <div className='h-[300px] card rounded-none card-bordered border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)] p-8'>
            <svg className="animate-spin  h-[150] w-[150] text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>

    )
}

function CreatePlaylistMapView({ geoLoc }: CreatePlaylistMapViewProps) {
    return (
        <>
            {
                !geoLoc?.error && geoLoc.latitude! && geoLoc.longitude! ?
                    <MapView mapCoords={{
                        lat: geoLoc.latitude,
                        lng: geoLoc.longitude
                    }} /> : <MapLoadingSkeleton />
            }
        </>
    )
}
const NewPlaylist: NextPage = () => {
    const geoLoc = useGeolocation();

    return (
        <>
            <div className="hero min-h-screen bg-[#ffdcaa] items-start p-8">

                <div className="hero-content text-center">
                    <div className="max-w-md space-y-8">
                        <Image src={'/assets/header-4.png'} alt='Logo saying Food Playlist' width={855} height={124} />

                        <div className="flex flex-col space-y-4">
                            {/* <button className='self-end btn btn-block md:w-16 bg-[#d9c6f1] border-none hover:text-[#c79ffa] text-[#8b6faf] font-bold'>Add</button> */}
                            {/* <label htmlFor="create-playlist-modal" className='btn btn-outline text-black font-bold rounded-none border-4 hover:bg-black hover:text-white hover:border-black hover:drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>Add New</label> */}
                            <CreatePlaylistMapView geoLoc={geoLoc} />
                            <div className="alert alert-info rounded-none drop-shadow-[4px_4px]">
                                <div>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                    <span className='animate-bounce'>☝</span>
                                    <span>Click the location on da map!</span>
                                    <span className='animate-bounce'>☝</span>
                                </div>
                            </div>
                            <CreatePlaylistForm />
                            <div className='flex justify-between'>
                                <button
                                    className='btn bg-[#ffb700] text-black rounded-none border-4 hover:bg-black hover:text-white drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>
                                    Add another place
                                </button>
                                <button
                                    className='btn bg-[#b1d0fe] text-black rounded-none border-4 hover:bg-black hover:text-white drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>
                                    <FaRegSave size={24} />
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPlaylist
