<template>
    <el-menu
      class="el-menu-vertical-demo"
      :show-timeout="200"
      :collapse="isCollapse">
        <el-submenu index="0"  v-if="role == 2" >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">期刊管理</span>
          </template>
          <router-link :to="{name: 'addCol'}" >
            <el-menu-item index="0-2">新增管理</el-menu-item>
          </router-link>
          <router-link :to="{name: 'magList'}" >
            <el-menu-item index="0-1">期刊列表</el-menu-item>
          </router-link>
          <router-link :to="{name: 'colList'}" >
            <el-menu-item index="0-3">栏目列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="0"  v-else @click.native="alertMsg" >
          <template slot="title" >
            <i class="el-icon-menu"></i>
            <span slot="title">期刊管理</span>
          </template>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">资讯管理</span>
          </template>
          <router-link :to="{name: 'addNews'}" >
            <el-menu-item index="2-1">新资讯</el-menu-item>
          </router-link>
          <router-link :to="{name: 'pastList'}" >
            <el-menu-item index="2-2">资讯列表</el-menu-item>
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
  },
  computed: {
    role () {
      return localStorage.getItem('roleId')
    }
  },
  methods: {
    alertMsg () {
      this.$message({
        message: '该账号没有权限',
        type: 'info',
        duration: 3 * 1000
      })
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
