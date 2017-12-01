import React from "react"; 

export default class ViewTitile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row alert alert-primary">
         <div className="col-2"> 
            <button type="button" className="btn btn-outline-secondary btn-sm">{'切换文档'}</button>
         </div>
         <div  className="col-6 align-self-center">{'文档名称:'}</div>
         <div  className="col-4 align-self-center">{'文档ID:'}</div>
         </div>
      </div>
    );
  }
}
