<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >导航列表</h1>
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
        label="栏目名称"
      >
        <template slot-scope="scope" >
          <el-input v-model="scope.row.name" ></el-input>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="editor(scope.row)" >保存</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑窗口 -->
    <!-- <el-dialog
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
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog> -->


  </div>
</template>

<script>
import { getNav, updataNav } from '@/api/admin'
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
    getNav().then(res => {
      this.list = res.data
      console.log(res.data)
    })
    // this.upData()
  },
  methods: {
    editor (i) {
      let data = {
        id: i.id,
        name: i.name
      }
      updataNav(data).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
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