<template>
  <div>
    <h1 style="margin: 20px 0; font-size: 24px" >轮播图管理</h1>
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
      <el-table-column
        align="center"
        label="状态"
        width="90">
        <template slot-scope="scope">
          <p>{{ scope.row.isCarousel | stage }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateBy"
        label="审批人"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        width="120">
        <template slot-scope="scope" >
          <p>{{scope.row.updateTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isCarousel == 1" size="mini" type='primary' @click="_cancelCarousel(scope.row.id)" >取消轮播图</el-button>
          <el-button v-else size="mini" type='warning' @click="_setCarousel(scope.row.id)" >设置成轮播图</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCarouselList, setCarousel, cancelCarousel } from '@/api/swiper'
import { formatDate } from '@/common/js/date'
export default {
  data() {
    return {
      list: null,
      searchList: null,
      magazine: null,
      typeList: null,
      type: null,
    }
  },
  created () {
    getCarouselList().then(res => {
      this.list = res.data
      console.log(res.data)
    })
  },
  methods: {
    _setCarousel (id) {
      setCarousel(id).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        getCarouselList().then(res => {
          this.list = res.data
        })
      })
    },
    _cancelCarousel (id) {
      cancelCarousel(id).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        getCarouselList().then(res => {
          this.list = res.data
        })
      })
    }
  },
  filters: {
    // 时间日期过滤
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    // 客户端筛选
    stage (i) {
      if (i == 0) {
        return '未设置轮播图'
      }
      if (i == 1) {
        return '设置成轮播图'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
