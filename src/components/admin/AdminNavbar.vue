<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark header-nav">
    <div class="container-fluid">
      <h1 class="mb-0">
        <router-link to="/admin"
          class="nav-link fs-4"
          >後台管理系統</router-link
        >
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav px-3">
          <li class="nav-item">
            <router-link to="/admin"
              class="nav-link fs-5"
              >首頁<span class="text-uppercase">admin</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/products"
              class="nav-link fs-5"
              >商品列表<span class="text-uppercase">products</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon"
              class="nav-link fs-5"
              >優惠券設定<span class="text-uppercase">coupon</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders"
              class="nav-link fs-5"
              >訂單列表<span class="text-uppercase">orders</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles"
              class="nav-link fs-5"
              >文章列表<span class="text-uppercase">articles</span></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-text-color {
  color: #adb5bd;
  transition: .2s;
}
.nav-text-color:hover {
  color: #f8f9fa;
  transition: .2s;
}
</style>
