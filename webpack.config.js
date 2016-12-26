const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

module.exports = function webpackConfig(options)
{
    const webpackDefine = {
        _ENV_: JSON.stringify(options.ENV),
        _HMR_: !!options.HMR,
        _URL_: JSON.stringify(options.URL)
    };

    const entry = {
        polyfills : path.resolve('web', 'static', 'polyfills'),
        vendor    : path.resolve('web', 'static', 'vendor'),
        app       : path.resolve('web', 'static', 'app.js')
    };

    if (options.ENV === 'dev')
    {
        entry['webpack-dev-server'] = 'webpack-dev-server/client?' + options.URL;
        if (options.HMR)
            entry['webpack-hot-reload'] = 'webpack/hot/only-dev-server';
    }

    const devtool = options.ENV === 'prod'
        ? 'source-map'
        : 'module-source-map';

    const styleLoader = [
        {
            loader: 'css-loader',
            // TODO: should always be `options` (bug in ExtractTextPlugin)
            [options.ENV === 'prod' ? 'query' : 'options']: {
                camelCase: true,
                localIdentName: '[name]--[local]--[hash:base64]',
                importLoaders: 1
            }
        },
        {
            loader: 'postcss-loader'
        },
        {
            loader: 'sass-loader'
        }
    ];

    const styleLoaders = options.ENV === 'prod'
        ?
            ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: styleLoader
            })
        :
            [{ loader: 'style-loader' }, ...styleLoader];

    return {
        entry,
        devtool,
        output: {
            path: path.resolve('priv', 'static'),
            filename: 'js/[name].js',
            sourceMapFilename: '[file].map'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['react', 'es2015', 'stage-1']
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    // TODO: should always be `use` (bug in ExtractTextPlugin)
                    [options.ENV === 'prod' ? 'loader' : 'use']: styleLoaders
                },
                {
                    test: /(\.jpg|\.png|\.svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /(\.eot|\.ttf|\.woff|\.woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    use: [
                        {
                            loader: 'json-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(webpackDefine),
            new webpack.ProvidePlugin({
                jQuery: 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['app', 'vendor']
            }),
            new ExtractTextPlugin('css/styles.css'),
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            modules: [
                path.resolve('node_modules'),
                path.resolve('web', 'static')
            ]
        },
        devServer: {
            contentBase: path.resolve('web', 'static'),
            port: 4001,
            hot: !!options.HMR,
            inline: !!options.HMR
        }
    };
};
