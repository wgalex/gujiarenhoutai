<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">层级列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="dialog = true">新增层级</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <!-- <el-table-column align="center" prop="levelCode" label="层级"></el-table-column> -->
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
    <el-dialog title="新增层级" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form :model="userAdd" label-width="70px">
        <!-- <el-form-item label="上一层级">
        <el-select v-model="selectedLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelCode" :value="item.levelCode" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item> -->
        <!-- <el-form-item label="层级">
          <el-input v-model="userAdd.levelCode" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="层级名">
          <el-input v-model="userAdd.levelName" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="user.password" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="状态" style="margin-left:28px">
        <el-radio-group v-model="userAdd.state">
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </span>
    </el-dialog>
    <!-- 修改窗口 -->
    <el-dialog title="修改层级" :visible.sync="dialog1" :append-to-body="true" width="600px">
      <el-form :model="userEdit" label-width="90px">
        <!-- <el-form-item label="上一层级">
        <el-select v-model="selectedOrginLevelCode" placeholder="请选择">
          <el-option v-for="item in levellist" :key="item.id" :label="item.levelCode" :value="item.orginLevelCode" :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item> -->
        <!-- <el-form-item label="层级">
          <el-input v-model="userEdit.levelCode" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="层级名">
          <el-input v-model="userEdit.levelName" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="user.password" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="状态" style="margin-left:28px" >
        <el-radio-group v-model="userEdit.state" >
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">启用</el-radio>
        </el-radio-group>
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
import { select ,addLevel,queryIdLevel,editLevel} from "@/views/celebrityAdmin/severApi/LevelApi";
export default {
  data() {
    return {
      list: [],
      levellist:[],
      selectedOrginLevelCode:'',
      dialog: false,
      dialog1:false,
      maxNumber:'',
      userAdd: {
        levelCode:'',
        levelName:'',
        state:'1',
      },
      userEdit: {
        levelCode:'',
        levelName:'',
        state:'',
      },
    };
  },
  created() {
    this.upData();
  },
  methods: {
    upData() {
      debugger
      select().then(res => {
        this.list = res.data;
        this.maxNumber = this.list.length+1
        console.log(this.maxNumber);
        
        // this.levellist = res.data
        // for(var i in this.levellist){
        //   if(this.levellist[i].state === 1){
        //     this.levellist[i].disabled = false
        //   }else{
        //     this.levellist[i].disabled = true
        //   }
        // }
      });
    },
    edit(id) {
      this.dialog1 = true
      queryIdLevel(id).then(res => {
      let resData = res.data
      this.userEdit.levelName = resData.levelName
      this.userEdit.state = resData.state.toString()
      });
      this.userEdit.id = id
    },
    saveEditUser() {
      editLevel(this.userEdit).then(res =>{
        console.log(res);
        this.dialog1 = false
        this.upData()
    })
    },
    saveUser() {
      this.userAdd.levelCode = this.maxNumber
      addLevel(this.userAdd).then(res => {
        this.dialog = false
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