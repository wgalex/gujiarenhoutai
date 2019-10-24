<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">首页管理</h1>
    <el-input placeholder="请输入标题内容" v-model="remark" clearable></el-input>
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
        <el-button size="mini" type="primary" style="width: 96px;margin-top:10px;">上传图片</el-button>
      </el-upload>
      
      
    </el-row>
    <el-row type="flex" justify="center" class="title">
      <span>图片预览</span>
    </el-row>
    <el-row type="flex" justify="center" class="content">
      <template v-if="!bannerUrl">
        <span>暂无数据</span>
      </template>
      <template v-else>
        <div class="pic-box">
          <img :src="bannerUrl" alt class="pic" >
        </div>
      </template>
    </el-row>
    <el-button size="mini" type="primary" style="width: 96px; margin-top:10px" @click="edit">保存</el-button>
  </div>
</template>

<script>
import {
  addIndexComppic,
  editIndexComppic,
  getIndexComppic,
  delIndexComppic
} from "@/views/complaint/severApi/indexserver";
export default {
  data() {
    return {
      bannerUrl: null,
      remark: "",
      id: 1,
      imgurl: null,
      addFlag: ""
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    // 获取 banner
    getBanner() {
      getIndexComppic(this.id).then(res => {
        if (res.data == null) {
          this.addFlag = true;
          return;
        } else {
          this.bannerUrl = res.data.url;
          this.remark = res.data.remark;
          this.imgurl = res.data.url;
        }
      });
    },
    // 上传回调
    handleSuccess(res) {
      this.imgurl = res.data[1];
      this.bannerUrl = res.data[1];
      this.$refs.upload.clearFiles();
      console.log(res);
      
    },
    edit() {
      if (this.remark == "" || this.imgurl == null) {
        this.$alert("标题,或图片不能为空", {
          confirmButtonText: "确定"
        });
        return false;
      }
      if (this.addFlag == true) {
        addIndexComppic(this.imgurl, this.remark, this.id).then(res => {
          this.id = res.data.id
          if (res.code == 1000) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      } else {
        editIndexComppic(this.imgurl, this.remark, this.id).then(res => {
          // console.log(res);
          this.id = res.data.id
          if (res.code == 1000) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
      }
    }
  },
  components: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  padding: 10px;
  margin-top: 10px;
  background: #f8f4f4;
}
.content {
  padding: 20px 10px;
  font-size: 12px;
  background: #e7e7e7;
}
.pic-box {
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: relative;
}
.pic {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
</style>