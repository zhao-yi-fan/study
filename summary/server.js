let express = require('express')
let app = express();
let router = express.Router();

app.use(router);
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // Access-Control-Allow-Headers，可根据浏览器的F12查看，把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})
app.use(function (req, res, next) {
  console.log('全部匹配')
  next('错误了！！');
})
/* app.use('/water',function(req,res,next){
  res.end('只匹配water');
  next();
}) */
app.get('/water', function (req, res) {
  res.end('water')
})
app.get('/', function (req, res) {
  res.end('welcome to 首页')
})
app.get('/about/:id', function (req, res) {
  res.end(req.params.id);
})
app.post('/hello', function (req, res) {
  res.end('hello');
})
app.all('*', function (req, res) {
  // res.end('你访问的路径不存在' + req.host + '+' + req.path + '+' + req.query)
  res.end('你访问的路径不存在')
})
app.use(function (err, req, res, next) {
  console.log(err)
  res.end(err);
})
app.listen(3000, () => {
  console.log('sever is running...')
})