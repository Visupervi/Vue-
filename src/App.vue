<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  html, body {
    /*padding: 10px;*/
    height: 100%;
    background-color: #ECECEC;

    #app {
      height: 100%;
      .mui-toast-container{
        top: 0;
      }
    }
  }

  html {
    padding: 10px;
  }
</style>
