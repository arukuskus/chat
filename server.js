
let http = require('http');
var fs = require('fs');
const server = http.createServer(function(req, res) => {
    console.log('URL страницы: ${req.url}');
    if(req.url === '/'){
        sendRes('comment.html', 'text/html', res);
    }

});


server.listen(3000, '192.168.0.102');
console.log("Мв отслеживаем порт 3000");