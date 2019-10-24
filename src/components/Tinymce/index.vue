<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}" ref="mytiny" >
    <textarea class="tinymce-textarea" :id="tinymceId"  ></textarea>
    <div class="editor-custom-btn-container">
      <el-row class="mt" >
        <el-button type="primary" @click="test" size="mini" style="width: 96px;" v-if="false" >预览</el-button>
      </el-row>
      <el-row class="mt" >
        <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" style="width: 96px;" ></editorImage>
      </el-row>
      <!-- <el-row class="mt">
        <upload color="#1890ff" class="editor-upload-btn" @successCBK="fileSuccessCBK" style="width: 96px;" ></upload>
      </el-row> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import editorImage from './components/editorImage'
import upload from './components/upload'
import plugins from './plugins'
import { toolbar1, toolbar2, toolbar3 } from './toolbar'

export default {
  name: 'tinymce',
  components: { editorImage, upload },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        console.log(1)
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        // 设置语言
        language: 'zh_CN',
        // 设置编辑器宽高
        width: 390,
        height: 480,
        // 是否需要顶部工具栏
        menubar: true,
        // 是否需要底部状态栏
        statusbar: false,
        // 设置工具栏
        toolbar1: toolbar1,
        toolbar2: toolbar2,
        // 引入插件
        plugins: plugins,
        // code 插件配置
        code_dialog_height: 450,
        code_dialog_width: 400,
        // preview 插件配置
        plugin_preview_height: 500,
        plugin_preview_width: 390,
        indent_use_margin: true,
        // 可拖动调整图片大小
        object_resizing: true,
        // 链接默认新窗口打开
        default_link_target: '_blank',
        // 内容样式 display:block;height:auto; margin-left: auto; margin-right: auto;
        content_style: "img {max-width: 100%; }",
        fontsize_formats: "8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 24px 36px",
        // 配置样式设置选项
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
              {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
              {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
              {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
              {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
            ]
          }
        ],
        // 去除换行 p 标签
        forced_root_block:'p',
        // 初始化事件
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    fileSuccessCBK(arr) {
      const _this = this
      console.log(arr)
      const data = arr.data
      window.tinymce.get(_this.tinymceId).insertContent(`<a href="${data[1]}" download="${data[0]}" >${data[0]}</a>`)
      // arr.forEach(v => {
      //   window.tinymce.get(_this.tinymceId).insertContent(`<a href="${v.url}" >附件</a>`)
      // })
    },
    test () {
      // console.log(this.$refs.mytiny)
      // console.log(this.$refs.mytiny.firstChild.firstChild.firstChild.firstChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild)
      this.$refs.mytiny.firstChild.firstChild.firstChild.firstChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.click()
      // mce-i-preview
      // console.log(document.getElementByClassName("mce-i-preview")[0])
      // document.getElementByClassName("mce-i-preview")[0].click()
      // document.getElementById("mceu_14-button").click()
      // document.getElementById("mceu_49-button").click()
    }
  },
  destroyed() {
    this.destroyTinymce()
  },

}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  margin-left: 150px;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
  
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  /* right: 4px; */
  top: 4px;
  right: 0px;
  /* background: red; */
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}

  .mt {
    margin-top: 10px;
  }
</style>
