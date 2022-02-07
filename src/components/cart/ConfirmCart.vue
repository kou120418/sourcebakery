<template>
  <tr v-for="item in cartitem.carts" :key="item.id">
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
      {{ $filters.currency(item.product.price) }}
    </td>
    <td class="text-center">
      {{ item.qty }}
    </td>
    <td class="text-end">
      <small v-if="item.final_total !== item.total" class="text-success"
        >折扣價：</small
      >{{ $filters.currency(item.final_total) }} NTD
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    cartitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
