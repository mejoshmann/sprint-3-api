const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {


    fs.readFile('./data/videos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.send('Warning Error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

module.exports = router;