Markdown2PDF
====
markdown file convert to pdf

## Description
マークダウンをpdfに変換するツールです。
出力するPDFのサイズ，マージン，markdownに設定するcssファイルをconfigで設定することが可能です。

## Usage
- convert/mdフォルダの直下にmarkdownファイルを設置
- convert/sourceフォルダに設定したいcssを追加
- configの設定
  - pdfConfig
    - format: "A4" //PDFのサイズ  A3, A4, A5, Legal, Letter, Tabloid
    - border: "12mm" //PDFのマージン mm以外にもpx, cm, inでも指定可能
    - border: {"top":"12mm","right":"12mm","bottom":"12mm","left":"17mm"} //PDFのマージンをそれぞれに設定する場合にはこちらで設定

  - htmlConfig
    - tagSetting: true //trueにするとMD内に記述したHTMLタグがテキストではなくHTMLタグとして出力される。code内に記述しているタグにも効いてしまうので注意
    - css:"github.css" //適応させるCSSを指定

- 以下のコマンドを実行
```
  node md2PDF
```

