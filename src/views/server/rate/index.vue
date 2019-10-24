<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >服务评价管理</h1>
    <el-row type="flex" justify="space-between" >
      <el-row :span="6" >
        <el-input placeholder="搜索" v-model="keyword"  size="mini" style="width: 300px;" >
          <template slot="prepend" >
            <el-select v-model="type" style="width: 80px;" >
              <el-option label="工号" value="member" ></el-option>
              <el-option label="手机" value="mobile" ></el-option>
            </el-select>
          </template>
          <el-button slot="append" icon="el-icon-search" @click="search(1)" ></el-button>
        </el-input>
        <el-button size="mini" type="primary" @click="init"  >重置</el-button>
      </el-row>
      <el-row :span="6" >
        <el-button size="mini" type="primary"  @click="dialog = true" >导出</el-button>
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
        width="100"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="mobile"
        label="手机"
        width="100"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="content"
        label="内容"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="score"
        label="评分"
        width="50"
      ></el-table-column>
      <el-table-column
        align="center"
        label="图片"
      >
        <template slot-scope="scope" >
          <div v-for="(item, i) in scope.row.array" :key="i" >
            <!-- <img  :src="item" alt=""  > -->
            <el-popover
              placement="right"
              trigger="hover"
              content="操作"
            >
              <div>
                <img :src="item" alt="" class="plus" >
              </div>
              <img slot="reference" :src='item' alt="" class="img" >
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="strTime"
        label="时间"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope" >
          <el-button size="mini" type="danger" @click="delEvaluate(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" style=" margin-top: 10px" >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="getData"
        :current-page="curpage"
      ></el-pagination>
    </el-row>
    <el-dialog
      title="导出数据"
      :visible.sync="dialog"
      :append-to-body="true"
    >
      <p>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </p>
      <!-- <el-input v-model="member" placeholder="请输入工号" ></el-input> -->
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="exportdata" >确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEvaluateList, deleteEvaluate, getEvaluateListByMobile, getEvaluateListByMember } from '@/views/server/api'
export default {
  data () {
    return {
      list: [],
      total: 0,
      keyword: '',
      type: 'member',
      dialog: false,
      member: '',
      curpage: 1,
      date: null,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.keyword = ''
      this.getData(1)
    },
    // 获取列表数据
    getData (num) {
      if (this.keyword != '') {
        this.search(num)
        return false
      }
      getEvaluateList(num).then(res => {
        // console.log(res.data)
        this.list = res.data.itemList
        this.total = res.data.totalRecord
        this.curpage = num
      })
    },
    // 删除评价
    delEvaluate (id) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEvaluate(id).then(res => {
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
    // 按关键字查找
    search (num) {
      console.log(num)
      if (this.type == 'member') {
        getEvaluateListByMember(this.keyword, num).then(res => {
          this.list = res.data.itemList
          this.total = res.data.totalRecord
          this.curpage = num
        })
      } else {
        getEvaluateListByMobile(this.keyword, num).then(res => {
          this.list = res.data.itemList
          this.total = res.data.totalRecord
          this.curpage = num
        })
      }
    },
    // 导出数据
    exportdata () {
      if (!this.date) {
        return false
      }
      let url = `/kukacms/api/exportLog.htm?startDate=${this.date[0]}&endDate=${this.date[1]}`
      let a = document.createElement('a');
      a.download = name;
      a.href = url;
      a.style.display = 'none'
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.member = '';
      this.dialog = false;
    }
  },
  components: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .img {
    width: 50px;
  }
  .plus {
    width: 200px;
  }
</style>