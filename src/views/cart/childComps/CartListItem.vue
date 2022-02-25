<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :isChecked="itemInfo.checked" @click.native="checkClick" @click="keyClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="图片商品">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right"> × {{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name:"CartListItem",
  components: {
    CheckButton
  },
  props: {
    itemInfo:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  created(){
    this.click()
  },
  computed: {
    
  },
  methods:{
    click(){
      // console.log(this.itemInfo)
    },
    keyClick(){
      // console.log("index")
    },
    checkClick() {
      // const checkeds = { };
      this.itemInfo.checked = !this.itemInfo.checked;
      // checkeds.checked = this.itemInfo.checked
      // console.log(this.itemInfo,checkeds.checked)
      // this.$store.dispatch('checkToClick', checkeds)
    }
  }
  
}
</script>
<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: rgb(107, 105, 105);
}

.item-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 5px;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item.info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
  margin-top: 5px;
}
.left, .right {
  margin-top: 5px;
}
</style>