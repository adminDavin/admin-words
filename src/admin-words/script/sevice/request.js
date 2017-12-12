import axios from "axios";

const qs = require('qs');
const request = {
  getModel: function() {
    console.log("fdfd");
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
