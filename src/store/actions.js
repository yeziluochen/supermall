import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutations-types'
export default {
  //actions属性中的方法第一个参数为context => {state,commit}
  addCart(context, payload) {
    //payload新添加商品
    // let oldProduct = null;
    // 1. 查找oldProduct是否存在
    //方法一
    // for(let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 方法二
    // console.log(payload.lid)

    //如果在vuex中做了某个操作，想让外界知道这个操作是否已完成这个时候就需要用到Promise
    return new Promise ((resolve, reject) => {
      // 1. 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item =>item.lid === payload.lid)//判断传过来的Iid是否存在，返回ture或者false
      
      // 2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        // console.log(oldProduct.count)
        resolve('当前商品数量 + 1')
      } else {
        // payload.count = 1
        // context.state.cartList.push(payload)
        //上次添加的商品为oldProduct=state.cartList(首次添加即oldProduct为空)，本次添加的商品为新传入的payload
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
    
  },
  // checkToClick(context, payload) {
  //   // this.itemInfo.checked = !this.itemInfo.checked;
  //   // state.cartList.push(cartList.checked)
  //   console.log(payload)
  //   context.commit('checkTo',payload)
  // }
}