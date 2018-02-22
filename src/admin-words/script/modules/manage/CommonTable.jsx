import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const selectRow = {
  mode: "radio" //radio or checkbox
};

class CommonTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      onRowDoubleClick: this.props.onRowDoubleClick
    };

    return (
      <div className="row">
        <div className="container-fluid">
          <BootstrapTable version="4" data={ this.props.data } condensed hover pagination search searchPlaceholder="key words ..." ignoreSinglePage options={ options }>
            { this.props.columns.map((col, i) => {
                if (i == 0) {
                  return (
                    <TableHeaderColumn isKey dataField={ col.col } searchable={ false } key={ i } width={ col.width }>
                      { col.name }
                    </TableHeaderColumn>
                    );
                } else {
                  return (
                    <TableHeaderColumn dataField={ col.col } searchable={ false } key={ i } width={ col.width }>
                      { col.name }
                    </TableHeaderColumn>
                    );
                }
              }) }
          </BootstrapTable>
        </div>
      </div>
      );
  }
}

export default CommonTable;
