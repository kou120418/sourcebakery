<template>
  <header class="nav-header">
    <AdminNavbar></AdminNavbar>
  </header>
  <router-view v-if="check"/>
  <AdminFooter></AdminFooter>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import AdminFooter from '@/components/admin/AdminFooter.vue';

export default {
  data() {
    return {
      check: false,
    };
  },
  components: {
    AdminNavbar,
    AdminFooter,
  },
  created() {
    // 取得 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 將 Token 夾帶至請請求(request) 的表頭(headers) 設定只需要一次
    this.$http.defaults.headers.common.Authorization = token;
    this.loginCheck();
  },
  methods: {
    showAlert(res) {
      this.$swal({
        title: res.data.message,
        icon: 'info',
      });
    },
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    // 檢查使用者是否仍持續登入
    loginCheck() {
      const url = `${process.env.VUE_APP_URL}/api/user/check`;
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          this.check = true;
        } else {
          this.showAlert(res);
          this.$router.push('/login');
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/back.scss';
</style>
