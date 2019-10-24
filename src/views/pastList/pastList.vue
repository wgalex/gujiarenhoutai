<template>
  <div>
    <h1 style="margin: 10px 0; font-size: 24px" >资讯列表</h1>
    <el-row style="margin: 15px; min-width: 1000px;" type="flex">
      <el-col style="width: 270px" >
        <span>期刊号：</span>
        <el-select 
          v-model="magazine"
          @change="searchMagazine"
          value-key="name" 
          filterable 
          :filter-method="search"
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
      <el-col style="width: 220px" v-if="role != 3"  >
        <span>状态：</span>
        <el-select 
          style="width: 120px"
          v-model="position"
          @change="_searchState"
          filterable 
          placeholder="请选择状态" 
          size="mini" >
          <el-option
            v-for="item in stateList"
            :key="item.position"
            :label="item.name"
            :value="item.position">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div style="padding: 10px; display: flex; " >
      <span style="line-height: 28px; margin: 0 5px;" >搜索文章：</span>
      <el-input style="width: 200px; margin-right: 10px" v-model="keyword" size="mini" ></el-input>
      <el-button type="primary" size="mini" @click="searchDocByword" >搜索</el-button>
      <el-button type="primary" size="mini" >
        <a :href="outUrl" download="" >导出</a>
      </el-button>
    </div>
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
        prop="magazine"
        label="期刊号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="typeName"
        label="栏目"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="标题">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.position | stage }}</p>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <p v-if="role != 3" >
            <el-button size="mini" type='primary' @click="pushDoc(scope.row.name)" >单篇通知</el-button>
            <template>
              <el-button v-if="scope.row.clientApp == 0" size="mini" type='primary' @click="addDoc(scope.row.id)" >单篇上线</el-button>
              <el-button v-else size="mini" type='primary' @click="addDoc(scope.row.id)" >重新上线</el-button>
            </template>
            
            <el-button v-if="scope.row.isCarousel == 1" size="mini" type='warning' @click="_cancelCarousel(scope.row.id)" >取消轮播图</el-button>
            <el-button v-else size="mini" type='primary' @click="_setCarousel(scope.row.id)" >设置成轮播图</el-button>
          </p>
          <p>
            <template v-if="role != 3" >
              <!-- v-if="scope.row.commentAuditRequired == 1" -->
              <el-badge :value="scope.row.commentNum"  style="margin-right: 15px" >
                <el-button size="mini" type='primary'  @click="goComment(scope.row.id)"  >评论管理</el-button>
              </el-badge>
              <el-badge :value="scope.row.pageViewNum"  style="margin-right: 15px" >
                <el-button size="mini" type='primary'  @click="openViewNum(scope.row.id)"  >浏览管理</el-button>
              </el-badge>
            </template>
            <el-button size="mini" type='primary' @click="editor(scope.row.id)" >编辑</el-button>
            <el-button size="mini" type='danger' @click="del(scope.row.id)" >删除</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="浏览量设置"
      :visible.sync="dialog"
      :append-to-body="true"
      width="600px"
    >
      <el-input v-model="viewNum" ></el-input>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="saveNum">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchDoc, workNotice, getDocumentAllList, getState, updateCarouse, getDocumentList, searchDocument, getTypeList, getTypeAuditList, deleteDocument } from '@/api/pastList'
import { formatDate } from '@/common/js/date'
import { getMagazinePage, oneDoc, search, out, addView } from '@/api/magList'
import { getToken } from '@/api/auth'
export default {
  data() {
    return {
      dialog: false,
      list: null,
      searchList: null,
      magazine: '',
      typeList: null,
      type: null,
      position: null,
      keyword: '',
      stateList: [
        {
          position: '0',
          name: '草稿箱',
        },
        {
          position: '2',
          name: '上线资讯',
        },
        {
          position: '4',
          name: '回收站',
        },
      ],
      user: '',
      role: '',
      setNumId: '',
      viewNum: 0
    }
  },
  created () {
    this._initData()
    this.user = JSON.parse(getToken())
    this.role = this.user.roleId
  },
  methods: {
    // 导出
    outdata () {
      out('《顾家人》2018年5月上半刊（总第135期）')
    },
    // 查找状态
    _searchState (position) {
      getState(this.magazine.name, this.type, position).then(res => {
        this.list = res.data
      })
    },
    // 轮播设置
    _setCarousel (id) {
      updateCarouse(id, 1).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        this._initData()
      })
    },
    _cancelCarousel (id) {
      updateCarouse(id, 0).then(res => {
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        this._initData()
      })
    },
    // 删除
    del (id) {
      this.$confirm('即将删除期刊, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDocument(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this._initData()
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
      getDocumentList(val.name).then(res => {
        this.list = res.data
        // 权限筛选
        let role = JSON.parse(getToken())
        if (role.roleId == 3) {
          let newList = []
          for (let i in this.list) {
            if (this.list[i].position == 0) {
              newList.push(this.list[i])
            }
          }
          this.list = newList
        }
        this.position = null
        getTypeAuditList(val.name).then(res => {
          this.typeList = res.data
          this.type =  ''
        })
      })
    },
    // 按栏目查找文章
    _searchDocument (val) {
      searchDocument(this.magazine.name, val).then(res => {
        this.list = res.data
        // 权限筛选
        let role = JSON.parse(getToken())
        if (role.roleId == 3) {
          let newList = []
          for (let i in this.list) {
            if (this.list[i].position == 0) {
              newList.push(this.list[i])
            }
          }
          this.list = newList
        }
      })
    },
    // 初始化列表
    _initData () {
      getMagazinePage(1).then(res => {
        this.magazine = res.data.itemList[0]
        this.searchList = res.data.itemList
        getTypeAuditList(res.data.itemList[0].name).then(res => {
          this.typeList = res.data
          this.type =  ''
        })
        if (res.data.itemList.length) {
          getDocumentList(res.data.itemList[0].name).then(res => {
            this.list = res.data
            // 权限筛选
            let role = JSON.parse(getToken())
            if (role.roleId == 3) {
              let newList = []
              for (let i in this.list) {
                if (this.list[i].position == 0) {
                  newList.push(this.list[i])
                }
              }
              this.list = newList
            }
          })
        }
      })
    },
    editor (id) {
      this.$router.push({
        name: 'addNews',
        query: {
          id: id
        }
      })
    },
    goComment (id) {
      this.$router.push({
        name: 'commentList',
        query: {
          id: id
        }
      })
    },
    // 推送
    pushDoc (text) {
      this.$confirm('即将推送, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let word = '《' +  text + '》'
        workNotice(word, 1).then(res => {
          ////////////////////////////////////////////
          if (res.data.errorlist.length == 0) {
            this.$alert('已推送至全部部门!', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else {
            let text = ''
            for (let i in res.data.errorlist) {
              let content = res.data.errorlist[i] + '，'
              text += content
            }
            text = text + '以上部门未推送成功'
            this.$alert(text, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
          /////////////////////////////////////////////
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消推送'
        });          
      });
    },
    // 单篇推送
    addDoc (id) {
      oneDoc(id).then(res => {
        this._initData()
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    // 查找
    search (i) {
      search(i).then(res => {
        this.searchList = res.data.itemList
      })
    },
    // 
    searchDocByword () {
      searchDoc(this.keyword).then(res => {
        this.list = res.data
      })
    },
    // 打开浏览量设置对话框
    openViewNum (e) {
      this.dialog = true
      this.setNumId = e
    },
    // 设置浏览量
    saveNum () {
      addView(this.setNumId, this.viewNum).then(res => {
        this.dialog = false
        this._initData()
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3 * 1000
        })
        this.setNumId = '',
        this.viewNum = 0
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
        return '草稿箱'
      }
      if (i == 1) {
        return '审批中'
      }
      if (i == 2) {
        return '上线'
      }
      if (i == 3) {
        return '下线'
      }
      if (i == 4) {
        return '回收站'
      }
    }

  },
  // watch: {
  //   magazine () {
  //     console.log(this.magazine)
  //   }
  // }
  computed: {
    outUrl () {
      let url = '/kukacms/visitor/exportExcel.htm?magazine=' + this.magazine.name
      // let url = '/kukacms/visitor/exportExcel.htm?magazine=《顾家人》2018年5月上半刊（总第135期）'
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: #fff;
    width: 100%;
    height: 100%;
  }
</style>
