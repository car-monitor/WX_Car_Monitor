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
    }],
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
    }
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.moveToLocation();
  },
  onLoad: function () {
    let that = this;
    console.log(this);
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
        });
      }
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e);
  },
  controltap(e) {
    console.log(e.controlId)
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