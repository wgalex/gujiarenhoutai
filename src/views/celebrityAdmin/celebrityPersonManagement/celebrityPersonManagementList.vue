<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">名人列表</h1>
    <el-row>
      <el-button type="primary" size="mini" class="btn" @click="add(scope.row.id)">新增名人</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="personName" label="人员名称"></el-table-column>
      <el-table-column align="center" prop="personCode" label="人员工号"></el-table-column>
      <el-table-column align="center" prop="tittle" label="标题"></el-table-column>
      <el-table-column align="center" prop="awardName" label="奖励名称"></el-table-column>
      <el-table-column align="center" prop="awardId" label="奖励id"></el-table-column>
      <el-table-column align="center" prop="filePath" label="附件视频"></el-table-column>
      <el-table-column align="center" prop="photoPath" label="上传头像"></el-table-column>
      <el-table-column align="center" prop="createby" label="创建人名称"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="updateby" label="最后更新人名称"></el-table-column>
      <el-table-column align="center" prop="updatetime" label="最后更新时间"></el-table-column>
      <el-table-column align="center" prop="description" label="描述"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  queryCelebrityPerson,
} from "@/views/celebrityAdmin/severApi/celebrityPerson";
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
      queryCategory().then(res => {
        this.list = res.data;
      });
    },
    edit(id) {
      this.$router.push({
        name: "addCaseComp",
        query: {
          id: id
        }
      });
    },
    add(){
      this.$router.push({
        name: "addCaseComp",
        query: {
          id: id
        }
      });
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