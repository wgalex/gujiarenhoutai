<template>
  <div class="container">
    <el-container>
      <el-header>
        <hamburger @isActive="toggle" :isActive="isShow" ></hamburger>
        <h1>KUKA 内容管理系统</h1>
        <div class="nav">
          <span>{{name}}</span>
          <span @click="doLogout" class="btn" >退出</span>
        </div>
      </el-header>
      <el-container>
        <div class="aside-box" >
          <asidebar :isCollapse="isShow" ></asidebar>
        </div>
        <el-main style="padding-top: 0" >
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Asidebar from './asidebar/asidebar'
import { logout } from '@/api/login'
import { getToken } from '@/api/auth'
export default {
  data () {
    return {
      user: null,
      isShow: false,
    }
  },
  computed: {
    name () {
      return this.user.userName
    }
  },
  created () {
    this.user = JSON.parse(getToken())
  },
  methods: {
    doLogout () {
      // logout().then(res => {
      //   console.log(res)
      // })
      this.$router.push({
        path:'/login'
      })
    },
    toggle () {
      this.isShow = !this.isShow
    }
  },
  components: {
    Hamburger,
    Asidebar
  }
}
</script>
<style lang="scss" scoped>
  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    .el-container {
      min-width: 1000px;
      height: 100%;
      .el-header {
        width: 100%;
        display: flex;
        line-height: 60px;
        background: #E70012;
        color: #fff;
        h1 {
          margin: 0 20px;
        }
        .nav {
          flex: 1;
          text-align: right;
          span {
            margin-right: 15px;
          }
          .btn {
            cursor: pointer;
          }
        }
      }
      .el-aside {
        // border-right: 1px solid #999;
        overflow-x: hidden;
        // background: #333;
      }
    }
  }
  // left-to 左侧进出
  .left-enter, .left-leave-to {
    transform: translate3d(-100%, 0, 0)
  }
  .left-leave, .left-enter-to {
    transform: translate3d(0, 0, 0)
  }
  .left-enter-active, .left-leave-active {
    transition: all .2s
  }
  .icon {
    padding: 6px 4px;
  }
</style>
