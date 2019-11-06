import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index/index'),
      children: [
        {
          path: 'pastList',
          name: 'pastList',
          component: () => import('@/views/pastList/pastList')
        },
        {
          path: 'commentList',
          name: 'commentList',
          component: () => import('@/views/commentList/commentList')
        },
        {
          path: 'upNews',
          name: 'upNews',
          component: () => import('@/views/newsManager/upNews')
        },
        {
          path: 'downNews',
          name: 'downNews',
          component: () => import('@/views/newsManager/downNews')
        },
        {
          path: 'draftList',
          name: 'draftList',
          component: () => import('@/views/newsManager/draftList')
        },
        {
          path: 'dustbin',
          name: 'dustbin',
          component: () => import('@/views/newsManager/dustbin')
        },
        {
          path: 'swiper',
          name: 'swiper',
          component: () => import('@/views/newsManager/swiper')
        },
        {
          path: 'addNews',
          name: 'addNews',
          component: () => import('@/views/newsManager/addNews')
        },
        {
          path: 'editNews',
          name: 'editNews',
          component: () => import('@/views/newsManager/editNews')
        },
        {
          path: 'updataNews/:id',
          name: 'updataNews',
          component: () => import('@/views/newsManager/updataNews')
        },
        {
          path: 'addCol',
          name: 'addCol',
          component: () => import('@/views/colManager/addCol')
        },
        {
          path: 'colList',
          name: 'colList',
          component: () => import('@/views/colManager/colList')
        },
        {
          path: 'magList',
          name: 'magList',
          component: () => import('@/views/colManager/magList')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/admin'),
      children: [
        {
          path: 'userList',
          name: 'userList',
          component: () => import('@/views/admin/userList')
        },
        {
          path: 'navList',
          name: 'navList',
          component: () => import('@/views/admin/navList')
        }
      ]
    },
    {
      path: '/serverIndex',
      name: 'serverIndex',
      redirect: {name: 'banner'},
      component: () => import('@/views/serverIndex/index'),
      children: [
        {
          path: 'banner',
          name: 'banner',
          component: () => import('@/views/server/banner/index')
        },
        {
          path: 'content',
          name: 'content',
          component: () => import('@/views/server/content/index')
        },
        {
          path: 'qrcode',
          name: 'qrcode',
          component: () => import('@/views/server/qrcode/index')
        },
        {
          path: 'rate',
          name: 'rate',
          component: () => import('@/views/server/rate/index')
        },
      ]
    },
    {
      path: '/complaintIndex',
      name: 'complaintIndex',
      redirect: {name: 'addComP'},
      component: () => import('@/views/complaintIndex/complaintIndex'),
      children: [
        {
          path: 'complaintbanner',
          name: 'complaintbanner',
          component: () => import('@/views/complaint/complaintbanner/index')
        },
        {
          path: 'complaintCase',
          name: 'complaintCase',
          component: () => import('@/views/complaint/complaintCase/complaintCase')
        },
        // {
        //   path: 'complaintEdit',
        //   name: 'complaintEdit',
        //   component: () => import('@/views/complaint/complaintEdit/complaintEdit')
        // },
        {
          path: 'complaintEmail',
          name: 'complaintEmail',
          component: () => import('@/views/complaint/complaintEmail/complaintEmail')
        },
        //首页子页面
        {
          path: 'addComP',
          name: 'addComP',
          component: () => import('@/views/complaint/complaintbanner/indexCompents/addComP')
        },
        {
          path: 'listComp',
          name: 'listComp',
          component: () => import('@/views/complaint/complaintbanner/indexCompents/listComp')
        },
        //案例子页面
        {
          path: 'addCaseComp',
          name: 'addCaseComp',
          component: () => import('@/views/complaint/complaintCase/Casecompoent/addCaseComp')
        },
        {
          path: 'listCaseComp',
          name: 'listCaseComp',
          component: () => import('@/views/complaint/complaintCase/Casecompoent/listCaseComp')
        },
        // 电邮子页面
        {
          path: 'addEmailComp',
          name: 'addEmailComp',
          component: () => import('@/views/complaint/complaintEmail/Emailcompoent/addEmailComp')
        },
        {
          path: 'listEmailComp',
          name: 'listEmailComp',
          component: () => import('@/views/complaint/complaintEmail/Emailcompoent/listEmailComp')
        },
        //投诉子页面
        {
          path: 'complaintEditlist',
          name: 'complaintEditlist',
          component: () => import('@/views/complaint/complaintEdit/complaintEditlist')
        },
      ]
    },
    {
      path: '/celebrityAdmin',
      name: 'celebrityIndex',
      // redirect: {name: 'addComP'},
      component: () => import('@/views/celebrityAdmin/celebrityIndex'),
      children: [
        //账号管理
        {
          path: '/branchList',
          name: 'branchList',
          component: () => import('@/views/celebrityAdmin/peopleManagement/branchList')
        },
        //级别管理
        // {
        //   path: '/LevelManagementList',
        //   name: 'LevelManagementList',
        //   component: () => import('@/views/celebrityAdmin/LevelManagement/LevelManagementList')
        // },
        //类别管理
        // {
        //   path: '/test',
        //   name: 'test',
        //   component: () => import('@/views/celebrityAdmin/categoryManagement/test')
        // },
        {
          path: '/test1',
          name: 'test1',
          component: () => import('@/views/celebrityAdmin/categoryManagement/test1')
        },
        // {
        //   path: '/categoryManagementList',
        //   name: 'categoryManagementList',
        //   component: () => import('@/views/celebrityAdmin/categoryManagement/categoryManagementList')
        // },
        //名人管理
        {
          path: '/celebrityPersonManagementList',
          name: 'celebrityPersonManagementList',
          component: () => import('@/views/celebrityAdmin/celebrityPersonManagement/celebrityPersonManagementList')
        },
        {
          path: '/addCelebrityPersonManagement',
          name: 'addCelebrityPersonManagement',
          component: () => import('@/views/celebrityAdmin/celebrityPersonManagement/addCelebrityPersonManagement')
        },
        {
          path: '/editCelebrityPersonManagement',
          name: 'editCelebrityPersonManagement',
          component: () => import('@/views/celebrityAdmin/celebrityPersonManagement/editCelebrityPersonManagement')
        },
        {
          path: '/bannerImage',
          name: 'bannerImage',
          component: () => import('@/views/celebrityAdmin/bannerImage/bannerImage')
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
