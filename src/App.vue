<template>
  <div id="app">
    <router-view></router-view>
    <!-- <router-link></router-link> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// import MainTabBar from './components/content/MainTabBar.vue'

import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
