<script setup>
import { isRef, reactive, ref, toRef, toRefs, unref } from "vue";
const state = reactive({
  count: 1,
});
const countRef = toRef(state, 'count')

console.log(state, "state====");
console.log(state.count, "state.count====");
console.log(countRef,'countRef===');
</script>

<template>
  <span>state:{{ state }}</span>
  <br />
  <span>countRef:{{ countRef }}</span>
  <br />
</template>

<style></style>
