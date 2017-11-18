var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/words-admin/script/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    }
}