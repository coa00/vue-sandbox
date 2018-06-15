<template>
  <div ref="container">
    <canvas v-bind:width="width" v-bind:height="height" ref="canvas"></canvas>
  </div>

</template>
<style scoped>
div {
  display: inline-block;
}
</style>
<script>
import log from "loglevel";
import Konva from "konva";

export default {
  name: "FreeDrawing",
  props: {
    // ブラシか、消しゴムかのモードを設定
    mode: {
      type: String,
      default: "brush"
    },
    //読み込みイメージ
    imageUrl: {
      type: String
    },
    imageStyle: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          width: undefined,
          height: undefined
        };
      }
    },
    //キャンバスのサイズ
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },

    //ペイントのスタイル
    paintStyle: {
      type: Object,
      default: () => {
        return {
          color: "#333",
          lineWidth: 5
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

    //背景レイヤー
    this.bgLayer = new Konva.Layer();

    //書き込みレイヤー
    this.drawingLayer = new Konva.Layer();

    this.stage.add(this.bgLayer);
    this.stage.add(this.drawingLayer);

    this.drawScope = new Konva.Image({ image: this.canvas });

    if (this.imageUrl) {
      const imageObj = new Image();

      imageObj.addEventListener("load", () => {
        const loadPaintImg = new Konva.Image(
          {
            x: this.imageStyle.x,
            y: this.imageStyle.y,
            image: imageObj,
            width: this.imageStyle.width,
            height: this.imageStyle.height
          },
          false
        );
        // add the shape to the layer
        this.bgLayer.add(loadPaintImg);
        this.stage.draw();
        //親コンポーネントに dataUrl を送る
        this.$emit("data-url", this.stage.toDataURL());
      });
      imageObj.src = this.imageUrl;
      imageObj.setAttribute("crossOrigin", "anonymous");
    }
    // this.bgLayer.add(this.backGround);
    this.drawingLayer.add(this.drawScope);
    this.stage.draw();

    //イベントの設定
    this.stage.on("contentMousedown.proto", this.mousedown);
    this.stage.on("contentTouchstart.proto", this.mousedown);

    this.stage.on("contentMouseup.proto", this.mouseup);
    this.stage.on("contentTouchend.proto", this.mouseup);

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
      log.debug("mousedown");
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();

      log.debug(
        "this.lastPointerPosition:",
        this.lastPointerPosition.x,
        this.lastPointerPosition.y
      );
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

      log.debug("drawinLayer:", this.drawingLayer.x(), this.drawingLayer.y());

      let localPos = {
        x: this.lastPointerPosition.x - this.drawingLayer.x(),
        y: this.lastPointerPosition.y - this.drawingLayer.y()
      };

      this.context.moveTo(localPos.x, localPos.y);

      const pos = this.stage.getPointerPosition();
      localPos = {
        x: pos.x - this.drawingLayer.x(),
        y: pos.y - this.drawingLayer.y()
      };

      this.context.lineTo(localPos.x, localPos.y);
      this.context.closePath();
      this.context.stroke();

      this.lastPointerPosition = pos;
      this.drawingLayer.draw();

      const dataUrl = this.stage.toDataURL();

      //親コンポーネントに dataUrl を送る
      this.$emit("data-url", dataUrl);
    }
  }
};
</script>
