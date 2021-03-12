<template>
  <div class="Header">
    <!-- 内容 -->
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avatar">
        <img
          :src="seller.avatar"
          width="64"
          height="64"
        >
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 名字 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">
            {{seller.name}}
          </span>
        </div>
        <!-- 配送描述 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div
          v-if="seller.supports"
          class="supports"
        >
          <span
            class="icon"
            :class='classMap[seller.supports[0].type]'
          ></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <!-- 支持 -->
      <div
        class="support-count"
        v-if="seller.supports"
        @click="showDetail()"
      >
        <span class="count">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div
      class="bulletin-wrapper"
      @click="showDetail()"
    >
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{seller.bulletin}}
      </span>
      <span class="icon-keyboard_arrow_right icon"> </span>
    </div>
    <!-- 背景 -->
    <div class="background">
      <img
        :src="seller.avatar"
        width="100%"
        height="100%"
      >
    </div>
    <!-- 弹出的描述-->
    <div
      class="detail"
      v-show="detailShow"
    >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">
            {{seller.name}}
          </h1>
          <!-- 星星评级 -->
          <div class="star-wrapper">
            <star
              :size='48'
              :score="4.6"
            ></star>
          </div>
          <!-- 小标题 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">
              这里是优惠信息
            </div>
            <div class="line"></div>
          </div>
          <!-- 信息 -->
          <ul
            v-if="seller.supports"
            class="supports"
          >
            <li
              class="support-item"
              v-for="(item, index) in seller.supports"
              :key="index"
            >
              <span
                class="icon"
                :class="classMap[seller.supports[index].type]"
              ></span>
              <span class="text">
                {{item.description}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="detail-close"
        @click="hideDetail()"
      >
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
export default {
  name: 'Header',
  // props: {
  //   seller: {
  //     type: Object
  //   }
  // }
  data () {
    return {
      detailShow: true
    };
  },
  props: ['seller'],
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  },
  components: {
    star
  }
};
</script>

<style lang="stylus">
@import 'header'
</style>
