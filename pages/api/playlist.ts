// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HTTPMethod from 'http-method-enum'
import type { NextApiRequest, NextApiResponse } from 'next'
import HttpStatusCode from '../../models/http-status-codes.enum';
import * as yup from "yup";
import { IApiResponse } from '../../models/playlist-api.model';
import Playlists, { PlaylistData } from '../../models/create-playlist.model';
import dbProm from '../../libs/mongo';
import { Collection, Db, ObjectId } from 'mongodb';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    try {
        const db = await dbProm;

        switch (req.method) {
            case HTTPMethod.GET:
                const retrievedPlaylist = await getAllPlaylists(db);
                console.log('retrieved playlist');
                console.log(retrievedPlaylist);
                if (!retrievedPlaylist) {
                    res.statusCode = HttpStatusCode.OK;
                    const apiResponse: IApiResponse = {
                        success: false,
                    }
                    res.send(apiResponse);
                } else {
                    res.statusCode = HttpStatusCode.OK;
                    const apiResponse: IApiResponse = {
                        success: true,
                        playlistData: retrievedPlaylist,
                    }
                    res.send(apiResponse);
                }
                break;
            case HTTPMethod.POST:
                const PlaylistItemSchema = yup.object().shape({
                    foodPlaceName: yup.string().max(50).required(),
                    type: yup.string().required(),
                    description: yup.string().max(250).required(),
                    lat: yup.string().required(),
                    lng: yup.string().required(),
                });

                const PlaylistSchema = yup.object({
                    title: yup.string().max(50).required(),
                    description: yup.string().max(250).required(),
                    playlistItem: yup.array().of(PlaylistItemSchema)
                }).required();
                const playlistData = req.body;
                const playlistDataIsValid = await PlaylistSchema.isValid(playlistData);
                if (playlistDataIsValid) {
                    const playlistCollection: Collection = db.collection(process.env.MONGO_COLLECTION!);
                    const { insertedId } = await playlistCollection.insertOne(playlistData);
                    res.statusCode = HttpStatusCode.OK;
                    const apiResponse: IApiResponse = {
                        success: true,
                        playlistData: insertedId,
                    }
                    res.send(apiResponse);
                } else {
                    throw new Error("Invalid request");
                }

                break;
            default:
                res.statusCode = HttpStatusCode.METHOD_NOT_ALLOWED;
                const apiResponse: IApiResponse = {
                    success: false,
                    error: 'Method not allowed'
                }
                res.json(apiResponse);
                break;
        }

    } catch (error) {
        console.error(error);
        res.statusCode = HttpStatusCode.BAD_REQUEST;

        const apiResponse: IApiResponse = {
            success: false,
            error: JSON.stringify(error)
        }
        res.json(apiResponse);
    }


}

export async function getAllPlaylists(db: Db): Promise<PlaylistData[] | null> {
    const PlaylistItemSchema = yup.object().shape({
        foodPlaceName: yup.string().max(50).required(),
        type: yup.string().required(),
        description: yup.string().max(250).required(),
        lat: yup.string().required(),
        lng: yup.string().required(),
    });

    const PlaylistSchema = yup.object({
        _id: yup.string(),
        title: yup.string().max(50).required(),
        description: yup.string().max(250).required(),
        playlistItem: yup.array().of(PlaylistItemSchema)
    }).required();
    const playlistCollection: Collection = db.collection(process.env.MONGO_COLLECTION!);
    const retrievedPlaylist = await playlistCollection.find({}).toArray();
    const dataIsValid = await yup.array().of(PlaylistSchema).isValid(retrievedPlaylist)

    if (dataIsValid) {
        return ObjectIdsToString((retrievedPlaylist as unknown as Playlists[]))
    } else {
        return null;
    }
}

export async function getAPlaylist(db: Db, _id: ObjectId): Promise<PlaylistData | null> {
    const PlaylistItemSchema = yup.object().shape({
        foodPlaceName: yup.string().max(50).required(),
        type: yup.string().required(),
        description: yup.string().max(250).required(),
        lat: yup.string().required(),
        lng: yup.string().required(),
    });

    const PlaylistSchema = yup.object({
        _id: yup.string(),
        title: yup.string().max(50).required(),
        description: yup.string().max(250).required(),
        playlistItem: yup.array().of(PlaylistItemSchema)
    }).required();
    const playlistCollection: Collection = db.collection(process.env.MONGO_COLLECTION!);
    const retrievedPlaylist = await playlistCollection.findOne({ _id });
    const dataIsValid = await PlaylistSchema.isValid(retrievedPlaylist);

    if (dataIsValid) {
        return ObjectIdToString((retrievedPlaylist as unknown as Playlists))
    } else {
        return null;
    }
}

function ObjectIdsToString(playlistData: Playlists[]): PlaylistData[] {
    return playlistData.map((playlist) => ({
        ...playlist,
        _id: playlist._id?.toString()
    }))
}

function ObjectIdToString(playlistData: Playlists): PlaylistData {
        return {
            ...playlistData,
            _id: playlistData._id?.toString()
        }
}