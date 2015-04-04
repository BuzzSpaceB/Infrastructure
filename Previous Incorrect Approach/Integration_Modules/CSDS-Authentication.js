/**
 * Created by m on 03/04/2015.
 */
var http = require('http');
var authorization = require('../Modules/Authorization');
var csds = require('../Modules/CSDS');



console.log(authorization);
console.log(csds);

module.exports.CheckCsds= function fullcsdsCheck(LoginRequest,client,LoginResult) {
    csds.Login(LoginRequest, client, LoginResult);
    var role =  csds.getUsersRolesForModule();
    var module =  csds.getUsersWithRole();
}
module.exports.Authlogin= function authLog(LoginRequest,client,LoginResult) {
    csds.Login(LoginRequest, client, LoginResult);
    /*authorization.isauthorized();*/
}
