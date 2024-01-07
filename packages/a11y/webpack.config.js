const path = require('path');

module.exports = {
    entry: './packages/a11y/src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: 'uuvA11y',
        libraryTarget: 'umd',
        filename: 'uuv-a11y.bundle.js',
        path: path.resolve(__dirname, 'bundle'),
    },
    devServer: {
        static: path.join(__dirname, "bundle"),
        compress: true,
        port: 4000,
    },
};