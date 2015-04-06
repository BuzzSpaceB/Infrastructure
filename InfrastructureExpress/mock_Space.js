//Stubs
var mongoose = require('mongoose');
 
 mongoose.connection.on('open', function (ref) {
      console.log('Connected to mongo server.');
  });

  mongoose.connection.on('error', function (err) {
      console.log('Could not connect to mongo server!');
      console.log(err);
  });

var BuzzSpace =
{
    moduleID: "",
    isOpen: false,
    academicYear: "",
    profiles: [],
    rootThread: null,

    login: function( _username, _password,csds)
    {
        try
        {
            var loginRequest = { username: _username, password: _password };
            var loginResult = csds.Login(loginRequest);
            console.log( "Login Succesful" );
            return loginResult;
        }
        catch( e )
        {
            console.log("Login not successfull");
            return e.toString;
        }
    },

    createBuzzSpace: function (_moduleID ,_userID, _academicYear) {
        console.log("Creating Buzz Space");
        BuzzSpace.registerOnBuzzSpace(_userID, _moduleID);
    },

    storeBuzzSpace: function (_moduleID, _isOpen ,_academicYear) {
        console.log("Storing... Buzz Space to database");
    },

    spaceExists: function (_moduleID){
      if(_moduleID == "COS133355_121AS") return true;
        return false;
    },

    isAdministrator: function (moduleID,_userID) {
        if(_userID == "u13019695") return true;
        return false;
    },
    
    addAdministrator: function (moduleID,_userID) {
        console.log("Adding administrator " + _userID);
        
    },
    
    removeAdministrator: function (moduleID,_userID) {
        console.log("Removing administrator "+_userID);
        if(_userID == "u13019695") return true;
        return false;
    },

    getUserProfile: function( username )
    {
        console.log("Getting User Profile");
        return { user_id: "u13019695", password: "1234#"};
    },

    closeBuzzSpace: function(module_id)
    {
        console.log("Closing buzz space...");
    },

    registerOnBuzzSpace: function( username, module_id )
    {
        if(this.spaceExists(module_id)){
            console.log("Registering on buzz space");
        }else throw "BuzzSpace \"" + module_id + "\" is closed or does not exist.";
    }
};

module.exports.login = BuzzSpace.login;
module.exports.createBuzzSpace = BuzzSpace.createBuzzSpace;
module.exports.closeBuzzSpace = BuzzSpace.closeBuzzSpace;
module.exports.registerOnBuzzSpace = BuzzSpace.registerOnBuzzSpace;
module.exports.getUserProfile = BuzzSpace.getUserProfile;
module.exports.isAdministrator = BuzzSpace.isAdministrator;
module.exports.addAdministrator = BuzzSpace.addAdministrator;
module.exports.removeAdministrator = BuzzSpace.removeAdministrator;
