// pages/window/window.js
Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    tabs : [],
    windows : [],
    canteen : 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var _this = this;
    const titles = ['一楼', '二楼']
    const tabs = titles.map(item => ({title: item}))
    _this.setData({tabs})
    this.setData({
      canteen : options.canteen
    })
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/windowDishesList/list?floor=1&canteen='+_this.data.canteen,
      success : function(res)
      {
        _this.setData({
          windows : res.data.data
        })
        
      }
    })
  },
  onFloorClick : function (e)
  {
    var _this = this
    var currentFloor = e.detail.index + 1
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/windowDishesList/list?',
      data :
      {
        floor : currentFloor,
        canteen : _this.data.canteen 
      },
      success : function(res)
      {
        _this.setData({
          windows : res.data.data
        })
        
      }
    })
  },
  onWindowClick : function(e)
  {
  
    var _this = this
    var currentWindow = e.currentTarget.dataset.index
    var windowId = this.data.windows[currentWindow].windowId;
    
    wx.navigateTo({
      url: '/pages/dishesList/dishesList?windowId='+ windowId
    })
  }
})