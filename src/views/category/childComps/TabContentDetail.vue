<template>
  <div>
    <grid-view>
      <goods-list v-for="(item, index) in CategoryDetail" :key="index" ></goods-list>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsList
    },
    props: {
      CategoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      console.log(this.CategoryDetail)
    }
  }
</script>

<style scoped>

</style>
