var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("Notification");

var aop = require("node-aop");
//TODO: Persist login in Session or somewhere else
var logged_in_id = "";

function login(username,password){
     logged_in_id = space.login(username,password,CSDS);
    console.log("loginResult :"+logged_in_id);
}


function addAdministrator(module_id,user_id){
    if(logged_in_id == "") return false;

    if(!space.isAdministrator(logged_in_id)){
        console.log("Administrator required to add administrator");
        return false;
    }

    if(user_id == logged_in_id){
        console.log("You are already an administrator");
        return false;
    }

    if(space.isAdministrator(user_id)){
        console.log("User is already an administrator");
        return false;
    }

    space.addAdministrator(module_id,user_id);
    console.log("Successfully added administrator");
    return true;


}

function removeAdministrator(module_id,user_id){
    if(logged_in_id == "") return false;

    if(!space.isAdministrator(logged_in_id)){
        console.log("Administrator required to remove administrator");
        return false;
    }

    if(!space.isAdministrator(user_id)){
        console.log("User is not an administrator");
        return false;
    }

    space.removeAdministrator(module_id,user_id);
    console.log("Successfully removed administrator");
    return true;

}

var closeBuzzSpaceBeforeIntercept;
if(logged_in_id == "") return false;
function closeBuzzSpace(moduleID){
    try{
        if(closeBuzzSpaceBeforeIntercept == undefined) {
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
    }catch(NotAuthorizedException){
        console.log(NotAuthorizedException);
        return false;
    }
}


function createBuzzSpace(moduleID){
    var academicYear = new Date().getFullYear();
    if(logged_in_id == "") return false;

    space.createBuzzSpace(moduleID,logged_in_id,academicYear);

    console.log("Buzz Space successfully created");

    return true;

}

function logout(){
    logged_in_id = "";
}


module.exports.closeBuzzSpace = closeBuzzSpace;
module.exports.createBuzzSpace = createBuzzSpace;
module.exports.registerOnBuzzSpace = space.registerOnBuzzSpace;

module.exports.addAdministrator = addAdministrator;
module.exports.removeAdministrator = removeAdministrator;
module.exports.isAdministrator = space.isAdministrator;
module.exports.logout = logout;

module.exports.login = login;