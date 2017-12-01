import React from "react";   
import ReactTooltip from 'react-tooltip';

class ViewWordsTable extends React.Component {
  state={data:[{id:1,words:"this is test!",pageInfo:5},
    {id:2,words:"this is  !",pageInfo:5},
    {id:3,words:"this is test!",pageInfo:5},
    {id:4,words:"this is test!",pageInfo:5}
    ]};
    componentDidMount() { 
        // console.log($('[data-toggle="tooltip"]'));
        // $(function () {
        //     $('[data-toggle="tooltip"]').tooltip()
        //   })
      }
    
  render() {
    let data=this.state.data;  
    return (
      <div className="container-fluid">   
        <div className="row ">
            <table className="table thead-light">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">检索词</th>
                    <th scope="col">录入页码</th> 
                </tr>
            </thead>
            <tbody> 
                {data.map((item,key)=>{
                    return (<tr key={'words_'+key}>
                        <td>{key+1}</td>
                        <td className="dv-td-text-longer">
                        <p data-tip={item.words} isCapture="true" html="true">{item.words}</p>
                        <ReactTooltip />
                        <span data-toggle="tooltip" title={item.words}>{item.words}</span>
                        </td>
                        <td>{item.pageInfo}</td>
                    </tr>)
                })}
            </tbody>
            </table>
        </div> 
        </div>
    );
  }
}
export default ViewWordsTable;