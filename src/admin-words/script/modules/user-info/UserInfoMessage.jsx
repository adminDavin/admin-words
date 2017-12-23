import React from "react";
import "bootstrap/dist/js/bootstrap.js";

export default class UserInfoMessage extends React.Component {
    constructor(props) {
        super(props);
        this.nav = [
            { col1: { task: "待处理消息" } },
            { col2: { userList: "用户管理" } },
            { col3: { roleList: "角色管理" } },
            { col4: { serverList: "系统服务" } }
        ];
    }
    checkIsNull() {
        console.log("fdfd");
    }
    render() {
        return (
            <div className="container">
                <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoBase"> 基本信息
                </div>
                <div className="row" id="collapseUserInfoBase">
                    <form className="col-7">
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"用户名"}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control dv-mt5" placeholder="user name"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"姓名"}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control dv-mt5" placeholder="real name"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"姓名拼写"}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control dv-mt5" placeholder="user name"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"出生日期"}</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control dv-mt5" placeholder=""></input>
                            </div>
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"性别"}</label>
                            <div className="col-sm-3 dv-mt5">
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input"></input>
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">男</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio2" name="radio" type="radio" className="custom-control-input"></input>
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">女</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"个性签名"}</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoContact"> 联系方式
                </div>
                <div className="row" id="collapseUserInfoContact">
                    <form className="col-7">
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"所属组织"}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control dv-mt5" placeholder="organize"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"用户地址"}</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control dv-mt5" placeholder="address"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"联系电话"}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control dv-mt5" placeholder="phone"></input>
                            </div>
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"邮箱"}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control dv-mt5" placeholder="email"></input>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoSelf"> 备注
                </div>
                <div className="row dv-mt5" id="collapseUserInfoSelf">
                    <form className="col-10">
                        <div className="form-group row">
                            <label className=" text-center  col-sm-2 col-form-label alert-link">{"备注"}</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
