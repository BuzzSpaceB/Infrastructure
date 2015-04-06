var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("Notification");

var aop = require("node-aop");

var logged_in_id = "";




function login(username,password){
     logged_in_id = space.login(username,password,CSDS);
    console.log("loginResult :"+logged_in_id);

}

var addAdminBeforeIntercept;
function addAdministrator(module_id,user_id){
try {
    if(user_id == logged_in_id){
        console.log("You are already an administrator");
        return false;
    }

    if(space.isAdministrator(user_id)){
        console.log("That user is already an administrator");
        return false;
    }

    if(addAdminBeforeIntercept == undefined) {
        addAdminBeforeIntercept = aop.before(space, "addAdministrator", function (_module_id, _user_id) {
            //TODO: Not 100 as status points - calculate
            if (!authorization.isAuthorized(module_id, "space", "addAdministrator", logged_in_id, 100)) {
                throw "Not authorized to add Administrator";
            }
        });
    }

    space.addAdministrator(module_id,user_id);
    console.log("Successfully added administrator");
    return true;

}catch(NotAuthorizedException){
    console.log(NotAuthorizedException);
    return false;
}
}

var removeAdminBeforeIntercept;
function removeAdministrator(module_id,user_id){

    try {
        if(removeAdminBeforeIntercept == undefined) {
            removeAdminBeforeIntercept = aop.before(space, "removeAdministrator", function (_module_id, _user_id) {
                //TODO: Not 100 as status points - calculate
                if (!authorization.isAuthorized(module_id, "space", "removeAdministrator", logged_in_id, 100)) {
                    throw "Not authorized to remove Administrator";
                }
            });
        }

        space.removeAdministrator(module_id,user_id);
        console.log("Successfully removed administrator");
        return true;

    }catch(NotAuthorizedException){
        console.log(NotAuthorizedException);
        return false;
    }
}

var closeBuzzSpaceBeforeIntercept;
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

var createBeforeIntercept;
function createBuzzSpace(moduleID){
    var academicYear = new Date().getFullYear();

    try{

        if(createBeforeIntercept == undefined) {
            createBeforeIntercept = aop.before(space, "createBuzzSpace", function (module_ID, user_ID, academic_Year) {
                //TODO: Not 100 as status points - calculate
                if (!authorization.isAuthorized(module_ID, "space", "createBuzzSpace", logged_in_id, 100)) {
                    throw "Not authorized to Create Buzz Space"
                }
            });
        }
        space.createBuzzSpace(moduleID,logged_in_id,academicYear);

        console.log("Buzz Space successfully created");

        return true;
    }catch(NotAuthorizedException){
        console.log(NotAuthorizedException);
        return false;
    }
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