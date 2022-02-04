<template>
  <footer
    class="
      bg-dark
      fs-7
      py-5
      text-center
      position-relative
      d-flex d-sm-block
      flex-column
    "
  >
    <div class="order-2 mt-2 mt-sm-0 position-sm-absolute copyRight">
      <nav class="mb-md-7 mb-4">
        <ul
          class="
            d-flex
            justify-content-sm-center justify-content-center
            py-3
            px-1
            mb-1
            list-unstyled
          "
        >
          <li class="px-2 px-sm-1">
            <a class="footer-text-color" href="https://www.facebook.com/" target="_blank"
              ><i class="bi bi-facebook fs-6"></i
            ></a>
          </li>
          <li class="px-2 px-sm-1">
            <a class="footer-text-color" href="https://www.instagram.com/" target="_blank"
              ><i class="bi bi-instagram fs-6"></i
            ></a>
          </li>
          <li class="px-2 px-sm-1">
            <a
              class="footer-text-color"
              href="https://www.youtube.com/"
              target="_blank"
              ><i class="bi bi-youtube fs-6"></i
            ></a>
          </li>
        </ul>
      </nav>
      <small class="unchange-text-color"
        >Made by
        <a
          class="footer-text-color text-decoration-none"
          href="https://github.com/kou120418"
          target="_blank"
          >Kouyu</a
        >
        <a
          class="ms-1 footer-text-color text-decoration-none"
          href="#" @click.prevent="logout()"
        >登出
        </a>
      </small>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = 'hexToken=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.footer-text-color, .unchange-text-color {
  color: #adb5bd;
  transition: .2s;
}
.footer-text-color:hover {
  color: #f8f9fa;
  transition: .2s;
}
</style>
