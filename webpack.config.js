var path = require('path')

var config = {
  eslint: {
    configFile: '.eslintrc'
  },
  entry: './src/app.js',
  output: {
    path: 'public/src/',
    filename: 'app.js'
  },
  module: {
    resolve: {
      extensions: ['', '.js', '.styl']
    },
    // preLoaders: [
    //   {
    //     test: path.join(__dirname, 'public/src/'),
    //     loader: "eslint-loader", exclude: ['/node_modules/', '/public/src/']
    //   }
    // ],
    loaders: [
      {
        test: path.join(__dirname, 'public/src/'),
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
}

module.exports = config