import axios from "axios";

const request = {
  getModel: function() {
    console.log("fdfd");
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
          if (response.data.code == 200) {
            let result = response.data.result;
            resp(result);
          }
        }
      })
      .catch(function(error) { 
        alert(error);
      });
  }
};

export default request;
