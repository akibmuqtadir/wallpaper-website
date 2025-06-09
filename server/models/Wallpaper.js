const mongoose = require('mongoose');

const WallpaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tags: [String],
    category: String,
    imageUrl: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Wallpaper', WallpaperSchema);