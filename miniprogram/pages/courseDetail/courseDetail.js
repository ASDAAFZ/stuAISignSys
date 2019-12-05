import Toast from '../../components/vant-weapp/toast/toast';

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasSigned: false,
    hasStopSign: false,
    showLoading: true,
    courseName: '',
    courseRoom: '',
    courseTime: '',
    courseIntro: '',
    theCourseData: {},
    hasSignCount: 0,
    stuCount: 0,
    _id: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onPageInit(options.id)
    this.setData({
      _id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.refreshData()
  },


  refreshData: function() {
    wx.cloud.callFunction({
      name: 'uploadStatu',
      data: {
        boolVal: false,
        dbName: 'stuSignSysCourseMsg',
        _id: this.data._id,
        objects: this.data.theCourseData['stuStatus']
      }
    })
  },

  switchLoading: function() {
    let nextStatu = !this.data.showLoading;
    this.setData({
      showLoading: nextStatu
    })
  },

  refreshCount: function() {
    let stuArray = this.data.theCourseData['stuID'];
    let length = stuArray.length;
    let cnt = 0;
    for (let i = 0; i < length; i++) {
      let nowStu = this.data.theCourseData['stuStatus'][stuArray[i]];
      if (nowStu['hasSigned'] == true) cnt++;
    }
    this.setData({
      hasSignCount: cnt
    })
  },

  onPageInit: async function(courseID) {
    let courseData = await db.collection('stuSignSysCourseMsg')
      .where({
        _id: courseID
      })
      .get();
    courseData = courseData.data[0]
    this.setData({
      theCourseData: courseData,
      courseName: courseData['courseName'],
      courseRoom: courseData['courseRoom'],
      courseTime: courseData['courseTime'],
      courseIntro: courseData['courseIntro'],
      stuCount: courseData['stuID'].length,
      hasSigned: courseData['hasSigned'],
      hasStopSign: (courseData['hasSigned'] == false ? false : true)
    });
    this.refreshCount();
    var waterfallComponent = this.selectComponent("#waterfallView");
    await waterfallComponent.appendItem(courseData);
    this.switchLoading();
  },

  onClickStopButton: function(e) {
    // 按下停止签到按钮触发的函数
    var that = this;
    wx.cloud.callFunction({
      name: 'uploadStatu',
      data: {
        dbName: 'stuSignSysCourseMsg',
        _id: this.data._id,
        objects: this.data.theCourseData['stuStatus']
      },
      success: function(res) {
        wx.showToast({
          title: '签到已停止',
          icon: 'success'
        })
        that.setData({
          hasStopSign: true,
          hasSigned: true
        })
      }
    })
  },

  onClickSignButton: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
      success: res => {
        wx.showLoading({
          title: '加载中...',
          mask: true
        });
        const tempFilePaths = res.tempFilePaths[0];
        let base64Code = wx.getFileSystemManager().readFileSync(tempFilePaths, 'base64');
        var boolVal = false;
        wx.request({
          url: '', //根据个人服务器添加，提供图片剪裁服务
          method: 'POST',
          data: {
            base64code: base64Code
          },
          success: res => {
            let resImages = res.data.resPhoto;
            resImages.push(base64Code)
            for (let i = 0; i < 4; i++) {
              let nowImg = resImages[i];
              let err = wx.cloud.callFunction({
                name: 'searchPerson',
                data: {
                  group_id: 'stuSignSysMemberLib',
                  imagecode: nowImg
                },
                success: res => {
                  boolVal = boolVal | true;
                  let personGroup = res.result.Results;
                  let personLength = res.result.Results.length
                  for (let j = 0; j < personLength; j++) {
                    if (personGroup[j].Candidates.length == 0) continue;
                    let nowCandidate = personGroup[j].Candidates[0].PersonId;
                    let nowStu = this.data.theCourseData['stuStatus'][nowCandidate];
                    if (nowStu == undefined) continue;
                    this.data.theCourseData.stuStatus[nowCandidate].hasSigned = true;
                  }
                  if (i == 3) {
                    var waterfallComponent = this.selectComponent("#waterfallView");
                    waterfallComponent.appendItem(this.data.theCourseData);
                    this.refreshCount();
                    wx.hideLoading();
                    wx.showToast({
                      title: '识别结束',
                      icon: 'success'
                    })
                  }
                },
                fail: res => {
                  if (i == 3) {
                    if (boolVal == false) {
                      wx.hideLoading();
                      Toast.fail({
                        message: "图片识别错误"
                      })
                    } else {
                      wx.hideLoading();
                      wx.showToast({
                        title: '识别结束',
                      })
                    }
                  }
                  var waterfallComponent = this.selectComponent("#waterfallView");
                  waterfallComponent.appendItem(this.data.theCourseData);
                  this.refreshCount();
                }
              })
            }
          },
          fail: res => {
            console.log(res)
            wx.hideLoading();
            Toast.fail({
              message: "网络请求超时",
              duration: 1000
            })
          }
        })
      },
    })
  },

  onDeleteCourse: function() {
    wx.showModal({
      title: '对话框',
      content: '确认删除该课程？',
      success: res => {
        if (res.confirm) {
          db.collection('stuSignSysCourseMsg').doc(this.data._id)
            .remove({
              success: res => {
                wx.showToast({
                  title: '删除课程成功',
                  icon: 'success',
                  success: function() {
                    setTimeout(function() {
                      wx.switchTab({
                        url: '/pages/courseList/courseList',
                      })
                    }, 500)
                  }
                })
              }
            })
        }
      }
    })
  }
})