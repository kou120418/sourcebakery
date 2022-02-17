import { createApp } from 'vue';
import 'bootstrap';
import VueAxios from 'vue-axios';
import axios from 'axios';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 匯入 vee-validate 相關規則
import rules from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from 'vue3-loading-overlay';
import CKEditor from '@ckeditor/ckeditor5-vue';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'material-icons/iconfont/material-icons.css';

import { date, datetime, currency } from './assets/javascript/filters';
import router from './router';
import App from './App.vue';

// 定義驗證規則
Object.keys(rules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, rules[rule]);
  }
});

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');
AOS.init();

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  datetime,
  currency,
};

app.use(VueAxios, axios);

app.use(router);
app.mount('#app');

app.use(VueSweetalert2);
app.use(CKEditor);
app.component('Loading', Loading);
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
