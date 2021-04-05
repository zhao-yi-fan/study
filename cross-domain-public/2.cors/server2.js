let express = require('express');
let app = express();
let whiteList = ['http://localhost:3000']
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    // 设置哪个源可以访问
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'name')
    res.setHeader('Access-Control-Allow-Methods', 'PUT'); // PUT会做一个OPSITONS预检请求
    res.setHeader('Access-Control-Max-Age', 6); // 预检测不是每次都发，而是过6秒发一次，默认是一分钟发一次
    if (req.method === 'PUST') {
      res.end(); // OPTIONS请求不做任何处理
    }
  }
  next();
})
app.put('/getData', function (req, res) {
  console.log(req.headers);
  res.end('我不爱你')

})
app.get('/getData', function (req, res) {
  console.log(req.headers);
  res.end('我不爱你')

})
app.use(express.static(__dirname))
app.listen(4000)