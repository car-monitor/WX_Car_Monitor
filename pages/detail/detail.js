let orderData = require('../../resource/order');
let driverData = require('../../resource/driver');
let carData = require('../../resource/car');
Page({
  data: {
    // map related
    centerX: 113.3245211,
    centerY: 33.10229,
    markers: [],
    polyline: [{
      points: [],
      color: "#FF0000DD",
      width: 5,
      dottedLine: true,
      borderColor: true
    }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/image/location-control.png',
    //   position: {
    //     left: 0,
    //     top: 10,
    //     width: 40,
    //     height: 40
    //   },
    //   clickable: true
    // }],
    order: {
      longtitudeStart: 113.264435,
      latitudeStart: 23.129163,
      longtitudeEnd: 114.264435,
      latitudeEnd: 25.129163,
      isFinished: false,
      scheduledStartTime: '2017年7月4日12：00',
      scheduledEndTime: '2017年7月4日13：00',
      senderName: '张三',
      senderPhone: '15620000000',
      senderAddress: '广州市中山大学南校区',
      receiverName: '李四',
      receiverPhone: '13512345678',
      receiverAddress: '广州市中山大学东校区',
      sealInitial: '123123'
    },
    driver: {
      username: '李司机',
      sex: '男',
      driverType: 'C1',
      jobNo: '13002000'
    },
    car: {
      carNo: '粤A-12345',
      speed: '120',
      temperature: '20',
      mileague: '300'
    },
    status: {

    }
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.includePoints({ points: this.orderSelected.routes});
  },
  getDataFromArray: function(arr, field, value){
    var match = arr.filter(function(elem) {
      return (elem[field] == value);
    });
    return match[0] || {};
  },
  getDataFromUrl: function(url, callback) {
    wx.request({
      url: url,
      success: function (res) {
        callback(res);
      }
    })
  },
  orderSelected: {},
  statusData: [],
  routeData: [],
  onLoad: function (option) {
    let that = this;
    let orderId = option.id;
    console.log(option);
    this.orderSelected = this.getDataFromArray(orderData, 'id', orderId);
    // for backend interface
    /*
    this.getDataFromUrl('/getorder?id=' + orderId, function(res) {
      this.statusData = res.carstatus,
      this.routeData = res.route,
      this.setData({
        order: res.order,
        status: this.statusData[this.statusData.length - 1]
      });
      this.getDataFromUrl('/getcar?id=' + res.carID, function(res) {
        this.setData({
          car: res.car
        });
      });
      this.getDataFromUrl('/getuser?id=' + res.driverId, function (res) {
        this.setData({
          driver: res.user
        });
      });
    });
    */
    console.log(this.orderSelected);
    this.setData({
      order: this.orderSelected,
      car: this.getDataFromArray(carData, 'id', this.orderSelected.carID),
      driver: this.getDataFromArray(driverData, 'id', this.orderSelected.driverId),
      status: this.orderSelected.carStatuses[this.orderSelected.carStatuses.length - 1]
    });
    // console.log(orderSelected.carStatuses[orderSelected.carStatuses.length - 1]);
    // map related 
    let markers = [];
    this.orderSelected.routes.forEach(function(elem, index, arr) {
    // for backend interface
    // this.route.forEach(function (elem, index, arr) {
      function createMarker(point, width, height, index) {
        let latitude = point.latitude;
        let longitude = point.longitude;
        let marker = {
          iconPath: "/image/location.png",
          id: index || 0,
          name: point.name || '',
          latitude: latitude,
          longitude: longitude,
          width: width,
          height: height
        };
        return marker;
      }
        if (index === arr.length - 1) {
          markers.push(createMarker(elem, 25, 48, index));
        } else {
          markers.push(createMarker(elem, 12, 24, index));
        }
    });
    console.log(markers);
    this.setData({
      markers: markers,
      polyline: [{
        points: this.orderSelected.routes,
        color: "#FF0000DD",
        width: 5,
        dottedLine: true,
        borderColor: true
      }]
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e);
    this.setData({
      status: this.orderSelected.carStatuses[e.markerId]
    });
  },
  controltap(e) {
    console.log(e.controlId)
    this.mapCtx.moveToLocation()
  }
})