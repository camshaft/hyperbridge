/**
 * Module exports
 */
var express = require("express");

module.exports = function() {

  /**
   * Expose the app
   */
  var app = express();

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
  });

  /**
   * Fake in memory database
   */
  var db = {
    people: [{
      id: 0,
      name: "Cameron",
      nickname: "CamShaft"
    }]
  };

  /**
   * Routes
   */
  app.get("/people", function(req, res, next){
    res.send(db.people.filter(function(person) { return person }));
  });

  app.post("/people", function(req, res, next) {
    req.body.id = db.people.length;
    db.people.push(req.body);
    res.location("/people/"+req.body.id);
    res.send(201);
  });

  app.get("/people/:id", function(req, res, next) {
    res.send(db.people[req.params.id]);
  });

  app.put("/people/:id", function(req, res, next) {
    req.body.id = req.params.id;
    db.people[req.params.id] = req.body.id;
    res.send(204);
  });

  app.del("/people/:id", function(req, res, next) {
    db.people[req.params.id] = false;
    res.redirect("/people");
  });

  return app;
};
