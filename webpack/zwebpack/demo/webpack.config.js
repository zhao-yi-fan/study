const path = require('path')

class P {
  apply (compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log('emit');
    })
    compiler.hooks.afterCompile.tap('emit', () => {
      console.log('afterCompile');
    })
  }
}
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loaders', 'style-loader'),
          path.resolve(__dirname, 'loaders', 'less-loader')
        ]
      },
      {
        test: /\.js$/,
        enforce: 'post',
        use: [
          path.resolve(__dirname, 'loaders', 'post-loader1'),
          path.resolve(__dirname, 'loaders', 'post-loader2')
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          path.resolve(__dirname, 'loaders', 'pre-loader1'),
          path.resolve(__dirname, 'loaders', 'pre-loader2')
        ]
      },
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders', 'normal-loader1'),
          path.resolve(__dirname, 'loaders', 'normal-loader2')
        ]
      },
    ]
  },
  plugins: [
    new P()
  ]
}