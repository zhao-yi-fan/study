// webpack打包我们的图片
// 1）在js中创建图片来引入
// file-loader默认会在内部生成一张图片 到build目录下，把生成的图片的名字返回回来
// import logo from './logo.jpg' // 把图片引入，返回的结果是一个新的图片地址
// console.log(logo)
// let image = new Image();
// image.src = logo; // 就是一个普通的图片
// document.body.appendChild(image);

// 2）在css引入 background('url)
import './index.css'
// 3）<img src="" alt=""/>
// 需要引入html-withimg-loader

// import $ from 'expose-loader?$!jquery'
// expose-loader 暴露 全局的loader 内联的loader

// import $ from 'jquery';
// console.log($); // 在每个模块中注入$对象


// let str = require('./a.js')
// console.log(str)

// require('./index.css')

// require('./index.less')

// fn = () => {
//   console.log('sss')
// }



// @log // 类的装饰器 装饰类或者属性
// class A { // new A() a=1 // es7写法
//   a = 1;
// }

// let a = new A()
// console.log(a.a)

// function log (target) {
//   console.log(target); // 查看被修饰的A类
// }

