<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">用户列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true" v-if="showAccount">新增账户</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="userName" label="姓名1"></el-table-column>
      <el-table-column align="center" prop="account" label="账户"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
      <!-- <el-table-column align="center" prop="departmentId" label="部门Id"></el-table-column> -->
      <!-- <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <p>{{scope.row.state | stage }}</p>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="300" v-if="showAccount">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="del(scope.row.id) " >删除</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row) " >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增窗口 -->
    <el-dialog title="新增用户" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form :model="user" label-width="70px" ref="user" :rules="rules">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="对应员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" placeholder="登录用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" placeholder="登录密码"></el-input>
        </el-form-item> -->
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="user.departmentName" placeholder="请输入部门"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
     <el-dialog title="修改用户" :visible.sync="dialog1" :append-to-body="true" width="600px">
      <el-form :model="userEdit" label-width="70px" ref="userEdit" :rules="rulets">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="userEdit.userName" placeholder="对应员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="userEdit.account" placeholder="登录用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" disabled='true'>
          <el-input v-model="userEdit.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="userEdit.departmentName" placeholder="请输入部门"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="savEditUser">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectList ,addUser , deleteUser,updateUser} from "@/views/celebrityAdmin/severApi/celebrityUserApi";
export default {
  data() {
    return {
      list: [],
      dialog: false,
      dialog1:false,
      user: {
        userName: "",
        account: "",
        password: "",
        roleId: "8",
        departmentId: "",
        departmentName: "",
        type: 2,
        state: 1,
        orginCategoryCode:'79400'
      },
      userEdit: {
        userName: "",
        account: "",
        password: "",
        roleId: "8",
        departmentId: "",
        departmentName: "",
        type: 2,
        state: 1,
        orginCategoryCode:'79400',
        id:''
      },
      showAccount:false,
      rules: {
            userName: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
            account: [{ required: true, message: "请输入登录用户名", trigger: "blur" }],
            password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
            departmentName: [{ required: true, message: "请输入部门", trigger: "blur" }],
            // departmentId: [{ required: true, message: "请输入部门ID", trigger: "blur" }],
      },
      rulets: {
            userName: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
            account: [{ required: true, message: "请输入登录用户名", trigger: "blur" }],
            password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
            departmentName: [{ required: true, message: "请输入部门", trigger: "blur" }],
            // departmentId: [{ required: true, message: "请输入部门ID", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.upData()
  },
  methods: {
    upData() {
      debugger
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
    edit(row){
     this.dialog1 = true
     this.userEdit = row
     this.userEdit.password = ''
    },
    savEditUser(){
      this.$refs.userEdit.validate((valid) => {
          if (valid) {
            updateUser(this.userEdit).then(res => {
              this.dialog1 = false;
              console.log(res);
              this.upData();
            });
          } else {
            return false;
          }
        });
    },
    saveUser() {
      this.user.departmentId = this.randomNum(1,80000000)
      this.$refs.user.validate((valid) => {
          if (valid) {
            addUser(this.user).then(res => {
              this.dialog = false;
              console.log(res);
              this.upData();
            });
          } else {
            return false;
          }
        });
    },
     //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
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