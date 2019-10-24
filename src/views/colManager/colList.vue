<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >栏目列表</h1>
    <el-row style="margin: 15px" type="flex">
      <el-col style="width: 270px" >
        <span>期刊号：</span>
        <el-select 
          v-model="magazine"
          @change="searchMagazine"
          value-key="name" 
          filterable 
          placeholder="请选择期刊号" 
          size="mini" >
          <el-option
            v-for="item in searchList"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
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
        prop="mname"
        label="期刊">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="栏目名称"
      ></el-table-column>
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope" >
          <p>{{scope.row.stage | stage}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否显示"
      >
        <template slot-scope="scope" >
          <p>{{scope.row.visible | isVisible }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="250"
      >
        <template slot-scope="scope" >
          <!-- <el-button type="primary" size="mini" @click="change(scope.row.id)" >调换</el-button> -->
          <el-button type="primary" size="mini" @click="edit(scope.row)" >编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑窗口 -->
    <el-dialog
      title="栏目信息编辑"
      :visible.sync="dialog"
      :append-to-body="true"
      width="600px"
    >
      <el-form :model="col" label-width="70px" >
        <el-form-item label="栏目名称" >
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
        <el-form-item label="是否显示" >
          <el-radio-group v-model="col.visible" >
            <el-radio label="1" >上线</el-radio>
            <el-radio label="0" >下线</el-radio>
          </el-radio-group>
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
import { getDocumentList, searchDocument, getTypeList } from '@/api/pastList'
import { getTypeAuditList, updateType, deleteType } from '@/api/colList'
import { getMagazinePage } from '@/api/magList'
export default {
  data() {
    return {
      list: null,
      dialog: false,
      col: {
        name: '',
        visible: '1'
      },
      searchList: null,
      magazine: null,
      typeList: null,
      type: null,
      place_1: null,
      place_2: null,
    }
  },
  created () {
    getMagazinePage(1).then(res => {
      this.searchList = res.data.itemList
      getTypeAuditList(res.data.itemList[0].name).then(res => {
        this.list = res.data
      })
    })
  },
  methods: {
    edit (i) {
      this.col = i
      this.col.visible = this.col.visible.toString()
      this.dialog = true
    },
    saveEdit () {
      let data = {
        id: this.col.id,
        visible: this.col.visible,
        name: this.col.name,
        strTime: this.col.strTime,
        tag: '',
        parentId: 0
      }
      updateType(data).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        this.dialog = false
        getMagazinePage(1).then(res => {
          this.searchList = res.data.itemList
          getTypeAuditList(res.data.itemList[0].name).then(res => {
            this.list = res.data
          })
        })
      })
    },
    del (id) {
      this.$confirm('即将删除栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteType(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          getTypeAuditList('').then(res => {
            this.list = res.data
            console.log(res)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 查找期刊文章列表 查找栏目列表
    searchMagazine (val) {
      getTypeAuditList(val.name).then(res => {
        console.log(res.data)
        this.list = res.data
      })
    },
    // 按栏目查找文章
    _searchDocument (val) {
      searchDocument(this.magazine.name, val).then(res => {
        this.list = res.data
      })
    },
    // 调换
    change (i) {
      if (!this.place_1) {
        this.place_1 = i
      } else {
        this.place_2 = i
        console.log(this.place_1 + ',' + this.place_2)
        // 请求
        this.place_1 = null
        this.place_2 = null
        console.log(this.place_1 + ',' + this.place_2)
      }
    }
  },
  filters: {
    // 时间日期过滤
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    // 判断显示
    isVisible (i) {
      if (i == 0) {
        return '隐藏'
      } else {
        return '显示'
      }
    },
    // 判断状态
    stage (i) {
      if (i == 0) {
        return '保存'
      }
      if (i == 1) {
        return '在审批'
      }
      if (i == 2) {
        return '已上线'
      }
      if (i == 9) {
        return '审批未通过'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
