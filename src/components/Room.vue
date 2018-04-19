<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="room">
    <div class="name">{{ room }}</div>
    <div class="times">
      <div class="item" v-for="number in hourDiff">
        <TimeGrid v-bind:times="times" v-bind:index="number" v-bind:range_start="range_start" v-bind:range_end="range_end"></TimeGrid>
      </div>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment';
  import { extendMoment } from 'moment-range';
  import TimeGrid from './TimeGrid.vue';
  const moment = extendMoment(Moment);

  export default {
    name: 'Room',
    components: {
      TimeGrid
    },
    props: ['room', 'times','range_start', 'range_end', 'range_end'],
    created:  function(){
      // from, to から時間を求める
      const fromDate = moment(this.range_start);
      const toDate = moment(this.range_end);
      this.hourDiff = toDate.diff(fromDate,'hours');
      console.log(this.hourDiff);

    }
  }
</script>

<style  lang="scss" scoped>
  .Scheduler{
    display: table;
    .room{
      display: table-row;
      .name{
        border: rgba(0,0,0,0.1) solid 1px;
        display: table-cell;
        padding: 1rem;
      }
      .times{
        .item{
          border: rgba(0,0,0,0.1) solid 1px;
          padding: 1rem;
          display: table-cell;
        }

      }
    }
  }

</style>
