/**
 * Module dependencies
 */
var util = require("./util")
  , proto = require("./resource.proto");

/**
 * Expose createResource
 */
module.exports = exports = createResource;

/**
 * Resource interface
 *
 * @param {Object} definition
 * @api public
 */
function createResource() {
  function resource() { return resource.define.apply(resource, arguments); };
  util.merge(resource, proto);
  return resource;
};
