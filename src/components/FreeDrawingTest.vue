<template>
  <div>
    <FreeDrawing v-bind:mode="canvasMode" v-on:data-url="getImageData" image-url="http://fr.ubergizmo.com/wp-content/uploads/2012/10/Yoda-300x300.jpg"/>
    <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>ツール選択</md-button>

      <md-menu-content>
        <md-menu-item @click="selectBrush">ブラシ</md-menu-item>
        <md-menu-item @click="selectEraser">消しゴム</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>
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
