<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >评价内容管理</h1>
    <el-row type="flex" justify="end" >
      <el-button size="mini" type="primary" style="width: 96px;" @click="dialog = true" >新增内容</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%; margin-top: 10px" size="mini" >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="星级"
        width="50"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="content"
        label="评价内容"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="scope" >
          <el-button size="mini" type="primary" @click="updata(scope.row)" >编辑</el-button>
          <el-button size="mini" type="danger" @click="delContent(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增/编辑服务内容"
      :visible.sync="dialog"
      :append-to-body="true"
    >
      <el-input v-model="content" size="mini" ></el-input>
      <el-row style="padding: 10px;" >
        <el-radio v-model="radio" :label="1" >1星</el-radio>
        <el-radio v-model="radio" :label="2" >2星</el-radio>
        <el-radio v-model="radio" :label="3" >3星</el-radio>
        <el-radio v-model="radio" :label="4" >4星</el-radio>
        <el-radio v-model="radio" :label="5" >5星</el-radio>
      </el-row>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addContent, updataContent, deleteContent, getContentList } from '@/views/server/api'
export default {
  data () {
    return {
      dialog: false,
      content: '',
      id: null,
      list: [],
      total: 0,
      radio: 1,
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化数据
    init () {
      this.getContents()
    },
    // 获取服务列表
    getContents () {
      getContentList().then(res => {
        this.list = res.data
      })
    },
    // 保存内容
    save () {
      if (!this.content.length > 0) {
        this.$message({
          message: '服务内容不能为空',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        if (this.id) {
          updataContent(this.content, this.id, this.radio).then(res => {
            this.content = ''
            this.id = null
            this.dialog = false
            this.init()
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
          })
        } else {
          addContent(this.content, this.radio).then(res => {
            this.content = ''
            this.id = null
            this.dialog = false
            this.radio = 1
            this.init()
            this.$message({
              message: res.message,
              type: 'success',
              duration: 3 * 1000
            })
          })
        }
      }
    },
    // 更新内容
    updata (data) {
      this.id = data.id
      this.content = data.content
      this.radio = data.type
      this.dialog = true
    },
    // 删除服务内容
    delContent (id) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContent(id).then(res => {
          this.init()
          this.$message({
            message: res.message,
            type: 'success',
            duration: 3 * 1000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });          
      });
    }
  },
  components: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>