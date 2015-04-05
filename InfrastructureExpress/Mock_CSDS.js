/**
 * Created by Michael Nunes on 05/04/2015.
 */
var ldap = require("ldapjs");

var client=ldap.createClient({
    url: "ldap://reaper.up.ac.za"
});

module.exports.Login= function Login(LoginRequest)
{
    var connection = CheckConnection();
    if(connections == true) {
        if (LoginRequest.username() == Credentials.username) {
            if (LoginRequest.password() == Credentials.password) {
                return LoginResult("Logged in",Credentials);
            }
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

module.exports.CheckConnection = function CheckConnection()
{

    if("ldap://reaper.up.ac.za" == this.client.url)
    {
      return true;
    }
    else
    {
        throw "ErrorinConnection";
    }
}

module.exports.Credentials = function UsernamePasswordCredentials() {
    this.username = u12345678;
    this.password = Randoms;
}


module.exports.LoginRquest = function LoginRequest(usernamePasswordCredentials) {
    var pass = usernamePasswordCredentials;

    this.username = function() {
        return pass.username;
    };

    this.password = function () {
        return pass.password;
    };
}

module.exports. getUsersWithRole= function  getUsersWithRole( getUsersWithRoleRequest)
{
    {

        var entry=new Array();
        var assert = require("assert");
        if(getUsersWithRoleRequest.roleid == "01")
        {
            return getUsersWithRoleResult(msg,getUsersWithRoleRequest)
        }
        else
        {
            return getUsersWithRoleResult(msg,null)
        }
    }
}


module.exports.getUsersWithRoleResult =function getUsersWithRoleResult(msg,obj)
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



module.exports.getUsersWithRoleRequest = function getUsersWithRoleRequest(uid,roleid,moduleid) {
    this.uid=uid;
    this.roleid=uid;
    this.moduleid;

}

module.exports.getUsersRolesForModule= function getUsersRolesForModule(getUsersRolesForModuleRequest) {
    {
        var assert = require("assert");

        if (getUsersRolesForModuleRequest.mid == "01") {
            return getUsersWithRoleResult(msg, getUsersWithRoleRequest);
        }
        else {
            return getUsersWithRoleResult(null);
        }

    }
}

    module.exports.getUsersRolesForModuleResult = function getUsersRolesForModuleResult(getUsersRolesForModuleRequest) {

        if (getUsersRolesForModuleRequest == null) {
            return new Array();
        }
        else {

            var send = new Array();
            send.add(new Roles("u12104592", "01"));
            send.add(new Roles("u12104593", "02"));
            send.add(new Roles("u12104596", "03"));
            return send;
        }
    }

    module.exports.Roles = function Roles(uid, roleid) {
        this.uid = uid;
        this.roleid = uid;

    }
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