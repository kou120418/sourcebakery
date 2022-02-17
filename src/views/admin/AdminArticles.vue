<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <div class="container content">
    <h2 class="text-center">文章列表</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        新增文章
      </button>
    </div>
    <div class="row mt-3">
      <div
        v-for="item in articles"
        :key="item"
        class="col-12 col-md-6 col-lg-3 mb-4"
      >
        <div class="card h-100">
          <h5 class="card-header min-vh-75 d-flex align-items-center">
            {{ item.title }}
          </h5>
          <img :src="item.image" alt class="card-img-top img-cover" />
          <div class="card-body d-flex flex-column justify-content-end">
            <span class="badge bg-primary mb-1">{{ item.tag }}</span>
            <h5 class="card-title">
              {{ item.description
              }}<span v-if="item.isPublic">
                <i class="bi bi-check-circle-fill"></i>
              </span>
            </h5>
            <p class="card-subtitle">作者：{{ item.author }}</p>
            <small class="card-text mb-2 text-muted">
              貼文日期：{{ $filters.date(item.create_at) }}
            </small>
            <div class="btn-group w-100 mt-3">
              <router-link
                class="btn btn-outline-primary btn-sm"
                :to="`/admin/article/${item.id}`"
                >編輯</router-link
              >
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-4">
      <Pagination :page="pagination" @get-page="getArticles"></Pagination>
    </div>

    <!-- Modal -->
    <AdminArticleModal
      ref="adminModal"
      :props-article="tempArticle"
      @update-article="updateArticle"
    ></AdminArticleModal>
    <DelArticleModal
      ref="adminDelModal"
      :props-article="tempArticle"
      @delete-article="deleteArticle"
    ></DelArticleModal>
  </div>
</template>

<script>
import Pagination from '@/components/admin/AdminPagination.vue';
import AdminArticleModal from '@/components/admin/AdminArticleModal.vue';
import DelArticleModal from '@/components/admin/DelArticleModal.vue';

export default {
  data() {
    return {
      isLoading: false,
      isNew: true,
      articles: {},
      pagination: {},
      tempArticle: {},
    };
  },
  components: {
    Pagination,
    AdminArticleModal,
    DelArticleModal,
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
    getArticles(num = this.pagination.current_page || 1) {
      // 參數預設值
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${num}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          const { articles, pagination } = res.data;
          this.articles = articles;
          this.pagination = pagination;
          this.isLoading = false;
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    deleteArticle() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(url).then((res) => {
        this.$refs.adminDelModal.hideModal();
        this.showAlert(res);
        this.getArticles();
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    updateArticle(propsArticle) {
      console.log(propsArticle);
      let url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/`;
      let httpMethod = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${propsArticle.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](url, { data: propsArticle }).then((res) => {
        if (res.data.success) {
          console.log(res);
          this.$refs.adminModal.hideModal();
          this.showAlert(res);
          this.getArticles();
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempArticle = {
            create_at: Math.floor(Date.now() / 1000),
            image: [],
            tag: [],
            isPublic: false,
          };
          this.isNew = true;
          this.$refs.adminModal.openModal();
          break;
        case 'delete':
          this.tempArticle = { ...item };
          this.$refs.adminDelModal.openModal();
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // console.clear();
    this.isLoading = true;
    this.getArticles();
  },
};
</script>
