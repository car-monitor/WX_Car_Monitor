let orderData = require('../../resource/order');
let driverData = require('../../resource/driver');
let carData = require('../../resource/car');
Page({
  data: {
    orders: []
  },
  onReady: function (e) {

  },
  orders: {},
  onShow: function (option) {
    let that = this;
    let carId = getApp().carSelected || -1;
    let driverId = getApp().driverSelected || -1;
    let params = '?';
    if (carId != -1) {
      params += 'carid=' + carId;
    }
    if (driverId != -1) {
      params += '&driverid' + driverId;
    }
    // for backend interface
    /*this.getDataFromUrl('/getorders' + params, function (res) {
      this.setData({
        orders: res.orderdetails.map(function(item) {
          return item.order;
        })
      });
    });*/
    this.orders = orderData.concat();
    this.orders = this.orders.filter(function(item, index, array) {
      let re = false;
      if (carId != -1) {
        if (item.carID == carId) {
          if (driverId != -1) {
            if (item.driverId == driverId) {
              re = true;
            } else {
              re = false;
            }
          } else {
            re = true;
          }
        } else {
          re = false;
        }
      } else if (driverId != -1) {
        if (item.driverId == driverId) {
          re = true;
        } else {
          re = false;
        }
      } else {
        re = true;
      }
      return re;
    });
    console.log(this.orders);
    this.setData({
      orders: this.orders
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
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  }
})