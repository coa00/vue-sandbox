<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="Scheduler">
    <div v-for="(times, room) in scheduleData" v-bind:key="room">
      <Room v-bind:range_start="range_start" v-bind:range_end="range_end" v-bind:room="room" v-bind:times="times"></Room>
    </div>
  </div>
</template>

<script>
import Room from './Room.vue';

export default {
  name: 'Scheduler',
  components: {
    Room
  },
  data: ()=>{
    return {
      range_start: '2018-04-17 10:00',
      range_end:'2018-04-17 22:00',
      scheduleData: {
        roomA:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00', class:'red'}],
        roomB:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00', class:'green'}],
        roomC:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00', class:'blue'}],
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
.Scheduler{
  display: table;
  table-layout: fixed;
  width: 80%;
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
        display: table-cell;
      }

    }
  }
}

</style>
