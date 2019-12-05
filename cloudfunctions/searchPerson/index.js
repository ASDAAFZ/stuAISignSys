// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require('tencentcloud-sdk-nodejs')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const IaiClient = tencentcloud.iai.v20180301.Client;
  const models = tencentcloud.iai.v20180301.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("", "");//此处应根据个人的腾讯云设置更改
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.SearchFacesRequest();

  let params = '{"GroupIds":["' + event.group_id + '"], "Image":"' + event.imagecode +'", "MaxFaceNum":"10", "MaxPersonNum":"1", "QualityControl":"2", "FaceMatchThreshold": "60"}';
  const wxContext = cloud.getWXContext()
  req.from_json_string(params);

  return new Promise(function(resolve, reject){
    client.SearchFaces(req, function (errMsg, response) {

      if(errMsg) {
        reject(errMsg)
      }
      else {
        resolve(response)
      }
    }
    )}
  )
}