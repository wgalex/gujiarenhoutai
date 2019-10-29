<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">类别列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true">新增类别</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="levelCode" label="层级"></el-table-column>
      <el-table-column align="center" prop="orginCategoryCode" label="上一个级别的类别码"></el-table-column>
      <el-table-column align="center" prop="categoryName" label="类别名称"></el-table-column>
      <el-table-column align="center" prop="categoryCode" label="类别码"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
      <el-table-column align="center" prop="departmentId" label="部门id"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增窗口 -->
    <el-dialog title="新增类别" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form :model="userAdd" label-width="70px">
        <el-form-item label="层级">
          <el-input v-model="userAdd.levelCode" placeholder></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userAdd.departmentName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="部门id">
          <el-input v-model="userAdd.departmentId" placeholder></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="userAdd.categoryName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="类别码">
          <el-input v-model="userAdd.categoryCode" placeholder></el-input>
        </el-form-item>
        <el-form-item label="上一个级别的类别码">
          <el-input v-model="userAdd.orginCategoryCode" placeholder></el-input>
        </el-form-item>
        
        <!-- <el-form-item label="状态">
          <el-input v-model="user.password" placeholder=""></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="状态" style="margin-left:28px">
          <el-radio-group v-model="userAdd.state">
            <el-radio label="0">通过</el-radio>
            <el-radio label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <!-- 修改类别 -->
    <el-dialog title="修改类别" :visible.sync="dialog1" :append-to-body="true" width="600px">
      <el-form :model="userEdit" label-width="70px">
       <el-form-item label="层级">
          <el-input v-model="userAdd.levelCode" placeholder></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userAdd.departmentName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="部门id">
          <el-input v-model="userAdd.departmentId" placeholder></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="userAdd.categoryName" placeholder></el-input>
        </el-form-item>
        <el-form-item label="类别码">
          <el-input v-model="userAdd.categoryCode" placeholder></el-input>
        </el-form-item>
        <el-form-item label="上一个级别的类别码" label-width="100px">
          <el-input v-model="userAdd.orginCategoryCode" placeholder></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="saveEditUser">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryCategory,addCategory,editCategory
} from "@/views/celebrityAdmin/severApi/category";
export default {
  data() {
    return {
      list: [],
      dialog: false,
      dialog1: false,
      userAdd: {
        categoryName: "",
        categoryCode: "",
        levelCode: "",
        departmentId: "",
        departmentName: "",
        orginCategoryCode: "",
      },
      userEdit: {
        categoryName: "",
        categoryCode: "",
        levelCode: "",
        departmentId: "",
        departmentName: "",
        orginCategoryCode: "",
      }
    };
  },
  created() {
    this.upData();
  },
  methods: {
    upData() {
      let queryData = {}
      queryData.departmentId = localStorage.getItem('departmentId')
      queryData.departmentName = localStorage.getItem('departmentName')
      queryCategory(queryData).then(res => {
        this.list = res.data;
      });
    },
    edit(id) {
      this.dialog1 = true;
      this.userEdit.id = id;
      queryCategory(id).then(res => {
        // this.list = res.data;
      });
      
    },
    saveEditUser(){
      editCategory(this.userEdit).then(res => {

      });
      this.upData();
    },
    saveUser() {
      addCategory(this.userAdd).then(res => {
        this.dialog = false;
        this.upData();
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