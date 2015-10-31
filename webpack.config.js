var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(process.cwd(), 'main'),
    // need to change here and tsconfig.json
    entry: './app.tsx',
    output: {
        filename: 'bundle.js'
    },
    // Turn on sourcemaps
    //devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },
    // Add minification
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
}