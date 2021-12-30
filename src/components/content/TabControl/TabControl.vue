<template>
  <div class="tab-control">   
    <!-- <h2>TabControl</h2> -->
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
</template>

<script>


export default {
  name:"TabControl",
  props:{
    titles:{
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
     currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
      // this.props.$emit('tabClick',index)
       console.log(index);
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