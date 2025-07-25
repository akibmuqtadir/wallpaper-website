require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Wallpaper API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));