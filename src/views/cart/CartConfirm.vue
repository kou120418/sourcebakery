<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
