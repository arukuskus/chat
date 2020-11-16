let http = require('http');
let fs = require('fs');

// create a http server
http.createServer(function (req, res) {

    if (req.url === '/') {
        // for other URLs, try responding with the page
        console.log(req.url)
        // read requested file
        fs.readFile('./comment.html',
            function(err, data) {
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
            });
    } else {
        // for other URLs, try responding with the page
        console.log(req.url)
        // read requested file
        // fs.readFile('./comment.html',
        //     function(err, data) {
        //         if (err) throw err;
        //         res.writeHead(200);
        //         res.write(data.toString('utf8'));
        //         return res.end();
        //     });
        fs.readFile(req.url.substring(1),
            function(err, data) {
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
            });
    }
}).listen(3000);
