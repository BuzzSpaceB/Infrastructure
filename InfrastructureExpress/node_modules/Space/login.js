/**
 *
 * @description This function takes in the user credentials and sends them to the csds to get verified
 * @param username
 * @param password
 */
function login(username, password)
{
    var csds = require("CSDS.js");

    try
    {
        csds.login(username, password);
    }
    catch( e )
    {
	alert( e );
    }
}

module.exports.login = login();
