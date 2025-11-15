Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    if (arr.length === 0) {
      return resolve([]);
    }
    let count = 0;
    const result = [];
    arr.forEach((promise, index) => {
      promise
        .then((res) => {
          count++;
          result[index] = res;
          if (count === arr.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};

Promise.myAll([
  new Promise((resolve) => setTimeout(resolve, 400, 4)),
  new Promise((resolve) => setTimeout(resolve, 200, 2)),
  new Promise((resolve) => setTimeout(resolve, 300, 3)),
  Promise.resolve(1),
]).then((result) => {
  console.log(result);
});
