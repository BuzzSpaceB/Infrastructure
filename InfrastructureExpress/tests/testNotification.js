/*
Created by: Andreas du Preez
 */

var Notification = require("./Mock_Notification");


Notification.registerUserForNotifications("u12207871");


Notification.PostNotification("a1");


var deletion = {
    sendRequest: 'false',
    fromUserID: 'u12207871',
    toUserID: 'u123456789',
    reason: "Just because"
}
Notification.DeleteNotification(deletion);


var appraisal = {
    current_user_id: "u12207871",
    post_user_id: "u123456789",
    appraisedThread_id: "a1",
    appraisalType: "Awesome"
}
Notification.AppraisalNotification(appraisal);


var deregister = {
    user_id: "u12207871",
    type: "threads",  //User or thread
    value: "All" //Actual value
}
Notification.deregisterForNotification(deregister);


var register = {
    user_id: "u12207871",
    type: "threads",  //User or thread
    value: "a2" //Actual value
}
Notification.registerForNotification(register);


Notification.PostNotification("a2");


var object = {
    user_id: "u12207871",
    editWhat: "InstantEmail", //Deletion/Appraisal/DailyEmail/InstantEmail
    SetAs: true
}
Notification.editUserNotificationSettings(object);


Notification.PostNotification("a2");
