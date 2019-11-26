<template>
  <div style="margin-top:10px">
      <img 
      src="../../../assets/caf0bb4e563659c050ad3afa7d17a857.jpeg"
      style="width:500px;height:500px;float:left"
      alt 
    />
    <div style="float:left; margin-left:30px">
    <el-upload action="#" list-type="picture-card" :auto-upload="false">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
      <el-button size="mini" type="primary" style="margin:20px 40px;">保存</el-button>
    </div>
    <div style="width: 160px;height: 100px;border: 1px solid rgb(204, 204, 204);float: left;background-color: cyan;">
      <p>上传图片规范:</p>
      <p>1125px x 2436px</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>