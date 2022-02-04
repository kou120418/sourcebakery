<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px;"
  >
    <div class="position-absolute front-cover">
      <img class="bg-picture" src="https://images.unsplash.com/photo-1532635224-cf024e66d122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="">
    </div>
    <h2 class="fw-bold cover-category" v-if="nowCategory">{{ nowCategory }}</h2>
    <h2 class="fw-bold cover-category" v-else>所有品項</h2>
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
    <div class="row">
      <!-- <div class="col-md-4">
        <div
          class="accordion border border-bottom-0 border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <a
            href="#"
            class="border-0 bgc-change"
            aria-current="true"
            @click.prevent="chooseCategory()"
            :class="{ active: nowCategory === '' }"
          >
            <div
              class="px-0 py-4
                     border border-bottom border-top border-start-0 border-end-0
                     rounded-0"
            >
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="title-center mb-0">
                  所有品項
                </h4>
              </div>
            </div>
          </a>
          <a
            href="#"
            aria-current="true"
            class="border-0 bgc-change"
            v-for="category in categories" :key="category.index"
            @click.prevent="chooseCategory(category)"
            :class="{ active: category === nowCategory }"
          >
            <div
              class="px-0 py-4
                     border border-bottom border-top-0 border-start-0 border-end-0
                     rounded-0"
            >
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="title-center mb-0">
                  {{ category }}
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
          </a>
        </div>
      </div> -->
      <div class="col-12 col-sm-12 col-lg-12 col-xl-12">
        <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 list-unstyled g-3">
          <li class="col" v-for="item in filterProducts" :key="item.id">
            <div class="card position-relative">
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
                  <span class="card-title fs-5">
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
                  class="btn btn-sm w-50 py-2"
                >
                  <span class="mb-2 mt-2 fs-6">
                    了解更多
                  </span>
                </button>
                <button
                  type="button"
                  @click.prevent="addToCart(item)"
                  :disabled="loadingStatus.loadingItem === 2"
                  class="btn btn-sm w-50 py-2"
                >
                  <span class="mb-2 mt-2 fs-6">
                    <i class="bi bi-cart-plus-fill me-1"></i
                    >加入購物車
                  </span>
                </button>
              </div>
              <!-- <button
                @click="addCart(item.id)"
                type="button"
                :disabled="loadingStatus.loadingItem === item.id + 1"
                class="btn btn-nobeta btn-sm card-lick__button"
              >
                <span
                  v-if="loadingStatus.loadingItem === item.id + 1"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                加到購物車
              </button>

              <button
                type="submit"
                class="btn btn-danger"
                :disabled="carts.carts <= 1"
              >
                <span
                  v-if="loadingStatus.loadingItem === 2"
                  class="setDisplay"
                ><i class="bi bi-arrow-repeat rotating"></i>確認中</span>
                <span
                  v-else
                  class="setDisplay"
                ><i class="bi bi-check-lg"></i>送出訂單</span>
              </button> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="bg-light py-4">
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
  </div>
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
      this.$router.push({ path: `/product:${id}` });
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
