<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <tr class="room">
    <div class="name">{{ room }}</div>
    <div class="resize-container">
      <div class="times">
        <div class="item" v-for="number in gridCount" v-bind:key="number">
          <TimeGrid v-bind:grid-unit="GRID_UNIT" v-bind:times="times" v-bind:index="number" v-bind:range_start="range_start" v-bind:range_end="range_end"></TimeGrid>
        </div>
      </div>
      <div class="times" v-for="(time) in times" v-bind:key="time.key">
        <DragTest v-bind:startIndex="getStartGrid(time.start)" v-bind:endIndex="getEndGrid(time.end)" v-bind:width="getWidth(time.start, time.end)"></DragTest>
      </div>

    </div>

  </tr>
</template>

<script>
  import moment from 'moment';
  import TimeGrid from './TimeGrid.vue';
  import DragTest from './DragTest.vue';



  export default {
    name: 'Room',
    components: {
      DragTest,
      TimeGrid
    },
    props: ['room', 'times','range_start', 'range_end'],
    created:  function(){
      this.GRID_UNIT = 0.5;

      // from, to から時間を求める
      const fromDate = moment(this.range_start);
      const toDate = moment(this.range_end);
      const hourDiff = toDate.diff(fromDate,'hours');
      this.gridCount = hourDiff / this.GRID_UNIT;
    },
    methods: {
      getStartGrid: function (startTime) {
        const fromDate = moment(this.range_start);
        const toDate = moment(startTime);
        const diffHour = toDate.diff(fromDate,'hours');
        console.log('getStartGrid', diffHour);

        return diffHour / this.GRID_UNIT;
      },
      getEndGrid: function (endTime) {
        const fromDate = moment(this.range_start);
        const toDate = moment(endTime);
        const diffHour = toDate.diff(fromDate,'hours');
        console.log('getEndGrid', diffHour);
        return diffHour / this.GRID_UNIT;
      },
      getWidth: function (startTime, endTime) {
        const fromDate = moment(startTime);
        const toDate = moment(endTime);
        const diffHour = toDate.diff(fromDate,'hours');
        console.log('getWidth', diffHour);
        return diffHour / this.GRID_UNIT;
      },
    },
    mounted: function () {
      console.log(this);
    }
  }
</script>

<style  lang="scss" scoped>
  .room{
    .resize-container {
      position: relative;
      width: 100%;
      height: 100%;
      .active{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 90%;
        background-color: rgba(200,0,0,0.5);
      }
    }

    display: table-row;
    .name{
      border:  solid 1px rgba(0,0,0,0.1);
      display: table-cell;
    }
    .times{
      .item{
        box-sizing: border-box;
        border: solid 1px rgba(0,0,0,0.1);
        display: table-cell;
      }

    }
  }

</style>
