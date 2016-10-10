'use strict'

const React = require('react')

const Head = React.createClass({
  render() {
    return (
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        <title>{this.props.title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link rel="stylesheet" href="/styles/font-awesome.min.css" />
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
          <div className="Menu-icon Menu-icon--search">
            <i className="fa fa-search" />
          </div>
          <figure className="Menu-logo">
            <a className="Menu-logo" href="/">
              <h2>Ntv</h2>
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
      <form className="SearchForm SearchForm--charging" method="GET">
        <label htmlFor="search">Search movies: </label>
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
  render() {
    return (
      <ul> {
        this.props.movies.length
          ? JSON.parse(this.props.movies).map(function(res) {
            const movie = res.show ? res.show : res
            // return <li>{movie.name}</li>
            return <MovieItem movie={movie}></MovieItem>
          })
          : 'Sorry... no movies...'
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
    const des = 'Hello!'
    // const md = new Remarkable()
    // md.renderer = new RemarkableReactRenderer()
    // const des = md.render(html2markdown(movie.summary))
    return (
      <li className="Movie" >
        <a href={'/movies/' + movie.id}>
          {
            // <MovieImage title={movie.name} picture={pic} />
          }
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
    let search = this.props.search ? this.props.search : ''
    let movies = this.props.movies
    return (
      <html>
        <Head title={title}/>
        <body>
          <div id="content">
            <Menu/>
            <div className="container">
              <Search searchValue={search}/>
              <MovieList movies={movies}/>
            </div>
          </div>
        </body>
      </html>
    )
  }
})

module.exports = Template
