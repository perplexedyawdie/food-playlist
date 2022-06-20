import { ObjectId } from 'mongodb'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CMarker from '../../components/CMarker'
import Header from '../../components/Header'
import MapView from '../../components/MapView'
import PlaylistCard from '../../components/PlaylistCard'
import PlaylistItem from '../../components/PlaylistItem'
import dbProm from '../../libs/mongo'
import { CoordinatesData, MapCoordinates, PlaylistItemType } from '../../models/map-data.model'
import { getAPlaylist } from '../api/playlist'

interface PlaylistItemsProps {
  data: CoordinatesData[];
}
export const PlaylistItems = ({ data }: PlaylistItemsProps) => {
  return (
    <div className="flex flex-col space-y-8">
      {
        data.map((place) => (
          <PlaylistItem data={place} key={place.id} />
        ))
      }
    </div>
  )
}


const Playlist: NextPage = () => {
  /**
   * export interface CoordinatesData {
  lat: string;
  lng: string;
  foodPlaceName: string;
  type: PlaylistItemType;
  id: string;
}
   */
  const playlistData: CoordinatesData[] = [
    {
      foodPlaceName: 'Chilitos',
      type: PlaylistItemType.FOOD,
      id: '1',
      lat: '18.02119918520381',
      lng: '-76.77268917281683',
      description: 'Pre order a Burrito from here'
    },
    {
      foodPlaceName: 'Heecha',
      type: PlaylistItemType.DRINK,
      id: '2',
      lat: '18.018552187706845',
      lng: '-76.76682863048794',
      description: 'The Honey Lemonade Iced Tea slapss'
    },
    {
      foodPlaceName: 'Hope Gardens',
      type: PlaylistItemType.CHILL,
      id: '3',
      lat: '18.02123547022138',
      lng: '-76.74877565932353',
      description: 'Try and get a seat at the last gazebo near to the entrance. Best to go late afternoon on Thursday'
    }
  ]
  function getCenterCoords(data: CoordinatesData[]): MapCoordinates {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lng),
    }
  }

  function getMarkers(data: CoordinatesData[]) {
    return (
      data.map((place) => {
        return (
          <CMarker
            key={place.id}
            markerData={place}
            // @ts-ignore
            lat={parseFloat(place.lat)}
            lng={parseFloat(place.lng)}
          />

        )
      })
    )
  }
  return (
    <>
      <div className="hero min-h-screen bg-[#ffdcaa] items-start p-8">
        <div className="hero-content text-center">
          <div className="max-w-md space-y-8">
            <Header />
            {/* <Image src={'/assets/header-3.png'} alt='Logo saying Food Playlist' width={760} height={68} /> */}
            {/* <Image src={'/assets/header-2.png'} alt='Logo saying Food Playlist' width={619} height={191} /> */}


            <div className="flex flex-col space-y-4">
              {/* <button className='self-end btn btn-block md:w-16 bg-[#d9c6f1] border-none hover:text-[#c79ffa] text-[#8b6faf] font-bold'>Add</button> */}
              {/* <button className='btn btn-outline text-black font-bold rounded-none border-4 hover:bg-black hover:text-white hover:border-black hover:drop-shadow-[4px_4px] transition-all ease-in-out duration-200'>Add New</button> */}
              <MapView
                mapCoords={getCenterCoords(playlistData)}
                playlistItems={<PlaylistItems data={playlistData} />}
                markers={getMarkers(playlistData)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const playlistId = new ObjectId((query.playlistId as string))
    const db = await dbProm;
    const playlistData = await getAPlaylist(db, playlistId);
    if (playlistData) {
      return {
        props: {
          playlistData
        }
      }
    } else {
      throw new Error('Data not retrieved');
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

export default Playlist
