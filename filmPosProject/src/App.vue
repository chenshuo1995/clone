<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    $('#app').css({'height':$(window).height()+'px'});
  }
}
</script>

<style lang="less" scoped>
</style>
