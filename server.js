let http = require('http');
let fs = require('fs');

// create a http server
http.createServer(function (req, res) {

    if (req.url === '/') {
        // С главной страницы перенаправляем запрос на файл comment.html
        console.log(req.url)
        // read requested file
        fs.readFile('comment.html',
            function(err, data) {
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
            });
    } else if(req.url === '/save') {
        // по урлу /save добавляем новый комментарий в файл comments.json
        console.log(req.url)
        // read requested file
        var tmpstr = "";
        req.on("data", function (data) {
            tmpstr += data;
        });
        req.on("end", function() {
            //do stuff
            console.log(tmpstr);
            let comment = JSON.parse(tmpstr);
            let comments = [];
            // Считываем массив комментариев из файла data.js
            fs.readFile('comments.json', (err, fileContent) => {
                if( err ) {
                } else {
                    comments = JSON.parse(fileContent);
                }
                comments.push(comment);
                // Записываем обновленные комментарии обратно в файл
                fs.writeFileSync('comments.json', JSON.stringify(comments), 'utf-8');
            })
        });
        res.writeHead(200);
        return res.end();
    } else if(req.url === '/load') {
        // по урлу /load отдаем файл comments.json в браузер клиента
        console.log(req.url)
        // read requested file
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        // Считываем массив комментариев из файла data.js
        fs.readFile('comments.json', (err, fileContent) => {
            if( err ) {
                res.writeHead(404);
                res.end("File reading error")
            } else {
                res.end(fileContent);
            }
        })
    } else {
        // Для остальных урлов пробуем найти подходящий файл на сервере
        console.log(req.url)

        // read requested file
        // fs.readFile('./comment.html',
        //     function(err, data) {
        //         if (err) throw err;
        //         res.writeHead(200);
        //         res.write(data.toString('utf8'));
        //         return res.end();
        //     });

        // read requested file
        fs.readFile(req.url.substring(1),
            function(err, data) {
                if (err) {
                //    В случае ошибки отсылаем что все хорошо, чтобы сервер не падал
                    res.writeHead(200);
                    return res.end();
                };
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
            });
    }
}).listen(3000);
console.log("Сервер запущен:  http://localhost:3000");