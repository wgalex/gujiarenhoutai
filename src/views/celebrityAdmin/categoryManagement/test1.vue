<template>
  <div class="custom-tree-container">
    <div>
      <el-tree
        :data="treeList"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        v-if="isLoadingTree"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <el-dialog title="新增" :visible.sync="dialog" :append-to-body="true" width="800px">
      <el-form :model="userAdd" label-width="300px">
        <!-- <el-form-item label="层级">
        <el-select v-model="NewLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelName" :value="item.levelCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>-->
        <!-- <el-form-item label="部门">
          <el-input v-model="userAdd.departmentName" disabled></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="上一类别">
          <el-select v-model="New0rginCategoryCode" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.categoryCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>-->
        <el-form-item label="名称">
          <el-input v-model="userAdd.categoryName" placeholder></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialog1" :append-to-body="true" width="800px">
      <el-form :model="userEdit" label-width="300px">
        <!-- <el-form-item label="层级">
        <el-select v-model="selectedLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelName" :value="item.levelCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>-->
        <!-- <el-form-item label="部门">
          <el-input v-model="userEdit.departmentName" disabled></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="上一类别">
          <el-select v-model="selected0rginCategoryCode" placeholder="请选择">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.categoryCode" :disabled="item.disabled"></el-option>
        </el-select>
        </el-form-item>-->
        <el-form-item label="名称">
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
  queryCategory,
  addCategory,
  editCategory,
  selectmerge
} from "@/views/celebrityAdmin/severApi/category";
import { select ,addLevel,queryIdLevel,editLevel} from "@/views/celebrityAdmin/severApi/LevelApi";
let id = 1000;
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "categoryName"
      },
      isLoadingTree: false,
      treeList: [],
      dialog: false,
      dialog1: false,
      userEdit: {
        categoryName: "",
        categoryCode: "",
        levelCode: "",
        departmentId: "",
        departmentName: "",
        orginCategoryCode: "",
        id:''
      },
      userAdd: {
        categoryName: "",
        categoryCode: "",
        levelCode: "",
        departmentId: "",
        departmentName: "",
        orginCategoryCode: "",
      },
      selected0rginCategoryCode: "",
      selectedLevelCode: "",
      New0rginCategoryCode: "",
      NewLevelCode: "",
      addLevelFlag:0,
      maxLevel:'',
    };
  },
  created(){
    select().then(res => {
        this.maxLevel = res.data.length
    });
  },
  mounted() {
    this.upData();
  },
  methods: {
    upData() {
      let queryData = {};
      this.treeList = []
      queryData.departmentName = localStorage.getItem("departmentName");
      selectmerge(queryData).then(res => {
        this.treeList.push(JSON.parse(JSON.stringify(res.data)));
        this.isLoadingTree = true;
      });
    },
    append(data) {
      if(this.maxLevel == 1 && data.categoryCode == ''){
          this.userAdd.categoryCode = this.randomNum(1,10000000)
          this.userAdd.departmentName = localStorage.getItem("departmentName");
          this.userAdd.departmentId = localStorage.getItem("departmentId");
          this.userAdd.orginCategoryCode = '';
          this.userAdd.levelCode = 1;
          this.dialog = true;
      }else{
          this.userAdd.categoryName = '';
          this.userAdd.categoryCode = this.randomNum(1,100000)
          this.userAdd.departmentName = localStorage.getItem("departmentName");
          this.userAdd.departmentId = localStorage.getItem("departmentId");
          this.userAdd.orginCategoryCode = data.categoryCode;
          this.userAdd.levelCode = data.levelCode + 1;
          if(this.maxLevel < this.userAdd.levelCode ){
                this.addLevelFlag = 1
        }
        this.dialog = true; 
      }
    },
    saveUser() {
      if(this.addLevelFlag == 1){
        var addLevelData = {}
        addLevelData.levelCode = this.userAdd.levelCode
        addLevelData.state = 1
        addLevelData.levelName = '第'+ this.userAdd.levelCode +'层级'  
            addLevel(addLevelData).then(res => {
                addCategory(this.userAdd).then(res => {
                  this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                setTimeout(() => {  
                  this.upData();
                  this.dialog = false;
                }, 500);
          });  
      })
    }else{
      addCategory(this.userAdd).then(res => {
              this.$message({
            type: 'success',
            message: '保存成功!'
          });
           setTimeout(() => {  
                  this.upData();
                  this.dialog = false;
            }, 500);
      });
    }
  },
    treeoEdit(data) {
      this.dialog1 = true;
      this.userEdit.categoryName = data.categoryName;
      this.userEdit.categoryCode = data.categoryCode;
      this.userEdit.levelCode = data.levelCode;
      this.userEdit.departmentName = localStorage.getItem("departmentName");
      this.userEdit.departmentId = localStorage.getItem("departmentId");
      this.userEdit.orginCategoryCode = data.orginCategoryCode;
      this.userEdit.id = data.id;
    },
    saveEditUser() {
      editCategory(this.userEdit).then(res => {
       this.$message({
          type: 'success',
          message: '修改成功!'
        });
      });
      setTimeout(() => {  
        this.upData();
         this.dialog1 = false;
      }, 500);
    },
    jump(data){
      console.log(data);
      this.$router.push({
        name: "celebrityPersonManagementList",
        query: {
          catorObj: data
        }
      });
    },
    // test(){
    //   alert(123)
    // },
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
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
           <el-button size="mini" type="text" on-click={() => this.treeoEdit(data)}>
              修改
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              新增
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.jump(data)}>
              名人列表
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  padding-right: 8px;
}
</style>