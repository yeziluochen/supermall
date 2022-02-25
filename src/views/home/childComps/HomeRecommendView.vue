<template>
  <div class="recommend">   
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
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
   mounted() {
     
  },
  methods: {
    imageLoad() {
      this.$emit('recImageLoad')
      // console.log('HomeRecommendView加载完毕....')

    }
  },
}
</script>
<style scoped>
  .recommend{ display: flex; width: 100%;padding: 5px;}
  .recommend-item{ flex: 25%;text-align: center;font-size: 12px;}
  .recommend-item img{max-width: 100%;padding:5px;}
</style>