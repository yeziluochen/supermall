<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span> 
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去结算：({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

	export default {
  components: { CheckButton },
	name: "CartBottomBar",
  
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return '¥ ' + this.$store.state.cartList.filter(item => {
        return item.checked //filterd方法过滤出当item.checked为true(选中)的所有数据
      }).reduce((preValue, item) => {//preValue前一个值，item此时传入的值
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //取反：存在(有值)与不存在(无值0) =>1(2,3,4)||0
      //!item.checked取反目的是找出是否有!true即false  .length：为false的长度
      //return !() 取反，当内部长度不为0(不为false)即有未选中的产品，return出去的内容为有未选中的产品，取反即全部选中后才会return
      //return !(this.cartList(item => !item.checked).length)//但性能不高要遍历所有数据而非有一个false即为false
      
      if(this.cartList.length ===0) return false//产品为空的时候return
      return !(this.cartList.find(item => !item.checked))

      //非高阶函数用for循环遍历
      // for(let item of this.cartList) {
      //   if(!item.checked) {//遍历到有!false时执行return返回false
      //     return false
      //   }
      // }
    }
  },

    methods: {
      //组件的点击@click.native
      checkClick() {
        console.log('-----')
        if (this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false);//遍历赋值为false未选中
        } else {
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    },
    watch: {
      
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background: #eee;
    position: relative;
    bottom: 89px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .check-content {
    display: flex;
    align-content: center;
    margin-left: 10px;
  }
  .check-content span{
    margin: auto;
    margin-top: 2px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 0 15px;
    color: #eee;
    background-color: orangered;
  }
</style>
