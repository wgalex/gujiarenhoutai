<template>
    <el-menu
      class="el-menu-vertical-demo"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse">
        <!-- <router-link :to="{name: 'complaintbanner'}" >
          <el-menu-item index="/complaintIndex/complaintbanner" >首页管理</el-menu-item>
        </router-link> -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">账号管理</span>
          </template>
            <router-link :to="{name: 'branchList'}">
                <el-menu-item index="1-1">账号列表</el-menu-item>
            </router-link>
            <!-- <router-link :to="{name: 'branchList'}" >
                <el-menu-item index="1-3">技术部账号</el-menu-item>
            </router-link>
              <router-link :to="{name: 'branchListadd'}">
                <el-menu-item index="1-4">增加部门</el-menu-item>
            </router-link> -->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">层级管理</span>
          </template>
            <router-link :to="{name: 'LevelManagementList'}">
                <el-menu-item index="2-1">层级列表</el-menu-item>
            </router-link>
            <!-- <router-link :to="{name: 'branchList'}" >
                <el-menu-item index="2-3">技术部账号</el-menu-item>
            </router-link>
              <router-link :to="{name: 'branchListadd'}">
                <el-menu-item index="3-4">增加部门</el-menu-item>
            </router-link> -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">类别管理</span>
          </template>
            <router-link :to="{name: 'categoryManagementList'}">
                <el-menu-item index="3-1">类别列表</el-menu-item>
            </router-link>
             <router-link :to="{name: 'test'}">
                <el-menu-item index="3-2">类别列表</el-menu-item>
            </router-link>
             <router-link :to="{name: 'test1'}">
                <el-menu-item index="3-3">类别列表</el-menu-item>
            </router-link>
            <!-- <router-link :to="{name: 'branchList'}" >
                <el-menu-item index="3-3">技术部账号</el-menu-item>
            </router-link>
              <router-link :to="{name: 'branchListadd'}">
                <el-menu-item index="3-4">增加部门</el-menu-item>
            </router-link> -->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">名人管理</span>
          </template>
            <router-link :to="{name: 'celebrityPersonManagementList'}">
                <el-menu-item index="4-1">名人列表</el-menu-item>
            </router-link>
            <!-- <router-link :to="{name: 'branchList'}" >
                <el-menu-item index="4-3">技术部账号</el-menu-item>
            </router-link>
              <router-link :to="{name: 'branchListadd'}">
                <el-menu-item index="4-4">增加部门</el-menu-item>
            </router-link> -->
        </el-submenu>
        <!-- <router-link :to="{name: 'complaintEdit'}" >
          <el-menu-item index="/complaintIndex/complaintEdit" >投诉管理</el-menu-item>
        </router-link> -->
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">人员管理</span>
          </template>
          <router-link :to="{name: ''}" >
            <el-menu-item index="2-1">誉华奖</el-menu-item>
          </router-link>
        <router-link :to="{name: ''}" >
            <el-menu-item index="2-2">双基奖</el-menu-item>
          </router-link>
        </el-submenu> -->
        <!-- <router-link :to="{name: 'complaintEmail'}" >
          <el-menu-item index="/complaintIndex/complaintEmail" >电邮管理</el-menu-item>
        </router-link> -->
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">电邮管理</span>
          </template>
          <router-link :to="{name: 'addEmailComp'}" >
            <el-menu-item index="3-1">电邮添加</el-menu-item>
          </router-link> -->
          <!-- <router-link :to="{name: 'listEmailComp'}" >
            <el-menu-item index="3-2">电邮列表</el-menu-item>
          </router-link> -->
        <!-- </el-submenu> -->
        <!-- <router-link :to="{name: 'complaintCase'}" >
          <el-menu-item index="/complaintIndex/complaintCase" >稽查案例</el-menu-item>
        </router-link> -->
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">稽查案例</span>
          </template>
          <router-link :to="{name: 'addCaseComp'}" >
            <el-menu-item index="4-1">稽查案例添加</el-menu-item>
          </router-link>
          <router-link :to="{name: 'listCaseComp'}" >
            <el-menu-item index="4-2">稽查案例列表</el-menu-item>
          </router-link>
        </el-submenu> -->
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
