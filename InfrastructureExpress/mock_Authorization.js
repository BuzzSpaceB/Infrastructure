/**
 * Created by Trevor on 2015-04-05.
 */
function addAuthorization(buzzspaceName, statusPoints, role, objectName, objectMethod) {
    if (buzzspaceName == "COS301" && role == "student" && objectName == "thread" && objectMethod == "edit") {
        if (statusPoints == 100) {
            throw "Restriction already exists"
        } else {
            throw "Restriction already exists with different status points value"
        }
    }
    console.log("Buzzspace: " + buzzspaceName + " has added restriction on service: " + objectName + "." + objectMethod + " with current restrictions: ");
    console.log("Role: " + role);
    console.log("Status Points: " + statusPoints);
}

function removeAuthorization(buzzspaceName, objectName, objectMethod) {
    if (buzzspaceName != "COS301" && objectName != "thread" && objectMethod != "edit") {
        throw "No restriction exists for current remove";
    }
    console.log("Removing restriction on " + objectName + "." + objectMethod + "in buzzspace: " + buzzspaceName);
}

function isAuthorized(buzzspaceName, objectName, objectMethod, userID, statusPoints) {
    console.log("Checking if userID: " + userID + " has access to " + objectName + "." + objectMethod + " in module: " + buzzspaceName);

    if (userID == "" || userID == undefined) {
        throw "Student is not authorized";
    }
    console.log("Access is authorized");
}

function getAuthorized(buzzSpaceName) {
    console.log("Getting restrictions in place from module: " + buzzSpaceName);
    var arr = [{
        objectName: "thread",
        objectType: "edit",
        role: "student",
        statusPoints: 100
    }, {
        objectName: "thread",
        objectType: "edit",
        role: "student",
        statusPoints: 100
    }];
    return arr;
}

function updateAuthorized(buzzspaceName, statusPoints, role, objectName, objectMethod, newRole, newStatusPoints) {
    if (!(buzzspaceName == "COS301" && role == "student" && objectName == "thread" && objectMethod == "edit")){
        throw "Current restriction cannot be updated as it cannot be found"
    }
    console.log("Updating restriction : " + objectName + "." + objectMethod + "in buzzspace: " + buzzspaceName + " to:");
    if (role != null) {
        console.log("Role: " + role);
    }
    if (statusPoints != null)
        console.log("Status Points: " + statusPoints);
}


exports.isAuthorized = isAuthorized;
exports.getAuthorized = getAuthorized;
exports.addAuthorization = addAuthorization;
exports.updateAuthorization = updateAuthorized;
exports.removeAuthorization = removeAuthorization;