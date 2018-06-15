<template>
  <div>
    <div>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>ツール選択</md-button>
        <md-menu-content>
          <md-menu-item @click="selectBrush">ブラシ</md-menu-item>
          <md-menu-item @click="selectEraser">消しゴム</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
    <FreeDrawing v-bind:is-show-border="false" v-bind:mode="canvasMode" v-bind:width="300" v-bind:height="300" v-on:data-url="getImageData" image-url="./Yoda-300x300.jpg"/>

    <img v-bind:src='imageData' alt="" />


  </div>
</template>
<style scoped>
div {
  display: inline-block;
}
</style>
<script>
import FreeDrawing from "./FreeDrawing.vue";
import log from "loglevel";

export default {
  name: "FreeDrawingTest",
  components: {
    FreeDrawing
  },
  data() {
    return {
      canvasMode: "brush",
      imageData: ""
    };
  },
  methods: {
    selectBrush: function() {
      this.canvasMode = "brush";
    },
    selectEraser: function() {
      this.canvasMode = "eraser";
    },
    getImageData: function(data) {
      this.imageData = data;
      log.debug("getImageData", data);
    }
  }
};
</script>
