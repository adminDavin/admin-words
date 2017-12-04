 
 
const getUtils={
    getModel: function(){
        console.log("fdfd");
    },
    validFile:function(file) {
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
      fileValid:function(file) {
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
      addWordsPre:function(words){
        let text = charFilter(words);
        if ("" != text) {
          if (text.length > 100) {
            alert("选取的词超过了100个字符，请重新选取！"); 
          } else {
            let content = $("#myIframe").contents();
            let page = content.find("#pageNumber").val();
            let item = {
              id: 1,
              words: text,
              pageInfo: parseInt(page) + me.state.value - 1
            };
            return item; 
          }
        }
      },
      textFormater:function(str) {
  str = str.replace(/[\n]/gi, "");
  str = str.replace(/\"/g, "");
  return str;
};
};

export default  getUtils;

