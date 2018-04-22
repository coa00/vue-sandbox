<template>
  <div id="drag-1" class="resize-drag">
    <p> You can drag one element </p>
  </div>
</template>
<style>
  .resize-drag{
    box-sizing: border-box;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(200,0,0,0.5);

    color: white;
  }
</style>

<script>
  import interact from 'interactjs';

  const setItemPos = (target, x, y)=>{
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    console.log(x, y);
  };

  function dragMoveListener (event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    setItemPos(target, x, y);
  }
  export default {
    name: 'dragtest',
    props: ['range_start', 'times'],
    mounted: function () {
      const gridWidth = this.$el.parentElement.querySelector('.item').clientWidth + 2;
      const gridHeight = this.$el.parentElement.querySelector('.item').clientHeight + 2;
      console.log('gridWidth', gridWidth);

      interact(this.$el).origin('parent')
        .draggable({
          onmove: dragMoveListener,
          snap: {
            targets: [
              interact.createSnapGrid({ x: gridWidth, y: 1 })
            ],
            offset: 'startCoords'
          },
          restrict: {
            restriction: '.resize-container',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          }
        })
        .resizable({
          squareResize: true,
          snap: {
            targets: [
              interact.createSnapGrid({ x: gridWidth, y: 1 })
            ],
            offset: 'startCoords'
          },
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: false, top: false },

          // keep the edges inside the parent
          restrictEdges: {
            endOnly: true, // trueを指定した場合、ドロップした瞬間に範囲を超えているとき、範囲内に戻す
            outer: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },

          // minimum size
          restrictSize: {
            min: { width: gridWidth, height: gridHeight },
          },

          inertia: true,
        })
        .on('resizemove', function (event) {
          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
          console.log('deltaRect', event.deltaRect);
          // update the element's style
          target.style.width  = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
          x += event.deltaRect.left;

          y += event.deltaRect.top;


          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        });
    }
  }
</script>