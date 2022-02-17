<template>
  <div class="container content">
    <h2 class="text-center">訂單列表</h2>
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-page="getOrders"></Pagination>
    </div>
    <!-- 訂單列表 -->
    <table class="table align-middle mt-4">
      <thead>
        <tr>
          <th width="8%">訂單日期</th>
          <th width="9%">客戶姓名</th>
          <th width="10%">客戶信箱</th>
          <th width="10%">客戶電話</th>
          <th width="18%">客戶地址</th>
          <th width="11%">訂單總價</th>
          <th class="text-end" width="9%">付款狀態</th>
          <th width="12%"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in orders" :key="item.id">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.user.tel }}</td>
          <td>{{ item.user.address }}</td>
          <td>
            <div class="h5">NT${{ $filters.currency(item.total) }} 元</div>
          </td>
          <td class="text-end">
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">未付款</span>
          </td>
          <td class="text-end">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                查看
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                <span
                  v-if="loadingStatus.loadingItem === item.id"
                  class="material-icons animate-spin"
                >
                  cached
                </span>
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="8" class="text-end">
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="openModal('deleteAll', item)"
              :disabled="orders <= 1"
            >
              <span
                v-if="loadingStatus.loadingItem === 1"
                class="material-icons animate-spin"
              >
                cached
              </span>
              刪除所有訂單
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-page="getOrders"></Pagination>
    </div>

    <!-- Modal -->
    <AdminOrderModal
      ref="adminModal"
      :props-order="tempOrder"
      @update-order="updateOrder"
    ></AdminOrderModal>
    <!-- 刪除按鈕彈出 Modal -->
    <DelOrdersModal
      ref="adminDelModal"
      :props-order="tempOrder"
      @delete-orders="deleteOrder"
    ></DelOrdersModal>
    <DelAllOrders
      ref="adminAllOrderDelModal"
      @delete-all-orders="deleteAllOrders"
    ></DelAllOrders>
  </div>
</template>

<script>
import Pagination from '@/components/admin/AdminPagination.vue';
import AdminOrderModal from '@/components/admin/AdminOrderModal.vue';
import DelOrdersModal from '@/components/admin/DelOrdersModal.vue';
import DelAllOrders from '@/components/admin/DelAllOrdersModal.vue';

export default {
  data() {
    return {
      orders: {},
      loadingStatus: {
        loadingItem: '',
      },
      pagination: {},
      tempOrder: {},
    };
  },
  components: {
    Pagination,
    AdminOrderModal,
    DelOrdersModal,
    DelAllOrders,
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
    getOrders(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/orders?page=${num}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          const { orders, pagination } = res.data;
          this.orders = orders;
          this.pagination = pagination;
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    deleteOrder(item) {
      this.loadingStatus.loadingItem = item.id;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          this.$refs.adminDelModal.hideModal();
          this.showAlert(res);
          this.getOrders();
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    deleteAllOrders() {
      this.loadingStatus.loadingItem = 1;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          this.$refs.adminAllOrderDelModal.hideModal();
          this.showAlert(res);
          this.getOrders();
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    openModal(inOrder, item) {
      switch (inOrder) {
        case 'edit':
          // 傳參考特性會影響到資料，因此將資料進行淺層拷貝
          this.getOrders();
          this.tempOrder = { ...item };
          this.$refs.adminModal.openModal();
          break;
        case 'delete':
          this.tempOrder = { ...item };
          this.$refs.adminDelModal.openModal();
          break;
        case 'deleteAll':
          this.$refs.adminAllOrderDelModal.openModal();
          break;
        default:
          break;
      }
    },
    updateOrder(temp) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/order/${temp.id}`;
      this.$http.put(url, { data: temp }).then((res) => {
        if (res.data.success) {
          this.$refs.adminModal.hideModal();
          this.getOrders();
        } else {
          this.showAlert(res);
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
