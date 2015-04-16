/**
 * @module authorizationHelper
 * @author Trevor
 * @version 0.1
 */

/*--------------------------------------------------NEEDED INITIALIZATION -----------------------------------------------*/
//authorized = require("Authorization");
var database = require("mongoose");
var ds = require("DatabaseStuff");

var buzzspaceID;


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
    init(close);
    //init(close);
    //var bspaceID = null;
    //var serviceID = null;



    //bsModel = ds.models.space;
    //buzzspaceSearch(buzzspaceName, bsModel);







    //serviceID = serviceSearch(objectName, objectMethod);
    //console.log(bspaceID);
    //console.log(serviceID);
    //authorized.addAuthorized(buzzspaceID, serviceID, role, statusPoints);
};

/*---------------------------------------------------Callback functions-------------------------------------------------*/
function init(callback){
    ds.init(database);
    callback && callback();
}

function close(){
    database.disconnect();
}


/*---------------------------------------------------Helper functions---------------------------------------------------*/
/**
 * Finds the buzzspaceID using the buzzspaceName variable
 * @param {String} buzzspaceName - This stores the current buzzspaces name.
 * @throws
 * */


function buzzspaceSearch(buzzspaceName){
    callback && callback.findOne({"module_id": buzzspaceName}, function(err, docs){
        if(docs==""){
            console.log("shebang");
        }
        if(err){
            throw {
                name: "nonexistentBuzzspaceException",
                message: "The Buzzspace selected does not currently exist",
                toString: function (){
                    return this.name + ":" + this.message;
                }
            }
        }
        docs.module_id;
        console.log("buzzspaceID is set");
    });
    if(buzzspaceID==null){
        buzzspaceSearch(buzzspaceName);
    }else{
        console.log("it worked");
    }
}



function serviceSearch(objectName, objectMethod){
    console.log("serviceID is set");
}
/*TEST CODE*/
addAuthorization("COS301", 100, "test", "Thread", "create");