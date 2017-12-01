import WordsInfo from './bean/WordsInfo' 

let words=new WordsInfo(); 

console.log(words.getJson()); 
const tplTable = (item)=>{
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
        var arg = String(arguments[i]);
        // Escape special characters in the substitution.
        s += arg.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        // Don't escape special characters in the template.
        s += templateData[i];
      }
      return s;
    return 
}

class MainInfo{
    init(){
        console.log('this is init string;');
        $('#words-table').append("<div>ddddd</div>");
    }
}

let mainInfo=new MainInfo();
mainInfo.init();