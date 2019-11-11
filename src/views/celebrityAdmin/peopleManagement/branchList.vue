<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">用户列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true" v-if="showAccount">新增账户</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="account" label="账户"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
      <el-table-column align="center" prop="departmentId" label="部门Id"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <p>{{scope.row.state | stage }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" v-if="showAccount">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="del(scope.row.id) " >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- account: "renshibu_admin"
departmentId: "009"
departmentName: "人事部"
id: 12
password: "e10adc3949ba59abbe56e057f20f883e"
roleId: 8
state: 1
type: 2
userName: "华文辉" -->
    <!-- 新增窗口 -->
    <el-dialog title="新增用户" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form :model="user" label-width="70px" ref="user" :rules="rules">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="对应员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" placeholder="登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="user.departmentName" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="部门id" prop="departmentId">
          <el-input v-model="user.departmentId" placeholder="请输入部门ID"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色" >
          <el-radio-group v-model="user.roleId" >
            <el-radio label="2" >编辑</el-radio>
            <el-radio label="3" >审批</el-radio>
            <el-radio label="4" >服务管理</el-radio>
          </el-radio-group>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectList ,addUser , deleteUser} from "@/views/celebrityAdmin/severApi/celebrityUserApi";
export default {
  data() {
    return {
      list: [],
      dialog: false,
      user: {
        userName: "",
        account: "",
        password: "",
        roleId: "8",
        departmentId: "",
        departmentName: "",
        type: 2,
        state: 1
      },
      showAccount:false,
      rules: {
            userName: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
            account: [{ required: true, message: "请输入登录用户名", trigger: "blur" }],
            password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
            departmentName: [{ required: true, message: "请输入部门", trigger: "blur" }],
            departmentId: [{ required: true, message: "请输入部门ID", trigger: "blur" }],
      },
    };
  },
  created() {
    this.upData();
  },
  methods: {
    upData() {
      let queryData = {}
      if( localStorage.getItem("departmentType") == 1){
        queryData.type = 2
        this.showAccount = true
      }else{
        queryData.departmentName = localStorage.getItem("departmentName")
        queryData.departmentId = localStorage.getItem("departmentId")
      }
      selectList(queryData).then(res => {
        this.list = res.data;
      });
    },
    del(i) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(i).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.upData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    saveUser() {
      this.$refs.user.validate((valid) => {
          if (valid) {
            return
            addUser(this.user).then(res => {
              this.dialog = false;
              console.log(res);
              this.upData();
            });
          } else {
            return false;
          }
        });
    }
  },
  components: {},

  filters: {
    // 判断角色
    stage(i) {
      if (i == 0) {
        return "禁用";
      }
      if (i == 1) {
        return "启用";
      }
    }
  }
  //   /**
  //    * 用户账号
  //    */
  //   private String account;
  //   /**
  //    * 用户名
  //    */
  //   private String userName;
  //   /**
  //    * 登录密码
  //    */
  //   private String password;
  //   /**
  //    * 所属角色id
  //    */
  //   private Integer roleId;
  //   /**
  //    * 用户类型公司级别0 单位级别1
  //    */
  //   private Integer type;
  //   /**
  //    * 状态，启用禁用
  //    */
  //   private Integer state;
  //   //部门id
  //   private String departmentId;
  //   //部门名称
  //   private String departmentName;
};
</script>
<style lang="scss" scoped>
.container {
  .btn {
    float: right;
    margin: 0 40px 20px 0;
  }
}
</style>