var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

var gameMap = {};
var socketIdMap = [];


app.get('/', function (req, res) {
  res.sendFile(__dirname+'/mainpage.html');
});

io.on('connection', function(socket) {
  console.log("Socket "+socket.id+" connected");
  socket.emit('makePlayer');
  
  socket.on('constantDraw', function(){
    console.log("constantDraw from server")
    for (var thing in gameMap){
      if (gameMap.hasOwnProperty(thing)) { //make sure it's not an inherited property
        console.log(thing);
        console.log(gameMap.thing)
      }
    }
    console.log("constantDraw from server done!")
    socket.emit('constantDraw', gameMap);
  });
  
  socket.on('playerMade', function(player){
    socket.emit('checkPlayer', player); //todo temp
    console.log('playerMade');
    console.log('Heres the player');
    console.log(player);
    if (!gameMap[socket.id]) {
      gameMap[socket.id] = {"drawable" : []}; //make a new table for the ID underneath the socket's id
    }
    gameMap[socket.id]["drawable"].push(player);
    console.log(gameMap[socket.id]['drawable']);
  });
  
  socket.on('updatePlayer', function(player){
    console.log(socket.id + " wants to update its player");
    console.log("Here's the current player:");
    console.log(gameMap[socket.id]["drawable"][0]);
    console.log("Here's the player it gave me (to update):");
    console.log(player);
    gameMap[socket.id]["drawable"][0] = player; //todo this will only work if the player is always the first item
  });
  
  socket.on('log', function() {
    console.log(arguments);
  });
  
  socket.on('disconnect', function(){
    if (delete gameMap[socket.id]){ //remove the socket from the game
      console.log("Socket "+socket.id+" removed from game sucessfully") ;
    }
    console.log("Socket "+socket.id+" disconnected");
  });
  
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});