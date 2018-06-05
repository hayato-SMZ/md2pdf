Markdown2PDF
====
markdown file convert to pdf

## Description
コマンドラインでmdファイルをpdfに変換するツールです。
一度に複数のファイルを変換できます。
出力するPDFのサイズ，マージン，markdownに設定するcssファイルをconfigで設定することが可能です。

## Getting started
このリポジトリをcloneまたはdownloadしてください。


## Usage
ダウンロードしたファイルで以下のコマンドで必要なパッケージのインストールをしてください。
```
  npm install
```
実行は以下のコマンドです。
```
  node md2PDF
```

## setting
- convert/mdフォルダの直下にmarkdownファイルを設置
- convert/sourceフォルダに設定したいcssを追加
- configの設定
  - pdfConfig
    - format: "A4" //PDFのサイズ  A3, A4, A5, Legal, Letter, Tabloid
    - border: "12mm" //PDFのマージン mm以外にもpx, cm, inでも指定可能
    - border: {"top":"12mm","right":"12mm","bottom":"12mm","left":"17mm"} //PDFのマージンをそれぞれに設定する場合にはこちらで設定

  - htmlConfig
    - tagSetting: true //trueにするとmd内に記述したHTMLタグがテキストではなくHTMLタグとして出力される。md内のすべてのデータに効いてしまうので注意
    - css:"test.css" //適応させるCSSを指定
