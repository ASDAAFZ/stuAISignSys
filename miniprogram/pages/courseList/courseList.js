// miniprogram/pages/courseList/courseList.js
import Toast from '../../components/vant-weapp/toast/toast';
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dbName: 'stuSignSysCourseMsg',
    limitField: {
      _id: true,
      courseName: true,
      courseRoom: true,
      courseTime: true
    },
    showAddStudentPop: false,
    addStudentName: "",
    addStudentID: "",
    addStudentSex: "",
    addStudentUrl: "/images/add.png",
    showStudentSexPop: false,
    columns: ["男", "女"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    var waterfallComponent = this.selectComponent('#waterfallView')
    await waterfallComponent.onLoadData()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var waterfallComponent = this.selectComponent('#waterfallView')
    waterfallComponent.clearWaterfall();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:async function () {
    var waterfallComponent = this.selectComponent('#waterfallView')
    await waterfallComponent.clearWaterfall();
    await waterfallComponent.onLoadData()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom: function () {
    var waterfallComponent = this.selectComponent('#waterfallView')
    waterfallComponent.onLoadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClickButton: function (e) {
    wx.navigateTo({
      url: '/pages/courseDetail/courseDetail?id=' + e.detail._id,
    })
  },

  onAddCourse: function (e) {
    // 添加课程按钮响应
    wx.navigateTo({
      url: '/pages/courseAdd/courseAdd',
    })
  },

  onAddStudent: function (e) {
    // 添加学员按钮响应
    this.setData({
      showAddStudentPop: true
    });
  },

  closeAddStudentPop: function () {
    this.setData({
      showAddStudentPop: false
    });
  },

  bindinputStudentStuName: function (e) {
    this.data.addStudentName = e.detail.value;
  },

  bindinputStudentStuID: function (e) {
    this.data.addStudentID = e.detail.value;
  },

  bindinputStudentStuSex: function (e) {
    this.data.addStudentSex = e.detail.value;
  },

  uploadStudentPhoto: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          addStudentUrl: res.tempFilePaths[0]
        });
      }
    })
  },

  uploadFile: async function (filePath) {
    const cloudPath = `stuSignSys/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/\.[^.]+?$/)
    return await wx.cloud.uploadFile({
      cloudPath,
      filePath
    })
  },

  submitStuMsg: function () {
    Toast.fail({
      message: '程序员小哥正在加紧开发中~~~',
      duration: 1500
    });
/*     if (this.data.addStudentID.length === 0 || this.data.addStudentName.length === 0 || this.data.addStudentSex.length === 0 || this.data.addStudentUrl === "/images/add.png") {
      Toast.fail({
        message: '照片、姓名、学号、性别都是必填信息',
        duration: 1500
      });
    } else if (this.data.addStudentSex !== "男" && this.data.addStudentSex !== "女") {
      Toast.fail({
        message: '性别只能输入男或女',
        duration: 1500
      });
    } else {
      wx.showLoading({
        title: '加载中'
      });
      db.collection('allStudents').where({
        stuID: this.data.addStudentID
      }).get().then(
        res => {
          if (res.data.length === 0) {
            this.uploadFile(this.data.addStudentUrl).then(
              res => {
                db.collection("allStudents").add({
                  data: {
                    stuID: this.data.addStudentID,
                    stuName: this.data.addStudentName,
                    stuSex: this.data.addStudentSex,
                    stuPhotoUrl: res.fileID,
                  },
                  success: (res) => {
                    wx.hideLoading();
                    this.setData({
                      showAddStudentPop: false,
                      addStudentName: "",
                      addStudentID: "",
                      addStudentSex: "",
                      addStudentUrl: "/images/add.png"
                    });
                    Toast.fail({
                      message: '目前不支持学生信息上传人脸识别人员库，因此无法对您上传的学生进行签到，请使用我们的测试库',
                      duration: 1500
                    });
                  },
                  fail: (res) => {
                    wx.hideLoading();
                    this.setData({
                      showAddStudentPop: false
                    });
                  }
                })
              }
            )
          } else {
            wx.hideLoading();
            Toast.fail({
              message: '学生学号重复',
              duration: 1500
            });
          }
        });
    } */
  },

  closeSexStudentPop: function () {
    this.setData({
      showStudentSexPop: false,
      addStudentName: "",
      addStudentID: "",
      addStudentSex: "",
      addStudentUrl: "/images/add.png",
    });
  },

  showSexStudentPop: function () {
    this.setData({
      showStudentSexPop: true
    });
  }
})