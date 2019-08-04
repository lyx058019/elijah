import Vue from 'vue'
/**
 * 自定义事件 modelrole
 * 用于鉴权模块级或按钮级权限
 * v-modelrole="'dept_Add'"
 * v-modelrole 后传入模块或按钮名称 字符串取名规则按照 功能页面_模块名称 保证唯一性
 * <el-button  v-modelrole="'dept_Add'" type="primary" round @click="appendTop()">新增</el-button>
 */
Vue.directive('modelrole', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.prototype.$_has = function(value) {
  const modelpremissions = sessionStorage.getItem('modelpremissions')
  if (modelpremissions === undefined || modelpremissions == null) {
    return false
  }
  return !modelpremissions.includes(value)
}
