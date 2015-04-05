/**************************************\
 *                                    *
 *  Name: Tebogo Christopher Seshibe  *
 *  File: dummy_csds.js               *
 *  Description: Dummy database file  *
 *                                    *
\**************************************/

/**
 *
 *  @description Database object containing the database and accessor functions
 */
var Database = 
{
	buzzspaces:
	[
		{ module_id: "COS301", isOpen: true,  coursename: "Software Engineering" },
		{ module_id: "COS314", isOpen: false, coursename: "Artificial Intelligence" },
		{ module_id: "COS332", isOpen: true,  coursename: "Computer Networks" },
		{ module_id: "COS341", isOpen: false, coursename: "Compiler Construction" },
		{ module_id: "COS344", isOpen: true,  coursename: "Computer Graphics" }
	], /*< An array of buzzspace objects */
	
	users:
	[
		{ user_id: "u13103394", password: "0000",      admin: true,  firstname: "Godfrey", lastname: "Mathe" },
		{ user_id: "u13081129", password: "1234",      admin: false, firstname: "Semaka",  lastname: "malapane" },
		{ user_id: "u12003672", password: "password",  admin: false, firstname: "Joseph",  lastname: "Potgieter" },
		{ user_id: "u10668544", password: "password1", admin: true,  firstname: "Tsepo",   lastname: "Ntsaba" },
		{ user_id: "u13181442", password: "1337sp34k", admin: false, firstname: "Tebogo",  lastname: "Seshibe" }
	],/*< An array of user objects */
		
	/**
	 *
	 *  @description Checks the user credentials against the database and logs in if user exists
	 *  @param user_id An object containing the user id and password of the user attempting to log in
	 *  @return String A success message if log in completed without errors
	 *  @throws String An exception whether a user passed an invalid user_id or password
	 */
	login: function( loginRequest )
	{
		var user = Database.getUserProfile( loginRequest.user_id );
		
		if( user == null )
			throw "User \"" + user + "\" could not be found in the database";
		
		if( loginRequest.user_id !== user.user_id )
			throw "User passsword for \"" + user_id + "\" is incorrect";
					
		return "Login successful";		
	},
	
	/**
	 *
	 *  @description Checks whether a user exists in the database, after which an object is returned containing the reasult
	 *  @param user_id The identifier of the user we are attempting to get access to
	 *  @return Object If the user exists, and object containing the user info is returned otherwise, null is returned
	 */
	getUserProfile: function( user_id )
	{
		for( var i = 0; i < Database.users.length; ++i )
			if( Database.users[ i ].user_id === user_id );
				return Database.users[ i ];
		
		return null;
	},
	
	/**
	 *
	 *  @description Checks whether a buzz space exists in the database, after which an object is returned containing the reasult
	 *  @param module_id The identifier of the buzz space we are attempting to get access to
	 *  @return Object If the buzz space exists, and object containing the user info is returned otherwise, null is returned
	 */
	getBuzzSpace: function( module_id )
	{
		for( var i = 0; i < Database.buzzspaces.length; ++i )
			if( Database.buzzspaces[ i ].module_id === module_id );
				return Database.buzzspaces[ i ];
		
		return null;
	}
}

module.exports.login = Database.login;
module.exports.getUserProfile = Database.getUserProfile;
module.exports.getBuzzSpace = Database.getBuzzSpace;
