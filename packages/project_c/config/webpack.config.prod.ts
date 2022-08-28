import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import prodConfig, { plugins } from '../../../config/webpack.config.prod'

process.env.BABEL_ENV = process.env.NODE_ENV

// @ts-ignore
const config: Configuration = merge(prodConfig, {
  plugins: plugins,
})

export default config
