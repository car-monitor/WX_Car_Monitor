let driverData = require('../../resource/driver');
Page({
  data: {
    drivers: []
  },
  onReady: function (e) {

  },
  drivers: {},
  onShow: function() {
    getApp().driverSelected = -1; 
    getApp().carSelected = -1;
  },
  onLoad: function (option) {
    let that = this;
    // for backend interface
    /*this.getDataFromUrl('/getorders' + params, function (res) {
      this.setData({
        orders: res.orderdetails.map(function(item) {
          return item.order;
        })
      });
    });*/
    this.drivers = driverData;
    console.log(this.orders);
    this.setData({
      drivers: this.drivers
    });
    // console.log(orderSelected.carStatuses[orderSelected.carStatuses.length - 1]);
    // map related 

  },
  getDataFromUrl: function (url, callback) {
    wx.request({
      url: url,
      success: function (res) {
        callback(res);
      }
    })
  },
  bindViewTap: function (e) {
    getApp().driverSelected = e.currentTarget.dataset.id;
    console.log(getApp().driverSelected);
    wx.switchTab({
      url: '../order/order'
    })
  }
})