import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import CompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Layout from "@charrue/layout";
import "@charrue/layout/src/styles/index.scss";
import SchemaTable from '@charrue/schema-table'

Vue.use(CompositionApi);
Vue.use(ElementUI);
Vue.use(Layout);
Vue.component('schema-table', SchemaTable)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
