/**
 * Module dependencies
 */

function Collection (rel, href, lookup) {
  this.rel = rel;
  this.href = href;
  this.lookup = lookup;
  this.iterators = [];
}

Collection.prototype.each = function(iterator) {
  this.iterators.push(iterator);
  return this;
};

module.exports = Collection;
