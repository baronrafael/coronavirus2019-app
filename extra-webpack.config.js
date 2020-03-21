const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        mapBoxToken: JSON.stringify(process.env.MAPBOX_TOKEN)
      }
    })
  ]
};
