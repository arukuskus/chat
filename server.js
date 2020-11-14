let http = require('http');
var fs = require('fs');
let server = http.createServer(function(req, res) {
console.log("URL страницы: " + req.url);
res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
let myReadShort = fs.createReadStream(__dirname + '/comment.html', 'utf8');
//res.end('Привет, мир!');
myReadShort.pipe(res);
});

server.listen(3000, '192.168.0.102');
console.log("Мв отслеживаем порт 3000");
