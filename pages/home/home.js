// map.js
let schoolData = require('../../resource/data')
Page({
  data: {
    centerX: 113.3245211,
    centerY: 33.10229,
    markers: [],
    polyline: [{
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
    for (let item of schoolData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  moveToLocation: function() {
    console.log('move');
    this.mapCtx.moveToLocation()
  },
  createMarker(point) {
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