```javascript
let xhr=new XMLHttpRequest();
xhr.open('GET','/temp/list',true);
xhr.onreadystatechange=()=>{
    if(xhr.readyState===2){console.log(1);}
    if(xhr.readyState===4){console.log(2);}
};
xhr.send();
console.log(3);
```
```javascript
let xhr=new XMLHttpRequest();
xhr.open('GET','/temp/list',true);
xhr.send();
xhr.onreadystatechange=()=>{
    if(xhr.readyState===2){console.log(1);}
    if(xhr.readyState===4){console.log(2);}
};
console.log(3);
```
```javascript
let xhr = new XMLHttpRequest();
xhr.open('GET', 'temp.json', false);
xhr.onreadystatechange = () => {//=> 监听前的状态是1
    if (xhr.readyState === 2) { 
        console.log(1); 
    }
    if (xhr.readyState === 4) { 
        console.log(2); 
    }
};
xhr.send();//=> 任务开始(同步: 只要当前AJAX请求这件事没有完成, 什么都不能做)
console.log(3);
//=> 2 3  当AJAX任务开始, 由于是同步编程, 主任务队列在状态没有变成4(任务结束)之前一直被这件事占用着, 其它事情都做不了(当服务器把响应头返回的时候, 状态为2, 触发了事件eadystatechange, 但是由于主任务队列没有完成, 被占用着, 绑定的方法也无法执行... 所以只有状态为4的时候, 也就是主任务队列执行结束后才执行reaystatechange这个方法)
```
```javascript
let xhr = new XMLHttpRequest();
xhr.send();//=> 开始请求(状态不为4, 其它事都做不了)
//=> 事件绑定前状态已经是4了
xhr.open('GET', 'temp.json', false);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 2) { 
        console.log(1); 
    }
    if (xhr.readyState === 4) { 
        console.log(2); 
    }
};
console.log(3);
//=> 3
```