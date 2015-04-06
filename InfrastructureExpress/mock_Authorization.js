/**
 * Created by Trevor on 2015-04-05.
 */
function addAuthorization(buzzspaceID, statusPoints, Role, ServiceID) {
    console.log("Buzzspace: " + buzzspaceID + " has added restriction on service: " + ServiceID + " with current restrictions: ");
    console.log("Role: " + Role);
    console.log("Status Points: " + statusPoints);
    return true;
}

function removeAuthorization(authorizedID) {
    console.log("Removing authorizationID: " + authorizedID);
    return true;
}

function isAuthorized(moduleID, objectName, objectMethod, userID, statusPoints) {
    console.log("Checking if userID: " + userID + " has access to " + objectName + "." + objectMethod + " in module: " + moduleID);
    console.log("Access is authorized");
    return true;
}

function getAuthorized(buzzSpaceID) {
    console.log("Getting restrictions in place from module: " + buzzSpaceID);
    return null;
}

function updateAuthorized(authorizedID, role, statusPoints) {
    console.log("Updating restriction: " + authorizedID + "to:");
    if (role != null) {
        console.log("Role: " + role);
    }

    if (statusPoints != null)
        console.log("Status Points: " + statusPoints);
    return true;
}

exports.isAuthorized = isAuthorized;
exports.getAuthorized = getAuthorized;
exports.addAuthorization = addAuthorization;
exports.updateAuthorization = updateAuthorized;
exports.removeAuthorization = removeAuthorization;