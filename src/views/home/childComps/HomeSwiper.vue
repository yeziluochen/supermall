<template>
  <div>   
    <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 如果没有swiper文件夹下的index.js中export的统一导出就需要挨个引入
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem  from "components/common/swiper/SwiperItem";

import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper, 
    SwiperItem,
  },
  data(){
    return{
     isLoad:false
    }
  },
  methods: {
    imageLoad() {
      console.log('banner加载完成...')
      // !this.isLoad取反即false的false为true验证通过
      if (!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  
}
</script>
<style scoped>

</style>