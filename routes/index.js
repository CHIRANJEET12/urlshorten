const express = require('express');
const router = express.Router();
const URL = require('../models/url');

// Home route
router.get('/', (req, res) => {
    res.render('index');
});

// Create short URL
router.post('/shorten', async (req, res) => {
    const { url } = req.body;
    const newUrl = new URL({ redirectURL: url });
    await newUrl.save();
    res.render('shortUrl', { shortUrl: `${req.headers.host}/${newUrl.shortId}` });
});

// Redirect to original URL
router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOne({ shortId });

    if (urlEntry) {
        urlEntry.visitHistory.push(new Date());
        await urlEntry.save();
        res.redirect(urlEntry.redirectURL);
    } else {
        res.status(404).send('URL not found');
    }
});

module.exports = router;
