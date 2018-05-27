<template>
  <div ref="container">
    <canvas ref="canvas"></canvas>
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
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    paintStyle: {
      type: Object,
      default: () => {
        return {
          color: "#333",
          lineWidth: 5
        };
      }
    },
    bgConfig: {
      type: Object,
      default: () => {
        return {
          stroke: "#333",
          x: 0,
          y: 0
        };
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");

    this.context.strokeStyle = this.paintStyle.color;
    this.context.lineJoin = "round";
    this.context.lineWidth = this.paintStyle.lineWidth;

    const container = this.$refs.container;

    this.stage = new Konva.Stage({
      container,
      width: this.width,
      height: this.height
    });

    this.bgLayer = new Konva.Layer();
    this.drawingLayer = new Konva.Layer();

    this.stage.add(this.bgLayer);
    this.stage.add(this.drawingLayer);

    this.backGround = new Konva.Image({
      image: this.canvas,
      x: 0,
      y: 0
    });

    this.drawScope = new Konva.Image(
      Object.assign(
        {
          image: this.canvas
        },
        this.bgConfig
      )
    );

    if (this.imageUrl) {
      const imageObj = new Image();

      imageObj.addEventListener("load", () => {
        const loadPaintImg = new Konva.Image(
          {
            x: this.backGround.x(),
            y: this.backGround.y(),
            image: imageObj,
            width: 106,
            height: 118
          },
          false
        );
        // add the shape to the layer
        this.bgLayer.add(loadPaintImg);
        this.stage.draw();
      });
      imageObj.src = this.imageUrl;
    }

    this.bgLayer.add(this.backGround);
    this.drawingLayer.add(this.drawScope);
    this.stage.draw();

    this.stage.on("contentMousedown.proto", this.mousedown);
    this.stage.on("contentTouchstart.proto", this.mousedown);

    this.stage.on("contentMouseup.proto", this.mouseup);
    this.stage.on("contentTouchend,.proto", this.mouseup);

    this.stage.on("contentMousemove.proto", this.mousemove);
    this.stage.on("contentTouchmove.proto", this.mousemove);
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
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();
    },
    mouseup: function() {
      this.isPaint = false;
    },
    mousemove: function() {
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

      log.debug("move localPos:", localPos);

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
      this.drawingLayer.draw();

      this.$emit("data-url", this.canvas.toDataURL());
    }
  }
};
</script>
