<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >二维码管理</h1>
    <el-row type="flex" justify="space-between" >
      <el-row :span="6" >
        <el-input placeholder="请输入工号" v-model="keyword" size="mini" style="width: 200px;" >
          <el-button slot="append" icon="el-icon-search" size="mini" @click="searchById" ></el-button>
        </el-input>
        <el-button size="mini" type="primary" @click="init"  >重置</el-button>
      </el-row>
      <el-row :span="6" >
        <el-button size="mini" type="primary" style="width: 96px;" @click="dialog = true" >新增二维码</el-button>
      </el-row>
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
        prop="member"
        label="工号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名字"
      ></el-table-column>
      <el-table-column
        align="center"
        label="头像"
      >
        <template slot-scope="scope" >
          <img :src="scope.row.avatar" alt="" class="qrcode" >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="二维码"
      >
        <template slot-scope="scope" >
          <!-- <img class="qrcode" :src='scope.row.url' alt=""> -->
          <el-popover
            placement="right"
            trigger="hover"
            content="操作"
          >
            <div>
              <div>
                <img :src='scope.row.url' alt="">
              </div>
              <p align="center" >
                <el-button type="primary" size="mini" @click="download(scope.row.url, scope.row.member)" >下载</el-button>
              </p>
            </div>
            <img slot="reference" class="qrcode" :src='scope.row.url' alt="">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="scope" >
          <el-button size="mini" type="danger" @click="delCode(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" style=" margin-top: 10px" >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="getCodeList"
      ></el-pagination>
    </el-row>
    <el-dialog
      title="新增二维码"
      :visible.sync="dialog"
      :append-to-body="true"
    >
      <el-input v-model="name"  placeholder="请输入名字" size="mini" ></el-input>
      <el-input v-model="member" type="number" placeholder="请输入工号" size="mini" style="margin-top: 10px" ></el-input>
      <img :src="avatar" alt="" class="qrcode" style="margin-top: 10px" >
      <el-upload
        class="upload-demo mt"
        name="files"
        :action="url"
        :on-success="handleSuccess"
        :show-file-list="false"
        :limit="1"
        ref="upload"
      >
        <el-button size="mini" type="primary" style="width: 96px; margin-top: 10px" >上传头像</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addCode">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getQrCodeList, addQrCode, deleteQrCode, searchCode } from '@/views/server/api'
import { download } from '@/views/server/download'
export default {
  data () {
    return {
      dialog: false,
      list: [],
      keyword: '',
      member: null,
      name: null,
      avatar: null,
      total: 0
    }
  },
  created () {
    this.init()
  },
  computed: {
    url () {
      return `/kukacms/visitor/picUpload.htm?type=2&time=` + Date.parse(new Date())
    }
  },
  methods: {
    // 初始化数据
    init () {
      this.keyword = ''
      this.getCodeList(1)
    },
    // 获取二维码列表
    getCodeList (num) {
      getQrCodeList(num).then(res => {
        // console.log(res.data)
        this.list = res.data.itemList
        this.total = res.data.totalRecord
      })
    },
    // 新增二维码
    addCode () {
      addQrCode(this.member, this.name, this.avatar).then(res => {
        this.member = null
        this.name = null
        this.avatar = null
        this.dialog = false
        this.init()
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    // 删除二维码
    delCode (id) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQrCode(id).then(res => {
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
    },
    // 搜索二维码
    searchById () {
      searchCode(this.keyword).then(res => {
        this.list = res.data.itemList
        this.total = res.data.totalRecord
      })
    },
    // 下载二维码
    download (url, name) {
      download(1, url, name)
    },
    // 上传回调
    handleSuccess (res) {
      console.log(res)
      this.avatar = res.data[1]
       this.$refs.upload.clearFiles(); //上传成功之后清除历史记录
    }
  },
  components: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .qrcode {
    width: 100px;
  }
</style>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  input[type="number"]{
      -moz-appearance: textfield;
  }
  .te-input .el-textarea__inner {
    resize: none;
  }
</style>