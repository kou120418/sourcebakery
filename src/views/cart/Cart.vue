<template>
  <Navbar></Navbar>
  <div class="container-fluid pb-5 bg-01">
    <router-view :props-form="tempForm" />
  </div>
  <Footer></Footer>
</template>

<style lang="scss">
</style>

<script>
import emitter from '@/assets/javascript/emitter';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Cart',
  data() {
    return {
      tempForm: null,
    };
  },
  components: {
    Navbar,
    Footer,
  },
  created() {
    emitter.on('sendForm', (data) => {
      this.tempForm = data;
    });
  },
  unmounted() {
    emitter.off('sendForm', (data) => {
      this.tempForm = data;
    });
  },
};
</script>
