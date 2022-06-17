import { NextPage } from "next";
import { CoordinatesData, MarkerCoords } from "../models/map-data.model";
import { GiPositionMarker } from 'react-icons/gi';

interface Props {
    markerData?: CoordinatesData;
}

const CMarker: NextPage<Props> = ({ markerData }: Props) => {
    return (
        <>
        {
            markerData ? 
            <div className='tooltip tooltip-open text-2xl text-purple-700' data-tip={(markerData as CoordinatesData).foodPlaceName}>{(markerData as CoordinatesData).type}</div>
            :
            <GiPositionMarker size={24} className='text-purple-700' />
        }
        </>
    )
}

export default CMarker;