<template>
  <div class="home">
    <charrue-layout
      :collapsed.sync="collapsed"
      :data="menuData"
      title="Vue Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :authorized="authority"
      :regex-to-path="regexToPath"
    >
      <template slot="sidebar-top">
        <div class="side-top-title">主题切换</div>
        <el-radio-group
          v-model="theme"
          class="radio-container"
          @change="onThemeChange"
        >
          <el-radio label="normal">normal</el-radio>
          <el-radio label="light">light</el-radio>
          <el-radio label="dark">dark</el-radio>
        </el-radio-group>
      </template>
      <template slot="header-left">
        <div>LEFT</div>
      </template>
      <template slot="header-right">
        <div>RIGHT</div>
      </template>
      <template slot="content-header">
        <div style="padding: 20px">
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <router-view></router-view>
    </charrue-layout>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
import { useStore } from "@/hooks/store";
const TOTAL_MENUS = [
  {
    title: "page",
    path: "/page",
    icon: "el-icon-document",
    children: [
      {
        path: "page1",
        title: "page1",
        icon: "el-icon-document",
        redirect: "/page/page1/page5",
        children: [
          {
            path: "page4",
            title: "page4",
            icon: "el-icon-document",
          },
          {
            path: "page5",
            title: "page5",
            icon: "el-icon-document",
          },
        ],
      },
      {
        path: "page2",
        title: "page2",
        icon: "el-icon-document",
      },
      {
        path: "page3",
        title: "page3",
        icon: "el-icon-document",
      },
      {
        path: "/extra/about",
        title: "about",
        icon: "el-icon-document",
      },
    ],
  },
  {
    title: "schema-table",
    path: "/schema-table",
    icon: "el-icon-document",
    children: [
      {
        path: "basic",
        title: "basic"
      },
      {
        path: "grouping-head",
        title: "Grouping table head"
      },
    ]
  },
];
export default defineComponent({
  name: "PageLayout",
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.auth);

    const menuData = ref(TOTAL_MENUS);

    const collapsed = ref(false);
    watch(collapsed, (val) => {
      console.log(val);
    });

    const theme = ref("normal");
    const onThemeChange = (value) => {
      const cls = Array.from(document.body.classList);
      const idx = cls.findIndex((t) => t.startsWith("theme-"));
      if (idx > -1) {
        cls.splice(idx, 1);
      }
      cls.push(`theme-${value}`);
      document.body.className = cls.join(" ");
    };

    const authority = ({ menu } = {}) => {
      if (!menu) return true;
      if (auth.value === "user") {
        return menu.title !== "page4";
      }
      return true;
    };

    const regexToPath = ref({
      '/page/page3(.*)': '/page/page3',
    })

    return {
      collapsed,
      menuData,
      theme,
      onThemeChange,
      authority,
      auth,
      regexToPath
    };
  },
});
</script>

<style lang="scss">
.menu-header-extra {
  height: 20px;
  width: 100%;
  background: #fff;
}

.progress-bar-wrapper {
  width: 90%;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  padding: 2px;
  border-radius: 5px;
}

.progress-bar-fill {
  display: block;
  height: 20px;
  border-radius: 5px;
  background-color: #84bf96;
  transition: width 1s ease;
  animation: fill 5s infinite linear;
}

.radio-container.el-radio-group {
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  .el-radio {
    margin-bottom: 10px;
  }
}
.side-top-title {
  margin-bottom: 10px;
  color: var(--layout-aside-active-text-color, #1cd17a);
}

@keyframes fill {
  0% {
    width: 0%;
  }

  25% {
    width: 30%;
    background-color: #45b97c;
  }
  50% {
    width: 50%;
    background-color: #007d65;
  }
  75% {
    width: 70%;
    background-color: #1d953f;
  }
  100% {
    width: 100%;
    background-color: #007947;
  }
}
</style>

<style>
.theme-light {
  --layout-aside-content-bg-color: #ebf1f6;
  --layout-aside-active-text-color: #2f9afd;
  --layout-aside-active-bg-color: #f5f8fb;
  --layout-aside-normal-text-color: #606266;

  --layout-aside-hover-text-color: #2f9afd;
  --layout-aside-hover-bg-color: #f5f8fb;

  --layout-aside-active-submenu-bg-color: #ebf1f6;
}
.theme-dark {
  --layout-aside-content-bg-color: #2c3643;
  --layout-aside-active-text-color: #cccccc;
  --layout-aside-active-bg-color: #222a34;
  --layout-aside-normal-text-color: #ccbe9c;

  --layout-aside-active-submenu-bg-color: #2a2d2e;
}
</style>