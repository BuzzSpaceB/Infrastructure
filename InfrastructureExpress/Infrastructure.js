var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("./Mock_Notification");

var aop = require("node-aop");

var logged_in_id = "";


//NEW CODE IDEA

//REQUIRED FUNCTIONS
function login(username, password) {
    logged_in_id = space.login(username, password, CSDS);
    console.log("loginResult :" + logged_in_id);
}

function logout() {
    logged_in_id = "";
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
var addAdminBeforeIntercept = aop.before(space, "addAdministrator", function (_module_id, _user_id) {
    //TODO-Werner re-add your code(It's at the end of this document)
});

var removeAdminBeforeIntercept = aop.before(space, "removeAdministrator", function (_module_id, _user_id) {
    //TODO-Werner re-add your code(It's at the end of this document)
});

var createBuzzSpaceBeforeIntercept = aop.before(space, "createBuzzSpace", function (module_ID, user_ID, academic_Year) {
//    TODO-Werner re-add your code(It's at the end of this document)
});

var closeBuzzSpaceBeforeIntercept = aop.before(space, "closeBuzzSpace", function (module_ID) {
    //TODO-Werner  re-add your code(It's at the end of this document)
    //TODO-Trevor remove all restrictions for buzzfeed
    //TODO-Andreas remove all notification for buzzfeed
});
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


//Module exports(SHOULD BE CHANGED TO MODULE OBJECTS && LOGIN
module.exports.closeBuzzSpace = closeBuzzSpace;
module.exports.createBuzzSpace = createBuzzSpace;
module.exports.registerOnBuzzSpace = space.registerOnBuzzSpace;

module.exports.addAdministrator = addAdministrator;
module.exports.removeAdministrator = removeAdministrator;
module.exports.isAdministrator = space.isAdministrator;
module.exports.logout = logout;

module.exports.login = login;


/*
 OLD CODE:
 var addAdminBeforeIntercept;
 function addAdministrator(module_id, user_id) {
 try {
 if (user_id == logged_in_id) {
 console.log("You are already an administrator");
 return false;
 }

 if (space.isAdministrator(user_id)) {
 console.log("That user is already an administrator");
 return false;
 }

 if (addAdminBeforeIntercept == undefined) {
 addAdminBeforeIntercept = aop.before(space, "addAdministrator", function (_module_id, _user_id) {
 //TODO: Not 100 as status points - calculate
 //TODO: Remove authorization
 if (!authorization.isAuthorized(module_id, "space", "addAdministrator", logged_in_id, 100)) {
 throw "Not authorized to add Administrator";
 }
 });
 }

 space.addAdministrator(module_id, user_id);
 console.log("Successfully added administrator");
 return true;

 } catch (NotAuthorizedException) {
 console.log(NotAuthorizedException);
 return false;
 }
 }

 var removeAdminBeforeIntercept;
 function removeAdministrator(module_id, user_id) {

 try {
 if (removeAdminBeforeIntercept == undefined) {
 removeAdminBeforeIntercept = aop.before(space, "removeAdministrator", function (_module_id, _user_id) {
 //TODO: Not 100 as status points - calculate
 //TODO: remove authorization
 if (!authorization.isAuthorized(module_id, "space", "removeAdministrator", logged_in_id, 100)) {
 throw "Not authorized to remove Administrator";
 }
 });
 }

 space.removeAdministrator(module_id, user_id);
 console.log("Successfully removed administrator");
 return true;

 } catch (NotAuthorizedException) {
 console.log(NotAuthorizedException);
 return false;
 }
 }

 var closeBuzzSpaceBeforeIntercept;
 function closeBuzzSpace(moduleID) {
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

 var createBeforeIntercept;
 function createBuzzSpace(moduleID) {
 var academicYear = new Date().getFullYear();

 try {

 if (createBeforeIntercept == undefined) {
 createBeforeIntercept = aop.before(space, "createBuzzSpace", function (module_ID, user_ID, academic_Year) {
 //TODO: Not 100 as status points - calculate
 //TODO remove authorization
 if (!authorization.isAuthorized(module_ID, "space", "createBuzzSpace", logged_in_id, 100)) {
 throw "Not authorized to Create Buzz Space"
 }
 });
 }
 space.createBuzzSpace(moduleID, logged_in_id, academicYear);
 console.log("Buzz Space successfully created");

 return true;
 } catch (NotAuthorizedException) {
 console.log(NotAuthorizedException);
 return false;
 }
 }*/