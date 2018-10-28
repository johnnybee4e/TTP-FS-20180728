const router = require('express').Router();
const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient(process.env.GIPHY_API_KEY);

router.get('/trending', async (req, res, next) => {
  try {
    const trendingGifs = await client.trending('gifs', {});
    res.json(trendingGifs.data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/random', async (req, res, next) => {
  try {
    const randomGif = await client.random('gifs', {});
    console.log(randomGif)
    res.json(randomGif.data);
  } catch (err) {
    console.error(err);
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const queryGifs = await client.search('gifs', { q: 'searched term' });
    res.json(queryGifs.data);
  } catch (err) {
    console.error(err);
  }
});

router.post('/translate', async (req, res, next) => {
  try {
    const gifTranslation = await client.translate({ s: 'bananas in pajamas' });
    res.json(gifTranslation.data);
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;
