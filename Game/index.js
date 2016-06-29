var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

/*
gameMap is in the form {'friction':friction amount, socket id: {'drawable' : [list of things that every client should draw when drawing their screen], otherThings: other info}, another socket id...}
*/
var gameMap = {'friction':.5}; //the table that holds the entire state of the game
var socketVersion = 19; //what version of the code is running. The server will tell the client to keep refreshing the page until the page's version matches it. 

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
}); //tell the client to load our page, index.html

io.on('connection', function(socket) { //when a new client connects
  console.log("Socket "+socket.id+" connected");
  socket.emit('checkVersion');

  //reload the page if it doesn't have the correct version. Whenever a code update is made, the version number should be changed both here and on the index.html
  socket.on('verifyVersion', function(sv){
    console.log("Version check:");
    console.log("My version: ", socketVersion);
    console.log("Their version", sv);
    if (sv!=socketVersion) {
      console.log("telling it to reload page");
      socket.emit('reloadPage');
    } else {
      console.log('telling it to init');
      socket.emit('constantDraw');
      socket.emit('init', gameMap); //give the socket all the info to run the game.
    }
  });
  
  //todo I think the name should be something separate from the player.
  socket.on('setName', function() {
    socket.emit('nameSuccess'); //upgrade: check for duplicate usernames
  });
  
  socket.on('newPlayer', function(player){
    function validateNewPlayer(player) { //upgrade: make sure its appropriate to make a new player
      return true;
    }
    
    //console.log('playerMade');
    //console.log('Heres the player');
    //console.log(player);
    
    if (validateNewPlayer(player)) {
      if (!gameMap[socket.id]) {
        gameMap[socket.id] = {"drawable" : []}; //make a new table for the ID underneath the socket's id
      }
      gameMap[socket.id]["drawable"].push(player);
      console.log(gameMap[socket.id]['drawable']);
      socket.broadcast.emit('newPlayer', socket.id, gameMap[socket.id]);
    } else {
      socket.emit('playerMadeFailed', gameMap, player); //todo I don't think this has support on client side. I've learned that clients just ignore the emissions they don't understand, which is nice.
    }
  });
  
  socket.on('updatePlayer', function(player){
    function validatePlayerUpdate(newPlayer) {
      if (gameMap[socket.id]) {
        return true;
      } else {
        return false;
      }
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
      socket.emit('updatePlayerFailed'); //tell the socket the update failed and where it should display its user.
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
        console.log("Woah! I had a huge lag of "+String(dt)+ "seconds.")
    }
    
    //if (dt>1){ console.log(dt);} //see the delay in milliseconds
    io.emit('giveUpdates');
    
    expectedTime += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}