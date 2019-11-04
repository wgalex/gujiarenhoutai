import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  state,
  mutations
})
const state={//要设置的全局访问的state对象
  categoryCode:''
  //要设置的初始属性值
}
const mutations = {
  setCatagroycode(data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
      state.categoryCode = data;
  },
}

export default store