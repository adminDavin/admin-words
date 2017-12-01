class WordsInfo {
    constructor(id,wordsName,documentId,count,findPage,findTime,remark) {
        this._id= id ;
        this._wordsName= wordsName;
        this._documentId=  documentId;
        this._count= count;
        this._findPage= findPage;
        this._findTime=   findTime;
        this._remark= remark;
    } 
    getId(){
        return this._id;
    }
    getDesc(){
        return {
            id :"序号", 
            wordsName: "检索词" ,
            documentId:"文档ID", 
            count:"总计次数", 
            findPage :"录入页码", 
            findTime :"录入时间",  
            remark :"备注" 
        }
    }
    getJson(){
        return {
            id :this._id, 
            wordsName: this._wordsName ,
            documentId:this._documentId, 
            count:  this._count, 
            findPage :this._findPage, 
            findTime :this._findTime,  
            remark :this._remark 
        }
    }
}

export default WordsInfo;