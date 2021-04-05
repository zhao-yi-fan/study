let express = require('express')
let app = express();
let router = express.Router();

app.use(router);
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // Access-Control-Allow-Headers���ɸ����������F12�鿴���Ѷ�Ӧ��ճ�����������
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})
app.use(function (req, res, next) {
  console.log('ȫ��ƥ��')
  next('�����ˣ���');
})
/* app.use('/water',function(req,res,next){
  res.end('ֻƥ��water');
  next();
}) */
app.get('/water', function (req, res) {
  res.end('water')
})
app.get('/', function (req, res) {
  res.end('welcome to ��ҳ')
})
app.get('/about/:id', function (req, res) {
  res.end(req.params.id);
})
app.post('/hello', function (req, res) {
  res.end('hello');
})
app.all('*', function (req, res) {
  // res.end('����ʵ�·��������' + req.host + '+' + req.path + '+' + req.query)
  res.end('����ʵ�·��������')
})
app.use(function (err, req, res, next) {
  console.log(err)
  res.end(err);
})
app.listen(3000, () => {
  console.log('sever is running...')
})