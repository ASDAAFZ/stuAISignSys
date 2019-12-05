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