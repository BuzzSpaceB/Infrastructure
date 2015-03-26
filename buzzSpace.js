/**
 * @author Godfrey Mathe, u13103394
 * @author Semaka Malapane, u13081129
 * @author Joseph Potgieter, u12003672
 * @author Tsepo Ntsaba, u10668544
 * @author Tebogo Seshibe, u13181442
 * @author Muller Potgieter 
 * @version 0.0.5
 */


/**
 *
 * @description BuzzSpace class containing the required functions in the main specifications
 */
var BuzzSpace =
{
    //csds: require( "./CSDS"),
    //authorization: require( "./Authorization"),
    moduleID: "",
    isOpen: false,
    academicYear: "",
    profiles: [],
    rootThread: null,

    /**
     *
     *  @description Simple login function
     *  @param username The user id
     *  @param password The password of the user
     */
    login: function( _username, _password )
    {
        try
        {
            var loginRequest = { user_id: _username, password: _password };
            //csds.login( loginRequest );
            console.log( "Login Succesful" );
        }
        catch( e )
        {
            return e.toString;
        }
    },

    /**
     *
     * @constructor
     * This is the Constructor for the space class
     */

    BuzzSpace: function(){
        this.moduleID = "";
        this.isOpen = "";
        this.academicYear = "";
    },


    /**
     *
     * @param _moduleID
     * represents the module code
     * @param _academicYear
     * represents the academic year for which the space is to be created
     * @param _userID
     * the identification of the user who spawns the request
     *
     * Function simply creates a new space if the user was authorised
     */

    createBuzzSpace: function (_moduleID ,_academicYear,_userID ) {

        /**
         * Register the user first  onto the space created
         */
            //TODO: Where is registerUser?
        BuzzSpace.registerOnBuzzSpace(_userID, _moduleID);
        /**
         * Make the user an admin for the space created
         */
            //TODO: A user can't be assigned as an administrator - that comes from LDAP and is determined by the CS Department
        //assignAdministrator(_userID);

        /**
         * Store space to persistance
         */
        //storeBuzzSpace();
    },


    /**
     *
     * @BuzzSpaceExistsException
     *
     * Throw this exception when a buzz space already exists with same module id
     */
    BuzzSpaceExistsException: function () {

        print("Buzz Space Already Exists");
    },


    /**
     * Function that creates a request
     * and checks if the user is authorised to create a space and whether a space for the moduleID does not exist yet
     * @param _userID stores the ID of the user
     * @param _moduleID represents the module code
     */

    createBuzzSpaceRequest: function (_userID, _academicYear, _moduleID) {
        //TODO: Validation is done beforehand with intercepts
        var userValid = true; //authorization.validateUser(_userID); //return true if the user is recognised , Done by authorization through inteceptors
        //TODO: Validation is done beforehand with intercepts
        var userRoleValid = true; //authorization.userRoleValid(_userID); // check to return true see if the user is a lecturer else return null
        var spaceExists = false; //csds.spaceExists(_moduleID); //return true if space exists else null

        if(userValid)
        {
            if(userRoleValid){
                if(!spaceExists)
                {
                    BuzzSpace.createBuzzSpace(_moduleID ,_academicYear,_userID );
                }
            }

        }

    },


    /**
     * This function simply stores the created space to the database
     * @param _moduleID represents the module code
     * @param _isOpen boolean to check if space is Active
     * @param _academicYear the year for which the space is to be created
     */


    storeBuzzSpace: function (_moduleID, _isOpen ,_academicYear) {
        //TODO: Supply database to test with
        var databaseUrl = "db";
        var collections = ["BuzzSpaces"];
        var db = require("mongojs").connect(databaseUrl, collections);


        db.users.save(CreateBuzzSpaceResult, function(err, saved) {
            if( err || !saved ) console.log("Space not saved");
            else console.log("Space saved");
        });

    },

    /**
     * Authorization module intercepts with this function to validate a user
     * @param _userID stores the user ID
     */

    //TODO: Remove this - validation will be done with an Authentication Intercept
    validateUser: function (_userID) {

        //Authorization module to be included to allow for this method

    },

    /**
     *Authorization module intercepts with this function to validate a users role
     * @param _userID stores the user ID
     */
    //TODO: Remove this - We can assume that by the time this function is called - the user is valid (due to intercepts)
    userRoleValid: function (_userID) {

        // get user roles from CSDS Adapter
        // Authorization module to be included to allow for this method

    },


    spaceExists: function (_moduleID) {
        //TODO: Missing implementation
        // get active spaces from MongoDB
        //TODO: Authorization doesn't have an bearing on if a space exits or not? If I am not mistaking
        // Authorization module to be included to allow for this method

    },

    //TODO:Remove - can not assign administrators, retreived from CS LDAP
    assignAdministrator: function (_userID) {

        this.admin = _userID;

    },


    /**
     * getter function for moduleID
     * @returns {string} returns the module ID
     */
    getModuleId: function(){
        return this.moduleID;
    } ,


    /**
     * getter function for the academic year
     * @returns {string} returns the module ID
     */
    getAcademicYear: function(){
        return this.academicYear;
    } ,

    /**
     * function returns true if space is active
     * @returns {boolean} returns true or false
     */
    isActive: function(){

        return this.isOpen;

    },

    /**
     * This function deletes the space from MongoDb
     * @param _moduleID represents the module code
     */

    deleteBuzzSpace: function (_moduleID) {

        deleteFromDb(_moduleID);

    },


    /**
     *Function simply adds the new user to a list of registered users
     * @param userID represents the user ID
     * @param _moduleID represents the module code
     */

    //TODO: Update DB
    registerOnSpace: function (userID,_moduleID) {

        users.add(userID,_moduleID);
    },

    /**
     * Threads module to be required for this method hat creates a root thread for the space
     */
    //TODO: Use a mock Thread Object
    //TODO: Please implement
    createRootThread: function () {

    },

    /**
     *
     *  @description Return a user object
     *  @param username The user id
     */
    getUserProfile: function( username )
    {
        //return csds.getUserProfile( username );
        var user = { user_id: "Tsepho", password: "1234" };
        return user;
    },

    /**
     *
     *  @description Function used to set a buzzspace inactive
     *  @param username The user id
     *  @module_id The id of the module being closed
     */
    closeBuzzSpace: function( user_id, module_id )
    {
        /*if( authorization.isAuthorized( user_id, module_id ) )
        {
            var space = csds.getBuzzSpace( module_id );
            space.isOpen = false;
            return true;
        }

        else*/
           console.log( "User \"" + user_id + "\" is not authorized in \"" + module_id + "\"");
    },

    /**
     *
     *  @description Function used to register a user to a buzzspace
     *  @param username The user id
     *  @module_id The id of the module the user is registering to
     *  @param module_id The password of the user
     */
    registerOnBuzzSpace: function( username, module_id )
    {
        //var space = csds.getBuzzSpace( module_id );

        if( true )
        {
            var user = BuzzSpace.getUserProfile( username );

            if( user === null )
                throw "User ID \"" + username + "\" does not exist";

            try
            {
                //space.registerOnBuzzSpace( username );
                console.log( "Registered " + username +" for " + module_id );
            }
            catch( e )
            {
                throw e;
            }
        }

        else
            throw "BuzzSpace \"" + module_id + "\" is closed";
    }
};

module.exports.login = BuzzSpace.login;
module.exports.createBuzzSpace = BuzzSpace.createBuzzSpaceRequest;
module.exports.closeBuzzSpace = BuzzSpace.closeBuzzSpace;
module.exports.registerOnBuzzSpace = BuzzSpace.registerOnBuzzSpace;
module.exports.getUserProfile = BuzzSpace.getUserProfile;
