/**
 * Module dependencies
 */
var proto = require("./lib/client.proto")
  , util = require("./lib/util")
  , resource = require("./lib/resource");

/**
 * Expose createClient
 */
module.exports = exports = createClient;

/**
 * Client interface
 *
 * @param {Object} definition
 * @api public
 */
function createClient(definition, options) {
  function client() { return client.getRoot.apply(client, arguments); };
  util.merge(client, proto);
  client._resource = definition(resource());
  client._options = options;
  return client;
};
