<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->
  <div>
    <div v-bind:class="getClassName(times, index)">
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
    props: ['index','range_start', 'times'],
    methods: {
      getGridTime: function (hour) {
        return moment(this.range_start).add(hour,'hours').format("h:mm a");
      },
      getClassName: function (){
        let className = '';
        this.times.forEach((time)=>{
          console.log(time.start);
          const start = moment(time.start);
          const end   = moment(time.end);
          const target = moment(this.range_start).add(this.index,'hours')

          console.log('start', start.format("h:mm a"));
          console.log('end', end.format("h:mm a"));
          console.log('target', target.format("h:mm a"));

          console.log('isSameOrBefore', target.isSameOrBefore(start));
          console.log('isSameOrBefore', target.isSameOrBefore(start));


          if ( target.isSameOrBefore(end) && target.isSameOrAfter(start)){
            console.log('match');
            className = time.class;
          }
        });
        console.log('className',className);
        return className;

      }
    }
  }
</script>

<style  lang="scss" scoped>
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
