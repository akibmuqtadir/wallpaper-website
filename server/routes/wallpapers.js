const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Wallpaper = require('../models/Wallpaper');
const parser = require('../config/cloudinary');

// Upload wallpaper
router.post('/', protect, parser.single('image'), async (req, res) => {
    try {
        const { title, description, tags, category } = req.body;
        
        const wallpaper = new Wallpaper({
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            category,
            imageUrl: req.file.path,
            uploader: req.user.id
        });
        
        await wallpaper.save();
        res.json(wallpaper);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all wallpapers
router.get('/', async (req, res) => {
    try {
        const wallpapers = await Wallpaper.find().populate('uploader', 'username');
        res.json(wallpapers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get single wallpaper
router.get('/:id', async (req, res) => {
    try {
        const wallpaper = await Wallpaper.findById(req.params.id).populate('uploader', 'username');
        
        if (!wallpaper) {
            return res.status(404).json({ msg: 'Wallpaper not found' });
        }
        
        // Increment download count
        wallpaper.downloads += 1;
        await wallpaper.save();
        
        res.json(wallpaper);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;