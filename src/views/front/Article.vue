<template>
  <Loading :active="isLoading" :z-index="1500"></Loading>
  <section class="py-5">
  <div class="p-5"></div>
  <div class="container col-12 col-lg-8 col-xl-7 col-xxl-6">
    <nav class="container-lg" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link class="text-muted" to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link class="text-muted" to="/articles">最新消息</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
  </div>
  <div class="container col-12 col-lg-8 col-xl-7 col-xxl-6 pb-5 bg-01">
    <main id="main" class="container-lg content">
      <h2 class="pt-4">{{ article.title }}</h2>
      <div class="row my-4">
        <div class="col-12">
          <div class="article-post">
            <div class="article-img-block position-relative overflow-hidden mb-0">
              <img
                :src="article.image"
                :alt="article.title"
                class="article-img img-fluid d-block ms-auto"
              />
            </div>
            <article class="mt-3">
              <span class="badge article-tag fs-6">{{ article.tag }}</span>
              <h3 class="text-start mt-2">{{ article.description }}</h3>
              <p class="text-muted">
                <time :datetime="$filters.datetime(article.create_at)">{{
                  $filters.date(article.create_at)
                }}</time>
              </p>
              <div class="text-inner" v-html="article.content"></div>
            </article>
            <div class="d-flex my-4">
              <router-link class="btn btn-article" to="/articles"
                >返回</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
      article: {},
    };
  },
  methods: {
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    getArticle() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          const { article } = res.data;
          this.article = article;
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.getArticle();
  },
};
</script>
