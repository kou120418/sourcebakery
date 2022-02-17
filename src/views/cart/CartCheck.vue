<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <main id="main" class="container-lg content">
    <h2 class="p-5"></h2>
    <div v-if="carts.total > 0">
      <div  class="container my-5">
        <h3 class="mt-4 mb-4">購物車內容</h3>
        <div class="row">
          <div class="col-md-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 ps-0">商品名稱</th>
                  <th scope="col" class="border-0">商品單價</th>
                  <th scope="col" class="border-0">數量</th>
                  <th scope="col" class="border-0">小計</th>
                  <th scope="col" class="border-0">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts.carts" :key="item.id" class="border-bottom border-top">
                  <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                    <img
                      :src="`${item.product.imageUrl}`"
                      :alt="`${item.product.title}`"
                      style="width: 72px; height: 72px; object-fit: cover;"
                    />
                    <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.product.title }}</p>
                  </th>
                  <td
                    class="border-0 align-middle"
                  >
                    <p class="mb-0 ms-auto"
                    >
                      NT${{ $filters.currency(item.product.price) }} / {{ item.product.unit }}
                    </p>
                  </td>
                  <td class="border-0 align-middle" style="max-width: 160px;">
                    <div class="input-group pe-5">
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon1"
                          @click.prevent="reduceQty(item)"
                          :class="{ disabled: item.qty <= 1}"
                        >
                          <i class="bi bi-dash-square"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        class="form-control border-0 text-center my-auto shadow-none"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        v-model.number="item.qty"
                        @focus="focusInput(item)"
                        @blur="updateAmount(item)"
                      >
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon2"
                          @click.prevent="increaseQty(item)"
                          :class="{ disabled: item.qty >= 20}"
                        >
                          <i class="bi bi-plus-square"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td
                    class="border-0 align-middle"
                  >
                    <p class="mb-0 ms-auto">NT${{ $filters.currency(item.total) }}</p>
                  </td>
                  <td class="border-0 align-middle">
                    <button
                      class="btn btn-danger border-0"
                      type="button"
                      id="button-addon3"
                      @click.prevent="delCartItem(item.id)"
                    >
                      <i class="bi bi-x-square"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="input-group w-50 mb-3">
              <input
                type="text"
                class="form-control
                        rounded-0
                        border-bottom border-top-0 border-start-0 border-end-0
                        shadow-none"
                placeholder="Coupon Code"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                >
                  <i class="bi bi-send-fill"></i>
                </button>
              </div>
            </div> -->
          </div>
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="fw-bold mb-4">訂單詳細</h4>
              <table class="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                    <td v-if="carts.total"
                      class="text-end border-0 px-0 pt-4"
                    >
                      NT${{ $filters.currency(carts.total) }}
                    </td>
                    <td v-else
                      class="text-end border-0 px-0 pt-4"
                    >
                      NT${{ carts.total }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠券</th>
                    <td class="text-end border-0 px-0 pt-0 pb-4">未選擇</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 fw-bold">應付金額</p>
                <p v-if="carts.final_total" class="mb-0 h4 fw-bold">
                  NT${{ $filters.currency(carts.final_total) }}
                </p>
                <p v-else class="mb-0 h4 fw-bold">
                  NT${{ carts.final_total }}
                </p>
              </div>
              <div class="card-lick col-12">
                <router-link
                  to="/cart/cartform"
                  class="btn w-100 mt-4 text-nowrap"
                >
                  <span>前往付款</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="my-5">
          <h3 class="fw-bold">Lorem ipsum dolor sit amet</h3>
          <div class="swiper-container mt-4 mb-5">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="card border-0 mb-4 position-relative position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    class="card-img-top rounded-0"
                    alt="..."
                  />
                  <a href="#" class="text-dark"> </a>
                  <div class="card-body p-0">
                    <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                    <p class="card-text mb-0">
                      NT$1,080 <span class="text-muted "><del>NT$1,200</del></span>
                    </p>
                    <p class="text-muted mt-3"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div v-else>
      <div class="container my-5">
        <div
          class="
            nothing-in-cart__bg
            nothing-in-cart__bg-setting
            text-light
            flex-column"
          data-aos="fade-zoom-in"
          data-aos-delay="1000"
          data-aos-duration="600"
        >
          <span
            class="fs-4 ls-2 fw-normal mb-5"
            data-aos="fade-zoom-in"
            data-aos-delay="1500"
            data-aos-duration="600">購物車內沒有任何產品喔！</span>
          <div
            id="nothing-in-cart"
            class="container row g-2 d-flex justify-content-center w-60"
          >
            <router-link
              :to="'/products'"
              class="d-flex justify-content-center text-decoration-none"
            >
              <button
                type="submit"
                class="btn col-6 col-lg-4 scaling py-3"
                @click="onSubmit"
                data-aos="zoom-in"
                data-aos-delay="2000"
                data-aos-duration="600"
              >
                來去逛逛<i class="bi bi-cart2 ms-1"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bg-light py-4">
      <div class="container">
        <div
          class="d-flex flex-column flex-md-row justify-content-between
                align-items-md-center align-items-start"
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
  </main>
</template>

<script>
import emitter from '@/assets/javascript/emitter';

export default {
  name: 'CartCheck',
  props: {
    propsForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isLoading: false,
      carts: {},
      cartsCheck: '',
      cartItemQty: '',
    };
  },
  methods: {
    getCartItems() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
          console.log(this.carts);
          emitter.emit('update-cart');
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
    },
    reduceQty(item) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      const data = {
        data: {
          product_id: item.product_id,
          // eslint-disable-next-line no-param-reassign
          qty: (item.qty -= 1),
        },
      };
      this.$http.put(url, data).then((res) => {
        if (res.data.success) {
          this.getCartItems();
        }
      });
    },
    increaseQty(item) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      const data = {
        data: {
          product_id: item.product_id,
          // eslint-disable-next-line no-param-reassign
          qty: (item.qty += 1),
        },
      };
      this.$http.put(url, data).then((res) => {
        if (res.data.success) {
          this.getCartItems();
        }
      });
    },
    focusInput(item) {
      this.cartItemQty = item;
    },
    updateAmount(item) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      const data = {
        data: {
          product_id: item.product_id,
          // eslint-disable-next-line no-param-reassign
          qty: item.qty,
        },
      };
      this.$http.put(url, data).then((res) => {
        if (res.data.success) {
          this.getCartItems();
        }
      });
    },
    delCartItem(id) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          console.log('刪除成功');
          this.getCartItems();
        }
      });
    },
    delAllCartItems() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          console.log('刪除所有項目成功');
          this.getCartItems();
        }
      });
    },
  },
  watch: {
    cartItemQty: {
      handler(item) {
        const { qty } = item; // const qty = item.qty
        const newItem = item;
        const inputQtyVal = item.qty;
        if (qty <= 20) {
          newItem.qty = inputQtyVal;
        } else if (qty > 20) {
          newItem.qty = 20;
        }
        if (qty < 1) {
          newItem.qty = 1;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getCartItems();
  },
};
</script>

<style scoped>
.bi-dash-square, .bi-plus-square, .bi-x-square, .bi-send {
  font-size: 1.5rem;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
