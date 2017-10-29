
var express = require('express');
var bodyPar = require('body-parser');
var app = express();
var pg = require('pg');
app.use(bodyPar.json());
app.use(bodyPar.urlencoded({extended: true}));
var users=[];
const { Pool, Client } = require('pg')
const connectionString = 'postgres://postgres:1234@localhost:5432/postgres'
const pool = new Pool({
	connectionString: connectionString,
}) 

app.listen(3012,function(){
	console.log('API started')
});

app.get('/email=:email',function(req,res,next){
	console.log('email:', req.params.email);
	pool.query("SELECT * FROM rest.myusers where email like '%"+req.params.email+"%'", (err, res) => {
	console.log(err, res)
	console.log(res.rows[0].first_name)
	console.log(res.rows.length)
		for (var i=0;i<res.rows.length;i++){
			users[i]=res.rows[i];
			console.log(users[i]);
		}
	})
	res.render('index.ejs',{users: users});
	next(); 
})	
	
app.get('/money=:money',function(req,res,next){
	console.log('money:', req.params.money);
	pool.query("SELECT * FROM rest.myusers where money > '$"+req.params.money+"'", (err, res) => {
	console.log(err, res)
	console.log(res.rows[0].first_name)
	console.log(res.rows.length)
		for (var i=0;i<res.rows.length;i++){
		users[i]=res.rows[i];
		console.log(users[i]);
		}
	})
	res.render('index.ejs',{users: users});
	next(); 
})		

/* function Limiter() {
    this.requests = []; // Очередь запросов [значение = время запроса]
}

Limiter.prototype.getRequestsCount = function() {
    var currentTime = new Date().getTime(); // текущее время
    var counter = 0; // счетчик запросов
    for(var i = 0; i<this.requests.length; ++i) {
        // Инкрементируем счетчик, если время запроса попадает в нужный интервал
        if(currentTime - this.requests[i] < params['time']) ++counter;
    }
    return counter;
}
Limiter.prototype.newRequest = function() {
    // Выходим, если контроль трафика выключен
    if(!params['enable']) return undefined;

    // Если текущий запрос уже лишний, то кидаем исключение
    if(this.getRequestsCount() >= params['maxReq']) throw Error('Server is too busy');

    // Если очередь >= params['maxReq'], то удаляем старый запрос
    if(this.requests.length >= params['maxReq']) this.requests.shift();

    // И добавляем  в очередь новый запрос
    this.requests.push(new Date().getTime());

    // Вернем текущее количество запросов
    return this.getRequestsCount();
}

server.on('request', function(req, res) {
    // Запросы favicon откинем в сторону
    if(req.url === '/favicon.ico') return;

    var message = ''; // ответ клиенту
    try {
        // Добавим новый запрос в очередь
        var count = limiter.newRequest();

        // Если newRequest() не вернет исключение, то
        // выполняем необходимые вычисления и генерируем
        // страницу для пользователя
        message = 'HARD SCRIPT! WOW WOW!!!\n';
        message += 'Requests for last '
            + limiter.getTime() + ' ms: '
            + count;
    } catch(e) {
        // Если newRequest() кидает исключение, то
        // говорим пользователю, что сервер слишком
        // нагружен и не может выполнить вычисления
        message = e.message;
    }
    // Отправляем ответ пользователю
    res.end(message);
});
 */

	   
	
