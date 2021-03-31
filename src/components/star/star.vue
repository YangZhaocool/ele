<template>
  <div
    class="star"
    :class='starType'
  >
    <span
      v-for="(itemClass,index) in Classes"
      :key="index"
      :class="itemClass"
      class="star-item"
    ></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  // props: ['size', 'score'],
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    Classes () {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      // console.log(score);
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        // console.log(score % 1);
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
        // console.log(11);
      }
      // console.log(result);
      return result;
    }
  }
};
</script>

<style lang="stylus">
@import 'star'
</style>
