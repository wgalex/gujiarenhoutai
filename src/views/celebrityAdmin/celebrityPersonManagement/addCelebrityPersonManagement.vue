<template>
  <div class="form-box">
    <h1 style="margin: 20px 0; font-size: 24px">案例添加</h1>
    <el-form label-width="110px" style="width: 800px" ref="newsform">
      <el-form-item label="人员名称" style="margin-top:10px">
        <el-input v-model.trim="personName"></el-input>
      </el-form-item>
     <el-form-item label="人员工号" style="margin-top:10px">
        <el-input v-model.trim="personCode"></el-input>
      </el-form-item>
      <el-form-item label="标题" style="margin-top:10px">
        <el-input v-model.trim="title"></el-input>
      </el-form-item>
      <el-form-item label="奖励id" style="margin-top:10px">
        <el-input v-model.trim="awardName"></el-input>
      </el-form-item>
      <el-form-item label="创建人名称" style="margin-top:10px">
        <el-input v-model.trim="createby"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" style="margin-top:10px">
        <el-input v-model.trim="createtime"></el-input>
      </el-form-item>
      <el-form-item label="最后更新人名称" style="margin-top:10px">
        <el-input v-model.trim="updateby"></el-input>
      </el-form-item>
      <el-form-item label="最后更新时间" style="margin-top:10px">
        <el-input v-model.trim="updatetime"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top:10px">
        <el-input v-model.trim="description"></el-input>
      </el-form-item>
      <!-- 文本编辑器 -->
      <tiny @input="saveEditor" class="tiny" v-model="content">
        <!-- 上传封面图 -->

       

        <!-- <el-row class="mt" >
              <el-button size="mini" type="primary" style="width: 96px;"  @click="show=true" >裁剪封面图</el-button>
        </el-row>-->

        <!-- <el-button class="mt" size="mini" type="primary" @click="select" style="width: 96px;" >从正文选择</el-button> -->
        <el-row class="mt">
          <p>封面预览</p>
        </el-row>
        <el-row v-if="this.covers">
          <div style="width: 200px">
            <img :src=" this.covers" alt style="width: 100%">
          </div>
        </el-row>
      </tiny>

      <!-- 保存操作 -->
      <!-- <div class="footer-nav">
        <el-button type="success" class="btn" @click="backList" >返回</el-button>
        <el-button type="warning" class="btn" @click="onSubmit" >保存待发送</el-button>
      </div>-->
    </el-form>
    <cropper
      url="/kukacms/visitor/picUpload.htm?type=2"
      field="files"
      @crop-upload-success="setImg"
      :value="show"
      @close="show=false"
    ></cropper>
   
     <el-upload
          class="upload-demo mt"
          name="files"
          action="/kukacms/visitor/picUpload.htm?type=8"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          :show-file-list="false"
          multiple
          :limit="1"
        >
          <el-button size="mini" type="primary" style="width: 96px; margin-left:300px">自定义封面</el-button>
           
        </el-upload>
        <el-button type="primary" @click="save" style="width: 96px; margin-left:300px;margin-top:10px;" size="mini">保存</el-button>
       
  </div>
</template>

<script>
import cropper from "./ImageCroppers/index";
// import { getTypeAuditList, addNews, updataMobile, updataNews } from './news'
import {
    
} from "@/views/celebrityAdmin/severApi/celebrityPerson";
import { formatDate } from "@/common/js/date";
import tiny from "@/components/Tinymce/index";
import { getMagazinePage } from "@/api/magList";
export default {
  props: {
    news: {
      type: Object,
      default: () => {
        return {
            addPerson:{
                personName:'',
                personCode:'',
                tittle:'',
                awardId:'',
                awardName:'',
                filePath:'',
                photoPath:'',
                createby:'',
                description:'',
            }
        };
      }
    }
  },
  data() {
    return {
      show: false,
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        magazine: [
          { required: true, message: "请选择期刊", trigger: "change" }
        ],
        typeId: [{ required: true, message: "请选择栏目", trigger: "change" }],
        keywords: [
          { required: true, message: "请输入部门/作者", trigger: "blur" }
        ],
        // type: [{required: true, message: '请选择栏目',trigger: 'change'}],
        contentType: [
          { required: true, message: "请选择资讯类型", trigger: "blur" }
        ],
        clients: [{ required: true, message: "请选择客户端", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }]
      },
      searchList: [],
      magazine: "",
      typeList: "",
      type: "",
      fileList: [],
      dialogFormVisible: false,
      picList: [],
      index: "",
      status: "",
      content: "",
      covers: "",
      imhurl: "",
      title: ""
    };
  },
  created() {
    // this.type = this.news.typeId
    // this._getMagazineList()
    if (!this.$route.query.id) {
      this.status = "0";
    }
    // this.getcase();
  },
  // mounted () {
  //   setTimeout(() => {
  //     this.magazine = this.news.magazine
  //     this.type = this.news.typeName

  //   }, 2000)

  // },
  methods: {
    //編輯頁回填
    getcase() {
      getcasebyId(this.$route.query.id).then(res => {
        // console.log(res)
        this.content = res.data.content;
        this.covers = res.data.covers;
        this.title = res.data.title;
        this.status = res.data.status + "";
      });
    },

   
    save() {
      if (this.$route.query.id) {
        const editSubmit = {};
        editSubmit.title = this.title;
        editSubmit.content = this.content;
        editSubmit.status = this.status;
        editSubmit.covers = this.covers;
        editSubmit.id = this.$route.query.id;
        if (
            this.title == "" ||
            this.content == "" ||
            this.status == "" ||
            this.covers == ""
          ) {
            this.$alert("标题,或封面,审核设置不能为空", {
              confirmButtonText: "确定"
            });
            return false;
          }
        editcase(
          editSubmit
        ).then(res => {
          console.log(res);
          
          if (res.code == 1000) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.push({
              path: "listCaseComp"
            });
          }
        });
      } else {
        const addSubmit = {};
        addSubmit.title = this.title;
        addSubmit.content = this.content;
        addSubmit.status = this.status;
        addSubmit.covers = this.covers;
        // editSubmit.id =  this.$route.query.id
         if (
            this.title == "" ||
            this.content == "" ||
            this.status == "" ||
            this.covers == ""
          ) {
            this.$alert("标题,或封面,评论设置不能为空", {
              confirmButtonText: "确定"
            });
            return false;
          }
        addcase(addSubmit).then(res => {
          console.log(res);
          if (res.code == 1000) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push({
              path: "listCaseComp"
            });
          }
        });
      }
    },
    // else {
    //   this.$refs.newsform.validate(valid => {
    //     if (valid) {
    //       console.log(this.news)
    //       this.news.position = 2
    //       addNews(this.news).then(res => {
    //         this.$message({
    //           message: res.message,
    //           type: 'success',
    //           duration: 3 * 1000
    //         })
    //         this.$router.push({
    //           path: '/index/pastList'
    //         })
    //       })
    //     } else {
    //       console.log('error')
    //       return false
    //     }
    //   })
    // }
    // this.$refs.newsform.validate(valid => {
    //   if (valid) {
    //     console.log(this.news)
    //     this.news.position = 2
    //     addNews(this.news).then(res => {
    //       this.$message({
    //         message: res.message,
    //         type: 'success',
    //         duration: 3 * 1000
    //       })
    //     })
    //   } else {
    //     console.log('error')
    //     return false
    //   }
    // })

    // 同步编辑器
    saveEditor(i) {
      // console.log(i)
      this.mobileContent = i;
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file) {
      // console.log(file)
      console.log(response.data[1]);
      this.covers = response.data[1];
    },
    setImg(data) {
      this.news.covers = data[1];
    },
    select() {
      this.dialogFormVisible = true;
      let data = {
        content: this.mobileContent
      };
      updataMobile(data).then(res => {
        console.log(res.data);
        this.picList = res.data;
      });
    },
    setimg(i, index) {
      this.index = index;
      this.news.covers = i;
    },
    saveCover() {},
  },
 
  components: {
    tiny,
    cropper
  }
};
</script>


<style lang="scss" scoped>
.form-box {
}
.tiny {
  margin: 20px 0;
  padding-bottom: 10px;
}

.picstyle {
  width: 100px;
  height: 50px;
  margin: 20px;
}

.sel {
  border: 1px solid #67c23a;
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
  margin-top: -10px;
}
</style>