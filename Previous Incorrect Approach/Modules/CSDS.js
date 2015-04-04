/**
 * Created by wernermostert on 2015/03/25.
 */
module.exports.Login= function Login(LoginRequest,client,LoginResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid="+LoginRequest.username(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err) {
            client.unbind();
            return LoginResult(err, null);
        }
        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            client.unbind();
            return LoginResult(err,null);
        });

        res.on('end', function () {
            if (!entry)
            {
                client.unbind();
                return LoginResult(new Error(LoginRequest.username() + ' not found'),null);
            }
            return client.bind(entry.dn.toString(),LoginRequest.password(), function (err) {
                if (err)
                {
                    client.unbind();
                    return LoginResult(err, client);
                }
                return client.unbind(function (err) {
                    assert.ifError(err);
                    return LoginResult(null,entry.toObject());
                });
            });
        });
    });
}

module.exports.CheckCon= function Check(client,LoginResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid=*",//LoginRequest.username(),//+loginRequest.username();
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
            return LoginResult("UnSucssscessful_Connection",false);

        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            return LoginResult("UnSuccessful_Connection",false);
        });

        res.on('end', function () {

            return LoginResult("Successful_Connection",true);

        });
    });
}

module.exports.getUsersRolesForModule= function getUsersRolesForModule(getUsersRolesForModuleRequest,client,getUsersRolesForModuleResult) {
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
        var opts =
        {
            filter: "memberuid=" + getUsersRolesForModuleRequest.mID(),//+loginRequest.username();
            scope: 'sub'
        };

        var entry=new Array();
        var assert = require("assert");
        return client.search(base, opts, function (err, res) {
            if (err)
            {
                client.unbind();
                return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
            }
            res.on('searchEntry', function (_entry)
            {
                entry.push(_entry);
            });

            res.on('error', function (err) {
                client.unbind();
                return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
            });

            res.on('end', function () {
                if (!entry) {
                    client.unbind();
                    return getUsersRolesForModuleResult(new Error(getUsersRolesForModuleRequest.muid() + ' not found'), null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());

                }
                return client.bind(entry.dn.toString(), LoginRequest.password(), function (err) {
                    if (err) {
                        client.unbind();
                        return getUsersRolesForModuleResult(err, null,getUsersRolesForModuleRequest.mID(),getUsersRolesForModuleRequest.uID());
                    }
                    return client.unbind(function (err) {
                        assert.ifError(err);
                        return getUsersRolesForModuleResult(null, entry.toObject(),getUsersRolesForModuleRequest.muid());
                    });
                });
            });
        });
    }
}

module.exports. getUsersWithRole= function  getUsersWithRole( getUsersWithRoleRequest,client, getUsersWithRoleResult)
{
    {
        base = 'ou=Computer Science,o=University of Pretoria,c=ZA';
        var opts =
        {
            filter: "cn=" +  getUsersWithRoleRequest.roleID(),//+loginRequest.username();
            scope: 'sub'
        };

        var entry=new Array();
        var assert = require("assert");
        return client.search(base, opts, function (err, res) {
            if (err)
            {
                client.unbind();
                return  getUsersWithRoleResult(err, null,null);
            }
            res.on('searchEntry', function (_entry)
            {
                entry.push(_entry);
            });

            res.on('error', function (err) {
                client.unbind();
                return  getUsersWithRoleResult(err, null,null);
            });

            res.on('end', function () {
                if (!entry) {
                    client.unbind();
                    return  getUsersWithRoleResult(new Error( getUsersWithRoleRequest.muid() + ' not found'), null);
                }
                return client.bind(entry.dn.toString(), LoginRequest.password(), function (err) {
                    if (err) {
                        client.unbind();
                        return  getUsersWithRoleResult(err,null,null);
                    }
                    return client.unbind(function (err) {
                        assert.ifError(err);
                        return  getUsersWithRoleResult(null, entry.toObject(), getUsersWithRoleRequest.roleid());
                    });
                });
            });
        });
    }
}

module.exports.GetUserInfo= function UserInfo(client,UserInfoRequest,UserInfoResult)
{
    base='ou=Computer Science,o=University of Pretoria,c=ZA';
    var opts =
    {
        filter: "uid="+UserInfoRequest.username(),
        scope: 'sub'
    };

    var entry;
    var assert=require("assert");
    return client.search(base, opts, function (err, res) {
        if (err)
            return UserInfoResult("Error in retrieving information",false);

        res.on('searchEntry', function (_entry) {
            entry = _entry;
        });

        res.on('error', function (err) {
            return UserInfoResult("Error in retrieving information",false);
        });

        res.on('end', function () {
            if (!entry){
                return UserInfoResult(UserInfoRequest.username()+" not found in LDAP",false);
            }
            switch (UserInfoRequest.infoType){
                case "title":return UserInfoResult(entry.object.title,true);
                    break;
                case "initials":return UserInfoResult(entry.object.initials,true);
                    break;
                case "id":return UserInfoResult(entry.object.st,true);
                    break;
                case "surname":return UserInfoResult(entry.object.sn,true);
                    break;
                case "uid":return UserInfoResult(entry.object.uid,true);
                    break;
                case "email":return UserInfoResult(entry.object.mail,true);
                    break;
                case "fname":return UserInfoResult(entry.object.cn,true);
                    break;
                 default:return UserInfoResult("Invalid infoType entered",false);
                break;
            }
        });
    });
}

/**
 * This file is not going to be used by the buzz system!
 * This file is intended to demonstrate my thought on what is required from this group.
 * This template contains no logic but has the structure as I understand it.
 */

/**
 * Main class that will be used to call login and other get methods
 */
function CsDataSourcesAdapter() {
    this.login = function(loginRequest) {
        //try
        //var connection = getConnectionToDataSource()
        //var loginResult = authenticateUserAgainstDataSource(loginRequest, connection)
        //catch (e) throw e;
        return loginResult;
    };

    this.getUsersRolesForModule = function (getUsersRolesForModuleRequest) {
        //TODO: logic to get user role for module.
        return getUsersRolesForModuleResult;
    }

    this.getUsersWithRole = function(getUsersWithRoleRequest) {
        //TODO: Logic to get users with role
        return getUsersWithRoleResult;
    }

    var getConnectionToDataSource = function() {
        //TODO: try connect to ldap
        //  return the connection if successful
        //  throw new CouldNotConnectToCsDataSourcesException(...) otherwise;
    }

    var authenticateUserAgainstDataSource = function(loginRequest, connection) {
        // TODO: try authenticate user
        //  return loginResult if successful
        //  throw new CouldNodeAuthenticateException(...); otherwise
    }
}

/**
 * Login request is going to be sent to the login function.
 * @param usernamePasswordCredentials
 *          contains the username and password
 */
function LoginRequest(usernamePasswordCredentials) {
    this.usernamePasswordCredentials = usernamePasswordCredentials;
}

/**
 * contains the username and password for the loginRequest.
 * @param username
 *          the user that is going to be authenticated
 * @param password
 *          the password for that user
 */
function UsernamePasswordCredentials(username, password) {
    this.username = username;
    this.password = password;
}

/**
 * What the login function is going to return
 * @param userId
 *          the user ID for the user that has successfully logged in.
 */
function LoginResult(userId) {
    this.userId = userId;
}

/**
 * Send to the getUsersRolesForModule function
 * @param userId
 *          the user id of the user who's roles will be returned
 * @param module
 *          the roles for the module with this id will be returned
 */
function GetUsersRolesForModuleRequest(userId, moduleId) {
    this.userId = userId;
    this.moduleId = moduleId;
}

/**
 * returned by the getUsersRolesForModule function
 * @param getUsersRolesForModuleRequest
 *          dependency injecting the userId and moduleId
 * @param roles
 *          the roles for that user
 */
function GetUsersRolesForModuleResult(getUsersRolesForModuleRequest, roles) {
    this.userId = getUsersRolesForModuleRequest.userId;
    this.moduleId = getUsersRolesForModuleRequest.moduleId;
    this.roles = roles;
}

/**
 * send to the getUsersWithRole function
 * @param userId
 *          ??????
 * @param moduleId
 *          the id for the module that will be examined.
 * @param roleId
 *          the id of the role that is being searched for
 */
function GetUsersWithRoleRequest(userId, moduleId, roleId) {
    this.userId = userId;
    this.moduleId = moduleId;
    this.roleId = roleId;
}

/**
 * returned by getUsersWithRole function
 * @param getUsersWithRoleRequest
 *          dependency injecting the roleId
 * @param userId
 *          the Ids of all the users that take part in this role
 */
function GetUsersWithRoleResult(getUsersWithRoleRequest, userId) {
    this.roleId = getUsersWithRoleRequest.roleId;
    this.userId = userId;
}

/**
 * thrown when connecting to the LDap server / database fails
 * @param message
 *          the message relating to the problem can be null.
 * @param cause
 *          for exception chaining, the exception that caused the exception. Can be null
 */
function CouldNotConnectToCsDataSourcesException(message, cause) {
    this.message = message;
    this.cause = cause;
}

/**
 * Thrown when a user cannot be authenticated for whatever reason.
 * @param message
 *          the message relating to the problem can be null.
 * @param cause
 *          for exception chaining, the exception that caused the exception. Can be null
 */
function CouldNodeAuthenticateException(message, cause) {
    this.message = message;
    this.cause = cause;
}