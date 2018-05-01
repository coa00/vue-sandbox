<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="TimeGrid">
    <span v-bind:class="{ hidden: !showTime }">
      {{ getGridTime(index - 1) }}
    </span>

  </div>
</template>

<script>
  import Moment from 'moment';
  import { extendMoment } from 'moment-range';

  const moment = extendMoment(Moment);

  export default {
    name: 'TimeGrid',
    props: ['showTime','index','range_start', 'times', 'gridUnit','hidden'],
    created:  function(){
      console.log('showTime', this.showTime);
    },
    methods: {
      getGridTime: function (hour) {
        const addTime = hour * this.gridUnit;
        return moment(this.range_start).add(addTime,'hours').format("HH:mm");
      }
    }
  }
</script>

<style  lang="scss" scoped>
  .hidden{
    visibility: hidden;
  }
  .red{
    background-color: red;
  }
  .blue{
    background-color: blue;
  }
  .green{
    background-color: green;
  }

</style>
