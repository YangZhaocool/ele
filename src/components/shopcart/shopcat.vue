<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-warpper">
          <div
            class="logo"
            :class="{'high':totalCount > 0}"
          >
            <i
              class="icon-shopping_cart"
              :class="{'high':totalCount>0}"
            ></i>
          </div>
          <div
            class="num"
            v-show="totalCount>0"
          >
            {{totalCount}}
          </div>
        </div>
        <div
          class="price"
          :class="{'high':totalPrice>0}"
        >￥{{totalPrice}}</div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div
          class="pay"
          :class="payClass"
        >
          <!-- ￥{{minPrice}}起送 -->
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   props: ['deliveryPrice', 'minPrice']
  props: {
    selcetFoods: {
      type: Array,
      default () {
        return [];
        // return [{
        //   price: 0,
        //   count: 0
        // }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {

    totalPrice () {
      let total = 0;
      this.selcetFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selcetFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥ ${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥ ${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not';
      } else {
        return 'en';
      }
    }

  }
};
</script>

<style lang='stylus'>
@import './shopcat.styl'
</style>
