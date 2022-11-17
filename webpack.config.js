var path = require('path');

var config = {
  optimization: {
    minimize: false
  },
  externals: {
    rmp_frontend: 'rmp_frontend',
    grecaptcha: 'grecaptcha',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
};

var publicScripts = Object.assign({}, config, {
    entry: "./_dev/public/js/rate-my-post.js",
    output: {
       path: path.resolve(__dirname, './public/js'),
       filename: "rate-my-post.js",
       libraryTarget: 'var',
       library: 'RateMyPost'
    },
});

module.exports = [
    publicScripts,
];
