/**
 * Created by Andreas du Preez on 2015/04/05.
 */


//************ Connect to DB ****************
/*

var mongoose = require('mongoose');
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback)
{

});

*/
//*******************************************



//************ Mock DB ***********************

var userNotificationSettings = {
    user_id: null,
    Deletion: null,
    Appraisal: null,
    InstantEmail: null,
    DailyEmail: null
}



//*******************************************





//This function notifies everyone that is subscribed to @Param1 (the thread ID), that there is a new Post.
module.exports.PostNotification = function StandardNotification(threadID)
{
  //Call a function

  console.log("Post notification send to everyone that's registered to ThreadID: " + threadID + ".");
}



//This function notifies someone that his/her post was deleted.
module.exports.DeleteNotification = function DeleteNotification(object)
{
    /*
  var object = {
    sendRequest: sendRequest,
    fromUserID: fromUserID,
    toUserID: toUserID,
    reason: reason
  }
  */

  console.log("Delete notification send.");
}


//This function notifies someone of an appraisal.
module.exports.AppraisalNotification = function AppraisalNotification(object)
{
  /*

  var object = {
    current_user_id: fromUserID,
    post_user_id: toUserID,
    appraisedThread_id: threadID,
    appraisalType:appraisalType
  }

  */
  
  console.log("Appraisal notification send.");
}


module.exports.registerForNotification = function registerForNotification(object)
{
  /*
  
    object consist of :
      user_id: string,
      threads: string,
      users: array //Array of users registered to, or 'All' for everything
  
  */



  //Still Busy
}

module.exports.deregisterForNotification = function deregisterForNotification()
{
    //Still Busy
}


module.exports.registerNewUserNotificationSettings = function registerNewUserNotificationSettings(object)
{
  /*
    
    object consist of :
        user_id: string,
        Deletion: boolean,
        Appraisal: boolean,
        InstantEmail: boolean,
        DailyEmail: boolean
  
  */

    valid = true;

    if (object != null)
    {
        if (object.user_id == valid && object.Deletion != undefined && object.Appraisal != undefined && object.InstantEmail != undefined && object.DailyEmail != undefined)
        {
            userNotificationSettings = object;
            console.log("User successfully registered for email notifications.");
        }
    }
}

module.exports.editUserNotificationSettings = function editUserNotificationSettings(object)
{
  /*
    
    object consist of :
      editWhat: string, //Deletion/Appraisal/DailyEmail/InstantEmail
      user_id: string,
      SetAs: boolean
  
  */

    if (userNotificationSettings != null)
    {
        if (userNotificationSettings.user_id == object.user_id)
        {
            userNotificationSettings[object.editWhat] = object.SetAs;
        }
    }
    else
    {
        console.log("User does not exist.");
    }

}
