// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HTTPMethod from 'http-method-enum'
import type { NextApiRequest, NextApiResponse } from 'next'
import HttpStatusCode from '../../models/http-status-codes.enum';
import connectToDatabase from '../../libs/mongo';
import * as yup from "yup";
import { IApiResponse } from '../../models/playlist-api.model';
import Playlist from '../../models/Playlist.model';
import { isPlaylistDto } from '../../models/create-playlist.model';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    try {
        const { db, client } = await connectToDatabase();
     
        switch (req.method) {
            case HTTPMethod.GET:
                const retrievedPlaylist = await db.collection('playlist').find()?.toArray();
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
                    const { insertedId } = await db.collection('playlist').insertOne(playlistData);
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