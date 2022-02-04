<template>
  <Navbar></Navbar>
  <router-view/>
  <Footer></Footer>
</template>

<style lang="scss">
@import "../assets/css/common";
</style>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'HomePage',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
    };
  },
};
</script>
