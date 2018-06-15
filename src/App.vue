`<template>
  <div id="app">
    <h2>FreeDrawingTest</h2>

    <FreeDrawingTest />

    <h2>Scheduler</h2>

    <Scheduler />
  </div>
</template>

<script>
import Scheduler from "./components/Scheduler.vue";
import FreeDrawingTest from "./components/FreeDrawingTest.vue";
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueKonva from "vue-konva";

Vue.use(VueKonva);
Vue.use(VueMaterial);

export default {
  name: "app",
  components: {
    Scheduler,
    FreeDrawingTest
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
