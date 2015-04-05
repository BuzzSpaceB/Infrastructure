// Load the http module to create an http server.
var http = require('http');

var space = require('./BuzzSpace');
var notifications = require('./Notifications');
var authorization = require('./Authorization');
var csds = require('./CSDS');


console.log(space);
console.log(notifications);
console.log(authorization);
console.log(csds);

/*dummy function for the moment will fully implement once i have recieved all the resources i need*/
module.exports.Authlog= function LoginAuthentication(LoginRequest,client,LoginResult) {
    csds.Login(LoginRequest,client,LoginResult);
    authorization.addAuthorization();

}



var options = {
    from: 'DiscussionThree@gmail.com',
    to : "u13019695@tuks.co.za",
    subject: "New Notification",
    plain: "New Buzz Space Notification",
    html: '<b>Authorization added to User</b>'
}

var str = JSON.stringify(options);
notifications.sendMail(str);


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  console.log("Request received");
    response.writeHead(200, {"Content-Type": "application/json"});

  var space = {name: "FUN TIMES"}
  var json = JSON.stringify(space);
  response.end(json);
});

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");