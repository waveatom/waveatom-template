(function(){
  const $event = window.$event

  const entry = {
    // 这里存放项目的路由文件
    routes: [
      {
        "pageName": "",
        "pagePath": "/activeList",
        "loadAddress": "/edu/rcms/learning_stimulate_record2222/activeListv_1574323646420"
      },
    ],

    // 这里是项目左侧的导航
    nav: [
      {
        text: '列表页',
        router: '/list',
      }
    ]
  }

  $event.notify('baseInfoLoaded', entry)
})()