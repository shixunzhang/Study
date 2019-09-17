<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>

<script>
  import '../../static/UE/ueditor.config.js'
  import '../../static/UE/ueditor.all.min.js'
  import '../../static/UE/lang/zh-cn/zh-cn.js'
  import '../../static/UE/ueditor.parse.min.js'
  //https://ueditor.baidu.com/website/onlinedemo.html
  // 官网使用方式、api接口
  export default {
    name: 'uEditor',
    data () {
      return {
        editor: null
      }
    },
    props: {
      id: {
        type: String
      },
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted () {
      const _this = this
      // eslint-disable-next-line
      this.editor = UE.getEditor(_this.id, _this.config || { initialFrameWidth: 1000, initialFrameHeight: 600}) // 初始化UE
      this.editor.addListener('ready', function () {
        _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
      })
    },
    methods: {
      getUEContent () { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt () { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>

<style scoped>

</style>
