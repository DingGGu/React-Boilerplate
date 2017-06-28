/**
 * Created by DingGGu <ggu@move.is> on 2017. 6. 28..
 */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';
const PORT = 10525;

module.exports = {
    entry: [...DEBUG ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/only-dev-server'
    ] : [],
        path.join(__dirname, 'src/index.js')
    ],
    devtool: DEBUG ? false : 'cheap-module-source-map',
    devServer: {
        inline: true,
        host: '0.0.0.0',
        port: PORT,
        contentBase: path.join(__dirname, 'dist'),
        disableHostCheck: true,
        hot: true,
        publicPath: '/',
        historyApiFallback: true
    },


    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: DEBUG ? '[name].bundle.js' : '[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        presets: [
                            ['es2015', {modules: false}],
                            'react'
                        ],
                        plugins: ['react-hot-loader/babel']
                    }
                }
                ]
            },
            {
                test: /\.(scss|css)$/,
                loader: DEBUG ? ['style-loader', 'css-loader', 'sass-loader'] : ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 10k 이하 이미지는 base64 문자열로 변환,
                        name: "assets/[hash].[ext]",
                    }
                }]
            }
        ]
    },
    plugins: [
        ...DEBUG ? [
            new webpack.HotModuleReplacementPlugin(),
        ] : [
            new ExtractTextPlugin({
                filename: '[name].[contenthash].bundle.css',
                allChunks: true
            }),
            new S3Plugin({
                s3Options: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: 'ap-northeast-1'
                },
                s3UploadOptions: {
                    Bucket: "orbi.friends",
                    ACL: "public-read"
                }
            }),
        ],
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
};