(function(){
  const $http = window.$http
  const $data = window.$data
  const $parse = window.$parse
  const $event = window.$event
  const vue = window.vm
  
  const methods = {
    /*
     * @func: rcms内置生命周期， 用来初始化数据。
     * @note: 返回一个对象。
    */
    setup() {
      return {
        formData: {},
        name: "1"
      }
    },
    /*
     * @func rcms内置生命周期，页面初始化的时候触发
     * @note 发起ajax，设置数据默认值等操作 
    */
    bootstrap() {
      $http.get({
        url: "/rest/building/api/vworld/vregion/list",
        params: {
          limit: 5
        }
      }).then(res => {
        $data.formData = res.data
      })
    },

    /*
    * 其余的函数就是页面的事件处理函数了
    */
    clickHandle() {
      console.warn('触发click事件了')
    }
  }

  $event.notify('methodsLoaded', methods)
})()