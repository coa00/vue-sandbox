`<template>
  <div id="app">
    <FreeDrawing mode="eraser" image-url="http://fr.ubergizmo.com/wp-content/uploads/2012/10/Yoda-300x300.jpg"/>
  </div>
</template>

<script>
import Scheduler from "./components/Scheduler.vue";
import FreeDrawing from "./components/FreeDrawing.vue";
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
    FreeDrawing
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
