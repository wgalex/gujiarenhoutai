<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >期刊列表</h1>
    <el-row style="margin-bottom: 10px; float: right;" >
      <el-col>
        <el-button size="mini" type="primary" @click="upPage" >上一页</el-button>
        <span>{{page}}</span>
        <el-button size="mini" type="primary" @click="nextPage" >下一页</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        label="时间"
        prop="strTime"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="期刊">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100">
          <template  slot-scope="scope">
            <span v-if="scope.row.status == 2" >已上线</span>
            <span v-else style="color: red" >未上线</span>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="400"
      >
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="pushDoc(scope.row.name)" >整期通知</el-button>
          <el-button type="primary" size="mini" @click="upMag(scope.row.id, scope.row.name)" v-if="scope.row.status != 2" >整期上线</el-button>
          <el-button type="primary" size="mini" @click="upMag(scope.row.id, scope.row.name)" v-else >重新上线</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row)" >编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑窗口 -->
    <el-dialog
      title="期刊信息编辑"
      :visible.sync="dialog"
      :append-to-body="true"
      width="600px"
    >
      <el-form :model="col" label-width="70px" >
        <el-form-item label="期刊名称" >
          <el-input v-model="col.name" ></el-input>
        </el-form-item>
        <el-form-item label="时间" >
          <el-date-picker
            v-model="col.strTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDocumentList, searchDocument, getTypeList, workNotice } from '@/api/pastList'
import { getMagazinePage, updateMag, deleteMag, upMagazine } from '@/api/magList'
export default {
  data() {
    return {
      list: null,
      dialog: false,
      col: {
        name: '',
        id: '',
        strTime: ''
      },
      searchList: null,
      magazine: null,
      typeList: null,
      type: null,
      page: 1,
      max: ''
    }
  },
  created () {
    getMagazinePage(this.page).then(res => {
      this.list = res.data.itemList
      this.max = res.data.totalPage
    })
    // getTypeAuditList('').then(res => {
    //   this.list = res.data
    //   console.log(res)
    // })
  },
  methods: {
    upPage () {
      if (this.page == 1) {
        return
      }
      this.page --
      getMagazinePage(this.page).then(res => {
        this.list = res.data.itemList
      })
    },
    nextPage () {
      if (this.page < this.max) {
        this.page ++
        getMagazinePage(this.page).then(res => {
          this.list = res.data.itemList
        })   
      }
    },
    edit (i) {
      console.log(i)
      this.col = i
      this.dialog = true
    },
    saveEdit () {
      let data = {
        id: this.col.id,
        name: this.col.name,
        strTime: this.col.strTime
      }
      updateMag(data).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        this.dialog = false

        getMagazinePage(this.page).then(res => {
          this.list = res.data.itemList
          this.max = res.data.totalPage
        })
      })
    },
    del (id) {
      this.$confirm('即将删除期刊, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMag(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          getMagazinePage(1).then(res => {
            this.list = res.data.itemList
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });



    },
    upMag (id, name) {
      upMagazine(id, name).then(res => {
        getMagazinePage(1).then(res => {
          this.list = res.data.itemList
        })
      })
    },
    // 推送
    pushDoc (text) {
      this.$confirm('即将推送, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let word = text 
        workNotice(word, 2).then(res => {
          this.$message({
            type: 'success',
            message: '已推送!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消推送'
        });          
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
