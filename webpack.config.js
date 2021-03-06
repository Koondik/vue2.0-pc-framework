require("babel-polyfill"); //兼容IE浏览器（IE不兼容Promise）
const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = './'
module.exports = (options = {}) => ({
    entry : {
        vendor : './src/vendor',
        index : ["babel-polyfill",'./src/main.js']
    },
    output : {
        path : resolve(__dirname, 'dist'),
        filename : options.dev ? 'scripts/[name].js' : 'scripts/[name].js?[chunkhash]',
        chunkFilename : 'scripts/resource/[id].js?[chunkhash]',
        publicPath : options.dev ? '/assets/' : publicPath
    },
    module : {
        rules : [{
            test : /\.vue$/,
            use : [
                {
                    loader : 'vue-loader',
                    options : {
                        loaders : {
                            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                            // the "scss" and "sass" values for the lang attribute to the right configs here.
                            // other preprocessors should work out of the box, no loader config like this necessary$('.')
                            'scss' : 'vue-style-loader!css-loader!sass-loader',
                            'sass' : 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        }
                        // other vue-loader options go here
                    }
                }
            ]
        },
            {
                test : /\.js$/,
                use : ['babel-loader'],
                exclude : /node_modules/
            },
            {
                test : /\.css$/,
                use : ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test : /\.scss$/,
                use : [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test : /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use : [{
                    loader : 'url-loader',
                    options : {
                        limit : 10000,
                        name:'images/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            names : ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template : 'src/index.html'
        })
    ],
    resolve : {
        alias : {
            '~' : resolve(__dirname, 'src')
        }
    },
    devServer : {
        host : '127.0.0.1',
        port : 8010,
        proxy : {
            '/api/' : {
                target : 'http://127.0.0.1:8010',
                changeOrigin : true,
                pathRewrite : {
                    '^/api' : ''
                }
            }
        },
        historyApiFallback : {
            index : url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool : options.dev ? '#eval-source-map' : '#source-map'
})
