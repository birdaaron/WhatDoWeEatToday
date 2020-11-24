// pages/dishes/dishes.js
Page({

  data: 
  {
    dishesId: 2,
    dishesData :{},
    isLogin:false,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData(
      {
        dishesId : options.id,
        userInfo : getApp().globalData.userInfo,
        isLogin : getApp().globalData.isLogin
      }
    )
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/dishDetail/'+ _this.data.dishesId,
      success : function(res)
      {
        _this.setData(
          {
            dishesData : res.data.data
          }
        )
        console.log(res.data.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})