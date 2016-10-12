'use strict'

const React = require('react')
const html2markdown = require('html2markdown')
const Remarkable = require('remarkable')
const RemarkableReact = require('remarkable-react')

const Head = React.createClass({
  render() {
    return (
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        <title>{this.props.title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link rel="stylesheet" href="/styles/font-awesome.min.css" />
        <link rel="stylesheet" href="/styles/style.css" />
        <link rel="stylesheet" href="/styles/googlefonts.min.css" />
      </head>
    )
  }
})

const Menu = React.createClass({
  render() {
    return (
      <nav className="Menu" id="Menu">
        <div className="container">
          <div className="Menu-icon Menu-icon--bars">
            <i className="fa fa-bars" />
          </div>
          <figure className="Menu-logo">
            <a className="Menu-icon Menu-icon--logo" href="/">
              <h2>N<span>tv</span></h2>
            </a>
          </figure>
        </div>
      </nav>
    )
  }
})

const Search = React.createClass({
  render() {
    return (
      <form className="SearchForm SearchForm--charging" action="/" method="GET">
        <label htmlFor="search">Search movies: </label>
        <i className="fa fa-search"/>
        <input
          type="text"
          name="search"
          placeholder="robot"
          defaultValue={this.props.searchValue}
        />
        <button type="submit">Buscar</button>
      </form>
    )
  }
})

const MovieList = React.createClass({
  listMovies($listMovies) {
    if ($listMovies != []) {
      return $listMovies.length
        ? JSON.parse($listMovies).map(function(res) {
          let movie = res.show ? res.show : res
          return <MovieItem movie={movie}></MovieItem>
        })
        : 'Sorry... no movies...'
      } else {
        return <li>{$listMovies}</li>
      }
  },
  render() {
    return (
      <ul className="Movies"> {
        this.listMovies(this.props.movies)
      } </ul>
    )
  }
})

const MovieItem = React.createClass({
  render() {
    const movie = this.props.movie
    const pic = movie.image
      ? JSON.stringify(movie.image.medium).split('"').join('')
      : 'http://tvmazecdn.com/images/no-img/no-img-portrait-text.png'
    const styles = { backgroundImage: 'url(' + pic + ')' }
    const md = new Remarkable()
    md.renderer = new RemarkableReact()
    const des = md.render(html2markdown(movie.summary))
    return (
      <li key={movie.id} className="Movie" >
        <a data-link={'/movies/' + movie.id}>
          <figure className="Movie-avatar">
            <img
              width="300"
              title={movie.name}
              alt={movie.name}
              src={pic}
            />
          </figure>
        </a>
        <div id={`modal${movie.id}`} className="modal modal-fixed-footer">
          <div className="modal-content" style={styles}>
            <div className="modal-cont">
              <h2>{movie.name}</h2>
              <div>{des}</div>
            </div>
          </div>
          <div className="modal-footer">
            <a href={movie.url} target="_banck" className="modal-action modal-close btn">Ver pelicula</a>
          </div>
        </div>
      </li>
    )
  }
})

const Template = React.createClass({
  render() {
    let title = this.props.title ? 'NTV - ' + this.props.title : 'NTV';
    let search = this.props.search
    let movies = this.props.movies
    return (
      <html>
        <Head title={title}/>
        <body>
          <div id="content">
            <Menu/>
            <div className="container">
              <MovieList movies={movies}/>
              <div className="SearchBox">
                <h4>
                  Resultados para
                  <span className="searchWord">
                    {this.props.search ? this.props.search.toUpperCase() : '...'}
                  </span>
                </h4>
              </div>
              <Search searchValue={search}/>
            </div>
          </div>
        </body>
      </html>
    )
  }
})

module.exports = Template
