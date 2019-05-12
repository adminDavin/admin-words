webpackJsonp([7],{

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(exports,"__esModule",{value:true});var trim=function trim(str){

return str.replace(/(^\s*)|(\s*$)/g,"");
};
var isEmailStr=function isEmailStr(str){
var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
var strForm=trim(str);
return{
content:strForm,
valid:reg.test(strForm)};

};
Date.prototype.Format=function(fmt){
var o={
"M+":this.getMonth()+1,
"d+":this.getDate(),
"h+":this.getHours(),
"m+":this.getMinutes(),
"s+":this.getSeconds(),
"q+":Math.floor((this.getMonth()+3)/3),
S:this.getMilliseconds()};

if(/(y+)/.test(fmt))
fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
for(var k in o){
if(new RegExp("("+k+")").test(fmt))
fmt=fmt.replace(RegExp.$1,RegExp.$1.length==1?
o[k]:
("00"+o[k]).substr((""+o[k]).length));}
return fmt;
};

var parseParam=function parseParam(param,key){
var paramStr="";
if(param instanceof String||param instanceof Number||param instanceof Boolean){
paramStr+="&"+key+"="+encodeURIComponent(param);
}else{
for(var p in param){
paramStr+="&"+p+"="+encodeURIComponent(param[p]);
}
}
return paramStr.substr(1);
};

var charFilter=function charFilter(str){
str=str.replace(/[\n]/gi,"");
str=str.replace(/\"/g,"");
return trim(str);
};

var deleteSpaceStr=function deleteSpaceStr(str,flag){
var strForm=str.replace(/\s+/g,"");
var valid=false;

if(strForm.length>8||flag){
valid=true;
}
return{
content:strForm,
valid:valid};

};

var getUtils={
trim:trim,
parseParam:parseParam,
getModel:function getModel(){
console.log("fdfd");
},
formatDate:function formatDate(dateTime){
var d=new Date(dateTime);
return d.Format("yyyy-MM-dd hh:mm:ss");
},

formatDateNew:function formatDateNew(dateTime){
var d=new Date(dateTime);
return d.Format("yyyy-MM-dd");
},
fileValid:function fileValid(file){
if(file==""){

return false;
}else{

console.log(file);
var exec=/[.]/.exec(file)?
/[^.]+$/.exec(file.toLowerCase()):
"";
console.log(exec);
var validType=[
"pdf",
"doc",
"docx",
"txt",
"ppt",
"xls",
"xlsx"];

var index=$.inArray(exec[0],validType);
console.log(index);
if(index<0){
alert("文件格式不对，请上传Pdf文件!");
return false;
}
}
return true;
},
addWordsPre:function addWordsPre(container){
var words=container.
getSelection().
toString();
var text=charFilter(words);
container.
getSelection().
removeAllRanges();
if(""!=text){
if(text.length>100){
alert("选取的词超过了100个字符，请重新选取！");
return null;
}else{
var content=$("#myIframe").contents();
var page=content.
find("#pageNumber").
val();
console.log('current page is '+page);
if(isNaN(parseInt(page))){
var tmpPage=content.find("#numPages")[0].innerText;
console.log('current page is '+tmpPage);
page=tmpPage.replace('(','').replace(')','').split('/')[0];
page=parseInt(page);
console.log('current page is '+page);
}
var item={
id:1,
textContent:text,
pageNum:parseInt(page)};

return item;
}
return null;
}
},

textFormater:function textFormater(str){
str=str.replace(/[\n]/gi,"");
str=str.replace(/\"/g,"");
return str;
},
removeElementById:function removeElementById(arr,ele){
var result=[];
if(arr instanceof Array){
if(ele instanceof Array){
result=arr.filter(function(item){
var isInEle=ele.some(function(eleItem){
return item===eleItem;
});
return!isInEle;
});
}else{
result=arr.filter(function(item){
return item[ele.name]!==ele.value;
});
}
}else{
console.log("parameter error of function removeElement");
}
return result;
},
removeElement:function removeElement(arr,ele){
var result=[];
if(arr instanceof Array){
if(ele instanceof Array){
result=arr.filter(function(item){
var isInEle=ele.some(function(eleItem){
return item===eleItem;
});
return!isInEle;
});
}else{
result=arr.filter(function(item){
return item!==ele;
});
}
}else{
console.log("parameter error of function removeElement");
}
return result;
},
checkIsEmail:function checkIsEmail(email){
var userName=isEmailStr(email);
if(!userName.valid){
alert("这不是一个合法邮箱，请确认");
return"";
}
return userName.content;
},
checkIsNull:function checkIsNull(value,flag){
console.log(value,flag);
var password=deleteSpaceStr(value,flag);
if(!password.valid){
alert("值不允许为空或者小于8位，请确认");
return"";
}
return password.content;
},

getRequestParams:function getRequestParams(){
var params={};
var paramsStr=window.location.search;
if(paramsStr){
var encodeParams=paramsStr.replace(/^\?/,"");
var paramsDecode=encodeParams;
var tmp=paramsDecode.
replace(/^\?/,"").
split("&");var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{
for(var _iterator=tmp[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var item=_step.value;
var param=item.split("=");
if(param.length==2){
params[param[0]]=param[1];
}
}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}
}
return params;
}};exports.default=


getUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ })

},[7]);