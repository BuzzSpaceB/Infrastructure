/**
 * Created by Andreas du Preez on 2015/04/05.
 */

module.exports.PostNotification = function StandardNotification(threadID)
{
  var object = {
    thread:threadID;
  }

  //Call a fucntion

  console.log("Post notification send.");
}

module.exports.DeleteNotification = function DeleteNotification(sendRequest,thread,reason)
{
  
  var object = {
    sendRequest: sendRequest;
    thread: thread;
    reason: reason;
  }
  
  //Call a fucntion
  
  console.log("Delete notification send.");
}

module.exports.AppraisalNotification = function AppraisalNotification(fromUserID,toUserID,threadID,appraisalType)
{
  
  var object = {
    current_user_id: fromUserID;
    post_user_id: toUserID;
    appraisedThread_id: threadID;
    appraisalType:appraisalType;
  }
  
  //Call a function
  
  console.log("Appraisal notification send.");
}

module.exports.registerForNotification = function registerForNotification(object)
{
  /*
  
    object consist of :
      user_id: string,
      thread_id: string,
      registeredTo: array //Array of users registered to, or 'All' for everything
  
  */
  
  //Call a function
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
  
  
  //Call a function
}

module.exports.editUserNotificationSettings = function editUserNotificationSettings(object)
{
  /*
    
    object consist of :
      editWhat: string, //Deletion/Appraisal/DailyEmail/InstanEmail
      user_id: string,
      SetAs: boolean
  
  */
  
  
  //Call a function
}
