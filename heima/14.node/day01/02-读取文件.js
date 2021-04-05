//浏览器中的JavaScript是没有文件操作的能力的
//但是Node中的JavaSCript具有文件操作的能力的

//fs 是file-System 的简写,就是文件系统 意思
//在Node中想文件操作,必须引入fs核心模块
//fs这个核心模块提供了所有文件相关的API
//例如:fs.readFile就是读取文件的

var fs = require('fs');

//2.读取文件
//第一个参数是要读取的文件路径
//第二个参数是一个回调函数
//      error
//          如果读取成功,error 是 null
//          如果读取失败,error 是 错误对象
//      data
//          如果读取成功,data 是 读到的数据
//          如果读取失败,data 是 undefined没有数据
fs.readFile('./data/hello.txt', function(error,data){
    //console.log(data)
    //<Buffer 76 61 72 20 66 6f 6f 20 3d 20 27 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 27 0d 0a 0d 0a 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 66 6f 6f 29>
    //文件中存储的其实都是二进制数据 0 1 
    //这里为什么看到的不是0 1 ?是因为二进制转成了16进制了
    //但是无论是二进制还是16进制,人都不认识
    //需要用toString方法把其转为我们能认识的字符
    //console.log(data.toString());

   

    //读文件需要判断error是否有错误发生

    if(error){
        console.log('读取文件失败了')
    }else {
        console.log(data.toString())
    }
})