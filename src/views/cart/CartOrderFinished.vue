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
        <div class="row justify-content-center mt-3 mt-md-5">
          <div class="col-12">
            <div class="bg-opacity p-3">
              <h3 class="text-center mb-3">購買品項</h3>
              <table class="p-table table align-middle mx-auto">
                <thead class="p-table__head">
                  <tr class="text-light">
                    <th width="40%" class="text-center fs-7 fs-sm-6">商品</th>
                    <th class="p-table__th--num text-center fs-7 fs-sm-6">數量</th>
                  </tr>
                </thead>
                <tbody class="p-table__body">
                  <tr v-for="item in order.products" :key="item">
                    <td>
                      <figure class="d-sm-flex align-items-center">
                        <img
                          class="product-img"
                          :src="item.product.imageUrl"
                          :alt="item.product.title"
                        />
                        <figcaption class="ps-2">
                          <span class="badge bg-nobeta">{{ item.product.category }}</span>
                          <p class="fs-7 fs-sm-6">{{ item.product.title }}</p>
                        </figcaption>
                      </figure>
                    </td>
                    <td class="text-center">
                      {{ item.qty }}
                    </td>
                  </tr>
                </tbody>
                <tfoot class="p-table__foot">
                  <tr class="text-light">
                    <td class="text-end">總計</td>
                    <td class="text-center">{{ $filters.currency(order.total) }} NTD</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div class="row justify-content-center mt-3 mt-md-5 g-0">
          <div class="bg-opacity p-3">
            <div class="col-12 col-md-6 mx-auto">
              <h3 class="text-center mb-3">顧客資訊</h3>
              <div v-if="order.user">
                <dl class="goods-detail-description">
                  <dt>姓名</dt>
                  <dd>{{ order.user.name }}</dd>
                </dl>
                <dl class="goods-detail-description">
                  <dt>寄送地址</dt>
                  <dd>{{ order.user.address }}</dd>
                </dl>
                <dl class="goods-detail-description">
                  <dt>E-mail信箱</dt>
                  <dd class="text-break">{{ order.user.email }}</dd>
                </dl>
                <dl class="goods-detail-description">
                  <dt>付款方式</dt>
                  <dd>{{ order.user.payment_method }}</dd>
                </dl>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button type="button" class="btn btn-danger" @click="goPayment()">
                <span
                  class="setDisplay"
                >
                  <i
                    v-if="loadingStatus.loadingItem === 2"
                    class="bi bi-arrow-repeat rotating me-1">
                  </i><i
                    v-else
                    class="bi bi-check-lg me-1">
                  </i>完成付款
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      order: {},
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
    getOrder() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http.get(url).then((res) => {
        this.order = res.data.order;
        this.isLoading = false;
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    goPayment() {
      this.loadingStatus.loadingItem = 2;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          this.showAlert(res);
          this.$router.push(`/cartpayment/${id}`);
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    // console.clear();
    this.getOrder();
  },
};
</script>
