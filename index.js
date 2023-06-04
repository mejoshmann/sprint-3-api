const express = require('express');
const cors = require('cors');
const app = express();
const videoRoutes = require('./routes/videos');
const videoUpload = require('./routes/videos');
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/videos', videoRoutes);
app.use('/videos', videoUpload);


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
