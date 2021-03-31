<template>
  <div
    class="ratings"
    ref="ratings"
  >
    <!-- 评价内容 -->
    <div class="ratings-content">
      <!-- 头部 -->
      <div class="overview">
        <!-- 分数 -->
        <div class="overview-left">
          <h1 class="score">
            {{seller.score}}
          </h1>
          <div class="title">
            综合评分
          </div>
          <div class="rank">
            高于周边商家
            {{seller.rankRate}}%
          </div>
        </div>
        <!-- 分数星星 -->
        <div class="overview-right">
          <div class="score-warpper">
            <span class="title">
              服务态度
            </span>
            <Star
              :size="36"
              :score="seller.serviceScore"
            />
            <span class="score">
              {{seller.serviceScore}}
            </span>
          </div>
          <div class="score-warpper">
            <span class="title">
              商品评分
            </span>
            <Star
              :size="36"
              :score="seller.foodScore"
            />
            <span class="score">
              {{seller.foodScore}}
            </span>
          </div>
          <div class="delivery-warpper">
            <span class="title">
              送达时间
            </span>
            <span class="delivery">
              {{seller.deliveryTime}}分钟
            </span>
          </div>
        </div>
      </div>
      <Split />
      <Ratingselect
        :select-type='selectType'
        :only-content='onlyContent'
        :desc='desc'
        :ratings='ratings'
        @select="selectRating"
        @toogle='toggleContent'
      />
      <!-- 评价的列表 -->
      <div class="rating-warpper">
        <ul>
          <li
            v-for="(rating, index) in ratings"
            :key="index"
            class="rating-item"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <!-- 头像 -->
            <div class="avatar">
              <img
                :src=rating.avatar
                alt=""
                width="28"
                height="28"
              >
            </div>
            <!-- 右侧内容 -->
            <div class="content">
              <!-- 名字 -->
              <h1 class="name">
                {{rating.username}}
              </h1>
              <div class="star-warpper">
                <!-- 星星 -->
                <Star
                  :size="24"
                  :score="rating.score"
                />
                <!-- 送达时间 -->
                <span
                  class="delivery"
                  v-show="rating.deliveryTime"
                >
                  {{rating.deliveryTime}}分钟送达
                </span>
              </div>
              <!-- 评价的内容 -->
              <p class="text">
                {{rating.text}}
              </p>
              <!-- 推荐的内容 -->
              <div
                class="recommend"
                v-show="rating.recommend&&rating.recommend.length"
              >
                <span class="icon icon-thumb_up"></span>
                <span
                  v-for="(recommend, index) in rating.recommend"
                  :key="index"
                  class="item"
                >
                  {{recommend}}
                </span>
              </div>
              <!-- 时间 -->
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import Star from '../star/star';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';
const ALL = 2;
export default {
  name: 'Ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  created () {
    this.axios.get('/api/ratings/')
      .then(response => {
        response = response.data;
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      // eslint-disable-next-line no-undef
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
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
      console.log(type);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent;
      console.log(this.onlyContent);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  components: {
    Star,
    Split,
    Ratingselect
  }
};
</script>

<style lang="stylus">
@import './ratings.styl'
</style>
