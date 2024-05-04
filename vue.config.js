const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ],
  publicPath: process.env.NODE_ENV === "production" ? "/helldivers-versatile-kit/" : "/",
  outputDir: 'docs'
})
