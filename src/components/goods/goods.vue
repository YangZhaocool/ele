<template>
  <div class="Goods">
    <!-- 左侧的导航 -->
    <div
      class="menu-wrapper"
      ref='menuWrapper'
    >
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
        >
          <span class="text">
            <span
              class="icon border-1px"
              v-show="item.type>0"
              :class="classMap[item.type]"
            >
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧的食物 -->
    <div
      class="foods-wrapper"
      ref='foodWrapper'
    >
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
        >
          <h1 class=title>
            {{item.name}}
          </h1>
          <ul>
            <li
              v-for="(food, index) in item.foods"
              :key="index"
              class="food-item"
            >
              <div class="icon">
                <img
                  :src="food.icon"
                  width="57"
                  height="57"
                >
              </div>
              <div class="content">
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span class="count">
                    月售{{food.sellCount}}份
                  </span>
                  <span>
                    好评率{{food.rating}}%
                  </span>
                </div>
                <div class="price">
                  <span class="now">
                    ￥{{food.price}}
                  </span>
                  <span
                    v-show="food.oldPrice"
                    class="old"
                  >
                    ￥{{food.oldPrice}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BScroll } from 'better-scroll';
const ERR_OK = 0;
export default {
  name: 'Goods',
  props: ['seller'],
  data () {
    return {
      goods: []
    };
  },
  created () {
    this.axios.get('/api/goods/')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
          console.log(this.goods);
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      })
      .catch(() => {

      });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {

      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {

      });
    }
  }
};
</script>

<style lang='stylus'>
@import 'goods.styl'
</style>
