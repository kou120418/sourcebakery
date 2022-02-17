<template>
  <main id="main" class="container-lg content">
    <template class="text-center pt-4" v-if="!this.$route.params.id">
      <h2>很抱歉，您並未依照正常流程操作</h2>
    </template>
    <router-view />
  </main>
</template>

<script>
export default {
  methods: {
    showAlert() {
      this.$swal({
        title: '很抱歉，請依照正常流程進行操作',
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
    // console.clear();
    this.check();
  },
};
</script>
