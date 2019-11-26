<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">投诉列表</h1>
    <el-row style="margin-bottom: 10px; float: right;">
      <el-col>
        <el-button type="primary" size="mini"><a :href="outUrl" download style="color: #fff">导出</a></el-button>
        <el-button size="mini" type="primary" @click="upPages">上一页</el-button>
        <span>{{curPage}}</span>
        <el-button size="mini" type="primary" @click="nextPages">下一页</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
      <el-table-column align="center" label="时间" width="200">
        <template slot-scope="scope">
          <a>{{scope.row.createTime | formatDate}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="被投诉人"></el-table-column>
      <el-table-column align="center" prop="depart" label="部门" width="150"></el-table-column>
      <el-table-column align="center" prop="title" label="标题" width="300"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注" width="300"></el-table-column>
      <el-table-column align="center" prop="filePath" label="图片或文件" width="300" style="font-size: 8px">
         <template slot-scope="scope" v-if="scope.row.filePath">
        <div class="pic-box">
            <img :src="scope.row.filePath" alt class="pic" v-image-preview>
            <el-button type="primary" size="mini"><a :href="scope.row.filePath" style="text-decoration: none;color:#fff">文件</a></el-button>
        </div>
      </template>
      </el-table-column>
      <el-table-column align="center" prop="complaintName" label="投诉人"></el-table-column>
      <el-table-column align="center"  label="是否匿名">
        <template slot-scope="scope">
          <p>{{scope.row.type | stage}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getlistbyId,
  getlistbytitle,
  dellist
} from "@/views/complaint/severApi/editLIstsever";
import { formatDate } from "@/common/js/date";

export default {
  data() {
    return {
      list: null,
      dialog: false,
      col: {
        name: "",
        id: "",
        strTime: ""
      },
      searchList: null,
      magazine: null,
      typeList: null,
      type: null,
      curPage: 1,
      sizePage: 10,
      title: "",
      nextPage: "",
      prePage: ""
    };
  },
  created() {
    getlistbytitle(this.curPage, this.sizePage, this.title).then(res => {
      this.list = res.data.itemList;
      this.nextPage = res.data.nextPage;
      this.prePage = res.data.prePage;
      // this.max = res.data.totalPage
      console.log(this.list);

    });
    // getTypeAuditList('').then(res => {
    //   this.list = res.data
    //   console.log(res)
    // })
  },
  methods: {
    // 导出
    outdata () {
      out('投诉列表')
    },
    upPages() {
      if (this.curPage == 1) {
        return;
      }
      if (this.prePage == true) {
        this.curPage--;
        getlistbytitle(this.curPage, this.sizePage, this.title).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    nextPages() {
      if (this.nextPage == true) {
        this.curPage++;
        getlistbytitle(this.curPage, this.sizePage, this.title).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    del(id) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dellist(id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            getlistbytitle(this.curPage, this.sizePage, this.title).then(
              res => {
                this.list = res.data.itemList;
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    stage (type) {
    // console.log(i);
    
      if (type == 1) {
        return '实名'
      }
      if (type == 2) {
        return '匿名'
      }
    }
  },
  computed: {
    outUrl () {
      let url = '/kukacms/api/complaint/export.htm'
      // let url = '/kukacms/visitor/exportExcel.htm?magazine=《顾家人》2018年5月上半刊（总第135期）'
      return url
    }
  }
};
</script>

<style lang="scss" scoped>
.pic-box{
  border: 0;
  width: 50px;
  height: 50px;
  overflow: hidden;
  .pic{
    width: 100%;
    height: 100%;
    
  }
}
</style>
