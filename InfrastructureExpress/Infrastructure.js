var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var csds = require("./mock_CSDS");
var notification = require("./Mock_Notification");

var aop = require("node-aop");

var logged_in_id = "";

//REQUIRED FUNCTIONS
function login(username, password) {
    logged_in_id = space.login(username, password, csds);
    console.log("loginResult :" + logged_in_id);
}

function logout() {
    logged_in_id = "";
}

function isLoggedIn(){
    if(logged_in_id == "") return false;
    return true;
}

/*
 * START OF CODE THAT EXTENDS AUTHORIZATION MODULE
 *
 */



var updateAuthorizationBeforeIntercept = aop.before(authorization, "updateAuthorization", function (buzzspaceID, statusPoints, role, objectName, objectMethod) {
    //TODO Update 100 to user status points
    authorization.isAuthorized(buzzspaceID, "Authorization", "updateAuthorization", logged_in_id, 100);
});

var getAuthorizationBeforeIntercept = aop.before(authorization, "getAuthorization", function (buzzSpaceID) {
    //TODO Update 100 to user status points
    authorization.isAuthorized(buzzSpaceID, "Authorization", "getAuthorization", logged_in_id, 100);
});

/*
 * END OF CODE THAT EXTENDS AUTHORIZATION MODULE
 *
 */

/*
 * START OF CODE THAT EXTENDS SPACES MODULE
 *
 */


function addAdministrator(module_id, user_id) {
    if(!isLoggedIn()) return false;

        if (user_id == logged_in_id) {
            console.log("You are already an administrator");
            return false;
        }

        if (space.isAdministrator(user_id)) {
            console.log("That user is already an administrator");
            return false;
        }

        if(space.isAdministrator(logged_in_id)){
            console.log("You need to be an administrator.");
            return false;
        }

        space.addAdministrator(module_id, user_id);
        console.log("Successfully added administrator");
        return true;
}


function removeAdministrator(module_id, user_id) {
    if(!isLoggedIn()) return false;


    if(space.isAdministrator(logged_in_id)){
        console.log("You need to be an administrator.");
        return false;
    }

        space.removeAdministrator(module_id, user_id);
        console.log("Successfully removed administrator");
        return true;
}

var closeBuzzSpaceBeforeIntercept;
function closeBuzzSpace(moduleID) {
    if(!isLoggedIn()) return false;

    if(space.isAdministrator(logged_in_id)) {
        console.log("You need to be an administrator.");
        return false;
    }

    try {
        if (closeBuzzSpaceBeforeIntercept == undefined) {
            closeBuzzSpaceBeforeIntercept = aop.before(space, "closeBuzzSpace", function (module_ID) {
                //TODO: Not 100 as status points - calculate
                if (!authorization.isAuthorized(module_ID, "space", "closeBuzzSpace", logged_in_id, 100)) {
                    throw "Not authorized to Close Buzz Space"
                }
            });
        }

        space.closeBuzzSpace(moduleID);
        console.log("Buzz Space successfully closed");
        return true;
    } catch (NotAuthorizedException) {
        console.log(NotAuthorizedException);
        return false;
    }
}


function createBuzzSpace(moduleID) {
    if(!isLoggedIn()) return false;

    if(space.isAdministrator(logged_in_id)){
        console.log("You need to be an administrator.");
        return false;
    }

    var academicYear = new Date().getFullYear();
        space.createBuzzSpace(moduleID, logged_in_id, academicYear);
        console.log("Buzz Space successfully created");
        return true;
    }





//var addAdminBeforeIntercept = aop.before(space, "addAdministrator", function (_module_id, _user_id) {
//    //TODO-Werner re-add your code(It's at the end of this document)
//});
//
//var removeAdminBeforeIntercept = aop.before(space, "removeAdministrator", function (_module_id, _user_id) {
//    //TODO-Werner re-add your code(It's at the end of this document)
//});
//
//var createBuzzSpaceBeforeIntercept = aop.before(space, "createBuzzSpace", function (module_ID, user_ID, academic_Year) {
////    TODO-Werner re-add your code(It's at the end of this document)
//});
//
//var closeBuzzSpaceBeforeIntercept = aop.before(space, "closeBuzzSpace", function (module_ID) {
//    //TODO-Werner  re-add your code(It's at the end of this document)
//    //TODO-Trevor remove all restrictions for buzzfeed
//    //TODO-Andreas remove all notification for buzzfeed
//});
/*
 * END OF CODE THAT EXTENDS SPACES MODULE
 */

/*
 * START OF CODE THAT EXTENDS CSDS MODULE
 */

/*
* END OF CODE THAT EXTENDS CSDS MODULE
* */

/*
* START OF CODE THAT EXTENDS NOTIFICATION MODULE
*
*/

/*
* END OF CODE THAT EXTENDS NOTIFICATION MODULE
*/


 module.exports.login = login;
 module.exports.logout = logout;
 module.exports.closeBuzzSpace = closeBuzzSpace;
 module.exports.createBuzzSpace = createBuzzSpace;
 module.exports.addAdministrator = addAdministrator;
 module.exports.removeAdministrator = removeAdministrator;

 module.exports.authorization = authorization;
 module.exports.csds = csds;
 module.exports.notification = notification;
