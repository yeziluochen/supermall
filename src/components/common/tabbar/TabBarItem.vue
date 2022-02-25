<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div> -->
      <div v-if="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#ff5777'
    }
  },
  data(){
    return{
      // isActive:true,
    }
  },
  computed:{
    isActive(){
      // this.$route指的活跃的（点击）的那个路由得那个path，
      // indexOf(this.path)指的App中传过来的path值在this.$route中查找如果确定包含有这个值，即为0（true）
      return this.$route.path.indexOf(this.path) !==-1
    },
    activeStyle(){
      // 三目运算
      return this.isActive ? {color : this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path).catch((err) =>{err})
      // console.log('itemClick')
    }
  }
}
</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
    /* text-align: center; */
    box-shadow: 0px -3px 5px rgba(100, 100, 100, 0.5);
    /* justify-content: center; */
    /* align-content: center; */
  }
  .tab-bar-item img{
    /* display: block; */
    height: 21px;
    margin-top: 6px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .tab-bar-item div{font-size: 14px;}
  /* .active{color: red;} */
</style>