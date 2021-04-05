let express = require('express')

let app = express()

let Vue = require('vue')
let fs = require('fs')
// vue提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer')
// 创建vue实例
let vm = new Vue({
  template: '<div>hello</div>'
})
let template = fs.readFileSync('./index.html', 'utf8')
// 创建渲染函数
let render = VueServerRenderer.createRenderer({
  template
});

app.get('/', (req, res) => {
  render.renderToString(vm, function (err, html) {
    res.send(html)
  })
})
app.listen(3000)