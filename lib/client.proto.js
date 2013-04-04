/**
 * Module dependencies
 */
var superagent = require("superagent")
  , find = require("find")
  , url = require("url");

exports.getRoot = function(cb) {
  var req = this.request("root");
  req.end(cb);
}

exports.request = function (rel) {
  var self = this;

  var rule = find(self._resource.rules, {rel: rel});

  var req = {
    end: function(cb) {
      if(!rule) return cb(new Error(rel+" not found"));

      var res = {
        send: function (body) {
          cb(null, {
            body: body,
            links: rule.links,
            forms: rule.forms,
            follow: function (rel) {
              return self.request(rel);
            },
            submit: function(rel) {
              return new Control(rel, rule.forms, self.root.bind(self), self._resource);
            }
          });
        }
      }

      if(rule._handle) return rule._handle(superagent, self.root.bind(self), {}, res);

      superagent
        .get(self.root(rule.href))
        .end(function(err, res) {
          cb(err, {
            body: res.body,
            links: rule.links,
            forms: rule.forms,
            follow: function (rel) {
              return self.request(rel);
            },
            submit: function(rel) {
              return new Control(rel, rule.forms, self.root.bind(self), self._resource);
            }
          });
        });
    }
  }
  return req;
}

// TODO check if it has a slash at the beginning
exports.root = function () {
  var base = this._options.root || "";
  return base+Array.prototype.join.call(arguments,"/");
}

function Control(rel, forms, root, resource) {
  var form = this.form = find(forms, {rel: rel});

  var href = form.href
    , parsedHref = url.parse(href);

  if(parsedHref.protocol === "rel:") {
    var rule = find(resource.rules, {rel: parsedHref.host});
    href = rule.href;
  }

  this._request = superagent(form.method || "GET", root(href));
}

Control.prototype.set = function() {
  this._request.set.apply(this._request, arguments);
  return this;
};

Control.prototype.send = function() {
  this._request.send.apply(this._request, arguments);
  return this;
};

Control.prototype.end = function(cb) {
  this._request.end(function(err, res) {
    if(err) return cb(err);
    cb(err, {
      body: res.body
    })
  });
};
