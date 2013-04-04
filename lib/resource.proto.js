/**
 * Module dependencies
 */
var superagent = require("superagent")
  , Rule = require("./rule")
  , util = require("./util");

/**
 * Resource middleware
 */

exports.stack = [];

/**
 * Resource rules
 */

exports.rules = [];

/**
 * Expose locals
 */

exports.locals = util.locals({});

/**
 * Add a middleware function to the request
 */

exports.use = function(fn) {
  this.stack.push(fn);
};


exports.define = function(rel, href) {
  var rule = new Rule(rel, href);
  this.rules.push(rule);
  return rule;
}
