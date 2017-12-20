const trim = function(str) {
  //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};


const parseParam=function(param, key){  
  let paramStr="";  
  if(param instanceof String||param instanceof Number||param instanceof Boolean){  
    paramStr+="&"+key+"="+encodeURIComponent(param);  
  }else{  
    for(let p in param){ 
      paramStr+='&'+p+"="+encodeURIComponent(param[p]);
    };  
  }  
  return paramStr.substr(1);  
};

const charFilter = function(str) {
  str = str.replace(/[\n]/gi, "");
  str = str.replace(/\"/g, "");
  return trim(str);
};
const getUtils = {
  parseParam: function(param, key){   
    return parseParam(param, key);  
  }, 
  getModel: function() {
    console.log("fdfd");
  },
  formatDate: function(dateTime) {
    let d = new Date(dateTime);
    return d.Format("yyyy-MM-dd hh:mm:ss");
  },
  fileValid: function(file) {
    if (file == "") {
      // alert("请选择要上传的文件");
      return false;
    } else {
      //检验文件类型是否正确
      console.log(file);
      let exec = /[.]/.exec(file) ? /[^.]+$/.exec(file.toLowerCase()) : "";
      console.log(exec);
      let validType = ["pdf", "doc", "docx", "txt", "ppt", "xls", "xlsx"];
      let index = $.inArray(exec[0], validType);
      console.log(index);
      if (index < 0) {
        alert("文件格式不对，请上传Pdf文件!");
        return false;
      }
    }
    return true;
  },
  addWordsPre: function(container) {
    let words = container.getSelection().toString();
    let text = charFilter(words);
    container.getSelection().removeAllRanges();
    if ("" != text) {
      if (text.length > 100) {
        alert("选取的词超过了100个字符，请重新选取！");
        return null;
      } else {
        let content = $("#myIframe").contents();
        let page = content.find("#pageNumber").val();
        let item = {
          id: 1,
          textContent: text,
          pageNum: parseInt(page)
        };
        return item;
      }
      return null;
    }
  },
  textFormater: function(str) {
    str = str.replace(/[\n]/gi, "");
    str = str.replace(/\"/g, "");
    return str;
  },
  removeElement: function(arr, ele) {
    var result = [];
    if (arr instanceof Array) {
      if (ele instanceof Array) {
        result = arr.filter(function(item) {
          var isInEle = ele.some(function(eleItem) {
            return item === eleItem;
          });
          return !isInEle;
        });
      } else {
        result = arr.filter(function(item) {
          return item !== ele;
        });
      }
    } else {
      console.log("parameter error of function removeElement");
    }
    return result;
  }
};

export default getUtils;
