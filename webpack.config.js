const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SocialTags = require('social-tags-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js' ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new SocialTags({
            appUrl: 'https://projects.jpyepez.com/EmojiP5/',
      facebook: {
        'og:url': "https://projects.jpyepez.com/EmojiP5/",
        'og:type': "website",
        'og:title': "Top 100 Emoji on Twitter",
        'og:image': './src/assets/thumb.png',
        'og:description': "Creative visualization of real-time emoji use on Twitter.",
        'og:site_name': "JP Yepez - Projects",
        'og:locale': "en_US",
      },
      twitter: {
        "twitter:card": "summary",
        "twitter:creator": "@jpyepezartist",
        "twitter:url": "https://projects.jpyepez.com/EmojiP5/",
        "twitter:title": "Top 100 Emoji on Twitter",
        "twitter:description": "Creative visualization of real-time emoji use on Twitter.",
        "twitter:image": './src/assets/thumb.png'
      }
        })
    ],
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};