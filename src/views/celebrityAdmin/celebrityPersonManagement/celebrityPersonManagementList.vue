<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">案例列表</h1>
    <el-row style="margin-bottom: 10px; float: right;">
      <el-col>
        <!-- <el-button size="mini" type="primary" @click="unStatus">切换状态显示列表</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="Status">审核评论显示</el-button>         -->
        <el-button type="primary" size="mini" class="btn" @click="add">新增</el-button>
        <el-button size="mini" type="primary" @click="upPages">上一页</el-button>
        <span>{{curPage}}</span>
        <el-button size="mini" type="primary" @click="nextPages">下一页</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="50" prop="id"></el-table-column>
      <el-table-column align="center" prop="updateby" label="更新人"></el-table-column>
      <el-table-column align="center" prop="personName" label="获奖人员"></el-table-column>
      <el-table-column align="center" prop="personCode" label="工号"></el-table-column>
      <el-table-column align="center" prop="awardName" label="奖励名"></el-table-column>
      <el-table-column align="center" prop="photoPath" label="头像"></el-table-column>
      <el-table-column align="center" prop="photoPath" label="附件"></el-table-column>
      <el-table-column align="center" prop="description" label="描述"></el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <p>{{scope.row.createtime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createby" label="创建人"></el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <p>{{scope.row.updatetime | formatDate}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="content" label="内容"></el-table-column> -->
      <!-- <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.status | stage }}</p>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope">
          <!-- <el-button  type="primary" size="mini" @click="pushDoc">消息推送</el-button> -->
          <el-button type="primary" size="mini" @click="editor(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="add(scope.row.id)">新增</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑窗口 -->
    <!-- <el-dialog
      title="期刊信息编辑"
      :visible.sync="dialog"
      :append-to-body="true"
      width="600px"
    >
      <el-input placeholder="请输入标题内容" v-model="title" clearable></el-input>
      <el-input placeholder="请输入摘要" v-model="content" clearable></el-input>
      <span slot="footer" class="dialog-footer" >
        <el-row type="flex" justify="end">
      <el-upload
        class="upload-demo mt"
        name="files"
        ref="upload"
        action="/kukacms/visitor/picUpload.htm?type=8"
        :on-success="handleSuccess"
        :show-file-list="false"
        :limit="1"
      >
        <el-button size="mini" type="primary" style="width: 96px;">上传图片</el-button>
      </el-upload>
    </el-row>
    <el-row type="flex" justify="center" class="title" style="width: 96px;">
      <span>图片预览</span>
    </el-row>
    <el-row type="flex" justify="center" class="content" style="width: 96px;">
      <template v-if="!bannerUrl">
        <span>暂无数据</span>
      </template>
      <template v-else>
        <div class="pic-box">
          <img :src="bannerUrl" alt class="pic">
        </div>
      </template>
    </el-row>
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
// import { getDocumentList, searchDocument, getTypeList, workNotice } from '@/api/pastList'
// import { getMagazinePage, updateMag, deleteMag, upMagazine } from '@/api/magList'
// import { pushMessage }from '@/api/pastList'
// import {
//   getcasebyId,
//   getcasebytitle,
//   delcase,
//   editcase
// } from "@/views/complaint/severApi/caseServer";
import { formatDate } from "@/common/js/date";
import { queryCelebrityPerson ,addCelebrityPerson,queryIdLevel,editCelebrityPerson} from "@/views/celebrityAdmin/severApi/celebrityPerson";

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
      imgList: {},
      magazine: null,
      typeList: null,
      type: null,
      curPage: 1,
      sizePage: 10,
      title: 1,
      nextPage: "",
      prePage: "",
      status: 0,
      content: "",
      title: "",
      content: "",
      bannerUrl: null,
      covers: null,
      editId: ""
    };
  },
  created() {
    let queryData = {}
    queryData.departmentName = localStorage.getItem("departmentName");
    queryData.departmentId = localStorage.getItem("departmentId");
     queryCelebrityPerson(queryData).then(res => {
       this.list = res.data.itemList
     })
  },
  methods: {
    upPages() {
      if (this.curPage == 1) {
        return;
      }
      if (this.prePage == true) {
        this.curPage--;
        getcasebytitle(this.curPage, this.sizePage, this.status).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    nextPages() {
      if (this.nextPage == true) {
        this.curPage++;
        getcasebytitle(this.curPage, this.sizePage, this.status).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    // del(id) {
    //   this.$confirm("即将删除期刊, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       console.log(id);

    //       delcase(id).then(res => {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!"
    //         });
    //         getcasebytitle(this.curPage, this.sizePage, this.status).then(
    //           res => {
    //             this.list = res.data.itemList;
    //           }
    //         );
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    handleSuccess(res) {
      console.log(res);
      this.covers = res.data[1];
      this.bannerUrl = res.data[1];
      this.$refs.upload.clearFiles();
    },
    editor(id) {
      this.$router.push({
        name: "addCelebrityPersonManagement",
        query: {
          id: id
        }
      });
    },
    add() {
      this.$router.push({
        name: "addCelebrityPersonManagement",
      });
    },
    // saveEdit() {
    //   editcase(
    //     this.title,
    //     this.content,
    //     this.status,
    //     this.covers,
    //     this.editId
    //   ).then(res => {
    //     if (res.code == 1000) {
    //       this.$message({
    //         message: "保存成功",
    //         type: "success"
    //       });
    //     }
    //     this.dialog = false;
    //     this.$refs.upload.clearFiles();
    //     getcasebytitle(this.curPage, this.sizePage, this.status).then(res => {
    //       this.list = res.data.itemList;
    //       this.nextPage = res.data.nextPage;
    //       this.prePage = res.data.prePage;
    //     });
    //   });
    // },
    unStatus() {
       if(this.status == 1){
          this.status = 0
        }else{
          this.status = 1
        }
      getcasebytitle(this.curPage, this.sizePage, this.status).then(res => {
        this.list = res.data.itemList;
        this.nextPage = res.data.nextPage;
        this.prePage = res.data.prePage;
        // this.max = res.data.totalPage
        // console.log(res);
      });
    },

         //消息推送
  // pushDoc (text) {
  //     this.$confirm('即将推送, 是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       let word = '《' +  text + '》'
  //       pushMessage(word, 1).then(res => {
  //         ////////////////////////////////////////////
  //         if (res.data.errorlist.length == 0) {
  //           this.$alert('已推送至全部部门!', '提示', {
  //             confirmButtonText: '确定',
  //             type: 'warning'
  //           })
  //         } else {
  //           let text = ''
  //           for (let i in res.data.errorlist) {
  //             let content = res.data.errorlist[i] + '，'
  //             text += content
  //           }
  //           text = text + '以上部门未推送成功'
  //           this.$alert(text, '提示', {
  //             confirmButtonText: '确定',
  //             type: 'warning'
  //           })
  //         }
  //         /////////////////////////////////////////////
  //       })
  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '取消推送'
  //       });          
  //     });
  //   },
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    stage (i) {
    console.log(i);
    
      if (i == 0) {
        return '通过'
      }
      if (i == 1) {
        return '不通过'
      }
    }
  },
  
};
</script>

<style lang="scss" scoped>
.pic-box {
  width: 100px;
  height: 80px;
  // overflow: hidden;
  // position: relative;
}
.pic {
  width: 100%;
  height: 100%;
  // position: absolute;
  // top: 50%;
  // transform: translate3d(0, -50%, 0);
}
</style>
