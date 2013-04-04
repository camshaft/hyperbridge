/**
 * Module dependencies
 */


module.exports = function(options) {
  return function(resource) {
    /**
     * Expose the options to the routes
     */
    resource.locals(options);

    /**
     * Common parameter middleware
     */
    resource.use(function(req, next) {
      req.set("Authorization", "Bearer "+options.accessToken);
      req.set("Accept", "application/json");
      next();
    });

    /**
     * Root
     */
    resource("root", "/")
      .link("people", "rel://people")
      .form("person", "rel://person", "GET", {
        personId: null
      })
      // This resource doesn't actually exist
      .handle(function(superagent, root, req, res) {
        res.send({});
      });

    /**
     * People
     */
    resource("people", "/people")
      .form("create", "rel://people", "POST", {
        name: null,
        nickname: null,
      })
      .collection("person", "rel://person", function(res) {return res.body})
        .each(function(person) { return {personId: person.id}; });

    resource("person", "/people/:personId")
      .link("avatar", function(res) {return res.body.avatarUrl})
      .form("update", "rel://person", "POST", {
        name: null,
        nickname: null
      })
      .form("delete", "rel://person", "DELETE");

    return resource;
  };
};
