import crypto from "./crypto.js";

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
    let data = { params: getParamData(), url: window.location.pathname };

    if (data.url === "/viewer.html") {
      if (data.params.userId) {
      }
    }
    return data;
  }
};

export default routeInfo;
