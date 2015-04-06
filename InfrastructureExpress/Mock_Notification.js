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

var subscriptions = {
    user_id: null,
    threads: [],
    users: []
}

var userNotificationSettings = {
    user_id: null,
    Deletion: null,
    Appraisal: null,
    InstantEmail: null,
    DailyEmail: null
}

//*******************************************


//Should be called as soon as a new user registers.
module.exports.registerUserForNotifications = function registerUserForNotifications(userID)
{
    var objectSubscription = {
        user_id: userID,
        threads: ["All"],   //Default subscribed to all threads
        users: []         //Default subscribed to no one
    }

    subscriptions = objectSubscription;

    var objectSettings = {
        user_id: userID,
        Deletion: true,
        Appraisal: true,
        InstantEmail: false,
        DailyEmail: true
    }

    userNotificationSettings = objectSettings;

}

//This function notifies everyone that is subscribed to @Param1 (the thread ID), that there is a new Post.
module.exports.PostNotification = function StandardNotification(threadID)
{
  if (subscriptions != undefined)
  {
      if (subscriptions.user_id == userNotificationSettings.user_id)
      {
          if (subscriptions.threads.indexOf("All") > -1)
          {
              if (userNotificationSettings.InstantEmail)
                console.log("Instant Email about post sent.");
              if (userNotificationSettings.DailyEmail)
                console.log("Daily Email about post queued.");
          }
          else if (subscriptions.threads.indexOf(threadID) > -1)
          {
              if (userNotificationSettings.InstantEmail)
                  console.log("Instant Email about post sent.");
              if (userNotificationSettings.DailyEmail)
                  console.log("Daily Email about post queued.");
          }
          else
          {
              console.log("User not registered for notifications from " + threadID);
          }
      }
  }
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

    if (subscriptions != undefined)
    {
        if (subscriptions.user_id == userNotificationSettings.user_id)
        {
            if (subscriptions.threads.indexOf("All") > -1)
            {
                if (userNotificationSettings.InstantEmail)
                    console.log("Instant Email about deletion sent.");
                if (userNotificationSettings.Deletion)
                    console.log("Instant Email about deletion sent.");
                if (userNotificationSettings.DailyEmail)
                    console.log("Daily Email about deletion queued.");
            }
            else if (subscriptions.threads.indexOf(threadID) > -1)
            {
                if (userNotificationSettings.InstantEmail)
                    console.log("Instant Email about deletion sent.");
                if (userNotificationSettings.DailyEmail)
                    console.log("Daily Email about deletion queued.");
                if (userNotificationSettings.Deletion)
                    console.log("Instant Email about deletion sent.");
            }
        }
    }
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

    if (subscriptions != undefined)
    {
        if (subscriptions.user_id == userNotificationSettings.user_id)
        {
            if (subscriptions.threads.indexOf("All") > -1)
            {
                if (userNotificationSettings.InstantEmail)
                    console.log("Instant Email about appraisal sent.");
                if (userNotificationSettings.Appraisal)
                    console.log("Instant Email about appraisal sent.");
                if (userNotificationSettings.DailyEmail)
                    console.log("Daily Email about appraisal queued.");
            }
            else if (subscriptions.threads.indexOf(threadID) > -1)
            {
                if (userNotificationSettings.InstantEmail)
                    console.log("Instant Email about appraisal sent.");
                if (userNotificationSettings.DailyEmail)
                    console.log("Daily Email about appraisal queued.");
                if (userNotificationSettings.Appraisal)
                    console.log("Instant Email about appraisal sent.");
            }
            else
            {
                console.log("User not registered for notifications from " + threadID);
            }
        }
    }
}

//This registers the user for a notification
module.exports.registerForNotification = function registerForNotification(object)
{
  /*
  
    object consist of :
      user_id: string,
      type: string,  //User or thread
      value: string //Actual value
  
  */
    if (subscriptions != null) {
        if (subscriptions.user_id == object.user_id) {
            subscriptions[object.type].push(object.value);
            console.log("Successfully registered user to " + object.value);
        }
    }
    else
    {
        console.log("User does not exist.");
    }
}

//This deregisters the user for a notification
module.exports.deregisterForNotification = function deregisterForNotification(object)
{
    /*

     object consist of :
     user_id: string,
     type: string,  //User or thread
     value: string //Actual value

     */

    if (subscriptions != null)
    {
        if (subscriptions.user_id == object.user_id) {
            var index = subscriptions[object.type].indexOf(object.value);
            if (index > -1) {
                subscriptions[object.type].splice(index, 1);
                console.log("Successfully deregistered from " + object.value);
            }
        }
    }
    else
    {
        console.log("Failed. User does not exist.");
    }
}

//This registers how and what emails the user will get
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

//This changes how and what emails the user will get
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


