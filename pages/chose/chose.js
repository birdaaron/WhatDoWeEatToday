
Page({

  data: {
    tabs : [],
    currentTab : 0
  },

  onLoad: function (options) {
    const titles = ['饭堂', '菜品']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})
  }

})