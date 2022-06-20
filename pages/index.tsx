import type { GetServerSideProps, NextPage } from 'next'
import CreatePlaylist from '../components/CreatePlaylist'
import PlaylistCard from '../components/PlaylistCard'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import dbProm from '../libs/mongo'
import { getAllPlaylists } from './api/playlist'
import { PlaylistData } from '../models/create-playlist.model'

interface Props {
  playlistData: PlaylistData[];
}

const Home: NextPage<Props> = ({ playlistData }: Props) => {
  const router = useRouter();
  function handleAddNewPlaylistClick(e: any) {
    e.preventDefault();
    router.push('/new-playlist');
  }
  return (
    <>
      <div className="hero min-h-screen bg-[#ffdcaa] items-start p-8">
        <CreatePlaylist />
        <div className="hero-content text-center">
          <div className="max-w-md space-y-8">
            <Header />
            {/* <Image src={'/assets/header-3.png'} alt='Logo saying Food Playlist' width={760} height={68} /> */}
            {/* <Image src={'/assets/header-2.png'} alt='Logo saying Food Playlist' width={619} height={191} /> */}


            <div className="flex flex-col space-y-4">
              {/* <button className='self-end btn btn-block md:w-16 bg-[#d9c6f1] border-none hover:text-[#c79ffa] text-[#8b6faf] font-bold'>Add</button> */}
              <label htmlFor="create-playlist-modal" onClick={handleAddNewPlaylistClick} className='btn btn-outline text-black font-bold rounded-none border-4 hover:bg-black hover:text-white hover:border-black hover:drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>Add New</label>
              {
                playlistData.map((playlist) => <PlaylistCard playlist={playlist} key={playlist._id} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const db = await dbProm;
    const playlistData = await getAllPlaylists(db);
    if (playlistData) {
      console.log(playlistData[0]._id)
      return {
        props: {
          playlistData
        }
      }
    } else {
      throw new Error('Data not retrieved');
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Home
