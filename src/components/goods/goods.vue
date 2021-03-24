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
          :class="{'current':currentIndex===index}"
          @click="selectMenu(index,$event)"
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
          class="food-list-hook"
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
                  </span><span
                    v-show="food.oldPrice"
                    class="old"
                  >
                    ￥{{food.oldPrice}}
                  </span>
                </div>
                <div class="cartcontrol-warpper">
                  <cartcontrol
                    :food='food'
                    v-on:cart-add="cartAdd"
                  ></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :selcet-foods="selcetFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      ref="shopcart"
    ></shopcart>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import shopcart from '../shopcart/shopcat';
import cartcontrol from '../cartcontrol/cartcontrol';
const ERR_OK = 0;
export default {
  name: 'Goods',
  props: ['seller'],
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selcetFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      // console.log(foods);
      return foods;
    }
  },
  created () {
    this.axios.get('/api/goods/')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data;
          this.$nextTick(() => {
            // 滚动
            this._initScroll();
            // 计算高度
            this._calculateHeight();
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
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on('scroll', (pro) => {
        this.scrollY = Math.abs(Math.round(pro.y));
        // console.log(this.scrollY);
      });
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index, event) {
      console.log(index);
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
      if (!event.constructed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
    cartAdd (el) {
      // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
      this.$nextTick(() => {
        this.$refs['shopcart'].drop(el);// 调用shopcart组件的drop()函数
      });
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
  // events: {
  //   'car.add' (targer) {
  //     this._drop(targer);
  //   }
  // }
};
</script>

<style lang='stylus'>
@import 'goods.styl'
</style>
