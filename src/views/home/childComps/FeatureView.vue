<template>
  <div>   
    <h2 style="text-align:center;margin-top:20px">今日新款</h2>
    <div class="recommend">
      <div v-for="item in recommends" :key="item.id" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
    <div class="recommend">
      <div v-for="item in recommends" :key="item.id" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"FeatureView",
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
  },
}
</script>
<style scoped>
.recommend{ display: flex; width: 100%;padding: 5px;}
.recommend-item{ flex: 25%;text-align: center;font-size: 12px;}
.recommend-item img{max-width: 100%;padding:5px;}
</style>