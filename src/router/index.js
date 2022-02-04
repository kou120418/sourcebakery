import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Front.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/front/Index.vue'),
        meta: {
          title: '首頁',
        },
      },
      {
        path: 'about',
        component: () => import('../views/front/About.vue'),
        meta: {
          title: '關於我們',
        },
      },
      {
        path: 'articles',
        component: () => import('../views/front/Articles.vue'),
        meta: {
          title: '最新消息',
        },
      },
      {
        path: 'products',
        component: () => import('../views/front/Products.vue'),
        meta: {
          title: '產品一覽',
        },
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/Product.vue'),
      },
      {
        path: 'contact',
        component: () => import('../views/Contact.vue'),
        meta: {
          title: '聯繫我們',
        },
      },
    ],
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart.vue'),
    children: [
      {
        path: '/cart',
        component: () => import('../views/cart/CartCheck.vue'),
        meta: {
          title: '購物車內容',
        },
      },
      {
        path: 'cartform',
        component: () => import('../views/cart/CartForm.vue'),
        meta: {
          title: '填寫訂單',
        },
      },
      {
        path: 'cartconfirm',
        component: () => import('../views/cart/CartConfirm.vue'),
        meta: {
          title: '確認訂單',
        },
      },
      {
        path: 'cartpayment',
        component: () => import('../views/cart/CartPayment.vue'),
        meta: {
          title: '完成下單',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '後台登入',
    },
  },
  {
    path: '/admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        path: '/admin',
        component: () => import('../views/admin/AdminIndex.vue'),
        meta: {
          title: '後台首頁',
        },
      },
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue'),
        meta: {
          title: '產品設定',
        },
      },
      {
        path: 'coupon',
        component: () => import('../views/admin/AdminCoupon.vue'),
        meta: {
          title: '優惠券設定',
        },
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue'),
        meta: {
          title: '訂單設定',
        },
      },
      {
        path: 'articles',
        component: () => import('../views/admin/AdminArticles.vue'),
        meta: {
          title: '文章設定',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
