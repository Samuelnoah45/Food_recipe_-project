const { defineConfig } = require('vite')
module.exports = defineConfig({
  transpileDependencies: true,
    chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  }
})
