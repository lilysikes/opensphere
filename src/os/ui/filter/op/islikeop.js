goog.provide('os.ui.filter.op.IsLike');

goog.require('goog.string');
goog.require('os.ui.filter.op.Op');
goog.require('os.ui.filter.string');
goog.require('os.xsd.DataType');



/**
 * A 'PropertyIsLike' operation class.
 *
 * @extends {os.ui.filter.op.Op}
 * @constructor
 */
os.ui.filter.op.IsLike = function() {
  os.ui.filter.op.IsLike.base(this, 'constructor',
      'PropertyIsLike', 'is like', 'like', [os.xsd.DataType.STRING],
      'wildCard="*" singleChar="." escape="\\"', 'e.g. abc*');
};
goog.inherits(os.ui.filter.op.IsLike, os.ui.filter.op.Op);


/**
 * @inheritDoc
 */
os.ui.filter.op.IsLike.prototype.getEvalExpression = function(varName, literal) {
  if (!goog.string.isEmptyOrWhitespace(goog.string.makeSafe(literal))) {
    // make the string safe for use in a RegExp
    var reStr = os.ui.filter.string.escapeRegExp(literal);

    // test the expression, case insensitive
    return '/^' + reStr + '$/im.test(' + varName + ')';
  }

  // null/empty string is not supported, so don't return an expression
  return '';
};
