<template>
  <div class="detail-swiper">   
    <swiper class="swiper-height">
      <swiper-item v-for="(item,index) in topImages" :key="index">  
          <img :src="item" >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name:"DetailSwiper",
  props:{
    topImages:{
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
  mounted() {
    this.click()
  },
  methods: {
    click(){
      //  console.log(this.topImages)
    }
  },
  
}
</script>
<style scoped>
.swiper-height{
  height: 300px;
  overflow-y: hidden;
  }

</style>