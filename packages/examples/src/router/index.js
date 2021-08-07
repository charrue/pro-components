import Vue from "vue";
import VueRouter from "vue-router";
import PageLayout from "@/components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/page/page1",
  },
  {
    path: "/page",
    component: PageLayout,
    children: [
      {
        path: "page1",
        name: "page1",
        component: () => import("@/views/page/page-container.vue"),
        children: [
          {
            path: "path4",
            name: "path4",
            component: () => import("@/views/page/page4.vue"),
          },
          {
            path: "path5",
            name: "path5",
            component: () => import("@/views/page/page5.vue"),
          },
        ],
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("@/views/page/page2.vue"),
      },
      {
        path: "page3",
        name: "page3",
      },
    ],
  },
  {
    path: "/schema-form",
    name: "schema-form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/schema-form/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;