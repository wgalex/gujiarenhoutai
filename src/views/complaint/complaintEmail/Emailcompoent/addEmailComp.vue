<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px">电邮添加</h1>
    <!-- <el-input v-model="mobile" placeholder="请输入投诉电话">投诉电话</el-input>
        <el-input v-model="email" placeholder="请输入投诉邮箱">投诉邮箱</el-input>
    <el-button type="primary" plain @click="save">保存</el-button>-->
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[ 
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="手机"
        :rules="[ 
      {  type: 'number',
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
 },
      {  pattern: /^1[34578]\d{9}$/,
            message: '手机号格式不对',
            trigger: 'blur'
 }
    ]"
      >
        <!-- <el-input v-model="dynamicValidateForm.mobile"></el-input> -->
        <el-input v-model.number="dynamicValidateForm.mobile"></el-input>
      </el-form-item>
      <!-- <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :label="'域名' + index"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
      :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
    >
      <el-input v-model="domain.value"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <!-- <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  editemailComppic,
  addemailComppic,
  getemailComppic
} from "@/views/complaint/severApi/emailSearvice";
export default {
  data() {
    // return {
    //   id: 1,
    //   mobile: "",
    //   email: "",
    //   editflag: ""
    // };
    return {
      dynamicValidateForm: {
        mobile: "",
        email: ""
      },
        id: 1,
    };
  },
  created() {
    this.getEmail();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editemailComppic(this.dynamicValidateForm.email, this.dynamicValidateForm.mobile, this.id).then(res => {
            if (res.code == 1000) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getEmail() {
      getemailComppic(this.id).then(res => {
        // console.log(res);
        this.dynamicValidateForm.mobile = res.data.mobile;
        this.dynamicValidateForm.email = res.data.email;
      });
    },
    // save() {
    //   if (this.mobile == "" || this.email == "") {
    //     this.$alert("标题,或图片不能为空", {
    //       confirmButtonText: "确定"
    //     });
    //     return false;
    //   }
    //   editemailComppic(this.email, this.mobile, this.id).then(res => {
    //     if (res.code == 1000) {
    //       this.$message({
    //         message: "保存成功",
    //         type: "success"
    //       });
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>