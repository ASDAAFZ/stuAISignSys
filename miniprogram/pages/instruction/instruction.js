// miniprogram/pages/instruction/instruction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth: false,
    getAblumAccess: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }]
  },

  openset: function() {
  },

  tapDialogButton: function(e) {
    console.log(e);
    if (e.detail.index === 1) {
      wx.openSetting({
        success: function(res) {}
      })
    }
    this.setData({
      getAblumAccess: false
    });
  },

  saveImg1: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            auth: true
          })
          that.saveToBlum1();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          //第一次弹框授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.setData({
                auth: true
              })
              that.saveToBlum1();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          that.setData({
            getAblumAccess: true
          });
        }
      }
    })
  },
  saveImg2: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            auth: true
          })

          that.saveToBlum2();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          //第一次弹框授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.setData({
                auth: true
              })
              that.saveToBlum2();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          that.setData({
            getAblumAccess: true
          });

        }
      }
    })
  },
  saveImg3: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            auth: true
          })
          that.saveToBlum3();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          //第一次弹框授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.setData({
                auth: true
              })
              that.saveToBlum3();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          that.setData({
            getAblumAccess: true
          });

        }
      }
    })
  },
  saveImg4: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            auth: true
          })
          that.saveToBlum4();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          //第一次弹框授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.setData({
                auth: true
              })
              that.saveToBlum4();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          that.setData({
            getAblumAccess: true
          });
        }
      }
    })
  },


  saveToBlum1: function() {
    wx.showModal({
      title: '提示',
      content: '确定要保存这张图片吗？',
      success: function(res) {
        if (res.confirm) {
          wx.getImageInfo({
            src: 'https://7374-stormcrow-wechat1-uhe9e-1300531306.tcb.qcloud.la/exo.jpg?sign=4c57f9cd755d5653c803849b16ede0aa&t=1575194812',
            success: function(res) {
              console.log(res);
              var path = res.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function(res) {
                  wx.showToast({
                    title: '图片已保存',
                    icon: 'success',
                    duration: 1200
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none',
                    duration: 1200
                  })
                }
              })
            }
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '取消',
            icon: 'none',
            duration: 1200
          })
        }
      }
    })
  },
  saveToBlum2: function() {
    wx.showModal({
      title: '提示',
      content: '确定要保存这张图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.getImageInfo({
            src: 'https://7374-stormcrow-wechat1-uhe9e-1300531306.tcb.qcloud.la/101.jpg?sign=16bd00a091afaeeb6041586390ed8d52&t=1575194830',
            success: function(res) {
              console.log(res);
              var path = res.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function(res) {
                  wx.showToast({
                    title: '图片已保存',
                    icon: 'success',
                    duration: 1200
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none',
                    duration: 1200
                  })
                }
              })
            }
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '取消',
            icon: 'none',
            duration: 1200
          })
        }
      }
    })
  },

  saveToBlum3: function() {
    wx.showModal({
      title: '提示',
      content: '确定要保存这张图片吗？',
      success: function(res) {
        if (res.confirm) {
          wx.getImageInfo({
            src: 'https://7374-stormcrow-wechat1-uhe9e-1300531306.tcb.qcloud.la/pn.jpg?sign=e62feefbbc345cf7bce96a1460cf9ba3&t=1575194849',
            success: function(res) {
              console.log(res);
              var path = res.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function(res) {
                  wx.showToast({
                    title: '图片已保存',
                    icon: 'success',
                    duration: 1200
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none',
                    duration: 1200
                  })
                }
              })
            }
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '取消',
            icon: 'none',
            duration: 1200
          })
        }
      }
    })
  },

  saveToBlum4: function() {
    wx.showModal({
      title: '提示',
      content: '确定要保存这张图片吗？',
      success: function(res) {
        if (res.confirm) {
          wx.getImageInfo({
            src: 'https://7374-stormcrow-wechat1-uhe9e-1300531306.tcb.qcloud.la/ynj.jpg?sign=d5de8062ab138ddfe3b5a4bd1c57506e&t=1575194865',
            success: function(res) {
              console.log(res);
              var path = res.path;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function(res) {
                  wx.showToast({
                    title: '图片已保存',
                    icon: 'success',
                    duration: 1200
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none',
                    duration: 1200
                  })
                }
              })
            }
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '取消',
            icon: 'none',
            duration: 1200
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.setData({
            auth: true
          })
        }
      }
    })
  }
})