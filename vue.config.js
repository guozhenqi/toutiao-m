const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { // 自定义服务配置
    open: true,
    port: 3000
  },
  lintOnSave: false // 关闭eslint检查
})
