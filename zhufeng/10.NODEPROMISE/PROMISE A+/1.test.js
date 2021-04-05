// 有 8 张图片 url，你需要并发去获取它，并且任何时刻同时请求的数量不超过 3 个。也就是说第 4 张图片一定是等前面那一批有一个请求完毕了才能开始，以此类推。
var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];

function loadImg (url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成', url);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

function limitload (urls, limit) {
  let index = limit;
  function exctor () {
    index++;
    if (index < urls.length) {
      loadImg(urls[index]).then(()=> exctor())
    }
  }
  for (let i = 0; i <= limit; i++) {
    loadImg(urls[i]).then(() => {
      exctor()
    })
  }
}

// 自己写的 三个全部加载完再加载下一个
/* function limitload (urls, limit) {
  let index = 0;
  function exctor (limit) {
    let proArr = [];
    for (let i = index; i < urls.length; i++) {
      if (i <= index + limit) {
        proArr.push(loadImg(urls[i]))
      }
    }
    let r = Promise.all(proArr)
    r.then(() => {
      index += limit + 1;
      if (index < urls.length) {
        exctor(limit)
      }
    })
  }
  exctor(limit);
} */


limitload(urls, 2);







