var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("Notification");

function login(){
    console.log("loginResult :"+space.login("u13019695","1234#"));

}

module.exports.login = login;




