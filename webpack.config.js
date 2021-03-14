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
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}
