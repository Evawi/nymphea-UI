'use strict';
//NODE_ENV=prod webpack --config webpack.config.js -p сборка в прод
//NODE_ENV=dev webpack сборка в dev
const NODE_ENV = process.env.NODE_ENV || 'dev';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var version = require("./package.json");
var myversion = JSON.stringify(version);
var ver = JSON.parse(myversion).version;
console.log("Nymphea-UI",JSON.parse(myversion).version)
console.log("Nymphea-UI NODE_ENV",NODE_ENV)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var config = {
    entry: {
        nymphea_UI: [
            './src/index.js'
        ]
    },
    output: {
        path: __dirname+"/../public",
        filename: '[name].v_'+ver+'.js',
        publicPath:__dirname+'/dist/public/',
        library:"[name]",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader",
                        options: {  sourceMap: true, }
                    },
                    {loader: "less-loader",
                        options: {
                            sourceMap: true,
                            paths: [
                                path.resolve(__dirname, "node_modules")
                            ]
                        }
                    }]
            },
            {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"},
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
};
module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.watch = true;
        config.watchOptions = {
            aggregateTimeout:100
        };
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                default: {
                        minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                    }
                }
            }
        };
        config.plugins=[
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDom: 'react-dom'
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new webpack.ProvidePlugin({
                $ : "jquery",
                _ : "underscore"
            }),
            new webpack.ProvidePlugin({
                $ : "jquery",
                Nya : [__dirname+"/nymphea/nymphea.v_0.0.4.js",'default'], //подключение моих вп модулей
                _ : "underscore"
            }),

        ]
    }

    if (argv.mode === 'production') {
        config.watch = true;
        config.watchOptions = {
            aggregateTimeout:100
        };
       config.optimization = {
            splitChunks: {
                cacheGroups: {
                default: {
                        minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                }),
            ]
        };
        config.plugins=[
            new BundleAnalyzerPlugin(),
        ]
    }

    return config;
};
