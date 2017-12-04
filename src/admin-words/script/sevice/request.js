 
 
import axios from "axios";

const request={
    getModel: function(){
        console.log("fdfd");
    }, 
    apiLoadFile:function(resp,data){
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
              console.log(error);
            });
    }
    
};

export default  request;

