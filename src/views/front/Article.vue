<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <section class="py-5">
  <div class="p-5"></div>
  <div class="container-m"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
