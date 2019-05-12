webpackJsonp([5],{

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _jsxFileName="C:\\zhangdw\\project\\king-words\\admin-words\\src\\admin-words\\script\\login.js";var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);
var _reactDom=__webpack_require__(10);var _reactDom2=_interopRequireDefault(_reactDom);
var _loginInfo=__webpack_require__(225);var _loginInfo2=_interopRequireDefault(_loginInfo);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

_reactDom2.default.render(_react2.default.createElement(_loginInfo2.default,{__source:{fileName:_jsxFileName,lineNumber:5}}),document.getElementById("content"));

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="C:\\zhangdw\\project\\king-words\\admin-words\\src\\admin-words\\script\\modules\\login\\loginInfo.jsx";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);
var _reactDom=__webpack_require__(10);var _reactDom2=_interopRequireDefault(_reactDom);
var _utils=__webpack_require__(7);var _utils2=_interopRequireDefault(_utils);
__webpack_require__(17);
var _request=__webpack_require__(8);var _request2=_interopRequireDefault(_request);
var _crypto=__webpack_require__(54);var _crypto2=_interopRequireDefault(_crypto);
var _Modal=__webpack_require__(28);var _Modal2=_interopRequireDefault(_Modal);
var _routerConfig=__webpack_require__(49);var _routerConfig2=_interopRequireDefault(_routerConfig);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var modalActionMap={
register:{name:"register",title:"注册新账号"},
forgotPassword:{name:"forgotPass",title:"重置密码"},
magageLogin:{name:"manager"}};


var checkUserInfo=function checkUserInfo(params){
var flag=true;
var newParams=[];
for(var j=0;j<params.length;j++){
var item=params[j];
var value="";
if(item.type=='email'){
value=_utils2.default.checkIsEmail(item.value);
if(value==""){
return null;
}
}else if(item.type=='pass'){
value=_utils2.default.checkIsNull(item.value,false);
if(value==""){
return null;
}
}else if(item.type=='text'){
value=_utils2.default.checkIsNull(item.value,true);
if(value==""){
return null;
}
}
newParams.push({name:item.name,type:item.type,value:value});
}
return newParams;
};var


ManageLogin=function(_React$Component){_inherits(ManageLogin,_React$Component);
function ManageLogin(props){_classCallCheck(this,ManageLogin);var _this=_possibleConstructorReturn(this,(ManageLogin.__proto__||Object.getPrototypeOf(ManageLogin)).call(this,
props));
_this.state={
forgetPassEleDisplay:{},
userName:"",
password:"",
confirmPassword:"",
variCode:"",
hiddenSendVari:false,
modalFlag:""};return _this;

}_createClass(ManageLogin,[{key:"clearValue",value:function clearValue()

{
this.setState(
{
forgetPassEleDisplay:{},
userName:"",
password:"",
confirmPassword:"",
variCode:"",
hiddenSendVari:false,
modalFlag:""});


}},{key:"handleChange",value:function handleChange(

vari,event){
var data={};
data[vari]=_utils2.default.trim(event.target.value);
this.setState(data);
}},{key:"loginAction",value:function loginAction()


{
var params=[{name:'userName',type:'email',value:this.state.userName},{name:'password',type:'pass',value:this.state.password}];
var newParams=checkUserInfo(params);
if(newParams==null){
return;
}
var userName=newParams[0].value;
var password=newParams[1].value;

var me=this;
$("#loading").modal("show");
_request2.default.sendRequstNew(
"/admin/login",
{
password:_crypto2.default.encodeBase64(password),
isManage:me.props.isManage,
loginName:userName},

function(result){
setTimeout(function(){
$("#loading").modal("hide");
me.clearValue();
},1000);
if(result.code!="200"){
alert(result.result);
}else{
var data=result.result.data;
if(me.props.isManage==true){
location.href="/manager.html?userId="+data.userId+"&key="+data.key+"&loginName="+data.loginName+"&isManage="+me.props.isManage;
return false;
}else{
location.href="/userInfo.html?userId="+data.userId+"&key="+data.key+"&loginName="+data.loginName;
}
}
});

}},{key:"sendVariCodeAction",value:function sendVariCodeAction(
event){
var params=[{name:'userName',type:'email',value:this.state.userName}];
var newParams=checkUserInfo(params);
if(newParams==null){
return;
}
var userName=newParams[0].value;
$("#loading").modal("show");
_request2.default.sendRequstNew(
"/admin/sendVariCode",
{loginName:userName},
function(result){
setTimeout(function(){
$("#loading").modal("hide");
},1000);
if(result.code!="200"){
alert(result.result);
}else{
var data=result.result.data;
me.setState({hiddenSendVari:true,readOnlyInput:true});
alert("验证码已发送成功，请查阅邮件查看验证码");
}
});


}},{key:"modalAction",value:function modalAction(
mine,event){
var params=[{name:'userName',type:'email',value:mine.state.userName},
{name:'password',type:'pass',value:mine.state.password},
{name:'confirmPassword',type:'pass',value:mine.state.confirmPassword}];

if(mine.state.modalFlag==modalActionMap.forgotPassword.name){
params.push({name:'variCode',type:'text',value:mine.state.variCode});
}
mine.clearValue();
var newParams=checkUserInfo(params);
if(newParams==null){
return;
}

var requestParams={};
for(var j=0;j<newParams.length;j++){
var item=newParams[j];
if(item.name=='password'||item.name=='confirmPassword'){
requestParams[item.name]=_crypto2.default.encodeBase64(item.value);
}else{
requestParams[item.name]=item.value;
}
}
console.log(requestParams);
if(requestParams.password!=requestParams.confirmPassword){
alert("两次密码输入不一致，请确认");
return;
}
delete requestParams.confirmPassword;
if(mine.state.modalFlag==modalActionMap.forgotPassword.name){
_request2.default.sendRequstNew("/admin/modifyPass",requestParams,function(result){
if(result.code!="200"){
alert(result.result);
}else{
var data=result.result.data;
alert("密码修改成功！");
}
});
}else{
_request2.default.sendRequstNew("/admin/simpleRegist",requestParams,function(result){
if(result.code!="200"){
alert(result.result);
}else{
var data=result.result.data;
alert("您已注册成功，请登录完善用户信息，以便管理员进行审核！");
location.href=
"/userInfo.html?userId="+
data.userId+
"&key="+
data.key+
"&loginName="+
data.loginName;
}
});
}
}},{key:"closeAction",value:function closeAction(
mine,event){
mine.clearValue();
}},{key:"goToLocation",value:function goToLocation(

flag,me){
if(modalActionMap.magageLogin.name==flag){
if(this.props.isManage){
window.location=location.pathname;
}else{
window.location=location.pathname+"?action=manager";
}
}else{
this.setState({modalFlag:flag});
}
}},{key:"registerContent",value:function registerContent()

{
var showVariCode=false;
if(this.state.modalFlag==modalActionMap.register.name){
showVariCode=true;
}
return _react2.default.createElement("form",{className:"dv-modal-register",__source:{fileName:_jsxFileName,lineNumber:219}},
_react2.default.createElement("div",{className:"form-group row justify-content-center has-success",__source:{fileName:_jsxFileName,lineNumber:220}},
_react2.default.createElement("label",{className:"col-auto col-form-label col-form-label-sm",__source:{fileName:_jsxFileName,lineNumber:221}},"\u6CE8\u518C\u90AE\u7BB1"),
_react2.default.createElement("div",{className:"col-sm-9",__source:{fileName:_jsxFileName,lineNumber:222}},
_react2.default.createElement("input",{type:"email",className:"form-control form-control-sm",
placeholder:"name@example.com",
value:this.state.userName,
onChange:this.handleChange.bind(this,"userName"),__source:{fileName:_jsxFileName,lineNumber:223}}))),



_react2.default.createElement("div",{className:"form-group row justify-content-center",hidden:showVariCode,__source:{fileName:_jsxFileName,lineNumber:230}},
_react2.default.createElement("label",{className:"col-auto col-form-label col-form-label-sm",__source:{fileName:_jsxFileName,lineNumber:231}},"\u83B7\u53D6\u90AE\u7BB1\u9A8C\u8BC1\u7801"),
_react2.default.createElement("button",{
type:"button",
className:"col-auto btn btn-primary btn-sm dv-mt5",
hidden:this.state.hiddenSendVari,
onClick:this.sendVariCodeAction.bind(this),__source:{fileName:_jsxFileName,lineNumber:232}},"\u786E\u5B9A"),



_react2.default.createElement("div",{className:"col-auto row",__source:{fileName:_jsxFileName,lineNumber:240}},
_react2.default.createElement("label",{className:"col-auto col-form-label col-form-label-sm",__source:{fileName:_jsxFileName,lineNumber:241}},"\u8F93\u5165\u90AE\u7BB1\u9A8C\u8BC1\u7801:"),
_react2.default.createElement("input",{type:"text",className:"col-5 form-control form-control-sm",
placeholder:"\u90AE\u7BB1\u9A8C\u8BC1\u7801",
value:this.state.variCode,
onChange:this.handleChange.bind(this,"variCode"),__source:{fileName:_jsxFileName,lineNumber:242}}))),



_react2.default.createElement("div",{className:"form-group row justify-content-center",__source:{fileName:_jsxFileName,lineNumber:249}},
_react2.default.createElement("label",{className:"col-auto col-form-label col-form-label-sm",__source:{fileName:_jsxFileName,lineNumber:250}},"\u767B\u5F55\u5BC6\u7801"),
_react2.default.createElement("div",{className:"col-sm-9",__source:{fileName:_jsxFileName,lineNumber:251}},
_react2.default.createElement("input",{type:"password",className:"form-control form-control-sm",
placeholder:"\u5BC6\u7801\u957F\u5EA6\u4E0D\u5C0F\u4E8E8\u4F4D",
value:this.state.password,
onChange:this.handleChange.bind(this,"password"),__source:{fileName:_jsxFileName,lineNumber:252}}))),



_react2.default.createElement("div",{className:"form-group row justify-content-center",__source:{fileName:_jsxFileName,lineNumber:259}},
_react2.default.createElement("label",{className:"col-auto col-form-label col-form-label-sm",__source:{fileName:_jsxFileName,lineNumber:260}},"\u5BC6\u7801\u786E\u8BA4"),
_react2.default.createElement("div",{className:"col-sm-9",__source:{fileName:_jsxFileName,lineNumber:261}},
_react2.default.createElement("input",{type:"password",className:"form-control form-control-sm",
value:this.state.confirmPassword,
onChange:this.handleChange.bind(this,"confirmPassword"),__source:{fileName:_jsxFileName,lineNumber:262}}))));




}},{key:"getModal",value:function getModal()


{
var title="";
if(this.state.modalFlag==modalActionMap.register.name){
title=modalActionMap.register.title;
}

if(this.state.modalFlag==modalActionMap.forgotPassword.name){
title=modalActionMap.forgotPassword.title;
}

var content=this.registerContent();
return _react2.default.createElement(_Modal2.default,{
modalEleId:"registerModalLong",
modalTitle:title,
modalAction:this.modalAction,
modalColseAction:this.closeAction,
mine:this,__source:{fileName:_jsxFileName,lineNumber:283}},

content);


}},{key:"render",value:function render()
{
var label1="用户登录";
var label2="管理员登录";

if(this.props.isManage){
label1="管理员登录";
label2="用户登录";
}

return(
_react2.default.createElement("div",{className:this.props.isManage?'dv-manager':'dv-user',__source:{fileName:_jsxFileName,lineNumber:304}},
this.getModal(),
_react2.default.createElement("h3",{className:"text-center",__source:{fileName:_jsxFileName,lineNumber:306}},label1),
_react2.default.createElement("hr",{className:"my-2",__source:{fileName:_jsxFileName,lineNumber:307}}),
_react2.default.createElement("form",{__source:{fileName:_jsxFileName,lineNumber:308}},
_react2.default.createElement("div",{className:"form-group",style:{marginBottom:0},__source:{fileName:_jsxFileName,lineNumber:309}},
_react2.default.createElement("label",{className:"col-form-label",__source:{fileName:_jsxFileName,lineNumber:310}},
_react2.default.createElement("span",{className:"dv-mr10",__source:{fileName:_jsxFileName,lineNumber:311}},"\u8D26\u53F7"),
_react2.default.createElement("button",{type:"button",className:"btn btn-outline-info btn-sm",
onClick:this.goToLocation.bind(this,modalActionMap.register.name),
"data-toggle":"modal",
"data-target":"#registerModalLong",
hidden:this.props.isManage,__source:{fileName:_jsxFileName,lineNumber:312}},"\u6CA1\u6709\u8D26\u53F7,\u65B0\u6CE8\u518C\u4E00\u4E2A\uFF1F")),




_react2.default.createElement("input",{
type:"text",
className:"form-control form-control-sm",
placeholder:"name@example.com",
value:this.state.userName,
onChange:this.handleChange.bind(this,"userName"),__source:{fileName:_jsxFileName,lineNumber:321}})),


_react2.default.createElement("div",{className:"form-group",__source:{fileName:_jsxFileName,lineNumber:329}},
_react2.default.createElement("label",{className:"col-form-label",__source:{fileName:_jsxFileName,lineNumber:330}},
_react2.default.createElement("span",{className:"dv-mr10",__source:{fileName:_jsxFileName,lineNumber:331}},"\u5BC6\u7801"),
_react2.default.createElement("button",{type:"button",className:"btn btn-outline-info btn-sm",
"data-toggle":"modal",
"data-target":"#registerModalLong",
onClick:this.goToLocation.bind(this,modalActionMap.forgotPassword.name),__source:{fileName:_jsxFileName,lineNumber:332}},"\u5FD8\u8BB0\u5BC6\u7801\uFF1F")),




_react2.default.createElement("input",{
type:"password",
className:"form-control form-control-sm form-control-danger",
value:this.state.password,
onChange:this.handleChange.bind(this,"password"),__source:{fileName:_jsxFileName,lineNumber:340}})),


_react2.default.createElement("div",{className:"form-group",__source:{fileName:_jsxFileName,lineNumber:347}},
_react2.default.createElement("button",{
type:"button",
className:"btn btn-info btn-sm btn-block",
onClick:this.loginAction.bind(this),__source:{fileName:_jsxFileName,lineNumber:348}},"\u767B\u5F55"))),





_react2.default.createElement("div",{className:"row justify-content-around",__source:{fileName:_jsxFileName,lineNumber:357}},
_react2.default.createElement("label",{className:"col-3",__source:{fileName:_jsxFileName,lineNumber:358}},
_react2.default.createElement("input",{type:"checkbox",className:"form-check-input",__source:{fileName:_jsxFileName,lineNumber:359}}),
_react2.default.createElement("span",{__source:{fileName:_jsxFileName,lineNumber:360}},"\u8BB0\u4F4F\u6211?")),

_react2.default.createElement("div",{className:"col-2 align-self-end",__source:{fileName:_jsxFileName,lineNumber:362}},
_react2.default.createElement("button",{
type:"button",
className:"btn btn-secondary btn-sm",
onClick:this.goToLocation.bind(this,modalActionMap.magageLogin.name),__source:{fileName:_jsxFileName,lineNumber:363}},

label2)))));





}}]);return ManageLogin;}(_react2.default.Component);
;var


LoginInfo=function(_React$Component2){_inherits(LoginInfo,_React$Component2);
function LoginInfo(props){_classCallCheck(this,LoginInfo);var _this2=_possibleConstructorReturn(this,(LoginInfo.__proto__||Object.getPrototypeOf(LoginInfo)).call(this,
props));
var params=_routerConfig2.default.getParamData();
var isManage=true;
if(params.action==undefined){
isManage=false;
}
_this2.state={
isManage:isManage,
forgetPassEleDisplay:{},
confirmPassword:"",
variCode:"",
hiddenSendVari:false,
readOnlyInput:false};return _this2;

}_createClass(LoginInfo,[{key:"render",value:function render()


{
return(
_react2.default.createElement("div",{className:"container",__source:{fileName:_jsxFileName,lineNumber:399}},
_react2.default.createElement("div",{className:"row justify-content-center dv-pt30",__source:{fileName:_jsxFileName,lineNumber:400}},
_react2.default.createElement("div",{className:"col-7 jumbotron",style:{marginTop:'5%'},__source:{fileName:_jsxFileName,lineNumber:401}},
_react2.default.createElement(ManageLogin,{isManage:this.state.isManage,__source:{fileName:_jsxFileName,lineNumber:402}})))));




}}]);return LoginInfo;}(_react2.default.Component);exports.default=

LoginInfo;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="C:\\zhangdw\\project\\king-words\\admin-words\\src\\admin-words\\script\\modules\\login\\Modal.jsx";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(0);var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
Modal=function(_React$Component){_inherits(Modal,_React$Component);
function Modal(props){_classCallCheck(this,Modal);return _possibleConstructorReturn(this,(Modal.__proto__||Object.getPrototypeOf(Modal)).call(this,
props));
}_createClass(Modal,[{key:"componentDidMount",value:function componentDidMount()
{}},{key:"render",value:function render()
{
return(
_react2.default.createElement("div",{
className:"modal fade",
id:this.props.modalEleId,
tabIndex:"-1",
role:"dialog",
"aria-labelledby":"forgetPassModalLongTitle",
"aria-hidden":"true",__source:{fileName:_jsxFileName,lineNumber:9}},

_react2.default.createElement("div",{className:"modal-dialog dv-modal",role:"document",__source:{fileName:_jsxFileName,lineNumber:17}},
_react2.default.createElement("div",{className:"modal-content",style:{width:this.props.width},__source:{fileName:_jsxFileName,lineNumber:18}},
_react2.default.createElement("div",{className:"modal-header",__source:{fileName:_jsxFileName,lineNumber:19}},
_react2.default.createElement("span",{className:"fi-credit-card",__source:{fileName:_jsxFileName,lineNumber:20}}),
_react2.default.createElement("h5",{className:"modal-title",__source:{fileName:_jsxFileName,lineNumber:21}},this.props.modalTitle),
_react2.default.createElement("button",{
type:"button",
className:"close",
"data-dismiss":"modal",
"aria-label":"Close",
onClick:this.props.modalColseAction.bind(
this,
this.props.mine),__source:{fileName:_jsxFileName,lineNumber:22}},


_react2.default.createElement("span",{"aria-hidden":"true",__source:{fileName:_jsxFileName,lineNumber:32}},"\xD7"))),


_react2.default.createElement("div",{className:"modal-body",id:"modalForm",style:{marginTop:0},__source:{fileName:_jsxFileName,lineNumber:35}},
this.props.children),

_react2.default.createElement("div",{className:"modal-footer",__source:{fileName:_jsxFileName,lineNumber:38}},
_react2.default.createElement("button",{
type:"button",
className:"btn btn-primary btn-sm",
"data-dismiss":"modal",
onClick:this.props.modalAction.bind(this,this.props.mine),__source:{fileName:_jsxFileName,lineNumber:39}},

"确定"),

_react2.default.createElement("button",{
type:"button",
className:"btn btn-secondary btn-sm",
"data-dismiss":"modal",
onClick:this.props.modalColseAction.bind(
this,
this.props.mine),__source:{fileName:_jsxFileName,lineNumber:47}},


"取消"))))));






}}]);return Modal;}(_react2.default.Component);exports.default=Modal;

/***/ })

},[224]);