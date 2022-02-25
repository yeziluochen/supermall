<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'Tabbar',
}
</script>
<style scoped>
  #tab-bar{
    display: flex;
    /* background-color: #999; */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>