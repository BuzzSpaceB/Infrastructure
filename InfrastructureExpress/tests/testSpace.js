/**
 * Created by wernermostert on 2015/04/05.
 */
//module.exports.addAdministrator = addAdministrator;
//module.exports.removeAdministrator = removeAdministrator;
//module.exports.isAdministrator = space.isAdministrator;

//module.exports.login = login;

var infra = require("../Infrastructure");

//---------------CREATE BUZZ SPACE-------------------------------//
exports.createBuzzSpaceTestNotLoggedIn = function(test){

    test.equal(infra.createBuzzSpace("COS133355_121AS"),false,"Should be false because not logged in yet");
    test.done();
};

exports.createBuzzSpaceLoggedIn = function(test){
    infra.login("u13019695","1234#");
    test.equal(infra.createBuzzSpace("COS133355_121AS"),true,"Should work, after logging in");
    infra.logout();
    test.done();
};


//---------------CLOSE BUZZ SPACE-------------------------------//
exports.closeBuzzSpaceNotLoggedIn = function(test){
    test.equal(infra.closeBuzzSpace("COS133355_121AS"),false,"Should not work, not logged in");
    test.done();
};

exports.closeBuzzSpaceLoggedIn = function(test){
    infra.login("u13019695","1234#");
    test.equal(infra.closeBuzzSpace("COS133355_121AS"),true,"Should work, after logging in");
    infra.logout();
    test.done();
};


exports.closeBuzzSpaceNotExist = function(test) {
    infra.login("u13019695", "1234#");
    test.equal(infra.closeBuzzSpace("NoExistBuzzy"), false, "Cant close a non existing buzz space");
    infra.logout();
    test.done();
};

//------------------ADD ADMINISTRATOR-------------------------//

exports.addAdministratorNotLoggedIn = function(test){
    test.equal(infra.closeBuzzSpace("COS133355_121AS","u2123151231"),false,"Should not work, not logged in");
    test.done();
};

exports.addAdministratorLoggedIn = function(test){

    infra.login("u13019695", "1234#");
    test.equal(infra.addAdministrator("COS133355_121AS","u21356546"),false,"Should work,when logged in");
    infra.logout();
    test.done();
};

exports.addAdministratorSelf = function(test){
    infra.login("u13019695", "1234#");
    test.equal(infra.addAdministrator("COS133355_121AS","u21356546"),false,"Should work,when logged in");
    infra.logout();
    test.done();
};


//--------------------REMOVE ADMINISTRATOR--------------------//

exports.removeAdministratorNotLoggedIn = function(test){

    var infra = require("../Infrastructure");
    test.equal(infra.closeBuzzSpace("COS133355_121AS"),false,"Should not work, not logged in");
    test.done();
};

exports.removeAdministratorLoggedIn = function(test){

    var infra = require("../Infrastructure");
    infra.login("u13019695", "1234#");
    test.equal(infra.closeBuzzSpace("COS133355_121AS"),false,"Should not work, not logged in");
    infra.logout();
    test.done();
};







