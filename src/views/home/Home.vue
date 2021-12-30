<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页购物</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends" @recImageLoad="recImageLoad"/>
      <feature-view :recommends="recommends" @featureImageLoad="featureImageLoad"/>
      <tab-control  class="tab-control" 
                    :titles="titles"
                    @tabClick="tabClick"
                    ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"/>
      <!-- <goods-list :goods="['aaa']"/>
      <goods-list :goods="[currentType]"/> -->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>

</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from './childComps/HomeRecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'

import { getHomeMultidata, getHomeGoods} from 'network/home';
import { debounce } from 'common/utils'



export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // aaa:"price:000","cfav:'123",
      //     "price:'000'";"cfav:'123",
      //     "price:'000'","cfav:'123",
      banners: [],
      recommends: [],
      titles: ['流行','新款','精选'],
      // 首页产品分类存储模型
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType:'pop',//默认类型
      isShowBackTop: false,
      tabOffsetTop: 0,
      ddd: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 1. 图片加载完成的时间监听
    const refresh = debounce(this.$refs.scroll.refresh,null)
    // 封装引用后不需要再this进行指向
    // const refresh3 = this.debounce(this.$refs.scroll.refresh,2000)
    
    // 在min.js中赋予了$bus一个·vue实例
    this.$bus.$on('itemImageLoad', () => {
      // console.log('.............')
      // this.$refs.scroll.refresh()//未用定时器直接调用
      refresh()//const refresh局部变量未被注销因在此处有调用
      //refresh3() 
    })
    this.aaa()
  },
  methods:{
    /*
    **事件监听*******
    */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(index);
    },
    // 回到顶部
    backClick() {
      console.log('123');
      // this.$emit('backClick')
      //通过事件.native获取到ref：scroll组件内的scrollTo(0, 0)方法
      this.$refs.scroll.scroll.scrollTo(0, 0, 0)
    },
    //监听组件的显示隐藏
    contentScroll(position) {
      // console.log(position)
      // ！=0 即为true
      this.isShowBackTop = (- position.y) > 1000.000000
    },
    loadMore() {
      console.log('上拉加载更多...')
      this.getHomeGoods(this.currentType)
    },
     swiperImageLoad(){this.ddd= this.ddd + 1;console.log(this.ddd)},
     featureImageLoad(){this.ddd= this.ddd + 1;console.log(this.ddd)},
     recImageLoad(){this.ddd= this.ddd + 1;console.log(this.ddd)},
     aaa(){
       if(this.ddd === 3){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        console.log(this.tabOffsetTop,this.ddd,123)
      }
    },
    // swiperImageLoad() {
    //   // 2. 获取tabControl的offsetTop
    //   //所有组件都有一个属性$el：用于获取组件中的元素
    //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    //   console.log(this.tabOffsetTop)
    // },
    /*
    **网络请求*******
    */
    getHomeMultidata() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(this.banner)
      })
    },
    // type：['pop','new','sell']
     getHomeGoods(type) {
       const page = this.goods[type].page + 1//请求第下页
       getHomeGoods(type, page).then(res => {
        // console.log(res)
        // 将请求到的list数组通过解构push到goods.list中
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1

        this.$refs.scroll.scroll.finishPullUp()
      })
     }
  }
}
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    /* position: relative; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
  
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
    margin-top: 20px;
    width: 5;
  }

  .content {
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>