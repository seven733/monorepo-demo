import * as path from 'path'
// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin'
// @ts-ignore
import isWsl from 'is-wsl'
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// @ts-ignore
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
// @ts-ignore
import safePostCssParser from 'postcss-safe-parser'
// @ts-ignore
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'
import merge from 'webpack-merge'
// @ts-ignore
import WorkboxWebpackPlugin from 'workbox-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import commonConfig, { plugins as commonPlugins } from './webpack.config.common'

process.env.BABEL_ENV = process.env.NODE_ENV

// @ts-ignore
const config: Configuration = merge(commonConfig, {
  mode: 'production',
  bail: true,
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    // @ts-ignore
    devtoolModuleFilenameTemplate: info => path
      .relative(path.resolve('src'), info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
        },
      })
    ],
  }
})

export const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve('public/index.html'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }),
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    importWorkboxFrom: 'cdn',
    navigateFallback: '/index.html',
    navigateFallbackBlacklist: [
      new RegExp('^/_'),
      new RegExp('/[^/?]+\\.[^/]+$'),
    ],
  }),
  ...commonPlugins
]

export default config
