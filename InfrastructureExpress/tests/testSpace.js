/**
 * Created by wernermostert on 2015/04/05.
 */
//module.exports.closeBuzzSpace = closeBuzzSpace;
//module.exports.createBuzzSpace = createBuzzSpace;
//module.exports.registerOnBuzzSpace = space.registerOnBuzzSpace;
//
//module.exports.addAdministrator = addAdministrator;
//module.exports.removeAdministrator = removeAdministrator;
//module.exports.isAdministrator = space.isAdministrator;

//module.exports.login = login;



var infra = require("../Infrastructure");

exports.createBuzzSpaceTestNotLoggedIn = function(test){
    test.equal(infra.createBuzzSpace("COS133355_121AS"),false,"Should be false because not logged in yet");
    test.done();
};

exports.createBuzzSpaceLoggedIn = function(test){
    infra.login("u13019695","1234#");
    test.equal(infra.createBuzzSpace("COS133355_121AS"),true,"Should work, after logging in");
    test.done();
};

