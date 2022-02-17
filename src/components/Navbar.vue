<template>
  <header>
    <nav
      class="
        bg-dark
        navbar
        navbar-expand-lg
        position-fixed
        header-nav
        nav-bar
        w-100
        pt-4
        pb-4
      "
      style="z-index: 20; background-color: #ffffff;"
    >
      <div class="container-fluid px-4">
        <p class="w-auto mb-0">
          <router-link class="navbar-brand nav-text-color"
          style="w-auto" to="/">Source Bakery</router-link>
        </p>
        <button
          class="navbar-toggler navbar-toggler-right"
          style="color: #adb5bd;"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-link me-4 nav-text-color header-nav-link fs-5"
                to="/">首頁
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link
                class="nav-link me-4 nav-text-color header-nav-link fs-5"
                to="/about">關於我們
              </router-link>
            </li> -->
            <li class="nav-item">
              <router-link
                class="nav-link me-4 nav-text-color header-nav-link fs-5"
                to="/articles">最新消息
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link me-4 nav-text-color header-nav-link fs-5"
                to="/products">產品一覽
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link
                class="nav-link me-4 nav-text-color header-nav-link fs-5"
                to="/contact">聯繫我們
              </router-link>
            </li> -->
            <li class="nav-item" style="display: flex; align-items: center;">
              <router-link
                class="nav-link position-relative nav-text-color p-0 me-5"
                to="/cart"><i class="bi bi-cart2" style="font-size: 1.8rem;" />
                <div v-if="nowCart"
                class="cart-num rounded-pill bg-danger text-white position-absolute px-2"
                style="left: 1.2rem; top: 0;">{{ nowCart.carts.length }}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

</template>

<script>
import emitter from '@/assets/javascript/emitter';

export default {
  data() {
    return {
      nowCart: {
        carts: {
          length: '',
        },
      },
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.nowCart = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.getCart();
    emitter.on('update-cart', () => {
      this.getCart();
    });
  },
  unmounted() {
    emitter.off('update-cart', () => {
      this.getCart();
    });
  },
};
</script>

<style scoped>
.nav-text-color {
  color: #adb5bd;
  transition: .2s;
}
.nav-text-color:hover {
  color: #f8f9fa;
  transition: .2s;
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(173,181,189,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
</style>
