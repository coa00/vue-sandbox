<template>
  <div ref="container">
    <canvas ref="canvas" width="300" height="300" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove"></canvas>
  </div>

</template>

<script>
import Konva from "konva";
import log from "loglevel";

export default {
  name: "FreeDrawing",
  props: {
    mode: {
      type: String,
      default: "brush"
    },
    imageUrl: {
      type: String
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");

    const container = this.$refs.container;
    this.stage = new Konva.Stage({
      container,
      width: window.innerWidth,
      height: window.innerHeight - 25
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.backGround = new Konva.Image({
      image: this.canvas,
      x: this.stage.width() / 4,
      y: this.stage.height() / 4,
      stroke: "#333",
      shadowBlur: 1
    });

    if (this.imageUrl) {
      const imageObj = new Image();

      imageObj.addEventListener("load", () => {
        const loadPaintImg = new Konva.Image(
          {
            x: 50,
            y: 50,
            image: imageObj,
            width: 106,
            height: 118
          },
          false
        );
        // add the shape to the layer
        this.layer.add(loadPaintImg);
      });
      imageObj.src = this.imageUrl;
    }

    this.layer.add(this.backGround);
    this.stage.draw();

    this.stage.on("contentMousedown.proto", this.mousedown);
    this.stage.on("contentMouseup.proto", this.mouseup);
    this.stage.on("contentMousemove.proto", this.mousemove);
  },
  data() {
    return {
      stage: {},
      canvas: {},
      context: {},
      isPaint: false,
      backGround: {},
      lastPointerPosition: {}
    };
  },
  methods: {
    mousedown: function() {
      log.debug("mousedown");
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();
    },
    mouseup: function() {
      log.debug("mouseup");
      this.isPaint = false;
    },
    mousemove: function() {
      log.debug("mousemove");
      if (!this.isPaint) {
        return;
      }

      if (this.mode === "eraser") {
        this.context.globalCompositeOperation = "destination-out";
      } else {
        this.context.globalCompositeOperation = "source-over";
      }

      this.context.beginPath();

      var localPos = {
        x: this.lastPointerPosition.x - this.backGround.x(),
        y: this.lastPointerPosition.y - this.backGround.y()
      };
      this.context.moveTo(localPos.x, localPos.y);
      var pos = this.stage.getPointerPosition();
      localPos = {
        x: pos.x - this.backGround.x(),
        y: pos.y - this.backGround.y()
      };
      this.context.lineTo(localPos.x, localPos.y);
      this.context.closePath();
      this.context.stroke();

      this.lastPointerPosition = pos;
      this.layer.draw();

      this.$emit("dataUrl:", this.canvas.toDataURL());
    }
  }
};
</script>
