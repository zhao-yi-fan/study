// 使用proxy来实现数据的响应式变化
// 可以支持数组，而且不用区分是对象还是数组
// 兼容性 vue 3.0 会采用如果支持proxy  不支持就还是Object.defineProperty
function render() {
    console.log('模拟视图的更新')
}

let obj = {
    name: 'jw',
    age: { age: 100 },
    arr: []
}
let handler = {
    get(target, key) {
        // 如果取的值是对象就在这个对象进行数据劫持
        if (typeof target[key] == 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        if(key === 'length') return true;// 防止数组长度改变，length的属性值变化也会触发视图更新
        render();
        return Reflect.set(target, key, value);
    }
}

let proxy = new Proxy(obj, handler);
// Object.defineProperty proxy 像墙 中间层
proxy.age.age = 200;
console.log(proxy.age.age);
proxy.arr.push(123);
proxy.arr[0]=100;
console.log(proxy.arr)

