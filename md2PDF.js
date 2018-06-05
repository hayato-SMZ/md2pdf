'use strict';
const pdf = require('html-pdf');
const md2html = require('markdown-to-html').Markdown;
const fs = require('fs');
const async = require('async');
const path = require('path');

var isExistFile = function(file) {
  try {
    fs.statSync(file);
    return true;
  } catch(err) {
    if(err.code === 'ENOENT') return false;
  }
};

var config = require('./config');

var html2PdfProc = function(file, htmldata){
  var pdfFile = path.join("./convert/pdf", file.replace(/\.md/,".pdf"));
  makeDir("./convert/pdf");
  pdf.create(htmldata, config.pdfConfig).toFile(pdfFile, function(err){
    if(err){
      console.error(pdfFile + '>>>>>' + err);
      process.exit();
    }else{
      console.log(file + " covnert to PDF");
    }
  });
};

var replaceHTMLCode = function(code){
  code = code.replace(/&lt;/g, "<");
  code = code.replace(/&gt;/g, ">");
  code = code.replace(/&quot;/g, "\"");
  return code;
};

var fileCopy = function(read, write){
  fs.copyFile(read, write,function(e){
    if(e){
      console.log(e);
    }
  });
};

var makeDir = function(path){
  if(!fs.existsSync(path)){fs.mkdir(path);}
};

var  md2htmlProc = function(file, htmloption){
  var md = new md2html();
  md.bufmax = 2048;
  var html = "";
  var mdFile = path.join("./convert/md", file);
  var htmlFile = path.join("./convert/html", file.replace(/\.md/,".html"));
  md.render(mdFile, htmloption, function(err, re){
    if(err){
      console.error('>>>' + err);
      process.exit();
    }
    var html = md.html.replace(/\[ \] /g, "<input type=\"checkbox\">");
    if(config.htmlConfig.tagSetting){html = replaceHTMLCode(html);}
    fs.writeFile(htmlFile, html, (error)=>{if(error){console.error('writeFile ERROR:', error)};}, function(){
      html2PdfProc(file, html);
    });
  });
};

var md2pdfConvert = function(fileList){
  var htmloption = {title:"テストタイトル"};
  if(!!config.css){
    var convertPath = path.join(__dirname, "convert");
    var htmlDirPath = path.join(convertPath, "html");
    makeDir(htmlDirPath);
    makeDir(path.join(htmlDirPath, "source"));
    htmloption.stylesheet = path.join("./source" , config.css);
    fileCopy(path.join(convertPath, htmloption.stylesheet), path.join(htmlDirPath, htmloption.stylesheet));
  }

  async.each(fileList, function(file, callback){
    md2htmlProc(file, htmloption);
  });
  // for(var i = 0 ; i < fileList.length ; i++){
  //   md2htmlProc(fileList[i], htmloption);
  // }
};

fs.readdir('./convert/md', function(err, files){
  // console.log(files)
  if(err) throw err;
  var fileList = [];
  files.filter(function(file){
    return /.*\.md$/.test(file); //絞り込み
  }).forEach(function (file) {
    fileList.push(file);
  });
  // console.log(fileList);
  md2pdfConvert(fileList);
});
