'use strict'

require('node-jsx').install({ harmony: true })

const express     = require('express')
const request     = require('request')
const reactEngine = require('react-engine')
const app         = express()
const engine      = reactEngine.server.create()
const port        = process.env.PORT || 3000

app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.engine('.jsx', engine)
app.set('view engine', 'jsx')

app.set('view', reactEngine.expressView)

// Spanish
app.get('/', (req, res) => {
  const search = req.query['search']
  if (search) {
    request(`http://api.tvmaze.com/search/shows?q=${search.trim()}`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      let movies = body
      res.render('index', {
        title: search.toUpperCase(),
        search: search,
        movies: movies,
      })
    })
  } else {
    request(`http://api.tvmaze.com/shows`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      let movies = body
      res.render('index', {
        title: 'Home',
        search: search,
        movies: movies,
      })
    })
  }
  console.log('Request for ' + search)
})

// Spanish redirects to Home
app.get('/es', (req, res) => {
  res.redirect('/')
})

// Spanish movies
app.get('/movies/:id', (req, res) => {
  request(`http://api.tvmaze.com/shows/${req.params.id}`, function (err, response, body) {
    if (err || response.statusCode != 200) res.render('index')
    let movies = new Object()
    movies = JSON.parse(body)
    res.render('singlemovie', {
      title: movies.name,
      search: req.params.id,
      movies: movies,
    })
  })
  console.log('Request for ' + req.params.id)
})

// English
app.get('/en', (req, res) => {
  const search = req.query['search']
  if (search) {
    request(`http://api.tvmaze.com/search/shows?q=${search.trim()}`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      let movies = body
      res.render('index', {
        title: search.toUpperCase(),
        search: search,
        movies: movies,
        lang: 'en-US'
      })
    })
  } else {
    request(`http://api.tvmaze.com/shows`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      let movies = body
      res.render('index', {
        title: 'Home',
        search: search,
        movies: movies,
        lang: 'en-US'
      })
    })
  }
  console.log('Request for ' + search)
})

// English Movies
app.get('/en/movies/:id', (req, res) => {
  request(`http://api.tvmaze.com/shows/${req.params.id}`, function (err, response, body) {
    if (err || response.statusCode != 200) res.render('index')
    let movies = new Object()
    movies = JSON.parse(body)
    res.render('singlemovie', {
      title: movies.name,
      search: req.params.id,
      movies: movies,
      lang: 'en-US',
    })
  })
  console.log('Request for ' + req.params.id)
})

app.listen(port, () => {
  console.log('\nNext TV corriendo en el puerto: ' + port + '\n')
})
