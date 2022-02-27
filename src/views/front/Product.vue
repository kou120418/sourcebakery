<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <section class="py-5">
  <div class="p-5"></div>
  <div class="container-m">
    <div class="row mb-4 mb-md-6" v-if="product">
      <div class="col-md-6 mb-4 mb-md-0">
        <div class="products-bg-box mb-3">
          <img class="products-bg" :src="selectImg" v-if="selectImg">
          <img class="products-bg" :src="product.imageUrl" v-else>
        </div>
        <div class="row thumbnail-box">
          <div class="col-3 mb-2 selectImg-box">
            <img class="min-img img-thumbnail" :src="product.imageUrl"
            @click="selectImg = product.imageUrl">
          </div>
          <div class="col-3 mb-2 selectImg-box" v-for="(img, key) in product.imagesUrl" :key="key">
            <img class="min-img img-thumbnail" :src="img"
            @click="selectImg = img">
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 py-3">
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-muted" to="/products">商品列表</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
        <h2 class="h1 mb-1">{{ product.title }}</h2>
        <div class="mt-2">
          <del>NT${{ $filters.currency(product.origin_price) }}</del>
        </div>
        <div class="col-3">
          <p class="h2">NT${{ $filters.currency(product.price) }}</p>
        </div>
        <p class="mb-0 text-muted text-end"></p>
        <div class="col my-5">
          <div class="row my-4">
            <div class="col-2 bdr">
              <p>商品說明</p>
            </div>
            <div class="col-10">
              <p style="margin: 0;">
                {{ product.description }}
              </p>
            </div>
          </div>
          <div class="row my-4">
            <div class="col-2 bdr">
              <p style="margin: 0;">商品規格</p>
            </div>
            <div class="col-10">
              <p>
                {{ product.content }}
              </p>
            </div>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="qtyBtn btn btn-outline-dark border-0 py-2"
                  type="button" id="button-addon1"
                  @click="reduceQty"
                  :class="{ disabled: qty <= 1}"
                >
                  <i class="bi bi-dash-square"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                :value="qty"
              />
              <div class="input-group-append">
                <button
                  class="qtyBtn btn btn-outline-dark border-0 py-2"
                  type="button" id="button-addon2"
                  @click="increaseQty"
                  :class="{ disabled: qty >= 20}"
                >
                  <i class="bi bi-plus-square"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="card-lick col-6">
            <a href="#"
              class="text-nowrap btn w-100 py-2"
              @click.prevent="addToCart(this.$route.params.id)"
            >
              <span
                v-if="loadingStatus.loadingItem === 2"
                class="setDisplay"
              ><i class="bi bi-arrow-repeat rotating me-1"></i>加入購物車</span>
              <span
                v-else
                class="setDisplay"
              ><i class="bi bi-cart-plus-fill me-1"></i>加入購物車</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <h2 class="text-center font-md-xl pb-4 pt-2">相關產品</h2>
    <ul class="row gy-4">
      <li
        class="col-md-4 col-lg-3"
        v-for="item in randomProducts"
        :key="item.id"
      >
        <div class="card card-product p-1">
          <a
            class="text-dark none-tx-d card-link"
            @click.prevent="goProduct(item.id)"
          >
            <div class="similar-product-img">
              <img
                class="card-img-top rounded-0 w-100"
                :src="item.imageUrl"
                :alt="item.title">
            </div>
            <div class="card-body">
              <span class="card-title fs-5">
                {{ item.title }}
              </span>
              <p class="card-text text-inner">
                NT${{ $filters.currency(item.price) }}
                <span class="text-muted">
                  <del>NT${{ $filters.currency(item.origin_price) }}</del>
                </span>
              </p>
            </div>
            <div class="card-lick">
              <button
                type="button"
                class="btn btn-sm w-100 py-2"
              >
                <span class="mb-2 mt-2 fs-6">
                  查看產品
                </span>
              </button>
            </div>
          </a>
        </div>
      </li>
    </ul>
  </div>
  </section>
</template>

<script>
import emitter from '@/assets/javascript/emitter';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {

  data() {
    return {
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      qty: 1,
      carts: {},
      products: [],
      product: null,
      selectImg: '',
      randomProducts: [],
    };
  },
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
    getCartItem() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
        }
      });
    },
    getProducts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.getRandomProducts();
        }
      }).catch((res) => {
        console.log(res.data.message);
      });
    },
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          this.getProducts();
          this.selectImg = '';
          setTimeout(() => {
            this.isLoading = false;
          }, 700);
        }
      });
    },
    reduceQty() {
      this.qty -= 1;
    },
    increaseQty() {
      this.qty += 1;
    },
    addToCart(id) {
      this.loadingStatus.loadingItem = 2;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      const data = {
        data: {
          product_id: id,
          qty: this.qty,
        },
      };
      this.$http.post(url, data).then((res) => {
        if (res.data.success) {
          console.log(res);
          console.log(`成功加入${this.qty}個進入購物車`);
          this.qty = 1;
          emitter.emit('update-cart');
          this.showAlert(res);
          this.getCartItem();
          this.loadingStatus.loadingItem = '';
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    getRandomProducts() {
      this.randomProducts = [];
      const { category } = this.product;
      const filterProducts = this.products.filter((item) => item.id !== this.product.id
        && item.category === category);
      const maxSize = filterProducts.length < 4 ? filterProducts.length : 4;
      const arraySet = new Set([]);
      getRandomInt();
      for (let index = 0; arraySet.size < maxSize; index + 1) {
        const num = getRandomInt(filterProducts.length);
        arraySet.add(num);
      }
      arraySet.forEach((i) => {
        this.randomProducts.push(filterProducts[i]);
      });
    },
    goProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  watch: {
    $route(to) {
      if (to.params.id) {
        this.getProduct();
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
      }
    },
    qty: {
      handler(newQty) {
        if (newQty > 20) {
          this.qty = 20;
        } else if (newQty < 1) {
          this.qty = 1;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getCartItem();
    this.getProduct();
  },
};

</script>

<style lang="scss" scoped>
ol, ul {
  list-style: none;
  padding: 0px;
}
.container-m {
  padding: 0 15px;
  margin: 0 auto;
  max-width: 1140px;
}
.products-bg-box {
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.products-bg {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.selectImg-box {
  width: 25%;
  height: auto;
  max-height: 100px;
  overflow: hidden;
}
.selectImg-box img {
  object-fit: cover;
}
.bdr {
  border-right: 1px solid #000;
}
.min-img {
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-size: cover;
  cursor: pointer;
}
.min-img:hover {
  border: 1px solid rgb(70, 70, 70);
}
.none-tx-d {
  text-decoration: none;
}
.similar-product-img {
  width: 100%;
  height: 200px;
  max-height: 200px;
  overflow: hidden;
}
.similar-product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.qtyBtn {
  font-size: 1.5rem;
}
</style>
