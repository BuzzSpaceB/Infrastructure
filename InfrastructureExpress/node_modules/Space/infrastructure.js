// Load the http module to create an http server.
var http = require('http');
var space = require('./BuzzSpaceFinal');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  console.log("Request received");
    response.writeHead(200, {"Content-Type": "application/json"});
  
  var json = JSON.stringify(space);
  response.end(json);
});

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");