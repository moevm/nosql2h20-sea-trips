<template>
  <div id="app">
    <router-view />
    <notifications />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "https://www.w3schools.com/w3css/4/w3.css";

  h1 {
    font-weight: bold;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin: 0 60px;
}
</style>
