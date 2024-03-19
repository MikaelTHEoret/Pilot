const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        fallback: {
            "net": false,
            "async_hooks": false,
            "fs": false,
            "vm": require.resolve("vm-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "url": require.resolve("url/"),
            "querystring": require.resolve("querystring-es3"),
            "zlib": require.resolve("browserify-zlib")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            WELCOME_MESSAGE: JSON.stringify('Welcome to Mastermind App!')
        })
    ]
};