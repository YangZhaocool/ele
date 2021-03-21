<template>
  <div class="cartcontrol">
    <div
      class="cart-decrease icon-remove_circle_outline"
      v-show="food.count>0"
      @click="decreaseCount"
    ></div>
    <div
      class="cart-count"
      v-show="food.count>0"
    >
      {{food.count}}
    </div>
    <div
      class="cart-add icon-add_circle"
      @click="addCart"
    ></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        // this.food.count = 1;
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCount (event) {
      if (!event._constructed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
  // created () {
  //   console.log(this.food);
  // }
};
</script>

<style lang="stylus">
@import 'cartcontrol.styl'
</style>
