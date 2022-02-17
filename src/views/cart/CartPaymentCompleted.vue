<template>
  <main id="main" class="container-lg content">
    <h2 class="p-5"></h2>
    <div class="container">
      <div class="bg-light p-3 pb-1 my-3">
        <figure class="text-center mx-auto">
          <h2>已完成付款</h2>
        </figure>
      </div>
      <div class="w-100 w-lg-75 mx-auto">
        <div class="row justify-content-center mt-3 mt-md-5">
          <div class="col-12">
            <span>謝謝您的購買</span>
          </div>
        </div>
        <div class="row justify-content-center mt-3 mt-md-5">
          <div class="col-12">
            <div class="bg-opacity p-3">
              <div class="w-100">
                <h3 class="mb-4 text-center">
                  您的訂單編號為：<br /><span
                    class="fs-6 fs-sm-4 text-danger fw-bold"
                    >{{ this.order.id }}</span
                  >
                </h3>
                <hr />
                <h3 class="text-center mb-4">購買品項</h3>
                <table class="p-table table align-middle mx-auto mb-5">
                  <thead class="p-table__foot">
                    <tr class="text-light">
                      <th width="40%" class="text-center fs-7 fs-sm-6">商品</th>
                      <th class="p-table__th--num text-center fs-7 fs-sm-6">
                        數量
                      </th>
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
                            <span class="badge bg-nobeta">{{
                              item.product.category
                            }}</span>
                            <p class="fs-7 fs-sm-6">{{ item.product.title }}</p>
                          </figcaption>
                        </figure>
                      </td>
                      <td class="text-center">
                        {{ item.qty }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="p-table__head">
                    <tr class="text-dark">
                      <td class="text-end">總計</td>
                      <td class="text-center">
                        {{ $filters.currency(order.total) }} NTD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div class="mt-auto d-flex justify-content-between w-100">
                <router-link class="btn btn-warning" to="/products"
                  >繼續購物</router-link
                >
                <router-link class="btn btn-danger" to="/">回首頁</router-link>
              </div>
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
      order: {},
    };
  },
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    getOrder() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http.get(url).then((res) => {
        this.order = res.data.order;
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
