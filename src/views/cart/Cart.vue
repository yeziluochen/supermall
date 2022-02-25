<template>
  <div class="cart">   
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name:"Cart",
  components:{  
    NavBar,
    CartList,
    CartBottomBar,
  },
  data(){
    return{
    //  currentIndex:0,
    //  titles:['流行','新款','精选'],
    }
  },
  methods:{

  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
  
}
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 700;
}
</style>