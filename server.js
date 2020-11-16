let http = require('http');
var fs = require('fs');
let server = http.createServer(function(req, res) {
console.log("URL страницы: " + req.url);
res.setHeader("Content-Type", "text/html");
res.writeHead(200);
let myReadShort = fs.createReadStream(__dirname + '/comment.html', 'utf8');
// res.end(`<html><body><h1>This is HTML</h1></body></html>`);
let fileContent = fs.readFile('./comment.html', 'utf8',function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data)
    });
console.log("RRRR");
console.log(fileContent);
// res.end(fs.readFile(__dirname + '/comment.html', 'utf8'));
res.end('HHHHHHHHHHHH')
// myReadShort.pipe(res);
});

server.listen(3000, 'localhost');
console.log("Мв отслеживаем порт 3000");
