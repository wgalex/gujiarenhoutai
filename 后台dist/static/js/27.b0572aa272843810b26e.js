webpackJsonp([27],{"+My9":function(t,e){},fyoT:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("HNM5");function i(){return Object(a.a)({url:"/kukacms/getDocumentList.htm?position=0",method:"get"})}function l(t,e){return Object(a.a)({url:"/kukacms/getDocumentList.htm?magazine="+t+"&position=0&typeId="+e,method:"get"})}var s=n("fjIZ"),c={data:function(){return{list:null,searchList:null,magazine:null,typeId:"",typeList:null,type:null}},created:function(){var t=this;Object(a.a)({url:"/kukacms/visitor/getMagazinePage.htm",method:"get"}).then(function(e){t.searchList=e.data.itemList,i().then(function(e){t.list=e.data})})},methods:{searchMagazine:function(t){var e,n=this;this.typeId="",(e=t.name,Object(a.a)({url:"/kukacms/getDocumentList.htm?magazine="+e+"&position=0",method:"get"})).then(function(e){var i;n.list=e.data,(i=t.id,Object(a.a)({url:"/kukacms/getTypeList.htm?magazine="+i,method:"get"})).then(function(t){n.typeList=t.data,n.type=null})})},_searchDocument:function(t){var e=this;this.typeId=t,l(this.magazine.name,t).then(function(t){e.list=t.data})},_submitDocument:function(t){var e=this;(function(t){return Object(a.a)({url:"/kukacms/submitDocument.htm?id="+t,methid:"get"})})(t).then(function(t){e.$message({message:t.message,type:"success",duration:3e3}),e.magazine?l(e.magazine.name,e.typeId).then(function(t){e.list=t.data}):i().then(function(t){e.list=t.data})})},_deleteDocument:function(t){var e=this;(function(t){return Object(a.a)({url:"/kukacms//updateDocumentPosition.htm?id="+t+"&position=4",methid:"get"})})(t).then(function(t){e.$message({message:t.message,type:"success",duration:3e3}),e.magazine?l(e.magazine.name,e.typeId).then(function(t){e.list=t.data}):i().then(function(t){e.list=t.data})})},goUpdata:function(t){this.$router.push({name:"updataNews",params:{id:t}})}},filters:{formatDate:function(t){var e=new Date(t);return Object(s.a)(e,"yyyy-MM-dd")},stage:function(t){return 0==t?"保存":1==t?"审批中":2==t?"审批通过":9==t?"审批未通过":void 0}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticStyle:{margin:"20px 0","font-size":"24px"}},[t._v("草稿箱")]),t._v(" "),n("el-row",{staticStyle:{margin:"15px"},attrs:{type:"flex"}},[n("el-col",{staticStyle:{width:"270px"}},[n("span",[t._v("期刊号：")]),t._v(" "),n("el-select",{attrs:{"value-key":"name",filterable:"",placeholder:"请选择期刊号",size:"mini"},on:{change:t.searchMagazine},model:{value:t.magazine,callback:function(e){t.magazine=e},expression:"magazine"}},t._l(t.searchList,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t}})}),1)],1),t._v(" "),n("el-col",{staticStyle:{width:"320px"}},[n("span",[t._v("栏目：")]),t._v(" "),n("el-select",{attrs:{filterable:"",placeholder:"请选择栏目",size:"mini"},on:{change:t._searchDocument},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typeList,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[n("el-table-column",{attrs:{align:"center",prop:"id",label:"序号",width:"50"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"typeFullPath",label:"栏目",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"magazine",label:"期刊号",width:"320"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"name",label:"标题"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"预发布时间",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("p",[t._v(t._s(t._f("formatDate")(e.row.advanceTime)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"内容编辑",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"warning"}},[t._v("编辑")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t._submitDocument(e.row.id)}}},[t._v("提交审批")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(n){return t.goUpdata(e.row.id)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return t._deleteDocument(e.row.id)}}},[t._v("删除")])]}}])})],1)],1)},staticRenderFns:[]};var o=n("C7Lr")(c,u,!1,function(t){n("+My9")},"data-v-616bc850",null);e.default=o.exports}});
//# sourceMappingURL=27.b0572aa272843810b26e.js.map