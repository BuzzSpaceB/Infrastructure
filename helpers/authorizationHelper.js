/**
 * @module authorizationHelper
 * @author Trevor
 * @version 0.1
 */

/*--------------------------------------------------NEEDED INITIALIZATION -----------------------------------------------*/
//authorized = require("Authorization");
var database = require("mongoose");
var ds = require("DatabaseStuff");
ds.init(database);

var buzzspaceID;


/*-------------------------------------------------- Required functions ------------------------------------------------*/

/**
 * Function that starts a series of callbacks eventually leading to using Authorizations addAuthorized
 * @param {String} buzzspaceName - This stores the current buzzspaces name.
 * @param {Number} statusPoints - This stores the current minimum status points being added to the new restriction
 * @param {String} role - This stores the minimum role that will be used for the new restriction
 * @param {String} objectName - This stores the name of the object being called. Eg. Thread
 * @param {String} objectMethod -  This stores the method of the object being called. Eg. edit
 * */
function addAuthorization(buzzspaceName, statusPoints, role, objectName, objectMethod) {
    var callbacks = [];
    callbacks.push(serviceSearch);
    callbacks.push(finalAddAuthorization);
    var AuthorizationObject = {
        buzzSpaceName: buzzspaceName,
        statusPoints: statusPoints,
        role: role,
        objectName: objectName,
        objectMethod: objectMethod,
        buzzspaceID: "",
        serviceID: ""
    };
    buzzspaceSearch(AuthorizationObject, callbacks);
};
function finalAddAuthorization(authorizationObject){
    database.disconnect();
    //authorized.addAuthorized(authorizationObject.buzzspaceID, authorizationObject.serviceID, authorizationObject.role, authorizationObject.statusPoints);
}

//function removeAuthorization(buzzspaceName, objectName, objectMethod)


/*---------------------------------------------------Callback functions-------------------------------------------------*/
/**
 * Finds the buzzspaceID using the buzzspaceName variable
 * @param {String} buzzspaceName - This stores the current buzzspaces name.
 * @throws
 * */
function buzzspaceSearch(authorizationObject, callbacks) {
    var bsModel = ds.models.space;
    bsModel.findOne({"module_id": authorizationObject.buzzSpaceName}, function (err, docs) {
        if (docs == "") {
            console.log("There is nothing here");
        }
        if (err) {
            throw {
                name: "nonexistentBuzzspaceException",
                message: "The Buzzspace selected does not currently exist",
                toString: function () {
                    return this.name + ":" + this.message;
                }
            }
        }
        authorizationObject.buzzspaceID = docs.module_id;
        //serviceSearch(authorizationObject/*, callbacks*/);
        var callback = callbacks.shift();
        callback && callback(authorizationObject, callbacks);
    });
}

function serviceSearch(authorizationObject, callbacks) {
    var servModel = ds.models.service;
    servModel.findOne({"service_name": authorizationObject.objectName, "method_name" : authorizationObject.objectMethod}, function (err, docs) {
        if (docs == "") {
            console.log("There is nothing here");
        }
        if (err) {
            throw {
                name: "nonexistentServiceException",
                message: "The service selected does not currently exist",
                toString: function () {
                    return this.name + ":" + this.message;
                }
            }
        }
        authorizationObject.serviceID = docs.service_id;
        var callback = callbacks.shift();
        callback && callback(authorizationObject, callbacks);
    });
}
/*TEST CODE*/
addAuthorization("COS301", 100, "test", "Thread", "create");