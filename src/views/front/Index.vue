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
        <div class="col-md-4 text-center">
          <h2>關於我們</h2>
          <p class="text-muted mb-0 mt-3">
            記憶中的美味，都在這裡。
          </p>
          <!-- <div class="mt-3">
            <router-link to="/about">
              <button
                class="btn btn-outline-dark rounded-2"
              >
                了解更多
              </button>
            </router-link>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="row">

    </div>
    <div class="row">
      <div class="col-md-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590080876351-941da357bde6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80"
          alt=""
          class="img-fluid index-middle-img rounded-0 w-100"
          data-aos="fade-zoom-in"
          data-aos-duration="600"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4">堅持天然</h4>
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
        <h4 class="mt-4">手工製作</h4>
        <p class="text-muted">
          從購買食材、篩粉、揉麵皆由專業烘焙師傅親力親為，為您呈上最好的味道。
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="mt-5" style="text-align: center;">
      <h2>你可能會感興趣</h2>
    </div>
    <div class="row mt-5">
      <div class="col-md-4 mt-md-4" v-for="item in recommendProducts" :key="item.id">
        <router-link
          :to="`/product/${item.id}`"
          class="card border-0 mb-4"
        >
          <div style="overflow: hidden;">
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
          </div>
          <div class="card-body text-center">
            <h4>{{ item.title }}</h4>
            <div class="d-flex justify-content-center">
              <p class="card-text text-muted mb-0">
                {{ item.content }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <!-- <div class="bg-light mt-7">
    <div class="container">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <h3>Lorem ipsum.</h3>
                <p class="my-5">
                  “Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat.”
                </p>
                <p><small>—Lorem ipsum dolor sit amet.—</small></p>
              </div>
            </div>
          </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p class="my-5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat.”
                  </p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p class="my-5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat.”
                  </p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  </div> -->
  <!-- <div class="bg-light py-4">
    <div class="container">
      <div
        class="d-flex
              flex-column
              flex-md-row
              justify-content-between
              align-items-md-center
              align-items-start"
      >
        <p class="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
        <div class="input-group w-md-50 mt-md-0 mt-3">
          <input type="text" class="form-control rounded-0" placeholder="" />
          <div class="input-group-append">
            <button class="btn btn-dark rounded-0" type="button" id="search">
              Lorem ipsum
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>

export default {
  data() {
    return {
      products: [],
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>
