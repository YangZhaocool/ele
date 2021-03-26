<template>
  <transition name="move">
    <div
      class="food"
      v-show="showFlag"
      ref="food"
    >
      <!-- 食品的内容 -->
      <div class="food-content">
        <!-- 头部 -->
        <div class="image-header">
          <img :src="food.image">
          <div
            class="back"
            @click="back()"
          >
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <!-- 标题 -->
          <div class="title">
            {{food.name}}
          </div>
          <!-- 销售的情况 -->
          <div class="detail">
            <span class="sell-count">
              月售{{food.sellCount}}份
            </span>
            <span class="rating">
              好评率{{food.rating}}%
            </span>
          </div>
          <!-- 价格 -->
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
          <!-- 加入购物车 -->
          <div class="cartcontrol-warpper">
            <cartcontrol
              :food='food'
              @add="addFood"
            ></cartcontrol>
          </div>
          <transition name="fade">
            <div
              class="buy"
              v-show="!food.count||food.count===0"
              @click.stop.prevent="addFirst"
            >
              加入购物车
            </div>
          </transition>
        </div>
        <Split v-show="food.info" />
        <!-- 食品的信息 -->
        <div
          class="info"
          v-show="food.info"
        >
          <h1 class="title">
            商品信息
          </h1>
          <p class="text">
            {{food.info}}
          </p>
        </div>
        <Split />
        <!-- 评价 -->
        <div class="rating">
          <div class="title">商品评价</div>
          <Ratingselect
            :select-type='selectType'
            :only-content='onlyContent'
            :desc='desc'
            :ratings='food.ratings'
            @select="selectRating"
            @toogle='toggleContent'
          />
          <!-- 评价的列表 -->
          <div class="rating-warppeer">
            <ul v-show="food.ratings&&food.ratings.length">
              <li
                v-show="needShow(rating.rateType,rating.text)"
                v-for="(rating, index) in food.ratings"
                :key="index"
                class="rating-item"
              >
                <!-- 用户信息 -->
                <div class="user">
                  <span class="user-name">
                    {{rating.username}}
                  </span>
                  <img
                    :src=rating.avatar
                    class="avatar"
                    width="12"
                    height="12"
                  >
                </div>
                <!-- 时间 -->
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
                <!-- 评论详情 -->
                <p class="text">
                  <span
                    class="icon"
                    :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"
                  ></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <!-- 空的时候 -->
            <div
              class="no-rating"
              v-show="!food.ratings||!food.ratings.length"
            >
              啥也没有
            </div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import BScroll from '@better-scroll/core';
import cartcontrol from '../cartcontrol/cartcontrol';
import Vue from 'vue';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';

// 全部
const ALL = 2;
export default {
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      console.log(this.onlyContent);
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    back () {
      this.showFlag = false;
    },
    addFirst (event) {
      if (!event._constructed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      this.$emit('add', event.target);
      Vue.set(this.food, 'count', 1);
    },
    addFood (target) {
      /// console.log(target);
      this.$emit('add', target);
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    selectRating (type) {
      this.selectType = type;
      /// console.log(type);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      // eslint-disable-next-line no-undef
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    Split,
    Ratingselect
  }
};
</script>

<style lang='stylus'>
@import './food.styl'
</style>
