/**
 * Created by Semaka on 2015/03/21.
 * Student nr: 13081129
 */
//first we're requiring a few dependencies
var getBuzzSpace = require('createBuzzSpace');

function registerOnBuzzSpaceRequest()
{
    var userID = require('login');
    return userID;
}

function registerOnBuzzSpace(registerOnBuzzSpaceRequest)
{
    if(!getBuzzSpace.isOpen)
        return new Error("Buzz space not active");
    else if(registerOnBuzzSpaceRequest)
        return new Error("User not authorized to use this buzz space");
    else if(getBuzzSpace.isOpen && getProfileForUser(registerOnBuzzSpaceRequest)!= "No such user")
        return getProfileForUser(registerOnBuzzSpaceRequest);
    else
        return new ProfileData();
}

//ProfileData constructor
function ProfileData()
{
    var userNameForBuzzSpace;
    var photo;
    var signature;
}

//gets the user profile
function getProfileForUser(user)
{
    if(user)
        return user.ProfileData();
    else
        return new Error("No such user");
}
