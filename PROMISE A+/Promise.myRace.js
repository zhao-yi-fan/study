Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    arr.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
};

Promise.myRace([
  1,
  new Promise((res, rej) => {
    setTimeout(rej, 100);
  }),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
