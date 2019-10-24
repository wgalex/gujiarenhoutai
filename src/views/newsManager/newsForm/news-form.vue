<template>
  <div class="form-box">
    <el-form :model="news" :rules="rules" label-width="110px" style="width: 800px" ref="newsform" >
      <el-form-item label="标题" prop="name" >
        <el-input v-model="news.name" ></el-input>
      </el-form-item>
      <el-form-item label="部门 / 作者" prop="keywords" >
        <el-input v-model="news.keywords" placeholder="请按: ‘部门 / 作者’ 格式填写" ></el-input>
      </el-form-item>
      <!-- <el-form-item label="作者" >
        <el-input v-model="news.source" ></el-input>
      </el-form-item> -->
      <el-form-item label="期刊" style="width: 500px" >
        <el-col :span="10" >
          <el-form-item prop="magazine" >
            <el-select v-model="magazine" placeholder="请选择期刊" @change="searchMagazine" value-key="name"  >
              <el-option
                v-for="item in searchList"
                :key="item.id"
                :label="item.name" 
                :value="item" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin: 0 15px" >
          栏目
        </el-col>
        <el-col :span="10" >
          <el-form-item prop="typeId" >
            <el-select 
              v-model="type"
              @change="setType"
              value-key="id"
              placeholder="请选择栏目" >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="资讯类型" prop="contentType" >
        <el-select v-model="news.contentType" placeholder="选择类型" >
          <el-option label="图文结合" value="0" ></el-option>
          <el-option label="图片资讯" value="1" ></el-option>
          <el-option label="视频资讯" value="2" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要" prop="summary" >
        <el-input v-model="news.summary" ></el-input>
      </el-form-item>
      <el-form-item label="评论设置" >
        <el-radio-group v-model="news.commentAuditRequired" >
          <el-radio label="1" >审核</el-radio>
          <el-radio label="0" >不审核</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 文本编辑器 -->
      <tiny @input="saveEditor" class="tiny" v-model="news.mobileContent" >
        <!-- 上传封面图 -->

            <el-upload
              class="upload-demo mt"
              name="files"
              action="/kukacms/visitor/picUpload.htm?type=2"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              :show-file-list="false"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="mini" type="primary" style="width: 96px;" >自定义封面</el-button>
            </el-upload>
            <el-row class="mt" >
              <el-button size="mini" type="primary" style="width: 96px;"  @click="show=true" >裁剪封面图</el-button>
            </el-row>

            <el-button class="mt" size="mini" type="primary" @click="select" style="width: 96px;" >从正文选择</el-button>
            <el-row class="mt" >
              <p>封面预览</p>
            </el-row>
            <el-row v-if="news.covers" >
              <div style="width: 200px" >
                <img :src=" news.covers" alt="" style="width: 100%"  >
              </div>
            </el-row>
      </tiny>


      <!-- 保存操作 -->
      <div class="footer-nav">
        <el-button type="success" class="btn" @click="backList" >返回</el-button>
        <el-button type="warning" class="btn" @click="onSubmit" >保存待发送</el-button>
      </div>


    </el-form>
    <cropper url="/kukacms/visitor/picUpload.htm?type=2" field="files" @crop-upload-success="setImg" :value="show" @close="show=false" ></cropper>
    <!-- 选择表单 -->
    <el-dialog 
      title="选择封面图" 
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <img :src="item" alt="" v-for="(item, i) in picList" :key="i" class="picstyle" @click="setimg(item, i)" :class="{sel: index == i}" >
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" >保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import cropper from './ImageCropper/index'
import { getTypeAuditList, addNews, updataMobile, updataNews } from './news'
import tiny from '@/components/Tinymce/index'
import { getMagazinePage } from '@/api/magList'
export default {
  props: {
    news: {
      type: Object,
      default: () => {
        return {
          id: '',
          // 标题
          name: '',
          // 关键词
          keywords: '',
          // 来源
          source: '',
          // 期刊
          magazine: '',
          // 栏目
          typeFullPath: '',
          // 资讯类型
          contentType: '0',
          // 客户端
          clients: 'a',
          // 摘要
          summary: '',
          // 评论设置
          commentAuditRequired: '0',
          // 不明参数
          commentMaxValue: 5,
          commentAllowed: 1,
          dianzanAllowed: 0,
          typeId: '',
          position: '0',
          mobileContent: '',
          covers: ''
        }
      }
    }
  },
  data () {
    return {
      show: false,
      rules: {
        name: [{required: true, message: '请输入标题',trigger: 'blur'}],
        magazine: [{required: true, message: '请选择期刊',trigger: 'change'}],
        typeId: [{required: true, message: '请选择栏目',trigger: 'change'}],
        keywords: [{required: true, message: '请输入部门/作者',trigger: 'blur'}],
        // type: [{required: true, message: '请选择栏目',trigger: 'change'}],
        contentType: [{required: true, message: '请选择资讯类型',trigger: 'blur'}],
        clients: [{required: true, message: '请选择客户端',trigger: 'blur'}],
        summary: [{required: true, message: '请输入摘要',trigger: 'blur'}],
      },
      searchList: [],
      magazine: '',
      typeList: '',
      type: '',
      fileList: [],
      dialogFormVisible: false,
      picList: [],
      index: ''
    }
  },
  created () {
    
    // this.type = this.news.typeId
    this._getMagazineList()
  },
  mounted () {
    setTimeout(() => {
      this.magazine = this.news.magazine
      this.type = this.news.typeName

    }, 2000)
    
  },
  methods: {
    backList () {
      this.$router.push({
        path: '/index/pastList'
      })
    },
    _getMagazineList () {
      getMagazinePage(1).then(res => {
        // console.log(res.data.itemList)
        this.searchList = res.data.itemList
      })
    },
    // 查找期刊文章列表 查找栏目列表
    searchMagazine (val) {
      this.news.magazine = this.magazine.name
      this.news.typeId = ''
      getTypeAuditList(val.name).then(res => {
        this.typeList = res.data
        this.type =  null
      })
    },
    // 设置栏目
    setType (i) {
      this.news.typeFullPath = i.name
      this.news.typeId = i.id
    },
    // 保存
    onSubmit () {
      if (this.news.keywords.indexOf('/') < 0) {
        this.$alert('请按: ‘部门 / 作者’ 格式填写部门与作者', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$refs.newsform.validate(valid => {
        if (valid) {
          this.news.position = 0
          addNews(this.news).then(res => {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
            this.$router.push({
              path: '/index/pastList'
            })
          })
        } else {
          console.log('error')
          return false
        }
      })

    },
    onSubmitUp () {
      if (this.$route.query.id) {
        this.$refs.newsform.validate(valid => {
          if (valid) {
            console.log(this.news)
            this.news.position = 2
            updataNews(this.news).then(res => {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 3 * 1000
              })
              this.$router.push({
                path: '/index/pastList'
              })
            })
          } else {
            console.log('error')
            return false
          }
        })
      } else {
        this.$refs.newsform.validate(valid => {
          if (valid) {
            console.log(this.news)
            this.news.position = 2
            addNews(this.news).then(res => {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 3 * 1000
              })
              this.$router.push({
                path: '/index/pastList'
              })
            })
          } else {
            console.log('error')
            return false
          }
        })
      }
      this.$refs.newsform.validate(valid => {
        if (valid) {
          console.log(this.news)
          this.news.position = 2
          addNews(this.news).then(res => {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
          })
        } else {
          console.log('error')
          return false
        }
      })
    },
    // 同步编辑器
    saveEditor (i) {
      // console.log(i)
      this.news.mobileContent = i
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response, file) {
      // console.log(file)
      console.log(response.data[1])
      this.news.covers = response.data[1]
    },
    setImg (data) {
      this.news.covers = data[1]
    },
    select () {
      this.dialogFormVisible = true
      let data = {
        content: this.news.mobileContent
      }
      updataMobile(data).then(res => {
        console.log(res.data)
        this.picList = res.data
      })
    },
    setimg (i, index) {
      this.index = index
      this.news.covers = i
    },
    saveCover () {

    }
  },
  components: {
    tiny,
    cropper
  }
}
</script>


<style lang="scss" scoped>
  .form-box {

  }
  .tiny {
    margin: 20px 0;
    padding-bottom: 10px
  }

  .picstyle {
    width: 100px;
    height: 50px;
    margin: 20px;
  }

  .sel {
    border: 1px solid #67c23a
  }

  .footer-nav {
    position: fixed;
    z-index: 1;
    // width: 100%;
    padding-right: 150px;
    left: 0;
    right: 0;
    height: 60px;
    line-height: 60px;
    bottom: 0;
    border-top: 1px solid #999999;
    background: #ffffff;
  }
  .btn {
    float: right;
    margin: 10px 10px;
  }

  .mt {
    margin-top: 10px;
  }
</style>