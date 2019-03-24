import axios from "axios";

const qs = require('qs');
function downFile(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName);
  } else {
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', fileName);
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
  }
}
 
const request = {
  getModel: function() {
    console.log("fdfd");
  },
  sendRequstExportWords:function(url, params, resp) {
    let option = {
      method: "post",
      url: url,
      responseType: 'blob',
      data: qs.stringify(params)
    };
    axios(option).then(function(res) { 
      if (res.status == 200) {
        let blob = res.data;
        let fileName = res.headers['content-disposition'].split('=')[1];
        downFile(blob, fileName);
      }
    });
  },
  sendRequstNew:function(url, params, resp) {
    let option = {
      method: "post",
      url: url,
      data: qs.stringify(params)
    };
    axios(option).then(function(response) {
      if (response.status == 200) {
        resp(response.data);
      }
    });
  },
  sendRequst: function(url, params, resp) {
    let option = {
      method: "post",
      url: url,
      data: params
    };
    axios(option).then(function(response) {
      if (response.status == 200) {
        resp(response.data);
      }
    });
  },
  apiLoadFile: function(resp, data) {
    axios({
      method: "post",
      url: "/admin/loadDocument",
      data: data
    })
      .then(function(response) {
        if (response.status == 200) {  
            resp(response.data); 
        }
      })
      .catch(function(error) { 
        console.log(error);
        alert(error);
      });
  }
};

export default request;
