'use strict'

const React = require('react')
// const ReactDOM = require('react-dom')

if (process.env.BROWSER) {
  require('../styles/style.styl')
}

const Template = React.createClass({
  formAction(e) {
    e.preventDefault()
  },
  // maap(list) {list.forEach(function(item) {console.log(item); return (<li>{item}<br/></li>) }); },
  render() {
    let title = this.props.title ? 'NTV - ' + this.props.title : 'NTV';
    let search = this.props.search ? this.props.search : ''
    let movies = this.props.movies ? this.props.movies : 'Sorry, not found'
    return (
      <html>
        <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
          <title>{title}</title>
          <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
          <link rel="stylesheet" href="/styles/font-awesome.min.css" />
          <link rel="stylesheet" href="/styles/googlefonts.min.css" />
        </head>
        <body>
          <div id="content">
            <nav className="Menu" id="Menu">
              <div className="container">
                <div className="Menu-icon Menu-icon--search">
                  <i className="fa fa-search" />
                </div>
                <figure className="Menu-logo">
                  <a className="Menu-logo" href="/">
                    <h2>{title}</h2>
                  </a>
                </figure>
              </div>
            </nav>
            <div className="container">
              <form className="SearchForm SearchForm--charging" onSubmit={this.formAction} method="GET">
                <label htmlFor="search">Search movies: </label>
                <input
                  type="text"
                  name="search"
                  placeholder="robot"
                  defaultValue={search}
                  // onKeyPress={this.handleChange}
                />
                <button type="submit">Buscar</button>
              </form>
              <div className="container">
                <ul> {
                  movies
                } </ul>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }
})

module.exports = Template
