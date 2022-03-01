<template>
  <div>
    <div class="tab-control">   
      <div  v-for="(item,index) in titles" 
            :key="index" 
            class="tab-control-item" 
            :class="{active : index === currentIndex}"
            @click="itemClick(index)"
            >
      <span>{{item}}</span>
      </div>
      <slot></slot>
    </div>
    <div>搜索</div>
  </div>
</template>

<script>
export default {
  name:"User",
  components:{  
  },
  data(){
    return{
     currentIndex:0,
     titles:['流行','新款','精选'],
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
    }
  }
  
}
</script>
<style scoped>
 .tab-control{display: flex;text-align: center;height: 40px;line-height: 40px;background: #fff;}
 .tab-control-item{flex: 1;}
  .tab-control-item span{padding: 5px;}
 .active{color: var(--color-high-text);}
 .active span{border-bottom: 3px solid var(--color-high-text);}
</style>