const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/js/popup.js',
        background: './src/js/background.js',
        'in-content': './src/js/in-content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    cache: true,

    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({patterns: [
            { from: './manifest.json' },
            { from: './src/images' },
            { from: './src/views' },
            { from: './src/_locales', to: "_locales"}
        ]})
    ]
};
