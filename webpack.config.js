const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './server/public')
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.wasm', '.json', '.js', '.jsx' ]
  }
}
