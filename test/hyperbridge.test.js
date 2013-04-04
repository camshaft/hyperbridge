var should = require("should")
  , hyperbridge = require("..")
  , resource = require("./fixtures/resource")
  , api = require("./fixtures/api");


describe("hyperbridge", function(){

  var client;

  before(function(done) {
    var app = api();
    var server = app.listen(0, function() {
      client = hyperbridge(resource({accessToken: "testing123"}), {
        root: "http://"+server.address().address+":"+server.address().port
      });
      done();
    });
  });
  
  describe("root", function(){

    var root;

    beforeEach(function(done) {
      client(function(err, rootResource) {
        if(err) return done(err);
        root = rootResource;
        should.exist(root.body);
        should.exist(root.links);
        should.exist(root.forms);
        done();
      });
    });

    describe("links", function(){
      it("should follow links", function(done) {
        root
          .follow("people")
          .end(function(err, people) {
            if(err) return done(err);
            should.exist(people.body);
            should.exist(people.links);
            should.exist(people.forms);
            done();
          });
      });

    });

    describe("forms", function(){
      it("should submit links", function(done) {
        root
          .follow("people")
          .end(function(err, people) {
            if(err) return done(err);

            people
              .submit("create")
              .send({name: "Tim", nickname: "timshadel"})
              .end(function(err, res) {
                if(err) return done(err);
                done();
              });
          });
      });

    });

  });
});
