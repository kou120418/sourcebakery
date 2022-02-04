<template>
  <div class="bg-dark py-5">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between footer-text-color mb-md-7 mb-4">
        <ul class="list-unstyled">
          <!-- <li class="footer-text-color">
            <router-link to="/about">關於我們</router-link>
          </li> -->
          <li class="footer-text-color">
            <router-link to="/products">產品一覽</router-link>
          </li>
          <!-- <li class="footer-text-color">
            <router-link to="/contact">聯繫我們</router-link>
          </li> -->
          <li class="footer-text-color">
            <a href="https://github.com/kou120418" target="_blank">Github</a>
          </li>
        </ul>
        <ul class="d-flex list-unstyled mb-0 h4">
          <li class="footer-text-color">
            <a href="https://www.facebook.com/" class="mx-3">
              <i class="bi bi-facebook"></i>
            </a>
          </li>
          <li class="footer-text-color">
            <a href="https://www.instagram.com/" class="mx-3">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li class="footer-text-color">
            <a href="https://www.youtube.com/" class="mx-3">
              <i class="bi bi-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="d-flex
              flex-column
              flex-md-row
              justify-content-between
              align-items-md-end
              align-items-start
              unchange-text-color"
      >
        <div class="mb-md-0 mb-1">
          <p class="mb-0">02-3456-7890</p>
          <p class="mb-0">service@mail.com</p>
        </div>
        <p class="mb-0">© 2022 Kouyu All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-text-color a, .unchange-text-color {
  text-decoration: none;
  color: #adb5bd;
  transition: .2s;
}
.footer-text-color a:hover {
  color: #f8f9fa;
  transition: .2s;
}
</style>
