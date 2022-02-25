<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">首页购物</div></nav-bar>
    <tab-control  class="tab-control" 
                    :titles="titles"
                    @tabClick="tabClick"
                    ref="tabControl_1"
                    v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" @recImageLoad="recImageLoad"/>
      <feature-view :recommends="recommends" @featureImageLoad="featureImageLoad"/>
      <tab-control  class="tab-control" 
                    :titles="titles"
                    @tabClick="tabClick"
                    ref="tabControl_2"></tab-control>
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
// import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'




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
  mixins: [itemListenerMixin],
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
      isTabFixed:false ,
      saveY: 0,
      itemImgListener: null,

      ddd: {
        swiperImageLoad: false,
        featureImageLoad: false,
        recImageLoad: false
      },
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('Home已销毁')
  },
  activated() {
    // 再次回到home回到此前保存的this.saveY位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 并刷新一次以防问题
    this.$refs.scroll.refresh()
    // console.log(this.saveY)
  },
  deactivated() {
    //1. 保存当离开此页面时的Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
    //2. 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener )
  },
  created() {
    // 1. 获取顶部多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 3. 手动代码点击一次
    // this.tabClick(0)
  },
  mounted() {
    // 1. 图片加载完成的时间监听(混路后此监听存放在mixin.js)
    // const refresh = debounce(this.$refs.scroll.refresh,null)
    // 封装引用后不需要再this进行指向
    // const refresh3 = this.debounce(this.$refs.scroll.refresh,2000)
    
    //对监听事件进行保存
    // this.itemImgListener = () => {
      // console.log('.............')
      // this.$refs.scroll.refresh()//未用定时器直接调用
      // refresh()//const refresh局部变量未被注销因在此处有调用
      //refresh3() 
    // }

    // 在min.js中赋予了$bus一个·vue实例
    // this.$bus.$on('itemImgLoad',this.itemImgListener )
    // this.imageLoad_()
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
      //使用两次abControl组件使tabControl_1组件的index和tabControl_2保持一致
      this.$refs.tabControl_2.currentIndex = index
      this.$refs.tabControl_1.currentIndex = index
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
      // 1. 判断BackTop是否显示   !0 即为true
      this.isShowBackTop = (- position.y) > 1000.000000
      // 2. 决定tabControl是否吸顶(position: fixed;)
      this.isTabFixed = (- position.y) > this.tabOffsetTop

    },
    loadMore() {
      console.log('上拉加载更多...')
      this.getHomeGoods(this.currentType)
    },

    // 全部组件内img加载完成

    featureImageLoad(){this.ddd.featureImageLoad=  1;},//无用
    recImageLoad(){this.ddd.recImageLoad=  1;},//无用

    swiperImageLoad(){
      this.ddd.swiperImageLoad=  1;
      // console.log(this.ddd.swiperImageLoad)
        // console.log(this.ddd.swiperImageLoad,'1234')
      // 2. 获取tabControl的offsetTop:  从tabControl向上到swipe(覆盖)的高度
      //    所有组件都有一个属性$el：用于获取组件中的元素
      // if(!this.ddd.recImageLoad && !this.ddd.swiperImageLoad && !this.ddd.featureImageLoad){
        this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop
        // console.log(this.tabOffsetTop)

      // }
    },
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
  }

  .tab-control {
    position: relative;
    z-index: 9;
    /* margin-top: 20px; */
    /* width: 5; */
  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    height: calc(100% - 93px);
    /* margin-top: 44px; */
  }
</style>