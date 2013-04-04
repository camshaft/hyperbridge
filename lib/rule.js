/**
 * Module dependencies
 */
var Collection = require("./collection")
  , pathRegexp = require("path-to-regexp");

function Rule (rel, href) {
  this.rel = rel;
  this.href = href;
  this.regexp = pathRegexp(href);
  this.links = [];
  this.forms = [];
  this.collections = [];
}

Rule.prototype.link = function(rel, href) {
  var regexp;
  if(typeof href === "string") regexp = pathRegexp(href);
  this.links.push({rel: rel, href: href, regexp: regexp});
  return this;
};

Rule.prototype.form = function(rel, href, method, params) {
  var regexp;
  if(typeof href === "string") regexp = pathRegexp(href);
  this.forms.push({rel: rel, href: href, method: method, params: params, regexp: regexp});
  return this;
};

Rule.prototype.handle = function(handle) {
  this._handle = handle;
  return this;
};

Rule.prototype.collection = function(rel, href, lookup) {
  var collection = new Collection(rel, href, lookup);
  this.collections.push(collection);
  return collection;
};

module.exports = Rule;
