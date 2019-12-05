import Notify from "../../components/vant-weapp/notify/notify.js";
import Toast from '../../components/vant-weapp/toast/toast';

const db = wx.cloud.database();

// pages/courseAdd/courseAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: wx.getSystemInfoSync().windowHeight.toString() + "px",
    pageWidth: wx.getSystemInfoSync().windowWidth.toString() + "px",
    inputWidth: (wx.getSystemInfoSync().windowWidth * 0.7).toString() + "px",
    pageShow: [true, false, false, false],
    courseName: "",
    courseTime: "",
    courseRoom: "",
    courseIntroduction: "",
    showPopUp: false,
    tmpStudentName: "",
    tmpStudentID: "",
    tmpStudentSex: "",
    tmpStudentPhotoUrl: "/images/add.png",
    studentsMsg: [{
      flag: "addStudent"
    }],
    nowIndex: 2,
    showPopUpCorrect: false,
    allStudentsData: [],
    hasSelected: [],
    showTimePop: false,
    currentDate: new Date().getTime(),
    letFirstFlag: false
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    db.collection("allStudents").get({
      success: res => {
        let tmpHasSelected = this.data.hasSelected;
        for (let i = 0; i < res.data.length; i++) {
          tmpHasSelected[i] = false;
        }
        this.setData({
          allStudentsData: res.data,
          hasSelected: tmpHasSelected
        });
        db.collection("allStudents").skip(20).get({
          success: res => {
            let tmpHasSelected = this.data.hasSelected;
            for (let i = 20; i < 20 + res.data.length; i++) {
              tmpHasSelected[i] = false;
            }
            let tmpPartStudents = this.data.allStudentsData;
            tmpPartStudents = tmpPartStudents.concat(res.data);
            this.setData({
              allStudentsData: tmpPartStudents,
              hasSelected: tmpHasSelected
            });
          }
        })
      }
    })
  },

  testTest: function() {
    console.log(this.data.hasSelected);
    console.log(this.data.allStudentsData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  pageOneToTwo: function() {
    if (this.data.courseName.length === 0 || this.data.courseTime.length === 0 || this.data.courseRoom.length === 0) {
      Toast.fail({
        message: '课程名称、课程时间、课程地点为必填项',
        duration: 1500
      });
    } else {
      this.setData({
        pageShow: [false, true, false]
      });
    }
  },

  pageTwoToThree: function() {
    if (this.data.courseIntroduction.length < 15) {
      Toast.fail({
        message: '请至少输入15个字符的课程简介',
        duration: 1500
      });
    } else {
      this.setData({
        pageShow: [false, false, true]
      })
    }
  },

  pageThreeToFour: function() {
    this.setData({
      pageShow: [false, false, false, true],
      pageHeight: (wx.getSystemInfoSync().windowHeight * 1.8).toString() + "px"
    });
  },

  bindKeyInputCourseName: function(e) {
    this.setData({
      courseName: e.detail.value
    });
  },

  bindKeyInputCourseTime: function(e) {
    this.setData({
      showTimePop: true,
      letFirstFlag: true
    });
  },

  onClose: function() {
    this.setData({
      showTimePop: false
    });
  },

  bintapCancal: function(e) {
    this.setData({
      showTimePop: false
    });
  },

  bintapInput: function(e) {
    if (this.data.letFirstFlag) {
      let m = new Date(e.detail);
      m = m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate() + " " + m.getHours() + ":" + m.getMinutes();
      this.setData({
        courseTime: m
      });
    }
  },

  bindKeyInputCourseRoom: function(e) {
    this.setData({
      courseRoom: e.detail.value
    });
  },

  bindKeyInputCourseIntroduction: function(e) {
    this.setData({
      courseIntroduction: e.detail.value
    });
  },

  bindKeyInputStudentName: function(e) {
    this.setData({
      tmpStudentName: e.detail.value
    })
  },

  bindKeyInputStudentID: function(e) {
    this.setData({
      tmpStudentID: e.detail.value
    })
  },

  bindKeyInputStudentSex: function(e) {
    this.setData({
      tmpStudentSex: e.detail.value
    })
  },

  setShowPopUp: function() {
    this.setData({
      showPopUp: true
    });
  },

  setShowPopUpCorrect: function() {
    this.setData({
      showPopUpCorrect: true
    });
  },

  setShowPopUpCorrectFalse: function() {
    this.setData({
      showPopUpCorrect: false
    });
  },


  addStudent: function(e) {
    this.setData({
      nowIndex: this.data.studentsMsg.length - 1,
      tmpStudentName: "",
      tmpStudentID: "",
      tmpStudentSex: "",
      tmpStudentPhotoUrl: "/images/add.png"
    });
    this.setShowPopUp();
  },

  setShowPopUpFalse: function() {
    this.setData({
      showPopUp: false
    });
  },

  modifyStudent: function(e) {
    let nowStudent = e.currentTarget.dataset.bindex;
    let tmpStudentName = this.data.studentsMsg[nowStudent].stuName;
    let tmpStudentID = this.data.studentsMsg[nowStudent].stuID;
    let tmpStudentSex = this.data.studentsMsg[nowStudent].stuSex;
    this.setData({
      tmpStudentName: tmpStudentName,
      tmpStudentID: tmpStudentID,
      tmpStudentSex: tmpStudentSex,
      nowIndex: nowStudent
    });
    this.setShowPopUpCorrect();
  },

  deleteStudent: function() {
    let nowStudent = this.data.nowIndex;
    let studentsMsg = this.data.studentsMsg;
    studentsMsg = studentsMsg.slice(0, nowStudent).concat(studentsMsg.slice(nowStudent + 1, studentsMsg.length));
    this.setData({
      studentsMsg: studentsMsg
    });
    this.setShowPopUpCorrectFalse();
  },

  submitData: function() {
    let count = 0;
    for (let i = 0; i < this.data.hasSelected.length; i++) {
      if (this.data.hasSelected[i])
        count++;
    }
    if (count === 0) {
      Toast.fail({
        message: '请至少选择一位学生',
        duration: 1500
      });
    } else {
      wx.showLoading({
        title: '加载中'
      });
      let tmpStuStatus = {};
      let tmpStu = [];
      let tmpAllStudent = this.data.allStudentsData;
      let hasSelected = this.data.hasSelected;
      for (let i = 0; i < hasSelected.length; i++) {
        if (hasSelected[i]) {
          tmpStu.push(tmpAllStudent[i].stuID);
          let key = tmpAllStudent[i].stuID;
          tmpStuStatus[key] = {
            stuPhotoUrl: tmpAllStudent[i].stuPhotoUrl,
            stuName: tmpAllStudent[i].stuName,
            stuSex: tmpAllStudent[i].stuSex,
            hasSigned: false
          }
        }
      }
      db.collection("stuSignSysCourseMsg").add({
        data: {
          courseName: this.data.courseName,
          courseTime: this.data.courseTime,
          courseRoom: this.data.courseRoom,
          courseIntro: this.data.courseIntroduction,
          hasSigned: false,
          stuID: tmpStu,
          stuStatus: tmpStuStatus
        },
        success: (res) => {
          wx.hideLoading();
          console.log("success!");
          wx.navigateBack({
            url: '/pages/courseList/courseList',
          })
        },
        fail: (res) => {
          wx.hideLoading();
          console.log("fail!");
        }
      })
    }
  },

  upLoadPhoto: function(filePath) {
    const tempFilePath = filePath;
    const cloudPath = `stuSignSysPhoto/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + tempFilePath.match(/\.[^.]+?$/);
    return wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: tempFilePath
    })
  },

  submitStudentMsg: function() {
    let nowIndex = this.data.nowIndex;
    let studentsMsg = this.data.studentsMsg;
    if (nowIndex + 1 === this.data.studentsMsg.length) {
      let oneStudent = [{
        stuName: this.data.tmpStudentName,
        stuID: this.data.tmpStudentID,
        stuSex: this.data.tmpStudentSex,
        stuPhotoUrl: this.data.tmpStudentPhotoUrl
      }];
      studentsMsg = studentsMsg.slice(0, studentsMsg.length - 1).concat(oneStudent).concat([{
        flag: "addStudent"
      }]);
      this.setData({
        studentsMsg: studentsMsg
      });
    } else {
      studentsMsg[nowIndex].stuName = this.data.tmpStudentName;
      studentsMsg[nowIndex].stuID = this.data.tmpStudentID;
      studentsMsg[nowIndex].stuSex = this.data.tmpStudentSex;
      studentsMsg[nowIndex].stuPhotoUrl = this.data.tmpStudentPhotoUrl;
      this.setData({
        studentsMsg: studentsMsg
      });
    }
    this.setShowPopUpFalse();
  },

  submitStudentMsgCorrect: function() {
    let nowIndex = this.data.nowIndex;
    let studentsMsg = this.data.studentsMsg;
    if (nowIndex + 1 === this.data.studentsMsg.length) {
      let oneStudent = [{
        stuName: this.data.tmpStudentName,
        stuID: this.data.tmpStudentID,
        stuSex: this.data.tmpStudentSex,
        stuPhotoUrl: this.data.tmpStudentPhotoUrl
      }];
      studentsMsg = studentsMsg.slice(0, studentsMsg.length - 1).concat(oneStudent).concat([{
        flag: "addStudent"
      }]);
      this.setData({
        studentsMsg: studentsMsg
      });
    } else {
      studentsMsg[nowIndex].stuName = this.data.tmpStudentName;
      studentsMsg[nowIndex].stuID = this.data.tmpStudentID;
      studentsMsg[nowIndex].stuSex = this.data.tmpStudentSex;
      studentsMsg[nowIndex].stuPhotoUrl = this.data.tmpStudentPhotoUrl;
      this.setData({
        studentsMsg: studentsMsg
      });
    }
    this.setShowPopUpCorrectFalse();
  },

  inputStuName: function(e) {
    this.setData({
      tmpStudentName: e.detail.value
    });
  },

  inputStuID: function(e) {
    this.setData({
      tmpStudentID: e.detail.value
    });
  },

  inputStuSex: function(e) {
    this.setData({
      tmpStudentSex: e.detail.value
    });
  },

  uploadStudentPhoto: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        /* const tempFilePaths = res.tempFilePaths */
        this.setData({
          tmpStudentPhotoUrl: res.tempFilePaths[0]
        });
      }
    })
  },

  selectStudent: function(e) {
    //e.currentTarget.dataset.bindex
    let nowIndex = e.currentTarget.dataset.bindex;
    let tmpSelectStudent = this.data.allStudentsData;
    let tmpHasSelected = this.data.hasSelected;
    tmpHasSelected[nowIndex] = !tmpHasSelected[nowIndex];

    this.setData({
      hasSelected: tmpHasSelected,
    });
  }

})