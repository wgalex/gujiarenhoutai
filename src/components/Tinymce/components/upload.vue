<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传文件
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" action="/kukacms/visitor/picUpload.htm?type=8" :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" name="files" >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-row style="margin-top: 10px" >
        <el-button @click="dialogVisible = false" size="mini" >取 消</el-button>
        <el-button type="primary" @click="handleSubmit" size="mini" >确 定</el-button>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      file: {}
    }
  },
  methods: {
    // checkAllSuccess() {
    //   return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    // },
    handleSubmit() {
      
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      
      // if (!this.checkAllSuccess()) {
      //   this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
      //   return
      // }
      
      this.$emit('successCBK', this.file)
      this.listObj = {}
      this.fileList = []
      this.file = {}
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log(file)
      console.log(response)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          // 设置图片地址
          this.listObj[objKeyArr[i]].url = response.data[1]
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
      this.file = response
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.src = _URL.createObjectURL(file)
        // console.log(file.uid)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
