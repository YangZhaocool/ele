<template>
  <div class="ratingselect">
    <!-- 评价类型 -->
    <div class="rating-type">
      <span
        class="block positive"
        :class="{'active':selectType===2}"
        @click="select(2,$event)"
      >
        {{desc.all}}
        <span class="count">
          {{ratings.length}}
        </span>
      </span>
      <span
        class="block positive"
        :class="{'active':selectType===0}"
        @click="select(0,$event)"
      >
        {{desc.positive}}
        <span class="count">
          {{positives.length}}
        </span>
      </span>
      <span
        class="block negative"
        :class="{'active':selectType===1}"
        @click="select(1,$event)"
      >
        {{desc.negative}}
        <span class="count">
          {{negatives.length}}
        </span>
      </span>
    </div>
    <div
      class="switch"
      :class="{'on':onlyContent}"
      @click="toggleContent($event)"
    >
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// 满意
// eslint-disable-next-line no-unused-vars
const POSITIVE = 0;
// 不满意
// eslint-disable-next-line no-unused-vars
const NEGATIVE = 1;
// 全部
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return;
      }
      // this.selectType = type;
      this.$emit('select', type);
    },
    toggleContent (event) {
      if (!event._constructed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      this.$emit('toogle');
    }
  }
};
</script>

<style lang="stylus">
@import './ratingselect.styl'
</style>
