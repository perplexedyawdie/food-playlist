import mongoose from 'mongoose'

const PlaylistItemSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    foodPlaceName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
  }, {
    _id: true
  });

const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    playlistItems: {
        type: [PlaylistItemSchema],
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema)