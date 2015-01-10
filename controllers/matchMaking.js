'use strict'; //not important, just include it

//Takes in the ip you're connecting to and calls connections.connect to create the socket
exports.invite = function (req,res){
    var ip = req.body.ip;
    
    var success = connections.connect(ip);
    
    var connectionSuccess ={status:success};
    
    //sends connection status back up to the client
    res.json(connectionSuccess);
};

//Gets the list of games open for joining
exports.listOpenGames = function(req,res){
    connections.getOpenGames(function (openList){
        res.json(openList);
    });    
};

//Creates a new game based on the input parameters (name,#games,bet per game, and ip)
exports.createGame = function(req,res){
    var nickname = req.body.nickname;
    var numGames = req.body.numGames;
    var betPerGame = req.body.betPerGame;
    var ip = req.body.ip;
    
    var success = conections.createGame(nickname,numGames,betPerGame,ip);
    var creationSuccess = {status:success};
    //passes back the status of the creation of the game (success or failure)
    res.json(creationSuccess);
};

//Requests to join a game and returns accept,denied,or pending
exports.checkInvitation = function(req,res){
    var invStatus = connections.checkForInvitation();
    var returnedStatus = {status:invStatus};
    
    res.json(returnedStatus);
};

//Gets a list of clients attempting to join your game.Returns an empty array if no clients attempting to join
exports.checkForInvitation = function(req,res){
    res.json(connections.checkForInvitation());
};
