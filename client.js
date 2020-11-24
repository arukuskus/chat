let comments = [];

//Вешаем событие при нажатии на кнопку
//Функция которая будет вытаскивать комментарий из формы
document.getElementById("comment-add").onclick = function (){
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    //Теперь получаем элементы из формы
    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Date.now()/1000
    }
    //Получаем значения элементов
    commentName.value = '';
    commentBody.value = '';
    //Выводим их в консоль отладчика
    console.log(comment);
    // saveComents();
    saveComment(comment);
    showComments();
}

// Посылает только что добавленный комментарий на сервер post-запросом
function saveComment(comment) {
    // а вот сюда мы поместим ответ от сервера
    let result = document.querySelector('.result');
    // создаём новый экземпляр запроса XHR
    let xhr = new XMLHttpRequest();
    // адрес, куда мы отправим нашу JSON-строку
    let url = "http://localhost:3000/save";
    // открываем соединение
    xhr.open("POST", url, false);
    // устанавливаем заголовок — выбираем тип контента, который отправится на сервер, в нашем случае мы явно пишем, что это JSON
    xhr.setRequestHeader("Content-Type", "application/json");
    // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
    xhr.onreadystatechange = function () {
        // Печатаем в лог ответ сервера
        console.log("Ready state = " + xhr.readyState);
        console.log("Status = " + xhr.status);
    };
    // преобразуем наши данные JSON в строку
    var data = JSON.stringify(comment);
    // когда всё готово, отправляем JSON на сервер
    xhr.send(data);
}

// Функция для получения JSON с сервера
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    // xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

// Заполняет массив comments данными с сервера
function loadComments() {
    // Запрашиваем массив комментариев в виде JSON с сервера
    getJSON('http://localhost:3000/load',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                console.log('Received JSON comments from server');
                console.log(data);
                comments = JSON.parse(data);
            }
        });
    console.log('COmments aaray ion Client');
    console.log(comments);
}

// Считывает данные с сервера и показывает комментарии
function showComments() {
    loadComments();
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p> `;
        out += `<p class="alert alert-primary">${item.name}</p> `;
        out += `<p class="alert alert-success">${item.body}</p> `;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
showComments();

// Один раз в 5 секунд считываем с сервера обновление комментариев
setInterval('showComments()',5000)
