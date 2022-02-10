<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <div class="p-5"></div>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px;"
  >
    <div class="position-absolute front-cover">
      <img class="bg-picture" src="https://images.unsplash.com/photo-1532635224-cf024e66d122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="">
    </div>
    <h2 class="cover-category" v-if="nowCategory">{{ nowCategory }}</h2>
    <h2 class="cover-category" v-else>所有品項</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <nav class="nav-products">
      <ul class="nav-products__lists">
        <li class="nav-products__list">
          <a
            href="#"
            aria-current="true"
            @click.prevent="nowCategory = ''"
            :class="{ active: nowCategory === '' }"
          >
            <span>所有商品</span></a
          >
        </li>
        <li
          class="nav-products__list"
          v-for="category in categories" :key="category.index"
        >
          <a
            href="#"
            aria-current="true"
            @click.prevent="nowCategory = category"
            :class="{ active: category === nowCategory }"
          >
            <span>{{ category }}</span></a
          >
        </li>
      </ul>
    </nav>
    <div class="row justify-content-center my-5">
      <div class="col-11 col-sm-12 col-md-11 col-lg-10 col-xl-11">
        <ul
          class="
            row
            row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3
            list-unstyled gx-3 gy-5"
          >
          <li
            class="col"
            v-for="item in filterProducts"
            :key="item.id"
            data-aos="fade-zoom-in"
            data-aos-delay="200"
            data-aos-duration="600"
          >
            <div class="card p-2 position-relative">
              <router-link
                class="text-decoration-none card-link"
                :to="`/product/${item.id}`"
              >
                <div class="overflow-hidden">
                  <img
                    :src="`${item.imageUrl}`"
                    class="card-img-top rounded-0 w-100"
                    alt="..."
                  />
                </div>
                <div class="card-body">
                  <span class="card-title">
                    {{ item.title }}
                  </span>
                  <p class="card-text text-inner">
                    NT${{ $toCurrency(item.price) }}
                    <span class="text-muted">
                      <del>NT${{ $toCurrency(item.origin_price) }}</del>
                    </span>
                  </p>
                </div>
              </router-link>
              <a
                href="#"
                class="text-dark text-decoration-none h-100 card-icon-link"
                @click.prevent="addMyFavorite(item.id)"
              >
                <!-- eslint-disable-next-line max-len -->
                <i v-if="this.myFavorite.includes(item.id)" class="bi bi-heart-fill position-absolute"></i>
                <i v-else class="bi bi-heart position-absolute"></i>
              </a>
              <div class="card-lick d-flex justify-content-center">
                <button
                  type="button"
                  @click.prevent="checkProductDetail(item.id)"
                  class="btn btn-sm w-50 py-2 mx-1"
                >
                  <span class="mb-2 mt-2 fs-6">
                    查看產品
                  </span>
                </button>
                <button
                  type="button"
                  @click.prevent="addToCart(item)"
                  :disabled="loadingStatus.loadingItem === 2"
                  class="btn btn-sm w-50 py-2 mx-1"
                >
                  <span class="mb-2 mt-2 fs-6">
                    加入<i class="bi bi-cart-plus-fill ms-1"></i>
                  </span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div class="bg-light py-4">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row justify-content-between
               align-items-md-center
               align-items-start"
      >
        <p class="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
        <div class="input-group w-md-50 mt-md-0 mt-3">
          <input type="text" class="form-control rounded-0" placeholder="" />
          <div class="input-group-append">
            <button class="btn btn-dark rounded-0" type="button" id="search">
              Lorem ipsum
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import emitter from '@/assets/javascript/emitter';
import localStorage from '@/assets/javascript/myFavorite';

export default {
  data() {
    return {
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      pagination: {},
      products: [],
      categories: '',
      showProducts: [],
      nowCategory: '',
      myFavorite: this.getMyFavorite() || [],
    };
  },
  mixins: [localStorage],
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    getProducts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            this.showProducts = [];
            this.products = res.data.products;
            this.getCategories();
            this.showProducts = this.products;
            this.isLoading = false;
            window.scrollTo({
              top: 0,
              behavior: 'instant',
            });
          }, 700);
        }
      })
        .catch((error) => error);
    },
    getCategories() {
      const categories = new Set([]);
      this.products.forEach((product) => {
        categories.add(product.category);
      });
      this.categories = [...categories];
    },
    addToCart(item, qty = 1) {
      this.loadingStatus.loadingItem = 2;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      const data = {
        data: {
          product_id: item.id,
          qty,
        },
      };
      this.$http.post(url, data).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          emitter.emit('update-cart');
          this.showAlert(res);
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    checkProductDetail(id) {
      this.$router.push({ path: `/product/${id}` });
    },
  },
  computed: {
    filterProducts() {
      return this.products.filter((item) => item.category.match(this.nowCategory));
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
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
.title-center {
  margin: auto;
}
.border-top, .border-bottom {
  border-color: antiquewhite !important;
}
.bgc-change {
  cursor: pointer;
  transition: .3s;
}
.bgc-change:hover {
  transition: .3s;
  background-color: rgb(255, 239, 232);
}
.bi-heart, .bi-heart-fill {
  font-size: 32px;
  transition: .3s;
}
.check-product {
  border: 2px solid #000000;
  width: 50%;
  text-align: center;
  background-color: #ffffff;
  transition: .3s;
}
.check-product a, .product-title {
  text-decoration: none;
}
.check-product:hover {
  background-color: #000000;
  transition: .2s;
}
.check-product span {
  color: #000000;
  transition: .3s;
}
.check-product:hover span {
  color: #ffffff;
  transition: .2s;
}
</style>
