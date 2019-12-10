<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">名人列表</h1>
    <el-row style="margin-bottom: 10px; float: right;">
      <el-col>
        <!-- <el-button size="mini" type="primary" @click="unStatus">切换状态显示列表</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="Status">审核评论显示</el-button>         -->
        <el-button type="primary" size="mini" class="btn" @click="add">新增</el-button>
        <el-button size="mini" type="primary" @click="upPages">上一页</el-button>
        <span>{{curPage}}</span>
        <el-button size="mini" type="primary" @click="nextPages">下一页</el-button>
        <!-- <el-button type="primary" size="mini"><a :href="outUrl" download style="color: #fff">导出</a></el-button> -->
      </el-col>
    </el-row>
    <el-table :data="list" border>
      <el-table-column align="center" type="index" label="序号" prop="id"></el-table-column>
      <el-table-column align="center" label="获奖年份" prop="years"></el-table-column>
      <el-table-column align="center" prop="personName" label="获奖人员"></el-table-column>
      <el-table-column align="center" prop="personCode" label="工号"></el-table-column>
      <el-table-column align="center" prop="categoryName" label="奖励名"></el-table-column>
      <!-- <el-table-column align="center" prop="headPath" label="头像"></el-table-column> -->
      <el-table-column align="center" prop="headPath" label="头像" style="font-size: 8px">
        <template slot-scope="scope" v-if="scope.row.headPath">
          <div class="pic-box">
            <img :src="scope.row.headPath" alt class="pic" v-image-preview />
            <!-- <el-button type="primary" size="mini"><a :href="scope.row.headPath" style="text-decoration: none;color:#fff">文件</a></el-button> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="photoPath" label="图片附件">
        <template slot-scope="scope">
          <i
            class="el-icon-picture"
            @click="jumpphoto(scope.row.photoPath)"
            v-if="scope.row.photoPath"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频附件">
        <template slot-scope="scope">
          <!-- <el-button  type="primary" size="mini" @click="pushDoc">消息推送</el-button> -->
          <!-- <el-button type="primary" size="mini" @click="editor(scope.row)">编辑</el-button> -->
          <i
            class="el-icon-video-play"
            @click="jumpVideo(scope.row.filePath)"
            v-if="scope.row.filePath"
          ></i>
          <!-- <el-button type="danger" size="mini" @click="add(scope.row.id)">新增</el-button> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="人物简介" min-width="200px"></el-table-column>
      <el-table-column align="center" prop="createby" label="创建人"></el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <p>{{scope.row.createtime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateby" label="更新人"></el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <p>{{scope.row.updatetime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button  type="primary" size="mini" @click="pushDoc">消息推送</el-button> -->
          <el-button type="primary" size="mini" @click="editor(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="pushAllmes(scope.row)">全体推送</el-button>
          <el-button type="primary" size="mini" @click="departmes(scope.row)">部门推送</el-button>
          <!-- <el-button type="danger" size="mini" @click="add(scope.row.id)">新增</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="部门消息推送" :visible.sync="dialog4" :append-to-body="true">
      <el-dropdown
        style="margin-bottom: 20px;"
        placement="bottom-end"
        size="small"
        @command="handleCommand"
      >
        <el-button type="primary">
          {{selectdepart}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="project-dropdown">
          <el-dropdown-item
            v-for="items in listobj"
            :key="items.departId"
            :command="items"
          >{{items.departname}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-input v-model.trim="pushValue1"></el-input> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog4 = false">取 消</el-button>
        <el-button type="primary" @click="pushDepMessage">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  push,
  getdepart,
  pushdepart
} from "@/views/celebrityAdmin/severApi/pushMessage";
import { formatDate } from "@/common/js/date";
import {
  queryCelebrityPerson,
  addCelebrityPerson,
  queryIdLevel,
  editCelebrityPerson
} from "@/views/celebrityAdmin/severApi/celebrityPerson";
import { Loading } from "element-ui";
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
      catorObj: "",
      editId: "",
      dialog4: false,
      listobj: [],
      selectdepart: "请选择",
      selectdepartid: "",
      pushdepartmes: ""
    };
  },
  created() {
    let queryData = {};
    this.catorObj = this.$route.query.catorObj;
    if (this.catorObj.categoryCode == undefined) {
      if (this.$store.state.user.categoryCode == "") {
        queryData.categoryCode = "00000";
      } else {
        queryData.categoryCode = this.$store.state.user.categoryCode;
      }
    } else {
      queryData.categoryCode = this.catorObj.categoryCode;
      this.$store.commit("setCatagroycode", this.catorObj.categoryCode);
    }
    queryCelebrityPerson(queryData).then(res => {
      this.list = res.data.itemList;
    });
    this.getdepart();
  },
  methods: {
    handleCommand(command) {
      this.selectdepart = command.departname;
      this.selectdepartid = command.departId;
    },
    departmes(item) {
      this.dialog4 = true;
      this.pushdepartmes =
        "" +
        item.personName +
        "荣获" +
        item.years +
        "年" +
        item.categoryName +
        "";
      // debugger
    },
    getdepart() {
      let that = this;
      // let loadingInstance = Loading.service(that.options);
      if(localStorage.getItem('listobjs') != null){
        that.listobj = JSON.parse(localStorage.getItem('listobjs'));
        loadingInstance.close();
        return
      }
      getdepart(that.pushValue).then(res => {
        let dataObj = res.data;
        let listobjs = [];
        for (let i in dataObj) {
          let o = {};
          o.departId = i;
          o.departname = dataObj[i];
          listobjs.push(o);
        }
        // console.log(that.listobj);
        that.listobj = listobjs;
        let litp =JSON.stringify(listobjs)
        localStorage.setItem('listobjs', litp)
        loadingInstance.close();
      });
    },
    pushDepMessage() {
      this.$confirm("即将推送" + this.selectdepart + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pushdepart(this.pushdepartmes, this.selectdepartid).then(res => {
            this.$message({
              type: "success",
              message: "已推送!"
            });
            this.dialog4 = false;
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消推送"
          });
        });
    },
    pushAllmes(item) {
      debugger
      let pushAllmesage =
        "" +
        item.personName +
        "荣获" +
        item.years +
        "年" +
        item.categoryName +
        "";
      // http://www.rc.kukahome.com:8880/mrt/#/honorRealDetail
      let url = 'http://www.rc.kukahome.com:8880/mrt/#/honorRealDetail?personCode='+item.personCode +'&categoryName='+item.categoryName+''
      console.log(url);
      this.$confirm("即将全体推送, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        return
          push(pushAllmesage).then(res => {
            this.$message({
              type: "success",
              message: "已推送!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消推送"
          });
        });
    },
    upPages() {
      let queryData = {};
      this.catorObj = this.$route.query.catorObj;
      if (this.catorObj.categoryCode == undefined) {
        if (this.$store.state.user.categoryCode == "") {
          queryData.categoryCode = "00000";
        } else {
          queryData.categoryCode = this.$store.state.user.categoryCode;
        }
      } else {
        queryData.categoryCode = this.catorObj.categoryCode;
        this.$store.commit("setCatagroycode", this.catorObj.categoryCode);
      }
      if (this.curPage == 1) {
        return;
      }
      if (this.prePage == true) {
        this.curPage--;
        queryData.curPage = this.curPage;
        queryData.sizePage = 15;
        queryCelebrityPerson(queryData).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    nextPages() {
      let queryData = {};
      this.catorObj = this.$route.query.catorObj;
      if (this.catorObj.categoryCode == undefined) {
        if (this.$store.state.user.categoryCode == "") {
          queryData.categoryCode = "00000";
        } else {
          queryData.categoryCode = this.$store.state.user.categoryCode;
        }
      } else {
        queryData.categoryCode = this.catorObj.categoryCode;
        this.$store.commit("setCatagroycode", this.catorObj.categoryCode);
      }
      if (this.nextPage == true) {
        this.curPage++;
        queryData.curPage = this.curPage;
        queryData.sizePage = 15;
        queryCelebrityPerson(queryData).then(res => {
          this.list = res.data.itemList;
          this.nextPage = res.data.nextPage;
          this.prePage = res.data.prePage;
        });
      }
    },
    handleSuccess(res) {
      // console.log(res);
      this.covers = res.data[1];
      this.bannerUrl = res.data[1];
      this.$refs.upload.clearFiles();
    },
    editor(row) {
      this.$router.push({
        name: "editCelebrityPersonManagement",
        query: {
          row: row
        }
      });
    },
    add() {
      let catorObjs = this.$route.query.catorObj;
      this.$router.push({
        name: "addCelebrityPersonManagement",
        query: {
          catorObjs: catorObjs
        }
      });
    },
    jumpVideo(filePath) {
      window.open(filePath);
    },
    jumpphoto(photoPath) {
      window.open(photoPath);
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
      if (this.status == 1) {
        this.status = 0;
      } else {
        this.status = 1;
      }
      getcasebytitle(this.curPage, this.sizePage, this.status).then(res => {
        this.list = res.data.itemList;
        this.nextPage = res.data.nextPage;
        this.prePage = res.data.prePage;
        // this.max = res.data.totalPage
        // console.log(res);
      });
    }

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
    stage(i) {
      console.log(i);

      if (i == 0) {
        return "通过";
      }
      if (i == 1) {
        return "不通过";
      }
    }
  },
  computed: {
    outUrl() {
      let url = "";
      // let url = '/kukacms/visitor/exportExcel.htm?magazine=《顾家人》2018年5月上半刊（总第135期）'
      return url;
    }
  }
};
</script>

<style lang="scss" scoped>
.pic-box {
  border: 0;
  width: 50px;
  height: 50px;
  overflow: hidden;
  .pic {
    width: 100%;
    height: 100%;
  }
}
.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: automatic;
}
.project-dropdown{
  //设置高度才能显示出滚动条 !important
  height:300px;
  overflow: auto;
}
.project-dropdown::-webkit-scrollbar
{
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
}
.project-dropdown::-webkit-scrollbar-track
{
    //-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}
</style>
