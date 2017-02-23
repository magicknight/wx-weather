//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    weather:[],
    weatherFuture:[],
    localCity:'',
    nowTem:'',
    suggestion:'',
    sun:undefined
    },
  onLoad:function() {
    this.load()
    this.timeJudge()
  },
  timeJudge: function() {
      var that = this
      var time = new Date()
      var hour = time.getHours()
      console.log(hour)
      if(hour >8 && hour< 18) {
          console.log('zhixingTURE')
          var sun = true
      }else{
          console.log('zhixingfalse')
          var sun = false
      }
      that.setData({
          sun:sun
      })
  },
  //事件处理函数
  load: function() {
      console.log('111')
      var that = this
      var typeIcon = {
          "多云": "duoyun.png",
          "霾": "mai.png",
          "晴": "qing.png",
          "雾": "wu.png",
          "雷阵雨": "leizhenyu.png",
          "大雪": "daxue.png",
          "大雨": "dayu.png",
          "暴雪": "baoxue.png",
          "暴雨": "baoyu.png",
          "冰雹": "bingbao.png",
          "小雪": "xiaoxue.png",
          "小雨": "xiaoyu.png",
          "阴": "yin.png",
          "雨夹雪": "yujiaxue.png",
          "阵雨": "zhenyu.png",
          "中雨": "zhongyu.png"
        };
      wx.request({
          url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json',
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
               var city = ''
               city = res.data.city
               that.setData({
                  localCity:city
               })
            //    根据获得的地址请求天气
               wx.request({
                   url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city ,
                   data:{
                   },
                   header: {
                       'content-type': 'application/json'
                   },
                   success: function(res) {
                       var weather = []
                       var data = res.data.data
                       console.log('dd',data)
                       var nowTem = (data.wendu+'°').trim()
                       var suggestion = data.ganmao
                       var  weatherList = data.forecast
                       for (var i = 0; i < weatherList.length; i++) {
                           var item = weatherList[i]
                           var date = item.date
                           //获得星期
                           var week = date.slice(-3)
                           var highTem = item.high.split(' ')[1].split('℃')[0]+'°'
                           var lowTem = item.low.split(' ')[1].split('℃')[0]+'°'
                           var type = item.type
                           var typeImage = typeIcon[type]
                           weather.push({
                               week: week,
                               highTem:highTem,
                               lowTem:lowTem,
                               typeImage:typeImage,
                               type:type
                           })
                       }
                       var weatherFuture = weather.slice(1)
                       that.setData({
                           weather: weather,
                           nowTem: nowTem,
                           suggestion:suggestion,
                           weatherFuture:weatherFuture
                       })
                       console.log('weather',that.data)
                   }
               })
          },
          fail:function(res) {
              console.log("error")
          }
      })
  }
})
