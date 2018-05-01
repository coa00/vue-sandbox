<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="room">
    <div class="name">{{ room }}</div>
    <div class="resize-container">
      <div class="item" v-for="number in gridCount" v-bind:key="number">
        <TimeGrid v-bind:show-time="times.showTime" v-bind:grid-unit="GRID_UNIT" v-bind:times="times" v-bind:index="number" v-bind:range_start="range_start" v-bind:range_end="range_end"></TimeGrid>
      </div>
      <div class="times" v-for="(time) in times.timeData" v-bind:key="time.key">
        <DragTest v-bind:startIndex="getStartGrid(time.start)" v-bind:colorclass="time.class" class="" v-bind:endIndex="getEndGrid(time.end)" v-bind:width="getWidth(time.start, time.end)">
          <span class="time-content">患者: {{time.customer}} 医者:{{time.doctor}}</span>
        </DragTest>
      </div>

    </div>

  </div>
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
      this.GRID_UNIT = 0.25;

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
    display: table-row;

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


    .resize-drag{
      &.red{
        background-color: rgba(200,0,0,0.5);
      }
      &.blue{
        background-color: rgba(0,0,200,0.5);
      }

      &.green{
        background-color: rgba(0,180,0,0.5);
      }

    }
    .name{
      vertical-align: middle;
      width: 60px;
      display: table-cell;
      border: solid 1px rgba(0,0,0,0.1);
    }
    .item{
      vertical-align: middle;
      width: 300px;
      border: solid 1px rgba(0,0,0,0.1);
      display: table-cell;
    }
    .time-content{
      font-size: 0.4rem;
    }
  }

</style>
