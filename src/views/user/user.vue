<template>
  <div class="recommend">   
    <h2>user</h2>
  </div>
</template>

<script>
// 如果没有swiper文件夹下的index.js中export的统一导出就需要挨个引入
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem  from "components/common/swiper/SwiperItem";

export default {
  name:"user",
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
 
</style>