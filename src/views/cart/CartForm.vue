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
      <div class="w-100 col-md-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="col-lg-6 col-xs-3 border-0 ps-0">商品名稱</th>
              <th scope="col" class="col-lg-2 col-xs-3 border-0">商品單價</th>
              <th scope="col" class="col-lg-2 col-xs-3 border-0">數量</th>
              <th scope="col" class="col-lg-2 col-xs-3 border-0">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts.carts" :key="item.id" class="border-bottom border-top">
              <td scope="row" class="border-0 px-0 font-weight-normal py-4">
                <img
                  :src="`${item.product.imageUrl}`"
                  :alt="`${item.product.title}`"
                  style="width: 72px; height: 72px; object-fit: cover;"
                />
                <p class="mb-0 fw-bold ms-3 d-inline-block">{{ item.product.title }}</p>
              </td>
              <td
                class="border-0 align-middle"
              >
                <p v-if="carts.total" class="mb-0 ms-auto"
                >
                  NT${{ $filters.currency(item.product.price) }} / {{ item.product.unit }}
                </p>
                <p v-else class="mb-0 ms-auto"
                >
                  NT${{ item.product.price }} / {{ item.product.unit }}
                </p>
              </td>
              <td class="border-0 align-middle" style="max-width: 160px;">
                <div class="input-group pe-5">
                  <span>{{ item.qty }}</span>
                </div>
              </td>
              <td
                class="border-0 align-middle"
              >
                <p v-if="carts.total" class="mb-0 ms-auto">
                  NT${{ $filters.currency(item.total) }}
                </p>
                <p v-else class="mb-0 ms-auto">NT${{ item.total }}</p>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="py-3" style="text-align: right;">
                <h4>合計金額：</h4>
              </td>
              <td>
                <h5 v-if="carts.total">NT${{ $filters.currency(carts.total) }}</h5>
                <h5 v-else>NT${{ carts.total }}</h5>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="bg-opacity mt-3 mt-md-5 p-3">
        <div class="my-2 row justify-content-center">
          <template v-if="carts.total > 0">
            <Form
              ref="form"
              v-slot="{ errors }"
              @submit="onSubmit"
              class="col-md-8 order-1 order-lg-0"
            >
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
                <Field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入 姓名"
                  rules="required"
                  v-model="form.user.name"
                ></Field>
                <ErrorMessage
                  name="姓名"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
                <Field
                  id="email"
                  name="信箱"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['信箱'] }"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="form.user.email"
                ></Field>
                <ErrorMessage
                  name="信箱"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
                <Field
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入 電話"
                  :rules="isPhone"
                  v-model="form.user.tel"
                ></Field>
                <ErrorMessage
                  name="電話"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
                <Field
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入 地址"
                  rules="required"
                  v-model="form.user.address"
                ></Field>
                <ErrorMessage
                  name="地址"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="payment" class="form-label">付款方式</label>
                <span class="badge bg-danger p-1 fs-7 ms-1">必要</span>
                <Field
                  id="payment"
                  class="d-block w-50 p-1"
                  name="付款方式"
                  as="select"
                  rules="required"
                  v-model="form.user.payment_method"
                  :class="{ 'is-invalid': errors['付款方式'] }"
                >
                  <option value="">請選擇付款方式</option>
                  <option value="ATM轉帳">ATM轉帳</option>
                  <option value="信用卡">信用卡</option>
                  <option value="面交">面交</option>
                </Field>
                <ErrorMessage
                  name="付款方式"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea
                  name=""
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>

              <div class="d-flex justify-content-between">
                <router-link class="btn btn-secondary" to="/cart"
                  >返回購物車
                </router-link>
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
                    </i>送出表單
                  </span>
                </button>
              </div>
            </Form>
          </template>
          <p v-else class="text-center mb-0">請先將商品加入購物車</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import emitter from '@/assets/javascript/emitter';

export default {
  name: 'CartForm',
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
      carts: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment_methods: '',
        },
        message: '',
      },
    };
  },
  methods: {
    checkCart() {
      if (this.carts.carts.length < 1) {
        console.log('購物車裡什麼都沒有喔！');
      } else {
        console.log(`購物車裡有${this.carts.carts.length}項產品`);
      }
    },
    getCartItems() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
          emitter.emit('update-cart');
          this.checkCart();
          this.isLoading = false;
        }
      });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請填寫正確的手機號碼格式';
    },
    onSubmit() {
      this.loadingStatus.loadingItem = 2;
      emitter.emit('sendForm', this.form);
      setTimeout(() => {
        this.$router.push('/cart/cartconfirm');
      }, 1500);
    },
  },
  mounted() {
    this.getCartItems();
  },
};
</script>

<style scoped>
.bi-check-lg, .bi-arrow-repeat {
  display: inline-block;
}
</style>
