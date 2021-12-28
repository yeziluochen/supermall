<template>
  <div>   
    <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image">
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
     
    }
  },
  
}
</script>
<style scoped>

</style>