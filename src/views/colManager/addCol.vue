<template>
  <div>
    <h1 style="margin:20px 0; font-size: 24px">新增栏目</h1>
    <el-form
      :model="col"
      label-width="80px"
      style="width: 800px; margin-top: 10px"
      ref="col"
      :rules="rules"
    >
      <el-form-item label="期刊" prop="magazine">
        <el-select v-model="col.magazine">
          <el-option v-for="item in list" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px" @click="dialog = true">新增期刊号</el-button>
      </el-form-item>
      <el-form-item label="新增栏目" prop="name">
        <el-input v-model="col.name" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="col.visible">
          <el-radio label="1">显示</el-radio>
          <el-radio label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-col :span="2">
          <el-button @click="saveType" type="success">保存</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增期刊对话框 -->
    <el-dialog title="新建期刊号" :visible.sync="dialog" :append-to-body="true" width="600px">
      <el-form label-width="60px" :model="magazine" :rules="magRules" ref="addMag">
        <el-form-item label="名称" prop="name">
          <el-input v-model="magazine.name" placeholder="请输入期刊名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addMag">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addType, addMagazine } from "@/api/addCol";
import { getMagazinePage } from "@/api/magList";
export default {
  data() {
    return {
      col: {
        id: "",
        name: "",
        visible: "1",
        magazine: ""
      },
      rules: {
        // id: [{required: true, message: '请选择期刊',trigger: 'change'}],
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        magazine: [{ required: true, message: "请选择期刊", trigger: "change" }]
      },
      magazine: {
        name: "",
        id: ""
      },
      magRules: {
        name: [{ required: true, message: "请输入期刊名称", trigger: "blur" }]
      },
      list: [],
      dialog: false
    };
  },
  created() {
    getMagazinePage(1).then(res => {
      console.log(res.data.itemList);
      this.list = res.data.itemList;
    });
  },
  methods: {
    saveType() {
      this.$refs.col.validate(valid => {
        if (valid) {
          let data = this.col;
          addType(data).then(res => {
            this.$message({
              message: res.message,
              type: "success",
              duration: 3 * 1000
            });
            // this.$refs.col.resetFields()
            this.col.name = "";
          });
        } else {
          return false;
        }
      });
      // this.$refs.col.resetFields()
    },
    addMag() {
      let data = this.magazine;
      this.$refs.addMag.validate(valid => {
        if (valid) {
          addMagazine(data).then(res => {
            this.$message({
              message: res.message,
              type: "success",
              duration: 3 * 1000
            });
            getMagazinePage(1).then(res => {
              this.list = res.data.itemList;
            });
            this.dialog = false;
            this.$refs.addMag.resetFields();
          });
        } else {
          return false;
        }
      });
    }
  },
  components: {}
};
</script>
