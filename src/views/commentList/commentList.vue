<template>
  <div>
    <h1 style="margin: 10px 0; font-size: 24px" >评论列表</h1>

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
        prop="stime"
        label="评论时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="发表人"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        label="评论内容"
      >
        <template slot-scope="scope" >
          <p>{{scope.row.comment}}</p>
          <!-- <p  class="reward" >取消置顶取消置顶取消置顶取消置顶取消置顶取消置顶</p> -->
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="80"
      >
        <template slot-scope="scope" >
          <p>{{scope.row.flag | flag}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="280">
        <template slot-scope="scope">
          <p>
            <template>
              <el-button v-if="scope.row.score == 0" size="mini" type='primary' @click="setTop(scope.row.id,1)"  >置顶</el-button>
              <el-button v-else size="mini" type='primary' @click="setTop(scope.row.id,0)" >取消置顶</el-button>
            </template>
            <el-button size="mini" type='primary' @click="comment(scope.row)" >回复</el-button>
            <el-button size="mini" type='primary' @click="deleteRe(scope.row.id)" >删除回复</el-button>
          </p>
          <p>
            <el-button size="mini" type='primary' @click="unpass(scope.row.id)" >审核未通过</el-button>
            <el-button size="mini" type='primary' @click="pass(scope.row.id)" >审核通过</el-button>
          </p>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="回复"
      :visible.sync="dialog"
      :append-to-body="true"
    >
      <el-input type="textarea" v-model="content" ></el-input>
      <emotion class="e-top" @emotion="handleEmotion" :height="150" ></emotion>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentList, auditComment, setTop, addCommentReply, deleteCommentReply } from '@/api/comment'
import { formatDate } from '@/common/js/date'
import Emotion from '@/components/Emotion/index'
export default {
  data() {
    return {
      list: null,
      commentobj: '',
      content: '',
      dialog: false,
      text: '',
      test: [
        {
          userName: 'xxx',
          comment: 'XXXX'
        }
      ]
    }
  },
  created () {
    this.initList()
  },
  methods: {
    // 表情包输入
    handleEmotion (i) {
      this.content += i
    },
    pass (id) {
      auditComment(id, 2).then(res => {
        console.log(res)
        this.initList()
      })
    },
    unpass (id) {
      auditComment(id, 0).then(res => {
        console.log(res)
        this.initList()
      })  
    },
    initList () {
      getCommentList(this.$route.query.id).then(res => {
        console.log(res.data)
        this.list = res.data
      })
    },
    // 置顶
    setTop (id, flag) {
      setTop(id, flag).then(res => {
        console.log(res)
        this.initList()
      })
    },
    // 评论
    comment (obj) {
      this.dialog = true
      this.commentobj = obj
    },
    // 保存
    save () {
      console.log(this.commentobj)
      console.log(this.content)
      addCommentReply(this.commentobj.id, this.content, this.commentobj.userId, this.commentobj.name, this.commentobj.documentId).then(res => {
        this.dialog = false
        this.content = ''
        this.commentobj = ''
      })
    },
    // 删除回复
    deleteRe (id) {
      deleteCommentReply(id)
    }
  },
  components: {
    Emotion
  },
  filters: {
    flag (i) {
      if (i == 0) {
        return '审核不通过'
      }
      if (i == 1) {
        return '待审核'
      }
      if (i == 2) {
        return '审核通过'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reward {
    border-radius: 5px;
    background: rgba(0, 0, 0, .1);
    box-sizing: border-box;
    padding: 2px 5px;
  }
  .e-top {
    margin-top: 20px;
  }
</style>
