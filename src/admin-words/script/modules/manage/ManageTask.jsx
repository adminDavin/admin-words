import React from "react";
import CommonTable from "./CommonTable";
const th = (
  <thead>
    <tr>
      <th scope="col">序号</th>
      <th scope="col">处理状态</th>
      <th scope="col">任务类型</th>
      <th scope="col">用户ID</th>
      <th scope="col">用户邮箱</th>
      <th scope="col">任务生成时间</th>
      <th scope="col">当前处理人</th>
    </tr>
  </thead>
);
const columns = [
  { col: "id", name: "序号", width: "50px" },
  { col: "doStatus", name: "处理状态", width: "100px" },
  { col: "doType", name: "任务类型", width: "120px" },
  { col: "UserName", name: "用户名", width: "150px" },
  { col: "userEmail", name: "用户邮箱", width: "240px" },
  { col: "createTime", name: "创建时间", width: "200px" },
  { col: "aceptName", name: "处理人", width: "100px" }
];

class ManageTask extends React.Component {
  constructor() {
    super();
    this.state = { data: [], columns: columns };
  }

  componentDidMount() {
    let data = [
      {
        id: 1,
        doStatus: "未处理",
        doType: "用户注册",
        userEmail: "745854511@qq.cpm",
        UserName: "zhangdawei",
        createTime: "2017-11-23 12:23:23",
        aceptName: "张伟"
      },
      {
        id: 4,
        doStatus: "未处理",
        doType: "用户注册",
        userEmail: "745854511@qq.cpm",
        UserName: "zhangdawei",
        createTime: "2017-11-23 12:23:23",
        aceptName: "张伟"
      },
      {
        id: 3,
        doStatus: "未处理",
        doType: "用户注册",
        userEmail: "745854511@qq.cpm",
        UserName: "zhangdawei",
        createTime: "2017-11-23 12:23:23",
        aceptName: "张伟"
      },
      {
        id: 2,
        doStatus: "未处理",
        doType: "用户注册",
        userEmail: "745854511@qq.cpm",
        UserName: "zhangdawei",
        createTime: "2017-11-23 12:23:23",
        aceptName: "张伟"
      }
    ];
    this.setState({ data: data });
  }

  onRowDoubleClick = function(event) {
    console.log(event);
  };

  render() {
    return (
      <div className="row">
        <div className="container-fluid">
          <CommonTable
            data={this.state.data}
            columns={columns}
            onRowDoubleClick={this.onRowDoubleClick}
          />
        </div>
      </div>
    );
  }
}

export default ManageTask;
