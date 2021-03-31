<template>
  <div
    class="seller"
    ref="seller"
  >
    <div class="seller-content">
      <!-- 头部 -->
      <div class="overview">

        <h1 class="title">
          {{seller.name}}
        </h1>
        <div class="desc">
          <Star
            :size="36"
            :score="seller.score"
          />
          <span class="text">
            ({{seller.ratingCount}})
          </span>
          <span class="text">
            月售{{seller.sellCount}}单
          </span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">
                {{seller.minPrice}}
              </span>
              元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryPrice}}
              </span>
              元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryTime}}
              </span>
              元
            </div>
          </li>
        </ul>
        <!-- 收藏 -->
        <div
          class="favorite"
          @click="toggleFavorite($event)"
        >
          <span
            class="icon-favorite"
            :class="{'active':favorite}"
          ></span>
          <span class="text">
            {{favoriteText}}
          </span>
        </div>
      </div>
      <Split />
      <!-- 公告 -->
      <div class="bulletin">
        <h1 class="title">
          公告与活动
        </h1>
        <div class="content-warpper border-1px">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul
          v-if="seller.supports"
          class="supports"
        >
          <li
            class="support-item border-1px"
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
      <Split />
      <!-- 商家实景 -->
      <div class="pics">
        <h1 class="title">
          商家实景
        </h1>
        <div
          class="pic-warpper"
          ref="picWarpper"
        >
          <ul
            class="pic-list"
            ref="picList"
          >
            <li
              v-for="(item, index) in seller.pics"
              :key="index"
              class="pic-item"
            >
              <img
                :src=item
                width="120"
                height="90"
              >
            </li>
          </ul>
        </div>
      </div>
      <Split />
      <!-- 商家的信息 -->
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li
            class="info-item"
            v-for="(info, index) in seller.infos"
            :key="index"
          >
            {{info}}
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
import { saveToLocal, loadFromLocal } from '../../common/js/store';
export default {
  name: 'Seller',
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScorll();
        this._initPics();
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScorll();
      this._initPics();
    });
    // if (this.seller.pics) {
    //   let picWidth = 120;
    //   let margin = 6;
    //   let width = (picWidth + margin) * this.seller.pics.length - margin;
    //   this.$refs.picList.style.width = width + 'px';
    //   console.log(this.$refs.picList);
    //   this.$nextTick(() => {
    //     this.picScorll = new BScroll(this.$refs.picList, {
    //       click: true,
    //       scrollX: true,
    //       eventPassthrough: 'vertical'

    //     });
    //   });
    // }

    // console.log(this.seller);
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.seller, {
    //     click: true
    //   });
    // });
  },
  methods: {

    _initScorll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        console.log(this.$refs.picList);
        this.$nextTick(() => {
          if (!this.picScorll) {
            this.picScorll = new BScroll(this.$refs.picWarpper, {
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'

            });
          } else {
            this.picScorll.refresh();
          }
        });
      }
    },
    toggleFavorite (event) {
      if (!event._constructed) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      this.favorite = !this.favorite;
      // localStorage.favorite = this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }

  },
  components: {
    Star,
    Split
  }
};
</script>

<style lang="stylus">
@import './seller.styl'
</style>
