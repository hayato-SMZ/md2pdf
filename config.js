const path = require('path');
module.exports = {
  pdfConfig:{
    format:"A4",//PDFサイズ
    border: {"top":"12mm","right":"12mm","bottom":"12mm","left":"17mm"}, //上下左右のマージン
    base:"file:///" +  path.join(__dirname, "convert", "source").replace(/\\/g,"/") //css，imgなどのソースディレクトリ
  },
  htmlConfig:{
    tagSetting: false //trueにするとタグが生きる※コードないのタグも生きるので注意!!
  },
  css: "test.css"
};
