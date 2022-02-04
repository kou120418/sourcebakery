<template>
  <router-view/>
</template>

<style lang='scss'>
@import './assets/css/common.scss';
</style>

<script>
export default {
  methods: {
    createTitle(routeInstance) {
      // title設定
      if (routeInstance.meta.title) {
        const setTitle = `${routeInstance.meta.title} | 索思烘焙`;
        document.title = setTitle;
      } else {
        document.title = '索思烘焙';
      }
    },
  },
  mounted() {
    const routeInstance = this.$route;
    this.createTitle(routeInstance);
  },
  watch: {
    $route(routeInstance) {
      this.createTitle(routeInstance);
    },
  },
};
</script>
