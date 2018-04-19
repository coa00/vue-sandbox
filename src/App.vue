`<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Scheduler />
  </div>
</template>

<script>
import Scheduler from './components/Scheduler.vue'



export default {
  name: 'app',
  components: {
    Scheduler
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
