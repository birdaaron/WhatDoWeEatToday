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
  },
  onLoad: function(options)
  {
    var _this = this;
    _this.findNearestCanteen();
    _this.setData({
        time : new Date().toLocaleTimeString().substring(0,2)
    });
    
  },
  findNearestCanteen() 
  {
    var _this = this;
    wx.getLocation({
      success : function(res)
      {
        console.log(res.latitude);
        
        console.log(res.longitude);

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
  getDistance(lat1,long1,lat2,long2)
  {
    var a = (lat1-lat2)*Math.PI/180.0;
    var b = (long1-long2)*Math.PI/180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(lat1*Math.PI/180.0)*Math.cos(lat2*Math.PI/180.0)*Math.pow(Math.sin(b/2),2)));
    s = s*6378.137;
    
    
    return s;
  },
  onUserLogin : function(e)
  {
    var _this = this;
    if(this.data.isLogin==false)
    {
      wx.login({
        success : function(res)
        {
          _this.setData({
            isLogin : true
          })
        }
      })
      wx.getUserInfo({
        success : function(res)
        {
          _this.setData(
            {
              userInfo : res.userInfo
            }
          )
        }
      })
    }
    else
    {
      _this.setData({
        isLogin : false
      });
    }  
    
  }


})
