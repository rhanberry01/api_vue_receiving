const webpack = require('webpack');
const assetsDir = 'assets'

module.exports = {
  assetsDir: assetsDir,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    output: {
      filename: assetsDir + '/my_script.js',
      chunkFilename: assetsDir + '/my_script_chunk.js'
    }
  },
  chainWebpack: config => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: assetsDir + "/my_style.css",
            chunkFilename: assetsDir + "/my_style_chunk.css"
          }
        ]);
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
};
