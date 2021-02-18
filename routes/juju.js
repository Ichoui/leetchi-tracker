const express = require('express');
const router = express.Router();
const request = require('request');

const options = {
    url: 'https://www.leetchi.com/fr/Fundraising/Participations?hashId=lWnqXqWr&lastId=undefined',
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
};

router.get("/", function (req, res) {
    request(options, function (err, output, body) {
        const json = JSON.parse(body);
        const total = json.data.paging.Total;
        res.json(total)
    });
});

module.exports = router;
