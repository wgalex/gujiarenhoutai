<template>
  <div style="margin-top:10px;position: rea;">
    <img :src="bannerUrl" style="width:500px;height:500px;float:left" alt />
    <div style="float:left; margin-left:30px">
      <el-upload
        action="/kukacms/visitor/picUpload.htm?type=8"
        list-type="picture-card"
        :auto-upload="true"
        :on-success="handleSuccess2"
        :on-preview="handlePictureCardPreview2"
        name="files"
        :on-remove="handleRemove2"
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <div>
        <el-button
          size="mini"
          type="primary"
          style="margin:20px 40px;display: block;"
          @click="dosave"
        >保存</el-button>
        <!-- <el-button
          size="mini"
          type="primary"
          @click="dialog3 = true"
          style="margin: 20px 40px;display: block;"
        >全体消息推送</el-button> -->
        <!-- <el-button
          size="mini"
          type="primary"
          @click="dialog4 = true"
          style="margin: 20px 40px;"
        >部门消息推送</el-button> -->
      </div>
      <!-- <el-dialog title="部门消息推送" :visible.sync="dialog4" :append-to-body="true">
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
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="items in listobj"
              :key="items.departId"
              :command="items"
            >{{items.departname}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input v-model.trim="pushValue1"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog4 = false">取 消</el-button>
          <el-button type="primary" @click="pushDepMessage">确认</el-button>
        </span>
      </el-dialog> -->
    </div>

    <div
      style="width: 160px;height: 100px;border: 1px solid rgb(204, 204, 204);float: left;background-color: cyan;"
    >
      <p>上传图片规范:</p>
      <p>612px x 340px</p>
    </div>
    <div></div>
  </div>
</template>
<script>
import {
  push,
  getdepart,
  pushdepart
} from "@/views/celebrityAdmin/severApi/pushMessage";
import {
  editIndexComppic,
  addIndexComppic,
  getIndexComppic
} from "@/views/celebrityAdmin/severApi/indexserver";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      id: 1,
      bannerUrl: "",
      imgurl: "",
      dialog3: false,
      pushValue: "",
      pushValue1: "",
      options: {
        fullscreen: true
      },
      listobj: [],
      dialog4: false,
      selectdepart: "更多部门",
      selectdepartid: ""
    };
  },
  created() {
    this.getBannner();
    // this.getdepart();
  },
  methods: {
    handleCommand(command) {
      this.selectdepart = command.departname;
      this.selectdepartid = command.departId;
    },
    // getdepart() {
    //   let that = this;
    //   let loadingInstance = Loading.service(that.options);
    //   getdepart(that.pushValue).then(res => {
    //     let dataObj = res.data;
    //     let listobjs = [];
    //     for (let i in dataObj) {
    //       let o = {};
    //       o.departId = i;
    //       o.departname = dataObj[i];
    //       listobjs.push(o);
    //     }
    //     // console.log(that.listobj);
    //     that.listobj = listobjs;
    //     loadingInstance.close();
    //   });
    // },
    getBannner() {
      getIndexComppic(this.id).then(res => {
        this.bannerUrl = res.data.url;
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleSuccess2(response, file) {
      this.imgurl = response.data[1];
      this.getBannner()
    },
    handlePictureCardPreview2(file) {
      this.dialogVisible = true;
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    dosave() {
      editIndexComppic(this.imgurl, this.id).then(res => {
        // console.log(res);
        this.id = res.data.id;
        if (res.code == 1000) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.getBannner();
        }
      });
    },
    pushMessage() {
      this.$confirm("即将推送, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          push(this.pushValue).then(res => {
            this.$message({
              type: "success",
              message: "已推送!"
            });
            this.dialog3 = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消推送"
          });
        });
    },
    pushDepMessage() {
      this.$confirm("即将推送" + this.selectdepart + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pushdepart(this.pushValue1, this.selectdepartid).then(res => {
            this.$message({
              type: "success",
              message: "已推送!"
            });
            this.dialog3 = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消推送"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>