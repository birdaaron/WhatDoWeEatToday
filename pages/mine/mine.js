const app = getApp()
Page({


  data: 
  {
    userInfo:null
  },

  
  onShow: function (options) {
    this.setData(
      {
        userInfo:app.globalData.userInfo
      }
    )
    console.log(this.data.userInfo);
  },


})