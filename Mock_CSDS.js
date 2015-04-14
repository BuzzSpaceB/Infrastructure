/**
 * Created by Michael Nunes on 05/04/2015.
 * This is a mock of the functional teams CSDS module
 * This was created so that some form of integration could be done on my part
 * as the functional teams code did not work at the time.
 */

 /*
 *require to use ldap
 */
var ldap = require("ldapjs");
/*
 *client used to connect to the ldap of the university of pretoria
 */
var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});
/**
 * Object to temporarily store variables to test login
 * @type {{password: string, username: string}}
 */
var Credentials = {
    password : "1234#",
    username : "u13019695"
}

/**
 * Function to log the user through ldap
 * @param LoginRequest
 * @returns {string}
 * @constructor
 */
module.exports.Login= function Login(LoginRequest)
{
    console.log("CSDS logining in...");
    var connection = this.CheckConnection();

    if(connection == true) {

        if (LoginRequest.username == Credentials.username  && LoginRequest.password == Credentials.password) {
                return Credentials.username;
        } else if(LoginRequest.username == "u13178840" && LoginRequest.password == Credentials.password){
                return "u13178840";
        }
        else
        {
            throw LoginResult("Unable to authenticate",Credentials);
        }

    }
    else
    {
        throw LoginResult("UnableGetDataFromDataSource",Credentials);
    }
}

/**
 * Result object of the login process
 * @param msg
 * @param obj
 * @returns {*}
 * @constructor
 */
module.exports.LoginResult= function LoginResult(msg,obj)
{

    if(obj==null)
    {
        throw msg;
    }
    else
    {
        return obj.username;
    }
}
/**
 * Checks the connection to the ldap.A temporary one as functional teams code is not working properly
 * @returns {boolean}
 * @constructor
 */
module.exports.CheckConnection = function CheckConnection()
{



    if("ldap://reaper.up.ac.za" == client.url.href)
    {
      return true;
    }
    else
    {
        return false;
    }
}
/**
 * Export to export the stored credentials
 * @type {{password: string, username: string}}
 */
module.exports.Credentials = Credentials;

/**
 * The login request object passed in the login function
 * @param usernamePasswordCredentials
 * @constructor
 */
module.exports.LoginRequest = function LoginRequest(usernamePasswordCredentials) {
    var pass = usernamePasswordCredentials;

    this.username = function() {
        return pass.username;
    };

    this.password = function () {
        return pass.password;
    };
}
/**
 * Gets active modules using a request object
 * @param getActiveModuleaForYearRequest
 * @returns {Array}
 */
module.exports.getActiveModuleaForYear =function getUsersWithRoleResult(getActiveModuleaForYearRequest)
{
    var connection = this.CheckConnection();

    if(connection == true) {
        var send = new Array();
        send.add("COS133355_121AS");
        send.add("COS151947_122AS");
        return send;
    }
    else
    {
        return new Array();
    }



}

/**
 * Request Object
 * @param uid
 */
module.exports.getActiveModuleaForYearRequest = function getActiveModuleaForYearRequest(uid) {
    this.uid=uid;
}

/**
 * gets all users with roles using a object
 * @param getUsersWithRoleRequest
 * @returns {*}
 */
module.exports.getUsersWithRole= function  getUsersWithRole( getUsersWithRoleRequest)
{
    {
        if(getUsersWithRoleRequest.roleid == "01")
        {
            var send=new Array();
            send.add("u12104592");
            send.add("u74930593");
            send.add("u95382753");
            return send;
        }
        else
        {
            return new Array();
        }
    }
}

/**
 * Result object of the getUsersWithRole function
 * @param msg
 * @param obj
 * @returns {Array}
 */
module.exports.getUsersWithRoleResult =function getUsersWithRoleResult()
{

    if (obj == null) {
        return new Array();
    }
    else
    {
        var send=new Array();
        send.add("u12104592");
        send.add("u74930593");
        send.add("u95382753");
        return send;
    }
}

/**
 * Request object for getting roles
 * @param uid
 * @param roleid
 * @param moduleid
 */
module.exports.getUsersWithRoleRequest = function getUsersWithRoleRequest(uid,roleid,moduleid) {
    this.uid=uid;
    this.roleid=uid;
    this.moduleid;

    this.uID = function () {
        return this.mid;
    };

    this.roleID = function () {
        return this.uid;
    };

    this.mID = function () {
        return this.mid;
    };

}
/**
 * Function to get a users role for a module
 * @param getUsersRolesForModuleRequest
 * @returns {Array}
 */
module.exports.getUsersRolesForModule= function getUsersRolesForModule(getUsersRolesForModuleRequest) {
    {
        if (getUsersRolesForModuleRequest.mid == "COS133355_121AS") {
            var send = new Array();
            send.add(new Roles("u13019695", "01"));
            send.add(new Roles("u12104593", "02"));
            send.add(new Roles("u12104596", "03"));
            return send;
        }
        else {
            return new Array();
        }

    }
}
/**
 * Result from the getting user roles function
 * @param getUsersRolesForModuleRequest
 * @returns {Array}
 */
module.exports.getUsersRolesForModuleResult = function getUsersRolesForModuleResult(getUsersRolesForModuleRequest) {

        if (getUsersRolesForModuleRequest == null) {
            return new Array();
        }
        else {

            var send = new Array();
            send.add(new Roles("u13019695", "01"));
            send.add(new Roles("u12104593", "02"));
            send.add(new Roles("u12104596", "03"));
            return send;
        }
    }
/**
 * Role Object
 * @param uid
 * @param roleid
 * @constructor
 */
module.exports.Roles = function Roles(uid, roleid) {
    this.uid = uid;
    this.roleid = roleid;

    this.uID = function () {
        return this.mid;
    }
};

    this.roleID = function () {
    return this.uid;

    }
/**
 * Request object for the  getting user roles
 * @param mid
 * @param uid
 */
    module.exports.getUsersRolesForModuleRequest = function getUsersRolesForModuleRequest(mid, uid) {
        this.mid = mid;
        this.uid = uid;

        this.mID = function () {
            return this.mid;
        };

       this.uID = function () {
            return this.uid;
        };
}
/**
 *Helper Function to help get information on the user for the whole space to use
 * @param UserInfoRequest
 * * @returns {string}
 * @constructor
 */
module.exports.GetUserInfo= function UserInfo(UserInfoRequest)
{
    var connection = this.CheckConnection();
    if (!connection){
        throw "Invalid Connection";
    }
    if(UserInfoRequest.username() == "u13019695") {
        switch (UserInfoRequest.infoType) {
            case "title":
                return "Mr";
                break;
            case "initials":
                return "M";
                break;
            case "id":
                return "13019695"
                break;
            case "surname":
                return "Mostert"
                break;
            case "uid":
                return "u13019695"
                break;
            case "email":
                return "u13019695@tuks.co.za"
                break;
            case "fname":
                return "Werner"
                break;
            default:
                return "Invalid Type Specified";
                break;
        }
    }
    else
    {
        throw "invalid username"
    }
}
/**
 * Request object used to specify the type of information and the username
 * @param username
 * @param infoType
 * @constructor
 */
function UserInfoRequest(username,infoType) {
    this.username = function(){
        return username;
    };
    this.infoType = function(){
        return infoType;
    };
}
