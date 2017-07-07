let carData = require('../../resource/car');
Page({
  data: {
    cars: []
  },
  onReady: function (e) {

  },
  cars: {},
  onShow: function () {
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
    this.cars = carData;
    console.log(this.cars);
    this.setData({
      cars: this.cars
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
    getApp().carSelected = e.currentTarget.dataset.id;
    console.log(getApp().carSelected);
    wx.switchTab({
      url: '../order/order'
    })
  }
})