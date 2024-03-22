const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
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
    // Add resolve and other configurations as previously defined
};
