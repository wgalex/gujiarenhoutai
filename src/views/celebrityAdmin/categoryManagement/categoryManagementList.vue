<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">类别列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="addCategory()">新增类别</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="levelName" label="层级"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
      <el-table-column align="center" prop="orginCategoryName" label="上一类别"></el-table-column>
      <el-table-column align="center" prop="categoryName" label="类别名称"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增窗口 -->
    <el-dialog title="新增类别" :visible.sync="dialog" :append-to-body="true" width="800px">
      <el-form :model="userAdd" label-width="300px">
      <el-form-item label="层级">
        <el-select v-model="NewLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelName" :value="item.levelCode" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userAdd.departmentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="上一类别">
          <el-select v-model="New0rginCategoryCode" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.categoryCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="userAdd.categoryName" placeholder></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <!-- 修改类别 -->
    <el-dialog title="修改类别" :visible.sync="dialog1" :append-to-body="true" width="800px">
      <el-form :model="userEdit" label-width="300px">
      <el-form-item label="层级">
        <el-select v-model="selectedLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelName" :value="item.levelCode" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
          <el-input v-model="userEdit.departmentName" disabled></el-input>
        </el-form-item>
      <el-form-item label="上一类别">
          <el-select v-model="selected0rginCategoryCode" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.categoryCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="userEdit.categoryName" placeholder></el-input>
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
import {
  select
} from "@/views/celebrityAdmin/severApi/LevelApi";
export default {
  data() {
    return {
      list: [],
      levellist:[],
      selectedLevelCode:'',
      selected0rginCategoryCode:'',
      New0rginCategoryCode:'',
      NewLevelCode:'',
      categoryList:'',
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
      },
    };
  },
  created() {
    this.upData();
  },
  methods: {
    upData() {
      let queryData = {}
      // queryData.departmentId = localStorage.getItem('departmentId')
      queryData.departmentName = localStorage.getItem('departmentName')
      this.userEdit.departmentName = localStorage.getItem('departmentName')
      this.userEdit.departmentId = localStorage.getItem('departmentId')
      this.userAdd.departmentName = localStorage.getItem('departmentName')
      this.userAdd.departmentId = localStorage.getItem('departmentId')
      queryCategory(queryData).then(res => {
        this.list = res.data;
        this.categoryList = res.data
      });
      select().then(res =>{
        this.levellist = res.data
      })
    },
    edit(id) {
      this.dialog1 = true;
      let queryData={}
      queryData.id = id
      queryCategory(queryData).then(res => {
        if(res.code === 1000){
        this.selectedLevelCode = res.data[0].levelCode
        this.userEdit.departmentName = res.data[0].departmentName
        this.userEdit.categoryName = res.data[0].categoryName
        this.selected0rginCategoryCode = res.data[0].orginCategoryCode
        //  console.log(this.userEdit);
        for(var i in this.levellist){
          if(this.selectedLevelCode > this.levellist[i].levelCode){
            this.levellist[i].disabled = true
          }else{
            this.levellist[i].disabled = false
          }
        }
        }
      });
    },
    saveEditUser(){
      this.userEdit.orginCategoryCode = this.selected0rginCategoryCode
      editCategory(this.userEdit).then(res => {

      });
      this.upData();
    },
    saveUser() {
      debugger
      this.userAdd.orginCategoryCode = this.New0rginCategoryCode
      this.userAdd.levelCode = this.NewLevelCode
      console.log(this.userAdd);
      return
      addCategory(this.userAdd).then(res => {
        this.dialog = false;
        this.upData();
      });
    },
    addCategory(){
      this.dialog = true;
      for(var i in this.levellist){
          if( i == 0){
            this.levellist[i].disabled = true
          }else{
            this.levellist[i].disabled = false
          }
        }
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