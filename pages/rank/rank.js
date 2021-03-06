// pages/rank.js
Page({


  data: {
    dishes : []
  },

  onLoad: function (options) 
  {
    var _this = this;
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/rankingList/list',
      success:function(res)
      {
        _this.setData(
          {
            dishes : res.data.data
          }
        );
       
        
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