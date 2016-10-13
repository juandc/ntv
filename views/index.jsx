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
          <div className="Menu-icon Menu-icon--bars" id="langer">
            <label style={{cursor: 'pointer'}} className="mmenu fa fa-bars">
              <input type="checkbox" id="menu-bars"/>
              <ul id='lang' className='dropdown-cont'>
                <li><i className="flag flag-en"/><a href='/en' id="en-US">{this.props.lang['en-US']}</a></li>
                <li className="divider"/>
                <li><i className="flag flag-es"/><a href="/" id="es">{this.props.lang.es}</a></li>
              </ul>
            </label>
          </div>
          <figure id="logo" className="Menu-logo">
            <a className="Menu-icon Menu-icon--logo" href={this.props.lang ? '/en' : '/'}>
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
      <form className="SearchForm SearchForm--charging" action={this.props.lang ? '/en' : '/'} method="GET">
        <label htmlFor="search">Search movies: </label>
        <i className="fa fa-search"/>
        <input
          type="text"
          name="search"
          placeholder="robot"
          defaultValue={this.props.searchValue}
        />
        <button id="search" type="submit">{this.props.lang.search}</button>
      </form>
    )
  }
})

const MovieList = React.createClass({
  listMovies($listMovies, lang) {
    if ($listMovies != []) {
      return $listMovies.length
        ? JSON.parse($listMovies).map(function(res) {
          let movie = res.show ? res.show : res
          return <MovieItem movie={movie} lang={lang}></MovieItem>
        })
        : 'Sorry... no movies...'
      } else {
        return <li>{$listMovies}</li>
      }
  },
  render() {
    return (
      <ul className="Movies"> {
        this.listMovies(this.props.movies, this.props.lang)
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
        <a className="Movie-link" href={`${this.props.lang ? '/en' : ''}/movies/${movie.id}`} id={movie.id}>
          <figure className="Movie-avatar">
            <img
              width="300"
              title={movie.name}
              alt={movie.name}
              src={pic}
            />
            <span className="Movie-name">{movie.name}</span>
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
    const title = this.props.title ? 'Ntv - ' + this.props.title : 'Ntv';
    const search = this.props.search
    const movies = this.props.movies
    const es = { results: 'Resultados para', search: 'Buscar', es: 'Español', 'en-US': 'Ingles' }
    const en = { results: 'Results for', search: 'Search', es: 'Spanish', 'en-US': 'English' }
    const lang = this.props.lang ? en : es
    return (
      <html>
        <Head title={title}/>
        <body>
          <div id="content">
            <Menu lang={lang}/>
            <div className="container">
              <MovieList movies={movies} lang={lang}/>
              <div className="SearchBox">
                <h4>
                  <h4 id="results">{lang.results}</h4>
                  <span className="searchWord">
                    {this.props.search ? this.props.search.toUpperCase() : '...'}
                  </span>
                </h4>
              </div>
              <Search searchValue={search} lang={lang}/>
            </div>
          </div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <script src="/src/modal.js"></script>
          <script src="/src/app.js"></script>
        </body>
      </html>
    )
  }
})

module.exports = Template
