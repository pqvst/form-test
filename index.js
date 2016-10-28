//Lets require/import the HTTP module
var http = require('http');
var fs = require("fs");

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(req, res) {
  var method = req.method;
  if (method == "GET") {
    return res.end(fs.readFileSync("./index.html", "utf8"));
  }

  var buffer = "";
  req.on("data", (chunk) => {
    buffer += chunk;
  }).on("end", () => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end([
      buffer.indexOf("------WebKitFormBoundary") == 0 ? "GOOD" : "BAD",
      JSON.stringify(req.headers, null, 2),
      buffer
    ].join("\r\n\r\n"), "utf8");
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});
