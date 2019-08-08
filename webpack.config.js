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
        path: __dirname+"/public",
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
            new BundleAnalyzerPlugin()
        ]
    }

    return config;
};/*
[
    {
        name:"project",
        mode: 'development',
        entry: {
            nymphea_UI: [
                './src/index.js'
            ]
        },
        output: {
            path: __dirname+"/public",
            filename: '[name].v_'+ver+'.js',
            publicPath:__dirname+'/dist/public/',
            library:"[name]",
            libraryTarget: 'umd'
        },
        devtool: 'source-map',
        watch:true,
        watchOptions:{
            aggregateTimeout:100
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
            //reuseExistingChunk: true
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
        resolve:{ //настройка расположения модулей если не найдет по пути entry полезет сюда
            modules:['node_modules'],
            extensions:['.js', '.jsx','.less','.css','.eot','.woff','.ttf'],
            alias: {
                jquery: "jquery/src/jquery"
            }
        },
        externals: {
            "$": {
                "semantic-ui":"$",
                "dropdown":"$",
                "modal ":"$",
                "root":'jQuery'
            }
        },
        plugins: [
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
    },
    {
        mode: 'production',
        entry: {
            nymphea_UI: [
                './src/index.js'
            ]
        },
        output: {
            path: __dirname+"/public",
            filename: '[name].v_'+ver+'.js',
            publicPath:__dirname+'/dist/public/',
            library:"[name]",
            libraryTarget: 'umd'
        },
        devtool: 'source-map',
        watch:false,
        optimization: {
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
            ],
            //reuseExistingChunk: true
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
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"} //остальные файлы
            ]
        },
        plugins: [

            new BundleAnalyzerPlugin()
        ]
    }
]*/
/*{
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
    devtool: NODE_ENV == 'dev' ? 'source-map' : false ,  //используется для дебага чтоб показывал как бы все исходники
    watch:NODE_ENV == 'dev',  //автоматическая пересборка
    watchOptions:{
        aggregateTimeout:100 //ожидание после изменения
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV) //чтоб добавилось именно значение
        }), //передает переменные в код из консоли то есть NODE_ENV=release webpack так передастся переменная NODE_ENV и собираться все будет под девелоп (пиши через conEmu)
        new WebpackAutoInject(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        //new BundleAnalyzerPlugin(),
        //new ExtractTextPlugin("styles.css"),
    ],
    externals: {
        "$": {
             "semantic-ui":"$",
             "dropdown":"$",
             "modal ":"$",
             "root":'jQuery'
         }
    },
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
if(NODE_ENV == 'dev'){
    module.exports.plugins.push(
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
            Nya : [__dirname+"/nymphea/nymphea.v_0.0.2.js",'default'], //подключение моих вп модулей
            _ : "underscore"
        })
    )
}

if(NODE_ENV == 'prod'){
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV)
        }),
        new WebpackAutoInject(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
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
        }),
        new BundleAnalyzerPlugin()
    )
}*/
