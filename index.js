const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    fs.readFile('./data/videos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.send('error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports = router;