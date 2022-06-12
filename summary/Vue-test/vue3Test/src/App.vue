<script setup>
import { isRef, reactive, ref, toRefs, unref } from "vue";
const numRef = ref(0);
const customObj = {
  name: "张三",
  age: 18,
  hobby: ["游泳", "爬山"],
};
const state = reactive(customObj);
const stateAsRefs = toRefs(state);

console.log(state,'state===');
console.log({...state});
const fn = () => {
  numRef.value++;
  console.log(numRef);
};
const unrefFn = () => {
  console.log(isRef(numRef));
  console.log(unref(numRef));
};
const stateFn = () => {
  state.name = "李四";

  console.log(customObj, "customObj===");
  console.log(stateAsRefs, "stateAsRefs===");
};
const stateChange = () => {
  numRef++;
};
</script>

<template>
  <button @click="stateChange">stateChange</button>
  <br />
  <button @click="fn">+1</button>
  <br />
  <button @click="unrefFn">unref</button>
  <br />
  <button @click="stateFn">state</button>
  <br />
  <span>{{ numRef }}</span>
  <br />
  <span>state:{{ state }}</span>
  <br />
  <span>customObj:{{ customObj }}</span>
</template>

<style></style>
