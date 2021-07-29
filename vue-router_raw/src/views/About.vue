<template>
  <div class="about">
    <router-link to="/about/a"></router-link>
    <router-link to="/about/b"></router-link>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'About',
}
</script>
