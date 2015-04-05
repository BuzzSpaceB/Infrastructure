var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("Notification");

function login(){
    console.log("loginResult :"+space.login);

}

module.exports.login = login;




