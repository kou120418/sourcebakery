<template>
  <Navbar></Navbar>
  <router-view/>
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
      tempForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment_method: '',
        },
        message: '',
      },
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
      this.tempform = data;
    });
  },
};
</script>
