/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="shopcart">
    <!-- 购物车的内容 -->
    <div
      class="content"
      @click="toggleList"
    >
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
    <!-- 购物车的球 -->
    <div class="ball-container">

      <transition
        name="drop"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        v-for="(ball,index) in balls"
        :key="index"
      >
        <div
          class="ball"
          v-show="ball.show"
        >
          <div class="inner inner-hook"></div>
        </div>
      </transition>

    </div>
    <!-- 购物车的详情 -->
    <transition name="fade">
      <div
        class="shocart-list"
        v-show="listShow"
      >
        <div class="list-header">
          <h1 class="title">
            购物车
          </h1>
          <span
            class="empty"
            @click="empty()"
          >
            清空
          </span>
        </div>
        <div
          class="list-content"
          ref="listContent"
        >
          <ul>
            <li
              class="food"
              v-for="(food, index) in selcetFoods"
              :key="index"
            >
              <span class="name">
                {{food.name}}
              </span>
              <div class="prirce">
                <span>
                  ￥{{food.price*food.count}}
                </span>
              </div>
              <div class="cartcontrol-warpper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol';
import BScroll from '@better-scroll/core';
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
  data () {
    return {
      balls: [
        {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }
      ],
      dropBall: [],
      fold: true
    };
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
    },
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop (el) {
      // console.log(el);
      for (let index = 0; index < this.balls.length; index++) {
        const ball = this.balls[index];
        // console.log('element: ', ball);
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBall.push(ball);
          return;
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter (el) {
      // ...
      // eslint-disable-next-line no-unused-vars
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        // el.style.webkitTransform = 'translate3d(0,0,0)';
        // el.style.transform = 'translate3d(0,0,0)';
        // let inner = el.getElementsByClassName('inner-hook')[0];
        // inner.style.webkitTransform = 'translate3d(0,0,0)';
        // inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter (el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList () {
      if (!this.totalCount) {
        console.log(111);
        return;
      }
      this.fold = !this.fold;
    },
    empty () {
      this.selcetFoods.forEach((food) => {
        food.count = 0;
      });
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang='stylus'>
// @import '../../common/stylus/mixin.styl'
@import './shopcat.styl'
</style>
