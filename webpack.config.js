/* eslint no-console: 0, quote-props: 0 */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production';
const analyzeBundle = process.env.ANALYZE_BUNDLE;

const devtool = devMode ? 'eval-source-map' : false;

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [require('babel-preset-env'), {
        targets: {
          browsers: devMode ?
            ['last 1 Chrome versions', 'last 1 Firefox versions'] :
            ['last 2 versions', 'safari >= 7', 'not ie < 11']
        },
        modules: 'commonjs',
        loose: true,
        debug: !devMode
      }],
      require('babel-preset-react')
    ],
    plugins: [
      require('babel-plugin-transform-object-rest-spread'),
      require('babel-plugin-transform-class-properties'),
      require('babel-plugin-transform-es2015-classes'),
      require('babel-plugin-syntax-dynamic-import'),
      require('babel-plugin-transform-runtime'),
      require('babel-plugin-add-module-exports'),
      ...(devMode ? [require('react-hot-loader/babel')] : [
        require('babel-plugin-lodash'),
        [require('babel-plugin-transform-imports'), {
          'material-ui': { transform: 'material-ui/${member}', preventFullImport: true }
        }]
      ])
    ],
    babelrc: false
  }
};

const cssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
};

const workerLoader = {
  loader: 'worker-loader',
  options: {
    inline: false,
    name: '[name].worker.js'
  }
};

const imgLoader = [{
  loader: 'file-loader',
  options: { name: '[path][name].[ext]' }
}];

module.exports = {
  entry: {
    app: [
      ...(devMode ? ['react-hot-loader/patch'] : []),
      './src/js/preloader.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src/'),
      'data': path.resolve(__dirname, 'data/'),
      'img': path.resolve(__dirname, 'img/'),
      'workers': path.resolve(__dirname, 'workers/'),
      'server': path.resolve(__dirname, 'server/'),
      'CHANGELOG.md': path.resolve(__dirname, 'CHANGELOG.md')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@doodle3d/doodle3d-core'),
          path.resolve(__dirname, 'Doodle3D-Core-SG/lib'),
	  path.resolve(__dirname, 'node_modules/@doodle3d/potrace-js'),
          path.resolve(__dirname, 'node_modules/nanoid')
        ],
        use: [babelLoader]
      },
      {
        test: /\.css$/,
        exclude: /src\/css\/.+\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /src\/css\/.+\.css$/,
        use: ['style-loader', cssModuleLoader]
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: imgLoader
      },
      {
        test: /\.(woff)$/,
        use: 'file-loader'
      },
      {
        test: /\.(svg|glsl|txt|md)$/,
        use: 'raw-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.yml$/,
        use: 'yml-loader'
      },
      {
        test: /\.worker.js$/,
        use: [workerLoader, babelLoader]
      },
      {
        test: /three\/examples\/.+\.js/,
        use: 'imports-loader?THREE=three'
      },
      {
        test: /redux-undo\.umd\.js$/,
        use: 'script-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PLATFORM': JSON.stringify(process.env.PLATFORM)
      }
    }),
    ...(analyzeBundle ? [new BundleAnalyzerPlugin()] : [
      new HTMLWebpackPlugin({
        template: require('html-webpack-template'),
        filename: 'index.html',
        title: 'Doodle3D Transform',
        appMountId: 'app',
        inject: false,
        mobile: true,
        minify: !devMode && { html5: true },
        hash: !devMode,
        favicon: 'favicon.ico',
        chunks: ['app'],
        meta: [
          { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
          { property: 'og:image', content: 'https://doodle3d.com/img/screenshot.png' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://doodle3d.com' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, minimal-ui, user-scalable=no' }
        ],
        headHtmlSnippet: '<link rel="shortcut icon" href="img/apple-touch-icon-144x144-precomposed.png" type="image/x-icon" />\
          <link rel="apple-touch-icon" href="img/apple-touch-icon-144x144-precomposed.png">'
      }),
      new HTMLWebpackPlugin({
        template: require('html-webpack-template'),
        filename: '404.html',
        title: 'Page not found',
        inject: false,
        mobile: true,
        bodyHtmlSnippet: 'Not found',
        chunks: []
      })
    ]),
    ...(devMode ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ] : [])
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    allowedHosts: ['all'],
    publicPath: '/'
  },
  devtool: devtool
};
