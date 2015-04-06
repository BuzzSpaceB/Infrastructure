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

//NOTE: There will be multiple entries of 'subscriptions' in the db for a user. For this mock, I only used one. Explanation is provided in GlobalRegisterForNotification below.

var subscriptions = {
    user_id: "u12207871",
    threads: 'root',
    users: ['All']
}

var userNotificationSettings = {
    user_id: "",
    Deletion: null,
    Appraisal: null,
    InstantEmail: null,
    DailyEmail: null
}

//*******************************************


//This function notifies everyone that is subscribed to @Param1 (the thread ID), that there is a new Post.
//PostNotification
module.exports.StandardNotification = function StandardNotification(threadID)
{
  if (subscriptions != undefined)
  {
      if (subscriptions.user_id == userNotificationSettings.user_id)
      {
          if (subscriptions.threads == "root")
          {
              if (userNotificationSettings.InstantEmail)
                console.log("Instant Email about post sent " + threadID + ".");
              if (userNotificationSettings.DailyEmail)
                console.log("Daily Email about post queued in thread " + threadID + ".");
          }
          else if (subscriptions.threads == threadID)
          {
              if (userNotificationSettings.InstantEmail)
                  console.log("Instant Email about post sent " + threadID + ".");
              if (userNotificationSettings.DailyEmail)
                  console.log("Daily Email about post queued " + threadID + ".");
          }
          else
          {
              console.log("User not registered for notifications from " + threadID);
          }
      }
  }
}

//This function notifies someone that his/her post was deleted.
//DeletionNotification
module.exports.deleteNotification = function deleteNotification(object)
{
    /*
  var object = {
    sendRequest: boolean, //Ask if i can delete thread, true = send email to ask, false = just delete
    thread: threadID
    reason: reason
  }
  */

    if (subscriptions != undefined)
    {
        if (object.sendRequest)
            console.log("Sending email to thread owner asking if thread can be deleted. Reason: " + object.reason);

        if (subscriptions.threads.indexOf("All") > -1) {

            if (userNotificationSettings.Deletion) {
                if (userNotificationSettings.InstantEmail) {
                    console.log("Instant Email about deletion sent. Reason: " + object.reason);
                }
                if (userNotificationSettings.DailyEmail) {
                    console.log("Daily Email about deletion queued. Reason: " + object.reason);
                }
            }
        }
        else{
            //send notification to specific users
        }
    }
}

//This function notifies someone of an appraisal.
//AppraisalNotification
module.exports.addAppraisalToDB = function addAppraisalToDB(object)
{
  /*

  var object = {
    current_user_id: fromUserID,
    post_user_id: toUserID,
    appraisedThread_id: threadID,
    appraisalType:appraisalType
  }

  */
    if (userNotificationSettings.Appraisal) {
        if (userNotificationSettings.InstantEmail)
            console.log("Instant Email about appraisal sent.");
        if (userNotificationSettings.DailyEmail)
            console.log("Daily Email about appraisal queued.");
    }
}

//This registers the user for a notification
//registerForNotification
module.exports.GlobalRegisterForNotification = function GlobalRegisterForNotification(object)
{
  /*
  
    object consist of :
      user_id: string,
      thread_id: string,  //User or thread
      registeredTo: array //Actual value

      This is a bit tricky...
      If thread_id is a specific thread, then the user will receive notifications from the people inside registeredTo array. If 'All' is in registeredTo, then will receive if anyone posts inside that thread.
      If thread_id is 'root', then the user will receive all notifications from the people inside registeredTo array. If 'All' is in registeredTo, then the user will receive notitifications from everyone in every thread.

  
  */
    if (subscriptions != null) {
        //Too much code to test, function team's code works.
        console.log("User has been registered.");
    }
    else
    {
        console.log("User does not exist.");
    }
}

//This deregisters the user for a notification
//deregisterForNotification
module.exports.GlobalEditSubscription = function GlobalEditSubscription(object)
{
    /*

     object consist of :
     Type: 'Delete', //There's more functions, like to edit a notification registration, but delete is sufficient for now.
     user_id: string,
     thread_id: string //Thread ID


     //This is too difficult to mock, functional team's code work.


     */

    if (subscriptions != null)
    {

        console.log("User is deregistered");
    }
    else
    {
        console.log("Failed. User does not exist.");
    }
}

//This registers how and what emails the user will get
//registerNewUserNotificationSettings
module.exports.GlobalRegisterUserNotificationSettings = function GlobalRegisterUserNotificationSettings(object)
{
  /*
    
    object consist of :
        user_id: string,
        Deletion: boolean,
        Appraisal: boolean,
        InstantEmail: boolean,
        DailyEmail: boolean
  
  */
    if (object != null)
    {
        if (object.user_id != undefined && object.Deletion != undefined && object.Appraisal != undefined && object.InstantEmail != undefined && object.DailyEmail != undefined)
        {
            userNotificationSettings = object;
            console.log("User successfully registered for email notifications.");
        }
    }
}

//This changes how and what emails the user will get
//editUserNotificationSettings
module.exports.GlobalEditNotificationSettings = function GlobalEditNotificationSettings(object)
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

//This is to get all the db entries of notifications of posts that hasn't been read yet. For user specified.
module.exports.WebNotifs = function WebNotifs(object){
    /*

        object consist of :
            user_id: string

     */

        console.log("Returning all the notifications for user " + object.user_id);
}

//Starts service that sends daily emails at specified time.
//NOTE: This function is continues. Advised to run in seperate thread.
module.exports.DailyEmail = function DailyEmail(){
    var specificTime = {
        hour:12,
        minute:00
    }

    console.log("Starting service that will send all daily emails at H: " + specificTime.hour + " M: " + specificTime.minute);
}
