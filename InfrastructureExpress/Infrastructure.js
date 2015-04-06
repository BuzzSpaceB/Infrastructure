var authorization = require("./mock_Authorization");
var space = require("./mock_Space");
var CSDS = require("./mock_CSDS");
var notification = require("Notification");

var aop = require("node-aop");

function login(){
    var uid = space.login("u13019695","1234#",CSDS);
    console.log("loginResult :"+uid);
    global["logged_in_uid"] = uid;
}

function addAdministrator(module_id,user_id){
    var logged_in_id = global["logged_in_uid"];

try {
    var inercept1 = aop.before(space, "addAdministrator", function (_module_id,_user_id) {
        //TODO: Not 100 as status points - calculate
        if (!authorization.isAuthorized(module_id, space, "addAdministrator", logged_in_id, 100)) {
            throw "Not authorized to add Administrator";
        }
    });

    space.addAdministrator(module_id,user_id);
    console.log("Successfully added administrator")
    return true;

}catch(NotAuthorizedException){
    console.log(NotAuthorizedException);
    return false;
}
}

function removeAdministrator(module_id,user_id){
    var logged_in_id = global["logged_in_uid"];
    try {
        var intercept1 = aop.before(space, "removeAdministrator", function (_module_id,_user_id) {
            //TODO: Not 100 as status points - calculate
            if (!authorization.isAuthorized(module_id, space, "removeAdministrator", logged_in_id, 100)) {
                throw "Not authorized to remove Administrator";
            }
        });

        space.removeAdministrator(module_id,user_id);
        console.log("Successfully removed administrator");
        return true;

    }catch(NotAuthorizedException){
        console.log(NotAuthorizedException);
        return false;
    }
}

function closeBuzzSpace(moduleID){
    var logged_in_id = global["logged_in_uid"];
    try{
        var intercept1 = aop.before(space,"closeBuzzSpace",function(module_ID){
            //TODO: Not 100 as status points - calculate
            if(!authorization.isAuthorized(module_ID,space,"closeBuzzSpace",logged_in_id,100)){
                throw "Not authorized to Close Buzz Space"
            }
        });

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
    var logged_in_id = global["logged_in_uid"];
    try{
        var intercept1 = aop.before(space,"createBuzzSpace",function(module_ID,user_ID,academic_Year){
            //TODO: Not 100 as status points - calculate
            if(!authorization.isAuthorized(module_ID,space,"createBuzzSpace",logged_in_id,100)){
                throw "Not authorized to Create Buzz Space"
            }
        });

        space.createBuzzSpace(moduleID,logged_in_id,academicYear);
        console.log("Buzz Space successfully create");
        return true;
    }catch(NotAuthorizedException){
        console.log(NotAuthorizedException);
        return false;
    }
}



module.exports.closeBuzzSpace = closeBuzzSpace;
module.exports.createBuzzSpace = createBuzzSpace;
module.exports.registerOnBuzzSpace = space.registerOnBuzzSpace;

module.exports.addAdministrator = addAdministrator;
module.exports.removeAdministrator = removeAdministrator;
module.exports.isAdministrator = space.isAdministrator;

module.exports.login = login;