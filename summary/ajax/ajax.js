// 封装ajax

function ajax (options) {
  var method = 'POST';
  var datas = options.datas;
  var url = 'http://47.93.223.152:8088/IM/user/' + options.url;
  var success = options.success;
  var error = options.error;
  method = method.toUpperCase();
  if (datas) {
    var arr = [];
    for (var k in datas) {
      arr.push(k + '=' + datas[k]);
    }
    datas = arr.join('&');
  } else {
    datas = '';
  }
  var xhr = new XMLHttpRequest();
  xhr.open(method, method === 'GET' ? url + '?' + datas : url);
  if (method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(method === 'GET' ? null : datas);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var datas = JSON.parse(xhr.responseText);
        success(datas);
      } else {
        error(datas);
      }
    }
  };
} 


