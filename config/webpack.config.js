const paths = require('./paths');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: paths.dist,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env'],
                },
            },
        ],
    },
}
