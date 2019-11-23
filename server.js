// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// =============================================================
var reservations = [];
var waitlist = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});
// Displays a single character, or returns false
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
})
// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  console.log(newReservation);
  reservations.push(newReservation);
  res.json(newReservation);
});

app.post("/api/waitlist", function (req, res) {
  var newReservation = req.body;
  console.log(newReservation);
  console.log(waitlist);
  waitlist.push(newReservation);
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});