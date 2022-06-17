import { createContext } from 'react';
import { PlaylistDataRetriever } from '../models/create-playlist.model';

export const CreatePlaylistContext = createContext<PlaylistDataRetriever | null>(null)