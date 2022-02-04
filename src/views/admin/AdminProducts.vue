<template>
  <div class="container content position-relative">
    <h2 class="text-center mt-4">商品列表</h2>
    <div class="text-end position-absolute w-100" style="top: 0;">
      <button
        class="btn btn-primary"
        @click="openModal('new')"
      >
        建立新的商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="6%">排序</th>
          <th width="10%">商品縮圖</th>
          <th width="10%">商品名稱</th>
          <th width="20%">商品敘述</th>
          <th width="12%">商品規格</th>
          <th width="10%">原價</th>
          <th width="10%">售價</th>
          <th width="10%">是否啟用</th>
          <th width="12%">編輯／刪除</th>
        </tr>
      </thead>
      <tbody id="AdminProductsList" v-for="item in adminProducts" :key="item">
        <tr class="align-middle">
          <td>{{ item.num }}</td>
          <td>
            <div class="product-img">
              <img :src="item.imageUrl" :alt="item.title" />
            </div>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.content }}</td>
          <td>{{ $toCurrency(item.origin_price) }}</td>
          <td>{{ $toCurrency(item.price) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      本頁總共有 <span id="productCount">{{ adminProducts.length }}</span> 項商品
    </p>
    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-5 mb-4">
      <Pagination :page="pagination" @get-page="getAdminProducts"></Pagination>
    </div>
    <!-- Pagination -->

    <!-- AdminProductModal -->
    <AdminProductModal
      ref="adminModal"
      :props-product="tempProduct"
      @update-product="updateProduct"
    ></AdminProductModal>
    <!-- AdminProductModal -->
    <!-- DeleteProductModal -->
    <DeleteProductModal
      ref="adminDelModal"
      :props-product="tempProduct"
      @delete-product="deleteProduct"
    ></DeleteProductModal>
    <!-- DeleteProductModal -->
  </div>
</template>

<script>
import Pagination from '@/components/admin/AdminPagination.vue';
import AdminProductModal from '@/components/admin/AdminProductModal.vue';
import DeleteProductModal from '@/components/admin/DeleteProductModal.vue';

export default {
  data() {
    return {
      pagination: {},
      adminProducts: [],
      allproductsNum: '',
      tempProduct: {
        imagesUrl: [],
      },
      isNew: true,
    };
  },
  components: {
    Pagination,
    AdminProductModal,
    DeleteProductModal,
  },
  methods: {
    getAdminProducts(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${num}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          const { products } = res.data;
          const { pagination } = res.data;
          console.log(res.data);
          console.log(res.data.pagination);
          this.adminProducts = products;
          this.pagination = pagination;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAllproducts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.allproductsNum = Object.values(res.data.products); // 將回傳的物件轉換為陣列
        })
        .catch((error) => {
          // this.showErrorAlert(error);
          console.log(error);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imagesUrl: [],
          };
          this.isNew = true;
          this.$refs.adminModal.openModal();
          break;
        case 'edit':
          this.getAdminProducts();
          this.tempProduct = { ...item };
          this.isNew = false;
          this.$refs.adminModal.openModal();
          break;
        case 'delete':
          this.tempProduct = { ...item };
          this.$refs.adminDelModal.openModal();
          break;
        default:
          break;
      }
    },
    updateProduct(tempProduct) {
      let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/`;
      let httpMethod = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](url, { data: tempProduct }).then((res) => {
        if (res.data.success) {
          this.$refs.adminModal.hideModal();
          this.getAdminProducts();
        } else {
          console.log(res.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteProduct() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.$refs.adminDelModal.hideModal();
          this.getAdminProducts();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getAdminProducts();
  },
};
</script>

<style scoped>
.product-img {
  overflow: hidden;
}
.product-img img {
  width: 100%;
  max-height: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
