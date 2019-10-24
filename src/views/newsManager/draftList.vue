<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >草稿箱</h1>
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
      <el-col style="width: 320px" >
        <span>栏目：</span>
        <el-select 
          v-model="type"
          @change="_searchDocument"  
          filterable 
          placeholder="请选择栏目" 
          size="mini" >
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="typeFullPath"
        label="栏目"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="magazine"
        label="期刊号"
        width="320">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="标题">
      </el-table-column>
      <!-- <el-table-column
        align="center"
        label="状态"
        width="95">
        <template slot-scope="scope">
          <p>{{ scope.row.stage | stage }}</p>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        label="预发布时间"
        width="120">
        <template slot-scope="scope" >
          <p>{{scope.row.advanceTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="内容编辑"
        width="100">
        <template slot-scope="scope" >
          <el-button size="mini" type='warning' >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button size="mini" type='primary'  @click="_submitDocument(scope.row.id)" >提交审批</el-button>
          <el-button size="mini" type='success' @click="goUpdata(scope.row.id)" >编辑</el-button>
          <el-button size="mini" type='danger' @click="_deleteDocument(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMagazinePage, getDraftList, searchDraftDocument, searchDraftList, getTypeList, deleteDocument, submitDocument } from '@/api/draftList'
import { formatDate } from '@/common/js/date'
export default {
  data() {
    return {
      list: null,
      searchList: null,
      magazine: null,
      typeId: '',
      typeList: null,
      type: null,
    }
  },
  created () {
    getMagazinePage().then(res => {
      this.searchList = res.data.itemList
      // console.log(this.searchList)
      getDraftList().then(res => {
        this.list = res.data
        // console.log(this.list)
      })
    })
  },
  methods: {
    // 查找期刊文章列表 查找栏目列表
    searchMagazine (val) {
      this.typeId = ''
      searchDraftList(val.name).then(res => {
        this.list = res.data
        getTypeList(val.id).then(res => {
          this.typeList = res.data
          this.type =  null
        })
      })
    },
    // 按栏目查找文章
    _searchDocument (val) {
      this.typeId = val
      searchDraftDocument(this.magazine.name, val).then(res => {
        this.list = res.data
      })
    },
    // 提交审批
    _submitDocument (id) {
      submitDocument(id).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        if (this.magazine) {
          searchDraftDocument(this.magazine.name, this.typeId).then(res => {
            this.list = res.data
          })
        } else {
          getDraftList().then(res => {
            this.list = res.data
          })
        }
      })
    },
    // 删除
    _deleteDocument (id) {
      deleteDocument(id).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        if (this.magazine) {
          searchDraftDocument(this.magazine.name, this.typeId).then(res => {
            this.list = res.data
          })
        } else {
          getDraftList().then(res => {
            this.list = res.data
          })
        }
      })
    },
    // 去更新
    goUpdata (id) {
      this.$router.push({
        name: 'updataNews',
        params: {
          id: id
        }
      })
    }
  },
  filters: {
    // 时间日期过滤
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    // 状态筛选
    stage (i) {
      if (i == 0) {
        return '保存'
      }
      if (i == 1) {
        return '审批中'
      }
      if (i == 2) {
        return '审批通过'
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
