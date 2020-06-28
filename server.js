const express = require("express");
const proxy = require("http-proxy-middleware");
const history = require("connect-history-api-fallback");
const app = express();

app.use(history());
// app.use(history({
//     index:"index2.html"// 重新指向的文件，默认是index.html
// }));
app.use(express.static(__dirname+"/dist"));
app.listen(80,function () {
    console.log("manage->success")
})