function fn (num) {
  // 首先判断是不是数字
  if (!/\d+/.test(num)) {
    return '不是数字'
  }

  // 中文格式的显示规则
  var gs = '千百十亿千百十万千百十个';
  // 判断数字长度
  var len = num.toString().length;
  if (len > gs.length) {
    return '数字长度超出范围'
  }
  var res = '';
  var num = num.toString();
  // 根据长度截取对应的格式
  var resgs = gs.substr(gs.length - len);
  for (var i = 0; i < len; i++) {
    res += '零一二三四五六七八九'.charAt(num[i]) + resgs.charAt(i)
  }
  // 去掉末尾的个字
  res = res.substring(0, res.length - 1)
  // 考虑特殊情况的比如： 零千零万零百替换成零
  // 多个零存在只保留一个零
  // 零万零亿保留单位万亿
  res = res.replace(/零([十|百|千])/g, '零').replace(/零+/g, '零').replace(/零([万|亿])/g, '$1')
  return res;
}

let a = fn(123)
console.log(a);