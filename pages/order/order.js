let orderData = require('../../resource/order');
let driverData = require('../../resource/driver');
let carData = require('../../resource/car');
Page({
  data: {
    orders: []
  },
  onReady: function (e) {

  },
  onLoad: function (option) {
    let that = this;
    this.setData({
      orders: orderData
    });
    // console.log(orderSelected.carStatuses[orderSelected.carStatuses.length - 1]);
    // map related 
    
  },
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  }
})