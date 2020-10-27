const path = require('path');
const copy = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    context: path.join(__dirname, 'lib'),

    plugins: [
        new copy({
            patterns: [
                { from: 'configs', to: 'configs' }
            ]
        })
    ],

    entry: {
        index: './public/index.ts'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(json)$/,
                use: ['file-loader'],
                exclude: [__dirname],
            }
        ],
    },
    target: 'node',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
