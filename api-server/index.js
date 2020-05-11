#!/usr/bin/env node

const express = require('express');
const path = require('path');
let request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');
const spotifyRouter     = require('./routes/spotify/index');
const twitterRouter     = require('./routes/twitter/index');
const analyzeRouter     = require('./routes/analyzer/index');
const mysqlRouter       = require('./routes/mysql/index');
const geniusRouter      = require('./routes/genius/index');
const musixRouter       = require('./routes/musixmatch/index');
const musicbrainzRouter = require('./routes/musicbrainz/index');
const kget              = require('./routes/kget/index');
const ruigo             = require('./routes/ruigo/index');
const props             = require('./routes/props/index');

const app = express();
let http = require('http').Server(app);


//*-------------------------------  REDIS
const redis = require('redis');
// const redisClient = redis.createClient({
//     host: keys.redisHost,
//     port: keys.redisPort,
//     retry_strategy: () => 1000});
// const redisPublisher = redisClient.duplicate();
//*-------------------------------  REDIS


//*-------------------------------  SOCKET.IO
const io = require('socket.io')(http);

let connect_history = {};

// io :     全員に送られる
// socket : そのユーザーだけに送られる

io.on('connection',function(socket){

    console.log("Socket.io Connection START");

    // 新規ユーザーの回線オープン
    socket.on('open-socket', function(msg) {
        console.log(Object.keys(connect_history));

        // 指定ユーザーだけ
        let resmsg = {...msg,socketid:socket.id};
        socket.emit('open-socket-success',resmsg);
        connect_history[socket.id] = resmsg;

        // 全ユーザーへ
        clients = Object.keys(io.eio.clients).map(key=> connect_history[key])

        //clients = clients.filter(v => !!v);

        let obj = {}
        clients.map( v=>{ if(v) obj[msg.socketid] = v})

        io.emit('new-user-added',{clients:clients});
    });


    //　ユーザーの回線クローズ
    socket.on('close-socket', function(msg) {
        console.log("close-socket:success");

        // 個別
        socket.emit('close-socket-success',null);

        //自分がdisconnectする最後の一人の場合、connect_history=を空に戻す。
        if(Object.keys(io.eio.clients).length===1 && Object.keys(io.eio.clients)[0]===socket.id) connect_history = {};

        // 指定ユーザーを削除した全ユーザーIDの配列
        let id_ary_after =  Object.keys(io.eio.clients).filter( key=> key !== socket.id)

        clients = id_ary_after.map(key=> connect_history[key])
        clients = clients.filter(v => !!v)
        io.emit('user-disconnected',{clients:clients});
        console.log("before disconnect");
        socket.disconnect();
    });

    // クライアントが切断したときの処理
    socket.on('disconnect', msg => {
        console.log(msg);
        console.log("disconnect called");
    });

    // ユーザーのルート情報
    socket.on('routes', msg => {
        console.log("routes");
        console.log(JSON.stringify(msg));
    })

    // ユーザーのルート情報
    socket.on('geolocation', msg => {
        console.log("geolocation");
        console.log(JSON.stringify(msg));
    })

});
//*-------------------------------  SOCKET.IO

app.use(cors());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/' , function(req, res){
    res.render('index', { title: 'SERVER1', authparams:keys.spotifyParams["emory"]})
});


app.get('/presavewidget' , function(req, res){
    res.render('index', { title: '', authparams:keys.spotifyParams["emory"]})
});

app.get('/callback' , function(req, res){
    let access_token = req.query.access_token;
    res.render('index', { title: 'SERVER2', access_token: access_token })
});


app.get('/proxy', function(req, res) {
    let url = req.query.url;
    let x = request(url);
    req.pipe(x);
    x.pipe(res);
});

app.use('/spotify',      spotifyRouter);
app.use('/twitter',      twitterRouter);
app.use('/analyze',      analyzeRouter);
app.use('/mysql',        mysqlRouter);
app.use('/genius',       geniusRouter);
app.use('/musixmatch',   musixRouter);
app.use('/musicbrainz',  musicbrainzRouter);
app.use('/kget',         kget);
app.use('/ruigo',        ruigo);
app.use('/props',        props);

// app.listen(5000, err => {
//   console.log('Listening on Port 5000');
// });

//8080で起動すると、Nginxによって80番に転送される
///etc/nginx/conf.d/node-app.conf


//ローカルでテスト中はこっち
//const PORT = 3030;

//GCPで本番起動する場合はこっち
const PORT = 8080;
http.listen(PORT, ()=>{
    console.log('server listening. Port:' + PORT);
});

