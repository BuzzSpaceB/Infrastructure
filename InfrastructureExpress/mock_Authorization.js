/**
 * Created by Trevor on 2015-04-05.
 */
function addAuthorization(buzzspaceID, statusPoints, Role, ServiceID) {
    console.log("Add Authentication called");
    return true;
}

function removeAuthorization(authorizedID){
    console.log("Remove Authentication called");
    return true;
}

function isAuthorized(moduleID, objectName, objectMethod, userID, statusPoints){
    console.log("isAuthorized");
    return true;
}

function getAuthorized(buzzSpaceID){
    console.log("getAuthorized is called");
    return null;
}

function updateAuthorized(authorizedID, role, statusPoints){
    console.log("updateAuthorized is called");
    return true;
}

module.exports.isAuthorized = isAuthorized;