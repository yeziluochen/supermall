import { debounce } from './utils'
import BackTop from 'components/common/backTop/BackTop'
//生命周期中一个·方法可以抽取部分方法然后合并，但methods方法中两者方法名重复会导致覆盖
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh,null)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods:{
    listenrShowBackTop(position) {
      this.isShowBackTop = (- position.y) > 1000.000000
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 300)
    },
  }
}