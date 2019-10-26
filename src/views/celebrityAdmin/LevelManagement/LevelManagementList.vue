<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">用户列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true">新增层级</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="levelCode" label="层级"></el-table-column>
      <el-table-column align="center" prop="levelName" label="层级名"></el-table-column>
      <el-table-column align="center" prop="state" label="状态">
        <template slot-scope="scope">
          <p>{{scope.row.state | stage}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <p>{{scope.row.roleId | stage}}</p>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增窗口 -->
    <el-dialog title="修改层级" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form :model="user" label-width="70px">
        <el-form-item label="层级">
          <el-input v-model="user.levelCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="层级名">
          <el-input v-model="user.levelName" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="user.password" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="状态" style="margin-left:28px">
        <el-radio-group v-model="state">
          <el-radio label="0">通过</el-radio>
          <el-radio label="1">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <!-- 新增窗口 -->
    <el-dialog title="修改层级" :visible.sync="dialog2" :append-to-body="true" width="600px">
      <el-form :model="user" label-width="70px">
        <el-form-item label="层级">
          <el-input v-model="user.levelCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="层级名">
          <el-input v-model="user.levelName" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="user.password" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="状态" style="margin-left:28px">
        <el-radio-group v-model="state">
          <el-radio label="0">不通过</el-radio>
          <el-radio label="1">通过</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { select ,addLevel} from "@/views/celebrityAdmin/severApi/LevelApi";
export default {
  data() {
    return {
      list: [],
      dialog: false,
      dialog2:false,
      user: {
        levelCode:'',
        levelName:'',
        state:'',
      },
      state:'',
    };
  },
  created() {
    this.upData();
  },
  methods: {
    upData() {
      debugger;
      select().then(res => {
        this.list = res.data;
      });
    },
    edit(i) {
      // debugger
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   deleteUser(i).then(res => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     });
      //     this.upData()
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    saveUser() {
      debugger
      this.user.state = this.state
      addLevel(this.user).then(res => {
        this.dialog = false
        console.log(res)
        this.upData()
      })
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

      // if (i == 3) {
      //   return "审批";
      // }
      // if (i == 4) {
      //   return "服务管理";
      // }
    }
  }
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