<template>
  <div class="goods">   
    <goods-list-item v-for="(item,index) in goods" 
                    :key="index" 
                    :goods-item="item"/>
    <!-- <goods-list-item v-for="(item,index) in goods" 
                    :key="index" 
                    :goods-item="{goods}"/> -->
    <!-- {{goods}} -->
  </div>
</template>

<script>

import GoodsListItem from 'components/content/goods/GoodsListItem';

export default {
  name:"GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  },
  data(){
    return{
     
    }
  },
  
}
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>