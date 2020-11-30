
Page({

  data: {
    tabs : [],
    dishesTypeTab :[],
    dishes : [],
   
  },

  onLoad: function (options) 
  {
    var _this = this;
    const titles = ['饭堂', '菜品']
    const tabs = titles.map(item => ({title: item}))
    _this.setData({tabs})
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/selectByOneself/',
      success : function(res)
      {
        var typeList = res.data.data
        var mTypeList = typeList.map(item=>({id:item.id,title:item.name}))
        _this.setData(
          {
            dishesTypeTab : mTypeList,
          }
        )
      }
    })
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/selectByOneself/list?typeID=2',
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
  onTypeTabClick : function(e)
  {
    var _this = this
    var currentType = e.detail.index

    wx.request({
      url: 'https://www.whattoeat.top:9999/api/selectByOneself/list?typeID='+currentType,
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
  onCanteenClick : function(e)
  {
    var _this = this
    var currentCanteen = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/window/window?canteen='+ currentCanteen
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