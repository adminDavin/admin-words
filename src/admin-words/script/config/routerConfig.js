import crypto from "./crypto.js";

const title = {right: "管理员登录",
regist: "用户注册",
userMange: "用户管理"};

const urlConfig ={
  viewer:{current:"/viewer.html",to:{userInfo:"/userInfo.html"},isUserAuth:true},
  userInfo:{current:"/userInfo.html",to:{viewer:"/viewer.html",manageInfo:"/manageInfo.html"},isUserAuth:true}, 
  manageInfo:{current:"/manageInfo.html",to:{userInfo:"/userInfo.html"},isUserAuth:true},
  login:{current:"/login.html",to:{viewer:"/viewer.html",manageInfo:"/manageInfo.html",userInfo:"/userInfo.html"}}, 
  register:{current:"/register.html"}
};

const getParamData = function() {
  let params = {};
  let paramsStr = window.location.search;
  // console.log("---------------------------");
  // let keyOld = "23232";
  // let keyValue = crypto.encodeBase64(keyOld);
  // let key = crypto.decodeBase64(keyValue);
  // console.log(key, keyOld);
  // let encode = crypto.encodeAES(keyOld, key);
  // let decode = crypto.decodeAES(encode, key);
  // console.log(keyOld, decode);
  // console.log("-----------------------------");
  // // console.log(ciphertext);

  if (paramsStr) {
    let encodeParams = paramsStr.replace(/^\?/, "");
    let paramsDecode = encodeParams;
    let tmp = paramsDecode.replace(/^\?/, "").split("&");
    for (let item of tmp) {
      let param = item.split("=");
      if (param.length == 2) {
        params[param[0]] = param[1];
      }
    }
  }
  return params;
};

const routeInfo = {
  getRouteInfo: function() {
    let data = { params: getParamData() };  
    if (window.location.pathname === urlConfig.viewer.current) {
      let current = urlConfig.viewer; 
      if (current.isUserAuth&&!data.params.userId) {
        location.href = urlConfig.login.current;
      }
      data['title'] = {name:title.userMange,url:current.to.userInfo,params:data.params};
      return data;
    } 
    return data;
  }
};

export default routeInfo;
