const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  runtimeCompiler: true,

  devServer: {
    https: false,
    host: "localhost",
    disableHostCheck: true,    
  },

  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css)$/
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin)
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match(originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }])
  }
}
