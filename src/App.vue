<template>
  <div id="app">
    <v-btn flat light router to="/">Home</v-btn>
    <v-btn flat light router to="/chart">Chart</v-btn>
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style></style>
