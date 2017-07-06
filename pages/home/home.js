// map.js
let WXData = require('../../resource/data')
Page({
  data: {
    centerX: 113.3245211,
    centerY: 33.10229,
    markers: [],//标志点
    /*point:[{
      longitude: 108.962926,
      latitude: 34.238489
    }],*/
    polyline: [{//路径
       points: [{
         longitude: 108.962926,
         latitude: 34.238489
       }, {
         longitude: 118.962926,
         latitude: 34.238489
       }],
       color:"#FF0000DD",
       width: 5,
       dottedLine: true,
       borderColor: true
     }],
    /*circles: [{
      latitude: '40.007153',
      longitude: '116.491081',
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 400,
      strokeWidth: 2
    }],*/
    /*order: {        //后端写好后会用到
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
    },*/
    controls: [{
      id: 1,
      iconPath: '/image/location-control.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.moveToLocation();
  },
  onLoad: function () {
    console.log('地图定位！')
    let that = this;

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getMarkers()
        });
      }
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e);
    // wx.navigateTo({
    //   url: '../detail/detail?id=' + e.markerId,
    // })
    // wx.switchTab({
    //   url: '../car/car',
    // })
  },
  controltap(e) {
    console.log(e.controlId)
    this.mapCtx.moveToLocation()
  },
  getMarkers() {
    let markers = [];
    for (let item of WXData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  moveToLocation: function() {
    console.log('move');
    this.mapCtx.moveToLocation()
  },
  createMarker(point) {//获取数据
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "/image/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
  }
})
