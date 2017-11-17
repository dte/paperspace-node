// Packages
const nodeExternals = require('webpack-node-externals')
// const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './cli/index.js',
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  output: {
    filename: 'dist/ps.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['shebang-loader', 'babel-loader']
      },
			{
	      test: /.js$/,
	      loader: 'babel-loader',
	      exclude: /node_modules/,
	      query: {
	        plugins: [
	          'transform-async-to-generator',
	          'transform-runtime'
	        ],
	        presets: [
	          'env'
	        ]
	      },
			},
    ]
  },
  plugins: [
    // new FlowBabelWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   { from: 'src/serverless/handler.js', to: 'dist/handler.js' }
    // ])
  ]
}