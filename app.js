const cheerio = require("cheerio");
const express = require("express");
const superAgent = require("superagent");
const httpurl = 'https://daily.zhihu.com/'


// 创建服务器
const server = express();
server.listen(8080);
console.log("已成功运行服务器，请访问:http://localhost:8080/");

// 前端页面
server.use(express.static("./src", { index: "./index.html" }));

// cgi 请求 → 抓取知乎日报 HTML 文档
server.get("/getdata", (req, res) => {
  superAgent.get(httpurl, (err, data) => {
    if (err) {
      console.log('请求报错');
      res.send({
        code: 0,
        msg: '请求失败',
        data: null
      });
    } else {
      console.log('请求成功');
      let parseData = parseHtmlData(data.text);
      res.send({
        code: 1,
        msg: '请求成功',
        data: parseData
      });
    }
  });
});


// 解析 HTML 文档
function parseHtmlData(htmlStr) {
  let res = [];
  let $ = cheerio.load(htmlStr);
  $(".main-content-wrap .col-lg-4 .wrap").each(function(index) {
    let imgurl = $(this).find(".preview-image").attr("src");
    let title = $(this).find(".title").text();
    let href = $(this).find(".link-button").attr("href");
    let subRes = {
      imgurl: imgurl,
      title: title,
      href: href
    };
    res.push(subRes);
  })
  return res;
}

