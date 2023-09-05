const path = require('path');
const wepback = require('webpack');
const WebpackChain = require('webpack-chain');
const HtmlWebpackPlugin = require('html-webpack-plugin')


function processDefault (empConfig) {
  const devServer = empConfig.server || {}; //remote 8001 host 8002
  delete empConfig.server;
  // 我们现在写的是webpack-chain的配置文件,不是真正的webpack置文件,所以说写法跟webpack不太一样
  return {
    context: process.cwd(), // 项目根目录
    mode: 'development', // 指定开发模式
    devtool: false,
    devServer,
    plugin: {
      html: {
        plugin: HtmlWebpackPlugin,
        args: [{
          template: path.resolve(__dirname, '../template/index.html')
        }]
      }

    },
    ...empConfig
  }

}
exports.getConfig = () => {
  const Config = new WebpackChain();
  const empConfigPath = path.resolve(process.cwd(), 'emp-config.js');
  const empConfig = require(empConfigPath);
  const afterConfig = processDefault(empConfig);
}
