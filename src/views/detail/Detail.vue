<template>
  <div id="detail"> 
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 属性：topImages 传入值：top-images -->
      <!-- <ul>
        <li v-for="item in $store.state.cartList" :key="item.lid">{{item}}</li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
    <goods-list ref="recommend" :goods="recommends"/>

    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import GoodsList from 'components/content/goods/GoodsList';
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

import Toast from 'components/common/toast/Toast'

export default {
  name:"Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    // debounce,
    Scroll,
    // BackTop
    Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return{
      iid: null,
      topImages: [],
      goods: { },
      shop: { },
      detailInfo: { },
      paramInfo: { },
      commentInfo: { },
      recommends: [],
      refresh: null,
      itemImgListener: null,
      themeTopYs:[],
      getthemeTopYs:null,
      currentIndex: 0,
      // isShowBackTop: false,
      message:'',
      show: false
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.$route.params.iid)
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      // 1. 获取数据
      const data = res.result;

      // 2. 获取顶部图片轮播图数据
      this.topImages = res.result.itemInfo.topImages;

      // 3. 获取商品信息创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods)

      // 4. 取出店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5. 获取商品的详情数据
      this.detailInfo = data.detailInfo

      // 6. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // console.log(this.paramInfo)

      //7. 取出评论信息第[0]条
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
        // console.log(this.commentInfo)
      }
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到的offsetTop是不包含其中图片的）
        // 每次数据变化更新时都会执行，因初次为undefined，当页面收到数据渲染更新DOM时再次执行即push两轮，
        // themeTopYs = [];即重置上轮push的数组数据
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // 因为offsetTop是此组件的子组件(根组件)的y值所以需要$el
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
        // 在created( )中，虽然拿到数据了，但是DOM元素还没有完成挂载，$refs拿不到对应的组件即打印结果undefined
      })
    })
    // 3. 请求推荐数据
    getRecommend().then(res =>{
      // console.log(res)
      this.recommends = res.data.list
      // console.log(res.data.list[0].image)
    })
    // 4. 给getthemeTopYs赋值(对给this.getthemeTopYs进行防抖操作)
    this.getthemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs)
    },1000)
  },
  mounted() {
      // console.log('mounted')

  },
  updated() {
   
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.refresh();

      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // // 因为offsetTop是此组件的子组件(根组件)的y值所以需要$el
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      //   console.log(this.themeTopYs)
      this.getthemeTopYs()
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      // console.log(position)//打印坐标
      // console.log(this.themeTopYs)//0,1,2,3
      // console.log(this.themeTopYs.length);//1,2,3,4
      // 1.h获取y值
      const positionY = -position.y

      //2. positionY和主题中值进行对比
      // [0, 7983, 9120, 9452, Number.MAX_VALUE]
      let length = this.themeTopYs.length

      for(let i = 0; i <length-1; i++){
        // 方法二(通过添加positionY的最大值,但最外层length-1排除最后位因防止末位溢出-1的操作)
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          console.log(this.currentIndex)
          //<detail-nav-bar>组件中用ref="nav"(nav就代指子组件)来获取这个子组件件内的数据currentIndex(nav.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
          //$el是Dom元素，$refs是访问子组件
        }
       
        // console.log( this.currentIndex , i)

        // 方法一
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   console.log(this.currentIndex)
        //   //<detail-nav-bar>组件中用ref="nav"(nav就代指子组件)来获取这个子组件件内的数据currentIndex(nav.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        //   //$el是Dom元素，$refs是访问子组件
        // }
        // console.log(this.themeTopYs[i])
      }
      //是否回到顶部
      this.listenrShowBackTop(position)
    },
    addToCart() {
      // console.log('Detail打印')
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.lid = this.iid;
      // product.count = null
      // console.log(this.topImages[0],this.goods.title,this.goods.desc,this.goods.realPrice,this.iid)
      // 2. 将产品信息添加到购物车中
      //this.$store.commit('addCart',product)//当方法(.commit)写在mutations中时用此方法
      // console.log(product)

      //方法一
      //actions中使用(.dispatch(同时会返回一个Promise))
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      // 方法二 通过map映射mapActions中的addCart方法
      this.addCart(product).then(res => {
        console.log(res);
        
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)//已在Toast中进行封装

        this.$toast.show(res, 2000)
      })
    }
  }
  
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: 100vh;
}
</style>