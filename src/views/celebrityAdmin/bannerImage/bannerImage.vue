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
          <el-button size="mini" type="primary" style="margin:20px 40px;display: block;" @click="dosave">保存</el-button>
          <el-button size="mini" type='primary' @click="dialog3 = true" style="margin: 20px 40px;"> 全体消息推送</el-button>
      </div>
      <el-dialog
      title="全体消息推送"
      :visible.sync="dialog3"
      :append-to-body="true"
    >
      <el-input v-model.trim="pushValue"></el-input>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="pushMessage" >确认</el-button>
      </span>
    </el-dialog>

    </div>

    <div
      style="width: 160px;height: 100px;border: 1px solid rgb(204, 204, 204);float: left;background-color: cyan;"
    >
      <p>上传图片规范:</p>
      <p>1125px x 2436px</p>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import {
  push
} from "@/views/celebrityAdmin/severApi/pushMessage";
import {
  editIndexComppic,
  addIndexComppic,
  getIndexComppic
} from "@/views/celebrityAdmin/severApi/indexserver";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      id: 1,
      bannerUrl: "",
      imgurl: "",
      dialog3:false,
      pushValue:""
    };
  },
  created() {
    this.getBannner()
  },
  methods: {
    getBannner(){
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
            this.getBannner()
          }
        });
      },
      pushMessage(){
        debugger
        this.$confirm('即将推送, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        push(this.pushValue).then(res => {
          this.$message({
            type: 'success',
            message: '已推送!'
          });
          this.dialog3 = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消推送'
        });          
      });
      }
    }
};
</script>
<style lang="scss" scoped>
</style>