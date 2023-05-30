const express = require('express');
const cors = require('cors');
const app = express();
const videoRoutes = require('./routes/videos');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('./videos', videoRoutes);


app.get('/', (req, res) => {
    res.send('<h1>My server</h1>');
});

app.listen(PORT, () => {
    console.log(`app running on port ${1080}`);
});
