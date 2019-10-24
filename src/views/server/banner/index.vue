<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >Banner 管理</h1>
    <el-row type="flex" justify="end" >
      <el-upload
        class="upload-demo mt"
        name="files"
        action="/kukacms/visitor/picUpload.htm?type=2"
        :on-success="handleSuccess"
        :show-file-list="false"
        :limit="1"
      >
        <el-button size="mini" type="primary" style="width: 96px;" >上传图片</el-button>
      </el-upload>
    </el-row>
    <el-row  type="flex" justify="center" class="title" >
      <span>图片预览</span>
    </el-row>
    <el-row type="flex" justify="center" class="content" >
      <template v-if="!bannerUrl" >
        <span>暂无数据</span>
      </template>
      <template v-else >
        <div class="pic-box">
          <img :src="bannerUrl" alt="" class="pic" >
        </div>
      </template>
    </el-row>
  </div>
</template>

<script>
import { getBannerPic, addBannerPic, updataBannerPic } from '@/views/server/api'
export default {
  data () {
    return {
      bannerUrl: null,
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    // 获取 banner
    getBanner () {
      getBannerPic().then(res => {
        this.bannerUrl = res.data.url
      })
    },
    // 上传回调
    handleSuccess (res) {
      if (!this.bannerUrl) {
        addBannerPic(res.data[1]).then(res => {
          this.bannerUrl = res.data.url
        });
        return false;
      }
      updataBannerPic(res.data[1]).then(res => {
        this.bannerUrl = res.data.url
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
      })
    }
  },
  components: {

  }
}
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
    width: 375px;
    height: 80px;
    overflow: hidden;
    position: relative;
  }
  .pic {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0)
  }
</style>