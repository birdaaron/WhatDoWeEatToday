// pages/dishesList/dishesList.js
Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    windowIs : 0,
    dishes : []
  },
  onLoad: function (options) 
  {
    var _this = this
    this.setData(
      {
        windowId : options.windowId
      }
    )
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/selectByWindow/list?windowId='+_this.data.windowId,
      success : function(res)
      {
        _this.setData(
          {
            dishes : res.data.data
          }
        )
      }
    })
  },
  onDishesClick : function (e)
  {
    var _this = this;
    var currentIndex = e.currentTarget.dataset.index;
    var currentId = _this.data.dishes[currentIndex].id;
    wx.navigateTo({
      url: '/pages/dishes/dishes?id='+ currentId
    })
    
  }

})