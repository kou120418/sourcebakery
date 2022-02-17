<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <main id="main" class="container-lg content">
    <h2 class="p-5"></h2>
    <div class="container">
      <div class="bg-light p-3 pb-1 my-3">
        <figure class="text-center mx-auto">
          <h2>購物車明細</h2>
        </figure>
      </div>
      <div class="w-100 w-lg-75 mx-auto">
        <template v-if="carts.total > 0">
          <div class="row justify-content-center mt-3 mt-md-5">
            <div class="col-12">
              <div class="bg-opacity p-3">
                <h3 class="mb-3">購買品項</h3>
                <table class="p-table table align-middle">
                  <thead class="p-table__head">
                    <tr class="text-dark">
                      <th class="p-table__th--name text-center fs-7 fs-sm-6">
                        商品
                      </th>
                      <th width="15%" class="text-center fs-7 fs-sm-6">單價</th>
                      <th width="20%" class="text-center fs-7 fs-sm-6">數量</th>
                      <th width="30%" class="text-end fs-7 fs-sm-6">小計</th>
                    </tr>
                  </thead>
                  <tbody class="p-table__body">
                    <ConfirmCart :cart-items="carts" v-if="carts.carts"></ConfirmCart>
                  </tbody>
                  <tfoot class="p-table__foot">
                    <tr class="text-light">
                      <td
                        colspan="4"
                        v-if="carts?.carts?.length >= 1"
                        class="text-end"
                      >
                        <del v-if="carts.final_total !== carts.total">
                          總計： NT${{ $filters.currency(this.carts.total) }} NTD</del
                        >
                        <template v-else
                          >總計：
                          NT${{ $filters.currency(this.carts.total) }} NTD</template
                        >
                      </td>
                      <td v-else class="text-end">尚無商品</td>
                    </tr>
                    <tr v-if="carts.final_total !== carts.total">
                      <td colspan="4" class="text-end text-light">
                        NT${{ $filters.currency(carts.final_total) }} NTD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </template>
        <template v-if="carts.total > 0">
          <div class="row justify-content-center mt-3 mt-md-5">
            <Form ref="form" @submit="onSubmit" class="col-12">
              <div class="bg-opacity p-3">
                <h3 class="mb-3">已填寫的客戶資訊</h3>
                <div class="row">
                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <Field
                      id="name"
                      name="姓名"
                      type="text"
                      class="form-control"
                      placeholder="請輸入 姓名"
                      rules="required"
                      :value="propsForm.user.name"
                      disabled
                    ></Field>
                  </div>
                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <label for="email" class="form-label">Email</label>
                    <Field
                      id="email"
                      name="信箱"
                      type="email"
                      class="form-control"
                      placeholder="請輸入 Email"
                      rules="email|required"
                      :value="propsForm.user.email"
                      disabled
                    ></Field>
                  </div>
                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <Field
                      id="tel"
                      name="電話"
                      type="tel"
                      class="form-control"
                      placeholder="請輸入 電話"
                      :value="propsForm.user.tel"
                      disabled
                    ></Field>
                  </div>
                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <label for="payment" class="form-label">付款方式</label>
                    <Field
                      id="payment"
                      class="form-control"
                      name="付款方式"
                      rules="required"
                      :value="propsForm.user.payment_method"
                      disabled
                    >
                    </Field>
                  </div>
                </div>
                <div class="row g-0">
                  <div class="col-12 col-md-8 mx-auto mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <Field
                      id="address"
                      name="地址"
                      type="text"
                      class="form-control"
                      placeholder="請輸入 地址"
                      rules="required"
                      :value="propsForm.user.address"
                      disabled
                    ></Field>
                  </div>
                  <div class="col-12 col-md-8 mx-auto">
                    <label for="message" class="form-label">留言</label>
                    <textarea
                      name=""
                      id="message"
                      class="form-control"
                      cols="30"
                      rows="10"
                      :value="propsForm.message"
                      disabled
                    ></textarea>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <router-link class="btn btn-secondary" to="/cart/cartform"
                    >返回填寫訂單</router-link
                  >
                  <button
                    type="submit"
                    class="btn btn-danger"
                    :disabled="carts.carts <= 1"
                  >
                    <span
                      class="setDisplay"
                    >
                      <i
                        v-if="loadingStatus.loadingItem === 2"
                        class="bi bi-arrow-repeat rotating me-1">
                      </i><i
                        v-else
                        class="bi bi-check-lg me-1">
                      </i>成立訂單
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </template>
        <div v-else class="bg-opacity mt-3 mt-md-5 p-3">
          <p class="text-center mb-0">請先將商品加入購物車</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import emitter from '@/assets/javascript/emitter';
import ConfirmCart from '@/components/cart/ConfirmCart.vue';

export default {
  name: 'CartConfirm',
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
      loadingStatus: {
        loadingItem: '',
      },
      carts: '',
      form: {},
    };
  },
  components: {
    ConfirmCart,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    showErrorAlert() {
      this.$swal({
        title: '請先加入商品至購物車',
        icon: 'error',
      });
    },
    check() {
      if (this.carts.carts.length < 1) {
        this.showErrorAlert();
        this.$router.push('/products');
      }
    },
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
          emitter.emit('update-cart');
          this.check();
          this.isLoading = false;
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    getCartOnly() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
          emitter.emit('update-cart');
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    onSubmit() {
      this.loadingStatus.loadingItem = 2;
      const orderInfo = {
        data: {
          user: this.propsForm.user,
          message: this.propsForm.message,
        },
      };
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, orderInfo).then((res) => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          this.form.message = '';
          this.showAlert(res);
          this.loadingStatus.loadingItem = '';
          this.getCartOnly();
          this.$router.push(`/cartorder/${res.data.orderId}`);
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    // console.clear();
    this.getCart();
  },
};
</script>
