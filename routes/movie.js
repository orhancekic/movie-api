var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie.js');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    status: 200
  });
});
router.post('/', (req, res, next) => {
  const data = req.body;

  const movie = new Movie({
    title: data.title,
    imdbScore: data.imdbScore,
    category: data.category,
    country: data.country,
    year: data.year
  });

  movie.save((err, data) => {
    if (err) res.json(err);
    res.json(data);
  })




});

module.exports = router;