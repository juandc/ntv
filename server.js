'use strict'

require('node-jsx').install({ harmony: true })

const express = require('express')
const http = require('http')
const request = require('request')
const reactEngine = require('react-engine')
const app = express()
const port = process.env.PORT || 3000

const engine = reactEngine.server.create()
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.engine('.jsx', engine)
app.set('view engine', 'jsx')

app.set('view', reactEngine.expressView)

app.get('/', (req, res) => {
  const search = req.query['search']
  if (search) {
    request(`http://api.tvmaze.com/search/shows?q=${search.trim()}`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      res.render('index', {
        title: search.toUpperCase(),
        search: search,
        movies: body,
      })
    })
  } else {
    request(`http://api.tvmaze.com/shows`, function (err, response, body) {
      if (err || response.statusCode != 200) res.render('index')
      res.render('index', {
        title: 'Home',
        search: search,
        movies: body,
      })
    })
  }
  console.log('Request for ' + search)
})

app.listen(port, () => {
  console.log('\nNext TV corriendo en el puerto: ' + port + '\n')
})
