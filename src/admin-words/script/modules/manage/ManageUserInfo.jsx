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
          dataSource: {
            url: "/admin/getUserListByState",
            params: [0, 6]
          },
          columnList: [
            {
              name: "index",
              title: "#"
            },
            {
              name: "taskName",
              title: "任务名称"
            },
            {
              name: "taskType",
              title: "任务类型"
            },
            {
              name: "createTime",
              title: "创建时间"
            },
            {
              name: "state",
              title: "处理状态"
            },
            {
              name: "applyer",
              title: "申请人账号"
            },
            {
              name: "operat",
              title: "操作"
            }
          ]
        },
        {
          tabTitle: "所有用户列表",
          index: 1,
          name: "userInfo"
        },
        {
          tabTitle: "在用用户列表",
          index: 2,
          name: "userList"
        },
        {
          tabTitle: "管理员列表",
          index: 3,
          name: "managerInfo"
        },
        {
          tabTitle: "角色管理",
          index: 4,
          name: "authInfo"
        },
        {
          tabTitle: "系统服务",
          index: 5,
          name: "serviceInfo"
        },
        {
          tabTitle: "设置",
          index: 6,
          name: "settingInfo"
        }
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
      <div className="row container-fluid" style={ { marginLeft: 15 } }>
        <Tabs className="row dv-width-100" defaultIndex={ 0 } onSelect={ (index, name, e) => this.tabSelectedContent(index, name, e) }>
          <TabList className="col-auto nav flex-column dv-manager">
            { this.state.tabContent.map((item, index) => {
                return <Tab key={ item.name + item.index }>
                         { item.tabTitle }
                       </Tab>;
              }) }
          </TabList>
          <div className="col dv-tab-content">
            { this.state.tabContent.map((item, index) => {
                return (
                  <TabPanel key={ item.name + item.index } name={ item.name }>
                    <ManageTabContent index={ 2 } manageId={ this.props.userId } title={ item.tabTitle } name={ item.name } colum={ item.columnList } dataSource={ item.dataSource }
                      data={ this.state.contentData } />
                  </TabPanel>
                  );
              }) }
          </div>
        </Tabs>
      </div>
      );
  }
}

export default ManageUserInfo;
