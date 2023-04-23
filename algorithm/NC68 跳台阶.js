function jumpFloor (number) {
  let dep = 0;
  function fn (number) {
    const rest = number - 1;
    const rest2 = number - 2;
    if (rest === 0 || rest2 === 0) {
      dep++;
    }
    if (rest < 0 || rest2 < 0) {
      return
    }
    fn(rest);
    fn(rest2);
  }
  fn(number);

  console.log(dep)
  return dep
}
jumpFloor(9)


/* 

function jumpFloor(number) {
  if(number === 0 || number === 1 || number === 2){
    return number
  }
  return jumpFloor(number - 1) + jumpFloor(number - 2)
}
module.exports = {
  jumpFloor: jumpFloor,
};


*/
