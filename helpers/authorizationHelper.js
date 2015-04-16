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
    while(buzzspaceID==null&&serviceID==null) {
    }
    console.log(buzzspaceID);
    console.log(serviceID);
    //authorized.addAuthorized(buzzspaceID, serviceID, role, statusPoints);
};



/*---------------------------------------------------Helper functions---------------------------------------------------*/
/**
 * Finds the buzzspaceID using the buzzspaceName variable
 * @param {String} buzzspaceName - This stores the current buzzspaces name.
 * @throws
 * */
function buzzspaceSearch(buzzspaceName){
    bsModel = ds.models.module;
    bsModel.findOne({"name": role}, function(err, docs){
        if(err){
            throw {
                name: "nonexistentBuzzspaceException",
                message: "The Buzzspace selected does not currently exist",
                toString: function (){
                    return this.name + ":" + this.message;
                }
            }
        }
        return docs.name;
    });
    console.log("Role is set");
    console.log("buzzspaceID is set");
}

function serviceSearch(objectName, objectMethod){
    console.log("serviceID is set");
}
/*TEST CODE*/