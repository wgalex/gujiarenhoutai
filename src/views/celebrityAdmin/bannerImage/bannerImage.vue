<template>
  <div style="margin-top:10px">
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
      <el-button size="mini" type="primary" style="margin:20px 40px;" @click="dosave">保存</el-button>
    </div>
    <div
      style="width: 160px;height: 100px;border: 1px solid rgb(204, 204, 204);float: left;background-color: cyan;"
    >
      <p>上传图片规范:</p>
      <p>1125px x 2436px</p>
    </div>
  </div>
</template>
<script>
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
      imgurl: ""
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
      }
    }
};
</script>
<style lang="scss" scoped>
</style>