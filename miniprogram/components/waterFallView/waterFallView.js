// components/waterFallView/waterFallView.js
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dbName: String,
    limitField: String,
    field: Object,
    detailBoolean: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    showLoading: false,
    itemNum: 0,
    maxRefreshNum: 8
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickEvent: function(e) {
      if(this.properties.detailBoolean == true) return;
      this.triggerEvent(
          'openPage',
          {
            _id: e.currentTarget.id
          },
          {}
      )
    },

    toCutdownString: function(templateString, length) {
      return templateString.substring(0, length);
    },

    appendItem: function (itemData) {
      var length;
      let proData = this.properties;
      if(proData.detailBoolean == false) {
        length = itemData.length;
        for (let i = 0; i < length; i++) {
          this.data.items.push({
            id: this.data.itemNum + i,
            _id: itemData[i]['_id'],
            courseName:itemData[i]['courseName'],
            courseRoom:itemData[i]['courseRoom'],
            courseTime:itemData[i]['courseTime']
          })
        }
      }
      else {
        this.clearWaterfall()
        length = itemData['stuID'].length;
        var stuData = itemData['stuStatus'];
        for (let i = 0; i < length; i++) {
          var stuID = itemData['stuID'][i]
          var nowStu = stuData[stuID];
          this.data.items.push({
            stuID: stuID,
            stuName: nowStu['stuName'],
            stuSex: nowStu['stuSex'],
            imageUrl: nowStu['stuPhotoUrl'],
            hasSigned: nowStu['hasSigned']
          })
        }
      }
      this.setData({
        items: this.data.items,
        itemNum: this.data.items.length,
      })
    },

    clearWaterfall: function() {
      this.setData({
        items: [],
        itemNum: 0
      })
    },

    switchLoading: function() {
      let nowStatu = this.data.showLoading;
      if(nowStatu == true) nowStatu = false;
      else nowStatu = true;
      this.setData({
        showLoading: nowStatu
      })
    },

    onLoadData: async function () {
      this.switchLoading();
      let proData = this.properties;
      var resData;
      resData = await db.collection(proData.dbName)
        .field(proData.field)
        .limit(this.data.maxRefreshNum)
        .skip(this.data.itemNum)
        .get()
      let itemData = resData.data;
      await this.appendItem(itemData);
      this.switchLoading();
    }
  }
})