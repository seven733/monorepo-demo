// @ts-ignore
import * as path from 'path'
// @ts-ignore
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// @ts-ignore
import PnpWebpackPlugin from 'pnp-webpack-plugin'
// @ts-ignore
import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWebpackPlugin'
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'
// @ts-ignore
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin'
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin'
import * as resolve from 'resolve'
import { Configuration, DefinePlugin, IgnorePlugin, ProgressPlugin } from 'webpack'
// @ts-ignore
import ManifestPlugin from 'webpack-manifest-plugin'

const publicPath = '/'

export const plugins = [
  new ProgressPlugin(),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.APIUrl': JSON.stringify(process.env.APIUrl),
  }),
  new InterpolateHtmlPlugin(
    // @ts-ignore
    HtmlWebpackPlugin, { NODE_ENV: process.env.NODE_ENV, PUBLIC_URL: publicPath.slice(0, -1) }),
  new ModuleNotFoundPlugin(path.resolve('.')),
  new ManifestPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: 'public',
      },
    ],
  }),
  new IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', { basedir: path.resolve('node_modules') }),
    async: false,
    useTypescriptIncrementalApi: true,
    checkSyntacticErrors: true,
    tsconfig: path.resolve('tsconfig.json'),
    reportFiles: [
      '**',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!**/src/setupProxy.*',
      '!**/src/setupTests.*',
    ],
    silent: true,
  }),

]

const config: Configuration = {
  entry: path.resolve('src/index.tsx'),
  bail: false,
  output: {
    publicPath,
    pathinfo: false,
    futureEmitAssets: true,
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      maxSize: 300000,
      name: false,
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.mjs', '.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx', '.json', '.web.jsx', '.jsx'
    ],
    alias: {
      'react': path.resolve('node_modules/react'),
      'react-native': 'react-native-web',
    },
    plugins: [
      PnpWebpackPlugin,
      new ModuleScopePlugin(path.resolve('src'), [path.resolve('package.json')]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: true,
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
            },
            loader: 'eslint-loader',
          },
        ],
        include: path.resolve('src'),
        exclude: [/.*mocks\/.*/]
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'),
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: path.resolve('src'),
            exclude: /\.stories.tsx$/,
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  'babel-plugin-named-asset-import',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: process.env.NODE_ENV !== 'production',
            },
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: process.env.NODE_ENV !== 'production' }
              },
            ],
            sideEffects: true,
          },
          {
            test: /\.module\.css$/,
            use: ['style-loader', 'css-loader'],
            sideEffects: true,
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ],
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false
}

config.resolveLoader = {
  plugins: [
    PnpWebpackPlugin.moduleLoader(config),
  ],
}

export default config
