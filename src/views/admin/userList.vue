<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >用户列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true" >新增账户</el-button>
    </el-row>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="account"
        label="账户"
      ></el-table-column>
      <el-table-column
        align="center"
        label="角色"
      >
        <template slot-scope="scope" >
          <p>{{scope.row.roleId | stage}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="del(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑窗口 -->
    <el-dialog
      title="新增用户"
      :visible.sync="dialog"
      :append-to-body="true"
      width="600px"
    >
      <el-form :model="user" label-width="70px" >
        <el-form-item label="姓名" >
          <el-input v-model="user.userName" placeholder="对应员工姓名" ></el-input>
        </el-form-item>
        <el-form-item label="账号" >
          <el-input v-model="user.account" placeholder="登录用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="user.password" placeholder="登录密码" ></el-input>
        </el-form-item>
        <el-form-item label="角色" >
          <el-radio-group v-model="user.roleId" >
            <el-radio label="2" >编辑</el-radio>
            <el-radio label="3" >审批</el-radio>
            <el-radio label="4" >服务管理</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { getUserList, addUser, deleteUser } from '@/api/admin'
export default {
  data () {
    return {
      list: [],
      dialog: false,
      user: {
        userName: '',
        account: '',
        password: '',
        roleId: '2',
      }
    }
  },
  created () {
    this.upData()
  },
  methods: {
    upData () {
      getUserList().then(res => {
        this.list = res.data
      })
    },
    del (i) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(i).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.upData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    saveUser () {
      addUser(this.user).then(res => {
        this.dialog = false
        console.log(res)
        this.upData()
      })
    }
  },
  components: {

  },

  filters: {
    // 判断角色
    stage (i) {
      if (i == 1) {
        return '管理员'
      }
      if (i == 2) {
        return '编辑'
      }
      if (i == 3) {
        return '审批'
      }
      if (i == 4) {
        return '服务管理'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  .btn {
    float: right;
    margin: 0 40px 20px 0;
  }
}
</style>