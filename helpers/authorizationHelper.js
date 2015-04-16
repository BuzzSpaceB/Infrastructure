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



/*-------------------------------------------------- Required functions ------------------------------------------------*/

/**
 * Obtains the IDs in order to integrate functionality with authorization team functions.
 * @param {String} buzzspaceName - This stores the current buzzspaces name.
 * @param {Number} statusPoints - This stores the current minimum status points being added to the new restriction
 * @param {String} role - This stores the minimum role that will be used for the new restriction
 * @param {String} objectName - This stores the name of the object being called. Eg. Thread
 * @param {String} objectMethod -  This stores the method of the object being called. Eg. edit
 * */
function addAuthorization(buzzspaceName, statusPoints, role, objectName, objectMethod){
    var buzzspaceID = null;
    var serviceID = null;
    buzzspaceID = buzzspaceSearch(buzzspaceName);
    serviceID = serviceSearch(objectName, objectMethod);
    authorized.addAuthorized(buzzspaceID, serviceID, role, statusPoints);
};

/*---------------------------------------------------Helper functions---------------------------------------------------*/
function buzzspaceSearch(buzzspaceName){
    roleModel = ds.models.role;//HEH
    roleModel.find({"name": role}, function(err, docs){
        if(err){
            throw {
                name: "nonexistentRoleException",
                message: "The role selected does not currently exist",
                toString: function (){
                    return this.name + ":" + this.m
                }
            }
        }
    });
    console.log("Role is set");
    console.log("buzzspaceID is set");
}

function serviceSearch(objectName, objectMethod){
    console.log("serviceID is set");
}
/*TEST CODE*/