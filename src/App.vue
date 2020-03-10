<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>  
  </div>
  
</template>

<script lang="js">
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss">
  body{
  margin: 0;
  padding: 0;
}
*{
  box-sizing: border-box;
}
</style>
