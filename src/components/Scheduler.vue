<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="Scheduler">
    <div v-for="(times, room) in scheduleData" v-bind:key="room">
      <Room v-bind:range_start="range_start" v-bind:range_end="range_end" v-bind:room="room" v-bind:times="times"></Room>
    </div>
  </div>
</template>

<script>
import Room from "./Room.vue";

export default {
  name: "Scheduler",
  components: {
    Room
  },
  data: () => {
    return {
      range_start: "2018-04-17 10:00",
      range_end: "2018-04-17 22:00",
      scheduleData: {
        " ": {
          showTime: true,
          timeData: []
        },
        "CS room1": {
          timeData: [
            {
              start: "2018-04-17 11:00",
              end: "2018-04-17 13:00",
              class: "red",
              customer: "田中",
              doctor: "ブラックジャック"
            },
            {
              start: "2018-04-17 15:00",
              end: "2018-04-17 17:00",
              class: "green",
              customer: "金本",
              doctor: "ブラックジャック"
            }
          ]
        },
        "CS room2": {
          timeData: [
            {
              start: "2018-04-17 11:00",
              end: "2018-04-17 13:00",
              class: "green",
              customer: "やまだ",
              doctor: "ホワイトジャック"
            }
          ]
        },
        "CS room3": {
          timeData: [
            {
              start: "2018-04-17 11:00",
              end: "2018-04-17 13:00",
              class: "blue",
              customer: "鈴木",
              doctor: "イエロージャック"
            }
          ]
        },
        "CS room4": {},
        "CS room5": {},
        "CS room6": {},
        "CP room1": {},
        "CP room2": {}
      }
    };
  }
};
</script>

<style  lang="scss" scoped>
.Scheduler {
  display: table;
}
</style>
