let old = {
  name: 'dtt',
  age: 18,
  family: [
    { name: 'bb' },
    { name: 'mm' },
  ],
  talk: function () {
    console.log('说话');
  }
}

let newObj = old;
newObj.name = 'zyf'
console.log(old.name);