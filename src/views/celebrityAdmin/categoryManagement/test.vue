<template>
    <div>
       <el-tree
  :data="data"
  :props="defaultProps"
  accordion
  @node-click="handleNodeClick">
</el-tree>
    </div>
</template>
<script>
import {
  queryCategory,addCategory,editCategory
} from "@/views/celebrityAdmin/severApi/category";
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    created() {
    this.upData();
  },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
       upData() {
      let queryData = {}
      // queryData.departmentId = localStorage.getItem('departmentId')
      queryData.departmentName = localStorage.getItem('departmentName')
      this.userEdit.departmentName = localStorage.getItem('departmentName')
      this.userEdit.departmentId = localStorage.getItem('departmentId')
      this.userAdd.departmentName = localStorage.getItem('departmentName')
      this.userAdd.departmentId = localStorage.getItem('departmentId')
      
    //   queryCategory(queryData).then(res => {
    //     this.list = res.data;
    //     this.categoryList = res.data
    //   });
    //   select().then(res =>{
    //     this.levellist = res.data
    //   })
    },
    }
    
  };
</script>
<style lang="scss" scoped>
</style>