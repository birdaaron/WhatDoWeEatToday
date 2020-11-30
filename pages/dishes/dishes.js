// pages/dishes/dishes.js
Page({

  data: 
  {
    dishesId: 2,
    dishesData :{},
    isLogin:false,
    userInfo:{},
    comment:"",
    isLiked:false,
  },

  onLoad: function (options) {
    var _this = this;
    this.setData(
      {
        dishesId : options.id,
        userInfo : getApp().globalData.userInfo,
        isLogin : getApp().globalData.isLogin
      }
    )
    this.loadInformation()
    if(this.data.isLogin)
      this.checkLike()
  },
  checkLike()
  {
    var _this = this
    var openId = wx.getStorageSync('openId')
    var supportRecordDTO = 
    {
      "dishesId": _this.data.dishesId,
	    "openId": openId
    }

    wx.request({
      url: 'https://www.whattoeat.top:9999/api/dishDetail/flag',
      method:"POST",
      data : JSON.stringify(supportRecordDTO),
      success : function(res)
      {
        _this.setData({
          isLiked : res.data.data
        })
        
      }
    })
  },
  loadInformation()
  {
    var _this = this;
    wx.request({
      url: 'https://www.whattoeat.top:9999/api/dishDetail/'+ _this.data.dishesId,
      success : function(res)
      {
        _this.setData(
          {
            dishesData : res.data.data
          }
        )
        
      }
    })
  },
  onLikeClick:function(e)
  {
    var isLiked = this.data.isLiked
    var dishesId = this.data.dishesId;
    var openId = wx.getStorageSync('openId')
    var supportRecordDTO = 
    {
      "dishesId": dishesId,
	    "openId": openId
    }
    
    if(this.data.isLogin&& !isLiked)
      {
          console.log(1111)
          this.setData({
            isLiked : true
          })
          wx.request({
            url: 'https://www.whattoeat.top:9999/api/dishDetail/',
            method : "PUT",
            data : JSON.stringify(supportRecordDTO)
          })
    
      }

  },
  onCommentInput: function(e)
  {
    this.setData(
      {
        comment : e.detail.value
      }
    )
  },
  onSendClick : function(e)
  {
    var _this = this
    var openId = wx.getStorageSync('openId')
    var comment = _this.data.comment
    var dishesId = _this.data.dishesId;
    
    if(this.data.comment!="")
      wx.request({
        url: 'https://www.whattoeat.top:9999/api/dishDetail/?appraisal='+comment+"&dishesId="+dishesId+"&openId="+openId,
        method:"POST",
        
        success : function(res)
        {
          _this.loadInformation()
        }
      })
  }
})