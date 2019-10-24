<template>
  <div class="news-container">
    <!-- 新建表单 -->
    <news-form :news="news" ></news-form>

  </div>
</template>

<script>
import axios from 'axios'
import newsForm from './newsForm/news-form'
import tiny from '@/components/Tinymce/index'
import { addNews, getDocument, updataNews } from '@/api/addNews'
import { getMagazinePage, getTypeList, getTypeAuditList } from '@/api/pastList'

export default {
  data () {
    return {
      news: {},
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
        // advanceTime: '',
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
      },
      rules: {
        name: [{required: true, message: '请输入标题',trigger: 'blur'}],
        magazine: [{required: true, message: '请选择期刊',trigger: 'change'}],
        typeId: [{required: true, message: '请选择栏目',trigger: 'change'}],
        contentType: [{required: true, message: '请选择资讯类型',trigger: 'blur'}],
        clients: [{required: true, message: '请选择客户端',trigger: 'blur'}],
        summary: [{required: true, message: '请输入摘要',trigger: 'blur'}],
        // advanceTime: [{required: true, message: '请选择发布时间',trigger: 'change'}],
      },
      magazine: null,
      searchList: null,
      typeList: null,
      type: null,
    }
  },
  created () {
    if (this.$route.query.id) {
      getDocument(this.$route.query.id).then(res => {
        console.log(res)
        console.log(res.data.magazine)
        this.news = res.data
        this.news.contentType = res.data.contentType.toString()
        this.news.commentAuditRequired = res.data.commentAuditRequired.toString()
      })
    }

    getMagazinePage().then(res => {
      this.searchList = res.data.itemList
    })
  },
  methods: {
    saveEditor (i) {
      console.log(i)
      this.news.mobileContent = i
    },
    onSubmit () {
      this.$refs.newsform.validate(valid => {
        if (valid) {
          this.news.position = 0
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
    onSubmitUp () {
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

    update (e) {
          let file = e.target.files[0];           
          let param = new FormData(); //创建form对象
          param.append('file',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头
          // this.axios.post('http://upload.qiniu.com/',param,config)
          // .then(response=>{
          //   console.log(response.data);
          // })   
    }
  },
  components: {
    newsForm,
    tiny
  }
}
</script>

<style lang="scss" scoped>
  .news-container {
    padding: 20px 0;
  }


  .form-box {
    position: relative;
    .el-form {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      margin-bottom: 50px;
      margin-top: 20px;
      padding-bottom: 250px;
    }
  }
</style>

