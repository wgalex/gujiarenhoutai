<template>
    <el-menu
      class="el-menu-vertical-demo"
      :show-timeout="200"
      :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </template>
          <router-link :to="{name: 'userList'}" >
            <el-menu-item index="1-1">用户列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">导航栏管理</span>
          </template>
          <router-link :to="{name: 'navList'}" >
            <el-menu-item index="2-1">编辑导航栏</el-menu-item>
          </router-link>      
        </el-submenu>
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
