var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie.js');
/* GET users listing. */
router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});
router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({
    imdbScore: -1
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req, res, next) => {
  const data = req.body;

  const movie = new Movie({
    title: data.title,
    imdbScore: data.imdbScore,
    category: data.category,
    country: data.country,
    year: data.year,
    directorID: data.directorID
  });

  /*movie.save((err, data) => {
    if (err) res.json(err);
    res.json(data);
  })*/

  const promise = movie.save();

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err);
  })
});


router.get('/:movieId', (req, res, next) => {
  const promise = Movie.find({
    _id: req.params.movieId
  });
  promise.then((movie) => {
    res.json(movie);
    console.log('Movie found')
  }).catch((err) => {
    res.json(err);
    console.log('Movie not found')
  })
});

router.put('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movieId,
    req.body, {
      new: true,
    }
  );
  promise.then((movie) => {
    res.json(movie);
    console.log('Movie updated')
  }).catch((err) => {
    res.json(err);
    console.log('Movie not found')
  })
})
router.delete('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndDelete(req.params.movieId);
  promise.then((movie) => {
    res.json(movie);
    console.log('Movie deleted')
  }).catch((err) => {
    res.json(err);
    console.log('Movie not found')
  })
});


router.get('/between/:start_year/:end_year', (req, res) => {
  const {
    start_year,
    end_year
  } = req.params;
  const promise = Movie.find({
    year: {
      "$gte": parseInt(start_year),
      "$lte": parseInt(end_year)
    }
  })
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});




module.exports = router;