<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name:"Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  components: {
  },
  mounted() {
    // 根据document.querySelector查找类名易混乱，若ref在组件中绑定那么其this.$refs.refName获取到的是一个组件对象
    //  this.scroll = new BScroll(document.querySelector('.wrapper'), {
    this.scroll = new BetterScroll(this.$refs.wrapper, {
          observeDOM: true,
          scrollX: false,
          scrollY: true,
          click: true,
          probeType: this.probeType,
          pullUpLoad: true,
          observeImage: true,
    })
    // 2. 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)

    })
    //3. 监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多...')
      this.$emit('pullingUp')
    })
    // this.init()
  },
  methods: {
    init() {
      //  console.log('......调用次数init.......')
    },
    //回到x,y的坐标 时间为time
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      //refresh()重新计算此时最新的可下拉的真实高度
      // 防止Home当发送网络请求后并且渲染完成后此组件尚未完成初始化导致事件总线传递的值为无意义值
       this.scroll && this.scroll.refresh() && this.scroll.refresh
      //  console.log('......调用次数.......')

    },
    // 获取到scroll.y的坐标
    getScrollY() {
      return this.scroll ? this.scroll.y : 0

    }
  } 
}
</script>
<style scoped>
</style>