webpackJsonp([38],{"8iaC":function(t,e){},VrSG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("HNM5");a("zOMd");function n(t,e,a){return Object(i.a)({url:"/kukacms/api/complaint/detail/page.htm?curPage="+t+"&sizePage="+e+"&title="+a,method:"get"})}var l=a("fjIZ"),r={data:function(){return{list:null,dialog:!1,col:{name:"",id:"",strTime:""},searchList:null,magazine:null,typeList:null,type:null,curPage:1,sizePage:10,title:"",nextPage:"",prePage:""}},created:function(){var t=this;n(this.curPage,this.sizePage,this.title).then(function(e){t.list=e.data.itemList,t.nextPage=e.data.nextPage,t.prePage=e.data.prePage,console.log(t.list)})},methods:{outdata:function(){out("投诉列表")},upPages:function(){var t=this;1!=this.curPage&&1==this.prePage&&(this.curPage--,n(this.curPage,this.sizePage,this.title).then(function(e){t.list=e.data.itemList,t.nextPage=e.data.nextPage,t.prePage=e.data.prePage}))},nextPages:function(){var t=this;1==this.nextPage&&(this.curPage++,n(this.curPage,this.sizePage,this.title).then(function(e){t.list=e.data.itemList,t.nextPage=e.data.nextPage,t.prePage=e.data.prePage}))},del:function(t){var e=this;this.$confirm("即将删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(function(t){return Object(i.a)({url:"/kukacms/api/complaint/detail/delete.htm?id="+t,method:"get"})})(t).then(function(t){e.$message({type:"success",message:"删除成功!"}),n(e.curPage,e.sizePage,e.title).then(function(t){e.list=t.data.itemList})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},filters:{formatDate:function(t){var e=new Date(t);return Object(l.a)(e,"yyyy-MM-dd")},stage:function(t){return 1==t?"实名":2==t?"匿名":void 0}},computed:{outUrl:function(){return"/kukacms/api/complaint/export.htm"}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticStyle:{margin:"20px 0","font-size":"24px"}},[t._v("投诉列表")]),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"10px",float:"right"}},[a("el-col",[a("el-button",{attrs:{type:"primary",size:"mini"}},[a("a",{staticStyle:{color:"#fff"},attrs:{href:t.outUrl,download:""}},[t._v("导出")])]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.upPages}},[t._v("上一页")]),t._v(" "),a("span",[t._v(t._s(t.curPage))]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.nextPages}},[t._v("下一页")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"时间",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",[t._v(t._s(t._f("formatDate")(e.row.createTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"被投诉人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"depart",label:"部门",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"title",label:"标题",width:"300"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"备注",width:"300"}}),t._v(" "),a("el-table-column",{staticStyle:{"font-size":"8px"},attrs:{align:"center",prop:"filePath",label:"图片或文件",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.filePath?[a("div",{staticClass:"pic-box"},[a("img",{directives:[{name:"image-preview",rawName:"v-image-preview"}],staticClass:"pic",attrs:{src:e.row.filePath,alt:""}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"}},[a("a",{staticStyle:{"text-decoration":"none",color:"#fff"},attrs:{href:e.row.filePath}},[t._v("文件")])])],1)]:void 0}}],null,!0)}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"complaintName",label:"投诉人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否匿名"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("stage")(e.row.type)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.del(e.row.id)}}},[t._v("删除")])]}}])})],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(t){a("8iaC")},"data-v-0eb82182",null);e.default=o.exports}});
//# sourceMappingURL=38.47977770ae7fda4ab4c3.js.map