<template>
  <div class="recommend">   
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
// 如果没有swiper文件夹下的index.js中export的统一导出就需要挨个引入
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem  from "components/common/swiper/SwiperItem";

export default {
  name:"HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    
  },
  data(){
    return{
     
    }
  },
  
}
</script>
<style scoped>
  .recommend{ display: flex; width: 100%;padding: 5px;}
  .recommend-item{ flex: 25%;text-align: center;font-size: 12px;}
  .recommend-item img{max-width: 100%;padding:5px;}
</style>