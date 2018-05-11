<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div class="TimeGrid">
    <span v-bind:class="{ hidden: (!showTime || decimating) }">
      {{ getGridTime(index - 1) }}
    </span>

  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "TimeGrid",
  props: ["showTime", "index", "range_start", "times", "gridUnit", "hidden"],
  data: function() {
    return {
      decimating: false
    };
  },
  methods: {
    getGridTime: function(hour) {
      const addTime = hour * this.gridUnit;
      const remainder = addTime % 0.5;

      if (remainder > 0) {
        this.decimating = true;
      }

      return moment(this.range_start)
        .add(addTime, "hours")
        .format("HH:mm");
    }
  }
};
</script>

<style  lang="scss" scoped>
.TimeGrid {
  font-size: 0.5rem;
}
.hidden {
  visibility: hidden;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
.green {
  background-color: green;
}
</style>
