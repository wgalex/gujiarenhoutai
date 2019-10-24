<template>
  <div class="container">
    <div class="container-box">
      <el-form :model="loginForm" >
        <el-form-item>
          <h1>系统登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="账户" v-model="loginForm.account" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="loginForm.password" type="password" @keyup.enter.native="onSubmit" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" size="small" @click="onSubmit" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from '@/api/auth'
export default {
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      document.onkeyup = function (e) {
          if (window.event)//如果window.event对象存在，就以此事件对象为准
              e = window.event;
          var code = e.charCode || e.keyCode;
          if (code == 13) {
              //此处编写用户敲回车后的代码
              that.onSubmit()
          }
      }
    },
    onSubmit () {
      login(this.loginForm).then(res => {
        setToken(res.data)
        // console.log(res.data);
        localStorage.setItem('usersId',res.data.id)
        localStorage.setItem('pwd',res.data.password)
        // let data = {'id':res.id,'password':res.password}
        //  this.$store.conmmit('getId',data)
        if (res.data.roleId == 1) {
          
          // 管理员
          this.$router.push({
            name: 'admin'
          })
        } else if (res.data.roleId == 4) {
          // 服务评价
          this.$router.push({
            name: 'serverIndex'
          })
        } else if (res.data.roleId == 2 || res.data.roleId == 3 ) {
          // 顾家人 
          localStorage.setItem('roleId', res.data.roleId)
          this.$router.push({
            name: 'index'
          })
        }else if (res.data.roleId == 6) {
          // 顾家投诉直通车 
          localStorage.setItem('roleId', res.data.roleId)
          this.$router.push({
            name: 'complaintIndex'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #E70012;
  overflow: auto;
  .container-box {
    position: relative;
    min-width: 800px;
    height: 100%;
    margin: 0 auto;
    .el-form {
      position: absolute;
      width: 300px;
      height: 50%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      // background: #fff;
      .el-form-item {
        h1 {
          text-align: center;
          color: #fff;
        }
        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
