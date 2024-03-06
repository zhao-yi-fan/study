var arr = [20, 10, 66, 44];
for (i = 0; i < arr.length - 1; i++) {
  for (j = 0; j < arr.length - 1 - i; j++) {
    if (arr[j] > arr[j + 1]) {
      var temp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = temp;
    }
  }
}
console.log(arr);
