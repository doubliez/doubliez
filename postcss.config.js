const webpack      = require('webpack');
const smartImport  = require('postcss-smart-import');
const precss       = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        smartImport({ addDependencyTo: webpack }),
        precss(),
        autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
        })
    ]
};
