//todo work on deleting socket

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
  socket.emit('constantDraw');
  socket.emit('init', gameMap); //give the socket all the info to run the game.
  
  /* todo delete
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
  */
  
  socket.on('newPlayer', function(player){
    function validateNewPlayer(player) {
      return true;
    }
    
    console.log('playerMade');
    console.log('Heres the player');
    console.log(player);
    
    if (validateNewPlayer(player)) {
      if (!gameMap[socket.id]) {
        gameMap[socket.id] = {"drawable" : []}; //make a new table for the ID underneath the socket's id
      }
      gameMap[socket.id]["drawable"].push(player);
      console.log(gameMap[socket.id]['drawable']);
      socket.broadcast.emit('newPlayer', socket.id, gameMap[socket.id]);
    } else {
      socket.emit('playerMadeFailed', gameMap, player);
    }
  });
  
  socket.on('updatePlayer', function(player){
    function validatePlayerUpdate(newPlayer) {
      return true;
    }
    
    //console.log(socket.id + " wants to update its player");
    //console.log("Here's the current player:");
    //console.log(gameMap[socket.id]["drawable"][0]);
    //console.log("Here's the player it gave me (to update):");
    //console.log(player);
    if (validatePlayerUpdate(player)) {
      gameMap[socket.id]["drawable"][0] = player; //todo this will only work if the player is always the first item
      socket.broadcast.emit('updatePlayer', socket.id, player); //pass the update on to all the other sockets
    } else {
      socket.emit('updatePlayerFailed', gameMap[socket.id]["drawable"][0]); //tell the socket the update failed and where it should display its user.
    }
    
  });
  
  socket.on('constantDraw', function() {
    socket.emit('constantDraw');
  });
  
  socket.on('log', function() {
    console.log.apply(console, arguments);
  });
  
  socket.on('disconnect', function(){
    if (delete gameMap[socket.id]){ //remove the socket from the game
      console.log("Socket "+socket.id+" removed from game sucessfully");
      socket.broadcast.emit('deleteSocket', socket.id);
    }
    console.log("Socket "+socket.id+" disconnected");
  });
  
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

//timer from stack overflow
var interval = 16.6; // ms
var expectedTime = Date.now() + interval;
setTimeout(step, interval);
function step() {
    var dt = Date.now() - expectedTime; // the drift (positive for overshooting)
    if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
    }
    // do what is to be done
    //console.log(dt);
    io.emit('giveUpdates');
    
    expectedTime += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}