
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
      url: 'http://localhost:8527/api/selectByOneself/',
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
      url: 'http://localhost:8527/api/selectByOneself/list?typeID=3',
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
      url: 'http://localhost:8527/api/selectByOneself/list?typeID='+currentType,
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