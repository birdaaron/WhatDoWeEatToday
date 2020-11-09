const app = getApp()
Page({


  data: 
  {
    userInfo:null,
    isLogin : false,
    defaultAvatar : "/image/default_avatar.png",
    defaultName : "欢迎您"
  },

  onLoad: function(options)
  {
    console.log(getApp().globalData.userInfo);
    this.setData(
      {
        userInfo : getApp().globalData.userInfo,
        isLogin : getApp().globalData.isLogin
      } 
    )
  },
  onShow: function (options) 
  {
    
    this.setData(
      {
        isLogin : getApp().globalData.isLogin
      }
    );
    if(!this.data.isLogin)
      this.setData(
        {
          userInfo : null
        }
      ); 
  },


})