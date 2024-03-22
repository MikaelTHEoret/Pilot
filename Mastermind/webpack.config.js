const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true, // Clean the /dist folder before each build
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Add other loaders as needed
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mastermind AI Coding Assistant', // Optionally set a title here
            template: './src/index.html', // Specify your template path
            filename: 'index.html', // Output file
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            WELCOME_MESSAGE: JSON.stringify('Welcome to Mastermind App!'),
        }),
        // Add other plugins as needed
    ],
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "events": require.resolve("events/"),
            "url": require.resolve("url/"),
            "https": require.resolve("https-browserify"),
            "fs": false,
            "net": false,
            "tls": false,
            "bufferutil": false,
            "utf-8-validate": false,
            "async_hooks": false,
            "vm": require.resolve("vm-browserify"),
        },
        alias: {
            './routes': path.resolve(__dirname, './routes') // Update the path as per your directory structure
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true,
            },
        },
    },
    // other configurations...
};
