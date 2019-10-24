<template>
    <el-menu
      class="el-menu-vertical-demo"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse">
        <router-link :to="{name: 'banner'}" >
          <el-menu-item index="/serverIndex/banner" >Banner管理</el-menu-item>
        </router-link>
        <router-link :to="{name: 'content'}" >
          <el-menu-item index="/serverIndex/content" >评价内容管理</el-menu-item>
        </router-link>
        <router-link :to="{name: 'rate'}" >
          <el-menu-item index="/serverIndex/rate" >服务评价管理</el-menu-item>
        </router-link>
        <router-link :to="{name: 'qrcode'}" >
          <el-menu-item index="/serverIndex/qrcode" >二维码管理</el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
  .el-menu-vertical-demo {
    min-height: 100%;
  }
  a {
    text-decoration: none
  }
</style>
