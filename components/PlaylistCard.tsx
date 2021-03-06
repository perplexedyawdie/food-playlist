import React from 'react'
import { useRouter } from 'next/router'
import { PlaylistData } from '../models/create-playlist.model';

interface Props {
    playlist: PlaylistData;
  }
function PlaylistCard({ playlist }: Props) {
    const router = useRouter();
    function handlePlaylistCardClick(e: any) {
        e.preventDefault();
        router.push({
            pathname: '/playlist/[playlistId]',
            query: { playlistId: playlist._id }
        });
    }
    return (
        <div className="card rounded-none card-bordered border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)] lg:card-side bg-[#81d0c5] compact">
            {/* <figure>
                <Image src="https://api.lorem.space/image/album?w=200&h=200" width={200} height={200} alt="Album" />
            </figure> */}
            <div className="card-body text-black">
                <h2 className="card-title">{playlist.title}</h2>
                <p className='text-left'>{playlist.description}</p>
                <div className="card-actions justify-end">
                    <button
                        className='self-end btn w-16 bg-[#c79ffa] border-black border-4 drop-shadow-[4px_4px] hover:text-[#c79ffa] rounded-none text-black font-bold'
                        onClick={handlePlaylistCardClick}
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard