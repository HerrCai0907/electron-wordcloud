# electron-wordcloud

### 介绍

词云是一个基于 electron 构建的 typescript 项目，可以根据文本内容生成对应的词云

支持 普通文本，docx，文字格式的 pdf（无 ocr 功能）

### 安装

目前尚未完成发布，可下载代码后使用`yarn`安装依赖，使用`npm run pack`进行打包使用（只在开发环境 mac m1 上测试过）

### 使用的依赖

- UI: react + antd
- pdf 解析: pdfjs-dist
- docx 解析: node-stream-zip + htmlparser2
- 解码: jschardet + iconv-lite
- 分词: nodejieba
- 字体渲染: opentype.js

### 开发

运行`npm install` 或 `yarn` 前设置以下环境变量

```bash
export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

```cmd
$ENV:ELECTRON_MIRROR="http://npm.taobao.org/mirrors/electron/"
```
