const CryptoJS = require("crypto-js");

console.log(CryptoJS);
const crypto = {
  encodeBase64: function(encodeStr) {
    let str = CryptoJS.enc.Utf8.parse(encodeStr);
    return CryptoJS.enc.Base64.stringify(str);
  },
  decodeBase64: function(decodeStr) {
    let str = CryptoJS.enc.Base64.parse(decodeStr);
    return str.toString(CryptoJS.enc.Utf8);
  },
  encodeAES: function(encodeStr, key) {
    let str = CryptoJS.enc.Utf8.parse(encodeStr);
    let encrypted = CryptoJS.AES.encrypt(encodeStr, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  },
  decodeAES: function(decodeStr, key) {
    let decoded = CryptoJS.AES.decrypt(decodeStr, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decoded); // 转换为 utf8 字符串
  }
};

export default crypto;
