import React from "react";
import HelloMessage from "../HelloMessage.jsx";
import "bootstrap/dist/js/bootstrap.js";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs";
import { BrowserRouter, Route, Router, Link } from "react-router-dom";
import "react-tabs/style/react-tabs.scss";
import ManageTabContent from "./ManageTabContent.jsx";
class ManageUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      loginName: this.props.loginName,
      tabContent: [
        {
          tabTitle: "待处理任务",
          index: 0,
          name: "taskInfo",
          dataSource: { url: "/admin/getUserListByState", params: [0, 6] },
          columnList: [
            { name: "index", title: "#" },
            { name: "taskName", title: "任务名称" },
            { name: "taskType", title: "任务类型" },
            { name: "createTime", title: "创建时间" },
            { name: "state", title: "处理状态" },
            { name: "applyer", title: "申请人账号" },
            { name: "operat", title: "操作" }
          ]
        },
        {
          tabTitle: "用户列表",
          index: 1,
          name: "userInfo",
          dataSource: {
            url: "/admin/getUserListByState",
            params: [0, 1, 2, 3, 6]
          },
          columnList: [
            { name: "index", title: "#" },
            { name: "operat", title: "操作" },
            { name: "userName", title: "用户账号" },
            { name: "organize", title: "所属组织" },
            { name: "phone", title: "联系电话" },
            { name: "state", title: "处理状态" },
            { name: "accepter", title: "审核人" },
            { name: "acceptDate", title: "处理时间" }
          ]
        },
        {
          tabTitle: "管理员列表",
          index: 2,
          name: "managerInfo",
          dataSource: {
            url: "/admin/getUserListByState",
            params: [5, 7]
          },
          columnList: [
            { name: "index", title: "#" },
            { name: "operat", title: "操作" },
            { name: "userName", title: "用户账号" },
            { name: "organize", title: "所属组织" },
            { name: "phone", title: "联系电话" },
            { name: "state", title: "处理状态" },
            { name: "acceptDate", title: "处理时间" },
            { name: "accepter", title: "审核人" }
          ]
        },
        {
          tabTitle: "权限管理",
          index: 3,
          name: "authInfo",
          dataSource: {
            url: "/admin/getRoleList",
            params: [5, 7]
          },
          columnList: [
            { name: "index", title: "#" },
            { name: "roleName", title: "角色名称" },
            { name: "roleDesc", title: "角色描述" },
            { name: "creator", title: "创建人" },
            { name: "createDate", title: "创建时间" },
            { name: "state", title: "角色状态" },
            { name: "baseSevice", title: "基础服务" },
            { name: "operat", title: "操作" }
          ]
        },
        {
          tabTitle: "系统服务",
          index: 4,
          name: "serviceInfo",

          dataSource: {
            url: "/admin/getServerList",
            params: [5, 7]
          },
          columnList: [
            { name: "index", title: "#" },
            { name: "serviceName", title: "服务名称" },
            { name: "serviceDesc", title: "服务描述" },
            { name: "state", title: "服务状态" },
            { name: "createDate", title: "创建时间" }
          ]
        },
        { tabTitle: "设置", index: 6, name: "settingInfo", columnList: [] }
      ],
      currentIndex: 0,
      contentData: []
    };
  }

  componentDidUpdate() {}
  tabSelectedContent(index, name, e) {
    // console.log("dd", index, name, e);
    // this.setState({ contentData: [{ title: "fff" }] });
  }
  render() {
    return ( 
        <Tabs  
          defaultIndex={0}
          onSelect={(index, name, e) => this.tabSelectedContent(index, name, e)}
        > 
            <TabList className="col-2 nav flex-column">
              {this.state.tabContent.map((item, index) => {
                return <Tab key={item.name + item.index}>{item.tabTitle}</Tab>;
              })}
            </TabList>
            <div className="col-10 dv-tab-content">
              {this.state.tabContent.map((item, index) => {
                return (
                  <TabPanel key={item.name + item.index} name={item.name}>
                    <ManageTabContent
                      index={2}
                      manageId={this.props.userId}
                      title={item.tabTitle}
                      name={item.name}
                      colum={item.columnList}
                      dataSource={item.dataSource}
                      data={this.state.contentData}
                    />
                  </TabPanel>
                );
              })} 
            </div>
        </Tabs>
    );
  }
}

export default ManageUserInfo;
