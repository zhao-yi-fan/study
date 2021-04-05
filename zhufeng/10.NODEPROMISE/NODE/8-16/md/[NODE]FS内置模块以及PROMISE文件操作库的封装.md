- NODE中的内置模块
> http://nodejs.cn/api/
- fs内置模块: 实现I/O操作

> let fs = require('fs');
> 1. `fs.mkdir` / `fs.mkdirSync`: 创建文件夹, 有Sync的是同步创建, 反之没有是异步, 想要实现无阻塞的I/O操作, 我们都是用异步操作完成要处理的事情
> 2. `fs.readdir` / fs.readdirSync: 读取文件目录中的内容
> 3. `fs.rmdir`: 删除文件夹
> 4. `fs.readFile`: 读取文件中的内容
> 5. `fs.writeFile`: 向文件中写入内容(覆盖写入: 写入的新内容会替换原有的内容)
> 6. `fs.appendFile`: 追加写入新内容, 原有的内容还在
> 7. `fs.copyFile`: 拷贝文件到新的位置
> 8. `fs.unlink`: 删除文件