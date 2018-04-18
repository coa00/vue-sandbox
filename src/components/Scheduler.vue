<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="Scheduler">
    <div class="room" v-for="(times, room) in scheduleData">
      <div class="name">{{ room }}</div>
      <div class="times">
        <div class="item"  v-for="item in times">
          <span>{{ item.start }}</span>
          <span>{{ item.end }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Scheduler',
  data: ()=>{
    return {
      range_start: '2018-04-17 10:00',
      range_end:'2018-04-17 22:00',
      scheduleData: {
        roomA:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00'}],
        roomB:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00'}],
        roomC:[{start:'2018-04-17 11:00', end:'2018-04-17 13:00'}],
      }
    }
  },
  created: function () {
    console.log(moment(this.range_start));
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
