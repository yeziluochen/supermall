<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
	name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  created() {
    console.log(this.message)

  },
  

  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = " ";
      },duration)
    }
  },
  watch: {
    
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  padding: 8px 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, .8);
  color: aliceblue;
  z-index: 9;
}
</style>
