// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

/**
 * 引入element-ui
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/**
 * 引入VueQuillEditor
 */
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


/**
 * UEditor
 */
import'../static/UE/ueditor.config.js'
import'../static/UE/ueditor.all.min.js'
import'../static/UE/lang/zh-cn/zh-cn.js'
import'../static/UE/ueditor.parse.min.js'


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
