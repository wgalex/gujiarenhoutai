
const user = {
  state: {
    id:'',
    password:'',
    categoryCode:''
  },
  mutations:{
    getId(state,data){
      state.id = data.id
      state.password = data.password
    },
    setCatagroycode(state,data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
      state.categoryCode = data;
  },
  }
}

export default user