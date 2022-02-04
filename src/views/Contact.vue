<template>
   <Loading :active="isLoading" :z-index="1500"></Loading>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px;"
  >
    <div class="position-absolute front-cover">
      <img class="bg-picture" src="https://images.unsplash.com/photo-1532635224-cf024e66d122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="">
    </div>
    <h2 class="fw-bold cover-category">聯繫我們</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.front-cover {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.front-cover img {
  opacity: .5;
}
.cover-category {
  z-index: 5;
}
.bg-picture {
  width: 100%;
  min-width: 1200px;
  height: auto;
  transform: translateY(-50%);
}
</style>
