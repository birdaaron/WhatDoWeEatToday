const app = getApp()
Page({
  data: 
  {
    userInfo: null,
    isLogin : false,
    appraisalAmount : 0,
    commentAmount : 0,
    dynamicList : [],
    userAvatar: "/image/avatar.jpg",
    defaultAvatar : "/image/default_avatar.png",
    defaultName : "欢迎您"
  },

  onLoad: function(options)
  {
    
  },
  onShow: function (options) 
  {
    var openId = wx.getStorageSync('openId')
    var _this = this
    this.setData(
      {
        userInfo : getApp().globalData.userInfo,
        isLogin : getApp().globalData.isLogin
      }
    )
    if(!this.data.isLogin)
      this.setData(
        {
          userInfo : null,
          appraisalAmount : 0,
          commentAmount : 0
        }
      )
    else
    {
      wx.request({
        url: 'https://www.whattoeat.top:9999/api/userDetail/details?openid='+openId,
        success : function(res)
        {
          var resData = res.data.data
          _this.setData({
            appraisalAmount : resData.appraisalAmount,
            commentAmount : resData.commentAmount,
            dynamicList : resData.dynamicBoList
          })
        }
      })
     
    }
        
  },


})