import * as path from 'path'
// @ts-ignore
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

// 每个package内都会自己安装webpack-dev-server，这里屏蔽掉该lint
// eslint-disable-next-line import/no-unresolved
import { } from 'webpack-dev-server'
import merge from 'webpack-merge'
import commonConfig, { plugins as commonPlugins } from './webpack.config.common'

process.env.BABEL_ENV = process.env.NODE_ENV

// @ts-ignore
const config: Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    // @ts-ignore
    devtoolModuleFilenameTemplate: info => path
      .resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  }
})

export const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve('public/index.html'),
  }),
  new HotModuleReplacementPlugin(),
  new CaseSensitivePathsPlugin(),
  new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
  ...commonPlugins
]

export default config
