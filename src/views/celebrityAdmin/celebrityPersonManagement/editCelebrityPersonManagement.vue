<template>
  <div class="form-box" style="width:1200px">
    <h1 style="margin: 20px 0; font-size: 24px">获奖人员添加</h1>
    <el-form label-width="110px" style="width: 800px;float:left" ref="editPerson" :rules="rules" :model="editPerson">
      <el-form-item label="获奖名称" style="margin-top:10px" prop="categoryName">
        <el-input v-model.trim="editPerson.categoryName" disabled></el-input>
      </el-form-item>
      <el-form-item label="人员名称" style="margin-top:10px" prop="personName">
        <el-input v-model.trim="editPerson.personName"></el-input>
      </el-form-item>
     <el-form-item label="人员工号" style="margin-top:10px" prop="personCode">
        <el-input v-model.trim="editPerson.personCode"></el-input>
      </el-form-item>
      <el-form-item label="年份" style="margin-top:10px" prop="years" >
        <div class="block">
          <!-- <span class="demonstration">年</span> -->
          <el-date-picker v-model="editPerson.years" type="year" placeholder="选择年"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="标题" style="margin-top:10px " prop="tittle">
        <el-input v-model.trim="editPerson.tittle"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top:10px" prop="description">
        <el-input v-model.trim="editPerson.description"></el-input>
      </el-form-item>
    </el-form>
    <div  style="float:left;width: 200px;height:200px;margin-left:10px">
        <img :src=" this.covers" alt style="width: 200px;height:200px">
    </div>
    <div style="float:right;width:155px">
    <el-upload 
          class="upload-demo mt"
          name="files"
          action="/kukacms/visitor/picUpload.htm?type=10"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          :show-file-list="false"
          multiple
          :limit="1"
        >
          <el-button size="mini" type="primary" style="width: 96px">上传头像</el-button>
        </el-upload>
    </div>
    <div style="float:right;margin-left:35px;margin-top:20px ;width:155px">
    <el-upload 
          class="upload-demo mt"
          name="files"
          action="/kukacms/visitor/picUpload.htm?type=11"
          :on-preview="handlePreview11"
          :on-remove="handleRemove11"
          :before-remove="beforeRemove11"
          :on-success="handleSuccess11"
          :on-exceed="handleExceed11"
          :show-file-list="true"
          multiple
          :limit="1"
        >
          <el-button size="mini" type="primary" style="width: 96px">上传视频</el-button>
        </el-upload>
    </div>
    <div style="float:right;margin-left:35px;margin-top:20px;width:155px">
    <el-upload 
          class="upload-demo mt"
          name="files"
          action="/kukacms/visitor/picUpload.htm?type=12"
          :on-preview="handlePreview12"
          :on-remove="handleRemove12"
          :before-remove="beforeRemove12"
          :on-success="handleSuccess12"
          :show-file-list="true"
          multiple
          :limit="1"
          :on-exceed="handleExceed12"
        >
          <el-button size="mini" type="primary" style="width: 96px">上传图片</el-button>
        </el-upload>
    </div>
    <div style="float:right;margin-left:35px;margin-top:10px;width:155px">
      <el-button type="primary" @click="save"  size="mini">保存</el-button>
    </div>
   
    
  </div>
</template>

<script>
import cropper from "./ImageCroppers/index";
// import { getTypeAuditList, addNews, updataMobile, updataNews } from './news'
import { queryCelebrityPerson ,addCelebrityPerson,queryIdLevel,editCelebrityPerson} from "@/views/celebrityAdmin/severApi/celebrityPerson";
import { formatDate } from "@/common/js/date";
import tiny from "@/components/Tinymce/index";
// import { getMagazinePage } from "@/api/magList";
export default {
  props: {
    news: {
      type: Object,
      default: () => {
        return {
        };
      }
    }
  },
  data() {
    return {
      editPerson:{
                personName:'',
                personCode:'',
                tittle:'',
                filePath:'',
                photoPath:'',
                headPath:'',
                createby:'',
                categoryCode:'',
                updateby:'',
                id:'',
                years:''
            },
      lastRow:{},      
      show: false,
      fileList:[],
      rules: {
            tittle: [{ required: true, message: "请输入标题", trigger: "blur" }],
            personName: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
            personCode: [{ required: true, message: "请输入人员工号", trigger: "blur" }],
            // headPath: [{ required: true, message: "请上传头像", trigger: "blur" }],
            years: [{ required: true, message: "请选择年份", trigger: "blur" }],
            description: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      searchList: [],
      type: "",
      fileList: [],
      covers: "",
      imageUrl: '',
      filePath:'',
      photoPath:'',
      headPath:'',
    };
  },
  created() {
    this.editPerson = this.$route.query.row
    this.editPerson.updatetime = ''
    this.editPerson.createtime = ''
    this.editPerson.years = new Date(this.$route.query.row.years.toString())
  },
  methods: {
    save() {
      this.$refs.editPerson.validate((valid) => {
          if (valid) {
            this.editPerson.years = this.editPerson.years.getFullYear();
            if(this.filePath != ''){
              this.editPerson.filePath = this.filePath
            }
            if(this.photoPath != ''){
              this.editPerson.photoPath = this.photoPath
            }
            if(this.headPath != ''){
              this.editPerson.headPath = this.headPath
            }
            // this.editPerson.photoPath = this.photoPath
            // this.editPerson.headPath = this.headPath
            this.editPerson.categoryCode = this.$route.query.row.categoryCode
            this.editPerson.id = this.$route.query.row.id
            this.editPerson.createby = this.$route.query.row.createby
            this.editPerson.updateby = localStorage.getItem("departmentName")
            delete this.editPerson.updatetime 
            delete this.editPerson.createtime 
            editCelebrityPerson(this.editPerson).then(res => {
              console.log(res);
              this.$router.go(-1)
            })
          } else {
            return false;
          }
        });
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传图片
    handleRemove(file, fileList) {
      this.headPath = ''
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file) {
      // console.log(file)
      console.log(response.data[1]);
      this.covers = response.data[1];
      this.headPath = this.covers
    },
    handlePreview12(file) {
      console.log(file);
    },
    // 上传图片
    handleRemove12(file, fileList) {
      this.photoPath = ''
      // console.log(file, fileList);
    },
    handleExceed12(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    beforeRemove12(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess12(response, file) {
      
      console.log(response.data[1]);
      this.photoPath = response.data[1];
    },
    handlePreview11(file) {
      console.log(file);
    },
    // 上传图片
    handleRemove11(file, fileList) {
      this.filePath = ''
      console.log(file, fileList);
    },
    handleExceed11(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    beforeRemove11(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess11(response, file) {
      
      console.log(response.data[1]);
      this.filePath = response.data[1];
    },
  },
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