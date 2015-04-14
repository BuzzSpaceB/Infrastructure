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

function isLoggedIn() {
    if (logged_in_id == "") return false;
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
    if (!isLoggedIn()) return false;

    if (user_id == logged_in_id) {
        console.log("You are already an administrator");
        return false;
    }

    if (space.isAdministrator(user_id)) {
        console.log("That user is already an administrator");
        return false;
    }

    if (!space.isAdministrator(module_id, logged_in_id)) {
        console.log("You need to be an administrator.");
        return false;
    }

    space.addAdministrator(module_id, user_id);
    console.log("Successfully added administrator");
    return true;
}


function removeAdministrator(module_id, user_id) {
    if (!isLoggedIn()) return false;

    if (!space.isAdministrator(module_id, logged_in_id)) {
        console.log("You need to be an administrator.");
        return false;
    }

    space.removeAdministrator(module_id, user_id);
    console.log("Successfully removed administrator");
    return true;
}

var closeBuzzSpaceBeforeIntercept;
function closeBuzzSpace(moduleID) {
    if (!isLoggedIn()) return false;

    if (!space.isAdministrator(moduleID, logged_in_id)) {
        console.log("You need to be an administrator.");
        return false;
    }

    try {
        if (closeBuzzSpaceBeforeIntercept == undefined) {
            closeBuzzSpaceBeforeIntercept = aop.before(space, "closeBuzzSpace", function (module_ID) {
                //TODO: Not 100 as status points - calculate
                authorization.isAuthorized(module_ID,"space", "closeBuzzSpace", logged_in_id, 100);
                //Get all authorized and remove them
                var arr = authorization.getAuthorized(module_ID);
                for(var i = 0; i < arr.length; i++){
                    authorization.removeAuthorization(module_ID, arr[i].objectName, arr[i].objectMethod);
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
    if (!isLoggedIn()) return false;

    if (!space.isAdministrator(moduleID, logged_in_id)) {
        console.log("You need to be an administrator.");
        return false;
    }

    var academicYear = new Date().getFullYear();
    space.createBuzzSpace(moduleID, logged_in_id, academicYear);
    console.log("Buzz Space successfully created");
    return true;
}

/*
 * END OF CODE THAT EXTENDS SPACES MODULE
 */

/*
 * START OF CODE THAT EXTENDS CSDS MODULE
 */
var getUsersRolesForModuleIntercept = aop.before(csds, "getUsersRolesForModuleRequest", function(moduleID, userID){
   //TODO obtain status points
    authorization.isAuthorized(moduleID, "csds", "getUsersRolesForModule", userID, 0);

});

var getUsersRolesWithRoleIntercept = aop.before(csds, "getUsersWithRoleRequest", function(userID, roleID, moduleID){
    //TODO obtain status points
    authorization.isAuthorized(moduleID, "csds", "getUsersWithRole", userID, 0);
});
/*
 * END OF CODE THAT EXTENDS CSDS MODULE
 * */

/*
 * START OF CODE THAT EXTENDS NOTIFICATION MODULE
 *
 * Comments for each function in Mock_Notification.js
 */

function postNotification(threadID){
    notification.StandardNotification(threadID);
}

function deleteNotificaion(sendARequest,threadID,reason) {
    var object = {
        sendRequest: sendARequest,
        thread: threadID,
        reason: reason
    }

    notification.deleteNotification(object);
}

function appraisalNotification(fromUserID,toUserID,threadID,appraisal){
    var object = {
        current_user_id: fromUserID,
        post_user_id: toUserID,
        appraisedThread_id: threadID,
        appraisalType: appraisal
    }

    notification.addAppraisalToDB(object);
}

function registerForNotification(userID,threadID,registeredTo){
    //Read comments in Mock_Notifications.js of how this works. NOTE: registeredTo is an array
    var object = {
        user_id: userID,
        thread_id: threadID,
        registeredTo: registeredTo
    }

    notification.GlobalRegisterForNotification(object);
}

function deregisterForNotification(userID,threadID){
    var object = {
        Type: "Delete",
        user_id: userID,
        thread_id: threadID
    }

    notification.GlobalEditSubscription(object);
}

function registerNewUserNotificationSettings(userID,Deletion,Appraisal,InstantEmail,DailyEmail){
    /*
    userID = string
    Deletion = boolean
    Appraisal = boolean
    InstantEmail = boolean
    DailyEmail = boolean
     */

    var object = {
        user_id: userID,
        Deletion: Deletion,
        Appraisal: Appraisal,
        InstantEmail: InstantEmail,
        DailyEmail: DailyEmail,
    }

    notification.GlobalRegisterUserNotificationSettings(object);
}

function editUserNotificationSettings(userID,editWhat,setAs){
    var object = {
        editWhat: editWhat,
        user_id: userID,
        SetAs: setAs
    }

    notification.GlobalEditNotificationSettings(object);
}

function webNotificationsUI(userID){
    var object = {
        user_id: userID
    }

    return notification.WebNotifs(object);

}

function startDailyEmailService(hour,minute){
    //hour = int
    //minute = int

    var object = {
        hour: hour,
        minute: minute
    }

    notification.DailyEmail(JSON.stringify(object));
}

/*
 * END OF CODE THAT EXTENDS NOTIFICATION MODULE
 */


module.exports.login = login;
module.exports.logout = logout;
module.exports.closeBuzzSpace = closeBuzzSpace;
module.exports.createBuzzSpace = createBuzzSpace;
module.exports.addAdministrator = addAdministrator;
module.exports.removeAdministrator = removeAdministrator;
module.exports.getUserProfile = space.getUserProfile;

module.exports.authorization = authorization;
module.exports.csds = csds;
module.exports.notification = notification;