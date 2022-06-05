import { NextPage } from 'next'
import React from 'react'
import { CoordinatesData } from '../models/map-data.model';

interface Props {
    data: CoordinatesData;
}


const PlaylistItem: NextPage<Props> = ({ data }: Props) => {
    return (
        <div className="card rounded-none card-bordered border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)] lg:card-side bg-[#81d0c5] compact">
            {/* <figure>
                <Image src="https://api.lorem.space/image/album?w=200&h=200" width={200} height={200} alt="Album" />
            </figure> */}
            <div className="card-body text-black">
                <h2 className="card-title">{data.foodPlaceName} {data.type}</h2>
                <p className='text-left'>{data.description}</p>
            </div>
        </div>
    )
}

export default PlaylistItem