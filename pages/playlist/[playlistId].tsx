import { ObjectId } from 'mongodb'
import type { GetServerSideProps, NextPage } from 'next'
import CMarker from '../../components/CMarker'
import Header from '../../components/Header'
import MapView from '../../components/MapView'
import PlaylistItem from '../../components/PlaylistItem'
import dbProm from '../../libs/mongo'
import { PlaylistDataDto } from '../../models/create-playlist.model'
import { CoordinatesData, MapCoordinates, PlaylistItemType } from '../../models/map-data.model'
import { getAPlaylist } from '../api/playlist'

interface PlaylistItemsProps {
  data: CoordinatesData[];
}
export const PlaylistItems = ({ data }: PlaylistItemsProps) => {
  return (
    <div className="flex flex-col space-y-8">
      {
        data.map((place, idx) => (
          <PlaylistItem data={place} key={idx} />
        ))
      }
    </div>
  )
}

interface Props {
  playlist: PlaylistDataDto;
}

const Playlist: NextPage<Props> = ({ playlist }: Props) => {

  function getCenterCoords(data: CoordinatesData[]): MapCoordinates {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lng),
    }
  }

  function getMarkers(data: CoordinatesData[]) {
    return (
      data.map((place, idx) => {
        return (
          <CMarker
            key={idx}
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
            <div className="flex flex-col space-y-4">
              <MapView
                mapCoords={getCenterCoords(playlist.playlistItem)}
                playlistItems={<PlaylistItems data={playlist.playlistItem} />}
                markers={getMarkers(playlist.playlistItem)} />
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
          playlist: playlistData
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

export default Playlist
