<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="TimeGrid">
    <div>
      {{ getGridTime(index - 1) }}
    </div>

  </div>
</template>

<script>
  import Moment from 'moment';
  import { extendMoment } from 'moment-range';

  const moment = extendMoment(Moment);

  export default {
    name: 'TimeGrid',
    props: ['index','range_start', 'times', 'gridUnit'],
    methods: {
      getGridTime: function (hour) {
        const addTime = hour * this.gridUnit;
        return moment(this.range_start).add(addTime,'hours').format("HH:mm");
      }
    }
  }
</script>

<style  lang="scss" scoped>
  .TimeGrid{
    font-size: 0.1rem;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 2rem;
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
