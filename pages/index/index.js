//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerData : ["/image/banner1.jpg","/image/banner2.jpg","/image/banner3.jpg"],
    btnLoginStr : "退出",
    userInfo : {}
  },
  onLoad: function(options)
  {
    var _this = this;
    
    wx.getUserInfo({
      success:function(res)
      {
          _this.setData(
            {
              userInfo : res.userInfo
            }
          );
      }
    })
  },
  onUserLogin : function(e)
  {
    var _this = this;
    wx.login(
      {
        success : function(res)
        {
          _this.setData({
            btnLoginStr : "tuichu"
          });
        } 
    }  
    )
  }
 

})
