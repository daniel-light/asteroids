"use strict";

function sum() {
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function(accum , el) {
    return accum + el;
  });
}

Function.prototype.myBind = function(obj) {
  var that = this;
  return function() {
    return that.apply(obj, arguments);
  }
};

var curriedSum = function (numArgs) {
  var numbers = [];
  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      console.log(numbers);
      return sum.apply({}, numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function(numArgs) {
  var numbers = [];
  var f = this;
  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      console.log(numbers);
      return f.apply({}, numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry2 = function(arg) {
  console.log(this);
  var obj = this.caller || {};
  var f = this;
  return function () {
    console.log(obj)
    return f.apply(obj, [arg].concat(arguments));
  }
}

Function.prototype.inherits = function(superclass) {
  var Surrogate = function() {}
  Surrogate.prototype = superclass.prototype;
  this.prototype = new Surrogate();
}