'use strict';
//ENV=prod webpack --config webpack.config.js -p сборка в прод
const NODE_ENV = process.env.NODE_ENV || 'develop';
const path = require('path');
const webpack = require('webpack');
var WebpackAutoInject = require('webpack-auto-inject-version');

var version = require("./package.json");
var myversion = JSON.stringify(version);
var ver = JSON.parse(myversion).version;
console.log(JSON.parse(myversion).version)

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: __dirname +"/src",
    entry:{
        nymphea_UI:'./index.js'
    },
    output: {
        path: __dirname+"/public",//абсолютный путь к директории
        filename: '[name].v_'+ver+'.js',
        publicPath:__dirname+'/dist/public/',
        library:"[name]",
        libraryTarget: 'umd'
    },
    devtool: NODE_ENV == 'develop' ? 'source-map' : false ,  //используется для дебага чтоб показывал как бы все исходники
    watch:NODE_ENV == 'develop',  //автоматическая пересборка
    watchOptions:{
        aggregateTimeout:100 //ожидание после изменения
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV) //чтоб добавилось именно значение
        }), //передает переменные в код из консоли то есть NODE_ENV=release webpack так передастся переменная NODE_ENV и собираться все будет под девелоп (пиши через conEmu)
        /*new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery"
         }),
         new webpack.ProvidePlugin({
         $ : "jquery",
         _ : "underscore"
         }),*/
        new WebpackAutoInject(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        new BundleAnalyzerPlugin()
    ],

    resolve:{ //настройка расположения модулей если не найдет по пути entry полезет сюда
        modules:['node_modules'],
        extensions:['.js', '.jsx','.less','.css','.eot','.woff','.ttf'],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, //формат
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.less$/,
                use: [{loader: "style-loader"},
                    {loader: "css-loader",
                        options: { minimize: true }
                    },
                    {loader: "less-loader",
                        options: {
                            paths: [
                                path.resolve(__dirname, "node_modules")
                            ]
                        }
                    }]
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"} //остальные файлы
        ]
    }
};


if(NODE_ENV == 'prod'){
    module.exports.plugins = [
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV)
        }),
        new WebpackAutoInject(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                //drop_console: true,
                unsafe      : true
            }
        })
    ]
}
