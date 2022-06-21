import { NextPage } from 'next'
import React, { useState, useContext, useEffect } from 'react'
import MapView from '../components/MapView'
import { useGeolocation } from 'react-use';
import { GeoLocationSensorState } from 'react-use/lib/useGeolocation';
import { FaRegSave } from 'react-icons/fa';
import { CoordinatesData, PlaylistItemType, PlaylistItemTypeDesc } from '../models/map-data.model';
import Header from '../components/Header';
import { CreatePlaylistContext } from '../context/CreatePlaylistContext';
import { ClickEventValue } from 'google-map-react';
import CMarker from '../components/CMarker';
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { PlaylistData, PlaylistDataDto } from '../models/create-playlist.model';
import axios from 'axios';
import { ApiEndpoint, IApiResponse } from '../models/playlist-api.model';
import HttpStatusCode from '../models/http-status-codes.enum';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
interface CreatePlaylistMapViewProps {
    geoLoc: GeoLocationSensorState;
}

const notifySuccess = () => toast.success('Playlist added successfully!', {
    icon: '😋'
});
const notifyErr = () => toast.error('Try again later!', {
    icon: '😢'
});

const PlaylistSchema = yup.object({
    title: yup.string().max(50).required(),
    description: yup.string().max(250).required(),
    playlistItem: yup.object().shape({
        foodPlaceName: yup.string().max(50).required(),
        type: yup.string().required(),
        description: yup.string().max(250).required(),
        lat: yup.string().required(),
        lng: yup.string().required(),
    })
}).required();





function CreatePlaylistForm() {
    const router = useRouter();

    const [playlistItems, setPlaylistItems] = useState<CoordinatesData[]>([])
    // const [isValid, setIsValid] = useState<boolean>(false)
    const { register, unregister, handleSubmit, getValues, setValue, resetField, formState: { errors, isValid } } = useForm<PlaylistData>({
        resolver: yupResolver(PlaylistSchema),
        mode: 'all',
    });

    const dataRetriever = useContext(CreatePlaylistContext);

    // useEffect(() => {
    //   console.log('formState changed');
    //   console.log(formState)
    //   if (formState.isValid) {
    //     setIsValid(true);
    //   } else {
    //     setIsValid(false);
    //   }
    // }, [formState])
        

    function handleEventTypeRadioBtnChange(e: any) {
        // e.preventDefault();
        console.log('radio btn changed')
        console.log(e.target.value)
        setValue('playlistItem.type', e.target.value);
    }



    function handleAddAnotherBtnClick(e: any) {
        e.preventDefault();
        console.log('adding another!')
        const tempPlaylistItemData: CoordinatesData = {
            foodPlaceName: getValues('playlistItem.foodPlaceName'),
            type: getValues('playlistItem.type'),
            description: getValues('playlistItem.description'),
            lat: getValues('playlistItem.lat'),
            lng: getValues('playlistItem.lng'),
        };
        setPlaylistItems((prev) => {
            if (!prev) {
                return [tempPlaylistItemData]
            } else {
                return [...prev, tempPlaylistItemData]
            }
        });
        resetField('playlistItem.description');
        resetField('playlistItem.foodPlaceName');
        resetField('playlistItem.type');
        resetField('playlistItem.lat');
        resetField('playlistItem.lng');
        setValue('title', getValues('title'));
        setValue('description', getValues('description'));
        if (dataRetriever?.userClickLoc) {
            dataRetriever.setuserClickLoc(null);
        }
    }
    useEffect(() => {
      if (dataRetriever?.userClickLoc) {
          setValue('playlistItem.lat', dataRetriever.userClickLoc.lat.toString());
          setValue('playlistItem.lng', dataRetriever.userClickLoc.lng.toString());
      }
    }, [dataRetriever?.userClickLoc])
    
    useEffect(() => {
        register('playlistItem.lat')
        register('playlistItem.lng')

        return () => {
            unregister('playlistItem.lat')
            unregister('playlistItem.lng')
        }
    }, [])

    const onSubmit: SubmitHandler<PlaylistData> = (data) => {
        // console.log(data);
        // console.log('temp data')
        // console.log(playlistItems)
        const payload: PlaylistDataDto = {
            title: data.title,
            description: data.description,
            playlistItem: []
        };
        payload.playlistItem = playlistItems;
        payload.playlistItem.push(data.playlistItem);
        axios.post<IApiResponse>(ApiEndpoint.ADD_PLAYLIST, payload)
        .then(({ data, status }) => {
            if (status === HttpStatusCode.OK && data.success) {
                console.log('saved playlist!');
                console.log(data);
                notifySuccess();
                setTimeout(() => {
                    
                }, 1500);
            } else {
                throw new Error(JSON.stringify(data?.error));
            }
        })
        .catch((err) => {
            console.error(err)
            notifyErr();
            setTimeout(() => {
                    
            }, 1500);
        })
        .finally(() => router.push('/'))
        // console.log('payload');
        // console.log(payload)
    }
    //TODO On Add Another click, save data to mongodb, retrieve document ID then hide the playlist title section. 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What&apos;s the title of this experience?</span>
                </label>
                <input {...register('title')} type="text" className="input bg-white input-bordered rounded-none border-black text-black font-extrabold w-full" />
            </div>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What&apos;s the vibe like?</span>
                </label>
                <textarea {...register('description')} className="textarea rounded-none border-black text-black font-extrabold w-full bg-white" ></textarea>
                <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt font-bold">chars remaining</span>
                </label>
            </div>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What&apos;s the name of the place?</span>
                </label>
                <input {...register('playlistItem.foodPlaceName')} type="text" className="input bg-white input-bordered rounded-none border-black text-black font-extrabold w-full" />
            </div>
            <div>
                <div className="form-control w-full max-w-md">
                    <label className="label">
                        <span className="label-text text-black font-extrabold">What can I do here?</span>
                    </label>
                </div>
                <div className="flex justify-between" onChange={handleEventTypeRadioBtnChange}>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.FOOD}</span> &nbsp;<input {...register('playlistItem.type')} value={PlaylistItemType.FOOD} type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.DRINK}</span>&nbsp;<input {...register('playlistItem.type')} value={PlaylistItemType.DRINK} type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className='label-text text-black font-bold'>{PlaylistItemTypeDesc.CHILL}</span> &nbsp;<input {...register('playlistItem.type')} value={PlaylistItemType.CHILL} type="radio" name="type-radio" className="radio radio-primary" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-control w-full max-w-md">
                <label className="label">
                    <span className="label-text text-black font-extrabold">What should I do here?</span>
                </label>
                <textarea {...register('playlistItem.description')} className="textarea rounded-none border-black text-black font-extrabold w-full bg-white" ></textarea>
                <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt font-bold">chars remaining</span>
                </label>
            </div>
            <div className='flex justify-between'>
                <button
                    type='button'
                    disabled={!isValid}
                    onClick={handleAddAnotherBtnClick}
                    className='btn bg-[#ffb700] text-black rounded-none border-4 hover:bg-black hover:text-white drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>
                    Add another place
                </button>
                <button
                    type='submit'
                    disabled={!isValid}
                    className='btn bg-[#b1d0fe] text-black rounded-none border-4 hover:bg-black hover:text-white drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>
                    <FaRegSave size={24} />
                </button>
            </div>
            <Toaster />
        </form>
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
    const { userClickLoc } = useContext(CreatePlaylistContext)!
    return (
        <>
            {
                !geoLoc?.error && geoLoc.latitude! && geoLoc.longitude! ?
                    <MapView mapCoords={{
                        lat: geoLoc.latitude,
                        lng: geoLoc.longitude
                    }}
                        markers={
                            <CMarker
                                // @ts-ignore
                                lat={userClickLoc?.lat}
                                lng={userClickLoc?.lng}
                            />
                        }
                    /> : <MapLoadingSkeleton />
            }
        </>
    )
}
const NewPlaylist: NextPage = () => {
    const geoLoc = useGeolocation();
    const [userClickLoc, setuserClickLoc] = useState<ClickEventValue | null>(null)

    return (
        <CreatePlaylistContext.Provider value={{
            userClickLoc,
            setuserClickLoc,
        }}>
            <div className="hero min-h-screen bg-[#ffdcaa] items-start p-8">

                <div className="hero-content text-center">
                    <div className="max-w-md space-y-8">
                        <Header />
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
                        </div>
                    </div>
                </div>
            </div>
        </CreatePlaylistContext.Provider>
    )
}

export default NewPlaylist
