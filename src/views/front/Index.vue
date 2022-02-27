<template>
  <div class="position-relative">
    <div
      class="position-relative"
      style="height: 100vh; top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1505285360-458ff677f029?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
      background-position: center 70%; opacity: 0.5;"
    ></div><!-- style need organize -->
    <div
      class="position-absolute container d-flex flex-column"
      style="top: 0; bottom: 0; left: 0; right: 0; min-height: 100vh;"
    ><!-- style need organize -->
      <div class="row justify-content-center my-auto">
        <div
          class="col-md-6 text-center"
        >
          <h2
            data-aos="fade-zoom-in"
            data-aos-delay="500"
            data-aos-duration="600">索思烘焙</h2>
          <p
            class="text-dark mb-0 mt-3"
            data-aos="fade-zoom-in"
            data-aos-delay="1000"
            data-aos-duration="600"
          >記憶中的美好味道，都在這裡</p>
          <div
            class="mt-4"
            data-aos="fade-zoom-in"
            data-aos-delay="1500"
            data-aos-duration="600"
          >
            <router-link to="/about">
              <button
                class="btn btn-outline-dark rounded-2 banner-btn"
              >
                了解更多
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="row text-center">
      <h4 class="mt-3 mb-5">美味與安全兼顧的選擇</h4>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1627735483792-233bf632619b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2085&q=80"
          alt=""
          class="img-fluid index-middle-img rounded-0 w-100"
          data-aos="fade-zoom-in"
          data-aos-duration="600"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h5 class="mt-4">堅持天然</h5>
        <p class="text-muted">
          選擇天然食材，拒絕任何香精、人工食品添加物，為您的健康把關。
        </p>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
          class="img-fluid index-middle-img rounded-0 w-100"
          data-aos="fade-zoom-in"
          data-aos-duration="600"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h5 class="mt-4">手工製作</h5>
        <p class="text-muted">
          從購買食材、篩粉、揉麵皆由專業烘焙師傅親力親為，為您呈上最好的味道。
        </p>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="row text-center">
      <h4 class="mt-3 mb-3">你可能會感興趣</h4>
    </div>
    <div class="row mt-4">
      <div class="col-md-4 mt-md-4" v-for="item in recommendProducts" :key="item.id">
        <router-link
          :to="`/product/${item.id}`"
          class="card-index border-0 mb-4"
        >
          <div class="overflow-hidden position-relative">
            <img
              :src="`${item.imageUrl}`"
              class="card-img-top rounded-0"
              :alt="`${item.title}`"
              style="
                max-height: 250px;
                height: 250px;
                object-fit: cover;
              "
              data-aos="fade-zoom-in"
              data-aos-duration="600"
            />
            <div
              class="
                index-img-cover
                position-absolute
                w-100 h-100 top-0 left-0
                text-center
                bg-dark">
            </div>
            <div
              class="
                index-img-btn
                d-flex
                justify-content-center
                align-items-center
                position-absolute
                w-100 h-100 top-0 left-0
                text-center
                text-light"
            >
              <button class="btn fs-5">
                查看產品
              </button>
            </div>
          </div>
          <div class="card-body text-center">
            <h5>{{ item.title }}</h5>
            <div class="d-flex justify-content-center">
              <p class="card-text text-muted mb-0">
                NT${{ $filters.currency(item.price) }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div
    class="
      bottom-bg-cover
      subscribe-bg
      text-light
      flex-column"
  >
    <span class="fs-5 ls-2 fw-normal mb-4">訂閱以接收優惠資訊</span>
    <div
      id="subscribe"
      class="container row g-2 d-md-flex justify-content-md-center w-60"
    >
      <span class="col-12 col-md-8 col-lg-5 m-0 me-md-2 mb-2 mb-md-0">
        <input
          type="email"
          id="email"
          name="Email"
          class="form-control index-input ls-2 ms-auto"
          placeholder="email@mail.com"
          rules="email|required"
          inputmode="email"
          v-model="email" />
      </span>
      <button
        type="submit"
        class="btn col-12 col-md-3 col-lg-2"
        @click="onSubmit"
      >
        訂閱
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      email: '',
      recommendProducts: [],
    };
  },
  components: {
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.getRandomRecommend(this.products, 3);
          console.log(this.recommendProducts);
          window.scrollTo({
            top: 0,
            behavior: 'instant',
          });
        }
      });
    },
    getRandomRecommend(array, count) {
      for (let i = 0; i < count; i += 1) {
        const num = Math.floor(Math.random() * array.length);
        this.recommendProducts.push(array[num]);
        this.products.splice(num, 1);
      }
    },
    onSubmit() {
      console.log(this.email);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
