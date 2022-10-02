# 1. sourcemap

## 1.1 什么是sourceMap
- sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
- webpack通过配置可以自动给我们`source maps`文件，`map`文件是一种对应编译文件和源文件的方法
- [source-map](https://github.com/mozilla/source-map)
![ ](./images/source-map.jpg)

| 类型                         | 含义                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| source-map                   | 原始代码 最好的sourcemap质量有完整的结果，但是会很慢                                |
| eval-source-map              | 原始代码 同样道理，但是最高的质量和最低的性能                                       |
| cheap-module-eval-source-map | 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能                           |
| cheap-eval-source-map        | 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl             |
| eval                         | 生成代码 每个模块都被eval执行，并且存在@sourceURL,带eval的构建模式能cache SourceMap |
| cheap-source-map             | 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用      |
| cheap-module-source-map      | 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射                     |
| hidden-source-map            | 隐藏sourcemap                                                                       |
| nosources-source-map         | 控制台能正确提示报错的位置而不暴露源码                                              |

## 1.2 配置项

| 关键字     | 含义                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| source-map | 产生.map文件                                                                 |
| eval       | 使用eval包裹模块代码                                                         |
| cheap      | 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap     |
| module     | 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）,否则无法定义源文件 |
| inline     | 将.map作为DataURI嵌入，不单独生成.map文件                                    |

### 1.2.1 source-map

- `.map`文件对应关系
![ ](./images/map对应关系.png)

src\index.js
```javascript
let a=1;
let b=2;
let c=3;
```
dist\main.js
```javascript
   ({
     "./src/index.js":
       (function (module, exports) {
         let a = 1;
         let b = 2;
         let c = 3;
       })
   });
//# sourceMappingURL=main.js.map
```
### 1.2.2 eval

- 用eval执行代码
- [whyeval](https://github.com/webpack/docs/wiki/build-performance#sourcemaps)


```javascript
  ({
    "./src/index.js":
      (function (module, exports) {
        eval("let a=1;\r\nlet b=2;\r\nlet c=3;\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });
```
- `eval-source-map`就会带上源码的sourceMap
- 加了eval的配置生成的sourceMap会作为DataURI嵌入，不单独生成`.map`文件
- 官方比较推荐开发场景下使用eval的构建模式，因为它能`cache sourceMap`,从而rebuild的速度会比较快

```javascript
  ({
    "./src/index.js":
      (function (module, exports) {
        eval("let a=1;\r\nlet b=2;\r\nlet c=3;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,In0=\n//# sourceURL=webpack-internal:///./src/index.js\n");
      })
  });
```
> devtool: "eval-source-map" is really as good as devtool: "source-map", but can cache SourceMaps for modules. It’s much faster for rebuilds.

### 1.2.3 inline
- `inline`就是将map作为DataURI嵌入，不单独生成.map文件
- `inline-source-map`

```javascript
({
    "./src/index.js":
      (function (module, exports) {
        let a = 1;
        let b = 2;
        let c = 3;
      })
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIj
```
![ ](./images/inline-source-map.png)
### 1.2.4 cheap(低开销)

- `cheap(低开销)`的sourcemap，因为它没有生成列映射(column mapping),只是映射行数
开发时我们有行映射也够用了,开发时可以使用cheap

- 只用于开发环境（开发环境不会打包为一行，可以定位行数） 不要用于生产环境（生产环境一般打包为一行，仅靠行数不能定位）
- `cheap-source-map`

### 1.2.5 module

- Webpack会利用loader将所有非js模块转化为webpack可处理的js模块,而增加上面的cheap配置后也不会有loader模块之间对应的sourceMap
- 什么是模块之间的sourceMap呢？比如jsx文件会经历loader处理成js文件再混淆压缩， 如果没有loader之间的sourceMap，那么在debug的时候定义到上图中的压缩前的js处，而不能追踪到jsx中
- 所以为了映射到loader处理前的代码，我们一般也会加上module配置
- `cheap-module-source-map`


![ ](./images/module.png)

## 1.3 组合规则

- [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
- source-map 单独在外部生成完整的sourcemap文件，并且在目标文件里建立关联，能提示错误代码的准确原始位置
- inline-source-map 以base64格式内联在打包后的文件中，内联构建速度更快，也能提示错误代码的准确原始位置
- hidden-source-map 会在外部生成sourcemap文件，但是在目标文件里没有建立关联，不能提示错误代码的准确原始位置
- eval-source-map 会为每一个模块生成一个单独的sourcemap文件进行内联，并使用`eval`执行
- nosource-source-map 也会在外部生成sourcemap文件，能够找到原始代码位置，但源代码内容为空
- cheap-source-map 外部生成sourcemap文件，不包含列和loader的map
- cheap-module-source-map 外部生成sourcemap文件，不包含列的信息但包含loader的map

## 1.3 演示


### 1.3.1 安装
```
cnpm i webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env style-loader css-loader less-loader less file-loader url-loader -D
```

### 1.3.2 webpack.config.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:'cheap-module-source-map',
  entry:'./src/index.js',
  module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader:'babel-loader',
            options:{
              presets:["@babel/preset-env"]
            }
          }]
        } 
      ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
```

### 1.3.3 src\index.js
```javascript
import './sum';
sum(1,2);
//console.log(window.a.b);
```

## 1.4 最佳实践


### 1.4.1 开发环境
- 我们在开发环境对sourceMap的要求是：快（eval），信息全（module），
- 且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),
- 要想速度快 推荐 `eval-cheap-source-map`
- 如果想调试更友好 推荐 `cheap-module-source-map`
- 所以开发环境推荐配置：`devtool: cheap-module-eval-source-map`


### 1.4.2 生产环境
- 首先排除内联，因为一方面我们隐藏了源代码，另一方面要减少文件体积
- 要想调试友好 `sourcemap` > `cheap-source-map`/`cheap-module-source-map` > `hidden-source-map`/`nosources-source-map`
- 所以我们不应该直接提供sourceMap给浏览器。但我们又需要sourceMap来定位我们的错误信息，这时我们可以设置`hidden-source-map`

- 一方面webpack会生成sourcemap文件以提供给错误收集工具比如sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。

# 2. sourcemap

## 2.1 生成sourcemap
script.js
```javascript
let a=1;
let b=2;
let c=3;
```
```javascript
java -jar compiler.jar --js script.js --create_source_map ./script-min.js.map --source_map_format=V3 --js_output_file script-min.js
```
script-min.js
```javascript
var a=1,b=2,c=3;
```
script-min.js.map
```javascript
{
"version":3,
"file":"script-min.js",
"lineCount":1,
"mappings":"AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;",
"sources":["script.js"],
"names":["a","b","c"]
}
```
| 字段                   | 含义                                                           |
| ---------------------- | -------------------------------------------------------------- |
| version：Source        | Source map的版本，目前为3                                      |
| file：转换后的文件名。 | 转换后的文件名                                                 |
| sourceRoot             | 转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空 |
| sources                | 转换前的文件,该项是一个数组,表示可能存在多个文件合并           |
| names                  | 转换前的所有变量名和属性名                                     |
| mappings               | 记录位置信息的字符串                                           |

## 2.2 mappings属性
- 关键就是map文件的mappings属性。这是一个很长的字符串，它分成三层


| 对应             | 含义                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| 第一层是行对应   | 以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。             |
| 第二层是位置对应 | 以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。 |
| 第三层是位置转换 | 以VLQ编码表示，代表该位置对应的转换前的源码位置。                                                                   |

```javascript
"mappings":"AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;",
```
## 2.3 位置对应的原理
- 每个位置使用五位，表示五个字段

| 位置   | 含义                                      |
| ------ | ----------------------------------------- |
| 第一位 | 表示这个位置在（转换后的代码的）的第几列  |
| 第二位 | 表示这个位置属于sources属性中的哪一个文件 |
| 第三位 | 表示这个位置属于转换前代码的第几行        |
| 第四位 | 表示这个位置属于转换前代码的第几列        |
| 第五位 | 表示这个位置属于names属性中的哪一个变量   |

> 首先，所有的值都是以0作为基数的。其次，第五位不是必需的，如果该位置没有对应names属性中的变量，可以省略第五位,再次，每一位都采用VLQ编码表示；由于VLQ编码是变长的，所以每一位可以由多个字符构成

> 如果某个位置是AAAAA，由于A在VLQ编码中表示0，因此这个位置的五个位实际上都是0。它的意思是，该位置在转换后代码的第0列，对应sources属性中第0个文件，属于转换前代码的第0行第0列，对应names属性中的第0个变量。

![](./images/mappings1.jpg)

## 2.4 相对位置
- 对于输出后的位置来说，到后边会发现它的列号特别大，为了避免这个问题，采用相对位置进行描述
- 第一次记录的输入位置和输出位置是绝对的，往后的输入位置和输出位置都是相对上一次的位置移动了多少
![](./images/mappings2.jpg)
## 2.5 VLQ编码

- VLQ是Variable-length quantity 的缩写，是一种通用的、使用任意位数的二进制来表示一个任意大的数字的一种编码方式
- 这种编码需要用最高位表示连续性，如果是1，代表这组字节后面的一组字节也属于同一个数；如果是0，表示该数值到这就结束了
- 如何对数值137进行VLQ编码
  - 将137改写成二进制形式 10001001
  - 七位一组做分组，不足的补0 0000001 0001001
  - 最后一组开头补0，其余补1 10000001 00001001
  - 137的VLQ编码形式为10000001 00001001

```javascript
let binary = 137..toString(2);
console.log(binary);//10001001
let padded = binary.padStart(Math.ceil(binary.length / 7) * 7, '0');
console.log(padded);//00000010001001
let groups = padded.match(/\d{7}/g);
groups = groups.map((group,index)=>(index==0?'1':'0')+group);
console.log(groups);// ['10000001','00001001']
```
## 2.6 Base64 VLQ

- 一个Base64字符只能表示6bit(2^6)的数据
- Base64 VLQ需要能够表示负数,于是用最后一位来作为符号标志位
- 由于只能用6位进行存储，而第一位表示是否连续的标志，最后一位表示正数/负数。中间只有4位，因此一个单元表示的范围为[-15,15]，如果超过了就要用连续标识位了
- 表示正负的方式
  - 如果这组数是某个数值的VLQ编码的第一组字节，那它的最后一位代表"符号"，0为正，1为负；
  - 如果不是，这个位没有特殊含义，被算作数值的一部分
- 在Base64 VLQ中，编码顺序是从低位到高位,而在VLQ中，编码顺序是从高位到低位

![](./images/base64.png)

```javascript
let base64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
/**
 * 1. 将137改写成二进制形式  10001001
 * 2. 127是正数，末位补0 100010010
 * 3. 五位一组做分组，不足的补0 01000 10010
 * 4. 将组倒序排序 10010 01000
 * 5. 最后一组开头补0，其余补1 110010 001000
 * 6. 转64进制 y和I
 */
function encode(num) {
    //1. 将137改写成二进制形式,如果是负数的话是绝对值转二进制
    let binary = (Math.abs(num)).toString(2);
    //2.正数最后边补0,负数最右边补1,127是正数,末位补0 100010010
    binary = num >= 0 ? binary + '0' : binary + '1';
    //3.五位一组做分组，不足的补0   01000 10010 
    let zero = 5 - (binary.length % 5);
    if (zero > 0) {
        binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0');
    }
    let parts = [];
    for (let i = 0; i < binary.length; i += 5) {
        parts.push(binary.slice(i, i + 5));
    }// 01000 10010
    //4. 将组倒序排序 10010 01000
    parts.reverse();// ['00000','00001']
    //5. 最后一组开头补0,其余补1 110010 001000
    for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            parts[i] = '0' + parts[i];
        } else {
            parts[i] = '1' + parts[i];
        }
    }
    //6.转64进制 y和I
    let chars = [];
    for (let i = 0; i < parts.length; i++) {
        chars.push(base64[parseInt(parts[i], 2)]);
    }
    return chars.join('')
}
let result = encode(137);
console.log(result);
```
## 2.7 计算位移
```javascript
let base64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
function getValue(char) {
    let index = base64.findIndex(item => item == char);//先找这个字符的索引
    let str = (index).toString(2);//索引转成2进制
    str = str.padStart(6, '0');//在前面补0补到6位
    //最后一位是符号位,正数最后一位是0,负数最后一位为1
    let sign = str.slice(-1)=='0'?1:-1;
    //最后一组第一位为0,其它的第一位为1
    str = str.slice(1, -1);
    return parseInt(str, 2)*sign;
}
function decode(values) {
    let parts = values.split(',');//分开每一个位置
    let positions = [];
    for(let i=0;i<parts.length;i++){
        let part = parts[i];
        let chars = part.split('');//得到每一个字符
        let position = [];
        for (let i = 0; i < chars.length; i++) {
            position.push(getValue(chars[i]));//获取此编写对应的值
        }
        positions.push(position);
    }
    return positions;
}
let positions = decode('AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE');
//后列,哪个源文件,前行,前列,变量
console.log('positions',positions);
let offsets = positions.map(item=>[item[2],item[3],0,item[0],]);
console.log('offsets',offsets);
let origin = {x:0,y:0};
let target = {x:0,y:0};
let mapping=[];
for(let i=0;i<offsets.length;i++){
    let [originX,originY,targetX,targetY] = offsets[i];
    origin.x += originX;
    origin.y += originY;
    target.x += targetX;
    target.y += targetY;
    mapping.push(`[${origin.x},${origin.y}]=>[${target.x},${target.y}]`);
}
console.log('mapping',mapping);
```
```javascript
positions [
  [ 0, 0, 0, 0 ],
  [ 4, 0, 0, 4, 0 ],
  [ 2, 0, 0, 2 ],
  [ 1, 0, 0, -6 ],
  [ 1, 0, 1, 4, 1 ],
  [ 2, 0, 0, 2 ],
  [ 1, 0, -1, -6 ],
  [ 1, 0, 2, 4, 1 ],
  [ 2, 0, 0, 2 ]
]
offsets [
  [ 0, 0, 0, 0 ],
  [ 0, 4, 0, 4 ],
  [ 0, 2, 0, 2 ],
  [ 0, -6, 0, 1 ],
  [ 1, 4, 0, 1 ],
  [ 0, 2, 0, 2 ],
  [ -1, -6, 0, 1 ],
  [ 2, 4, 0, 1 ],
  [ 0, 2, 0, 2 ]
]
mapping [
  '[0,0]=>[0,0]',
  '[0,4]=>[0,4]',
  '[0,6]=>[0,6]',
  '[0,0]=>[0,7]',
  '[1,4]=>[0,8]',
  '[1,6]=>[0,10]',
  '[0,0]=>[0,11]',
  '[2,4]=>[0,12]',
  '[2,6]=>[0,14]'
]
```
![](./images/sourcemapmove.png)
# 3.调试代码

## 3.1 测试环境调试
![](./images/enablesourcemap.png)
webpack.config.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/index.js',
  resolveLoader:{
    modules:['node_modules','loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
             options: { 
              sourceMap: true,
              importLoaders:2
             }
          },
          //{ loader: "resolve-url-loader" },
          { loader: "resolve-scss-url-loader" },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [
          { loader: 'url-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      append: '//# sourceMappingURL=http://127.0.0.1:8081/[url]',
      filename: '[file].map',
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{
          source: './dist/*.map',
          destination: 'C:/aprepare/zhufengsourcemap/sourcemap',
        }],
        delete: ['./dist/*.map'],
        archive: [{ 
          source: './dist',
          destination: './dist/dist.zip',
        }]
      }
    })
  ]
}
```

## 3.2 生产环境调试
- webpack打包仍然生成sourceMap，但是将map文件挑出放到本地服务器，将不含有map文件的部署到服务器，借助第三方软件（例如fiddler），将浏览器对map文件的请求拦截到本地服务器，就可以实现本地sourceMap调试
```javascript
regex:(?inx)http:\/\/localhost:8080\/(?<name>.+)$
*redir:http://127.0.0.1:8081/${name}
```
![](./images/fiddleproxy.png)
# 4.source-map-loader
- source-map-loader从当前存在的源码(从sourceMappingURL)中提供出map源码

```
cnpm i source-map-loader -D
```
## 4.1 script.js
```javascript
let a=1;
let b=2;
let c=3;
```
```
java -jar compiler.jar --js script.js --create_source_map ./script-min.js.map --source_map_format=V3 --js_output_file script-min.js
```
## 4.2 script.min.js
```javascript
var a=1,b=2,c=3;
//# sourceMappingURL=script-min.js.map
```
## 4.3 script.min.map.js
```javascript
{
"version":3,
"file":"script-min.js",
"lineCount":1,
"mappings":"AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;",
"sources":["script.js"],
"names":["a","b","c"]
}
```
## 4.4 src\index.js
```javascript
import './script-min.js';
```
## 4.5 webpack.config.js
webpack.config.js
```diff
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  resolveLoader:{
    modules:['node_modules','loaders']
  },
  module: {
    rules: [
+      {
+        test: /\.js$/,
+        use: ["source-map-loader"],
+        enforce: "pre"
+      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
             options: { 
              sourceMap: true,
              importLoaders:2
             }
          },
          //{ loader: "resolve-url-loader" },
+          { loader: "resolve-scss-url-loader" },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [
          { loader: 'url-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```
# 5.参考

[javascript_source_map算法](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

[devtool](https://www.webpackjs.com/configuration/devtool/)



