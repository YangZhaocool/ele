import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// 商品
import goods from '@/components/goods/goods';
// 评论
import ratings from '@/components/ratings/ratings';
// 商家
import seller from '@/components/seller/seller';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    // name: 'HelloWorld',
    // name: goods,
    redirect: goods
  }, {
    path: '/goods',
    name: 'Goods',
    component: goods
  }, {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  }, {
    path: '/seller',
    name: 'seller',
    component: seller
  }]
});
