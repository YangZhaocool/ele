<template>
  <div id="app">
    <!-- <router-view /> -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item border-1px">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header';
import { urlParse } from './common/js/url';
const ERR_OK = 0;

export default {
  name: 'App',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          // console.log('queryParam: ', queryParam);
          return queryParam.id;
        })()
      }
    };
  },
  created () {
    this.axios.get('/api/seller?id=' + this.seller.id)
      .then(res => {
        var data = res.data;
        if (data.errno === ERR_OK) {
          // this.seller = data.data;
          this.seller = Object.assign({}, this.seller, data.data);
          console.log(this.seller.id);
        }
      })
      .catch(() => { });
  },
  components: {
    'v-header': header
  }
};
</script>
<style lang="stylus">
@import './common/stylus/mixin.styl'
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    background: #fff
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: #778593
      .router-link-active
        color: rgb(240, 20, 20)
</style>
