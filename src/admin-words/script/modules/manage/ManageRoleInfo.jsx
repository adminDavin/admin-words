import React from "react";
const th = (
  <thead>
    <tr>
      <th scope="col">序号</th>
      <th scope="col">角色名称</th>
      <th scope="col">角色描述</th>
      <th scope="col">创建时间</th>
      <th scope="col">修改时间</th>
      <th scope="col">创建人</th>
      <th scope="col">默认服务</th>
    </tr>
  </thead>
);

class ManageRoleInfo extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="container-fluid">
          <table className="table table-responsive-md">
            {th}
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ManageRoleInfo;
