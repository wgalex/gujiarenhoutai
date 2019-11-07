<template>
  <div class="container">
    <el-container>
      <el-header>
        <hamburger @isActive="toggle" :isActive="isShow" ></hamburger>
        <h1>KUKA 名人堂荣誉管理系统</h1>
        <!-- <p>{{}}</p> -->
        <div class="nav">
          <span>{{name}}</span>
          <!-- 修改密码 -->
          
              <el-button type="text" @click="savePassword">修改密码</el-button>

                <el-dialog
                  title="修改密码"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  :modal-append-to-body	='false'
                  center>
                    <p>用户：<el-input
                      placeholder="请输入账号"
                      style="width:80%"
                      v-model="input1"
                      clearable>
                    </el-input></p>
                  
                    <p>密码：<el-input placeholder="请输入密码" style="width:85%" v-model="input2" show-password ></el-input></p>
                  
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                  </span>
              </el-dialog>
          
          <!-- <button  @click="aaa" >提交</button> -->
          <span @click="doLogout" class="btn" >退出</span>
        </div>
      </el-header>
      <el-container>
        <div class="aside-box" >
          <asidebar :isCollapse="isShow" ></asidebar>
        </div>
        <el-main style="padding-top: 0">
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
import { test } from '@/api/test'
import { 
  modifyPassword
  } from '@/views/complaint/severApi/indexserver'
export default {
  data () {
    return {
      user: null,
      password:null,
      isShow: false,
      // dialogVisible: false
       centerDialogVisible: false,
       input1: '',
       input2: ''
    }
  },
  computed: {
    name () {
      return this.user.userName
    }
  },
  created () {
  // 获取仓库的用户信息
  // const user = this.$store.state.user
  // console.log(user);
  // if (user && typeof user === 'object'){
  //   this.password = user.password
    
  // }
    this.user = JSON.parse(getToken())
    this.$router.push({
        path:'/bannerImage'
      })
  },
  methods: {
   save(){
    //  console.log(this.input2);
     
     let id = localStorage.getItem('usersId')
    //  let password = localStorage.getItem('pwd')
    if(this.input2.length < 6){
      // alert('密码长度不能少于6位，请重新填写密码')
      this.$message('密码长度不能少于6位，请重新填写密码')
      return
    }else{
       modifyPassword(id,this.input2).then(res=>{
      //  console.log(res); 
     })
     this.$router.push({
       path:'/login'
     })
     
    }
     
    //  localStorage.setItem('accessToken', '更改后' + response.data.result.accessToken)
     this.centerDialogVisible = false
   },
   savePassword(){
    //  this.input1 = this.input2 = ''
     this.centerDialogVisible = true
     this.input2 = ''
     
   },
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
    },

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
  .el-button--text{
    margin-right: 15px;
    color:#fff;
    font-size: 16px
  }
</style>
