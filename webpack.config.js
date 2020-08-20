const path = require('path');
const copy = require('copy-webpack-plugin');

module.exports = {
    entry: './lib/public/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                use: ['file-loader'],
                exclude: [`${__dirname}`]
            }
        ],
    },
    target: 'node',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
};
