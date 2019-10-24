<template>
  <div class="form-box" >
    <h1 style="margin: 20px 0; font-size: 24px" >{{news.name}}</h1>
    <el-form :model="news" :rules="rules" label-width="110px" style="width: 800px" ref="newsform" >
      <el-form-item label="标题" prop="name" >
        <el-input v-model="news.name" ></el-input>
      </el-form-item>
      <el-form-item label="关键词" >
        <el-input v-model="news.keywords" ></el-input>
      </el-form-item>
      <el-form-item label="来源" >
        <el-input v-model="news.source" ></el-input>
      </el-form-item>
      <el-form-item label="期刊" style="width: 500px" >
        <el-col :span="10" >
          <el-form-item prop="magazine" >
            <el-select v-model="magazine" placeholder="请选择期刊" @change="searchMagazine" value-key="id"  >
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
      <el-form-item label="客户端" prop="clients" >
        <el-radio-group v-model="news.clients" >
          <el-radio label="w" >站点</el-radio>
          <el-radio label="g" >公众号</el-radio>
          <el-radio label="a" >APP</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="摘要" prop="summary" >
        <el-input v-model="news.summary" ></el-input>
      </el-form-item>
      <el-form-item label="预计发布时间" prop="advanceTime" >
        <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="news.advanceTime" 
          format="yyyy 年 MM 月 dd 日"
          value-format="MM/dd/yyyy"
          style="width: 200px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="评论设置" >
        <el-radio-group v-model="news.commentAuditRequired" >
          <el-radio label="1" >审核</el-radio>
          <el-radio label="0" >不审核</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row type="flex" justify="end" >
        <el-col :span="2" >
          <el-button type="success" @click="onSubmit" >保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addNews } from '@/api/addNews'
import { getDocument } from '@/api/getDoc'
import { getMagazinePage, getTypeList } from '@/api/pastList'
import { formatDate } from '@/common/js/date'
export default {
  data () {
    return {
      news: {
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
        // 预计发布时间
        advanceTime: '',
        // 评论设置
        commentAuditRequired: '0',
        // 不明参数
        commentMaxValue: 5,
        commentAllowed: 1,
        dianzanAllowed: 0,
        typeId: ''
      },
      rules: {
        name: [{required: true, message: '请输入标题',trigger: 'blur'}],
        magazine: [{required: true, message: '请选择期刊',trigger: 'change'}],
        typeId: [{required: true, message: '请选择栏目',trigger: 'change'}],
        contentType: [{required: true, message: '请选择资讯类型',trigger: 'blur'}],
        clients: [{required: true, message: '请选择客户端',trigger: 'blur'}],
        summary: [{required: true, message: '请输入摘要',trigger: 'blur'}],
        advanceTime: [{required: true, message: '请选择发布时间',trigger: 'change'}],
      },
      magazine: {
        name: '',
        id: ''
      },
      searchList: null,
      typeList: null,
      type: null,
    }
  },
  created () {
    getMagazinePage().then(res => {
      this.searchList = res.data.itemList
    })
    this._getDocument()
  },
  methods: {
    onSubmit () {
      console.log(this.news)
      this.$refs.newsform.validate(valid => {
        if (valid) {
          addNews(this.news).then(res => {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
            this.$router.back()
          })
        } else {
          console.log('error')
          return false
        }
      })
    },
    // 查找期刊文章列表 查找栏目列表
    searchMagazine (val) {
      this.news.magazine = this.magazine.name
      this.news.typeId = ''
      getTypeList(val.id).then(res => {
        this.typeList = res.data
        this.type =  null
      })
    },
    // 设置栏目
    setType (i) {
      this.news.typeFullPath = i.name
      this.news.typeId = i.id
    },
    // 格式化时间
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'MM/dd/yyyy')
    },
    // 获取数据
    _getDocument () {
      getDocument(this.$route.params.id).then(res => {
        // console.log(res.data)
        let data = res.data
        this.news.id = data.id
        this.news.name = data.name
        this.news.keywords = data.keywords
        this.news.source = data.source
        this.news.magazine = data.magazine
        this.news.typeFullPath = data.typeFullPath
        this.news.typeId = data.typeId
        this.news.contentType = res.data.contentType.toString()
        this.news.clients = data.clients
        this.news.summary = data.summary
        this.news.advanceTime = this.formatDate(res.data.advanceTime)
        this.news.commentAuditRequired = res.data.commentAuditRequired.toString()
      })
    }
  },
  filters: {
    // 客户端筛选
    platform (i) {
      if (i.indexOf('w') >= 0) {
        return '站点'
      }
      if (i.indexOf('g') >= 0) {
        return '公众号'
      }
      if (i.indexOf('a') >= 0) {
        return 'APP'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-box {
    position: relative;
    .el-form {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      margin-bottom: 50px;
      margin-top: 20px;
    }
  }
</style>
