/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");
window.Offcanvas = __webpack_require__(/*! bootstrap/js/dist/offcanvas */ "./node_modules/bootstrap/js/dist/offcanvas.js");

/***/ }),

/***/ "./resources/js/bbcode-preview.js":
/*!****************************************!*\
  !*** ./resources/js/bbcode-preview.js ***!
  \****************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var parser = window.parser;

/**
 * Cheap jquery replacement
 * @param type String
 * @param cls String | undefined
 * @param contents HTMLElement | undefined
 * @param cback function
 * @returns HTMLElement
 */
function el(type, cls) {
  var contents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var cback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var element = document.createElement(type);
  if (cls) element.className = cls;
  if (contents) element.append(contents);
  if (cback) cback(element);
  return element;
}

/**
 *
 * @param textarea HTMLTextAreaElement
 * @param template String
 * @param cursor String
 * @param cursor2 String
 * @param force_newline Boolean
 */
function insertIntoInput(textarea, template, cursor, cursor2, force_newline) {
  var val = textarea.value || '',
    st = textarea.selectionStart || 0,
    end = textarea.selectionEnd || 0,
    prev = val.substring(0, st),
    is_newline = prev.length === 0 || prev[prev.length] === '\n',
    before = force_newline === true && !is_newline ? prev + '\n' : prev,
    between = val.substring(st, end),
    curVal = between || cursor,
    after = val.substring(end),
    c1i = template.indexOf('CUR1'),
    c2i = template.indexOf('CUR2'),
    cur = template.replace('CUR1', curVal).replace('CUR2', cursor2);
  textarea.value = before + cur + after;
  textarea.focus();
  if (c2i < 0) c2i = Number.MAX_VALUE;
  var cstart = before.length + c1i + (c2i < c1i ? cursor2.length - 4 : 0),
    cend = cstart + curVal.length;
  if (between && c2i <= val.length) {
    cstart = before.length + c2i + (c2i > c1i ? between.length - 4 : 0);
    cend = cstart + cursor2.length;
  }
  textarea.setSelectionRange(cstart, cend);
  textarea.dispatchEvent(new Event('change', {
    bubbles: true
  }));
}
var buttons = [[{
  icon: 'bold',
  title: 'Bold text',
  template: '*CUR1*',
  cur1: 'bold text',
  cur2: ''
}, {
  icon: 'italic',
  title: 'Italic text',
  template: '/CUR1/',
  cur1: 'italic text',
  cur2: ''
}, {
  icon: 'underline',
  title: 'Underline text',
  template: '_CUR1_',
  cur1: 'underline text',
  cur2: ''
}, {
  icon: 'strikethrough',
  title: 'Strikethrough text',
  template: '~CUR1~',
  cur1: 'strikethrough text',
  cur2: ''
}, {
  icon: 'code',
  title: 'Code',
  template: '`CUR1`',
  cur1: 'code',
  cur2: ''
}, {
  icon: 'palette',
  title: 'Colour',
  template: '[color=CUR2]CUR1[/color]',
  cur1: 'text',
  cur2: 'red'
}], [{
  icon: 'header',
  text: '1',
  title: 'Header 1',
  template: '= CUR1',
  cur1: 'Header',
  cur2: ''
}, {
  icon: 'header',
  text: '2',
  title: 'Header 2',
  template: '== CUR1',
  cur1: 'Header',
  cur2: ''
}, {
  icon: 'header',
  text: '3',
  title: 'Header 3',
  template: '=== CUR1',
  cur1: 'Header',
  cur2: ''
}], [{
  icon: 'link',
  title: 'Link',
  template: '[CUR2|CUR1]',
  cur1: 'link text',
  cur2: 'http://example.com/'
}, {
  icon: 'image',
  title: 'Image',
  template: '[img:CUR2|CUR1]',
  cur1: 'caption text',
  cur2: 'http://example.com/image.jpg'
}, {
  icon: 'video-camera',
  title: 'Youtube',
  template: '[youtube:CUR2|CUR1]',
  cur1: 'caption text',
  cur2: 'youtube_id'
}, {
  icon: 'quote-right',
  title: 'Quote',
  template: '> CUR1',
  cur1: 'quoted text',
  cur2: '',
  force_newline: true
}], [{
  icon: 'list-ul',
  title: 'Unsorted List',
  template: '- CUR1',
  cur1: 'Item 1',
  cur2: '',
  force_newline: true
}, {
  icon: 'list-ol',
  title: 'Sorted List',
  template: '# CUR1',
  cur1: 'Item 1',
  cur2: '',
  force_newline: true
}]];
var smilies = [{
  img: 'icon_biggrin',
  code: ':D'
}, {
  img: 'icon_smile',
  code: ':)'
}, {
  img: 'dorky',
  code: ':geek:'
}, {
  img: 'sad0019',
  code: ':('
}, {
  img: 'icon_eek',
  code: ':-o'
}, {
  img: 'confused',
  code: ':confused:'
}, {
  img: 'icon_cool',
  code: '-)'
}, {
  img: 'kitty',
  code: 'k1tt3h:'
}, {
  img: 'laughing',
  code: ':lol:'
}, {
  img: 'leper',
  code: ':leper:'
}, {
  img: 'mad',
  code: ':mad:'
}, {
  img: 'tongue0010',
  code: ':p'
}, {
  img: 'icon_redface',
  code: ':oops:'
}, {
  img: 'icon_twisted',
  code: ':evil:'
}, {
  img: 'rolleye0011',
  code: ':roll:'
}, {
  img: 'shocked',
  code: ':scream:'
}, {
  img: 'icon_wink',
  code: '];)'
}, {
  img: 'dodgy',
  code: ':naughty:'
}, {
  img: 'heee',
  code: ':hee:'
}, {
  img: '44',
  code: '~o)'
}, {
  img: 'wcc',
  code: ':wcc:'
}, {
  img: 'smiley_sherlock',
  code: ':sherlock:'
}, {
  img: 'nag',
  code: ':nag:'
}, {
  img: 'rolling_eyes',
  code: ':rolling:'
}, {
  img: 'angryfire',
  code: ':flame:'
}, {
  img: 'character',
  code: ':ghost:'
}, {
  img: 'character0007',
  code: ':pirate:'
}, {
  img: 'indifferent0016',
  code: ':zzz:'
}, {
  img: 'indifferent0002',
  code: ':|'
}, {
  img: 'love0012',
  code: ':love:'
}, {
  img: 'rolleye0006',
  code: ':lookup:'
}, {
  img: 'sad0006',
  code: '];('
}, {
  img: 'scared0005',
  code: ':scared:'
}, {
  img: 'flail',
  code: ':flail:'
}, {
  img: 'emot-cowjump',
  code: ':cowjump:'
}, {
  img: 'emot-eng101',
  code: ':teach:'
}, {
  img: 'uncertain',
  code: ':uncertain:'
}, {
  img: '1sm071potstir',
  code: ':stirring:'
}, {
  img: 'thumbs_up',
  code: ':thumbsup:'
}, {
  img: 'happy_open',
  code: ':happy:'
}];
var more_smilies = [{
  img: 'sailor',
  code: ':sailor:'
}, {
  img: 'grenade',
  code: ':grenade:'
}, {
  img: 'popcorn',
  code: ':popcorn:'
}, {
  img: 'icon_cry',
  code: ':cry:'
}, {
  img: 'dead',
  code: ':dead:'
}, {
  img: 'pimp',
  code: ':pimp:'
}, {
  img: 'beerchug',
  code: ':beer:'
}, {
  img: 'chainsaw',
  code: ':chainsaw:'
}, {
  img: 'arse',
  code: ':moonie:'
}, {
  img: 'angel',
  code: ':angel:'
}, {
  img: 'bday',
  code: ':bday:'
}, {
  img: 'clap',
  code: ':clap:'
}, {
  img: 'computer',
  code: ':computer:'
}, {
  img: 'crash',
  code: ':pccrash:'
}, {
  img: 'dizzy',
  code: ':dizzy:'
}, {
  img: 'drink',
  code: ':drink:'
}, {
  img: 'facelick',
  code: ':lick:'
}, {
  img: 'frown',
  code: '>:('
}, {
  img: 'imwithstupid',
  code: ':imwithstupid:'
}, {
  img: 'jawdrop',
  code: ':jawdrop:'
}, {
  img: 'king',
  code: ':king:'
}, {
  img: 'ladysman',
  code: ':ladysman:'
}, {
  img: 'mrT',
  code: ':mrt:'
}, {
  img: 'nurse',
  code: ':nurse:'
}, {
  img: 'outtahere',
  code: ':outtahere:'
}, {
  img: 'aaatrigger',
  code: ':aaatrigger:'
}, {
  img: 'repuke',
  code: ':repuke:'
}, {
  img: 'rofl',
  code: ':rofl:'
}, {
  img: 'rolling',
  code: ':rolling2:'
}, {
  img: 'santa',
  code: ':santa:'
}, {
  img: 'smash',
  code: ':smash:'
}, {
  img: 'toilet',
  code: ':toilet:'
}, {
  img: 'wavey',
  code: ':wavey:'
}, {
  img: 'upyours',
  code: ':stfu:'
}, {
  img: 'fart',
  code: ':fart:'
}, {
  img: 'trout',
  code: ':trout:'
}, {
  img: 'ar15firing',
  code: ':machinegun:'
}, {
  img: 'microwave',
  code: ':microwave:'
}, {
  img: 'guillotine',
  code: ':guillotine:'
}, {
  img: 'poke',
  code: ':poke:'
}, {
  img: 'sniper',
  code: ':sniper:'
}, {
  img: 'monkee',
  code: ':monkee:'
}, {
  img: 'bandit',
  code: ':gringo:'
}, {
  img: 'wtf',
  code: ':wtf:'
}, {
  img: 'azelito',
  code: ':azelito:'
}, {
  img: 'crate',
  code: ':crate:'
}, {
  img: 'argh',
  code: ':-&amp;'
}, {
  img: 'swear',
  code: ':swear:'
}, {
  img: 'rocketwhore',
  code: ':launcher:'
}, {
  img: 'skull',
  code: ':skull:'
}, {
  img: 'munky',
  code: ':munky:'
}, {
  img: 'evilgrin',
  code: ':E'
}, {
  img: 'banghead',
  code: ':brickwall:'
}, {
  img: 'snark_topic_icon',
  code: ':snark:'
}];
function addButtons(container, textarea) {
  var toolbar = el('div', 'btn-toolbar d-none d-md-flex');
  container.append(toolbar);
  for (var j = 0; j < buttons.length; j++) {
    var group = el('div', 'btn-group btn-group-xs mr-2');
    toolbar.append(group);
    var a = buttons[j];
    var _loop = function _loop(i) {
      var btn = a[i];
      var b = el('button', 'btn btn-outline-dark btn-xs');
      b.setAttribute('title', btn.title);
      if (btn.icon) b.append(el('span', 'fa fa-' + btn.icon));
      if (btn.text) b.append(el('span', '', ' ' + btn.text));
      group.append(b);
      b.addEventListener('click', function (event) {
        insertIntoInput(textarea, btn.template, btn.cur1, btn.cur2, btn.force_newline);
        event.preventDefault();
      });
    };
    for (var i = 0; i < a.length; i++) {
      _loop(i);
    }
  }
}
function addSmilies(container, textarea) {
  var wrap = el('div', 'editor-smilies');
  container.append(wrap);
  wrap.append(el('h2', 'text-center mb-2', 'Smilies'));
  var sec = el('section', '');
  wrap.append(sec);
  var visDiv = el('div', '');
  sec.append(visDiv);
  for (var i = 0; i < smilies.length; i++) {
    var s = smilies[i];
    var img = document.createElement('img');
    img.src = window.urls.images.smiley_folder + '/' + s.img + '.gif';
    img.alt = s.code;
    var sma = document.createElement('a');
    sma.href = '#';
    sma.title = s.code;
    sma.append(img);
    visDiv.append(sma);
    sma.addEventListener('click', function (event) {
      event.preventDefault();
      insertIntoInput(textarea, ' ' + event.currentTarget.getAttribute('title') + ' CUR1', '', '');
    });
  }
  var moreLink = el('a', '', 'Show more', function (x) {
    return x.href = '#';
  });
  var moreLinkCon = el('div', 'more-link text-center', moreLink);
  sec.append(moreLinkCon);
  var moreDiv = el('div', 'd-none');
  sec.append(moreDiv);
  for (var _i = 0; _i < more_smilies.length; _i++) {
    var _s = more_smilies[_i];
    var _img = document.createElement('img');
    _img.src = window.urls.images.smiley_folder + '/' + _s.img + '.gif';
    _img.alt = _s.code;
    var _sma = document.createElement('a');
    _sma.href = '#';
    _sma.title = _s.code;
    _sma.append(_img);
    moreDiv.append(_sma);
    _sma.addEventListener('click', function (event) {
      event.preventDefault();
      insertIntoInput(textarea, ' ' + event.currentTarget.getAttribute('title') + ' CUR1', '', '');
    });
  }
  moreLink.addEventListener('click', function (event) {
    moreLink.textContent = moreDiv.classList.contains('d-none') ? 'Show less' : 'Show more';
    moreDiv.classList.toggle('d-none');
    event.preventDefault();
  });
}
window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.bbcode-input').forEach(function (input) {
    var group = el('div', 'form-group'),
      heading = el('div', 'mb-1 d-flex align-items-center', el('h4', 'me-auto', 'Message preview')),
      btn = el('button', 'btn btn-info btn-xs ms-2', 'Update Preview', function (x) {
        return x.type = 'button';
      }),
      card = el('div', 'card'),
      panel = el('div', 'card-body bbcode'),
      form = input.closest('form'),
      ta = input.querySelector('textarea'),
      name = ta.getAttribute('name'),
      help = el('a', 'float-end btn btn-outline-secondary mb-1', 'Formatting help', function (x) {
        x.target = '_blank';
        x.href = window.urls.formatting_help;
      }),
      btnCon = el('div', 'mb-1'),
      row = el('div', 'row'),
      colLeft = el('div', 'col-9'),
      colRight = el('div', 'col-3'),
      livePreviewInput = el('input', 'form-check-input', undefined, function (x) {
        x.type = 'checkbox';
      }),
      livePreviewLabel = el('label', 'form-check w-auto', 'Live preview');
    row.append(colLeft);
    row.append(colRight);
    colLeft.append.apply(colLeft, _toConsumableArray(input.children));
    input.append(row);
    livePreviewInput.checked = !document.cookie.split(';').some(function (x) {
      return x.includes('live_preview=no');
    });
    livePreviewLabel.prepend(livePreviewInput);
    heading.append(livePreviewLabel);
    heading.append(btn);
    card.append(panel);
    group.append(heading, card);
    colLeft.append(group);
    ta.parentElement.prepend(help);
    ta.before(btnCon);
    addButtons(btnCon, ta);
    addSmilies(colRight, ta);
    var refresh = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formData, result, data, event;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData(form);
                result = parser.ParseResult(formData.get(name));
                data = result.ToHtml(); // panel.innerText = 'Loading...';
                // const resp = await fetch(window.urls.api.format + '?field=' + name, {
                //     method: 'post',
                //     body: formData
                // });
                // const data = await resp.text();
                event = new CustomEvent('bbcode-preview-updating', {
                  detail: {
                    html: data,
                    element: panel
                  }
                });
                ta.dispatchEvent(event);
                _context.next = 7;
                return Promise.resolve(event.detail.html);
              case 7:
                panel.innerHTML = _context.sent;
                panel.querySelectorAll('pre code').forEach(function (x) {
                  hljs.highlightElement(x);
                });
                ta.dispatchEvent(new CustomEvent('bbcode-preview-updated', {
                  detail: {
                    element: panel
                  }
                }));
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function refresh() {
        return _ref.apply(this, arguments);
      };
    }();
    btn.addEventListener('click', refresh);
    var timeout = undefined;
    var liveRefresh = function liveRefresh() {
      clearTimeout(timeout);
      if (!livePreviewInput.checked) return;
      timeout = setTimeout(function () {
        refresh();
      }, 250);
    };
    input.addEventListener('input', liveRefresh);
    input.addEventListener('change', liveRefresh);
    livePreviewInput.addEventListener('change', function () {
      btn.classList.toggle('d-none', livePreviewInput.checked);
      document.cookie = "live_preview=".concat(livePreviewInput.checked ? 'yes' : 'no', "; expires=Fri, 31 Dec 9999 23:59:59 GMT;");
      liveRefresh();
    });
    refresh();
    btn.classList.toggle('d-none', livePreviewInput.checked);
  });
  document.addEventListener('paste', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
      var active, data, item, fileData, fileName, form, id, tempText, response, json, replace, text;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              active = document.activeElement;
              if (!(!active || !active.closest('.bbcode-input'))) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              data = event.clipboardData;
              if (!(!data.getData || data.items.length !== 1)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              item = data.items[0];
              fileData = item.getAsFile();
              if (!(!fileData || !(fileData instanceof File))) {
                _context2.next = 10;
                break;
              }
              return _context2.abrupt("return");
            case 10:
              _context2.t0 = item.type;
              _context2.next = _context2.t0 === "image/gif" ? 13 : _context2.t0 === "image/png" ? 15 : _context2.t0 === "image/jpeg" ? 17 : 19;
              break;
            case 13:
              fileName = "image.gif";
              return _context2.abrupt("break", 20);
            case 15:
              fileName = "image.png";
              return _context2.abrupt("break", 20);
            case 17:
              fileName = "image.jpg";
              return _context2.abrupt("break", 20);
            case 19:
              return _context2.abrupt("return");
            case 20:
              event.preventDefault();
              form = new FormData();
              form.append('image', fileData, fileName);
              id = Date.now();
              tempText = 'uploading image ' + id + '...';
              insertIntoInput(active, '[img:' + tempText + ']', '', '', true);
              _context2.next = 28;
              return fetch(window.urls.api.image_upload, {
                method: 'post',
                body: form
              });
            case 28:
              response = _context2.sent;
              _context2.next = 31;
              return response.json();
            case 31:
              json = _context2.sent;
              if (!response.ok) {
                replace = 'Error: ' + json.image[0];
              } else {
                replace = json.url;
              }
              text = active.value;
              if (text.indexOf(tempText) >= 0) {
                text = text.replace(tempText, replace);
              } else {
                text += '\n[img:' + replace + ']';
              }
              active.value = text;
            case 36:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  var replybox = document.querySelector('#reply textarea');
  if (replybox) {
    document.querySelectorAll('.quote-post').forEach(function (qp) {
      var id = parseInt(qp.getAttribute('data-post-id'), 10);
      if (!id) return;
      qp.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var resp, json, text;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetch(window.urls.api.get_post, {
                  method: 'post',
                  body: JSON.stringify({
                    id: id,
                    _token: document.head.querySelector('meta[name="csrf-token"]').content
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
              case 2:
                resp = _context3.sent;
                if (resp.ok) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return");
              case 5:
                _context3.next = 7;
                return resp.json();
              case 7:
                json = _context3.sent;
                text = "[quote=".concat(json.user.name, "]\n").concat(json.content_text, "\n[/quote]");
                insertIntoInput(replybox, text + '\n\nCUR1', '', '');
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    });
  }
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./parser */ "./resources/js/parser.js");
__webpack_require__(/*! ./bbcode-preview */ "./resources/js/bbcode-preview.js");
__webpack_require__(/*! ./image-cycler */ "./resources/js/image-cycler.js");
__webpack_require__(/*! ./images-form */ "./resources/js/images-form.js");
__webpack_require__(/*! ./embed */ "./resources/js/embed.js");
var hljs = __webpack_require__(/*! highlight.js/lib/core */ "./node_modules/highlight.js/lib/core.js");
hljs.registerLanguage('php', __webpack_require__(/*! highlight.js/lib/languages/php */ "./node_modules/highlight.js/lib/languages/php.js"));
hljs.registerLanguage('dos', __webpack_require__(/*! highlight.js/lib/languages/dos */ "./node_modules/highlight.js/lib/languages/dos.js"));
hljs.registerLanguage('css', __webpack_require__(/*! highlight.js/lib/languages/css */ "./node_modules/highlight.js/lib/languages/css.js"));
hljs.registerLanguage('cpp', __webpack_require__(/*! highlight.js/lib/languages/cpp */ "./node_modules/highlight.js/lib/languages/cpp.js"));
hljs.registerLanguage('csharp', __webpack_require__(/*! highlight.js/lib/languages/csharp */ "./node_modules/highlight.js/lib/languages/csharp.js"));
hljs.registerLanguage('ini', __webpack_require__(/*! highlight.js/lib/languages/ini */ "./node_modules/highlight.js/lib/languages/ini.js"));
hljs.registerLanguage('json', __webpack_require__(/*! highlight.js/lib/languages/json */ "./node_modules/highlight.js/lib/languages/json.js"));
hljs.registerLanguage('xml', __webpack_require__(/*! highlight.js/lib/languages/xml */ "./node_modules/highlight.js/lib/languages/xml.js"));
hljs.registerLanguage('angelscript', __webpack_require__(/*! highlight.js/lib/languages/angelscript */ "./node_modules/highlight.js/lib/languages/angelscript.js"));
hljs.registerLanguage('javascript', __webpack_require__(/*! highlight.js/lib/languages/javascript */ "./node_modules/highlight.js/lib/languages/javascript.js"));
hljs.highlightAll();
window.hljs = hljs;

/***/ }),

/***/ "./resources/js/embed.js":
/*!*******************************!*\
  !*** ./resources/js/embed.js ***!
  \*******************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Youtube
document.addEventListener('click', function (event) {
  var target = event.target;
  if (!target) return;
  var uninit = event.target.matches('.uninitialised') ? event.target : target.closest('.uninitialised');
  if (!uninit) return;
  var yt = uninit.closest('.video-content');
  if (!yt) return;
  var ytid = target.getAttribute('data-youtube-id');
  var url = 'https://www.youtube.com/embed/' + ytid + '?autoplay=1&rel=0';
  var frame = document.createElement('iframe');
  frame.setAttribute('src', url);
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('allowfullscreen', '');
  frame.classList.add('caption-body');
  target.replaceWith(frame);
});

// Articles & Maps
function esc(text) {
  var e = document.createElement('div');
  e.textContent = text;
  return e.innerHTML;
}
function attr_esc(text) {
  text = (text || '').toString();
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
var embed_callbacks = {
  error: function error(element, json) {
    var template = "<div class=\"text-center\">\n            <h2><span class=\"fa fa-warning\"></span> Error: Unable to load ".concat(json.type, ".</h2>\n        </div>");
    console.log(template);
    var embed = document.createElement('div');
    embed.innerHTML = template;
    element.replaceWith(embed.children[0]);
  },
  article: function article(element, json) {
    var thread_link = json.forum_thread_id ? "<li><a href=\"".concat(attr_esc(window.urls.view.thread.replace('{id}', json.forum_thread_id)), "\">Discussion topic &raquo;</a></li>") : '';
    var template = "\n            <div class=\"row\">\n                <div class=\"col-3 text-center\">\n                    <img class=\"img-fluid\" src=\"".concat(attr_esc(window.urls.images.root)).concat(attr_esc(json.current_version.thumbnail_file || 'images/no_image.png'), "\" alt=\"Article thumbnail\" />\n                </div>\n                <div class=\"col-6\">\n                    <h2>\n                        <a href=\"").concat(attr_esc(window.urls.view.article.replace('{slug}', json.current_version.slug)), "\">").concat(esc(json.current_version.title), "</a>\n                    </h2>\n                    <div class=\"bbcode\">").concat(esc(json.current_version.description), "</div>\n                </div>\n                <div class=\"col-3\">\n                    <ul class=\"list-unstyled\">\n                        <li>by <a href=\"").concat(attr_esc(window.urls.view.user.replace('{id}', json.user_id)), "\">").concat(json.user.name, "</a></li>\n                        <li>in <a href=\"").concat(attr_esc(window.urls.list.article), "?game=").concat(attr_esc(json.game_id), "&cat=").concat(attr_esc(json.article_category_id), "\">").concat(esc(json.game.name), " &raquo; ").concat(esc(json.category.name), "</a></li>\n                        <li>updated ").concat(esc(new Date(json.created_at).toLocaleDateString()), "</li>\n                        <li>viewed ").concat(esc(json.stat_views), " time").concat(json.stat_views == 1 ? '' : 's', "</li>\n                        ").concat(thread_link, "\n                    </ul>\n                </div>\n            </div>\n        ").trim();
    var embed = document.createElement('div');
    embed.innerHTML = template;
    element.replaceWith(embed.children[0]);
  },
  download: function download(element, json) {
    var mirrors = json.mirror_list.map(function (x) {
      return "<li class=\"mb-1\"><a target=\"_blank\" href=\"".concat(attr_esc(x.url), "\" class=\"btn btn-primary\">").concat(esc(x.text), "</a></li>");
    }).join('');
    var size = json.file_size_readable ? "<li>Size: ".concat(json.file_size_readable, "</li>") : '';
    var template = "\n            <div class=\"row\">\n                <div class=\"col-3 text-center\">\n                    <img class=\"img-fluid\" src=\"".concat(attr_esc(window.urls.images.root)).concat(attr_esc(json.image_file || 'images/no_image.png'), "\" alt=\"Article thumbnail\" />\n                </div>\n                <div class=\"col-6\">\n                    <h2>\n                        <a href=\"").concat(attr_esc(window.urls.view.download.replace('{id}', json.id)), "\">").concat(esc(json.name), "</a>\n                    </h2>\n                    <div class=\"bbcode\">").concat(json.content_html, "</div>\n                </div>\n                <div class=\"col-3\">\n                    <ul class=\"list-unstyled\">\n                        ").concat(mirrors, "\n                        ").concat(size, "\n                        <li>by <a href=\"").concat(attr_esc(window.urls.view.user.replace('{id}', json.user_id)), "\">").concat(esc(json.user.name), "</a></li>\n                        <li>in <a href=\"").concat(attr_esc(window.urls.list.download), "?game=").concat(attr_esc(json.game_id), "&cat=").concat(attr_esc(json.download_category_id), "\">").concat(esc(json.game.name), " &raquo; ").concat(esc(json.category.name), "</a></li>\n                        <li>updated ").concat(esc(new Date(json.created_at).toLocaleDateString()), "</li>\n                        <li>downloaded ").concat(esc(json.stat_downloads), " time").concat(json.stat_downloads == 1 ? '' : 's', "</li>\n                        <li><a href=\"").concat(attr_esc(window.urls.view.thread.replace('{id}', json.thread_id)), "\">Discussion topic &raquo;</a></li>\n                    </ul>\n                </div>\n            </div>\n        ").trim();
    var embed = document.createElement('div');
    embed.innerHTML = template;
    element.replaceWith(embed.children[0]);
  },
  map: function map(element, json) {
    var images = json.images.length ? json.images.map(function (x, i) {
      return "<img class=\"img-fluid ".concat(i == 0 ? '' : 'd-none', "\" src=\"").concat(attr_esc(window.urls.images.root + x.image_file), "\" />");
    }).join('') : "<img class=\"img-fluid\" src=\"".concat(attr_esc(window.urls.images.no_image), "\" />");
    var template = "\n            <div>\n                <h1 class=\"d-flex align-items-start\">\n                    <a href=\"".concat(attr_esc(window.urls.list.map), "?game=").concat(attr_esc(json.game_id), "\">\n                        <img src=\"").concat(attr_esc(window.urls.images.root + 'images/games/' + json.game_id + '.png'), "\" alt=\"").concat(json.game.name, "\" />\n                    </a>\n                    <span class=\"flex-fill\">\n                        <a href=\"").concat(attr_esc(window.urls.view.map.replace('{id}', json.id)), "\">\n                            ").concat(esc(json.name), "\n                        </a>\n                        by\n                        <a href=\"").concat(attr_esc(window.urls.view.user.replace('{id}', json.user_id)), "\">\n                            ").concat(esc(json.user.name), "\n                        </a>\n                    </span>\n                    <span class=\"game-image-filler\"></span>\n                </h1>\n                <div class=\"image-cycler m-auto\">\n                    ").concat(images, "\n                    <span class=\"controls\"></span>\n                </div>\n            </div>\n        ").trim();
    var embed = document.createElement('div');
    embed.innerHTML = template;
    element.replaceWith(embed.children[0]);
  }
};
var embed_cache = {};
function load_embed(_x) {
  return _load_embed.apply(this, arguments);
}
function _load_embed() {
  _load_embed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(el) {
    var par, typ, id, url, json, cacheKey, resp;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            el.textContent = 'Loading...';
            par = el.parentElement;
            typ = el.getAttribute('data-embed-type');
            id = el.getAttribute('data-' + typ + '-id');
            url = window.urls.embed[typ];
            if (!el.getAttribute('data-stop')) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return");
          case 7:
            el.setAttribute('data-stop', 'true');
            observer.unobserve(el);
            cacheKey = "".concat(typ, ":").concat(id);
            if (!embed_cache[cacheKey]) {
              _context.next = 14;
              break;
            }
            json = embed_cache[cacheKey];
            _context.next = 27;
            break;
          case 14:
            _context.next = 16;
            return fetch(url, {
              method: 'post',
              body: JSON.stringify({
                id: id
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          case 16:
            resp = _context.sent;
            if (!resp.ok) {
              _context.next = 24;
              break;
            }
            _context.next = 20;
            return resp.json();
          case 20:
            json = _context.sent;
            embed_cache[cacheKey] = json;
            _context.next = 27;
            break;
          case 24:
            json = {
              resp: resp,
              type: typ
            };
            embed_cache[cacheKey] = json;
            typ = 'error';
          case 27:
            embed_callbacks[typ].call(window, el, json);
            init_all_image_cyclers(document);
          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _load_embed.apply(this, arguments);
}
var observer = new IntersectionObserver(function (entries, options) {
  entries.forEach(function (x) {
    if (!x.isIntersecting) return;
    load_embed(x.target);
  });
}, {
  threshold: 0.1
});
function addEmbedInit(el) {
  el.querySelectorAll('.embed-content .uninitialised').forEach(function (x) {
    observer.observe(x);
  });
}
document.querySelectorAll('.bbcode-input textarea').forEach(function (x) {
  x.addEventListener('bbcode-preview-updated', function (event) {
    addEmbedInit(event.detail.element);
  });
});
addEmbedInit(document);

/***/ }),

/***/ "./resources/js/image-cycler.js":
/*!**************************************!*\
  !*** ./resources/js/image-cycler.js ***!
  \**************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  init_all_image_cyclers(document);
});
window.init_all_image_cyclers = function (element) {
  element.querySelectorAll('.image-cycler').forEach(function (x) {
    init_image_cycler(x);
  });
};
function init_image_cycler(element) {
  if (element.getAttribute('data-stop')) return;
  element.setAttribute('data-stop', 'true');
  var images = Array.from(element.querySelectorAll('img'));
  var controls = element.querySelector('.controls');
  if (images.length <= 1 || !controls) return;
  var numImages = images.length;
  var curImage = 0;
  var prev = document.createElement('a');
  prev.href = "#";
  prev.innerHTML = '<span class="fas fa-chevron-left"></span>';
  var next = document.createElement('a');
  next.href = "#";
  next.innerHTML = '<span class="fas fa-chevron-right"></span>';
  var label = document.createElement('span');
  label.textContent = "".concat(curImage + 1, " / ").concat(numImages);
  var cycle = function cycle(num) {
    images[curImage].classList.add('d-none');
    curImage += num;
    while (curImage < 0) {
      curImage += numImages;
    }
    curImage = curImage % numImages;
    label.textContent = "".concat(curImage + 1, " / ").concat(numImages);
    images[curImage].classList.remove('d-none');
  };
  prev.addEventListener('click', function (event) {
    event.preventDefault();
    cycle(-1);
  });
  next.addEventListener('click', function (event) {
    event.preventDefault();
    cycle(+1);
  });
  controls.append(prev, label, next);
  if (element.classList.contains('image-cycler-clickable')) {
    var containers = Array.from(element.parentElement.children);
    element.addEventListener('click', function (event) {
      if (event.target && ('' + event.target.tagName).toUpperCase() == 'IMG') {
        containers.forEach(function (c) {
          c.classList.toggle('col-md-12');
          c.classList.toggle('enlarged');
        });
      }
    });
  }
}

/***/ }),

/***/ "./resources/js/images-form.js":
/*!*************************************!*\
  !*** ./resources/js/images-form.js ***!
  \*************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.images-form-container').forEach(function (form) {
    var btn = form.querySelector('button');
    if (!btn) return;
    var max_images = parseInt(form.getAttribute('data-max-images'), 10) || 9;
    var before = btn.closest('.text-center');

    // Set the event listeners for any existing remove buttons
    form.querySelectorAll('a').forEach(function (remove) {
      var div = remove.parentElement;
      remove.addEventListener('click', function (e) {
        e.preventDefault();
        div.remove();
        updateButtonVisibility();
      });
    });

    // Button visibility to limit maximum number of images to 10 (mandatory first image + 9 optional additional images)
    var updateButtonVisibility = function updateButtonVisibility() {
      var num = form.querySelectorAll('input').length;
      before.classList.toggle('d-none', num >= max_images);
    };
    updateButtonVisibility();

    // When the button is clicked add a new input for an image
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      var num = form.querySelectorAll('input').length;
      if (num >= max_images) return; // max. 10 images

      var div = document.createElement('div');
      var input = document.createElement('input');
      var remove = document.createElement('a');
      div.classList.add('d-flex', 'flex-row');
      input.classList.add('flex-fill', 'my-1');
      input.type = 'file';
      input.name = 'images[]';
      input.accept = '.jpg,.jpeg';
      remove.classList.add('align-self-center', 'px-2');
      remove.href = '#';
      remove.innerHTML = '<span class="fas fa-times"></span>';
      remove.addEventListener('click', function (e) {
        e.preventDefault();
        div.remove();
        updateButtonVisibility();
      });
      div.append(input, remove);
      form.insertBefore(div, before);
      updateButtonVisibility();
    });
  });
});

/***/ }),

/***/ "./resources/js/parser.js":
/*!********************************!*\
  !*** ./resources/js/parser.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var wcp = __webpack_require__(/*! @logicandtrick/twhl-wikicode-parser */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/index.js");
var ArticleEmbedTag = /*#__PURE__*/function (_wcp$Tags$Tag) {
  _inherits(ArticleEmbedTag, _wcp$Tags$Tag);
  var _super = _createSuper(ArticleEmbedTag);
  function ArticleEmbedTag() {
    _classCallCheck(this, ArticleEmbedTag);
    return _super.call(this, 'athumb');
  }
  _createClass(ArticleEmbedTag, [{
    key: "FormatResult",
    value: function FormatResult(parser, data, state, scope, options, text) {
      var id = parseInt(text, 10);
      if (!id) return null;
      var before = '<div class="embedded article">' + '<div class="embed-container">' + '<div class="embed-content">' + '<div class="uninitialised" data-embed-type="article" data-article-id="' + id + '">Loading embedded content: Article #' + id + '</div>' + '</div>' + '</div>' + '</div>';
      var content = wcp.Nodes.PlainTextNode.Empty();
      var after = "\n";
      var ret = new wcp.Nodes.HtmlNode(before, content, after);
      ret.plainAfter = 'Article: ' + window.urls.view.article.replace('{slug}', id) + "\n";
      ret.isBlockNode = true;
      return ret;
    }
  }]);
  return ArticleEmbedTag;
}(wcp.Tags.Tag);
var DownloadEmbedTag = /*#__PURE__*/function (_wcp$Tags$Tag2) {
  _inherits(DownloadEmbedTag, _wcp$Tags$Tag2);
  var _super2 = _createSuper(DownloadEmbedTag);
  function DownloadEmbedTag() {
    _classCallCheck(this, DownloadEmbedTag);
    return _super2.call(this, 'dlthumb');
  }
  _createClass(DownloadEmbedTag, [{
    key: "FormatResult",
    value: function FormatResult(parser, data, state, scope, options, text) {
      var id = parseInt(text, 10);
      if (!id) return null;
      var before = '<div class="embedded download">' + '<div class="embed-container">' + '<div class="embed-content">' + '<div class="uninitialised" data-embed-type="download" data-download-id="' + id + '">Loading embedded content: Download #' + id + '</div>' + '</div>' + '</div>' + '</div>';
      var content = wcp.Nodes.PlainTextNode.Empty();
      var after = "\n";
      var ret = new wcp.Nodes.HtmlNode(before, content, after);
      ret.plainAfter = 'Download: ' + window.urls.view.download.replace('{id}', id) + "\n";
      ret.isBlockNode = true;
      return ret;
    }
  }]);
  return DownloadEmbedTag;
}(wcp.Tags.Tag);
var MapEmbedTag = /*#__PURE__*/function (_wcp$Tags$Tag3) {
  _inherits(MapEmbedTag, _wcp$Tags$Tag3);
  var _super3 = _createSuper(MapEmbedTag);
  function MapEmbedTag() {
    _classCallCheck(this, MapEmbedTag);
    return _super3.call(this, 'mthumb');
  }
  _createClass(MapEmbedTag, [{
    key: "FormatResult",
    value: function FormatResult(parser, data, state, scope, options, text) {
      var id = parseInt(text, 10);
      if (!id) return null;
      var before = '<div class="embedded map">' + '<div class="embed-container">' + '<div class="embed-content">' + '<div class="uninitialised" data-embed-type="map" data-map-id="' + id + '">Loading embedded content: Map #' + id + '</div>' + '</div>' + '</div>' + '</div>';
      var content = wcp.Nodes.PlainTextNode.Empty();
      var after = "\n";
      var ret = new wcp.Nodes.HtmlNode(before, content, after);
      ret.plainAfter = 'Map: ' + window.urls.view.map.replace('{id}', id) + "\n";
      ret.isBlockNode = true;
      return ret;
    }
  }]);
  return MapEmbedTag;
}(wcp.Tags.Tag);
var config = wcp.ParserConfiguration.Snarkpit();
config.Processors.forEach(function (x) {
  if (x.constructor.name == 'SmiliesProcessor') {
    x.UrlFormatString = window.urls.images.smiley_folder + '/{0}.gif';
  }
});
config.Tags.push(new ArticleEmbedTag());
config.Tags.push(new DownloadEmbedTag());
config.Tags.push(new MapEmbedTag());
window.parser = new wcp.Parser(config);

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/base-component.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/base-component.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./dom/data */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./util/config */ "./node_modules/bootstrap/js/dist/util/config.js")) :
  0;
})(this, (function (Data, index, EventHandler, Config) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const VERSION = '5.2.3';
  /**
   * Class definition
   */

  class BaseComponent extends Config__default.default {
    constructor(element, config) {
      super();
      element = index.getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      this._config = this._getConfig(config);
      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
    } // Public


    dispose() {
      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      index.executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    } // Static


    static getInstance(element) {
      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }

  }

  return BaseComponent;

}));
//# sourceMappingURL=base-component.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/data.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/data.js ***!
  \****************************************************/
/***/ (function(module) {

/*!
  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */
  const elementMap = new Map();
  const data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  return data;

}));
//# sourceMappingURL=data.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/event-handler.js":
/*!*************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/event-handler.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../util/index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (index) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }

          hydrateObj(event, {
            delegateTarget: target
          });

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    };
  }

  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }

  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }

        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }

      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }

      for (const keyHandlers of Object.keys(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = index.getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      let evt = new Event(event, {
        bubbles,
        cancelable: true
      });
      evt = hydrateObj(evt, args);

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,

          get() {
            return value;
          }

        });
      }
    }

    return obj;
  }

  return EventHandler;

}));
//# sourceMappingURL=event-handler.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/manipulator.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/manipulator.js ***!
  \***********************************************************/
/***/ (function(module) {

/*!
  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (value === Number(value).toString()) {
      return Number(value);
    }

    if (value === '' || value === 'null') {
      return null;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }

      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }

  };

  return Manipulator;

}));
//# sourceMappingURL=manipulator.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/selector-engine.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/selector-engine.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../util/index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (index) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);

      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
    }

  };

  return SelectorEngine;

}));
//# sourceMappingURL=selector-engine.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/offcanvas.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/offcanvas.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./util/scrollbar */ "./node_modules/bootstrap/js/dist/util/scrollbar.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js"), __webpack_require__(/*! ./dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./util/backdrop */ "./node_modules/bootstrap/js/dist/util/backdrop.js"), __webpack_require__(/*! ./util/focustrap */ "./node_modules/bootstrap/js/dist/util/focustrap.js"), __webpack_require__(/*! ./util/component-functions */ "./node_modules/bootstrap/js/dist/util/component-functions.js")) :
  0;
})(this, (function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'offcanvas';
  const DATA_KEY = 'bs.offcanvas';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_RESIZE = `resize${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
  const Default = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent__default.default {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper__default.default().hide();
      }

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOWING);

      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }

        this._element.classList.add(CLASS_NAME_SHOW);

        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
          relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.add(CLASS_NAME_HIDING);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        if (!this._config.scroll) {
          new ScrollBarHelper__default.default().reset();
        }

        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private


    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      }; // 'static' option will be translated to true, and booleans will keep their value


      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop__default.default({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap__default.default({
        trapElement: this._element
      });
    }

    _addEventListeners() {
      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }

        if (!this._config.keyboard) {
          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }

        this.hide();
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    const target = index.getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (index.isDisabled(this)) {
      return;
    }

    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
      // focus on trigger when it is closed
      if (index.isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  componentFunctions.enableDismissTrigger(Offcanvas);
  /**
   * jQuery
   */

  index.defineJQueryPlugin(Offcanvas);

  return Offcanvas;

}));
//# sourceMappingURL=offcanvas.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/backdrop.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/backdrop.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./config */ "./node_modules/bootstrap/js/dist/util/config.js")) :
  0;
})(this, (function (EventHandler, index, Config) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'backdrop';
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
  const Default = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements

  };
  const DefaultType = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };
  /**
   * Class definition
   */

  class Backdrop extends Config__default.default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    show(callback) {
      if (!this._config.isVisible) {
        index.execute(callback);
        return;
      }

      this._append();

      const element = this._getElement();

      if (this._config.isAnimated) {
        index.reflow(element);
      }

      element.classList.add(CLASS_NAME_SHOW);

      this._emulateAnimation(() => {
        index.execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        index.execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW);

      this._emulateAnimation(() => {
        this.dispose();
        index.execute(callback);
      });
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = index.getElement(config.rootElement);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      const element = this._getElement();

      this._config.rootElement.append(element);

      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
        index.execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    _emulateAnimation(callback) {
      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  return Backdrop;

}));
//# sourceMappingURL=backdrop.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/component-functions.js":
/*!********************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/component-functions.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*!
  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! ../dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (exports, EventHandler, index) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (index.isDisabled(this)) {
        return;
      }

      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  exports.enableDismissTrigger = enableDismissTrigger;

  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=component-functions.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/config.js":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/config.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ../dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js")) :
  0;
})(this, (function (index, Manipulator) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }

    static get DefaultType() {
      return {};
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      return config;
    }

    _mergeConfigObj(config, element) {
      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

      return { ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }

    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = index.isElement(value) ? 'element' : index.toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }

  }

  return Config;

}));
//# sourceMappingURL=config.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/focustrap.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/focustrap.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ../dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./config */ "./node_modules/bootstrap/js/dist/util/config.js")) :
  0;
})(this, (function (EventHandler, SelectorEngine, Config) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'focustrap';
  const DATA_KEY = 'bs.focustrap';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of

  };
  const DefaultType = {
    autofocus: 'boolean',
    trapElement: 'element'
  };
  /**
   * Class definition
   */

  class FocusTrap extends Config__default.default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    activate() {
      if (this._isActive) {
        return;
      }

      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }

      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler__default.default.off(document, EVENT_KEY);
    } // Private


    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;

      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }

      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

  }

  return FocusTrap;

}));
//# sourceMappingURL=focustrap.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/index.js":
/*!******************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*!
  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }

    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * Public Util API
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }

      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }

    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }

    return typeof object.nodeType !== 'undefined';
  };

  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }

    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(object);
    }

    return null;
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest('details:not([open])');

    if (!closedDetails) {
      return elementIsVisible;
    }

    if (closedDetails !== element) {
      const summary = element.closest('summary');

      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }

      if (summary === null) {
        return false;
      }
    }

    return elementIsVisible;
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  exports.defineJQueryPlugin = defineJQueryPlugin;
  exports.execute = execute;
  exports.executeAfterTransition = executeAfterTransition;
  exports.findShadowRoot = findShadowRoot;
  exports.getElement = getElement;
  exports.getElementFromSelector = getElementFromSelector;
  exports.getNextActiveElement = getNextActiveElement;
  exports.getSelectorFromElement = getSelectorFromElement;
  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
  exports.getUID = getUID;
  exports.getjQuery = getjQuery;
  exports.isDisabled = isDisabled;
  exports.isElement = isElement;
  exports.isRTL = isRTL;
  exports.isVisible = isVisible;
  exports.noop = noop;
  exports.onDOMContentLoaded = onDOMContentLoaded;
  exports.reflow = reflow;
  exports.toType = toType;
  exports.triggerTransitionEnd = triggerTransitionEnd;

  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/scrollbar.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/scrollbar.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ../dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (SelectorEngine, Manipulator, index) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.3): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';
  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    } // Public


    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }

    isOverflowing() {
      return this.getWidth() > 0;
    } // Private


    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProperty);

        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);

      if (actualValue) {
        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }

        Manipulator__default.default.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (index.isElement(selector)) {
        callBack(selector);
        return;
      }

      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
        callBack(sel);
      }
    }

  }

  return ScrollBarHelper;

}));
//# sourceMappingURL=scrollbar.js.map


/***/ }),

/***/ "./resources/css/app.scss":
/*!********************************!*\
  !*** ./resources/css/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Colours.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Colours.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Colours = void 0;
class Colours {
    static IsValidColor(text) {
        if (/^#(?:[0-9A-F]{3}){1,2}$/i.test(text))
            return true;
        return Colours.ColorNames.includes(text.toLowerCase());
    }
}
exports.Colours = Colours;
Colours.ColorNames = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
    'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
    'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
    'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
    'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
    'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow',
    'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
    'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
    'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
    'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
    'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
    'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
    'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive',
    'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise',
    'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red',
    'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
    'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan',
    'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
];
//# sourceMappingURL=Colours.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Element = void 0;
class Element {
    constructor() {
        this.Priority = 0;
    }
    InScope(scope) {
        return scope == null || scope.trim() == '' || this.Scopes.includes(scope);
    }
}
exports.Element = Element;
//# sourceMappingURL=Element.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdCodeElement.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdCodeElement.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdCodeElement = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
const PreElement_1 = __webpack_require__(/*! ./PreElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/PreElement.js");
class MdCodeElement extends Element_1.Element {
    constructor() {
        super();
        this.Priority = 10;
    }
    Matches(lines) {
        const value = lines.Value();
        return value.startsWith('```');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Consume(parser, data, lines, _scope) {
        const current = lines.Current();
        let firstLine = lines.Value().substring(3).trimEnd();
        let lang = null;
        if (PreElement_1.PreElement.AllowedLanguages.includes(firstLine.toLowerCase())) {
            lang = firstLine;
            firstLine = '';
        }
        let arr = [firstLine];
        let found = false;
        while (lines.Next()) {
            const value = lines.Value().trimEnd();
            if (value.endsWith('```')) {
                const lastLine = value.substring(0, value.length - 3);
                arr.push(lastLine);
                found = true;
                break;
            }
            else {
                arr.push(value);
            }
        }
        if (!found) {
            lines.SetCurrent(current);
            return null;
        }
        // Trim blank lines from the start and end of the array
        for (let i = 0; i < 2; i++) {
            while (arr.length > 0 && arr[0].trim() == '')
                arr.splice(0, 1);
            arr.reverse();
        }
        // Replace all tabs with 4 spaces
        arr = arr.map(x => x.replace(/\t/g, '    '));
        // Find the longest common whitespace amongst all lines (ignore blank lines)
        const longestWhitespace = arr.reduce((c, i) => {
            if (i.trim().length == 0)
                return c;
            const wht = i.length - i.trimStart().length;
            return Math.min(wht, c);
        }, 9999);
        // Dedent all lines by the longest common whitespace
        arr = arr.map(a => a.substring(Math.min(longestWhitespace, a.length)));
        const plain = new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(arr.join('\n'));
        const cls = !lang || lang.trim() == '' ? '' : ` class="lang-${lang}"`;
        const before = `<pre${cls}><code>`;
        const after = '</code></pre>';
        return new HtmlNode_1.HtmlNode(before, plain, after);
    }
}
exports.MdCodeElement = MdCodeElement;
//# sourceMappingURL=MdCodeElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdColumnsElement.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdColumnsElement.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdColumnsElement = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class ColumnNode {
    constructor(width, content) {
        this.Width = width;
        this.Content = content;
    }
    ToHtml() {
        return `<div class="col-md-${this.Width}">\n${this.Content.ToHtml()}</div>\n`;
    }
    ToPlainText() {
        return this.Content.ToPlainText() + '\n\n';
    }
    GetChildren() {
        return [this.Content];
    }
    ReplaceChild(i, node) {
        if (i != 0)
            throw new Error('Argument out of range');
        this.Content = node;
    }
    HasContent() {
        return true;
    }
}
class MdColumnsElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value();
        return value.startsWith('%%columns=');
    }
    Consume(parser, data, lines, scope) {
        const current = lines.Current();
        const meta = lines.Value().substring(10);
        const colDefs = meta.split(':').map(x => { var _a; return (_a = parseInt(x, 10)) !== null && _a !== void 0 ? _a : 0; });
        let total = 0;
        for (const d of colDefs) {
            if (d > 0) {
                total += d;
            }
            else {
                lines.SetCurrent(current);
                return null;
            }
        }
        if (total != 12) {
            lines.SetCurrent(current);
            return null;
        }
        let i = 0;
        let arr = [];
        const cols = [];
        while (lines.Next() && i < colDefs.length) {
            const value = lines.Value().trimEnd();
            if (value == '%%') {
                cols.push(new ColumnNode(colDefs[i], parser.ParseElements(data, arr.join('\n'), scope)));
                arr = [];
                i++;
            }
            else {
                arr.push(value);
            }
            if (i >= colDefs.length)
                break;
        }
        if (i != colDefs.length || arr.length > 0) {
            lines.SetCurrent(current);
            return null;
        }
        return new HtmlNode_1.HtmlNode('<div class="row">', new NodeCollection_1.NodeCollection(...cols), '</div>');
    }
}
exports.MdColumnsElement = MdColumnsElement;
//# sourceMappingURL=MdColumnsElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdHeadingElement.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdHeadingElement.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdHeadingElement = void 0;
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class HeadingNode {
    constructor(level, id, text) {
        this.Level = level;
        this.ID = id;
        this.Text = text;
    }
    ToHtml() {
        return `<h${this.Level} id="${this.ID}">${this.Text.ToHtml()}</h${this.Level}>`;
    }
    ToPlainText() {
        const plain = this.Text.ToPlainText().replace(/\n/g, ' ');
        return plain + '\n' + '-'.repeat(plain.length);
    }
    GetChildren() {
        return [this.Text];
    }
    ReplaceChild(i, node) {
        if (i != 0)
            throw new Error('Argument out of range');
        this.Text = node;
    }
    HasContent() {
        return true;
    }
}
class MdHeadingElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value();
        return value.length > 0 && value.startsWith('=');
    }
    Consume(parser, data, lines, scope) {
        const value = lines.Value().trim();
        const res = /^(=+)(.*?)=*$/i.exec(value);
        const level = Math.min(6, res[1].length);
        const text = res[2].trim();
        let contents = parser.ParseTags(data, text, scope, TagParseContext_1.TagParseContext.Inline);
        contents = parser.RunProcessors(contents, data, scope);
        const id = MdHeadingElement.GetUniqueAnchor(data, contents.ToPlainText());
        return new HeadingNode(level, id, contents);
    }
    static GetUniqueAnchor(data, text) {
        const key = MdHeadingElement.name + '.IdList';
        const anchors = data.Get(key, () => new Set());
        const id = text.replace(/[^\da-z?/:@\-._~!$&'()*+,;=]/ig, '_');
        let anchor = id;
        let inc = 1;
        do {
            // Increment if we have a duplicate
            if (!anchors.has(anchor))
                break;
            inc++;
            anchor = `${id}_${inc}`;
            // eslint-disable-next-line no-constant-condition
        } while (true);
        anchors.add(anchor);
        return anchor;
    }
}
exports.MdHeadingElement = MdHeadingElement;
//# sourceMappingURL=MdHeadingElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdLineElement.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdLineElement.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdLineElement = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class MdLineElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value().trimEnd();
        return value.length >= 3 && value == '-'.repeat(value.length);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Consume(_parser, _data, _lines, _scope) {
        const ret = new HtmlNode_1.HtmlNode('<hr />', PlainTextNode_1.PlainTextNode.Empty(), '');
        ret.PlainBefore = '---';
        return ret;
    }
}
exports.MdLineElement = MdLineElement;
//# sourceMappingURL=MdLineElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdListElement.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdListElement.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdListElement = void 0;
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class ListNode {
    constructor(tag, ...items) {
        this.Tag = tag;
        this.Items = items;
    }
    ToHtml() {
        let sb = '';
        sb += `<${this.Tag}>\n`;
        for (const item of this.Items)
            sb += item.ToHtml();
        sb += `</${this.Tag}>\n`;
        return sb;
    }
    ToPlainText() {
        return this.ToPlainTextPrefixed('');
    }
    ToPlainTextPrefixed(prefix) {
        const st = prefix + (this.Tag == 'ol' ? '#' : '-');
        let sb = '';
        for (const item of this.Items)
            sb += item.ToPlainTextPrefixed(st);
        return sb;
    }
    GetChildren() {
        return [...this.Items];
    }
    ReplaceChild(i, node) {
        this.Items[i] = node;
    }
    HasContent() {
        return true;
    }
}
class ListItemNode {
    constructor(content) {
        this.Content = content;
        this.Subtrees = [];
    }
    ToHtml() {
        let sb = '<li>';
        sb += this.Content.ToHtml();
        for (const st of this.Subtrees)
            sb += st.ToHtml();
        sb += '</li>\n';
        return sb;
    }
    ToPlainText() {
        throw new Error('Invalid operation');
    }
    ToPlainTextPrefixed(prefix) {
        let sb = prefix + ' ';
        sb += this.Content.ToPlainText() + '\n';
        for (const st of this.Subtrees)
            sb += st.ToPlainTextPrefixed(prefix);
        return sb;
    }
    GetChildren() {
        return [this.Content, ...this.Subtrees];
    }
    ReplaceChild(i, node) {
        if (i == 0)
            this.Content = node;
        else
            this.Subtrees[i - 1] = node;
    }
    HasContent() {
        return true;
    }
}
class MdListElement extends Element_1.Element {
    static IsUnsortedToken(c) {
        return MdListElement.UlTokens.has(c);
    }
    static IsSortedToken(c) {
        return MdListElement.OlTokens.has(c);
    }
    static IsListToken(c) {
        return MdListElement.IsUnsortedToken(c) || MdListElement.IsSortedToken(c);
    }
    static IsValidListItem(value, currentLevel) {
        const len = value.length;
        if (len == 0)
            return 0;
        let tokens = 0;
        let foundSpace = false;
        for (let i = 0; i < len; i++) {
            const c = value[i];
            if (MdListElement.IsListToken(c)) {
                tokens++;
                continue;
            }
            if (c == ' ') {
                foundSpace = true;
                break;
            }
            return 0;
        }
        if (foundSpace && tokens > 0 && tokens <= currentLevel + 1)
            return tokens;
        return 0;
    }
    Matches(lines) {
        const value = lines.Value().trim();
        return MdListElement.IsValidListItem(value, 0) > 0;
    }
    Consume(parser, data, lines, scope) {
        const current = lines.Current();
        // Put all the subtrees into a dummy item node
        const item = new ListItemNode(PlainTextNode_1.PlainTextNode.Empty());
        this.CreateListItems(item, '', parser, data, lines, scope);
        if (item.Subtrees.length == 0) {
            lines.SetCurrent(current);
            return null;
        }
        // Pull the subtrees out again for the result
        if (item.Subtrees.length == 1)
            return item.Subtrees[0];
        return new NodeCollection_1.NodeCollection(...item.Subtrees);
    }
    CreateListItems(lastItemNode, prefix, parser, data, lines, scope) {
        const ret = [];
        do {
            let value = lines.Value().trimEnd();
            if (!value.startsWith(prefix)) {
                // No longer valid for this list
                lines.Back();
                break;
            }
            value = value.substring(prefix.length); // strip the prefix off the line
            // Possibilities:
            // empty string : not valid - stop parsing
            // first character is whitespace : trim and create list item
            // first character is list token, second character is whitespace: create sublist
            // anything else : not valid - stop parsing
            if (value.length > 1 && value[0] == ' ' && prefix.length > 0) { // don't allow this if we're parsing at level 0
                // List item
                value = value.trimStart();
                // Support for continuations
                while (value.endsWith('^')) {
                    if (value.endsWith('\\^')) // super basic way to escape continuations
                     {
                        value = value.substring(0, value.length - 2) + '^';
                        break;
                    }
                    else if (lines.Next()) {
                        value = value.substring(0, value.length - 1).trim() + '\n' + lines.Value().trimStart();
                    }
                    else {
                        break;
                    }
                }
                const pt = parser.ParseTags(data, value.trim(), scope, TagParseContext_1.TagParseContext.Block);
                lastItemNode = new ListItemNode(pt);
                ret.push(lastItemNode);
            }
            else if (value.length > 2 && MdListElement.IsListToken(value[0]) && value[1] == ' ' && lastItemNode != null) {
                // Sublist
                const tag = MdListElement.IsSortedToken(value[0]) ? 'ol' : 'ul';
                const sublist = new ListNode(tag, ...this.CreateListItems(lastItemNode, prefix + value[0], parser, data, lines, scope));
                lastItemNode.Subtrees.push(sublist);
            }
            else {
                // Cannot parse this line, list is complete
                lines.Back();
                break;
            }
        } while (lines.Next());
        return ret;
    }
}
exports.MdListElement = MdListElement;
MdListElement.UlTokens = new Set(['*', '-']);
MdListElement.OlTokens = new Set(['#']);
//# sourceMappingURL=MdListElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdPanelElement.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdPanelElement.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdPanelElement = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class MdPanelElement extends Element_1.Element {
    Matches(lines) {
        return lines.Value().startsWith('~~~');
    }
    Consume(parser, data, lines, scope) {
        const current = lines.Current();
        const meta = lines.Value().substring(3).trim();
        let title = '';
        let found = false;
        const arr = [];
        while (lines.Next()) {
            const value = lines.Value().trimEnd();
            if (value == '~~~') {
                found = true;
                break;
            }
            if (value.length > 1 && value[0] == ':')
                title = value.substring(1).trim();
            else
                arr.push(value);
        }
        if (!found) {
            lines.SetCurrent(current);
            return null;
        }
        let cls;
        if (meta == 'message')
            cls = 'card-success';
        else if (meta == 'info')
            cls = 'card-info';
        else if (meta == 'warning')
            cls = 'card-warning';
        else if (meta == 'error')
            cls = 'card-danger';
        else
            cls = 'card-default';
        const before = `<div class="embed-panel card ${cls}">` +
            (title != '' ? `<div class="card-header">${HtmlHelper_1.HtmlHelper.Encode(title)}</div>` : '') +
            '<div class="card-body">';
        const content = parser.ParseElements(data, arr.join('\n'), scope);
        const after = '</div></div>';
        const node = new HtmlNode_1.HtmlNode(before, content, after);
        node.PlainBefore = title == '' ? '' : title + '\n' + '-'.repeat(title.length) + '\n';
        return node;
    }
}
exports.MdPanelElement = MdPanelElement;
//# sourceMappingURL=MdPanelElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdQuoteElement.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdQuoteElement.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdQuoteElement = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class MdQuoteElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value();
        return value.length > 0 && value.startsWith('>');
    }
    Consume(parser, data, lines, scope) {
        let value = lines.Value();
        const arr = [value.substring(1).trim()];
        while (lines.Next()) {
            value = lines.Value().trim();
            if (value.length == 0 || value[0] != '>') {
                lines.Back();
                break;
            }
            arr.push(value.substring(1).trim());
        }
        const text = arr.join('\n').trim();
        const ret = new HtmlNode_1.HtmlNode('<blockquote>', parser.ParseElements(data, text, scope), '</blockquote>');
        ret.PlainBefore = '[quote]\n';
        ret.PlainAfter = '\n[/quote]';
        return ret;
    }
}
exports.MdQuoteElement = MdQuoteElement;
//# sourceMappingURL=MdQuoteElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdTableElement.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdTableElement.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdTableElement = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const RefNode_1 = __webpack_require__(/*! ../Nodes/RefNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RefNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class TableRow {
    constructor(type, ...cells) {
        this.Type = type;
        this.Cells = cells;
    }
    ToHtml() {
        let sb = '<tr>\n';
        for (const cell of this.Cells) {
            sb += `<${this.Type}>${cell.ToHtml()}</${this.Type}>\n`;
        }
        sb += '</tr>\n';
        return sb;
    }
    ToPlainText() {
        let sb = '';
        let first = true;
        for (const cell of this.Cells) {
            if (!first)
                sb += ' | ';
            sb += cell.ToPlainText();
            first = false;
        }
        sb += '\n';
        return sb;
    }
    GetChildren() {
        return [...this.Cells];
    }
    ReplaceChild(i, node) {
        this.Cells[i] = node;
    }
    HasContent() {
        return true;
    }
}
class MdTableElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value().trimEnd();
        return value.length >= 2 && value[0] == '|' && (value[1] == '=' || value[1] == '-');
    }
    Consume(parser, data, lines, scope) {
        const arr = [];
        do {
            const value = lines.Value().trimEnd();
            if (value.length < 2 || value[0] != '|' || (value[1] != '=' && value[1] != '-')) {
                lines.Back();
                break;
            }
            const cells = MdTableElement.SplitTable(value.substring(2)).map(x => MdTableElement.ResolveCell(x, parser, data, scope));
            arr.push(new TableRow(value[1] == '=' ? 'th' : 'td', ...cells));
        } while (lines.Next());
        return new HtmlNode_1.HtmlNode('<table class="table table-bordered">', new NodeCollection_1.NodeCollection(...arr), '</table>');
    }
    static SplitTable(text) {
        const ret = [];
        let level = 0;
        let last = 0;
        text = text.trim();
        const len = text.length;
        let i;
        for (i = 0; i < len; i++) {
            const c = text[i];
            if (c == '[')
                level++;
            else if (c == ']')
                level--;
            else if ((c == '|' && level == 0) || i == len - 1) {
                ret.push(text.substring(last, i + (i == len - 1 ? 1 : 0)).trim());
                last = i + 1;
            }
        }
        if (last < len)
            ret.push(text.substring(last, i + (i == len - 1 ? 1 : 0)).trim());
        return ret;
    }
    static ResolveCell(text, parser, data, scope) {
        const res = /^:ref=([a-z0-9 ]+)$/i.exec(text.trim());
        if (res) {
            const name = res[1];
            return new RefNode_1.RefNode(data, name);
        }
        return parser.ParseTags(data, text, scope, TagParseContext_1.TagParseContext.Block);
    }
}
exports.MdTableElement = MdTableElement;
//# sourceMappingURL=MdTableElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/PreElement.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/PreElement.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PreElement = void 0;
const Colours_1 = __webpack_require__(/*! ../Colours */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Colours.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class PreElement extends Element_1.Element {
    constructor() {
        super(...arguments);
        this.Token = 'pre';
    }
    Matches(lines) {
        const value = lines.Value().trim();
        return value.length > this.Token.length + 1 && value.startsWith('[' + this.Token) && value.match(this.getTokenRegex()) != null;
    }
    getTokenRegex() {
        const escapedToken = this.Token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('\\[' + escapedToken + '(?:=([a-z ]+))?\\]', 'i');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Consume(parser, data, lines, _scope) {
        var _a;
        const current = lines.Current();
        let arr = [];
        let line = lines.Value().trim();
        const res = line.match(this.getTokenRegex());
        if (!res) {
            lines.SetCurrent(current);
            return null;
        }
        line = line.substring(res[0].length);
        let lang = undefined;
        let hl = false;
        if (res[1]) {
            const spl = res[1].split(' ');
            hl = spl.includes('highlight');
            lang = (_a = spl.find(x => x != 'highlight')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (!PreElement.AllowedLanguages.includes(lang))
                lang = undefined;
        }
        if (line.endsWith('[/' + this.Token + ']')) {
            arr.push(line.substring(0, line.length - (this.Token.length + 3)));
        }
        else {
            if (line.length > 0)
                arr.push(line);
            let found = false;
            while (lines.Next()) {
                const value = lines.Value().trimEnd();
                if (value.endsWith('[/' + this.Token + ']')) {
                    const lastLine = value.substring(0, value.length - (this.Token.length + 3));
                    arr.push(lastLine);
                    found = true;
                    break;
                }
                else {
                    arr.push(value);
                }
            }
            if (!found || arr.length == 0) {
                lines.SetCurrent(current);
                return null;
            }
        }
        // Trim blank lines from the start and end of the array
        for (let i = 0; i < 2; i++) {
            while (arr.length > 0 && arr[0].trim() == '')
                arr.splice(0, 1);
            arr.reverse();
        }
        let highlight = [];
        if (hl) {
            // Highlight commands get their own line so we need to keep track of which lines we're removing as we go
            const newArr = [];
            let firstLine = 0;
            for (const srcLine of arr) {
                if (srcLine.startsWith('@@')) {
                    const match = srcLine.match(/^@@(?:(#[0-9a-f]{3}|#[0-9a-f]{6}|[a-z]+|\d+)(?::(\d+))?)?$/im);
                    if (match != null) {
                        let numLines = 1;
                        let color = '#FF8000';
                        for (let i = 1; i < match.length; i++) {
                            const p = match[i];
                            if (Colours_1.Colours.IsValidColor(p))
                                color = p;
                            else if (parseInt(p, 10))
                                numLines = parseInt(p, 10);
                        }
                        highlight.push({ firstLine, numLines, color });
                        continue;
                    }
                }
                firstLine++;
                newArr.push(srcLine);
            }
            arr = newArr;
            // Make sure highlights don't overlap each other or go past the end of the block
            highlight.push({ firstLine: arr.length, numLines: 0, color: '' });
            for (let i = 0; i < highlight.length - 1; i++) {
                const { firstLine: currFirst, numLines: currNum, color: currCol } = highlight[i];
                const { firstLine: nextFirst } = highlight[i + 1];
                const lastLine = currFirst + currNum - 1;
                if (lastLine >= nextFirst)
                    highlight[i] = { firstLine: currFirst, numLines: nextFirst - currFirst, color: currCol };
            }
            highlight = highlight.filter(x => x.numLines > 0);
        }
        arr = PreElement.FixCodeIndentation(arr);
        const highlights = highlight
            .map(h => `<div class="line-highlight" style="top: ${h.firstLine}em; height: ${h.numLines}em; background: ${h.color};"></div>`)
            .join('');
        const plain = new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(arr.join('\n'));
        const cls = !lang || lang.trim() == '' ? '' : ` class="lang-${lang}"`;
        const before = `<pre${cls}><code>${highlights}`;
        const after = '</code></pre>';
        return new HtmlNode_1.HtmlNode(before, plain, after);
    }
    static FixCodeIndentation(arr) {
        // Replace all tabs with 4 spaces
        arr = arr.map(x => x.replace(/\t/g, '    '));
        // Find the longest common whitespace amongst all lines (ignore blank lines)
        const longestWhitespace = arr.reduce((c, i) => {
            if (i.trim().length == 0)
                return c;
            const wht = i.length - i.trimStart().length;
            return Math.min(wht, c);
        }, 9999);
        // Dedent all lines by the longest common whitespace
        return arr.map(a => a.substring(Math.min(longestWhitespace, a.length)));
    }
}
exports.PreElement = PreElement;
PreElement.AllowedLanguages = [
    'php', 'dos', 'bat', 'cmd', 'css', 'cpp', 'c', 'c++', 'cs', 'ini', 'json', 'xml', 'html', 'angelscript',
    'javascript', 'js', 'plaintext'
];
//# sourceMappingURL=PreElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/RefElement.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/RefElement.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefElement = void 0;
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Element_1 = __webpack_require__(/*! ./Element */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/Element.js");
class RefElement extends Element_1.Element {
    Matches(lines) {
        const value = lines.Value().trim();
        return value.length > 4 && value.startsWith('[ref=') && value.match(/\[ref=[a-z0-9 ]+\]/i) != null;
    }
    Consume(parser, data, lines, scope) {
        const current = lines.Current();
        const arr = [];
        let line = lines.Value().trim();
        const res = line.match(/\[ref=([a-z0-9 ]+)\]/i);
        if (!res) {
            lines.SetCurrent(current);
            return null;
        }
        line = line.substring(res[0].length);
        const name = res[1];
        if (line.endsWith('[/ref]')) {
            arr.push(line.substring(0, line.length - 6));
        }
        else {
            if (line.length > 0)
                arr.push(line);
            let found = false;
            while (lines.Next()) {
                const value = lines.Value().trimEnd();
                if (value.endsWith('[/ref]')) {
                    const lastLine = value.substring(0, value.length - 6);
                    arr.push(lastLine);
                    found = true;
                    break;
                }
                else {
                    arr.push(value);
                }
            }
            if (!found || arr.length == 0) {
                lines.SetCurrent(current);
                return null;
            }
        }
        // Store the ref node
        const node = parser.ParseElements(data, arr.join('\n').trim(), scope);
        data.Set(`Ref::${name}`, node);
        // Return nothing
        return PlainTextNode_1.PlainTextNode.Empty();
    }
}
exports.RefElement = RefElement;
//# sourceMappingURL=RefElement.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlHelper = void 0;
function escapeEmoji(str) {
    return str.replace(/\p{Emoji_Presentation}/ugm, s => '&#' + s.codePointAt(0) + ';');
}
class HtmlHelper {
    static Encode(text) {
        text = text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return escapeEmoji(text);
    }
    static UrlEncode(text) {
        return encodeURI(text);
    }
    static AttributeEncode(text) {
        text = text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return escapeEmoji(text);
    }
}
exports.HtmlHelper = HtmlHelper;
//# sourceMappingURL=HtmlHelper.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Lines.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Lines.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lines = void 0;
class Lines {
    constructor(content) {
        this.Content = content.split('\n');
        this.Index = -1;
    }
    Back() {
        this.Index--;
    }
    Next() {
        return ++this.Index < this.Content.length;
    }
    Value() {
        return this.Content[this.Index];
    }
    Current() {
        return this.Index;
    }
    SetCurrent(index) {
        this.Index = index;
    }
}
exports.Lines = Lines;
//# sourceMappingURL=Lines.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevision.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevision.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiRevision = void 0;
class WikiRevision {
    static CreateSlug(text) {
        text = text.replace(' ', '_');
        text = text.replace(/[^-$_.+!*'"(),:;<>^{}|~0-9a-z[\]]/ig, '');
        return text;
    }
}
exports.WikiRevision = WikiRevision;
//# sourceMappingURL=WikiRevision.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionBook.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionBook.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiRevisionBook = void 0;
class WikiRevisionBook {
}
exports.WikiRevisionBook = WikiRevisionBook;
//# sourceMappingURL=WikiRevisionBook.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionCredit.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionCredit.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiRevisionCredit = void 0;
class WikiRevisionCredit {
}
exports.WikiRevisionCredit = WikiRevisionCredit;
WikiRevisionCredit.TypeCredit = 'c';
WikiRevisionCredit.TypeArchive = 'a';
WikiRevisionCredit.TypeFull = 'f';
//# sourceMappingURL=WikiRevisionCredit.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlNode = void 0;
class HtmlNode {
    constructor(htmlBefore, content, htmlAfter) {
        this.HtmlBefore = htmlBefore;
        this.Content = content;
        this.HtmlAfter = htmlAfter;
        this.PlainBefore = this.PlainAfter = '';
        this.IsBlockNode = false;
    }
    ToHtml() {
        return this.HtmlBefore + this.Content.ToHtml() + this.HtmlAfter;
    }
    ToPlainText() {
        return this.PlainBefore + this.Content.ToPlainText() + this.PlainAfter;
    }
    GetChildren() {
        return [this.Content];
    }
    ReplaceChild(i, node) {
        if (i !== 0)
            throw new Error('Index out of range');
        this.Content = node;
    }
    HasContent() {
        return true;
    }
}
exports.HtmlNode = HtmlNode;
//# sourceMappingURL=HtmlNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MetadataNode = void 0;
class MetadataNode {
    constructor(key, value) {
        this.Key = key;
        this.Value = value;
    }
    ToHtml() {
        return '';
    }
    ToPlainText() {
        return '';
    }
    GetChildren() {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ReplaceChild(_i, _node) {
        throw new Error('Invalid operation.');
    }
    HasContent() {
        return false;
    }
}
exports.MetadataNode = MetadataNode;
//# sourceMappingURL=MetadataNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeCollection = void 0;
class NodeCollection {
    constructor(...nodes) {
        this.Nodes = Array.from(nodes);
    }
    ToHtml() {
        return this.Nodes.map(x => x.ToHtml()).join('');
    }
    ToPlainText() {
        return this.Nodes.map(x => x.ToPlainText()).join('');
    }
    GetChildren() {
        return this.Nodes;
    }
    ReplaceChild(i, node) {
        this.Nodes[i] = node;
    }
    HasContent() {
        return this.Nodes.some(x => x.HasContent());
    }
}
exports.NodeCollection = NodeCollection;
//# sourceMappingURL=NodeCollection.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeExtensions.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeExtensions.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeExtensions = void 0;
const RemovedNode_1 = __webpack_require__(/*! ./RemovedNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RemovedNode.js");
class NodeExtensions {
    static Remove(root, remove) {
        const children = root.GetChildren();
        const idx = children.indexOf(remove);
        if (idx >= 0) {
            root.ReplaceChild(idx, new RemovedNode_1.RemovedNode(remove));
            return true;
        }
        for (const ch of children) {
            if (NodeExtensions.Remove(ch, remove))
                return true;
        }
        return false;
    }
    static Walk(node, visitor) {
        if (visitor(node) === false)
            return false;
        for (const child of node.GetChildren()) {
            if (NodeExtensions.Walk(child, visitor) === false)
                return false;
        }
        return true;
    }
    static WalkBack(node, visitor) {
        for (const child of Array.from(node.GetChildren()).reverse()) {
            if (NodeExtensions.WalkBack(child, visitor) === false)
                return false;
        }
        if (visitor(node) === false)
            return false;
        return true;
    }
}
exports.NodeExtensions = NodeExtensions;
//# sourceMappingURL=NodeExtensions.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlainTextNode = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
class PlainTextNode {
    constructor(text) {
        this.Text = text;
    }
    static Empty() { return new PlainTextNode(''); }
    ToHtml() {
        return HtmlHelper_1.HtmlHelper.Encode(this.Text);
    }
    ToPlainText() {
        return this.Text;
    }
    GetChildren() {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ReplaceChild(_i, _node) {
        throw new Error('Invalid operation');
    }
    HasContent() {
        return this.Text && this.Text.trim() != '';
    }
}
exports.PlainTextNode = PlainTextNode;
//# sourceMappingURL=PlainTextNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RefNode.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RefNode.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefNode = void 0;
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ./UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
class RefNode {
    constructor(data, name) {
        this.Data = data;
        this.Name = name;
    }
    GetNode() {
        return this.Data.Get(`Ref::${this.Name}`, UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.Empty);
    }
    ToHtml() {
        return this.GetNode().ToHtml();
    }
    ToPlainText() {
        return this.GetNode().ToPlainText();
    }
    GetChildren() {
        return [this.GetNode()];
    }
    ReplaceChild(i, node) {
        if (i != 0)
            throw new Error('Index out of range');
        this.Data.Set(`Ref::${this.Name}`, node);
    }
    HasContent() {
        return this.GetNode().HasContent();
    }
}
exports.RefNode = RefNode;
//# sourceMappingURL=RefNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RemovedNode.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RemovedNode.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemovedNode = void 0;
class RemovedNode {
    constructor(originalNode) {
        this.OriginalNode = originalNode;
    }
    ToHtml() {
        return '';
    }
    ToPlainText() {
        return '';
    }
    GetChildren() {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ReplaceChild(_i, _node) {
        throw new Error('Unsupported operation.');
    }
    HasContent() {
        return false;
    }
}
exports.RemovedNode = RemovedNode;
//# sourceMappingURL=RemovedNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnprocessablePlainTextNode = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
class UnprocessablePlainTextNode {
    constructor(text) {
        this.Text = text;
    }
    static Empty() { return new UnprocessablePlainTextNode(''); }
    static NewLine() { return new UnprocessablePlainTextNode('\n'); }
    ToHtml() {
        return HtmlHelper_1.HtmlHelper.Encode(this.Text);
    }
    ToPlainText() {
        return this.Text;
    }
    GetChildren() {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ReplaceChild(_i, _node) {
        throw new Error('Invalid operation');
    }
    HasContent() {
        return this.Text && this.Text.trim() != '';
    }
}
exports.UnprocessablePlainTextNode = UnprocessablePlainTextNode;
//# sourceMappingURL=UnprocessablePlainTextNode.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseData.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseData.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseData = void 0;
class ParseData {
    constructor() {
        this._values = {};
    }
    Get(key, defaultValue) {
        if (this._values[key])
            return this._values[key];
        const v = defaultValue();
        this._values[key] = v;
        return v;
    }
    Set(key, value) {
        this._values[key] = value;
    }
}
exports.ParseData = ParseData;
//# sourceMappingURL=ParseData.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseResult.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseResult.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseResult = void 0;
const MetadataNode_1 = __webpack_require__(/*! ./Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const NodeCollection_1 = __webpack_require__(/*! ./Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const NodeExtensions_1 = __webpack_require__(/*! ./Nodes/NodeExtensions */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeExtensions.js");
class ParseResult {
    constructor() {
        this.Content = new NodeCollection_1.NodeCollection();
    }
    GetMetadata() {
        const list = [];
        NodeExtensions_1.NodeExtensions.Walk(this.Content, n => {
            if (n instanceof MetadataNode_1.MetadataNode)
                list.push({ Key: n.Key, Value: n.Value });
            return true;
        });
        return list;
    }
    ToHtml() {
        return this.Content.ToHtml();
    }
    ToPlainText() {
        return this.Content.ToPlainText();
    }
}
exports.ParseResult = ParseResult;
//# sourceMappingURL=ParseResult.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Parser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Parser.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parser = void 0;
const Lines_1 = __webpack_require__(/*! ./Lines */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Lines.js");
const NodeCollection_1 = __webpack_require__(/*! ./Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const NodeExtensions_1 = __webpack_require__(/*! ./Nodes/NodeExtensions */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeExtensions.js");
const PlainTextNode_1 = __webpack_require__(/*! ./Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ./Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const ParseData_1 = __webpack_require__(/*! ./ParseData */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseData.js");
const ParseResult_1 = __webpack_require__(/*! ./ParseResult */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParseResult.js");
const State_1 = __webpack_require__(/*! ./State */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/State.js");
const TagParseContext_1 = __webpack_require__(/*! ./TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Util.js");
class Parser {
    constructor(configuration) {
        this.Configuration = configuration;
    }
    ParseResult(text, scope = '') {
        const data = new ParseData_1.ParseData();
        text = text.trim();
        let node = this.ParseElements(data, text, scope);
        node = this.RunProcessors(node, data, scope);
        const res = new ParseResult_1.ParseResult();
        res.Content = node;
        return res;
    }
    ParseElements(data, text, scope) {
        const root = new NodeCollection_1.NodeCollection();
        // Elements are line-based scopes, an element cannot start in the middle of a line.
        text = text.replace('\r', '');
        const lines = new Lines_1.Lines(text);
        const inscope = (0, Util_1.OrderByDescending)(this.Configuration.Elements.filter(x => x.InScope(scope)), x => x.Priority);
        const plain = [];
        while (lines.Next()) {
            // Try and find an element for this line
            let matched = false;
            for (const e of inscope) {
                if (!e.Matches(lines))
                    continue;
                const con = e.Consume(this, data, lines, scope); // found an element, generate the result
                if (con == null)
                    continue; // no result, guess this element wasn't valid after all
                // if we have any plain text, create a node for it
                if (plain.length > 0) {
                    root.Nodes.push(Parser.TrimWhitespace(this.ParseTags(data, plain.join('\n').trim(), scope, TagParseContext_1.TagParseContext.Block)));
                    root.Nodes.push(UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.NewLine()); // Newline before next element
                }
                plain.splice(0, plain.length);
                root.Nodes.push(con);
                root.Nodes.push(UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.NewLine()); // Elements always have a newline after
                matched = true;
                break;
            }
            if (!matched)
                plain.push(lines.Value()); // there wasn't any match, so this line was plain text
        }
        // parse any plain text that might be left
        if (plain.length > 0)
            root.Nodes.push(Parser.TrimWhitespace(this.ParseTags(data, plain.join('\n').trim(), scope, TagParseContext_1.TagParseContext.Block)));
        // Trim off any whitespace nodes at the end
        const shouldTrim = () => {
            if (root.Nodes.length === 0)
                return false;
            const last = root.Nodes[root.Nodes.length - 1];
            if (!(last instanceof UnprocessablePlainTextNode_1.UnprocessablePlainTextNode))
                return false;
            return !last.Text || last.Text.trim() == '';
        };
        while (shouldTrim()) {
            root.Nodes.splice(root.Nodes.length - 1, 1);
        }
        Parser.FlattenNestedNodeCollections(root);
        return Parser.TrimWhitespace(root);
    }
    static TrimWhitespace(node, start = true, end = true) {
        const removeNodes = [];
        if (start) {
            NodeExtensions_1.NodeExtensions.Walk(node, x => {
                if (x instanceof NodeCollection_1.NodeCollection)
                    return true;
                if (x.HasContent())
                    return false;
                if (x instanceof UnprocessablePlainTextNode_1.UnprocessablePlainTextNode || x instanceof PlainTextNode_1.PlainTextNode)
                    removeNodes.push(x);
                return true;
            });
        }
        if (end) {
            NodeExtensions_1.NodeExtensions.WalkBack(node, x => {
                if (x instanceof NodeCollection_1.NodeCollection)
                    return true;
                if (x.HasContent())
                    return false;
                if (x instanceof UnprocessablePlainTextNode_1.UnprocessablePlainTextNode || x instanceof PlainTextNode_1.PlainTextNode)
                    removeNodes.push(x);
                return true;
            });
        }
        for (const rem of removeNodes) {
            NodeExtensions_1.NodeExtensions.Remove(node, rem);
        }
        return node;
    }
    ParseTags(data, text, scope, context) {
        // trim 3 or more newlines down to 2 newlines
        text = text.replace(/\n{3,}/g, '\n\n');
        const state = new State_1.State(text);
        const root = new NodeCollection_1.NodeCollection();
        const inscope = (0, Util_1.OrderByDescending)(this.Configuration.Tags.filter(x => x.InScope(scope)), x => x.Priority);
        while (!state.Done) {
            let plain = state.ScanTo('[');
            if (plain && plain != '')
                root.Nodes.push(new PlainTextNode_1.PlainTextNode(plain));
            if (state.Done)
                break;
            const token = state.GetToken();
            let found = false;
            for (const t of inscope) {
                if (t.Matches(state, token, context)) {
                    const parsed = t.Parse(this, data, state, scope, context);
                    if (parsed != null) {
                        root.Nodes.push(parsed);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                plain = state.Next();
                if (plain && plain != '')
                    root.Nodes.push(new PlainTextNode_1.PlainTextNode(plain));
            }
        }
        return root;
    }
    static FlattenNestedNodeCollections(node) {
        if (node instanceof NodeCollection_1.NodeCollection) {
            const coll = node;
            while (coll.Nodes.some(x => x instanceof NodeCollection_1.NodeCollection)) {
                coll.Nodes = coll.Nodes.flatMap(x => x instanceof NodeCollection_1.NodeCollection ? x.Nodes : [x]);
            }
        }
        else {
            const ch = node.GetChildren();
            for (let i = 0; i < ch.length; i++) {
                while (ch[i] instanceof NodeCollection_1.NodeCollection && ch[i].Nodes.length == 1) {
                    const chcoll = ch[i];
                    node.ReplaceChild(i, chcoll.Nodes[0]);
                    ch[i] = chcoll.Nodes[0];
                }
            }
        }
        for (const child of node.GetChildren()) {
            Parser.FlattenNestedNodeCollections(child);
        }
    }
    RunProcessors(node, data, scope) {
        for (const processor of (0, Util_1.OrderByDescending)(this.Configuration.Processors, x => x.Priority)) {
            node = this.RunProcessor(node, processor, data, scope);
        }
        return node;
    }
    RunProcessor(node, processor, data, scope) {
        // If the node can be processed, don't touch subnodes - the processor can invoke RunProcessor if it's needed.
        if (processor.ShouldProcess(node, scope)) {
            const result = processor.Process(this, data, node, scope);
            return result.length == 1 ? result[0] : new NodeCollection_1.NodeCollection(...result);
        }
        const children = node.GetChildren();
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const processed = this.RunProcessor(child, processor, data, scope);
            node.ReplaceChild(i, processed);
        }
        return node;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParserConfiguration.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParserConfiguration.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParserConfiguration = void 0;
const MdCodeElement_1 = __webpack_require__(/*! ./Elements/MdCodeElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdCodeElement.js");
const MdColumnsElement_1 = __webpack_require__(/*! ./Elements/MdColumnsElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdColumnsElement.js");
const MdHeadingElement_1 = __webpack_require__(/*! ./Elements/MdHeadingElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdHeadingElement.js");
const MdLineElement_1 = __webpack_require__(/*! ./Elements/MdLineElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdLineElement.js");
const MdListElement_1 = __webpack_require__(/*! ./Elements/MdListElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdListElement.js");
const MdPanelElement_1 = __webpack_require__(/*! ./Elements/MdPanelElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdPanelElement.js");
const MdQuoteElement_1 = __webpack_require__(/*! ./Elements/MdQuoteElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdQuoteElement.js");
const MdTableElement_1 = __webpack_require__(/*! ./Elements/MdTableElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/MdTableElement.js");
const PreElement_1 = __webpack_require__(/*! ./Elements/PreElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/PreElement.js");
const RefElement_1 = __webpack_require__(/*! ./Elements/RefElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/RefElement.js");
const AutoLinkingProcessor_1 = __webpack_require__(/*! ./Processors/AutoLinkingProcessor */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/AutoLinkingProcessor.js");
const MarkdownTextProcessor_1 = __webpack_require__(/*! ./Processors/MarkdownTextProcessor */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/MarkdownTextProcessor.js");
const NewLineProcessor_1 = __webpack_require__(/*! ./Processors/NewLineProcessor */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/NewLineProcessor.js");
const SmiliesProcessor_1 = __webpack_require__(/*! ./Processors/SmiliesProcessor */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/SmiliesProcessor.js");
const TrimWhitespaceAroundBlockNodesProcessor_1 = __webpack_require__(/*! ./Processors/TrimWhitespaceAroundBlockNodesProcessor */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/TrimWhitespaceAroundBlockNodesProcessor.js");
const AlignTag_1 = __webpack_require__(/*! ./Tags/AlignTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/AlignTag.js");
const CodeTag_1 = __webpack_require__(/*! ./Tags/CodeTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/CodeTag.js");
const ColorTag_1 = __webpack_require__(/*! ./Tags/ColorTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ColorTag.js");
const FontTag_1 = __webpack_require__(/*! ./Tags/FontTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/FontTag.js");
const ImageTag_1 = __webpack_require__(/*! ./Tags/ImageTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ImageTag.js");
const LinkTag_1 = __webpack_require__(/*! ./Tags/LinkTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/LinkTag.js");
const ListTag_1 = __webpack_require__(/*! ./Tags/ListTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ListTag.js");
const PreTag_1 = __webpack_require__(/*! ./Tags/PreTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/PreTag.js");
const QuickLinkTag_1 = __webpack_require__(/*! ./Tags/QuickLinkTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuickLinkTag.js");
const QuoteTag_1 = __webpack_require__(/*! ./Tags/QuoteTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuoteTag.js");
const SizeTag_1 = __webpack_require__(/*! ./Tags/SizeTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SizeTag.js");
const SpoilerTag_1 = __webpack_require__(/*! ./Tags/SpoilerTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SpoilerTag.js");
const Tag_1 = __webpack_require__(/*! ./Tags/Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
const VaultEmbedTag_1 = __webpack_require__(/*! ./Tags/VaultEmbedTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/VaultEmbedTag.js");
const WikiArchiveTag_1 = __webpack_require__(/*! ./Tags/WikiArchiveTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiArchiveTag.js");
const WikiBookTag_1 = __webpack_require__(/*! ./Tags/WikiBookTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiBookTag.js");
const WikiCategoryTag_1 = __webpack_require__(/*! ./Tags/WikiCategoryTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCategoryTag.js");
const WikiCreditTag_1 = __webpack_require__(/*! ./Tags/WikiCreditTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCreditTag.js");
const WikiFileTag_1 = __webpack_require__(/*! ./Tags/WikiFileTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiFileTag.js");
const WikiImageTag_1 = __webpack_require__(/*! ./Tags/WikiImageTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiImageTag.js");
const WikiLinkTag_1 = __webpack_require__(/*! ./Tags/WikiLinkTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiLinkTag.js");
const WikiYoutubeTag_1 = __webpack_require__(/*! ./Tags/WikiYoutubeTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiYoutubeTag.js");
const YoutubeTag_1 = __webpack_require__(/*! ./Tags/YoutubeTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/YoutubeTag.js");
class ParserConfiguration {
    constructor() {
        this.Elements = [];
        this.Tags = [];
        this.Processors = [];
    }
    static Twhl() {
        const conf = new ParserConfiguration();
        // // Standard inline
        conf.Tags.push(new Tag_1.Tag('b', 'strong').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('i', 'em').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('u', 'span', 'underline').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('s', 'span', 'strikethrough').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('green', 'span', 'green').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('blue', 'span', 'blue').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('red', 'span', 'red').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('purple', 'span', 'purple').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('yellow', 'span', 'yellow').WithScopes('inline', 'excerpt'));
        // Standard block
        conf.Tags.push(new PreTag_1.PreTag());
        conf.Tags.push(new Tag_1.Tag('h', 'h3').WithBlock(true));
        // Links
        conf.Tags.push(new LinkTag_1.LinkTag().WithScopes('excerpt'));
        conf.Tags.push(new LinkTag_1.LinkTag().WithScopes('excerpt').WithToken('email'));
        conf.Tags.push(new QuickLinkTag_1.QuickLinkTag());
        conf.Tags.push(new WikiLinkTag_1.WikiLinkTag());
        conf.Tags.push(new WikiFileTag_1.WikiFileTag());
        // Embedded
        conf.Tags.push(new ImageTag_1.ImageTag());
        conf.Tags.push(new ImageTag_1.ImageTag().WithToken('simg').WithBlock(false));
        const wikiImageTag = new WikiImageTag_1.WikiImageTag();
        wikiImageTag.TwhlBehaviour = true;
        conf.Tags.push(wikiImageTag);
        conf.Tags.push(new YoutubeTag_1.YoutubeTag());
        conf.Tags.push(new WikiYoutubeTag_1.WikiYoutubeTag());
        conf.Tags.push(new VaultEmbedTag_1.VaultEmbedTag());
        // Custom
        conf.Tags.push(new QuoteTag_1.QuoteTag());
        conf.Tags.push(new FontTag_1.FontTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new WikiCategoryTag_1.WikiCategoryTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new WikiBookTag_1.WikiBookTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new WikiCreditTag_1.WikiCreditTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new WikiArchiveTag_1.WikiArchiveTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new SpoilerTag_1.SpoilerTag().WithScopes('inline', 'excerpt'));
        conf.Tags.push(new CodeTag_1.CodeTag().WithScopes('excerpt'));
        // Elements
        conf.Elements.push(new MdCodeElement_1.MdCodeElement());
        conf.Elements.push(new PreElement_1.PreElement());
        conf.Elements.push(new MdHeadingElement_1.MdHeadingElement());
        conf.Elements.push(new MdLineElement_1.MdLineElement());
        conf.Elements.push(new MdQuoteElement_1.MdQuoteElement());
        conf.Elements.push(new MdListElement_1.MdListElement());
        conf.Elements.push(new MdTableElement_1.MdTableElement());
        conf.Elements.push(new MdPanelElement_1.MdPanelElement());
        conf.Elements.push(new MdColumnsElement_1.MdColumnsElement());
        conf.Elements.push(new RefElement_1.RefElement());
        // Processors
        conf.Processors.push(new MarkdownTextProcessor_1.MarkdownTextProcessor());
        conf.Processors.push(new AutoLinkingProcessor_1.AutoLinkingProcessor());
        conf.Processors.push(new SmiliesProcessor_1.SmiliesProcessor('https://twhl.info/images/smilies/{0}.png').AddTwhl());
        conf.Processors.push(new TrimWhitespaceAroundBlockNodesProcessor_1.TrimWhitespaceAroundBlockNodesProcessor());
        conf.Processors.push(new NewLineProcessor_1.NewLineProcessor());
        return conf;
    }
    static Snarkpit() {
        const conf = new ParserConfiguration();
        // Standard inline
        conf.Tags.push(new Tag_1.Tag('b', 'strong').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('i', 'em').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('u', 'span', 'underline').WithScopes('inline', 'excerpt'));
        conf.Tags.push(new Tag_1.Tag('s', 'span', 'strikethrough').WithScopes('inline', 'excerpt'));
        // Standard block
        conf.Tags.push(new PreTag_1.PreTag());
        conf.Tags.push(new Tag_1.Tag('center', 'div', 'text-center').WithBlock(true));
        conf.Tags.push(new AlignTag_1.AlignTag());
        conf.Tags.push(new ListTag_1.ListTag());
        // Links
        conf.Tags.push(new LinkTag_1.LinkTag().WithScopes('excerpt'));
        conf.Tags.push(new LinkTag_1.LinkTag().WithScopes('excerpt').WithToken('email'));
        conf.Tags.push(new QuickLinkTag_1.QuickLinkTag());
        // Embedded
        conf.Tags.push(new ImageTag_1.ImageTag());
        conf.Tags.push(new ImageTag_1.ImageTag().WithToken('simg').WithBlock(false));
        conf.Tags.push(new WikiImageTag_1.WikiImageTag());
        conf.Tags.push(new YoutubeTag_1.YoutubeTag());
        conf.Tags.push(new WikiYoutubeTag_1.WikiYoutubeTag());
        // Custom
        conf.Tags.push(new QuoteTag_1.QuoteTag());
        conf.Tags.push(new ColorTag_1.ColorTag());
        conf.Tags.push(new SizeTag_1.SizeTag());
        conf.Tags.push(new SpoilerTag_1.SpoilerTag().WithScopes('inline', 'excerpt'));
        // Elements
        conf.Elements.push(new MdCodeElement_1.MdCodeElement());
        const preElement = new PreElement_1.PreElement();
        preElement.Token = 'code';
        conf.Elements.push(preElement);
        conf.Elements.push(new MdHeadingElement_1.MdHeadingElement());
        conf.Elements.push(new MdLineElement_1.MdLineElement());
        conf.Elements.push(new MdQuoteElement_1.MdQuoteElement());
        conf.Elements.push(new MdListElement_1.MdListElement());
        conf.Elements.push(new MdTableElement_1.MdTableElement());
        conf.Elements.push(new MdPanelElement_1.MdPanelElement());
        conf.Elements.push(new MdColumnsElement_1.MdColumnsElement());
        conf.Elements.push(new RefElement_1.RefElement());
        // Processors
        conf.Processors.push(new MarkdownTextProcessor_1.MarkdownTextProcessor());
        conf.Processors.push(new AutoLinkingProcessor_1.AutoLinkingProcessor());
        conf.Processors.push(new SmiliesProcessor_1.SmiliesProcessor('https://snarkpit.net/images/smilies/{0}.gif').AddSnarkpit());
        conf.Processors.push(new TrimWhitespaceAroundBlockNodesProcessor_1.TrimWhitespaceAroundBlockNodesProcessor());
        conf.Processors.push(new NewLineProcessor_1.NewLineProcessor());
        return conf;
    }
}
exports.ParserConfiguration = ParserConfiguration;
//# sourceMappingURL=ParserConfiguration.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/AutoLinkingProcessor.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/AutoLinkingProcessor.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoLinkingProcessor = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
class AutoLinkingProcessor {
    constructor() {
        this.Priority = 9;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShouldProcess(node, _scope) {
        return node instanceof PlainTextNode_1.PlainTextNode
            && (node.Text.includes('http') || node.Text.includes('@'));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Process(parser, data, node, _scope) {
        const text = node.Text;
        const ret = [];
        const allMatches = [];
        const urlMatcher = /(?<=^|\s)(?<url>https?:\/\/[^\][""\s]+)(?=\s|$)/ig;
        let urlMatch = urlMatcher.exec(text);
        while (urlMatch != null) {
            allMatches.push(urlMatch);
            urlMatch = urlMatcher.exec(text);
        }
        const emailMatcher = /(?<=^|\s)(?<email>[^\][""\s@]+@[^\][""\s@]+\.[^\][""\s@]+)(?=\s|$)/ig;
        let emailMatch = emailMatcher.exec(text);
        while (emailMatch != null) {
            allMatches.push(emailMatch);
            emailMatch = emailMatcher.exec(text);
        }
        allMatches.sort((a, b) => a.index - b.index);
        let start = 0;
        for (const urlMatch of allMatches) {
            if (urlMatch.index < start)
                continue;
            if (urlMatch.index > start)
                ret.push(new PlainTextNode_1.PlainTextNode(text.substring(start, urlMatch.index)));
            if (urlMatch.groups['url']) {
                const url = urlMatch.groups['url'];
                ret.push(new HtmlNode_1.HtmlNode(`<a href="${HtmlHelper_1.HtmlHelper.AttributeEncode(url)}">`, new PlainTextNode_1.PlainTextNode(url), '</a>'));
            }
            else if (urlMatch.groups['email']) {
                const email = urlMatch.groups['email'];
                ret.push(new HtmlNode_1.HtmlNode(`<a href="mailto:${HtmlHelper_1.HtmlHelper.AttributeEncode(email)}">`, new PlainTextNode_1.PlainTextNode(email), '</a>'));
            }
            start = urlMatch.index + urlMatch[0].length;
        }
        if (start < text.length)
            ret.push(new PlainTextNode_1.PlainTextNode(text.substring(start)));
        return ret;
    }
}
exports.AutoLinkingProcessor = AutoLinkingProcessor;
//# sourceMappingURL=AutoLinkingProcessor.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/MarkdownTextProcessor.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/MarkdownTextProcessor.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarkdownTextProcessor = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Util_1 = __webpack_require__(/*! ../Util */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Util.js");
class MarkdownTextProcessor {
    constructor() {
        this.Priority = 10;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShouldProcess(node, _scope) {
        return node instanceof PlainTextNode_1.PlainTextNode && (0, Util_1.IndexOfAny)(node.Text, MarkdownTextProcessor.Tokens) >= 0;
    }
    static GetTokenIndex(c) {
        return MarkdownTextProcessor.Tokens.indexOf(c);
    }
    static IsStartBreakChar(c) {
        return MarkdownTextProcessor.StartBreakChars.includes(c);
    }
    static IsEndBreakChar(c) {
        return MarkdownTextProcessor.StartBreakChars.includes(c) || MarkdownTextProcessor.ExtraEndBreakChars.includes(c) || MarkdownTextProcessor.Tokens.includes(c);
    }
    static ParseToken(tracker, text, position, endPositionObj) {
        endPositionObj.endPosition = -1;
        const token = text[position];
        const tokenIndex = MarkdownTextProcessor.GetTokenIndex(token);
        // Make sure we're not already in this token
        if (tracker[tokenIndex] != 0)
            return null;
        const endToken = text.indexOf(token, position + 1);
        if (endToken <= position + 1)
            return null;
        if (text.substring(position, endToken).indexOf('\n') >= 0)
            return null; // no newlines
        // Make sure we can close this token
        const valid = (endToken + 1 == text.length || MarkdownTextProcessor.IsEndBreakChar(text[endToken + 1])) // end of string or before an end breaker
            && text[endToken - 1].trim() != ''; // not whitespace previous
        if (!valid)
            return null;
        const str = text.substring(position + 1, endToken);
        tracker[tokenIndex] = 1;
        // code tokens cannot be nested
        let contents;
        if (token == '`') {
            contents = new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(str);
        }
        else {
            const toks = MarkdownTextProcessor.ParseTokens(tracker, str);
            contents = toks.length == 1 ? toks[0] : new NodeCollection_1.NodeCollection(...toks);
        }
        tracker[tokenIndex] = 0;
        endPositionObj.endPosition = endToken;
        const ret = new HtmlNode_1.HtmlNode(MarkdownTextProcessor.OpenTags[tokenIndex], contents, MarkdownTextProcessor.CloseTags[tokenIndex]);
        ret.PlainBefore = token;
        ret.PlainAfter = token;
        return ret;
    }
    static ParseTokens(tracker, text) {
        const ret = [];
        let plainStart = 0;
        let index = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const nextIndex = (0, Util_1.IndexOfAny)(text, MarkdownTextProcessor.Tokens, index);
            if (nextIndex < 0)
                break;
            // Make sure we can start a new token
            const valid = (nextIndex == 0 || MarkdownTextProcessor.IsStartBreakChar(text[nextIndex - 1])) // start of string or after a start breaker
                && nextIndex + 1 < text.length // not end of string
                && text[nextIndex + 1].trim() != ''; // not whitespace next
            if (!valid) {
                index = nextIndex + 1;
                continue;
            }
            const endIndexObj = { endPosition: -1 };
            const parsed = MarkdownTextProcessor.ParseToken(tracker, text, nextIndex, endIndexObj);
            if (parsed == null) {
                index = nextIndex + 1; // no match, skip this token
            }
            else {
                if (plainStart < nextIndex)
                    ret.push(new PlainTextNode_1.PlainTextNode(text.substring(plainStart, nextIndex)));
                ret.push(parsed);
                index = plainStart = endIndexObj.endPosition + 1;
            }
        }
        // Return the rest of the text as plain
        if (plainStart < text.length)
            ret.push(new PlainTextNode_1.PlainTextNode(text.substring(plainStart)));
        return ret;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Process(_parser, _data, node, _scope) {
        const text = node.Text;
        const ret = [];
        const nextIndex = (0, Util_1.IndexOfAny)(text, MarkdownTextProcessor.Tokens, 0);
        if (nextIndex < 0) {
            // Short circuit
            ret.push(node);
            return ret;
        }
        /*
            * Like everything else here, this isn't exactly markdown, but it's close.
            * _underline_
            * /italics/
            * *bold*
            * ~strikethrough~
            * `code`
            * Very simple rules: no newlines, must start/end on a word boundary, code tags cannot be nested
            */
        // pre-condition: start of a line OR one of: !?^()+=[]{}"'<>,. OR whitespace
        // first and last character is NOT whitespace. everything else is fine except for newlines
        // post-condition: end of a line OR one of: !?^()+=[]{}"'<>,.:; OR whitespace
        const tracker = MarkdownTextProcessor.Tokens.map(() => 0);
        for (const token of MarkdownTextProcessor.ParseTokens(tracker, text)) {
            ret.push(token);
        }
        return ret;
    }
}
exports.MarkdownTextProcessor = MarkdownTextProcessor;
MarkdownTextProcessor.Tokens = Array.from('`*/_~');
MarkdownTextProcessor.OpenTags = ['<code>', '<strong>', '<em>', '<span class="underline">', '<span class="strikethrough">'];
MarkdownTextProcessor.CloseTags = ['</code>', '</strong>', '</em>', '</span>', '</span>'];
MarkdownTextProcessor.StartBreakChars = Array.from('!^()+=[]{}"\'<>?,. \t\r\n');
MarkdownTextProcessor.ExtraEndBreakChars = Array.from(':;');
//# sourceMappingURL=MarkdownTextProcessor.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/NewLineProcessor.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/NewLineProcessor.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewLineProcessor = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
class NewLineProcessor {
    constructor() {
        this.Priority = 1;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShouldProcess(node, _scope) {
        return node instanceof PlainTextNode_1.PlainTextNode && (node.Text.includes('\n') || node.Text.includes('<br>'));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Process(parser, data, node, _scope) {
        let text = node.Text;
        text = text.replace(/ *<br> */g, '\n');
        const ret = [];
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            ret.push(new PlainTextNode_1.PlainTextNode(line));
            // Don't emit a line break after the final line of the text as it did not end with a newline
            if (i < lines.length - 1)
                ret.push(new HtmlNode_1.HtmlNode('<br/>', UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.NewLine(), ''));
        }
        return ret;
    }
}
exports.NewLineProcessor = NewLineProcessor;
//# sourceMappingURL=NewLineProcessor.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/SmiliesProcessor.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/SmiliesProcessor.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SmiliesProcessor = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Util_1 = __webpack_require__(/*! ../Util */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Util.js");
class SmileyDefinition {
    constructor(name, tokens) {
        this.Name = name;
        this.Tokens = tokens;
    }
    GetMatchingToken(text, startIndex) {
        for (const token of this.Tokens) {
            if (text.indexOf(token, startIndex) == startIndex)
                return token;
        }
        return null;
    }
}
class SmiliesProcessor {
    constructor(urlFormatString) {
        this.Priority = 5;
        this.UrlFormatString = urlFormatString;
        this._definitions = [];
        this._initialised = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShouldProcess(node, _scope) {
        return node instanceof PlainTextNode_1.PlainTextNode && this._definitions.length > 0;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Process(_parser, _data, node, _scope) {
        if (!this._initialised) {
            this._tokenStarts = new Set(this._definitions.flatMap(x => x.Tokens).map(x => x[0]));
            this._initialised = true;
        }
        const ret = [];
        const text = node.Text;
        let start = 0;
        let index = -1;
        let numSmilies = 0;
        while (index + 1 < text.length && (index = (0, Util_1.IndexOfAny)(text, this._tokenStarts, index + 1)) >= 0) {
            if (numSmilies > SmiliesProcessor.MaxSmilies) {
                ret.push(new HtmlNode_1.HtmlNode('<em class="text-danger">', new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(' [warning: too many smilies in post] '), '</em>'));
                break;
            }
            // Must start with whitespace
            if (index != 0 && text[index - 1].trim() != '')
                continue;
            // Find an appropriate definition
            let definition = null;
            let token = null;
            for (const def of this._definitions) {
                token = def.GetMatchingToken(text, index);
                if (token == null)
                    continue;
                definition = def;
                break;
            }
            if (definition == null)
                continue;
            // Must end with whitespace
            if (index + token.length < text.length - 1 && text[index + token.length].trim() != '')
                continue;
            // We have a smiley
            if (start < index)
                ret.push(new PlainTextNode_1.PlainTextNode(text.substring(start, index)));
            const src = HtmlHelper_1.HtmlHelper.AttributeEncode((0, Util_1.Template)(this.UrlFormatString, { 0: definition.Name }));
            const alt = HtmlHelper_1.HtmlHelper.AttributeEncode(token);
            const node = new HtmlNode_1.HtmlNode(`<img class="smiley" src="${src}" alt="${alt}" />`, PlainTextNode_1.PlainTextNode.Empty(), '');
            node.PlainBefore = token;
            ret.push(node);
            start = index + token.length;
            index += token.length;
            numSmilies++;
        }
        if (start < text.length)
            ret.push(new PlainTextNode_1.PlainTextNode(text.substring(start)));
        return ret;
    }
    Add(name, ...tokens) {
        this._definitions.push(new SmileyDefinition(name, tokens));
        this._initialised = false;
        return this;
    }
    AddTwhl() {
        this.Add('aggrieved', ':aggrieved:');
        this.Add('aghast', ':aghast:');
        this.Add('angry', ':x', ':-x', ':angry:');
        this.Add('badass', ':badass:');
        this.Add('confused', ':confused:');
        this.Add('cry', ':cry:');
        this.Add('cyclops', ':cyclops:');
        this.Add('lol', ':lol:');
        this.Add('frown', ':|', ':-|', ':frown:');
        this.Add('furious', ':furious:');
        this.Add('glad', ':glad:');
        this.Add('heart', ':heart:');
        this.Add('grin', ':D', ':-D', ':grin:');
        this.Add('nervous', ':nervous:');
        this.Add('nuke', ':nuke:');
        this.Add('nuts', ':nuts:');
        this.Add('quizzical', ':quizzical:');
        this.Add('rollseyes', ':roll:', ':rollseyes:');
        this.Add('sad', ':(', ':-(', ':sad:');
        this.Add('smile', ':)', ':-)', ':smile:');
        this.Add('surprised', ':o', ':-o', ':surprised:');
        this.Add('thebox', ':thebox:');
        this.Add('thefinger', ':thefinger:');
        this.Add('tired', ':tired:');
        this.Add('tongue', ':P', ':-P', ':tongue:');
        this.Add('toocool', ':cool:');
        this.Add('unsure', ':\\', ':-\\', ':unsure:');
        this.Add('biggrin', ':biggrin:');
        this.Add('wink', ';)', ';-)', ':wink:');
        this.Add('zonked', ':zonked:');
        this.Add('sarcastic', ':sarcastic:');
        this.Add('combine', ':combine:', ':elite:');
        this.Add('gak', ':gak:');
        this.Add('animehappy', ':^_^:');
        this.Add('pwnt', ':pwned:');
        this.Add('target', ':target:');
        this.Add('ninja', ':ninja:');
        this.Add('hammer', ':hammer:');
        this.Add('pirate', ':pirate:', ':yar:');
        this.Add('walter', ':walter:');
        this.Add('plastered', ':plastered:');
        this.Add('bigmouth', ':zomg:');
        this.Add('brokenheart', ':heartbreak:');
        this.Add('ciggiesmilie', ':ciggie:');
        this.Add('combines', ':combines:');
        this.Add('crowbar', ':crowbar:');
        this.Add('death', ':death:');
        this.Add('freeman', ':freeman:');
        this.Add('hecu', ':hecu:');
        this.Add('nya', ':nya:');
        return this;
    }
    AddSnarkpit() {
        this.Add('icon_biggrin', ':D');
        this.Add('sailor', ':sailor:');
        this.Add('icon_smile', ':)', ':-)');
        this.Add('dorky', ':geek:');
        this.Add('sad0019', ':(');
        this.Add('icon_eek', ':-o');
        this.Add('grenade', ':grenade:');
        this.Add('confused', ':confused:');
        this.Add('icon_cool', '-)');
        this.Add('kitty', 'k1tt3h:');
        this.Add('laughing', ':lol:');
        this.Add('leper', ':leper:');
        this.Add('mad', ':mad:');
        this.Add('tongue0010', ':p');
        this.Add('popcorn', ':popcorn:');
        this.Add('icon_redface', ':oops:');
        this.Add('icon_cry', ':cry:');
        this.Add('icon_twisted', ':evil:');
        this.Add('rolleye0011', ':roll:');
        this.Add('shocked', ':scream:');
        this.Add('icon_wink', '];)');
        this.Add('dead', ':dead:');
        this.Add('pimp', ':pimp:');
        this.Add('beerchug', ':beer:');
        this.Add('chainsaw', ':chainsaw:');
        this.Add('arse', ':moonie:');
        this.Add('angel', ':angel:');
        this.Add('bday', ':bday:');
        this.Add('clap', ':clap:');
        this.Add('computer', ':computer:');
        this.Add('crash', ':pccrash:');
        this.Add('dizzy', ':dizzy:');
        this.Add('dodgy', ':naughty:');
        this.Add('drink', ':drink:');
        this.Add('facelick', ':lick:');
        this.Add('frown', '>:(');
        this.Add('heee', ':hee:');
        this.Add('imwithstupid', ':imwithstupid:');
        this.Add('jawdrop', ':jawdrop:');
        this.Add('king', ':king:');
        this.Add('ladysman', ':ladysman:');
        this.Add('mrT', ':mrt:');
        this.Add('nurse', ':nurse:');
        this.Add('outtahere', ':outtahere:');
        this.Add('aaatrigger', ':aaatrigger:');
        this.Add('repuke', ':repuke:');
        this.Add('rofl', ':rofl:');
        this.Add('rolling', ':rolling2:');
        this.Add('santa', ':santa:');
        this.Add('smash', ':smash:');
        this.Add('toilet', ':toilet:');
        this.Add('44', '~o)');
        this.Add('wavey', ':wavey:');
        this.Add('upyours', ':stfu:');
        this.Add('fart', ':fart:');
        this.Add('trout', ':trout:');
        this.Add('ar15firing', ':machinegun:');
        this.Add('microwave', ':microwave:');
        this.Add('guillotine', ':guillotine:');
        this.Add('poke', ':poke:');
        this.Add('sniper', ':sniper:');
        this.Add('monkee', ':monkee:');
        this.Add('bandit', ':gringo:');
        this.Add('wtf', ':wtf:');
        this.Add('azelito', ':azelito:');
        this.Add('crate', ':crate:');
        this.Add('argh', ':-&');
        this.Add('swear', ':swear:');
        this.Add('rocketwhore', ':launcher:');
        this.Add('skull', ':skull:');
        this.Add('munky', ':munky:');
        this.Add('evilgrin', ':E');
        this.Add('banghead', ':brickwall:');
        this.Add('wcc', ':wcc:');
        this.Add('smiley_sherlock', ':sherlock:');
        this.Add('nag', ':nag:');
        this.Add('rolling_eyes', ':rolling:');
        this.Add('angryfire', ':flame:');
        this.Add('character', ':ghost:');
        this.Add('character0007', ':pirate:');
        this.Add('indifferent0016', ':zzz:');
        this.Add('indifferent0002', ':|');
        this.Add('love0012', ':love:');
        this.Add('rolleye0006', ':lookup:');
        this.Add('sad0006', '];(');
        this.Add('scared0005', ':scared:');
        this.Add('flail', ':flail:');
        this.Add('emot-cowjump', ':cowjump:');
        this.Add('emot-eng101', ':teach:');
        this.Add('uncertain', ':uncertain:');
        this.Add('1sm071potstir', ':stirring:');
        this.Add('thumbs_up', ':thumbsup:');
        this.Add('happy_open', ':happy:');
        this.Add('snark_topic_icon', ':snark:');
        return this;
    }
}
exports.SmiliesProcessor = SmiliesProcessor;
SmiliesProcessor.MaxSmilies = 100;
//# sourceMappingURL=SmiliesProcessor.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/TrimWhitespaceAroundBlockNodesProcessor.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Processors/TrimWhitespaceAroundBlockNodesProcessor.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrimWhitespaceAroundBlockNodesProcessor = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
class TrimWhitespaceAroundBlockNodesProcessor {
    constructor() {
        this.Priority = 20;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ShouldProcess(node, _scope) {
        return node instanceof NodeCollection_1.NodeCollection;
    }
    Process(parser, data, node, scope) {
        const coll = node;
        const ret = [];
        let trimStart = false;
        for (let i = 0; i < coll.Nodes.length; i++) {
            let child = coll.Nodes[i];
            const next = i < coll.Nodes.length - 1 ? coll.Nodes[i + 1] : null;
            if (child instanceof PlainTextNode_1.PlainTextNode) {
                let text = child.Text;
                if (trimStart)
                    text = text.trimStart();
                if (next instanceof HtmlNode_1.HtmlNode && next.IsBlockNode)
                    text = text.trimEnd();
                child.Text = text;
            }
            child = parser.RunProcessor(child, this, data, scope);
            if (child instanceof HtmlNode_1.HtmlNode && child.IsBlockNode) {
                trimStart = true;
                ret.push(UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.NewLine());
                ret.push(child);
                ret.push(UnprocessablePlainTextNode_1.UnprocessablePlainTextNode.NewLine());
            }
            else {
                trimStart = false;
                ret.push(child);
            }
        }
        return ret;
    }
}
exports.TrimWhitespaceAroundBlockNodesProcessor = TrimWhitespaceAroundBlockNodesProcessor;
//# sourceMappingURL=TrimWhitespaceAroundBlockNodesProcessor.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/State.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/State.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.State = void 0;
class State {
    constructor(text) {
        this.Text = text;
        this.Index = 0;
    }
    get Length() {
        return this.Text.length;
    }
    get Done() {
        return this.Index >= this.Length;
    }
    ScanTo(find, ignoreCase = false) {
        let pos = ignoreCase
            ? this.Text.toLowerCase().indexOf(find.toLowerCase(), this.Index)
            : this.Text.indexOf(find, this.Index);
        if (pos < 0)
            pos = this.Length;
        const ret = this.Text.substring(this.Index, pos);
        this.Index = pos;
        return ret;
    }
    SkipWhitespace() {
        while (this.Index < this.Length && this.Text[this.Index].trim() == '')
            this.Index++;
    }
    PeekTo(find) {
        const pos = this.Text.indexOf(find, this.Index);
        if (pos < 0)
            return null;
        return this.Text.substring(this.Index, pos);
    }
    Seek(index, fromStart) {
        this.Index = fromStart ? index : this.Index + index;
    }
    Peek(count) {
        if (this.Index + count > this.Length)
            count = this.Length - this.Index;
        return this.Text.substring(this.Index, this.Index + count);
    }
    Next() {
        if (this.Index >= this.Length)
            return '\0';
        return this.Text[this.Index++];
    }
    GetToken() {
        if (this.Done || this.Text[this.Index] != '[')
            return null;
        let found = false;
        let tok = '';
        for (let i = this.Index + 1; i < Math.min(this.Index + 10, this.Length); i++) {
            const c = this.Text[i];
            if (c == ' ' || c == '=' || c == ']') {
                found = tok.length > 0;
                break;
            }
            tok += c;
        }
        return found ? tok.toLowerCase() : null;
    }
}
exports.State = State;
//# sourceMappingURL=State.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagParseContext = void 0;
var TagParseContext;
(function (TagParseContext) {
    TagParseContext[TagParseContext["Block"] = 0] = "Block";
    TagParseContext[TagParseContext["Inline"] = 1] = "Inline";
})(TagParseContext = exports.TagParseContext || (exports.TagParseContext = {}));
//# sourceMappingURL=TagParseContext.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/AlignTag.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/AlignTag.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AlignTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class AlignTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'align';
        this.Element = 'div';
        this.MainOption = 'align';
        this.Options = ['align'];
        this.AllOptionsInMain = true;
        this.IsBlock = true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        let cls = (this.ElementClass || '') + ' ';
        if (options['align'] && AlignTag.IsValidAlign(options['align'])) {
            cls += 'text-' + AlignTag.ConvertAlign(options['align']);
        }
        before += ' class="' + cls.trim() + '">';
        const content = parser.ParseTags(data, text, scope, this.TagContext());
        const after = '</' + this.Element + '>';
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.IsBlockNode = true;
        return ret;
    }
    static IsValidAlign(text) {
        return text == 'left' || text == 'right' || text == 'center';
    }
    static ConvertAlign(text) {
        if (text == 'left')
            return 'start';
        if (text == 'right')
            return 'end';
        return 'center';
    }
}
exports.AlignTag = AlignTag;
//# sourceMappingURL=AlignTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/CodeTag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/CodeTag.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class CodeTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'code';
        this.Element = 'code';
    }
    FormatResult(_parser, _data, _state, _scope, _options, text) {
        return new HtmlNode_1.HtmlNode('<code>', new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(text), '</code>');
    }
}
exports.CodeTag = CodeTag;
//# sourceMappingURL=CodeTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ColorTag.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ColorTag.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorTag = void 0;
const Colours_1 = __webpack_require__(/*! ../Colours */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Colours.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class ColorTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'color';
        this.Element = 'span';
        this.MainOption = 'color';
        this.Options = ['color'];
        this.AllOptionsInMain = true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        if (options['color'] || options['colour']) {
            before += ' style="';
            if (options['color'] && Colours_1.Colours.IsValidColor(options['color']))
                before += 'color: ' + options['color'] + '; ';
            else if (options['colour'] && Colours_1.Colours.IsValidColor(options['colour']))
                before += 'color: ' + options['colour'] + '; ';
            before = before.trimEnd() + '"';
        }
        before += '>';
        const content = parser.ParseTags(data, text, scope, this.TagContext());
        const after = '</' + this.Element + '>';
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
}
exports.ColorTag = ColorTag;
//# sourceMappingURL=ColorTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/FontTag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/FontTag.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontTag = void 0;
const Colours_1 = __webpack_require__(/*! ../Colours */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Colours.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class FontTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'font';
        this.Element = 'span';
        this.MainOption = 'color';
        this.Options = ['color', 'colour', 'size'];
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        if (options['color'] || options['colour'] || options['size']) {
            before += ' style="';
            if (options['color'] && Colours_1.Colours.IsValidColor(options['color']))
                before += 'color: ' + options['color'] + '; ';
            else if (options['colour'] && Colours_1.Colours.IsValidColor(options['colour']))
                before += 'color: ' + options['colour'] + '; ';
            if (options['size'] && FontTag.IsValidSize(options['size']))
                before += 'font-size: ' + options['size'] + 'px; ';
            before = before.trimEnd() + '"';
        }
        before += '>';
        const content = parser.ParseTags(data, text, scope, this.TagContext());
        const after = '</' + this.Element + '>';
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
    static IsValidSize(text) {
        var _a;
        const num = (_a = parseInt(text, 10)) !== null && _a !== void 0 ? _a : 0;
        return num >= 6 && num <= 40;
    }
}
exports.FontTag = FontTag;
//# sourceMappingURL=FontTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ImageTag.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ImageTag.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class ImageTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'img';
        this.Element = 'div';
        this.MainOption = 'url';
        this.Options = ['url'];
        this.IsBlock = true;
    }
    FormatResult(_parser, _data, state, _scope, options, text) {
        let url = text;
        if (options['url'])
            url = options['url'];
        if (!url.match(/^([a-z]{2,10}:\/\/)/i))
            url = 'http://' + url;
        url = HtmlHelper_1.HtmlHelper.AttributeEncode(url);
        const classes = ['embedded', 'image'];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        let element = this.Element;
        if (!this.IsBlock) {
            element = 'span';
            classes.push('inline');
        }
        else {
            state.SkipWhitespace();
        }
        const before = `<${element} class="${classes.join(' ')}">` +
            '<span class="caption-panel">' +
            `<img class="caption-body" src="${url}" alt="User posted image" />`;
        const after = `</span></${element}>`;
        const plainsp = element == 'div' ? '\n' : '';
        const ret = new HtmlNode_1.HtmlNode(before, PlainTextNode_1.PlainTextNode.Empty(), after);
        ret.PlainBefore = `${plainsp}[User posted image]${plainsp}`;
        ret.IsBlockNode = element == 'div';
        return ret;
    }
    Validate(options, text) {
        let url = text;
        if (options['url'])
            url = options['url'];
        return !url.includes('<script') && url.match(/^([a-z]{2,10}:\/\/)?([^\]"\n ]+?)$/i) != null;
    }
}
exports.ImageTag = ImageTag;
//# sourceMappingURL=ImageTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/LinkTag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/LinkTag.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class LinkTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'url';
        this.Element = 'a';
        this.MainOption = 'url';
        this.Options = ['url'];
    }
    FormatResult(parser, data, state, scope, options, text) {
        let url = text;
        if (options['url'])
            url = options['url'];
        if (this.Token == 'email')
            url = 'mailto:' + url;
        else if (!url.match(/^([a-z]{2,10}:\/\/)/i))
            url = 'http://' + url;
        url = HtmlHelper_1.HtmlHelper.AttributeEncode(url);
        const classes = [];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        const before = `<${this.Element} ` + (classes.length > 0 ? `class="${classes.join(' ')}" ` : '') + `href="${url}">`;
        const after = `</${this.Element}>`;
        const content = options['url']
            ? parser.ParseTags(data, text, scope, this.TagContext())
            : new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(text);
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
    Validate(options, text) {
        let url = text;
        if (options['url'])
            url = options['url'];
        return !url.includes('<script') && url.match(/^([a-z]{2,10}:\/\/)?([^\]"\n ]+?)$/i) != null;
    }
}
exports.LinkTag = LinkTag;
//# sourceMappingURL=LinkTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ListTag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/ListTag.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class ListTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'list';
        this.Element = 'ul';
        this.IsBlock = true;
    }
    Validate(options, text) {
        const items = text.split('[*]')
            .map(x => x.trim())
            .filter(x => (x === null || x === void 0 ? void 0 : x.length) > 0);
        return super.Validate(options, text) && items.length > 0;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        before += '>\n';
        const content = new NodeCollection_1.NodeCollection();
        const items = text.split('[*]')
            .map(x => x.trim())
            .filter(x => (x === null || x === void 0 ? void 0 : x.length) > 0);
        for (const item of items) {
            const node = new HtmlNode_1.HtmlNode('<li>', parser.ParseTags(data, item, scope, this.TagContext()), '</li>\n');
            node.PlainBefore = '* ';
            node.PlainAfter = '\n';
            content.Nodes.push(node);
        }
        const after = '</' + this.Element + '>';
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.IsBlockNode = true;
        return ret;
    }
}
exports.ListTag = ListTag;
//# sourceMappingURL=ListTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/PreTag.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/PreTag.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PreTag = void 0;
const PreElement_1 = __webpack_require__(/*! ../Elements/PreElement */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Elements/PreElement.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class PreTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'pre';
        this.Element = 'pre';
        this.IsBlock = true;
    }
    FormatResult(_parser, _data, _state, _scope, _options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        before += '><code>';
        const after = '</code></' + this.Element + '>';
        let arr = text.split('\n');
        // Trim blank lines from the start and end of the array
        for (let i = 0; i < 2; i++) {
            while (arr.length > 0 && arr[0].trim() == '')
                arr.splice(0, 1);
            arr.reverse();
        }
        arr = PreElement_1.PreElement.FixCodeIndentation(arr);
        text = arr.join('\n');
        const ret = new HtmlNode_1.HtmlNode(before, new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(text), after);
        ret.IsBlockNode = true;
        return ret;
    }
}
exports.PreTag = PreTag;
//# sourceMappingURL=PreTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuickLinkTag.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuickLinkTag.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuickLinkTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ../Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class QuickLinkTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = 'a';
        this.MainOption = 'url';
        this.Options = ['url'];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        let pt = state.PeekTo(']');
        if (!pt || pt == '')
            return false;
        pt = pt.substring(1);
        return pt.length > 0 && !pt.includes('\n') && pt.match(/^([a-z]{2,10}:\/\/[^\]]*?)(?:\|([^\]]*?))?/i) != null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        var _a, _b;
        const index = state.Index;
        if (state.Next() != '[') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const match = str.match(/^([a-z]{2,10}:\/\/[^\]]*?)(?:\|([^\]]*?))?$/i);
        if (!match) {
            state.Seek(index, true);
            return null;
        }
        let url = match[1];
        const text = ((_a = match[2]) === null || _a === void 0 ? void 0 : _a.length) > 0 ? match[2] : url;
        const options = { url };
        if (!this.Validate(options, text)) {
            state.Seek(index, true);
            return null;
        }
        url = HtmlHelper_1.HtmlHelper.AttributeEncode(url);
        const before = `<${this.Element} href="${url}">`;
        const after = `</${this.Element}>`;
        const content = new UnprocessablePlainTextNode_1.UnprocessablePlainTextNode(text);
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.PlainAfter = ((_b = match[2]) === null || _b === void 0 ? void 0 : _b.length) > 0 ? ` (${url})` : '';
        return ret;
    }
    Validate(options, text) {
        let url = text;
        if (options['url'])
            url = options['url'];
        return !url.includes('<script') && url.match(/^([a-z]{2,10}:\/\/)?([^\]""\n ]+?)/i) != null;
    }
}
exports.QuickLinkTag = QuickLinkTag;
//# sourceMappingURL=QuickLinkTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuoteTag.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/QuoteTag.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuoteTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class QuoteTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'quote';
        this.Element = 'blockquote';
        this.MainOption = 'name';
        this.Options = ['name'];
        this.AllOptionsInMain = true;
        this.IsBlock = true;
        this.IsNested = true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        before += '>';
        if (options['name']) {
            before += '<strong class="quote-name">' + options['name'] + ' said:</strong><br/>';
        }
        const after = '</' + this.Element + '>';
        const content = parser.ParseTags(data, text === null || text === void 0 ? void 0 : text.trim(), scope, this.TagContext());
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.PlainBefore = (options['name'] ? options['name'] + ' said: ' : '') + '[quote]\n';
        ret.PlainAfter = '\n[/quote]';
        ret.IsBlockNode = this.IsBlock;
        return ret;
    }
}
exports.QuoteTag = QuoteTag;
//# sourceMappingURL=QuoteTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SizeTag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SizeTag.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SizeTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const FontTag_1 = __webpack_require__(/*! ./FontTag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/FontTag.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class SizeTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'size';
        this.Element = 'span';
        this.MainOption = 'size';
        this.Options = ['size'];
        this.AllOptionsInMain = true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        if (options['size']) {
            before += ' style="';
            if (options['size'] && FontTag_1.FontTag.IsValidSize(options['size']))
                before += 'font-size: ' + options['size'] + 'px; ';
            before = before.trimEnd() + '"';
        }
        before += '>';
        const content = parser.ParseTags(data, text, scope, this.TagContext());
        const after = '</' + this.Element + '>';
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
}
exports.SizeTag = SizeTag;
//# sourceMappingURL=SizeTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SpoilerTag.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/SpoilerTag.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpoilerTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class SpoilerNode {
    constructor(visibleText, spoilerContent) {
        this.VisibleText = visibleText;
        this.SpoilerContent = spoilerContent;
    }
    ToHtml() {
        return this.SpoilerContent.ToHtml();
    }
    ToPlainText() {
        return `[${this.VisibleText}](spoiler text)`;
    }
    GetChildren() {
        return [this.SpoilerContent];
    }
    ReplaceChild(i, node) {
        if (i != 0)
            throw new Error('Argument out of range');
        this.SpoilerContent = node;
    }
    HasContent() {
        return true;
    }
}
class SpoilerTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'spoiler';
        this.Element = 'span';
        this.ElementClass = 'spoiler';
        this.MainOption = 'text';
        this.Options = ['text'];
        this.AllOptionsInMain = true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let visibleText = 'Spoiler';
        if (options['text'] && options['text'].length > 0)
            visibleText = options['text'];
        let before = `<${this.Element}`;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        before += ` title="${visibleText}">`;
        const after = `</${this.Element}>`;
        return new HtmlNode_1.HtmlNode(before, new SpoilerNode(visibleText, parser.ParseTags(data, text, scope, this.TagContext())), after);
    }
}
exports.SpoilerTag = SpoilerTag;
//# sourceMappingURL=SpoilerTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
class Tag {
    constructor(token = '', element = '', elementClass = null) {
        this.Priority = 0;
        this.Token = token;
        this.Element = element;
        this.ElementClass = elementClass;
        this.Options = [];
        this.Scopes = [];
    }
    TagContext() {
        return this.IsBlock ? TagParseContext_1.TagParseContext.Block : TagParseContext_1.TagParseContext.Inline;
    }
    InScope(scope) {
        return !scope
            || scope.trim() == ''
            || this.Scopes.includes(scope);
    }
    Matches(state, token, context) {
        return (token === null || token === void 0 ? void 0 : token.toLowerCase()) == this.Token && (context == TagParseContext_1.TagParseContext.Block || !this.IsBlock);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(parser, data, state, scope, context) {
        const index = state.Index;
        const tokenLength = this.Token.length;
        state.Seek(tokenLength + 1, false);
        let optionsString = state.ScanTo(']').trim();
        if (state.Next() != ']') {
            state.Seek(index, true);
            console.log(1);
            return null;
        }
        const options = {};
        if (optionsString.length > 0) {
            if (optionsString[0] == '=' && this.AllOptionsInMain && this.MainOption != null) {
                options[this.MainOption] = optionsString.substring(1);
            }
            else {
                if (optionsString[0] == '=')
                    optionsString = this.MainOption + optionsString;
                const myregexp = /(?=\s|^)\s*([^ ]+?)=([^\s]*)(?=\s|$)(?!=)/img;
                let m = myregexp.exec(optionsString);
                while (m != null) {
                    const name = m[1].trim();
                    const value = m[2].trim();
                    options[name] = value;
                    m = myregexp.exec(optionsString);
                }
            }
        }
        if (this.IsNested) {
            let stack = 1;
            let text = '';
            while (!state.Done) {
                text += state.ScanTo('[');
                const tok = state.GetToken();
                if (tok.toLowerCase() == this.Token.toLowerCase())
                    stack++;
                if (tok.toLowerCase() == '/' + this.Token.toLowerCase() && state.Peek(tokenLength + 3).trim() == '[/' + this.Token.toLowerCase() + ']')
                    stack--;
                if (stack == 0) {
                    state.Seek(this.Token.length + 3, false);
                    if (!this.Validate(options, text))
                        break;
                    return this.FormatResult(parser, data, state, scope, options, text);
                }
                text += state.Next();
            }
            state.Seek(index, true);
            console.log(2);
            return null;
        }
        else {
            const text = state.ScanTo('[/' + this.Token + ']', true);
            if (state.Peek(tokenLength + 3).trim() == '[/' + this.Token.toLowerCase() + ']' && this.Validate(options, text)) {
                state.Seek(this.Token.length + 3, false);
                return this.FormatResult(parser, data, state, scope, options, text);
            }
            else {
                state.Seek(index, true);
                console.log(3);
                return null;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Validate(options, text) {
        return true;
    }
    FormatResult(parser, data, state, scope, options, text) {
        let before = '<' + this.Element;
        if (this.ElementClass != null)
            before += ' class="' + this.ElementClass + '"';
        before += '>';
        const after = '</' + this.Element + '>';
        const content = parser.ParseTags(data, text, scope, this.TagContext());
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.IsBlockNode = this.IsBlock;
        return ret;
    }
    // Extensions
    WithScopes(...scopes) {
        this.Scopes = scopes;
        return this;
    }
    WithToken(token) {
        this.Token = token;
        return this;
    }
    WithElement(element) {
        this.Element = element;
        return this;
    }
    WithElementClass(elementClass) {
        this.ElementClass = elementClass;
        return this;
    }
    WithBlock(isBlock) {
        this.IsBlock = isBlock;
        return this;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/VaultEmbedTag.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/VaultEmbedTag.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VaultEmbedTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class VaultEmbedTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Element = 'div';
        this.MainOption = 'id';
        this.Options = ['id'];
    }
    Matches(state, _token, context) {
        const peekTag = state.Peek(7);
        const pt = state.PeekTo(']');
        return context == TagParseContext_1.TagParseContext.Block && peekTag == '[vault:' && (pt === null || pt === void 0 ? void 0 : pt.length) > 7 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.ScanTo(':') != '[vault' || state.Next() != ':') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const id = parseInt(str, 10);
        if (!id) {
            state.Seek(index, true);
            return null;
        }
        const classes = ['embedded', 'vault'];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        state.SkipWhitespace();
        const before = `<div class="${classes.join(' ')}">` +
            '<div class="embed-container">' +
            '<div class="embed-content">' +
            `<div class="uninitialised" data-embed-type="vault" data-vault-id="${id}">` +
            `Loading embedded content: Vault Item #${id}`;
        const after = '</div></div></div></div>';
        const ret = new HtmlNode_1.HtmlNode(before, PlainTextNode_1.PlainTextNode.Empty(), after);
        ret.PlainBefore = `[TWHL vault item #${id}]`;
        ret.PlainAfter = '\n';
        ret.IsBlockNode = true;
        return ret;
    }
}
exports.VaultEmbedTag = VaultEmbedTag;
//# sourceMappingURL=VaultEmbedTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiArchiveTag.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiArchiveTag.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiArchiveTag = void 0;
const WikiRevisionCredit_1 = __webpack_require__(/*! ../Models/WikiRevisionCredit */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionCredit.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiArchiveTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const peekTag = state.Peek(9);
        const pt = state.PeekTo(']');
        return peekTag == '[archive:' && pt != null && pt.length > 9 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.Next() != '[') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const credit = new WikiRevisionCredit_1.WikiRevisionCredit();
        credit.Type = WikiRevisionCredit_1.WikiRevisionCredit.TypeArchive;
        const sections = str.split('|');
        for (const section of sections) {
            const spl = section.split(':');
            const key = spl[0];
            const val = spl.length > 1 ? spl.slice(1).join(':') : '';
            switch (key) {
                case 'archive':
                    credit.Name = val;
                    break;
                case 'description':
                    credit.Description = val;
                    break;
                case 'url':
                    credit.Url = val;
                    break;
                case 'wayback':
                    credit.WaybackUrl = val;
                    break;
                case 'full':
                    credit.Type = WikiRevisionCredit_1.WikiRevisionCredit.TypeFull;
                    break;
            }
        }
        if (credit.WaybackUrl != null && credit.Url != null && !credit.WaybackUrl.startsWith('http://') && !credit.WaybackUrl.startsWith('https://') && parseInt(credit.WaybackUrl, 10)) {
            credit.WaybackUrl = `https://web.archive.org/web/${credit.WaybackUrl}/${credit.Url}`;
        }
        state.SkipWhitespace();
        return new MetadataNode_1.MetadataNode('WikiCredit', credit);
    }
}
exports.WikiArchiveTag = WikiArchiveTag;
//# sourceMappingURL=WikiArchiveTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiBookTag.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiBookTag.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiBookTag = void 0;
const WikiRevisionBook_1 = __webpack_require__(/*! ../Models/WikiRevisionBook */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionBook.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiBookTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const peekTag = state.Peek(6);
        const pt = state.PeekTo(']');
        return peekTag == '[book:' && pt != null && pt.length > 6 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.Next() != '[') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const book = new WikiRevisionBook_1.WikiRevisionBook();
        const sections = str.split('|');
        for (const section of sections) {
            const spl = section.split(':');
            const key = spl[0];
            const val = spl.length > 1 ? spl.slice(1).join(':') : '';
            switch (key) {
                case 'book':
                    book.BookName = val;
                    break;
                case 'chapter':
                    book.ChapterName = val;
                    break;
                case 'chapternumber':
                    book.ChapterNumber = parseInt(val, 10) || null;
                    break;
                case 'pagenumber':
                    book.PageNumber = parseInt(val, 10) || null;
                    break;
            }
        }
        state.SkipWhitespace();
        return new MetadataNode_1.MetadataNode('WikiBook', book);
    }
}
exports.WikiBookTag = WikiBookTag;
//# sourceMappingURL=WikiBookTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCategoryTag.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCategoryTag.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiCategoryTag = void 0;
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiCategoryTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const peekTag = state.Peek(5);
        const pt = state.PeekTo(']');
        return peekTag == '[cat:' && pt != null && pt.length > 5 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.ScanTo(':') != '[cat' || state.Next() != ':') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        state.SkipWhitespace();
        return new MetadataNode_1.MetadataNode('WikiCategory', str.trim());
    }
}
exports.WikiCategoryTag = WikiCategoryTag;
//# sourceMappingURL=WikiCategoryTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCreditTag.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiCreditTag.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiCreditTag = void 0;
const WikiRevisionCredit_1 = __webpack_require__(/*! ../Models/WikiRevisionCredit */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevisionCredit.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiCreditTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const peekTag = state.Peek(8);
        const pt = state.PeekTo(']');
        return peekTag == '[credit:' && pt != null && pt.length > 8 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.Next() != '[') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const credit = new WikiRevisionCredit_1.WikiRevisionCredit();
        credit.Type = WikiRevisionCredit_1.WikiRevisionCredit.TypeCredit;
        const sections = str.split('|');
        for (const section of sections) {
            const spl = section.split(':');
            const key = spl[0];
            const val = spl.length > 1 ? spl.slice(1).join(':') : '';
            switch (key) {
                case 'credit':
                    credit.Description = val;
                    break;
                case 'user':
                    credit.UserID = parseInt(val, 10) || null;
                    break;
                case 'name':
                    credit.Name = val;
                    break;
                case 'url':
                    credit.Url = val;
                    break;
            }
        }
        state.SkipWhitespace();
        return new MetadataNode_1.MetadataNode('WikiCredit', credit);
    }
}
exports.WikiCreditTag = WikiCreditTag;
//# sourceMappingURL=WikiCreditTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiFileTag.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiFileTag.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiFileTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const WikiRevision_1 = __webpack_require__(/*! ../Models/WikiRevision */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevision.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiFileTag extends Tag_1.Tag {
    constructor() {
        super();
    }
    static GetTag(state) {
        const peekTag = state.Peek(6);
        const pt = state.PeekTo(']');
        if (peekTag == '[file:' && (pt === null || pt === void 0 ? void 0 : pt.length) > 6 && !pt.includes('\n'))
            return 'file';
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const tag = WikiFileTag.GetTag(state);
        return tag != null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        var _a;
        const index = state.Index;
        const tag = WikiFileTag.GetTag(state);
        if (state.ScanTo(':') != `[${tag}` || state.Next() != ':') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const match = str.match(/^([^#\]]+?)(?:\|([^\]]*?))?$/i);
        if (!match) {
            state.Seek(index, true);
            return null;
        }
        const page = match[1];
        const text = ((_a = match[2]) === null || _a === void 0 ? void 0 : _a.length) > 0 ? match[2] : page;
        const slug = WikiRevision_1.WikiRevision.CreateSlug(page);
        const url = HtmlHelper_1.HtmlHelper.AttributeEncode(`https://twhl.info/wiki/embed/${slug}`);
        const infoUrl = HtmlHelper_1.HtmlHelper.AttributeEncode(`https://twhl.info/wiki/embed-info/${slug}`);
        const before = `<span class="embedded-inline download" data-info="${infoUrl}"><a href="${url}"><span class="fa fa-download"></span> `;
        const after = '</a></span>';
        const content = new NodeCollection_1.NodeCollection();
        content.Nodes.push(new MetadataNode_1.MetadataNode('WikiUpload', page));
        content.Nodes.push(new PlainTextNode_1.PlainTextNode(text));
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
}
exports.WikiFileTag = WikiFileTag;
//# sourceMappingURL=WikiFileTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiImageTag.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiImageTag.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiImageTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const WikiRevision_1 = __webpack_require__(/*! ../Models/WikiRevision */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevision.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiImageTag extends Tag_1.Tag {
    constructor() {
        super();
        this.TwhlBehaviour = false;
        this.Token = null;
        this.Element = 'img';
    }
    static GetTag(state) {
        for (const tag of this.Tags) {
            const peekTag = state.Peek(2 + tag.length);
            const pt = state.PeekTo(']');
            if (peekTag == `[${tag}:` && (pt === null || pt === void 0 ? void 0 : pt.length) > 2 + tag.length && !pt.includes('\n'))
                return tag;
        }
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const tag = WikiImageTag.GetTag(state);
        return tag != null;
    }
    Parse(_parser, _data, state, _scope, context) {
        const index = state.Index;
        const tag = WikiImageTag.GetTag(state);
        if (state.ScanTo(':') != `[${tag}` || state.Next() != ':') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const match = str.match(/^([^|\]]*?)(?:\|([^\]]*?))?$/i);
        if (!match) {
            state.Seek(index, true);
            return null;
        }
        const content = new NodeCollection_1.NodeCollection();
        const image = match[1];
        const params = match[2] ? match[2].trim().split('|') : [];
        let src = image;
        if (!image.includes('/')) {
            if (this.TwhlBehaviour) {
                content.Nodes.push(new MetadataNode_1.MetadataNode('WikiUpload', image));
                src = `https://twhl.info/wiki/embed/${WikiRevision_1.WikiRevision.CreateSlug(image)}`;
            }
            else {
                state.Seek(index, true);
                return null;
            }
        }
        let url = null;
        let caption = null;
        let loop = false;
        const classes = ['embedded', 'image'];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        for (const p of params) {
            const l = p.toLowerCase();
            if (WikiImageTag.IsClass(l))
                classes.push(l);
            else if (l == 'loop')
                loop = true;
            else if (l.length > 4 && l.substring(0, 4) == 'url:')
                url = p.substring(4).trim();
            else
                caption = p.trim();
        }
        if (!caption || caption.trim() == '')
            caption = null;
        if (tag == 'img' && url != null && WikiImageTag.ValidateUrl(url)) {
            if (this.TwhlBehaviour && !url.match(/^[a-z]{2,10}:\/\//i)) {
                content.Nodes.push(new MetadataNode_1.MetadataNode('WikiLink', url));
                url = `https://twhl.info/wiki/page/${WikiRevision_1.WikiRevision.CreateSlug(url)}`;
            }
        }
        else {
            url = '';
        }
        let el = 'span';
        // Force inline if we are in an inline context
        if (context == TagParseContext_1.TagParseContext.Inline && !classes.includes('inline'))
            classes.push('inline');
        // Non-inline images should eat any whitespace after them
        if (!classes.includes('inline')) {
            state.SkipWhitespace();
            el = 'div';
        }
        const embed = WikiImageTag.GetEmbedObject(tag, src, caption, loop);
        if (embed != null)
            content.Nodes.push(embed);
        if (caption != null) {
            const cn = new HtmlNode_1.HtmlNode('<span class="caption">', new PlainTextNode_1.PlainTextNode(caption), '</span>');
            cn.PlainBefore = ' ';
            content.Nodes.push(cn);
        }
        const before = `<${el} class="${classes.join(' ')}"` + ((caption === null || caption === void 0 ? void 0 : caption.length) > 0 ? ` title="${HtmlHelper_1.HtmlHelper.AttributeEncode(caption)}"` : '') + '>'
            + (url.length > 0 ? '<a href="' + HtmlHelper_1.HtmlHelper.AttributeEncode(url) + '">' : '')
            + '<span class="caption-panel">';
        const after = '</span>'
            + (url.length > 0 ? '</a>' : '')
            + `</${el}>`;
        const ret = new HtmlNode_1.HtmlNode(before, content, after);
        ret.IsBlockNode = el == 'div';
        return ret;
    }
    static GetEmbedObject(tag, url, caption, loop) {
        url = HtmlHelper_1.HtmlHelper.AttributeEncode(url);
        switch (tag) {
            case 'img':
                {
                    caption = caption !== null && caption !== void 0 ? caption : 'User posted image';
                    const cap = HtmlHelper_1.HtmlHelper.AttributeEncode(caption);
                    const ret = new HtmlNode_1.HtmlNode(`<img class="caption-body" src="${url}" alt="${cap}" />`, PlainTextNode_1.PlainTextNode.Empty(), '');
                    ret.PlainBefore = '[Image]';
                    return ret;
                }
            case 'video':
            case 'audio':
                {
                    let auto = '';
                    if (loop)
                        auto = 'autoplay loop muted';
                    const ret = new HtmlNode_1.HtmlNode(`<${tag} class="caption-body" src="${url}" playsinline controls ${auto}>Your browser doesn't support embedded ${tag}.</${tag}>`, PlainTextNode_1.PlainTextNode.Empty(), '');
                    ret.PlainBefore = tag.substring(0, 1).toUpperCase() + tag.substring(1);
                    return ret;
                }
        }
        return null;
    }
    static ValidateUrl(url) {
        return !url.includes('<script');
    }
    static IsClass(param) {
        return WikiImageTag.ValidClasses.includes(param);
    }
}
exports.WikiImageTag = WikiImageTag;
WikiImageTag.Tags = ['img', 'video', 'audio'];
WikiImageTag.ValidClasses = ['large', 'medium', 'small', 'thumb', 'left', 'right', 'center', 'inline'];
//# sourceMappingURL=WikiImageTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiLinkTag.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiLinkTag.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiLinkTag = void 0;
const HtmlHelper_1 = __webpack_require__(/*! ../HtmlHelper */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/HtmlHelper.js");
const WikiRevision_1 = __webpack_require__(/*! ../Models/WikiRevision */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Models/WikiRevision.js");
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const MetadataNode_1 = __webpack_require__(/*! ../Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const NodeCollection_1 = __webpack_require__(/*! ../Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiLinkTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Matches(state, _token, _context) {
        const pt = state.PeekTo(']]');
        return (pt === null || pt === void 0 ? void 0 : pt.length) > 1 && pt[1] == '[' && !pt.includes('\n')
            && pt.substring(2).match(/([^\]]*?)(?:\|([^\]]*?))?/i) != null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        const index = state.Index;
        if (state.Next() != '[' || state.Next() != '[') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']]');
        if (state.Next() != ']' || state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const match = str.match(/^([^\]]+?)(?:\|([^\]]*?))?$/i);
        if (!match) {
            state.Seek(index, true);
            return null;
        }
        let page = match[1];
        const text = match[2] ? match[2] : page;
        let hash = '';
        if (page.includes('#')) {
            const spl = page.split('#');
            page = spl[0];
            const anchor = spl.length > 1 ? spl.slice(1).join('#') : '';
            hash = '#' + anchor.replace(/[^\da-z?/:@\-._~!$&'()*+,;=]/ig, '_');
        }
        const url = HtmlHelper_1.HtmlHelper.AttributeEncode(`https://twhl.info/wiki/page/${WikiRevision_1.WikiRevision.CreateSlug(page)}`) + hash;
        const before = `<a href="${url}">`;
        const after = '</a>';
        const content = new NodeCollection_1.NodeCollection();
        content.Nodes.push(new MetadataNode_1.MetadataNode('WikiLink', page));
        content.Nodes.push(new PlainTextNode_1.PlainTextNode(text));
        return new HtmlNode_1.HtmlNode(before, content, after);
    }
}
exports.WikiLinkTag = WikiLinkTag;
//# sourceMappingURL=WikiLinkTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiYoutubeTag.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/WikiYoutubeTag.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WikiYoutubeTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const TagParseContext_1 = __webpack_require__(/*! ../TagParseContext */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/TagParseContext.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class WikiYoutubeTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = null;
        this.Element = 'div';
        this.MainOption = 'id';
        this.Options = ['id'];
    }
    Matches(state, _token, context) {
        const peekTag = state.Peek(9);
        const pt = state.PeekTo(']');
        return context == TagParseContext_1.TagParseContext.Block && peekTag == '[youtube:' && pt != null && pt.length > 9 && !pt.includes('\n');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Parse(_parser, _data, state, _scope, _context) {
        var _a, _b;
        const index = state.Index;
        if (state.ScanTo(':') != '[youtube' || state.Next() != ':') {
            state.Seek(index, true);
            return null;
        }
        const str = state.ScanTo(']');
        if (state.Next() != ']') {
            state.Seek(index, true);
            return null;
        }
        const regs = str.match(/^([^|\]]*?)(?:\|([^\]]*?))?$/i);
        if (!regs) {
            state.Seek(index, true);
            return null;
        }
        const id = regs[1];
        const params = (_b = (_a = regs[2]) === null || _a === void 0 ? void 0 : _a.trim().split('|')) !== null && _b !== void 0 ? _b : [];
        if (!WikiYoutubeTag.ValidateID(id)) {
            state.Seek(index, true);
            return null;
        }
        state.SkipWhitespace();
        let caption = null;
        const classes = ['embedded', 'video'];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        for (const p of params) {
            const l = p.toLowerCase();
            if (WikiYoutubeTag.IsClass(l))
                classes.push(l);
            else
                caption = p.trim();
        }
        if (!caption || caption.trim() == '')
            caption = null;
        const captionNode = new HtmlNode_1.HtmlNode(caption != null ? '<span class="caption">' : '', new PlainTextNode_1.PlainTextNode(caption !== null && caption !== void 0 ? caption : ''), caption != null ? '</span>' : '');
        captionNode.PlainBefore = '[YouTube video] ';
        captionNode.PlainAfter = '\n';
        const before = `<div class="${classes.join(' ')}">` +
            '<div class="caption-panel">' +
            '<div class="video-container caption-body">' +
            '<div class="video-content">' +
            `<div class="uninitialised" data-youtube-id="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"></div>` +
            '</div>' +
            '</div>';
        const after = '</div></div>';
        const ret = new HtmlNode_1.HtmlNode(before, captionNode, after);
        ret.IsBlockNode = true;
        return ret;
    }
    static ValidateID(id) {
        return id.match(/^[a-zA-Z0-9_-]{6,11}$/i) != null;
    }
    static IsClass(param) {
        return WikiYoutubeTag.ValidClasses.includes(param);
    }
}
exports.WikiYoutubeTag = WikiYoutubeTag;
WikiYoutubeTag.ValidClasses = ['large', 'medium', 'small', 'left', 'right', 'center'];
//# sourceMappingURL=WikiYoutubeTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/YoutubeTag.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/YoutubeTag.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.YoutubeTag = void 0;
const HtmlNode_1 = __webpack_require__(/*! ../Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const PlainTextNode_1 = __webpack_require__(/*! ../Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const Tag_1 = __webpack_require__(/*! ./Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
class YoutubeTag extends Tag_1.Tag {
    constructor() {
        super();
        this.Token = 'youtube';
        this.Element = 'div';
        this.MainOption = 'id';
        this.Options = ['id'];
    }
    FormatResult(parser, data, state, scope, options, text) {
        let id = text;
        if (options['id'])
            id = options['id'];
        const classes = ['embedded', 'video'];
        if (this.ElementClass != null)
            classes.push(this.ElementClass);
        const captionNode = new HtmlNode_1.HtmlNode('', PlainTextNode_1.PlainTextNode.Empty(), '');
        captionNode.PlainBefore = '[YouTube video] ';
        captionNode.PlainAfter = '\n';
        const before = `<div class="${classes.join(' ')}">` +
            ' <div class="caption-panel">' +
            '  <div class="video-container caption-body">' +
            '   <div class="video-content">' +
            `    <div class="uninitialised" data-youtube-id="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"></div>` +
            '   </div>' +
            '  </div>';
        const after = '</div></div>';
        const ret = new HtmlNode_1.HtmlNode(before, captionNode, after);
        ret.IsBlockNode = true;
        return ret;
    }
    Validate(options, text) {
        let url = text;
        if (options['id'])
            url = options['id'];
        return url.match(/^[a-zA-Z0-9_-]{6,11}$/i) != null;
    }
}
exports.YoutubeTag = YoutubeTag;
//# sourceMappingURL=YoutubeTag.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Util.js":
/*!************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/Util.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Template = exports.IndexOfAny = exports.OrderByDescending = exports.OrderBy = void 0;
function OrderBy(array, selector) {
    const copy = Array.from(array);
    return copy.sort((a, b) => {
        const ka = selector(a);
        const kb = selector(b);
        if (ka < kb)
            return -1;
        if (ka > kb)
            return 1;
        return 0;
    });
}
exports.OrderBy = OrderBy;
function OrderByDescending(array, selector) {
    const copy = OrderBy(array, selector);
    return copy.reverse();
}
exports.OrderByDescending = OrderByDescending;
function IndexOfAny(str, searchStrings, position = 0) {
    let min = -1;
    for (const searchString of searchStrings) {
        const idx = str.indexOf(searchString, position);
        if (idx >= 0)
            min = min < 0 ? idx : Math.min(min, idx);
    }
    return min;
}
exports.IndexOfAny = IndexOfAny;
function Template(template_string, obj) {
    return template_string.replace(/\{(.*?)\}/ig, function (_match, name) {
        return obj[name] || '';
    });
}
exports.Template = Template;
//# sourceMappingURL=Util.js.map

/***/ }),

/***/ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@logicandtrick/twhl-wikicode-parser/build/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nodes = exports.Tags = exports.ParserConfiguration = exports.Parser = void 0;
var Parser_1 = __webpack_require__(/*! ./Parser */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Parser.js");
Object.defineProperty(exports, "Parser", ({ enumerable: true, get: function () { return Parser_1.Parser; } }));
var ParserConfiguration_1 = __webpack_require__(/*! ./ParserConfiguration */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/ParserConfiguration.js");
Object.defineProperty(exports, "ParserConfiguration", ({ enumerable: true, get: function () { return ParserConfiguration_1.ParserConfiguration; } }));
const Tag_1 = __webpack_require__(/*! ./Tags/Tag */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Tags/Tag.js");
const HtmlNode_1 = __webpack_require__(/*! ./Nodes/HtmlNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/HtmlNode.js");
const MetadataNode_1 = __webpack_require__(/*! ./Nodes/MetadataNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/MetadataNode.js");
const NodeCollection_1 = __webpack_require__(/*! ./Nodes/NodeCollection */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeCollection.js");
const NodeExtensions_1 = __webpack_require__(/*! ./Nodes/NodeExtensions */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/NodeExtensions.js");
const PlainTextNode_1 = __webpack_require__(/*! ./Nodes/PlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/PlainTextNode.js");
const RefNode_1 = __webpack_require__(/*! ./Nodes/RefNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RefNode.js");
const RemovedNode_1 = __webpack_require__(/*! ./Nodes/RemovedNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/RemovedNode.js");
const UnprocessablePlainTextNode_1 = __webpack_require__(/*! ./Nodes/UnprocessablePlainTextNode */ "./node_modules/@logicandtrick/twhl-wikicode-parser/build/Nodes/UnprocessablePlainTextNode.js");
exports.Tags = {
    Tag: Tag_1.Tag
};
exports.Nodes = {
    HtmlNode: HtmlNode_1.HtmlNode,
    MetadataNode: MetadataNode_1.MetadataNode,
    NodeCollection: NodeCollection_1.NodeCollection,
    NodeExtensions: NodeExtensions_1.NodeExtensions,
    PlainTextNode: PlainTextNode_1.PlainTextNode,
    RefNode: RefNode_1.RefNode,
    RemovedNode: RemovedNode_1.RemovedNode,
    UnprocessablePlainTextNode: UnprocessablePlainTextNode_1.UnprocessablePlainTextNode,
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/highlight.js/lib/core.js":
/*!***********************************************!*\
  !*** ./node_modules/highlight.js/lib/core.js ***!
  \***********************************************/
/***/ ((module) => {

var deepFreezeEs6 = {exports: {}};

function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function () {
            throw new Error('set is read-only');
        };
    }

    // Freeze self
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    return obj;
}

deepFreezeEs6.exports = deepFreeze;
deepFreezeEs6.exports.default = deepFreeze;

/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
/** @implements CallbackResponse */

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit$1(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  // rarely we can have a sublanguage where language is undefined
  // TODO: track down why
  return !!node.scope || (node.sublanguage && node.language);
};

/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */
const scopeToCSSClass = (name, { prefix }) => {
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
    ].join(" ");
  }
  return `${prefix}${name}`;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let className = "";
    if (node.sublanguage) {
      className = `language-${node.language}`;
    } else {
      className = scopeToCSSClass(node.scope, { prefix: this.classPrefix });
    }
    this.span(className);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{scope?: string, language?: string, sublanguage?: boolean, children: Node[]} | string} Node */
/** @typedef {{scope?: string, language?: string, sublanguage?: boolean, children: Node[]} } DataNode */
/** @typedef {import('highlight.js').Emitter} Emitter */
/**  */

/** @returns {DataNode} */
const newNode = (opts = {}) => {
  /** @type DataNode */
  const result = { children: [] };
  Object.assign(result, opts);
  return result;
};

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = newNode();
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} scope */
  openNode(scope) {
    /** @type Node */
    const node = newNode({ scope });
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, scope)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(scope)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   * @param {string} scope
   */
  addKeyword(text, scope) {
    if (text === "") { return; }

    this.openNode(scope);
    this.addText(text);
    this.closeNode();
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    node.sublanguage = true;
    node.language = name;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
  return concat('(?:', re, ')*');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
  return concat('(?:', re, ')?');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];

  if (typeof opts === 'object' && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}

/** @typedef { {capture?: boolean} } RegexEitherOptions */

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
function either(...args) {
  /** @type { object & {capture?: boolean} }  */
  const opts = stripOptionsFromArgs(args);
  const joined = '('
    + (opts.capture ? "" : "?:")
    + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp | string} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;

  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    return out;
  }).map(re => `(${re})`).join(joinWith);
}

/** @typedef {import('highlight.js').Mode} Mode */
/** @typedef {import('highlight.js').ModeCallback} ModeCallback */

// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit$1({
    scope: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  scope: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: 'doctag',
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
  );
  // looking like plain text, more likely to be a comment
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---

      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827

      begin: concat(
        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        '(',
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        '){3}') // look for 3 words in a row
    }
  );
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  scope: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    scope: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  scope: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
    IDENT_RE: IDENT_RE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    NUMBER_RE: NUMBER_RE,
    C_NUMBER_RE: C_NUMBER_RE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    APOS_STRING_MODE: APOS_STRING_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    COMMENT: COMMENT,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    NUMBER_MODE: NUMBER_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    REGEXP_MODE: REGEXP_MODE,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
    METHOD_GUARD: METHOD_GUARD,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});

/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

// ------

// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}

/**
 *
 * @type {CompilerExt}
 */
function scopeClassName(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.className !== undefined) {
    mode.scope = mode.className;
    delete mode.className;
  }
}

/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;

  // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first
  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;

  // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 0;
}

/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}

// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch) return;
  // starts conflicts with endsParent which we need to make sure the child
  // rule is not matched multiple times
  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => { delete mode[key]; });

  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;

  delete originalMode.beforeMatch;
};

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

const DEFAULT_KEYWORD_SCOPE = "keyword";

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  /** @type {import("highlight.js/private").KeywordDict} */
  const compiledKeywords = Object.create(null);

  // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing scopeName (which can then point to a string or array)
  if (typeof rawKeywords === 'string') {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName) {
      // collapse all our objects back into the parent object
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
      );
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */
  function compileList(scopeName, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} version
 * @param {string} message
 */
const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};

/* eslint-disable no-throw-literal */

/**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/

const MultiClassError = new Error();

/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  /** @type Record<number,boolean> */
  const emit = {};
  /** @type Record<number,string> */
  const positions = {};

  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}

/**
 * @param {CompiledMode} mode
 */
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}

/**
 * @param {CompiledMode} mode
 */
function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;

  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}

/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}

/**
 * @param {CompiledMode} mode
 */
function MultiClass(mode) {
  scopeSugar(mode);

  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }

  beginMultiClass(mode);
  endMultiClass(mode);
}

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
function compileLanguage(language) {
  /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm'
      + (language.case_insensitive ? 'i' : '')
      + (language.unicodeRegex ? 'u' : '')
      + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.isCompiled) return cmode;

    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach(ext => ext(mode, parent));

    language.compilerExtensions.forEach(ext => ext(mode, parent));

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach(ext => ext(mode, parent));

    mode.isCompiled = true;

    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      // we need a copy because keywords might be compiled multiple times
      // so we can't go deleting $pattern from the original on the first
      // pass
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = [];

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit$1(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

var version = "11.7.0";

class HTMLInjectionError extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/


const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }

    // https://github.com/highlightjs/highlight.js/issues/3149
    // eslint-disable-next-line no-undefined
    if (ignoreIllegals === undefined) { ignoreIllegals = true; }

    /** @type {BeforeHighlightContext} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result
      ? context.result
      : _highlight(context.language, context.code, ignoreIllegals);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = Object.create(null);

    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substring(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.addSublanguage(result._emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) { i++; continue; }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitter.addKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }

    /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        // beginScope just wraps the begin match itself in a scope
        if (mode.beginScope._wrap) {
          emitter.addKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          // at this point modeBuffer should just be the match
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }

      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexes to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substring(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitter.addKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)
      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language);
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;
        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;

        const match = top.matcher.exec(codeToHighlight);
        // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;

        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substring(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();

      return {
        language: languageName,
        value: result,
        relevance: relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index: index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.secondBest = secondBest;

    return result;
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang;

    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightElement",
      { el: element, language: language });

    // we should be all text, no child nodes (unescaped HTML) - this is possibly
    // an HTML injection attack - it's likely too late if this is already in
    // production (the code has likely already done its damage by the time
    // we're seeing it)... but we yell loudly about this so that hopefully it's
    // more likely to be caught in development before making it to production
    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", { el: element, result, text });
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }

  // TODO: remove v12, deprecated
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };

  // TODO: remove v12, deprecated
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }

  let wantsHighlight = false;

  /**
   * auto-highlights all pre>code elements on the page
   */
  function highlightAll() {
    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  function boot() {
    // if a highlight was requested before DOM was loaded, do now
    if (wantsHighlight) highlightAll();
  }

  // make sure we are in the browser environment
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', boot, false);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */
  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  hljs.regex = {
    concat: concat,
    lookahead: lookahead,
    either: either,
    optional: optional,
    anyNumberOfTimes: anyNumberOfTimes
  };

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreezeEs6.exports(MODES[key]);
    }
  }

  // merge all the modes/regexes into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// export an "instance" of the highlighter
var highlight = HLJS({});

module.exports = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/angelscript.js":
/*!****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/angelscript.js ***!
  \****************************************************************/
/***/ ((module) => {

/*
Language: AngelScript
Author: Melissa Geels <melissa@nimble.tools>
Category: scripting
Website: https://www.angelcode.com/angelscript/
*/

/** @type LanguageFn */
function angelscript(hljs) {
  const builtInTypeMode = {
    className: 'built_in',
    begin: '\\b(void|bool|int8|int16|int32|int64|int|uint8|uint16|uint32|uint64|uint|string|ref|array|double|float|auto|dictionary)'
  };

  const objectHandleMode = {
    className: 'symbol',
    begin: '[a-zA-Z0-9_]+@'
  };

  const genericMode = {
    className: 'keyword',
    begin: '<',
    end: '>',
    contains: [
      builtInTypeMode,
      objectHandleMode
    ]
  };

  builtInTypeMode.contains = [ genericMode ];
  objectHandleMode.contains = [ genericMode ];

  const KEYWORDS = [
    "for",
    "in|0",
    "break",
    "continue",
    "while",
    "do|0",
    "return",
    "if",
    "else",
    "case",
    "switch",
    "namespace",
    "is",
    "cast",
    "or",
    "and",
    "xor",
    "not",
    "get|0",
    "in",
    "inout|10",
    "out",
    "override",
    "set|0",
    "private",
    "public",
    "const",
    "default|0",
    "final",
    "shared",
    "external",
    "mixin|10",
    "enum",
    "typedef",
    "funcdef",
    "this",
    "super",
    "import",
    "from",
    "interface",
    "abstract|0",
    "try",
    "catch",
    "protected",
    "explicit",
    "property"
  ];

  return {
    name: 'AngelScript',
    aliases: [ 'asc' ],

    keywords: KEYWORDS,

    // avoid close detection with C# and JS
    illegal: '(^using\\s+[A-Za-z0-9_\\.]+;$|\\bfunction\\s*[^\\(])',

    contains: [
      { // 'strings'
        className: 'string',
        begin: '\'',
        end: '\'',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ],
        relevance: 0
      },

      // """heredoc strings"""
      {
        className: 'string',
        begin: '"""',
        end: '"""'
      },

      { // "strings"
        className: 'string',
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ],
        relevance: 0
      },

      hljs.C_LINE_COMMENT_MODE, // single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // comment blocks

      { // metadata
        className: 'string',
        begin: '^\\s*\\[',
        end: '\\]'
      },

      { // interface or namespace declaration
        beginKeywords: 'interface namespace',
        end: /\{/,
        illegal: '[;.\\-]',
        contains: [
          { // interface or namespace name
            className: 'symbol',
            begin: '[a-zA-Z0-9_]+'
          }
        ]
      },

      { // class declaration
        beginKeywords: 'class',
        end: /\{/,
        illegal: '[;.\\-]',
        contains: [
          { // class name
            className: 'symbol',
            begin: '[a-zA-Z0-9_]+',
            contains: [
              {
                begin: '[:,]\\s*',
                contains: [
                  {
                    className: 'symbol',
                    begin: '[a-zA-Z0-9_]+'
                  }
                ]
              }
            ]
          }
        ]
      },

      builtInTypeMode, // built-in types
      objectHandleMode, // object handles

      { // literals
        className: 'literal',
        begin: '\\b(null|true|false)'
      },

      { // numbers
        className: 'number',
        relevance: 0,
        begin: '(-?)(\\b0[xXbBoOdD][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)'
      }
    ]
  };
}

module.exports = angelscript;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/cpp.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/cpp.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: C++
Category: common, system
Website: https://isocpp.org
*/

/** @type LanguageFn */
function cpp(hljs) {
  const regex = hljs.regex;
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '(?!struct)('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';

  const CPP_PRIMITIVE_TYPES = {
    className: 'type',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + '|.)',
        end: '\'',
        illegal: '.'
      },
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
        end: /\)([^()\\ ]{0,16})"/
      })
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword:
        'if else elif endif define undef warning error line '
        + 'pragma _Pragma ifdef ifndef include' },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: 'string' }),
      {
        className: 'string',
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_KEYWORDS = [
    'alignas',
    'alignof',
    'and',
    'and_eq',
    'asm',
    'atomic_cancel',
    'atomic_commit',
    'atomic_noexcept',
    'auto',
    'bitand',
    'bitor',
    'break',
    'case',
    'catch',
    'class',
    'co_await',
    'co_return',
    'co_yield',
    'compl',
    'concept',
    'const_cast|10',
    'consteval',
    'constexpr',
    'constinit',
    'continue',
    'decltype',
    'default',
    'delete',
    'do',
    'dynamic_cast|10',
    'else',
    'enum',
    'explicit',
    'export',
    'extern',
    'false',
    'final',
    'for',
    'friend',
    'goto',
    'if',
    'import',
    'inline',
    'module',
    'mutable',
    'namespace',
    'new',
    'noexcept',
    'not',
    'not_eq',
    'nullptr',
    'operator',
    'or',
    'or_eq',
    'override',
    'private',
    'protected',
    'public',
    'reflexpr',
    'register',
    'reinterpret_cast|10',
    'requires',
    'return',
    'sizeof',
    'static_assert',
    'static_cast|10',
    'struct',
    'switch',
    'synchronized',
    'template',
    'this',
    'thread_local',
    'throw',
    'transaction_safe',
    'transaction_safe_dynamic',
    'true',
    'try',
    'typedef',
    'typeid',
    'typename',
    'union',
    'using',
    'virtual',
    'volatile',
    'while',
    'xor',
    'xor_eq'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_TYPES = [
    'bool',
    'char',
    'char16_t',
    'char32_t',
    'char8_t',
    'double',
    'float',
    'int',
    'long',
    'short',
    'void',
    'wchar_t',
    'unsigned',
    'signed',
    'const',
    'static'
  ];

  const TYPE_HINTS = [
    'any',
    'auto_ptr',
    'barrier',
    'binary_semaphore',
    'bitset',
    'complex',
    'condition_variable',
    'condition_variable_any',
    'counting_semaphore',
    'deque',
    'false_type',
    'future',
    'imaginary',
    'initializer_list',
    'istringstream',
    'jthread',
    'latch',
    'lock_guard',
    'multimap',
    'multiset',
    'mutex',
    'optional',
    'ostringstream',
    'packaged_task',
    'pair',
    'promise',
    'priority_queue',
    'queue',
    'recursive_mutex',
    'recursive_timed_mutex',
    'scoped_lock',
    'set',
    'shared_future',
    'shared_lock',
    'shared_mutex',
    'shared_timed_mutex',
    'shared_ptr',
    'stack',
    'string_view',
    'stringstream',
    'timed_mutex',
    'thread',
    'true_type',
    'tuple',
    'unique_lock',
    'unique_ptr',
    'unordered_map',
    'unordered_multimap',
    'unordered_multiset',
    'unordered_set',
    'variant',
    'vector',
    'weak_ptr',
    'wstring',
    'wstring_view'
  ];

  const FUNCTION_HINTS = [
    'abort',
    'abs',
    'acos',
    'apply',
    'as_const',
    'asin',
    'atan',
    'atan2',
    'calloc',
    'ceil',
    'cerr',
    'cin',
    'clog',
    'cos',
    'cosh',
    'cout',
    'declval',
    'endl',
    'exchange',
    'exit',
    'exp',
    'fabs',
    'floor',
    'fmod',
    'forward',
    'fprintf',
    'fputs',
    'free',
    'frexp',
    'fscanf',
    'future',
    'invoke',
    'isalnum',
    'isalpha',
    'iscntrl',
    'isdigit',
    'isgraph',
    'islower',
    'isprint',
    'ispunct',
    'isspace',
    'isupper',
    'isxdigit',
    'labs',
    'launder',
    'ldexp',
    'log',
    'log10',
    'make_pair',
    'make_shared',
    'make_shared_for_overwrite',
    'make_tuple',
    'make_unique',
    'malloc',
    'memchr',
    'memcmp',
    'memcpy',
    'memset',
    'modf',
    'move',
    'pow',
    'printf',
    'putchar',
    'puts',
    'realloc',
    'scanf',
    'sin',
    'sinh',
    'snprintf',
    'sprintf',
    'sqrt',
    'sscanf',
    'std',
    'stderr',
    'stdin',
    'stdout',
    'strcat',
    'strchr',
    'strcmp',
    'strcpy',
    'strcspn',
    'strlen',
    'strncat',
    'strncmp',
    'strncpy',
    'strpbrk',
    'strrchr',
    'strspn',
    'strstr',
    'swap',
    'tan',
    'tanh',
    'terminate',
    'to_underlying',
    'tolower',
    'toupper',
    'vfprintf',
    'visit',
    'vprintf',
    'vsprintf'
  ];

  const LITERALS = [
    'NULL',
    'false',
    'nullopt',
    'nullptr',
    'true'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const BUILT_IN = [ '_Pragma' ];

  const CPP_KEYWORDS = {
    type: RESERVED_TYPES,
    keyword: RESERVED_KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_IN,
    _type_hints: TYPE_HINTS
  };

  const FUNCTION_DISPATCH = {
    className: 'function.dispatch',
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: FUNCTION_HINTS },
    begin: regex.concat(
      /\b/,
      /(?!decltype)/,
      /(?!if)/,
      /(?!for)/,
      /(?!switch)/,
      /(?!while)/,
      hljs.IDENT_RE,
      regex.lookahead(/(<[^<>]+>|)\s*\(/))
  };

  const EXPRESSION_CONTAINS = [
    FUNCTION_DISPATCH,
    PREPROCESSOR,
    CPP_PRIMITIVE_TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: 'new throw return else',
        end: /;/
      }
    ],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  const FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: CPP_KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ TITLE_MODE ],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: true,
        contains: [
          STRINGS,
          NUMBERS
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          CPP_PRIMITIVE_TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              CPP_PRIMITIVE_TYPES
            ]
          }
        ]
      },
      CPP_PRIMITIVE_TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR
    ]
  };

  return {
    name: 'C++',
    aliases: [
      'cc',
      'c++',
      'h++',
      'hpp',
      'hh',
      'hxx',
      'cxx'
    ],
    keywords: CPP_KEYWORDS,
    illegal: '</',
    classNameAliases: { 'function.dispatch': 'built_in' },
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      FUNCTION_DISPATCH,
      EXPRESSION_CONTAINS,
      [
        PREPROCESSOR,
        { // containers: ie, `vector <int> rooms (9);`
          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)',
          end: '>',
          keywords: CPP_KEYWORDS,
          contains: [
            'self',
            CPP_PRIMITIVE_TYPES
          ]
        },
        {
          begin: hljs.IDENT_RE + '::',
          keywords: CPP_KEYWORDS
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: 'keyword',
            3: 'title.class'
          }
        }
      ])
  };
}

module.exports = cpp;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/csharp.js":
/*!***********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/csharp.js ***!
  \***********************************************************/
/***/ ((module) => {

/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
Website: https://docs.microsoft.com/dotnet/csharp/
Category: common
*/

/** @type LanguageFn */
function csharp(hljs) {
  const BUILT_IN_KEYWORDS = [
    'bool',
    'byte',
    'char',
    'decimal',
    'delegate',
    'double',
    'dynamic',
    'enum',
    'float',
    'int',
    'long',
    'nint',
    'nuint',
    'object',
    'sbyte',
    'short',
    'string',
    'ulong',
    'uint',
    'ushort'
  ];
  const FUNCTION_MODIFIERS = [
    'public',
    'private',
    'protected',
    'static',
    'internal',
    'protected',
    'abstract',
    'async',
    'extern',
    'override',
    'unsafe',
    'virtual',
    'new',
    'sealed',
    'partial'
  ];
  const LITERAL_KEYWORDS = [
    'default',
    'false',
    'null',
    'true'
  ];
  const NORMAL_KEYWORDS = [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'do',
    'else',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'record',
    'ref',
    'return',
    'scoped',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'void',
    'volatile',
    'while'
  ];
  const CONTEXTUAL_KEYWORDS = [
    'add',
    'alias',
    'and',
    'ascending',
    'async',
    'await',
    'by',
    'descending',
    'equals',
    'from',
    'get',
    'global',
    'group',
    'init',
    'into',
    'join',
    'let',
    'nameof',
    'not',
    'notnull',
    'on',
    'or',
    'orderby',
    'partial',
    'remove',
    'select',
    'set',
    'unmanaged',
    'value|0',
    'var',
    'when',
    'where',
    'with',
    'yield'
  ];

  const KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
    built_in: BUILT_IN_KEYWORDS,
    literal: LITERAL_KEYWORDS
  };
  const TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, { begin: '[a-zA-Z](\\.?\\w)*' });
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(0b[01\']+)' },
      { begin: '(-?)\\b([\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)(u|U|l|L|ul|UL|f|F|b|B)' },
      { begin: '(-?)(\\b0[xX][a-fA-F0-9\']+|(\\b[\\d\']+(\\.[\\d\']*)?|\\.[\\d\']+)([eE][-+]?[\\d\']+)?)' }
    ],
    relevance: 0
  };
  const VERBATIM_STRING = {
    className: 'string',
    begin: '@"',
    end: '"',
    contains: [ { begin: '""' } ]
  };
  const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });
  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });
  const INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      hljs.BACKSLASH_ESCAPE,
      SUBST_NO_LF
    ]
  };
  const INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST
    ]
  };
  const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST_NO_LF
    ]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];
  const STRING = { variants: [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ] };

  const GENERIC_MODIFIER = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      TITLE_MODE
    ]
  };
  const TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
  const AT_IDENTIFIER = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };

  return {
    name: 'C#',
    aliases: [
      'cs',
      'c#'
    ],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///',
                  relevance: 0
                },
                { begin: '<!--|-->' },
                {
                  begin: '</?',
                  end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#',
        end: '$',
        keywords: { keyword: 'if else elif endif define undef warning error line region endregion pragma checksum' }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: 'class interface',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'record',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[(?=[\\w])',
        excludeBegin: true,
        end: '\\]',
        excludeEnd: true,
        contains: [
          {
            className: 'string',
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
        returnBegin: true,
        end: /\s*[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: FUNCTION_MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
            returnBegin: true,
            contains: [
              hljs.TITLE_MODE,
              GENERIC_MODIFIER
            ],
            relevance: 0
          },
          { match: /\(\)/ },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      AT_IDENTIFIER
    ]
  };
}

module.exports = csharp;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/css.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/css.js ***!
  \********************************************************/
/***/ ((module) => {

const MODES = (hljs) => {
  return {
    IMPORTANT: {
      scope: 'meta',
      begin: '!important'
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: 'number',
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$',
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: 'number',
      begin: hljs.NUMBER_RE + '(' +
        '%|em|ex|ch|rem' +
        '|vw|vh|vmin|vmax' +
        '|cm|mm|in|pt|pc|px' +
        '|deg|grad|rad|turn' +
        '|s|ms' +
        '|Hz|kHz' +
        '|dpi|dpcm|dppx' +
        ')?',
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z][A-Za-z0-9_-]*/
    }
  };
};

const TAGS = [
  'a',
  'abbr',
  'address',
  'article',
  'aside',
  'audio',
  'b',
  'blockquote',
  'body',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'menu',
  'nav',
  'object',
  'ol',
  'p',
  'q',
  'quote',
  'samp',
  'section',
  'span',
  'strong',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'ul',
  'var',
  'video'
];

const MEDIA_FEATURES = [
  'any-hover',
  'any-pointer',
  'aspect-ratio',
  'color',
  'color-gamut',
  'color-index',
  'device-aspect-ratio',
  'device-height',
  'device-width',
  'display-mode',
  'forced-colors',
  'grid',
  'height',
  'hover',
  'inverted-colors',
  'monochrome',
  'orientation',
  'overflow-block',
  'overflow-inline',
  'pointer',
  'prefers-color-scheme',
  'prefers-contrast',
  'prefers-reduced-motion',
  'prefers-reduced-transparency',
  'resolution',
  'scan',
  'scripting',
  'update',
  'width',
  // TODO: find a better solution?
  'min-width',
  'max-width',
  'min-height',
  'max-height'
];

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
const PSEUDO_CLASSES = [
  'active',
  'any-link',
  'blank',
  'checked',
  'current',
  'default',
  'defined',
  'dir', // dir()
  'disabled',
  'drop',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'fullscreen',
  'future',
  'focus',
  'focus-visible',
  'focus-within',
  'has', // has()
  'host', // host or host()
  'host-context', // host-context()
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  'is', // is()
  'lang', // lang()
  'last-child',
  'last-of-type',
  'left',
  'link',
  'local-link',
  'not', // not()
  'nth-child', // nth-child()
  'nth-col', // nth-col()
  'nth-last-child', // nth-last-child()
  'nth-last-col', // nth-last-col()
  'nth-last-of-type', //nth-last-of-type()
  'nth-of-type', //nth-of-type()
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'past',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'target',
  'target-within',
  'user-invalid',
  'valid',
  'visited',
  'where' // where()
];

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
const PSEUDO_ELEMENTS = [
  'after',
  'backdrop',
  'before',
  'cue',
  'cue-region',
  'first-letter',
  'first-line',
  'grammar-error',
  'marker',
  'part',
  'placeholder',
  'selection',
  'slotted',
  'spelling-error'
];

const ATTRIBUTES = [
  'align-content',
  'align-items',
  'align-self',
  'all',
  'animation',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-timing-function',
  'backface-visibility',
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  'block-size',
  'border',
  'border-block',
  'border-block-color',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-style',
  'border-block-width',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-color',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-style',
  'border-inline-width',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-decoration-break',
  'box-shadow',
  'box-sizing',
  'break-after',
  'break-before',
  'break-inside',
  'caption-side',
  'caret-color',
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'columns',
  'contain',
  'content',
  'content-visibility',
  'counter-increment',
  'counter-reset',
  'cue',
  'cue-after',
  'cue-before',
  'cursor',
  'direction',
  'display',
  'empty-cells',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'float',
  'flow',
  'font',
  'font-display',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-language-override',
  'font-size',
  'font-size-adjust',
  'font-smoothing',
  'font-stretch',
  'font-style',
  'font-synthesis',
  'font-variant',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-position',
  'font-variation-settings',
  'font-weight',
  'gap',
  'glyph-orientation-vertical',
  'grid',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-gap',
  'grid-row',
  'grid-row-end',
  'grid-row-start',
  'grid-template',
  'grid-template-areas',
  'grid-template-columns',
  'grid-template-rows',
  'hanging-punctuation',
  'height',
  'hyphens',
  'icon',
  'image-orientation',
  'image-rendering',
  'image-resolution',
  'ime-mode',
  'inline-size',
  'isolation',
  'justify-content',
  'left',
  'letter-spacing',
  'line-break',
  'line-height',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-top',
  'marks',
  'mask',
  'mask-border',
  'mask-border-mode',
  'mask-border-outset',
  'mask-border-repeat',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-mode',
  'mask-origin',
  'mask-position',
  'mask-repeat',
  'mask-size',
  'mask-type',
  'max-block-size',
  'max-height',
  'max-inline-size',
  'max-width',
  'min-block-size',
  'min-height',
  'min-inline-size',
  'min-width',
  'mix-blend-mode',
  'nav-down',
  'nav-index',
  'nav-left',
  'nav-right',
  'nav-up',
  'none',
  'normal',
  'object-fit',
  'object-position',
  'opacity',
  'order',
  'orphans',
  'outline',
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-wrap',
  'overflow-x',
  'overflow-y',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-top',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'pause',
  'pause-after',
  'pause-before',
  'perspective',
  'perspective-origin',
  'pointer-events',
  'position',
  'quotes',
  'resize',
  'rest',
  'rest-after',
  'rest-before',
  'right',
  'row-gap',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-snap-type',
  'scrollbar-color',
  'scrollbar-gutter',
  'scrollbar-width',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'speak',
  'speak-as',
  'src', // @font-face
  'tab-size',
  'table-layout',
  'text-align',
  'text-align-all',
  'text-align-last',
  'text-combine-upright',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-indent',
  'text-justify',
  'text-orientation',
  'text-overflow',
  'text-rendering',
  'text-shadow',
  'text-transform',
  'text-underline-position',
  'top',
  'transform',
  'transform-box',
  'transform-origin',
  'transform-style',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'unicode-bidi',
  'vertical-align',
  'visibility',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'voice-stress',
  'voice-volume',
  'white-space',
  'widows',
  'width',
  'will-change',
  'word-break',
  'word-spacing',
  'word-wrap',
  'writing-mode',
  'z-index'
  // reverse makes sure longer attributes `font-weight` are matched fully
  // instead of getting false positives on say `font`
].reverse();

/*
Language: CSS
Category: common, css, web
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/

/** @type LanguageFn */
function css(hljs) {
  const regex = hljs.regex;
  const modes = MODES(hljs);
  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes
  const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];

  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag" },
    contains: [
      modes.BLOCK_COMMENT,
      VENDOR_PREFIX,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: 'selector-id',
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: 'selector-class',
        begin: '\\.' + IDENT_RE,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: 'selector-pseudo',
        variants: [
          { begin: ':(' + PSEUDO_CLASSES.join('|') + ')' },
          { begin: ':(:)?(' + PSEUDO_ELEMENTS.join('|') + ')' }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      modes.CSS_VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          modes.BLOCK_COMMENT,
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          ...STRINGS,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0, // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...STRINGS,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          modes.FUNCTION_DISPATCH
        ]
      },
      {
        begin: regex.lookahead(/@/),
        end: '[{;]',
        relevance: 0,
        illegal: /:/, // break on Less variables @var: ...
        contains: [
          {
            className: 'keyword',
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: 'selector-tag',
        begin: '\\b(' + TAGS.join('|') + ')\\b'
      }
    ]
  };
}

module.exports = css;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/dos.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/dos.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: Batch file (DOS)
Author: Alexander Makarov <sam@rmcreative.ru>
Contributors: Anton Kochkov <anton.kochkov@gmail.com>
Website: https://en.wikipedia.org/wiki/Batch_file
*/

/** @type LanguageFn */
function dos(hljs) {
  const COMMENT = hljs.COMMENT(
    /^\s*@?rem\b/, /$/,
    { relevance: 10 }
  );
  const LABEL = {
    className: 'symbol',
    begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
    relevance: 0
  };
  const KEYWORDS = [
    "if",
    "else",
    "goto",
    "for",
    "in",
    "do",
    "call",
    "exit",
    "not",
    "exist",
    "errorlevel",
    "defined",
    "equ",
    "neq",
    "lss",
    "leq",
    "gtr",
    "geq"
  ];
  const BUILT_INS = [
    "prn",
    "nul",
    "lpt3",
    "lpt2",
    "lpt1",
    "con",
    "com4",
    "com3",
    "com2",
    "com1",
    "aux",
    "shift",
    "cd",
    "dir",
    "echo",
    "setlocal",
    "endlocal",
    "set",
    "pause",
    "copy",
    "append",
    "assoc",
    "at",
    "attrib",
    "break",
    "cacls",
    "cd",
    "chcp",
    "chdir",
    "chkdsk",
    "chkntfs",
    "cls",
    "cmd",
    "color",
    "comp",
    "compact",
    "convert",
    "date",
    "dir",
    "diskcomp",
    "diskcopy",
    "doskey",
    "erase",
    "fs",
    "find",
    "findstr",
    "format",
    "ftype",
    "graftabl",
    "help",
    "keyb",
    "label",
    "md",
    "mkdir",
    "mode",
    "more",
    "move",
    "path",
    "pause",
    "print",
    "popd",
    "pushd",
    "promt",
    "rd",
    "recover",
    "rem",
    "rename",
    "replace",
    "restore",
    "rmdir",
    "shift",
    "sort",
    "start",
    "subst",
    "time",
    "title",
    "tree",
    "type",
    "ver",
    "verify",
    "vol",
    // winutils
    "ping",
    "net",
    "ipconfig",
    "taskkill",
    "xcopy",
    "ren",
    "del"
  ];
  return {
    name: 'Batch file (DOS)',
    aliases: [
      'bat',
      'cmd'
    ],
    case_insensitive: true,
    illegal: /\/\*/,
    keywords: {
      keyword: KEYWORDS,
      built_in: BUILT_INS
    },
    contains: [
      {
        className: 'variable',
        begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      },
      {
        className: 'function',
        begin: LABEL.begin,
        end: 'goto:eof',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*' }),
          COMMENT
        ]
      },
      {
        className: 'number',
        begin: '\\b\\d+',
        relevance: 0
      },
      COMMENT
    ]
  };
}

module.exports = dos;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/ini.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/ini.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: TOML, also INI
Description: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.
Contributors: Guillaume Gomez <guillaume1.gomez@gmail.com>
Category: common, config
Website: https://github.com/toml-lang/toml
*/

function ini(hljs) {
  const regex = hljs.regex;
  const NUMBERS = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: /([+-]+)?[\d]+_[\d_]+/ },
      { begin: hljs.NUMBER_RE }
    ]
  };
  const COMMENTS = hljs.COMMENT();
  COMMENTS.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/,
      end: /$/
    }
  ];
  const VARIABLES = {
    className: 'variable',
    variants: [
      { begin: /\$[\w\d"][\w\d_]*/ },
      { begin: /\$\{(.*?)\}/ }
    ]
  };
  const LITERALS = {
    className: 'literal',
    begin: /\bon|off|true|false|yes|no\b/
  };
  const STRINGS = {
    className: "string",
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: "'''",
        end: "'''",
        relevance: 10
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  };
  const ARRAY = {
    begin: /\[/,
    end: /\]/,
    contains: [
      COMMENTS,
      LITERALS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      'self'
    ],
    relevance: 0
  };

  const BARE_KEY = /[A-Za-z0-9_-]+/;
  const QUOTED_KEY_DOUBLE_QUOTE = /"(\\"|[^"])*"/;
  const QUOTED_KEY_SINGLE_QUOTE = /'[^']*'/;
  const ANY_KEY = regex.either(
    BARE_KEY, QUOTED_KEY_DOUBLE_QUOTE, QUOTED_KEY_SINGLE_QUOTE
  );
  const DOTTED_KEY = regex.concat(
    ANY_KEY, '(\\s*\\.\\s*', ANY_KEY, ')*',
    regex.lookahead(/\s*=\s*[^#\s]/)
  );

  return {
    name: 'TOML, also INI',
    aliases: [ 'toml' ],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      COMMENTS,
      {
        className: 'section',
        begin: /\[+/,
        end: /\]+/
      },
      {
        begin: DOTTED_KEY,
        className: 'attr',
        starts: {
          end: /$/,
          contains: [
            COMMENTS,
            ARRAY,
            LITERALS,
            VARIABLES,
            STRINGS,
            NUMBERS
          ]
        }
      }
    ]
  };
}

module.exports = ini;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/javascript.js":
/*!***************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/javascript.js ***!
  \***************************************************************/
/***/ ((module) => {

const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
const KEYWORDS = [
  "as", // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];

const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];

const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",

  "require",
  "exports",

  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];

const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "module",
  "global" // Node.js
];

const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);

/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/

/** @type LanguageFn */
function javascript(hljs) {
  const regex = hljs.regex;
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  // to avoid some special cases inside isTrulyOpeningTag
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" ||
        // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
        ) {
        response.ignoreMatch();
        return;
      }

      // `<something>`
      // Quite possibly a tag, lets look for a matching closing tag...
      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }

      // `<blah />` (self-closing)
      // handled by simpleSelfClosing rule

      let m;
      const afterMatch = match.input.substring(afterMatchIndex);

      // some more template typing stuff
      //  <T = any>(key?: string) => Modify<
      if ((m = afterMatch.match(/^\s*=/))) {
        response.ignoreMatch();
        return;
      }

      // `<From extends string>`
      // technically this could be HTML, but it smells like a type
      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
      if ((m = afterMatch.match(/^\s+extends\s+/))) {
        if (m.index === 0) {
          response.ignoreMatch();
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: 'html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: 'css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          begin: '(?=@[A-Za-z]+)',
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER,
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };

  // ES6 classes
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },

    ]
  };

  const CLASS_REFERENCE = {
    relevance: 0,
    match:
    regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/,
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };

  const USE_STRICT = {
    label: "use_strict",
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };

  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [ PARAMS ],
    illegal: /%/
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }

  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ]),
      IDENT_RE$1, regex.lookahead(/\(/)),
    className: "title.function",
    relevance: 0
  };

  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      { // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };

  const FUNC_LEAD_IN_RE = '(\\(' +
    '[^()]*(\\(' +
    '[^()]*(\\(' +
    '[^()]*' +
    '\\)[^()]*)*' +
    '\\)[^()]*)*' +
    '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/, /\s+/,
      IDENT_RE$1, /\s*/,
      /=\s*/,
      /(async\s*)?/, // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  return {
    name: 'Javascript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        className: 'attr',
        begin: IDENT_RE$1 + regex.lookahead(':'),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          { // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                'on:begin': XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\)[^()]*)*' +
          '\\)[^()]*)*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: '\\$' + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [ /\bconstructor(?=\s*\()/ ],
        className: { 1: "title.function" },
        contains: [ PARAMS ]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

module.exports = javascript;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/json.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/json.js ***!
  \*********************************************************/
/***/ ((module) => {

/*
Language: JSON
Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: http://www.json.org
Category: common, protocols, web
*/

function json(hljs) {
  const ATTRIBUTE = {
    className: 'attr',
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  };
  const PUNCTUATION = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  };
  const LITERALS = [
    "true",
    "false",
    "null"
  ];
  // NOTE: normally we would rely on `keywords` for this but using a mode here allows us
  // - to use the very tight `illegal: \S` rule later to flag any other character
  // - as illegal indicating that despite looking like JSON we do not truly have
  // - JSON and thus improve false-positively greatly since JSON will try and claim
  // - all sorts of JSON looking stuff
  const LITERALS_MODE = {
    scope: "literal",
    beginKeywords: LITERALS.join(" "),
  };

  return {
    name: 'JSON',
    keywords:{
      literal: LITERALS,
    },
    contains: [
      ATTRIBUTE,
      PUNCTUATION,
      hljs.QUOTE_STRING_MODE,
      LITERALS_MODE,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    illegal: '\\S'
  };
}

module.exports = json;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/php.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/php.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: PHP
Author: Victor Karamzin <Victor.Karamzin@enterra-inc.com>
Contributors: Evgeny Stepanischev <imbolk@gmail.com>, Ivan Sagalaev <maniac@softwaremaniacs.org>
Website: https://www.php.net
Category: common
*/

/**
 * @param {HLJSApi} hljs
 * @returns {LanguageDetail}
 * */
function php(hljs) {
  const regex = hljs.regex;
  // negative look-ahead tries to avoid matching patterns that are not
  // Perl at all like $ident$, @ident@, etc.
  const NOT_PERL_ETC = /(?![A-Za-z0-9])(?![$])/;
  const IDENT_RE = regex.concat(
    /[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,
    NOT_PERL_ETC);
  // Will not detect camelCase classes
  const PASCAL_CASE_CLASS_NAME_RE = regex.concat(
    /(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
    NOT_PERL_ETC);
  const VARIABLE = {
    scope: 'variable',
    match: '\\$+' + IDENT_RE,
  };
  const PREPROCESSOR = {
    scope: 'meta',
    variants: [
      { begin: /<\?php/, relevance: 10 }, // boost for obvious PHP
      { begin: /<\?=/ },
      // less relevant per PSR-1 which says not to use short-tags
      { begin: /<\?/, relevance: 0.1 },
      { begin: /\?>/ } // end php tag
    ]
  };
  const SUBST = {
    scope: 'subst',
    variants: [
      { begin: /\$\w+/ },
      {
        begin: /\{\$/,
        end: /\}/
      }
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null, });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
  });
  const HEREDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*(\w+)\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
  });
  // list of valid whitespaces because non-breaking space might be part of a IDENT_RE
  const WHITESPACE = '[ \t\n]';
  const STRING = {
    scope: 'string',
    variants: [
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC
    ]
  };
  const NUMBER = {
    scope: 'number',
    variants: [
      { begin: `\\b0[bB][01]+(?:_[01]+)*\\b` }, // Binary w/ underscore support
      { begin: `\\b0[oO][0-7]+(?:_[0-7]+)*\\b` }, // Octals w/ underscore support
      { begin: `\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b` }, // Hex w/ underscore support
      // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
      { begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?` }
    ],
    relevance: 0
  };
  const LITERALS = [
    "false",
    "null",
    "true"
  ];
  const KWS = [
    // Magic constants:
    // <https://www.php.net/manual/en/language.constants.predefined.php>
    "__CLASS__",
    "__DIR__",
    "__FILE__",
    "__FUNCTION__",
    "__COMPILER_HALT_OFFSET__",
    "__LINE__",
    "__METHOD__",
    "__NAMESPACE__",
    "__TRAIT__",
    // Function that look like language construct or language construct that look like function:
    // List of keywords that may not require parenthesis
    "die",
    "echo",
    "exit",
    "include",
    "include_once",
    "print",
    "require",
    "require_once",
    // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
    // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
    // Other keywords:
    // <https://www.php.net/manual/en/reserved.php>
    // <https://www.php.net/manual/en/language.types.type-juggling.php>
    "array",
    "abstract",
    "and",
    "as",
    "binary",
    "bool",
    "boolean",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "double",
    "else",
    "elseif",
    "empty",
    "enddeclare",
    "endfor",
    "endforeach",
    "endif",
    "endswitch",
    "endwhile",
    "enum",
    "eval",
    "extends",
    "final",
    "finally",
    "float",
    "for",
    "foreach",
    "from",
    "global",
    "goto",
    "if",
    "implements",
    "instanceof",
    "insteadof",
    "int",
    "integer",
    "interface",
    "isset",
    "iterable",
    "list",
    "match|0",
    "mixed",
    "new",
    "never",
    "object",
    "or",
    "private",
    "protected",
    "public",
    "readonly",
    "real",
    "return",
    "string",
    "switch",
    "throw",
    "trait",
    "try",
    "unset",
    "use",
    "var",
    "void",
    "while",
    "xor",
    "yield"
  ];

  const BUILT_INS = [
    // Standard PHP library:
    // <https://www.php.net/manual/en/book.spl.php>
    "Error|0",
    "AppendIterator",
    "ArgumentCountError",
    "ArithmeticError",
    "ArrayIterator",
    "ArrayObject",
    "AssertionError",
    "BadFunctionCallException",
    "BadMethodCallException",
    "CachingIterator",
    "CallbackFilterIterator",
    "CompileError",
    "Countable",
    "DirectoryIterator",
    "DivisionByZeroError",
    "DomainException",
    "EmptyIterator",
    "ErrorException",
    "Exception",
    "FilesystemIterator",
    "FilterIterator",
    "GlobIterator",
    "InfiniteIterator",
    "InvalidArgumentException",
    "IteratorIterator",
    "LengthException",
    "LimitIterator",
    "LogicException",
    "MultipleIterator",
    "NoRewindIterator",
    "OutOfBoundsException",
    "OutOfRangeException",
    "OuterIterator",
    "OverflowException",
    "ParentIterator",
    "ParseError",
    "RangeException",
    "RecursiveArrayIterator",
    "RecursiveCachingIterator",
    "RecursiveCallbackFilterIterator",
    "RecursiveDirectoryIterator",
    "RecursiveFilterIterator",
    "RecursiveIterator",
    "RecursiveIteratorIterator",
    "RecursiveRegexIterator",
    "RecursiveTreeIterator",
    "RegexIterator",
    "RuntimeException",
    "SeekableIterator",
    "SplDoublyLinkedList",
    "SplFileInfo",
    "SplFileObject",
    "SplFixedArray",
    "SplHeap",
    "SplMaxHeap",
    "SplMinHeap",
    "SplObjectStorage",
    "SplObserver",
    "SplPriorityQueue",
    "SplQueue",
    "SplStack",
    "SplSubject",
    "SplTempFileObject",
    "TypeError",
    "UnderflowException",
    "UnexpectedValueException",
    "UnhandledMatchError",
    // Reserved interfaces:
    // <https://www.php.net/manual/en/reserved.interfaces.php>
    "ArrayAccess",
    "BackedEnum",
    "Closure",
    "Fiber",
    "Generator",
    "Iterator",
    "IteratorAggregate",
    "Serializable",
    "Stringable",
    "Throwable",
    "Traversable",
    "UnitEnum",
    "WeakReference",
    "WeakMap",
    // Reserved classes:
    // <https://www.php.net/manual/en/reserved.classes.php>
    "Directory",
    "__PHP_Incomplete_Class",
    "parent",
    "php_user_filter",
    "self",
    "static",
    "stdClass"
  ];

  /** Dual-case keywords
   *
   * ["then","FILE"] =>
   *     ["then", "THEN", "FILE", "file"]
   *
   * @param {string[]} items */
  const dualCase = (items) => {
    /** @type string[] */
    const result = [];
    items.forEach(item => {
      result.push(item);
      if (item.toLowerCase() === item) {
        result.push(item.toUpperCase());
      } else {
        result.push(item.toLowerCase());
      }
    });
    return result;
  };

  const KEYWORDS = {
    keyword: KWS,
    literal: dualCase(LITERALS),
    built_in: BUILT_INS,
  };

  /**
   * @param {string[]} items */
  const normalizeKeywords = (items) => {
    return items.map(item => {
      return item.replace(/\|\d+$/, "");
    });
  };

  const CONSTRUCTOR_CALL = { variants: [
    {
      match: [
        /new/,
        regex.concat(WHITESPACE, "+"),
        // to prevent built ins from being confused as the class constructor call
        regex.concat("(?!", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
        PASCAL_CASE_CLASS_NAME_RE,
      ],
      scope: {
        1: "keyword",
        4: "title.class",
      },
    }
  ] };

  const CONSTANT_REFERENCE = regex.concat(IDENT_RE, "\\b(?!\\()");

  const LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON = { variants: [
    {
      match: [
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE,
      ],
      scope: { 2: "variable.constant", },
    },
    {
      match: [
        /::/,
        /class/,
      ],
      scope: { 2: "variable.language", },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          /::/,
          regex.lookahead(/(?!class\b)/)
        ),
        CONSTANT_REFERENCE,
      ],
      scope: {
        1: "title.class",
        3: "variable.constant",
      },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        regex.concat(
          "::",
          regex.lookahead(/(?!class\b)/)
        ),
      ],
      scope: { 1: "title.class", },
    },
    {
      match: [
        PASCAL_CASE_CLASS_NAME_RE,
        /::/,
        /class/,
      ],
      scope: {
        1: "title.class",
        3: "variable.language",
      },
    }
  ] };

  const NAMED_ARGUMENT = {
    scope: 'attr',
    match: regex.concat(IDENT_RE, regex.lookahead(':'), regex.lookahead(/(?!::)/)),
  };
  const PARAMS_MODE = {
    relevance: 0,
    begin: /\(/,
    end: /\)/,
    keywords: KEYWORDS,
    contains: [
      NAMED_ARGUMENT,
      VARIABLE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      NUMBER,
      CONSTRUCTOR_CALL,
    ],
  };
  const FUNCTION_INVOKE = {
    relevance: 0,
    match: [
      /\b/,
      // to prevent keywords from being confused as the function title
      regex.concat("(?!fn\\b|function\\b|", normalizeKeywords(KWS).join("\\b|"), "|", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
      IDENT_RE,
      regex.concat(WHITESPACE, "*"),
      regex.lookahead(/(?=\()/)
    ],
    scope: { 3: "title.function.invoke", },
    contains: [ PARAMS_MODE ]
  };
  PARAMS_MODE.contains.push(FUNCTION_INVOKE);

  const ATTRIBUTE_CONTAINS = [
    NAMED_ARGUMENT,
    LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING,
    NUMBER,
    CONSTRUCTOR_CALL,
  ];

  const ATTRIBUTES = {
    begin: regex.concat(/#\[\s*/, PASCAL_CASE_CLASS_NAME_RE),
    beginScope: "meta",
    end: /]/,
    endScope: "meta",
    keywords: {
      literal: LITERALS,
      keyword: [
        'new',
        'array',
      ]
    },
    contains: [
      {
        begin: /\[/,
        end: /]/,
        keywords: {
          literal: LITERALS,
          keyword: [
            'new',
            'array',
          ]
        },
        contains: [
          'self',
          ...ATTRIBUTE_CONTAINS,
        ]
      },
      ...ATTRIBUTE_CONTAINS,
      {
        scope: 'meta',
        match: PASCAL_CASE_CLASS_NAME_RE
      }
    ]
  };

  return {
    case_insensitive: false,
    keywords: KEYWORDS,
    contains: [
      ATTRIBUTES,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('//', '$'),
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        { contains: [
          {
            scope: 'doctag',
            match: '@[A-Za-z]+'
          }
        ] }
      ),
      {
        match: /__halt_compiler\(\);/,
        keywords: '__halt_compiler',
        starts: {
          scope: "comment",
          end: hljs.MATCH_NOTHING_RE,
          contains: [
            {
              match: /\?>/,
              scope: "meta",
              endsParent: true
            }
          ]
        }
      },
      PREPROCESSOR,
      {
        scope: 'variable.language',
        match: /\$this\b/
      },
      VARIABLE,
      FUNCTION_INVOKE,
      LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
      {
        match: [
          /const/,
          /\s/,
          IDENT_RE,
        ],
        scope: {
          1: "keyword",
          3: "variable.constant",
        },
      },
      CONSTRUCTOR_CALL,
      {
        scope: 'function',
        relevance: 0,
        beginKeywords: 'fn function',
        end: /[;{]/,
        excludeEnd: true,
        illegal: '[$%\\[]',
        contains: [
          { beginKeywords: 'use', },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: '=>', // No markup, just a relevance booster
            endsParent: true
          },
          {
            scope: 'params',
            begin: '\\(',
            end: '\\)',
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              'self',
              VARIABLE,
              LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          },
        ]
      },
      {
        scope: 'class',
        variants: [
          {
            beginKeywords: "enum",
            illegal: /[($"]/
          },
          {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: 'extends implements' },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      // both use and namespace still use "old style" rules (vs multi-match)
      // because the namespace name can include `\` and we still want each
      // element to be treated as its own *individual* title
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: ';',
        illegal: /[.']/,
        contains: [ hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { scope: "title.class" }) ]
      },
      {
        beginKeywords: 'use',
        relevance: 0,
        end: ';',
        contains: [
          // TODO: title.function vs title.class
          {
            match: /\b(as|const|function)\b/,
            scope: "keyword"
          },
          // TODO: could be title.class or title.function
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      STRING,
      NUMBER,
    ]
  };
}

module.exports = php;


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/xml.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/xml.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: HTML, XML
Website: https://www.w3.org/XML/
Category: common, web
Audit: 2020
*/

/** @type LanguageFn */
function xml(hljs) {
  const regex = hljs.regex;
  // XML names can have the following additional letters: https://www.w3.org/TR/xml/#NT-NameChar
  // OTHER_NAME_CHARS = /[:\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]/;
  // Element names start with NAME_START_CHAR followed by optional other Unicode letters, ASCII digits, hyphens, underscores, and periods
  // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);;
  // const XML_IDENT_RE = /[A-Z_a-z:\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]+/;
  // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);
  // however, to cater for performance and more Unicode support rely simply on the Unicode letter class
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: 'symbol',
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: 'keyword',
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: 'string' });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: 'string' });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: 'string',
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [ XML_ENTITIES ]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [ XML_ENTITIES ]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: 'HTML, XML',
    aliases: [
      'html',
      'xhtml',
      'rss',
      'atom',
      'xjb',
      'xsd',
      'xsl',
      'plist',
      'wsf',
      'svg'
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: 'meta',
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: 'meta',
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: 'meta',
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/,
          }
        ]

      },
      {
        className: 'tag',
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: 'style' },
        contains: [ TAG_INTERNALS ],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            'css',
            'xml'
          ]
        }
      },
      {
        className: 'tag',
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: 'script' },
        contains: [ TAG_INTERNALS ],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            'javascript',
            'handlebars',
            'xml'
          ]
        }
      },
      // we need this for now for jSX
      {
        className: 'tag',
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: 'tag',
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: 'name',
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: 'tag',
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE, />/
          ))
        ),
        contains: [
          {
            className: 'name',
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}

module.exports = xml;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/css/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;