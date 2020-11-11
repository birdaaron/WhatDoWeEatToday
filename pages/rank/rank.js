// pages/rank.js
Page({


  data: {
    dishes : []
  },

  onLoad: function (options) 
  {
    var _this = this;
    wx.request({
      url: 'http://localhost:8527/api/rankingList/list',
      success:function(res)
      {
        _this.setData(
          {
            dishes : res.data.data
          }
        );
      }
    })
  }

 
})