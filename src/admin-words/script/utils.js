const trim = function(str) {
  //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
const charFilter = function(str) {
  str = str.replace(/[\n]/gi, "");
  str = str.replace(/\"/g, "");
  return trim(str);
};
const getUtils = {
  getModel: function() {
    console.log("fdfd");
  },
  validFile: function(file) {
    if (file == "") {
      // alert("请选择要上传的文件");
      return false;
    } else {
      //检验文件类型是否正确
      var exec = /[.]/.exec(file) ? /[^.]+$/.exec(file.toLowerCase()) : "";
      if (exec != "pdf") {
        alert("文件格式不对，请上传Pdf文件!");
        return false;
      }
    }
    return true;
  },
  fileValid: function(file) {
    if (file == "") {
      // alert("请选择要上传的文件");
      return false;
    } else {
      //检验文件类型是否正确
      var exec = /[.]/.exec(file) ? /[^.]+$/.exec(file.toLowerCase()) : "";
      // if (exec != "pdf") {
      //   alert("文件格式不对，请上传Pdf文件!");
      //   return false;
      // }
    }
    return true;
  },
  addWordsPre: function(words) {
    let text = charFilter(words);
    if ("" != text) {
      if (text.length > 100) {
        alert("选取的词超过了100个字符，请重新选取！");
        return null;
      } else {
        let content = $("#myIframe").contents();
        let page = content.find("#pageNumber").val();
        let item = {
          id: 1,
          words: text,
          pageInfo: parseInt(page)
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
