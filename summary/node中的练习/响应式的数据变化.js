let obj = {
  text: '1111'
}
let otherValue = '';
Object.keys(obj).forEach(function (key) {
  definedReative(obj, key, obj[key])
})
function definedReative (data, key, value) {
  Object.defineProperty(data, key, {
    get: function () {
      return value;
    },
    set: function (newValue) {
      value = newValue;
      otherValue = newValue;
    }
  })
}

obj.text = '3333'

console.log(otherValue);