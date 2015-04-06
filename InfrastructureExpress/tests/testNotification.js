/*
 Created by: Andreas du Preez
 */

//NOTE: This isn't in the same order as in Mock_Notification.js

var Notification = require("../Mock_Notification");


var objectSettings = {
    user_id: "u12207871",
    Deletion: true,
    Appraisal: true,
    InstantEmail: false,
    DailyEmail: true
}
Notification.GlobalRegisterUserNotificationSettings(objectSettings);


Notification.StandardNotification("a1");


var deletion = {
    sendRequest: 'false',
    thread: 'a1',
    reason: "Just because"
}
Notification.deleteNotification(deletion);


var appraisal = {
    current_user_id: "u12204359",
    post_user_id: "u12207871",
    appraisedThread_id: "a1",
    appraisalType: "Awesome"
}
Notification.addAppraisalToDB(appraisal);


var deregister = {
    Type: 'Delete',
    user_id: "u12207871",
    thread_id: "a1"
}
Notification.GlobalEditSubscription(deregister);


var register = {
    user_id: "u12207871",
    thread_id: "root",
    registeredTo: ["All"]
}
Notification.GlobalRegisterForNotification(register);


Notification.StandardNotification("a2");


var object = {
    user_id: "u12207871",
    editWhat: "InstantEmail", //Deletion/Appraisal/DailyEmail/InstantEmail
    SetAs: true
}
Notification.GlobalEditNotificationSettings(object);


Notification.StandardNotification("a2");
