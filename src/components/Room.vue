<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <tr class="room">
    <div class="name">{{ room }}</div>
    <div class="resize-container">
      <div class="times">
        <div class="item" v-for="number in hourDiff" v-bind:key="number">
          <TimeGrid v-bind:times="times" v-bind:index="number" v-bind:range_start="range_start" v-bind:range_end="range_end"></TimeGrid>
        </div>
      </div>
      <DragTest></DragTest>
    </div>

  </tr>
</template>

<script>
  import moment from 'moment';
  import TimeGrid from './TimeGrid.vue';
  import DragTest from './DragTest.vue'

  export default {
    name: 'Room',
    components: {
      DragTest,
      TimeGrid
    },
    props: ['room', 'times','range_start', 'range_end'],
    created:  function(){
      // from, to から時間を求める
      const fromDate = moment(this.range_start);
      const toDate = moment(this.range_end);
      this.hourDiff = toDate.diff(fromDate,'hours');
      console.log(this.hourDiff);

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
        border: solid 1px rgba(0,0,0,0.1);
        display: table-cell;
      }

    }
  }

</style>
