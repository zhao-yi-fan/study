var fs = require('fs')



//第一个参数:文件路径
//第二个参数:文件内容
//第三个参数:回调函数
//      回调函数只有一个参数error

//      成功: 
//          error 是 null
//      失败:
//          error就是错误对象
fs.writeFile('./data/你好.md', '大家好,我是Node.js', function(error){
    //console.log(error);
    if(error){
        //如果文件名有特殊符号,会写入失败
        console.log('写入失败');
    }else {
        //如果文件有,会覆盖原来的
        console.log('写入成功了');
        
    }

    
})