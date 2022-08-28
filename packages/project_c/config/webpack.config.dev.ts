import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import devConfig, { plugins } from '../../../config/webpack.config.dev'

process.env.BABEL_ENV = process.env.NODE_ENV

// @ts-ignore
const config: Configuration = merge(devConfig, {
  plugins: plugins,
})

export default config
