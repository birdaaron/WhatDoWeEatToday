//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerData : ["/image/banner1.jpg","/image/banner2.jpg","/image/banner3.jpg"],
    btnLoginStr : "登录",
    nearestCanteen :"",
    nearestCanteenDistance :0,
    time:"",
    top4 : [],
    userInfo:null,
    openId :"",
    loginDTO :{}
  },
  onLoad: function(options)
  {
    
    this.findNearestCanteen();
    this.getTop4();
    this.setTime()
  },
  setTime()
  {
    var hour = new Date().getHours();
    var result;
    if(hour>4&&hour<=11)
      result = "早上"
    else if(hour>11&&hour<=13)
      result = "中午"
    else if(hour>13&&hour<=17)
      result = "下午"
    else
      result = "晚上"
    this.setData({
        time : result
    });
  },
  getTop4()
  {
    var _this = this;
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/homePage/recommend/4',
      success : function(res)
      {
        _this.setData(
          {
            top4 : res.data.data
          }
        )
      }
    })
  },

  findNearestCanteen() 
  {
    var _this = this;
    wx.getLocation({
      success : function(res)
      {
        console.log(res.longitude)
        console.log(res.latitude)
         var distance1 = _this.getDistance(res.latitude,res.longitude,23.050244,113.401579);
         var distance2 = _this.getDistance(res.latitude,res.longitude,23.04839,113.399365);
         var distance3 = _this.getDistance(res.latitude,res.longitude,23.048399,113.394487);
         var distance4 = _this.getDistance(res.latitude,res.longitude,23.048511,113.390418);
         var min = Math.min(distance1,distance2,distance3,distance4);
         var result = "";
         switch(min)
         {
           case distance1:
            result = "一饭";
            break;
           case distance2:
            result = "二饭";
            break;
           case distance3:
            result = "三饭";
            break;
           case distance4:
            result = "四饭";
            break;
         }
        _this.setData({
          nearestCanteen:result,
          nearestCanteenDistance : min.toFixed(0)
        });
      }
    })
  },
  onChoseFreeClick : function(e)
  {
    wx.navigateTo({
      url: '/pages/chose/chose',
    })
  },
  onChoseRandomClick : function(e)
  {
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/random/',
      success : function(res)
      {
        wx.navigateTo({
          url: '/pages/dishes/dishes?id='+ res.data
        })
      }
    })
    
  },
  getDistance(lat1,long1,lat2,long2)
  {
    var a = (lat1-lat2)*Math.PI/180.0;
    var b = (long1-long2)*Math.PI/180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(lat1*Math.PI/180.0)*Math.cos(lat2*Math.PI/180.0)*Math.pow(Math.sin(b/2),2)));
    s = s*6378.137;
    return s;
  },
  setLogin(isLogin)
  {
    var _this = this
    _this.setData({
      isLogin : isLogin
    });
    getApp().globalData.isLogin = isLogin;
  },
  onUserLogin : function(e)
  {
    var _this = this
    
    if(!_this.data.isLogin)
    {
      wx.login({
        success : function(res)
        {
          _this.setLogin(true)
          wx.request({
            url: 'https://www.whattoeat.top:9999/api/user/code2session',
            data: 
            {
              code : res.code
            },
            success : function(res)
            {
              
              _this.setData(
                {
                  "openId" : res.data.data.openid
                }
              )
              wx.setStorageSync('openId', _this.data.openId)

              wx.getUserInfo({
                success : function(res)
                {
                 
                  _this.setData(
                    {
                      "userInfo" : res.userInfo,
                      "loginDTO" :
                      {
                        "encryptedData" : res.encryptedData,
                        "iv" : res.iv,
                        "openid" : _this.data.openId,
                        "rawData" : res.rawData,
                        "signature": res.signature
                      }
                  
                    }
                  )
                
                  wx.request({
                    url: 'https://www.whattoeat.top:9999/api/user/login',
                    method:"POST",
                    data : JSON.stringify(_this.data.loginDTO),
                  })
                }
              })
              
            }
          })
        }
      })
      
      
    }
    else
    {
      _this.setLogin(false)
      wx.setStorageSync('openId', null)
    }  
    
  }


})
