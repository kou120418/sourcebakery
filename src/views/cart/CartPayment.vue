<template>
  <main id="main" class="container content">
    <template class="text-center pt-4" v-if="!this.$route.params.id">
      <h2>結帳過程中發生了一些錯誤，請稍後重試</h2>
    </template>
    <router-view />
  </main>
</template>

<script>
export default {
  methods: {
    showAlert() {
      this.$swal({
        title: '結帳過程中發生了一些錯誤，請稍後重試',
        icon: 'error',
      });
    },
    check() {
      if (!this.$route.params.id) {
        this.showAlert();
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.check();
  },
};
</script>
