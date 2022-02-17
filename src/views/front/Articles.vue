<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <div class="py-4 px-5"></div>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px;"
  >
    <div class="position-absolute front-cover">
      <img class="bg-picture" src="https://images.unsplash.com/photo-1532635224-cf024e66d122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="">
    </div>
    <h2 class="cover-category">最新消息</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <ul v-if="this.articles.length < 1"
      class="list-unstyled row"
      data-aos="fade-zoom-in"
      data-aos-duration="1000"
    >
      <li>
        沒有任何文章
      </li>
    </ul>
    <ul v-else
      class="list-unstyled row"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="300"
    >
      <li
        v-for="item in articles" :key="item"
        class="col-12 col-md-9 col-lg-6 mx-auto mx-lg-0 mb-4"
      >
        <div class="card card-articles h-100">
          <router-link :to="`/article/${item.id}`"
            class="
              d-flex
              flex-column
              text-decoration-none
              stretched-link
              h-100
            "
          >
            <div class="row g-0 border-article">
              <div class="col-md-4 position-relative">
                <img :src="item.image" alt class="img-cover" />
                <div class="position-absolute top-0 start-0">
                  <span class="badge bg-nobeta rounded-0 fs-7">{{
                    item.tag
                  }}</span>
                </div>
              </div>
              <div class="col-md-8 position-relative">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title mb-4">
                    {{ item.title }}
                  </h5>
                  <p class="card-text text-inner">
                    {{ item.description }}
                  </p>
                  <small class="card-text mt-2 text-muted">
                    <time :datetime="$filters.datetime(item.create_at)">{{
                      $filters.date(item.create_at)
                    }}</time>
                  </small>
                </div>
                <div class="position-absolute bottom-0 end-0">
                  <p class="text-nobeta text-inner mb-0">
                    觀看詳細<i class="bi bi-arrow-right"></i>
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
  <div class="d-flex justify-content-center mt-2 mb-4">
    <Pagination :page="pagination" @get-page="getArticles"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      articles: {},
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    getArticles(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles?page=${num}`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          const { articles, pagination } = res.data;
          console.log(res);
          this.articles = articles;
          console.log(this.articles);
          this.pagination = pagination;
          this.isLoading = false;
        }
      }).catch((error) => {
        this.showErrorAlert(error);
      });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<style lang="scss" scoped>
.front-cover {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.front-cover img {
  opacity: .5;
}
.cover-category {
  z-index: 5;
}
.bg-picture {
  width: 100%;
  min-width: 1200px;
  height: auto;
  transform: translateY(-50%);
}

.img-cover {
  // object-position: center top;
  // object-fit: cover;
  height: 5vw;
  max-height: 400px;
  min-height: 175px;
  width: 100%;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
</style>
