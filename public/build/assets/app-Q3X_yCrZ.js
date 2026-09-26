//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var core_default = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	function deepFreeze(obj) {
		if (obj instanceof Map) obj.clear = obj.delete = obj.set = function() {
			throw new Error("map is read-only");
		};
		else if (obj instanceof Set) obj.add = obj.clear = obj.delete = function() {
			throw new Error("set is read-only");
		};
		Object.freeze(obj);
		Object.getOwnPropertyNames(obj).forEach((name) => {
			const prop = obj[name];
			const type = typeof prop;
			if ((type === "object" || type === "function") && !Object.isFrozen(prop)) deepFreeze(prop);
		});
		return obj;
	}
	/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
	/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
	/** @implements CallbackResponse */
	var Response = class {
		/**
		* @param {CompiledMode} mode
		*/
		constructor(mode) {
			if (mode.data === void 0) mode.data = {};
			this.data = mode.data;
			this.isMatchIgnored = false;
		}
		ignoreMatch() {
			this.isMatchIgnored = true;
		}
	};
	/**
	* @param {string} value
	* @returns {string}
	*/
	function escapeHTML(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
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
		for (const key in original) result[key] = original[key];
		objects.forEach(function(obj) {
			for (const key in obj) result[key] = obj[key];
		});
		return result;
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
	var SPAN_CLOSE = "</span>";
	/**
	* Determines if a node needs to be wrapped in <span>
	*
	* @param {Node} node */
	var emitsWrappingTags = (node) => {
		return !!node.scope;
	};
	/**
	*
	* @param {string} name
	* @param {{prefix:string}} options
	*/
	var scopeToCSSClass = (name, { prefix }) => {
		if (name.startsWith("language:")) return name.replace("language:", "language-");
		if (name.includes(".")) {
			const pieces = name.split(".");
			return [`${prefix}${pieces.shift()}`, ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)].join(" ");
		}
		return `${prefix}${name}`;
	};
	/** @type {Renderer} */
	var HTMLRenderer = class {
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
			const className = scopeToCSSClass(node.scope, { prefix: this.classPrefix });
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
		/**
		* Builds a span element
		*
		* @param {string} className */
		span(className) {
			this.buffer += `<span class="${className}">`;
		}
	};
	/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
	/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
	/** @typedef {import('highlight.js').Emitter} Emitter */
	/**  */
	/** @returns {DataNode} */
	var newNode = (opts = {}) => {
		/** @type DataNode */
		const result = { children: [] };
		Object.assign(result, opts);
		return result;
	};
	var TokenTree = class TokenTree {
		constructor() {
			/** @type DataNode */
			this.rootNode = newNode();
			this.stack = [this.rootNode];
		}
		get top() {
			return this.stack[this.stack.length - 1];
		}
		get root() {
			return this.rootNode;
		}
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
			if (this.stack.length > 1) return this.stack.pop();
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
			return this.constructor._walk(builder, this.rootNode);
		}
		/**
		* @param {Renderer} builder
		* @param {Node} node
		*/
		static _walk(builder, node) {
			if (typeof node === "string") builder.addText(node);
			else if (node.children) {
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
			if (node.children.every((el) => typeof el === "string")) node.children = [node.children.join("")];
			else node.children.forEach((child) => {
				TokenTree._collapse(child);
			});
		}
	};
	/**
	Currently this is all private API, but this is the minimal API necessary
	that an Emitter must implement to fully support the parser.
	
	Minimal interface:
	
	- addText(text)
	- __addSublanguage(emitter, subLanguageName)
	- startScope(scope)
	- endScope()
	- finalize()
	- toHTML()
	
	*/
	/**
	* @implements {Emitter}
	*/
	var TokenTreeEmitter = class extends TokenTree {
		/**
		* @param {*} options
		*/
		constructor(options) {
			super();
			this.options = options;
		}
		/**
		* @param {string} text
		*/
		addText(text) {
			if (text === "") return;
			this.add(text);
		}
		/** @param {string} scope */
		startScope(scope) {
			this.openNode(scope);
		}
		endScope() {
			this.closeNode();
		}
		/**
		* @param {Emitter & {root: DataNode}} emitter
		* @param {string} name
		*/
		__addSublanguage(emitter, name) {
			/** @type DataNode */
			const node = emitter.root;
			if (name) node.scope = `language:${name}`;
			this.add(node);
		}
		toHTML() {
			return new HTMLRenderer(this, this.options).value();
		}
		finalize() {
			this.closeAllNodes();
			return true;
		}
	};
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
		return concat("(?=", re, ")");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function anyNumberOfTimes(re) {
		return concat("(?:", re, ")*");
	}
	/**
	* @param {RegExp | string } re
	* @returns {string}
	*/
	function optional(re) {
		return concat("(?:", re, ")?");
	}
	/**
	* @param {...(RegExp | string) } args
	* @returns {string}
	*/
	function concat(...args) {
		return args.map((x) => source(x)).join("");
	}
	/**
	* @param { Array<string | RegExp | Object> } args
	* @returns {object}
	*/
	function stripOptionsFromArgs(args) {
		const opts = args[args.length - 1];
		if (typeof opts === "object" && opts.constructor === Object) {
			args.splice(args.length - 1, 1);
			return opts;
		} else return {};
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
		return "(" + (stripOptionsFromArgs(args).capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
	}
	/**
	* @param {RegExp | string} re
	* @returns {number}
	*/
	function countMatchGroups(re) {
		return new RegExp(re.toString() + "|").exec("").length - 1;
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
	var BACKREF_RE = new RegExp(either(/\[(?:[^\\\]]|\\.)*\]/, /\(\?<(?![=!])[^>]+>/, /\(\?'[^']+'/, /\(\??/, /\\([1-9][0-9]*)/, /\\./));
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
			let out = "";
			while (re.length > 0) {
				const match = BACKREF_RE.exec(re);
				if (!match) {
					out += re;
					break;
				}
				out += re.substring(0, match.index);
				re = re.substring(match.index + match[0].length);
				if (match[0][0] === "\\" && match[1]) out += "\\" + String(Number(match[1]) + offset);
				else {
					out += match[0];
					if (match[0] === "(" || /^\(\?[<']/.test(match[0])) numCaptures++;
				}
			}
			return out;
		}).map((re) => `(${re})`).join(joinWith);
	}
	/** @typedef {import('highlight.js').Mode} Mode */
	/** @typedef {import('highlight.js').ModeCallback} ModeCallback */
	var MATCH_NOTHING_RE = /\b\B/;
	var IDENT_RE = "[a-zA-Z]\\w*";
	var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
	var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
	var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
	var BINARY_NUMBER_RE = "\\b(0b[01]+)";
	var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	/**
	* @param { Partial<Mode> & {binary?: string | RegExp} } opts
	*/
	var SHEBANG = (opts = {}) => {
		const beginShebang = /^#![ ]*\//;
		if (opts.binary) opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
		return inherit$1({
			scope: "meta",
			begin: beginShebang,
			end: /$/,
			relevance: 0,
			/** @type {ModeCallback} */
			"on:begin": (m, resp) => {
				if (m.index !== 0) resp.ignoreMatch();
			}
		}, opts);
	};
	var BACKSLASH_ESCAPE = {
		begin: "\\\\[\\s\\S]",
		relevance: 0
	};
	var APOS_STRING_MODE = {
		scope: "string",
		begin: "'",
		end: "'",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	var QUOTE_STRING_MODE = {
		scope: "string",
		begin: "\"",
		end: "\"",
		illegal: "\\n",
		contains: [BACKSLASH_ESCAPE]
	};
	var PHRASAL_WORDS_MODE = { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ };
	/**
	* Creates a comment mode
	*
	* @param {string | RegExp} begin
	* @param {string | RegExp} end
	* @param {Mode | {}} [modeOptions]
	* @returns {Partial<Mode>}
	*/
	var COMMENT = function(begin, end, modeOptions = {}) {
		const mode = inherit$1({
			scope: "comment",
			begin,
			end,
			contains: []
		}, modeOptions);
		mode.contains.push({
			scope: "doctag",
			begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
			end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
			excludeBegin: true,
			relevance: 0
		});
		const ENGLISH_WORD = either("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
		mode.contains.push({ begin: concat(/[ ]+/, "(", ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, "){3}") });
		return mode;
	};
	var C_LINE_COMMENT_MODE = COMMENT("//", "$");
	var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
	var HASH_COMMENT_MODE = COMMENT("#", "$");
	var NUMBER_MODE = {
		scope: "number",
		begin: NUMBER_RE,
		relevance: 0
	};
	var C_NUMBER_MODE = {
		scope: "number",
		begin: C_NUMBER_RE,
		relevance: 0
	};
	var BINARY_NUMBER_MODE = {
		scope: "number",
		begin: BINARY_NUMBER_RE,
		relevance: 0
	};
	var REGEXP_MODE = {
		scope: "regexp",
		begin: /\/(?=[^/\n]*\/)/,
		end: /\/[gimuy]*/,
		contains: [BACKSLASH_ESCAPE, {
			begin: /\[/,
			end: /\]/,
			relevance: 0,
			contains: [BACKSLASH_ESCAPE]
		}]
	};
	var TITLE_MODE = {
		scope: "title",
		begin: IDENT_RE,
		relevance: 0
	};
	var UNDERSCORE_TITLE_MODE = {
		scope: "title",
		begin: UNDERSCORE_IDENT_RE,
		relevance: 0
	};
	var METHOD_GUARD = {
		begin: "\\.\\s*[a-zA-Z_]\\w*",
		relevance: 0
	};
	/**
	* Adds end same as begin mechanics to a mode
	*
	* Your mode must include at least a single () match group as that first match
	* group is what is used for comparison
	* @param {Partial<Mode>} mode
	*/
	var END_SAME_AS_BEGIN = function(mode) {
		return Object.assign(mode, {
			/** @type {ModeCallback} */
			"on:begin": (m, resp) => {
				resp.data._beginMatch = m[1];
			},
			/** @type {ModeCallback} */
			"on:end": (m, resp) => {
				if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
			}
		});
	};
	var MODES = /*#__PURE__*/ Object.freeze({
		__proto__: null,
		APOS_STRING_MODE,
		BACKSLASH_ESCAPE,
		BINARY_NUMBER_MODE,
		BINARY_NUMBER_RE,
		COMMENT,
		C_BLOCK_COMMENT_MODE,
		C_LINE_COMMENT_MODE,
		C_NUMBER_MODE,
		C_NUMBER_RE,
		END_SAME_AS_BEGIN,
		HASH_COMMENT_MODE,
		IDENT_RE,
		MATCH_NOTHING_RE,
		METHOD_GUARD,
		NUMBER_MODE,
		NUMBER_RE,
		PHRASAL_WORDS_MODE,
		QUOTE_STRING_MODE,
		REGEXP_MODE,
		RE_STARTERS_RE,
		SHEBANG,
		TITLE_MODE,
		UNDERSCORE_IDENT_RE,
		UNDERSCORE_TITLE_MODE
	});
	/**
	@typedef {import('highlight.js').CallbackResponse} CallbackResponse
	@typedef {import('highlight.js').CompilerExt} CompilerExt
	*/
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
		if (match.input[match.index - 1] === ".") response.ignoreMatch();
	}
	/**
	*
	* @type {CompilerExt}
	*/
	function scopeClassName(mode, _parent) {
		if (mode.className !== void 0) {
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
		mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
		mode.__beforeBegin = skipIfHasPrecedingDot;
		mode.keywords = mode.keywords || mode.beginKeywords;
		delete mode.beginKeywords;
		if (mode.relevance === void 0) mode.relevance = 0;
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
		if (mode.relevance === void 0) mode.relevance = 1;
	}
	var beforeMatchExt = (mode, parent) => {
		if (!mode.beforeMatch) return;
		if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
		const originalMode = Object.assign({}, mode);
		Object.keys(mode).forEach((key) => {
			delete mode[key];
		});
		mode.keywords = originalMode.keywords;
		mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
		mode.starts = {
			relevance: 0,
			contains: [Object.assign(originalMode, { endsParent: true })]
		};
		mode.relevance = 0;
		delete originalMode.beforeMatch;
	};
	var COMMON_KEYWORDS = [
		"of",
		"and",
		"for",
		"in",
		"not",
		"or",
		"if",
		"then",
		"parent",
		"list",
		"value"
	];
	var DEFAULT_KEYWORD_SCOPE = "keyword";
	/**
	* Given raw keywords from a language definition, compile them.
	*
	* @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
	* @param {boolean} caseInsensitive
	*/
	function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
		/** @type {import("highlight.js/private").KeywordDict} */
		const compiledKeywords = Object.create(null);
		if (typeof rawKeywords === "string") compileList(scopeName, rawKeywords.split(" "));
		else if (Array.isArray(rawKeywords)) compileList(scopeName, rawKeywords);
		else Object.keys(rawKeywords).forEach(function(scopeName) {
			Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName));
		});
		return compiledKeywords;
		/**
		* Compiles an individual list of keywords
		*
		* Ex: "for if when while|5"
		*
		* @param {string} scopeName
		* @param {Array<string>} keywordList
		*/
		function compileList(scopeName, keywordList) {
			if (caseInsensitive) keywordList = keywordList.map((x) => x.toLowerCase());
			keywordList.forEach(function(keyword) {
				const pair = keyword.split("|");
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
		if (providedScore) return Number(providedScore);
		return commonKeyword(keyword) ? 0 : 1;
	}
	/**
	* Determines if a given keyword is common or not
	*
	* @param {string} keyword */
	function commonKeyword(keyword) {
		return COMMON_KEYWORDS.includes(keyword.toLowerCase());
	}
	/**
	* @type {Record<string, boolean>}
	*/
	var seenDeprecations = {};
	/**
	* @param {string} message
	*/
	var error = (message) => {
		console.error(message);
	};
	/**
	* @param {string} message
	* @param {any} args
	*/
	var warn = (message, ...args) => {
		console.log(`WARN: ${message}`, ...args);
	};
	/**
	* @param {string} version
	* @param {string} message
	*/
	var deprecated = (version, message) => {
		if (seenDeprecations[`${version}/${message}`]) return;
		console.log(`Deprecated as of ${version}. ${message}`);
		seenDeprecations[`${version}/${message}`] = true;
	};
	/**
	@typedef {import('highlight.js').CompiledMode} CompiledMode
	*/
	var MultiClassError = /* @__PURE__ */ new Error();
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
		if (typeof mode.beginScope === "string") mode.beginScope = { _wrap: mode.beginScope };
		if (typeof mode.endScope === "string") mode.endScope = { _wrap: mode.endScope };
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
			return new RegExp(source(value), "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : ""));
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
				this.regexes = [];
				this.matchAt = 1;
				this.position = 0;
			}
			addRule(re, opts) {
				opts.position = this.position++;
				this.matchIndexes[this.matchAt] = opts;
				this.regexes.push([opts, re]);
				this.matchAt += countMatchGroups(re) + 1;
			}
			compile() {
				if (this.regexes.length === 0) this.exec = () => null;
				const terminators = this.regexes.map((el) => el[1]);
				this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
				this.lastIndex = 0;
			}
			/** @param {string} s */
			exec(s) {
				this.matcherRe.lastIndex = this.lastIndex;
				const match = this.matcherRe.exec(s);
				if (!match) return null;
				const i = match.findIndex((el, i) => i > 0 && el !== void 0);
				const matchData = this.matchIndexes[i];
				match.splice(0, i);
				return Object.assign(match, matchData);
			}
		}
		class ResumableMultiRegex {
			constructor() {
				this.rules = [];
				this.multiRegexes = [];
				this.count = 0;
				this.lastIndex = 0;
				this.regexIndex = 0;
			}
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
			addRule(re, opts) {
				this.rules.push([re, opts]);
				if (opts.type === "begin") this.count++;
			}
			/** @param {string} s */
			exec(s) {
				const m = this.getMatcher(this.regexIndex);
				m.lastIndex = this.lastIndex;
				let result = m.exec(s);
				if (this.resumingScanAtSamePosition()) {
					if (result && result.index === this.lastIndex);
					else {
						const m2 = this.getMatcher(0);
						m2.lastIndex = this.lastIndex + 1;
						result = m2.exec(s);
					}
				}
				if (result) {
					this.regexIndex += result.position + 1;
					if (this.regexIndex === this.count) this.considerAll();
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
			mode.contains.forEach((term) => mm.addRule(term.begin, {
				rule: term,
				type: "begin"
			}));
			if (mode.terminatorEnd) mm.addRule(mode.terminatorEnd, { type: "end" });
			if (mode.illegal) mm.addRule(mode.illegal, { type: "illegal" });
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
			const cmode = mode;
			if (mode.isCompiled) return cmode;
			[
				scopeClassName,
				compileMatch,
				MultiClass,
				beforeMatchExt
			].forEach((ext) => ext(mode, parent));
			language.compilerExtensions.forEach((ext) => ext(mode, parent));
			mode.__beforeBegin = null;
			[
				beginKeywords,
				compileIllegal,
				compileRelevance
			].forEach((ext) => ext(mode, parent));
			mode.isCompiled = true;
			let keywordPattern = null;
			if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
				mode.keywords = Object.assign({}, mode.keywords);
				keywordPattern = mode.keywords.$pattern;
				delete mode.keywords.$pattern;
			}
			keywordPattern = keywordPattern || /\w+/;
			if (mode.keywords) mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
			cmode.keywordPatternRe = langRe(keywordPattern, true);
			if (parent) {
				if (!mode.begin) mode.begin = /\B|\b/;
				cmode.beginRe = langRe(cmode.begin);
				if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
				if (mode.end) cmode.endRe = langRe(cmode.end);
				cmode.terminatorEnd = source(cmode.end) || "";
				if (mode.endsWithParent && parent.terminatorEnd) cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
			}
			if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
			if (!mode.contains) mode.contains = [];
			mode.contains = [].concat(...mode.contains.map(function(c) {
				return expandOrCloneMode(c === "self" ? mode : c);
			}));
			mode.contains.forEach(function(c) {
				compileMode(c, cmode);
			});
			if (mode.starts) compileMode(mode.starts, parent);
			cmode.matcher = buildModeRegex(cmode);
			return cmode;
		}
		if (!language.compilerExtensions) language.compilerExtensions = [];
		if (language.contains && language.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
		language.classNameAliases = inherit$1(language.classNameAliases || {});
		return compileMode(language);
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
		if (mode.variants && !mode.cachedVariants) mode.cachedVariants = mode.variants.map(function(variant) {
			return inherit$1(mode, { variants: null }, variant);
		});
		if (mode.cachedVariants) return mode.cachedVariants;
		if (dependencyOnParent(mode)) return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
		if (Object.isFrozen(mode)) return inherit$1(mode);
		return mode;
	}
	var version = "11.12.0";
	var HTMLInjectionError = class extends Error {
		constructor(reason, html) {
			super(reason);
			this.name = "HTMLInjectionError";
			this.html = html;
		}
	};
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
	var escape = escapeHTML;
	var inherit = inherit$1;
	var NO_MATCH = Symbol("nomatch");
	var MAX_KEYWORD_HITS = 7;
	/**
	* @param {any} hljs - object that is extended (legacy)
	* @returns {HLJSApi}
	*/
	var HLJS = function(hljs) {
		/** @type {Record<string, Language>} */
		const languages = Object.create(null);
		/** @type {Record<string, string>} */
		const aliases = Object.create(null);
		/** @type {HLJSPlugin[]} */
		const plugins = [];
		let SAFE_MODE = true;
		const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
		/** @type {Language} */
		const PLAINTEXT_LANGUAGE = {
			disableAutodetect: true,
			name: "Plain text",
			contains: []
		};
		/** @type HLJSOptions */
		let options = {
			ignoreUnescapedHTML: false,
			throwUnescapedHTML: false,
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: "hljs-",
			cssSelector: "pre code",
			languages: null,
			__emitter: TokenTreeEmitter
		};
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
			let classes = block.className + " ";
			classes += block.parentNode ? block.parentNode.className : "";
			const match = options.languageDetectRe.exec(classes);
			if (match) {
				const language = getLanguage(match[1]);
				if (!language) {
					warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
					warn("Falling back to no-highlight mode for this block.", block);
				}
				return language ? match[1] : "no-highlight";
			}
			return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
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
				deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
				deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
				languageName = codeOrLanguageName;
				code = optionsOrCode;
			}
			if (ignoreIllegals === void 0) ignoreIllegals = true;
			/** @type {BeforeHighlightContext} */
			const context = {
				code,
				language: languageName
			};
			fire("before:highlight", context);
			const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
			result.code = context.code;
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
						if (kind.startsWith("_")) buf += match[0];
						else {
							const cssClass = language.classNameAliases[kind] || kind;
							emitKeyword(match[0], cssClass);
						}
					} else buf += match[0];
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
				if (typeof top.subLanguage === "string") {
					if (!languages[top.subLanguage]) {
						emitter.addText(modeBuffer);
						return;
					}
					result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
					continuations[top.subLanguage] = result._top;
				} else result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
				if (top.relevance > 0) relevance += result.relevance;
				emitter.__addSublanguage(result._emitter, result.language);
			}
			function processBuffer() {
				if (top.subLanguage != null) processSubLanguage();
				else processKeywords();
				modeBuffer = "";
			}
			/**
			* @param {string} text
			* @param {string} scope
			*/
			function emitKeyword(keyword, scope) {
				if (keyword === "") return;
				emitter.startScope(scope);
				emitter.addText(keyword);
				emitter.endScope();
			}
			/**
			* @param {CompiledScope} scope
			* @param {RegExpMatchArray} match
			*/
			function emitMultiClass(scope, match) {
				let i = 1;
				const max = match.length - 1;
				while (i <= max) {
					if (!scope._emit[i]) {
						i++;
						continue;
					}
					const klass = language.classNameAliases[scope[i]] || scope[i];
					const text = match[i];
					if (klass) emitKeyword(text, klass);
					else {
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
				if (mode.scope && typeof mode.scope === "string") emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
				if (mode.beginScope) {
					if (mode.beginScope._wrap) {
						emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
						modeBuffer = "";
					} else if (mode.beginScope._multi) {
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
						while (mode.endsParent && mode.parent) mode = mode.parent;
						return mode;
					}
				}
				if (mode.endsWithParent) return endOfMode(mode.parent, match, matchPlusRemainder);
			}
			/**
			* Handle matching but then ignoring a sequence of text
			*
			* @param {string} lexeme - string containing full match text
			*/
			function doIgnore(lexeme) {
				if (top.matcher.regexIndex === 0) {
					modeBuffer += lexeme[0];
					return 1;
				} else {
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
				const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
				for (const cb of beforeCallbacks) {
					if (!cb) continue;
					cb(match, resp);
					if (resp.isMatchIgnored) return doIgnore(lexeme);
				}
				if (newMode.skip) modeBuffer += lexeme;
				else {
					if (newMode.excludeBegin) modeBuffer += lexeme;
					processBuffer();
					if (!newMode.returnBegin && !newMode.excludeBegin) modeBuffer = lexeme;
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
				if (!endMode) return NO_MATCH;
				const origin = top;
				if (top.endScope && top.endScope._wrap) {
					processBuffer();
					emitKeyword(lexeme, top.endScope._wrap);
				} else if (top.endScope && top.endScope._multi) {
					processBuffer();
					emitMultiClass(top.endScope, match);
				} else if (origin.skip) modeBuffer += lexeme;
				else {
					if (!(origin.returnEnd || origin.excludeEnd)) modeBuffer += lexeme;
					processBuffer();
					if (origin.excludeEnd) modeBuffer = lexeme;
				}
				do {
					if (top.scope) emitter.closeNode();
					if (!top.skip && !top.subLanguage) relevance += top.relevance;
					top = top.parent;
				} while (top !== endMode.parent);
				if (endMode.starts) startNewMode(endMode.starts, match);
				return origin.returnEnd ? 0 : lexeme.length;
			}
			function processContinuations() {
				const list = [];
				for (let current = top; current !== language; current = current.parent) if (current.scope) list.unshift(current.scope);
				list.forEach((item) => emitter.openNode(item));
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
				modeBuffer += textBeforeMatch;
				if (lexeme == null) {
					processBuffer();
					return 0;
				}
				if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
					modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
					if (!SAFE_MODE) {
						/** @type {AnnotatedError} */
						const err = /* @__PURE__ */ new Error(`0 width match regex (${languageName})`);
						err.languageName = languageName;
						err.badRule = lastMatch.rule;
						throw err;
					}
					return 1;
				}
				lastMatch = match;
				if (match.type === "begin") return doBeginMatch(match);
				else if (match.type === "illegal" && !ignoreIllegals) {
					/** @type {AnnotatedError} */
					const err = /* @__PURE__ */ new Error("Illegal lexeme \"" + lexeme + "\" for mode \"" + (top.scope || "<unnamed>") + "\"");
					err.mode = top;
					throw err;
				} else if (match.type === "end") {
					const processed = doEndMatch(match);
					if (processed !== NO_MATCH) return processed;
				}
				if (match.type === "illegal" && lexeme === "") {
					if (match.index === codeToHighlight.length);
					else modeBuffer += "\n";
					return 1;
				}
				if (iterations > 1e5 && iterations > match.index * 3) throw /* @__PURE__ */ new Error("potential infinite loop, way more iterations than matches");
				modeBuffer += lexeme;
				return lexeme.length;
			}
			const language = getLanguage(languageName);
			if (!language) {
				error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
				throw new Error("Unknown language: \"" + languageName + "\"");
			}
			const md = compileLanguage(language);
			let result = "";
			/** @type {CompiledMode} */
			let top = continuation || md;
			/** @type Record<string,CompiledMode> */
			const continuations = {};
			const emitter = new options.__emitter(options);
			processContinuations();
			let modeBuffer = "";
			let relevance = 0;
			let index = 0;
			let iterations = 0;
			let resumeScanAtSamePosition = false;
			try {
				if (!language.__emitTokens) {
					top.matcher.considerAll();
					for (;;) {
						iterations++;
						if (resumeScanAtSamePosition) resumeScanAtSamePosition = false;
						else top.matcher.considerAll();
						top.matcher.lastIndex = index;
						const match = top.matcher.exec(codeToHighlight);
						if (!match) break;
						const processedCount = processLexeme(codeToHighlight.substring(index, match.index), match);
						index = match.index + processedCount;
					}
					processLexeme(codeToHighlight.substring(index));
				} else language.__emitTokens(codeToHighlight, emitter);
				emitter.finalize();
				result = emitter.toHTML();
				return {
					language: languageName,
					value: result,
					relevance,
					illegal: false,
					_emitter: emitter,
					_top: top
				};
			} catch (err) {
				if (err.message && err.message.includes("Illegal")) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: true,
					relevance: 0,
					_illegalBy: {
						message: err.message,
						index,
						context: codeToHighlight.slice(index - 100, index + 100),
						mode: err.mode,
						resultSoFar: result
					},
					_emitter: emitter
				};
				else if (SAFE_MODE) return {
					language: languageName,
					value: escape(codeToHighlight),
					illegal: false,
					relevance: 0,
					errorRaised: err,
					_emitter: emitter,
					_top: top
				};
				else throw err;
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
			const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name) => _highlight(name, code, false));
			results.unshift(plaintext);
			const [best, secondBest] = results.sort((a, b) => {
				if (a.relevance !== b.relevance) return b.relevance - a.relevance;
				if (a.language && b.language) {
					if (getLanguage(a.language).supersetOf === b.language) return 1;
					else if (getLanguage(b.language).supersetOf === a.language) return -1;
				}
				return 0;
			});
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
			const language = currentLang && aliases[currentLang] || resultLang;
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
			fire("before:highlightElement", {
				el: element,
				language
			});
			if (element.dataset.highlighted) {
				console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
				return;
			}
			if (element.children.length > 0) {
				if (!options.ignoreUnescapedHTML) {
					console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
					console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
					console.warn("The element with unescaped HTML:");
					console.warn(element);
				}
				if (options.throwUnescapedHTML) throw new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML);
			}
			node = element;
			const text = node.textContent;
			const result = language ? highlight(text, {
				language,
				ignoreIllegals: true
			}) : highlightAuto(text);
			element.innerHTML = result.value;
			element.dataset.highlighted = "yes";
			updateClassName(element, language, result.language);
			element.result = {
				language: result.language,
				re: result.relevance,
				relevance: result.relevance
			};
			if (result.secondBest) element.secondBest = {
				language: result.secondBest.language,
				relevance: result.secondBest.relevance
			};
			fire("after:highlightElement", {
				el: element,
				result,
				text
			});
		}
		/**
		* Updates highlight.js global options with the passed options
		*
		* @param {Partial<HLJSOptions>} userOptions
		*/
		function configure(userOptions) {
			options = inherit(options, userOptions);
		}
		const initHighlighting = () => {
			highlightAll();
			deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
		};
		function initHighlightingOnLoad() {
			highlightAll();
			deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
		}
		let wantsHighlight = false;
		/**
		* auto-highlights all pre>code elements on the page
		*/
		function highlightAll() {
			function boot() {
				highlightAll();
			}
			if (document.readyState === "loading") {
				if (!wantsHighlight) window.addEventListener("DOMContentLoaded", boot, false);
				wantsHighlight = true;
				return;
			}
			document.querySelectorAll(options.cssSelector).forEach(highlightElement);
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
				if (!SAFE_MODE) throw error$1;
				else error(error$1);
				lang = PLAINTEXT_LANGUAGE;
			}
			if (!lang.name) lang.name = languageName;
			languages[languageName] = lang;
			lang.rawDefinition = languageDefinition.bind(null, hljs);
			if (lang.aliases) registerAliases(lang.aliases, { languageName });
		}
		/**
		* Remove a language grammar module
		*
		* @param {string} languageName
		*/
		function unregisterLanguage(languageName) {
			delete languages[languageName];
			for (const alias of Object.keys(aliases)) if (aliases[alias] === languageName) delete aliases[alias];
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
			name = (name || "").toLowerCase();
			return languages[name] || languages[aliases[name]];
		}
		/**
		*
		* @param {string|string[]} aliasList - single alias or list of aliases
		* @param {{languageName: string}} opts
		*/
		function registerAliases(aliasList, { languageName }) {
			if (typeof aliasList === "string") aliasList = [aliasList];
			aliasList.forEach((alias) => {
				aliases[alias.toLowerCase()] = languageName;
			});
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
			if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) plugin["before:highlightElement"] = (data) => {
				plugin["before:highlightBlock"](Object.assign({ block: data.el }, data));
			};
			if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) plugin["after:highlightElement"] = (data) => {
				plugin["after:highlightBlock"](Object.assign({ block: data.el }, data));
			};
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function addPlugin(plugin) {
			upgradePluginAPI(plugin);
			plugins.push(plugin);
		}
		/**
		* @param {HLJSPlugin} plugin
		*/
		function removePlugin(plugin) {
			const index = plugins.indexOf(plugin);
			if (index !== -1) plugins.splice(index, 1);
		}
		/**
		*
		* @param {PluginEvent} event
		* @param {any} args
		*/
		function fire(event, args) {
			const cb = event;
			plugins.forEach(function(plugin) {
				if (plugin[cb]) plugin[cb](args);
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
		Object.assign(hljs, {
			highlight,
			highlightAuto,
			highlightAll,
			highlightElement,
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
			addPlugin,
			removePlugin
		});
		hljs.debugMode = function() {
			SAFE_MODE = false;
		};
		hljs.safeMode = function() {
			SAFE_MODE = true;
		};
		hljs.versionString = version;
		hljs.regex = {
			concat,
			lookahead,
			either,
			optional,
			anyNumberOfTimes
		};
		for (const key in MODES) if (typeof MODES[key] === "object") deepFreeze(MODES[key]);
		Object.assign(hljs, MODES);
		return hljs;
	};
	var highlight = HLJS({});
	highlight.newInstance = () => HLJS({});
	module.exports = highlight;
	highlight.HighlightJS = highlight;
	highlight.default = highlight;
})))())).default;
//#endregion
//#region node_modules/highlight.js/es/languages/angelscript.js
/** @type LanguageFn */
function angelscript(hljs) {
	const builtInTypeMode = {
		className: "built_in",
		begin: "\\b(void|bool|int8|int16|int32|int64|int|uint8|uint16|uint32|uint64|uint|string|ref|array|double|float|auto|dictionary)"
	};
	const objectHandleMode = {
		className: "symbol",
		begin: "[a-zA-Z0-9_]+@"
	};
	const genericMode = {
		className: "keyword",
		begin: "<",
		end: ">",
		contains: [builtInTypeMode, objectHandleMode]
	};
	builtInTypeMode.contains = [genericMode];
	objectHandleMode.contains = [genericMode];
	return {
		name: "AngelScript",
		aliases: ["asc"],
		keywords: [
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
		],
		illegal: "(^using\\s+[A-Za-z0-9_\\.]+;$|\\bfunction\\s*[^\\(])",
		contains: [
			{
				className: "string",
				begin: "'",
				end: "'",
				illegal: "\\n",
				contains: [hljs.BACKSLASH_ESCAPE],
				relevance: 0
			},
			{
				className: "string",
				begin: "\"\"\"",
				end: "\"\"\""
			},
			{
				className: "string",
				begin: "\"",
				end: "\"",
				illegal: "\\n",
				contains: [hljs.BACKSLASH_ESCAPE],
				relevance: 0
			},
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				className: "string",
				begin: "^\\s*\\[",
				end: "\\]"
			},
			{
				beginKeywords: "interface namespace",
				end: /\{/,
				illegal: "[;.\\-]",
				contains: [{
					className: "symbol",
					begin: "[a-zA-Z0-9_]+"
				}]
			},
			{
				beginKeywords: "class",
				end: /\{/,
				illegal: "[;.\\-]",
				contains: [{
					className: "symbol",
					begin: "[a-zA-Z0-9_]+",
					contains: [{
						begin: "[:,]\\s*",
						contains: [{
							className: "symbol",
							begin: "[a-zA-Z0-9_]+"
						}]
					}]
				}]
			},
			builtInTypeMode,
			objectHandleMode,
			{
				className: "literal",
				begin: "\\b(null|true|false)"
			},
			{
				className: "number",
				relevance: 0,
				begin: "(-?)(\\b0[xXbBoOdD][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)"
			}
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/cpp.js
/** @type LanguageFn */
function cpp(hljs) {
	const regex = hljs.regex;
	const C_LINE_COMMENT_MODE = hljs.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] });
	const DECLTYPE_AUTO_RE = "decltype\\(auto\\)";
	const NAMESPACE_RE = "[a-zA-Z_]\\w*::";
	const FUNCTION_TYPE_RE = "(?!struct)(decltype\\(auto\\)|" + regex.optional(NAMESPACE_RE) + "[a-zA-Z_]\\w*" + regex.optional("<[^<>]+>") + ")";
	const CPP_PRIMITIVE_TYPES = {
		className: "type",
		begin: "\\b[a-z\\d_]*_t\\b"
	};
	const STRINGS = {
		className: "string",
		variants: [
			{
				begin: "(u8?|U|L)?\"",
				end: "\"",
				illegal: "\\n",
				contains: [hljs.BACKSLASH_ESCAPE]
			},
			{
				begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
				end: "'",
				illegal: "."
			},
			hljs.END_SAME_AS_BEGIN({
				begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
				end: /\)([^()\\\s"]{0,16})"/
			})
		]
	};
	const NUMBERS = {
		className: "number",
		variants: [{ begin: "[+-]?(?:(?:\\b[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|\\b[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|\\b0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)" }, { begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)" }],
		relevance: 0
	};
	const PREPROCESSORS = [{
		scope: "meta",
		begin: /#\s*include\b/,
		end: /$/,
		keywords: { keyword: "include" },
		contains: [
			{ begin: /\\\n/ },
			STRINGS,
			{
				scope: "string",
				begin: /<.*?>/
			},
			C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		]
	}, {
		className: "meta",
		begin: /#\s*[a-z]+\b/,
		end: /$/,
		keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
		contains: [
			{
				begin: /\\\n/,
				relevance: 0
			},
			hljs.inherit(STRINGS, { className: "string" }),
			C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		]
	}];
	const TITLE_MODE = {
		className: "title",
		begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
		relevance: 0
	};
	const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + "\\s*\\(";
	const RESERVED_KEYWORDS = [
		"alignas",
		"alignof",
		"and",
		"and_eq",
		"asm",
		"atomic_cancel",
		"atomic_commit",
		"atomic_noexcept",
		"auto",
		"bitand",
		"bitor",
		"break",
		"case",
		"catch",
		"class",
		"co_await",
		"co_return",
		"co_yield",
		"compl",
		"concept",
		"const_cast|10",
		"consteval",
		"constexpr",
		"constinit",
		"continue",
		"decltype",
		"default",
		"delete",
		"do",
		"dynamic_cast|10",
		"else",
		"enum",
		"explicit",
		"export",
		"extern",
		"false",
		"final",
		"for",
		"friend",
		"goto",
		"if",
		"import",
		"inline",
		"module",
		"mutable",
		"namespace",
		"new",
		"noexcept",
		"not",
		"not_eq",
		"nullptr",
		"operator",
		"or",
		"or_eq",
		"override",
		"private",
		"protected",
		"public",
		"reflexpr",
		"register",
		"reinterpret_cast|10",
		"requires",
		"return",
		"sizeof",
		"static_assert",
		"static_cast|10",
		"struct",
		"switch",
		"synchronized",
		"template",
		"this",
		"thread_local",
		"throw",
		"transaction_safe",
		"transaction_safe_dynamic",
		"true",
		"try",
		"typedef",
		"typeid",
		"typename",
		"union",
		"using",
		"virtual",
		"volatile",
		"while",
		"xor",
		"xor_eq"
	];
	const RESERVED_TYPES = [
		"bool",
		"char",
		"char16_t",
		"char32_t",
		"char8_t",
		"double",
		"float",
		"int",
		"long",
		"short",
		"void",
		"wchar_t",
		"unsigned",
		"signed",
		"const",
		"static"
	];
	const TYPE_HINTS = [
		"any",
		"auto_ptr",
		"barrier",
		"binary_semaphore",
		"bitset",
		"complex",
		"condition_variable",
		"condition_variable_any",
		"counting_semaphore",
		"deque",
		"false_type",
		"flat_map",
		"flat_set",
		"future",
		"imaginary",
		"initializer_list",
		"istringstream",
		"jthread",
		"latch",
		"lock_guard",
		"multimap",
		"multiset",
		"mutex",
		"optional",
		"ostringstream",
		"packaged_task",
		"pair",
		"promise",
		"priority_queue",
		"queue",
		"recursive_mutex",
		"recursive_timed_mutex",
		"scoped_lock",
		"set",
		"shared_future",
		"shared_lock",
		"shared_mutex",
		"shared_timed_mutex",
		"shared_ptr",
		"stack",
		"string_view",
		"stringstream",
		"timed_mutex",
		"thread",
		"true_type",
		"tuple",
		"unique_lock",
		"unique_ptr",
		"unordered_map",
		"unordered_multimap",
		"unordered_multiset",
		"unordered_set",
		"variant",
		"vector",
		"weak_ptr",
		"wstring",
		"wstring_view"
	];
	const FUNCTION_HINTS = [
		"abort",
		"abs",
		"acos",
		"apply",
		"as_const",
		"asin",
		"atan",
		"atan2",
		"calloc",
		"ceil",
		"cerr",
		"cin",
		"clog",
		"cos",
		"cosh",
		"cout",
		"declval",
		"endl",
		"exchange",
		"exit",
		"exp",
		"fabs",
		"floor",
		"fmod",
		"forward",
		"fprintf",
		"fputs",
		"free",
		"frexp",
		"fscanf",
		"future",
		"invoke",
		"isalnum",
		"isalpha",
		"iscntrl",
		"isdigit",
		"isgraph",
		"islower",
		"isprint",
		"ispunct",
		"isspace",
		"isupper",
		"isxdigit",
		"labs",
		"launder",
		"ldexp",
		"log",
		"log10",
		"make_pair",
		"make_shared",
		"make_shared_for_overwrite",
		"make_tuple",
		"make_unique",
		"malloc",
		"memchr",
		"memcmp",
		"memcpy",
		"memset",
		"modf",
		"move",
		"pow",
		"printf",
		"putchar",
		"puts",
		"realloc",
		"scanf",
		"sin",
		"sinh",
		"snprintf",
		"sprintf",
		"sqrt",
		"sscanf",
		"std",
		"stderr",
		"stdin",
		"stdout",
		"strcat",
		"strchr",
		"strcmp",
		"strcpy",
		"strcspn",
		"strlen",
		"strncat",
		"strncmp",
		"strncpy",
		"strpbrk",
		"strrchr",
		"strspn",
		"strstr",
		"swap",
		"tan",
		"tanh",
		"terminate",
		"to_underlying",
		"tolower",
		"toupper",
		"vfprintf",
		"visit",
		"vprintf",
		"vsprintf"
	];
	const CPP_KEYWORDS = {
		type: RESERVED_TYPES,
		keyword: RESERVED_KEYWORDS,
		literal: [
			"NULL",
			"false",
			"nullopt",
			"nullptr",
			"true"
		],
		built_in: ["_Pragma"],
		_type_hints: TYPE_HINTS
	};
	const FUNCTION_DISPATCH = {
		className: "function.dispatch",
		relevance: 0,
		keywords: { _hint: FUNCTION_HINTS },
		begin: regex.concat(/\b/, `(?!${RESERVED_KEYWORDS.join("|")})`, hljs.IDENT_RE, regex.lookahead(/(<[^<>]+>|)\s*\(/))
	};
	const EXPRESSION_CONTAINS = [
		FUNCTION_DISPATCH,
		...PREPROCESSORS,
		CPP_PRIMITIVE_TYPES,
		C_LINE_COMMENT_MODE,
		hljs.C_BLOCK_COMMENT_MODE,
		NUMBERS,
		STRINGS
	];
	const EXPRESSION_CONTEXT = {
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
				beginKeywords: "new throw return else",
				end: /;/
			}
		],
		keywords: CPP_KEYWORDS,
		contains: EXPRESSION_CONTAINS.concat([{
			begin: /\(/,
			end: /\)/,
			keywords: CPP_KEYWORDS,
			contains: EXPRESSION_CONTAINS.concat(["self"]),
			relevance: 0
		}]),
		relevance: 0
	};
	const FUNCTION_DECLARATION = {
		className: "function",
		begin: "(" + FUNCTION_TYPE_RE + "[\\*&\\s]+){1,12}" + FUNCTION_TITLE,
		returnBegin: true,
		end: /[{;=]/,
		excludeEnd: true,
		keywords: CPP_KEYWORDS,
		illegal: /[^\w\s\*&:<>.]/,
		contains: [
			{
				begin: DECLTYPE_AUTO_RE,
				keywords: CPP_KEYWORDS,
				relevance: 0
			},
			{
				begin: FUNCTION_TITLE,
				returnBegin: true,
				contains: [TITLE_MODE],
				relevance: 0
			},
			{
				begin: /::/,
				relevance: 0
			},
			{
				begin: /:/,
				endsWithParent: true,
				contains: [STRINGS, NUMBERS]
			},
			{
				relevance: 0,
				match: /,/
			},
			{
				className: "params",
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
					{
						begin: /\(/,
						end: /\)/,
						keywords: CPP_KEYWORDS,
						relevance: 0,
						contains: [
							"self",
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
			...PREPROCESSORS
		]
	};
	return {
		name: "C++",
		aliases: [
			"cc",
			"c++",
			"h++",
			"hpp",
			"hh",
			"hxx",
			"cxx"
		],
		keywords: CPP_KEYWORDS,
		illegal: "</",
		classNameAliases: { "function.dispatch": "built_in" },
		contains: [].concat(EXPRESSION_CONTEXT, FUNCTION_DECLARATION, FUNCTION_DISPATCH, EXPRESSION_CONTAINS, [
			...PREPROCESSORS,
			{
				begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
				end: ">",
				keywords: CPP_KEYWORDS,
				contains: ["self", CPP_PRIMITIVE_TYPES]
			},
			{
				begin: hljs.IDENT_RE + "::",
				keywords: CPP_KEYWORDS
			},
			{
				match: [
					/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
					/\s+/,
					/\w+/
				],
				className: {
					1: "keyword",
					3: "title.class"
				}
			}
		])
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/csharp.js
/** @type LanguageFn */
function csharp(hljs) {
	const BUILT_IN_KEYWORDS = [
		"bool",
		"byte",
		"char",
		"decimal",
		"delegate",
		"double",
		"dynamic",
		"enum",
		"float",
		"int",
		"long",
		"nint",
		"nuint",
		"object",
		"sbyte",
		"short",
		"string",
		"ulong",
		"uint",
		"ushort"
	];
	const FUNCTION_MODIFIERS = [
		"public",
		"private",
		"protected",
		"static",
		"internal",
		"protected",
		"abstract",
		"async",
		"extern",
		"override",
		"unsafe",
		"virtual",
		"new",
		"sealed",
		"partial"
	];
	const KEYWORDS = {
		keyword: [
			"abstract",
			"as",
			"base",
			"break",
			"case",
			"catch",
			"class",
			"const",
			"continue",
			"do",
			"else",
			"event",
			"explicit",
			"extern",
			"finally",
			"fixed",
			"for",
			"foreach",
			"goto",
			"if",
			"implicit",
			"in",
			"interface",
			"internal",
			"is",
			"lock",
			"namespace",
			"new",
			"operator",
			"out",
			"override",
			"params",
			"private",
			"protected",
			"public",
			"readonly",
			"record",
			"ref",
			"return",
			"scoped",
			"sealed",
			"sizeof",
			"stackalloc",
			"static",
			"struct",
			"switch",
			"this",
			"throw",
			"try",
			"typeof",
			"unchecked",
			"unsafe",
			"using",
			"virtual",
			"void",
			"volatile",
			"while"
		].concat([
			"add",
			"alias",
			"and",
			"ascending",
			"args",
			"async",
			"await",
			"by",
			"descending",
			"dynamic",
			"equals",
			"file",
			"from",
			"get",
			"global",
			"group",
			"init",
			"into",
			"join",
			"let",
			"nameof",
			"not",
			"notnull",
			"on",
			"or",
			"orderby",
			"partial",
			"record",
			"remove",
			"required",
			"scoped",
			"select",
			"set",
			"unmanaged",
			"value|0",
			"var",
			"when",
			"where",
			"with",
			"yield"
		]),
		built_in: BUILT_IN_KEYWORDS,
		literal: [
			"default",
			"false",
			"null",
			"true"
		]
	};
	const TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" });
	const INTEGER_SUFFIX = "([uU][lL]?|[lL][uU]?)?";
	const NUMBERS = {
		className: "number",
		variants: [
			{ begin: "\\b0[bB]_*[01](_*[01])*" + INTEGER_SUFFIX },
			{ begin: "(-?)\\b0[xX]_*[a-fA-F0-9](_*[a-fA-F0-9])*" + INTEGER_SUFFIX },
			{ begin: "(-?)(\\b\\d(_*\\d)*(\\.(\\d(_*\\d)*)?)?|\\.\\d(_*\\d)*)([eE][-+]?\\d(_*\\d)*)?([fFdDmM]|[uU][lL]?|[lL][uU]?)?" }
		],
		relevance: 0
	};
	const RAW_STRING = {
		className: "string",
		begin: /"""("*)(?!")(.|\n)*?"""\1/,
		relevance: 1
	};
	const VERBATIM_STRING = {
		className: "string",
		begin: "@\"",
		end: "\"",
		contains: [{ begin: "\"\"" }]
	};
	const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });
	const SUBST = {
		className: "subst",
		begin: /\{/,
		end: /\}/,
		keywords: KEYWORDS
	};
	const SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });
	const INTERPOLATED_STRING = {
		className: "string",
		begin: /\$"/,
		end: "\"",
		illegal: /\n/,
		contains: [
			{ begin: /\{\{/ },
			{ begin: /\}\}/ },
			hljs.BACKSLASH_ESCAPE,
			SUBST_NO_LF
		]
	};
	const INTERPOLATED_VERBATIM_STRING = {
		className: "string",
		begin: /\$@"/,
		end: "\"",
		contains: [
			{ begin: /\{\{/ },
			{ begin: /\}\}/ },
			{ begin: "\"\"" },
			SUBST
		]
	};
	const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
		illegal: /\n/,
		contains: [
			{ begin: /\{\{/ },
			{ begin: /\}\}/ },
			{ begin: "\"\"" },
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
		RAW_STRING,
		INTERPOLATED_VERBATIM_STRING,
		INTERPOLATED_STRING,
		VERBATIM_STRING,
		hljs.APOS_STRING_MODE,
		hljs.QUOTE_STRING_MODE
	] };
	const GENERIC_MODIFIER = {
		begin: "<",
		end: ">",
		contains: [{ beginKeywords: "in out" }, TITLE_MODE]
	};
	const TYPE_IDENT_RE = hljs.IDENT_RE + "(<" + hljs.IDENT_RE + "(\\s*,\\s*" + hljs.IDENT_RE + ")*>)?(\\[\\])?";
	const AT_IDENTIFIER = {
		begin: "@" + hljs.IDENT_RE,
		relevance: 0
	};
	return {
		name: "C#",
		aliases: ["cs", "c#"],
		keywords: KEYWORDS,
		illegal: /::/,
		contains: [
			hljs.COMMENT("///", "$", {
				returnBegin: true,
				contains: [{
					className: "doctag",
					variants: [
						{
							begin: "///",
							relevance: 0
						},
						{ begin: "<!--|-->" },
						{
							begin: "</?",
							end: ">"
						}
					]
				}]
			}),
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			{
				className: "meta",
				begin: "#",
				end: "$",
				keywords: { keyword: "if else elif endif define undef warning error line region endregion pragma checksum" }
			},
			STRING,
			NUMBERS,
			{
				beginKeywords: "class interface",
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
				beginKeywords: "namespace",
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
				beginKeywords: "record",
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
				className: "meta",
				begin: "^\\s*\\[(?=[\\w])",
				excludeBegin: true,
				end: "\\]",
				excludeEnd: true,
				contains: [{
					className: "string",
					begin: /"/,
					end: /"/
				}]
			},
			{
				beginKeywords: "new return throw await else",
				relevance: 0
			},
			{
				className: "function",
				begin: "(" + TYPE_IDENT_RE + "\\s+)+" + hljs.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
				returnBegin: true,
				end: /\s*[{;=]/,
				excludeEnd: true,
				keywords: KEYWORDS,
				contains: [
					{
						beginKeywords: FUNCTION_MODIFIERS.join(" "),
						relevance: 0
					},
					{
						begin: hljs.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
						returnBegin: true,
						contains: [hljs.TITLE_MODE, GENERIC_MODIFIER],
						relevance: 0
					},
					{ match: /\(\)/ },
					{
						className: "params",
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
//#endregion
//#region node_modules/highlight.js/es/languages/css.js
var MODES = (hljs) => {
	return {
		IMPORTANT: {
			scope: "meta",
			begin: "!important"
		},
		BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
		HEXCOLOR: {
			scope: "number",
			begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
		},
		UNICODE_RANGE: {
			scope: "number",
			begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
		},
		FUNCTION_DISPATCH: {
			className: "built_in",
			begin: /[\w-]+(?=\()/
		},
		ATTRIBUTE_SELECTOR_MODE: {
			scope: "selector-attr",
			begin: /\[/,
			end: /\]/,
			illegal: "$",
			contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
		},
		CSS_NUMBER_MODE: {
			scope: "number",
			begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
			relevance: 0
		},
		CSS_VARIABLE: {
			className: "attr",
			begin: /--[A-Za-z_][A-Za-z0-9_-]*/
		}
	};
};
var HTML_TAGS = [
	"a",
	"abbr",
	"address",
	"article",
	"aside",
	"audio",
	"b",
	"blockquote",
	"body",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"dd",
	"del",
	"details",
	"dfn",
	"div",
	"dl",
	"dt",
	"em",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"mark",
	"menu",
	"nav",
	"object",
	"ol",
	"optgroup",
	"option",
	"p",
	"picture",
	"q",
	"quote",
	"samp",
	"section",
	"select",
	"source",
	"span",
	"strong",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"ul",
	"var",
	"video"
];
var SVG_TAGS = [
	"defs",
	"g",
	"marker",
	"mask",
	"pattern",
	"svg",
	"switch",
	"symbol",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feFlood",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMorphology",
	"feOffset",
	"feSpecularLighting",
	"feTile",
	"feTurbulence",
	"linearGradient",
	"radialGradient",
	"stop",
	"circle",
	"ellipse",
	"image",
	"line",
	"path",
	"polygon",
	"polyline",
	"rect",
	"text",
	"use",
	"textPath",
	"tspan",
	"foreignObject",
	"clipPath"
];
var TAGS = [...HTML_TAGS, ...SVG_TAGS];
var MEDIA_FEATURES = [
	"any-hover",
	"any-pointer",
	"aspect-ratio",
	"color",
	"color-gamut",
	"color-index",
	"device-aspect-ratio",
	"device-height",
	"device-width",
	"display-mode",
	"forced-colors",
	"grid",
	"height",
	"hover",
	"inverted-colors",
	"monochrome",
	"orientation",
	"overflow-block",
	"overflow-inline",
	"pointer",
	"prefers-color-scheme",
	"prefers-contrast",
	"prefers-reduced-motion",
	"prefers-reduced-transparency",
	"resolution",
	"scan",
	"scripting",
	"update",
	"width",
	"min-width",
	"max-width",
	"min-height",
	"max-height"
].sort().reverse();
var PSEUDO_CLASSES = [
	"active",
	"any-link",
	"blank",
	"checked",
	"current",
	"default",
	"defined",
	"dir",
	"disabled",
	"drop",
	"empty",
	"enabled",
	"first",
	"first-child",
	"first-of-type",
	"fullscreen",
	"future",
	"focus",
	"focus-visible",
	"focus-within",
	"has",
	"host",
	"host-context",
	"hover",
	"indeterminate",
	"in-range",
	"invalid",
	"is",
	"lang",
	"last-child",
	"last-of-type",
	"left",
	"link",
	"local-link",
	"not",
	"nth-child",
	"nth-col",
	"nth-last-child",
	"nth-last-col",
	"nth-last-of-type",
	"nth-of-type",
	"only-child",
	"only-of-type",
	"optional",
	"out-of-range",
	"past",
	"placeholder-shown",
	"read-only",
	"read-write",
	"required",
	"right",
	"root",
	"scope",
	"target",
	"target-within",
	"user-invalid",
	"valid",
	"visited",
	"where"
].sort().reverse();
var PSEUDO_ELEMENTS = [
	"after",
	"backdrop",
	"before",
	"cue",
	"cue-region",
	"first-letter",
	"first-line",
	"grammar-error",
	"marker",
	"part",
	"placeholder",
	"selection",
	"slotted",
	"spelling-error"
].sort().reverse();
var ATTRIBUTES = [
	"accent-color",
	"align-content",
	"align-items",
	"align-self",
	"alignment-baseline",
	"all",
	"anchor-name",
	"animation",
	"animation-composition",
	"animation-delay",
	"animation-direction",
	"animation-duration",
	"animation-fill-mode",
	"animation-iteration-count",
	"animation-name",
	"animation-play-state",
	"animation-range",
	"animation-range-end",
	"animation-range-start",
	"animation-timeline",
	"animation-timing-function",
	"appearance",
	"aspect-ratio",
	"backdrop-filter",
	"backface-visibility",
	"background",
	"background-attachment",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-image",
	"background-origin",
	"background-position",
	"background-position-x",
	"background-position-y",
	"background-repeat",
	"background-size",
	"baseline-shift",
	"block-size",
	"border",
	"border-block",
	"border-block-color",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-block-style",
	"border-block-width",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-end-end-radius",
	"border-end-start-radius",
	"border-image",
	"border-image-outset",
	"border-image-repeat",
	"border-image-slice",
	"border-image-source",
	"border-image-width",
	"border-inline",
	"border-inline-color",
	"border-inline-end",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-inline-style",
	"border-inline-width",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-start-end-radius",
	"border-start-start-radius",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-width",
	"bottom",
	"box-align",
	"box-decoration-break",
	"box-direction",
	"box-flex",
	"box-flex-group",
	"box-lines",
	"box-ordinal-group",
	"box-orient",
	"box-pack",
	"box-shadow",
	"box-sizing",
	"break-after",
	"break-before",
	"break-inside",
	"caption-side",
	"caret-color",
	"clear",
	"clip",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"color-scheme",
	"column-count",
	"column-fill",
	"column-gap",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"contain",
	"contain-intrinsic-block-size",
	"contain-intrinsic-height",
	"contain-intrinsic-inline-size",
	"contain-intrinsic-size",
	"contain-intrinsic-width",
	"container",
	"container-name",
	"container-type",
	"content",
	"content-visibility",
	"corner-bottom-left-shape",
	"corner-bottom-right-shape",
	"corner-shape",
	"corner-top-left-shape",
	"corner-top-right-shape",
	"counter-increment",
	"counter-reset",
	"counter-set",
	"cue",
	"cue-after",
	"cue-before",
	"cursor",
	"cx",
	"cy",
	"direction",
	"display",
	"dominant-baseline",
	"empty-cells",
	"enable-background",
	"field-sizing",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"flex",
	"flex-basis",
	"flex-direction",
	"flex-flow",
	"flex-grow",
	"flex-shrink",
	"flex-wrap",
	"float",
	"flood-color",
	"flood-opacity",
	"flow",
	"font",
	"font-display",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-language-override",
	"font-optical-sizing",
	"font-palette",
	"font-size",
	"font-size-adjust",
	"font-smooth",
	"font-smoothing",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-synthesis-position",
	"font-synthesis-small-caps",
	"font-synthesis-style",
	"font-synthesis-weight",
	"font-variant",
	"font-variant-alternates",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-emoji",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-variation-settings",
	"font-weight",
	"forced-color-adjust",
	"gap",
	"glyph-orientation-horizontal",
	"glyph-orientation-vertical",
	"grid",
	"grid-area",
	"grid-auto-columns",
	"grid-auto-flow",
	"grid-auto-rows",
	"grid-column",
	"grid-column-end",
	"grid-column-start",
	"grid-gap",
	"grid-row",
	"grid-row-end",
	"grid-row-start",
	"grid-template",
	"grid-template-areas",
	"grid-template-columns",
	"grid-template-rows",
	"hanging-punctuation",
	"height",
	"hyphenate-character",
	"hyphenate-limit-chars",
	"hyphens",
	"icon",
	"image-orientation",
	"image-rendering",
	"image-resolution",
	"ime-mode",
	"initial-letter",
	"initial-letter-align",
	"inline-size",
	"inset",
	"inset-area",
	"inset-block",
	"inset-block-end",
	"inset-block-start",
	"inset-inline",
	"inset-inline-end",
	"inset-inline-start",
	"isolation",
	"justify-content",
	"justify-items",
	"justify-self",
	"kerning",
	"left",
	"letter-spacing",
	"lighting-color",
	"line-break",
	"line-height",
	"line-height-step",
	"list-style",
	"list-style-image",
	"list-style-position",
	"list-style-type",
	"margin",
	"margin-block",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-inline",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-top",
	"margin-trim",
	"marker",
	"marker-end",
	"marker-mid",
	"marker-start",
	"marks",
	"mask",
	"mask-border",
	"mask-border-mode",
	"mask-border-outset",
	"mask-border-repeat",
	"mask-border-slice",
	"mask-border-source",
	"mask-border-width",
	"mask-clip",
	"mask-composite",
	"mask-image",
	"mask-mode",
	"mask-origin",
	"mask-position",
	"mask-repeat",
	"mask-size",
	"mask-type",
	"masonry-auto-flow",
	"math-depth",
	"math-shift",
	"math-style",
	"max-block-size",
	"max-height",
	"max-inline-size",
	"max-width",
	"min-block-size",
	"min-height",
	"min-inline-size",
	"min-width",
	"mix-blend-mode",
	"nav-down",
	"nav-index",
	"nav-left",
	"nav-right",
	"nav-up",
	"none",
	"normal",
	"object-fit",
	"object-position",
	"offset",
	"offset-anchor",
	"offset-distance",
	"offset-path",
	"offset-position",
	"offset-rotate",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outline-color",
	"outline-offset",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-anchor",
	"overflow-block",
	"overflow-clip-margin",
	"overflow-inline",
	"overflow-wrap",
	"overflow-x",
	"overflow-y",
	"overlay",
	"overscroll-behavior",
	"overscroll-behavior-block",
	"overscroll-behavior-inline",
	"overscroll-behavior-x",
	"overscroll-behavior-y",
	"padding",
	"padding-block",
	"padding-block-end",
	"padding-block-start",
	"padding-bottom",
	"padding-inline",
	"padding-inline-end",
	"padding-inline-start",
	"padding-left",
	"padding-right",
	"padding-top",
	"page",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"paint-order",
	"pause",
	"pause-after",
	"pause-before",
	"perspective",
	"perspective-origin",
	"place-content",
	"place-items",
	"place-self",
	"pointer-events",
	"position",
	"position-anchor",
	"position-visibility",
	"print-color-adjust",
	"quotes",
	"r",
	"resize",
	"rest",
	"rest-after",
	"rest-before",
	"right",
	"rotate",
	"row-gap",
	"ruby-align",
	"ruby-position",
	"scale",
	"scroll-behavior",
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-end",
	"scroll-margin-block-start",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-end",
	"scroll-margin-inline-start",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",
	"scroll-padding",
	"scroll-padding-block",
	"scroll-padding-block-end",
	"scroll-padding-block-start",
	"scroll-padding-bottom",
	"scroll-padding-inline",
	"scroll-padding-inline-end",
	"scroll-padding-inline-start",
	"scroll-padding-left",
	"scroll-padding-right",
	"scroll-padding-top",
	"scroll-snap-align",
	"scroll-snap-stop",
	"scroll-snap-type",
	"scroll-timeline",
	"scroll-timeline-axis",
	"scroll-timeline-name",
	"scrollbar-color",
	"scrollbar-gutter",
	"scrollbar-width",
	"shape-image-threshold",
	"shape-margin",
	"shape-outside",
	"shape-rendering",
	"speak",
	"speak-as",
	"src",
	"stop-color",
	"stop-opacity",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke-width",
	"tab-size",
	"table-layout",
	"text-align",
	"text-align-all",
	"text-align-last",
	"text-anchor",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-skip",
	"text-decoration-skip-ink",
	"text-decoration-style",
	"text-decoration-thickness",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-position",
	"text-emphasis-style",
	"text-indent",
	"text-justify",
	"text-orientation",
	"text-overflow",
	"text-rendering",
	"text-shadow",
	"text-size-adjust",
	"text-transform",
	"text-underline-offset",
	"text-underline-position",
	"text-wrap",
	"text-wrap-mode",
	"text-wrap-style",
	"timeline-scope",
	"top",
	"touch-action",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-style",
	"transition",
	"transition-behavior",
	"transition-delay",
	"transition-duration",
	"transition-property",
	"transition-timing-function",
	"translate",
	"unicode-bidi",
	"unicode-range",
	"user-modify",
	"user-select",
	"vector-effect",
	"vertical-align",
	"view-timeline",
	"view-timeline-axis",
	"view-timeline-inset",
	"view-timeline-name",
	"view-transition-name",
	"visibility",
	"voice-balance",
	"voice-duration",
	"voice-family",
	"voice-pitch",
	"voice-range",
	"voice-rate",
	"voice-stress",
	"voice-volume",
	"white-space",
	"white-space-collapse",
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"x",
	"y",
	"z-index",
	"zoom"
].sort().reverse();
/** @type LanguageFn */
function css(hljs) {
	const regex = hljs.regex;
	const modes = MODES(hljs);
	const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
	const AT_MODIFIERS = "and or not only";
	const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
	const STRINGS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];
	return {
		name: "CSS",
		case_insensitive: true,
		illegal: /[=|'\$]/,
		keywords: { keyframePosition: "from to" },
		classNameAliases: { keyframePosition: "selector-tag" },
		contains: [
			modes.BLOCK_COMMENT,
			VENDOR_PREFIX,
			modes.CSS_NUMBER_MODE,
			{
				className: "selector-id",
				begin: /#[A-Za-z0-9_-]+/,
				relevance: 0
			},
			{
				className: "selector-class",
				begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
				relevance: 0
			},
			modes.ATTRIBUTE_SELECTOR_MODE,
			{
				className: "selector-pseudo",
				variants: [{ begin: ":(" + PSEUDO_CLASSES.join("|") + ")" }, { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }]
			},
			modes.CSS_VARIABLE,
			{
				className: "attribute",
				begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
			},
			{
				begin: /:/,
				end: /[;}{]/,
				contains: [
					modes.BLOCK_COMMENT,
					modes.HEXCOLOR,
					modes.IMPORTANT,
					modes.CSS_NUMBER_MODE,
					modes.UNICODE_RANGE,
					...STRINGS,
					{
						begin: /(url|data-uri)\(/,
						end: /\)/,
						relevance: 0,
						keywords: { built_in: "url data-uri" },
						contains: [...STRINGS, {
							className: "string",
							begin: /[^)]/,
							endsWithParent: true,
							excludeEnd: true
						}]
					},
					modes.FUNCTION_DISPATCH
				]
			},
			{
				begin: regex.lookahead(/@/),
				end: "[{;]",
				relevance: 0,
				illegal: /:/,
				contains: [{
					className: "keyword",
					begin: AT_PROPERTY_RE
				}, {
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
				}]
			},
			{
				className: "selector-tag",
				begin: "\\b(" + TAGS.join("|") + ")\\b"
			}
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/dos.js
/** @type LanguageFn */
function dos(hljs) {
	const COMMENT = hljs.COMMENT(/^\s*@?rem\b/, /$/, { relevance: 10 });
	return {
		name: "Batch file (DOS)",
		aliases: [
			"bat",
			"batch",
			"cmd"
		],
		case_insensitive: true,
		illegal: /\/\*/,
		keywords: {
			keyword: [
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
			],
			built_in: [
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
				"ping",
				"net",
				"ipconfig",
				"taskkill",
				"xcopy",
				"ren",
				"del"
			]
		},
		contains: [
			{
				className: "variable",
				begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
			},
			{
				className: "function",
				begin: { begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)" }.begin,
				end: "goto:eof",
				contains: [hljs.inherit(hljs.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }), COMMENT]
			},
			{
				className: "number",
				begin: "\\b\\d+",
				relevance: 0
			},
			COMMENT
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/ini.js
function ini(hljs) {
	const regex = hljs.regex;
	const NUMBERS = {
		className: "number",
		relevance: 0,
		variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: hljs.NUMBER_RE }]
	};
	const COMMENTS = hljs.COMMENT();
	COMMENTS.variants = [{
		begin: /;/,
		end: /$/
	}, {
		begin: /#/,
		end: /$/
	}];
	const VARIABLES = {
		className: "variable",
		variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
	};
	const LITERALS = {
		className: "literal",
		begin: /\bon|off|true|false|yes|no\b/
	};
	const STRINGS = {
		className: "string",
		contains: [hljs.BACKSLASH_ESCAPE],
		variants: [
			{
				begin: "'''",
				end: "'''",
				relevance: 10
			},
			{
				begin: "\"\"\"",
				end: "\"\"\"",
				relevance: 10
			},
			{
				begin: "\"",
				end: "\""
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
			"self"
		],
		relevance: 0
	};
	const ANY_KEY = regex.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
	return {
		name: "TOML, also INI",
		aliases: ["toml"],
		case_insensitive: true,
		illegal: /\S/,
		contains: [
			COMMENTS,
			{
				className: "section",
				begin: /\[+/,
				end: /\]+/
			},
			{
				begin: regex.concat(ANY_KEY, "(\\s*\\.\\s*", ANY_KEY, ")*", regex.lookahead(/\s*=\s*[^#\s]/)),
				className: "attr",
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
//#endregion
//#region node_modules/highlight.js/es/languages/javascript.js
var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
var KEYWORDS = [
	"as",
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
	"debugger",
	"async",
	"await",
	"static",
	"import",
	"from",
	"export",
	"extends",
	"using"
];
var LITERALS = [
	"true",
	"false",
	"null",
	"undefined",
	"NaN",
	"Infinity"
];
var TYPES = [
	"Object",
	"Function",
	"Boolean",
	"Symbol",
	"Math",
	"Date",
	"Number",
	"BigInt",
	"String",
	"RegExp",
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
	"Set",
	"Map",
	"WeakSet",
	"WeakMap",
	"ArrayBuffer",
	"SharedArrayBuffer",
	"Atomics",
	"DataView",
	"JSON",
	"Promise",
	"Generator",
	"GeneratorFunction",
	"AsyncFunction",
	"Reflect",
	"Proxy",
	"Intl",
	"WebAssembly"
];
var ERROR_TYPES = [
	"Error",
	"EvalError",
	"InternalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError"
];
var BUILT_IN_GLOBALS = [
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
var BUILT_IN_VARIABLES = [
	"arguments",
	"this",
	"super",
	"console",
	"window",
	"document",
	"localStorage",
	"sessionStorage",
	"module",
	"self",
	"global"
];
var BUILT_INS = [].concat(BUILT_IN_GLOBALS, TYPES, ERROR_TYPES);
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
		return match.input.indexOf(tag, after) !== -1;
	};
	const IDENT_RE$1 = IDENT_RE;
	const FRAGMENT = {
		begin: "<>",
		end: "</>"
	};
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
			if (nextChar === "<" || nextChar === ",") {
				response.ignoreMatch();
				return;
			}
			if (nextChar === ">") {
				if (!hasClosingTag(match, { after: afterMatchIndex })) response.ignoreMatch();
			}
			let m;
			const afterMatch = match.input.substring(afterMatchIndex);
			if (m = afterMatch.match(/^\s*=/)) {
				response.ignoreMatch();
				return;
			}
			if (m = afterMatch.match(/^\s+extends\s+/)) {
				if (m.index === 0) {
					response.ignoreMatch();
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
	const decimalDigits = "[0-9](_?[0-9])*";
	const frac = `\\.(${decimalDigits})`;
	const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
	const NUMBER = {
		className: "number",
		variants: [
			{ begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
			{ begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
			{ begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
			{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
			{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
			{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
			{ begin: "\\b0[0-7]+n?\\b" }
		],
		relevance: 0
	};
	const SUBST = {
		className: "subst",
		begin: "\\$\\{",
		end: "\\}",
		keywords: KEYWORDS$1,
		contains: []
	};
	const HTML_TEMPLATE = {
		begin: ".?html`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "xml"
		}
	};
	const CSS_TEMPLATE = {
		begin: ".?css`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "css"
		}
	};
	const GRAPHQL_TEMPLATE = {
		begin: ".?gql`",
		end: "",
		starts: {
			end: "`",
			returnEnd: false,
			contains: [hljs.BACKSLASH_ESCAPE, SUBST],
			subLanguage: "graphql"
		}
	};
	const TEMPLATE_STRING = {
		className: "string",
		begin: "`",
		end: "`",
		contains: [hljs.BACKSLASH_ESCAPE, SUBST]
	};
	const COMMENT = {
		className: "comment",
		variants: [
			hljs.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
				relevance: 0,
				contains: [{
					begin: "(?=@[A-Za-z]+)",
					relevance: 0,
					contains: [
						{
							className: "doctag",
							begin: "@[A-Za-z]+"
						},
						{
							className: "type",
							begin: "\\{",
							end: "\\}",
							excludeEnd: true,
							excludeBegin: true,
							relevance: 0
						},
						{
							className: "variable",
							begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
							endsParent: true,
							relevance: 0
						},
						{
							begin: /(?=[^\n])\s/,
							relevance: 0
						}
					]
				}]
			}),
			hljs.C_BLOCK_COMMENT_MODE,
			hljs.C_LINE_COMMENT_MODE
		]
	};
	const SUBST_INTERNALS = [
		hljs.APOS_STRING_MODE,
		hljs.QUOTE_STRING_MODE,
		HTML_TEMPLATE,
		CSS_TEMPLATE,
		GRAPHQL_TEMPLATE,
		TEMPLATE_STRING,
		{ match: /\$\d+/ },
		NUMBER
	];
	SUBST.contains = SUBST_INTERNALS.concat({
		begin: /\{/,
		end: /\}/,
		keywords: KEYWORDS$1,
		contains: ["self"].concat(SUBST_INTERNALS)
	});
	const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
	const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([{
		begin: /(\s*)\(/,
		end: /\)/,
		keywords: KEYWORDS$1,
		contains: ["self"].concat(SUBST_AND_COMMENTS)
	}]);
	const PARAMS = {
		className: "params",
		begin: /(\s*)\(/,
		end: /\)/,
		excludeBegin: true,
		excludeEnd: true,
		keywords: KEYWORDS$1,
		contains: PARAMS_CONTAINS
	};
	const CLASS_OR_EXTENDS = { variants: [{
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
	}, {
		match: [
			/class/,
			/\s+/,
			IDENT_RE$1
		],
		scope: {
			1: "keyword",
			3: "title.class"
		}
	}] };
	const CLASS_REFERENCE = {
		relevance: 0,
		match: regex.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
		className: "title.class",
		keywords: { _: [...TYPES, ...ERROR_TYPES] }
	};
	const USE_STRICT = {
		label: "use_strict",
		className: "meta",
		relevance: 10,
		begin: /^\s*['"]use (strict|asm)['"]/
	};
	const FUNCTION_DEFINITION = {
		variants: [{ match: [
			/function/,
			/\s+/,
			IDENT_RE$1,
			/(?=\s*\()/
		] }, { match: [/function/, /\s*(?=\()/] }],
		className: {
			1: "keyword",
			3: "title.function"
		},
		label: "func.def",
		contains: [PARAMS],
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
		match: regex.concat(/\b/, noneOf([
			...BUILT_IN_GLOBALS,
			"super",
			"import",
			"await"
		].map((x) => `${x}\\s*\\(`)), IDENT_RE$1, regex.lookahead(/\s*\(/)),
		className: "title.function",
		relevance: 0
	};
	const PROPERTY_ACCESS = {
		begin: regex.concat(/\./, regex.lookahead(regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/))),
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
		contains: [{ begin: /\(\)/ }, PARAMS]
	};
	const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
	const FUNCTION_VARIABLE = {
		match: [
			/const|var|let/,
			/\s+/,
			IDENT_RE$1,
			/\s*/,
			/=\s*/,
			/(async\s*)?/,
			regex.lookahead(FUNC_LEAD_IN_RE)
		],
		keywords: "async",
		className: {
			1: "keyword",
			3: "title.function"
		},
		contains: [PARAMS]
	};
	return {
		name: "JavaScript",
		aliases: [
			"js",
			"jsx",
			"mjs",
			"cjs"
		],
		keywords: KEYWORDS$1,
		exports: {
			PARAMS_CONTAINS,
			CLASS_REFERENCE
		},
		illegal: /#(?![$_A-Za-z])/,
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
			GRAPHQL_TEMPLATE,
			TEMPLATE_STRING,
			COMMENT,
			{ match: /\$\d+/ },
			NUMBER,
			CLASS_REFERENCE,
			{
				scope: "attr",
				match: IDENT_RE$1 + regex.lookahead(":"),
				relevance: 0
			},
			FUNCTION_VARIABLE,
			{
				begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					COMMENT,
					hljs.REGEXP_MODE,
					{
						className: "function",
						begin: FUNC_LEAD_IN_RE,
						returnBegin: true,
						end: "\\s*=>",
						contains: [{
							className: "params",
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
									begin: /(\s*)\(/,
									end: /\)/,
									excludeBegin: true,
									excludeEnd: true,
									keywords: KEYWORDS$1,
									contains: PARAMS_CONTAINS
								}
							]
						}]
					},
					{
						begin: /,/,
						relevance: 0
					},
					{
						match: /\s+/,
						relevance: 0
					},
					{
						variants: [
							{
								begin: FRAGMENT.begin,
								end: FRAGMENT.end
							},
							{ match: XML_SELF_CLOSING },
							{
								begin: XML_TAG.begin,
								"on:begin": XML_TAG.isTrulyOpeningTag,
								end: XML_TAG.end
							}
						],
						subLanguage: "xml",
						contains: [{
							begin: XML_TAG.begin,
							end: XML_TAG.end,
							skip: true,
							contains: ["self"]
						}]
					}
				]
			},
			FUNCTION_DEFINITION,
			{ beginKeywords: "while if switch catch for" },
			{
				begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: true,
				label: "func.def",
				contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {
					begin: IDENT_RE$1,
					className: "title.function"
				})]
			},
			{
				match: /\.\.\./,
				relevance: 0
			},
			PROPERTY_ACCESS,
			{
				match: "\\$" + IDENT_RE$1,
				relevance: 0
			},
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [PARAMS]
			},
			FUNCTION_CALL,
			UPPER_CASE_CONSTANT,
			CLASS_OR_EXTENDS,
			GETTER_OR_SETTER,
			{ match: /\$[(.]/ }
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/json.js
var EXTENDED_NUMBER_MODE = {
	scope: "number",
	match: "([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity",
	relevance: 0
};
function json(hljs) {
	const ATTRIBUTE = {
		className: "attr",
		begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
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
	const LITERALS_MODE = {
		scope: "literal",
		beginKeywords: LITERALS.join(" ")
	};
	return {
		name: "JSON",
		aliases: ["jsonc", "json5"],
		keywords: { literal: LITERALS },
		contains: [
			ATTRIBUTE,
			PUNCTUATION,
			hljs.APOS_STRING_MODE,
			hljs.QUOTE_STRING_MODE,
			LITERALS_MODE,
			EXTENDED_NUMBER_MODE,
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE
		],
		illegal: "\\S"
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/php.js
/**
* @param {HLJSApi} hljs
* @returns {LanguageDetail}
* */
function php(hljs) {
	const regex = hljs.regex;
	const NOT_PERL_ETC = /(?![A-Za-z0-9])(?![$])/;
	const IDENT_RE = regex.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, NOT_PERL_ETC);
	const PASCAL_CASE_CLASS_NAME_RE = regex.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, NOT_PERL_ETC);
	const UPCASE_NAME_RE = regex.concat(/[A-Z]+/, NOT_PERL_ETC);
	const VARIABLE = {
		scope: "variable",
		match: "\\$+" + IDENT_RE
	};
	const PREPROCESSOR = {
		scope: "meta",
		variants: [
			{
				begin: /<\?php/,
				relevance: 10
			},
			{ begin: /<\?=/ },
			{
				begin: /<\?/,
				relevance: .1
			},
			{ begin: /\?>/ }
		]
	};
	const SUBST = {
		scope: "subst",
		variants: [{ begin: /\$\w+/ }, {
			begin: /\{\$/,
			end: /\}/
		}]
	};
	const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, { illegal: null });
	const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
		illegal: null,
		contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
	});
	const HEREDOC = {
		begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/,
		end: /[ \t]*(\w+)\b/,
		contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST),
		"on:begin": (m, resp) => {
			resp.data._beginMatch = m[1] || m[2];
		},
		"on:end": (m, resp) => {
			if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
		}
	};
	const NOWDOC = hljs.END_SAME_AS_BEGIN({
		begin: /<<<[ \t]*'(\w+)'\n/,
		end: /[ \t]*(\w+)\b/
	});
	const WHITESPACE = "[ 	\n]";
	const STRING = {
		scope: "string",
		variants: [
			DOUBLE_QUOTED,
			SINGLE_QUOTED,
			HEREDOC,
			NOWDOC
		]
	};
	const NUMBER = {
		scope: "number",
		variants: [
			{ begin: `\\b0[bB][01]+(?:_[01]+)*\\b` },
			{ begin: `\\b0[oO][0-7]+(?:_[0-7]+)*\\b` },
			{ begin: `\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b` },
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
		"__CLASS__",
		"__DIR__",
		"__FILE__",
		"__FUNCTION__",
		"__COMPILER_HALT_OFFSET__",
		"__LINE__",
		"__METHOD__",
		"__NAMESPACE__",
		"__TRAIT__",
		"die",
		"echo",
		"exit",
		"include",
		"include_once",
		"print",
		"require",
		"require_once",
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
		items.forEach((item) => {
			result.push(item);
			if (item.toLowerCase() === item) result.push(item.toUpperCase());
			else result.push(item.toLowerCase());
		});
		return result;
	};
	const KEYWORDS = {
		keyword: KWS,
		literal: dualCase(LITERALS),
		built_in: BUILT_INS
	};
	/**
	* @param {string[]} items */
	const normalizeKeywords = (items) => {
		return items.map((item) => {
			return item.replace(/\|\d+$/, "");
		});
	};
	const CONSTRUCTOR_CALL = { variants: [{
		match: [
			/new/,
			regex.concat(WHITESPACE, "+"),
			regex.concat("(?!", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
			PASCAL_CASE_CLASS_NAME_RE
		],
		scope: {
			1: "keyword",
			4: "title.class"
		}
	}] };
	const CONSTANT_REFERENCE = regex.concat(IDENT_RE, "\\b(?!\\()");
	const LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON = { variants: [
		{
			match: [regex.concat(/::/, regex.lookahead(/(?!class\b)/)), CONSTANT_REFERENCE],
			scope: { 2: "variable.constant" }
		},
		{
			match: [/::/, /class/],
			scope: { 2: "variable.language" }
		},
		{
			match: [
				PASCAL_CASE_CLASS_NAME_RE,
				regex.concat(/::/, regex.lookahead(/(?!class\b)/)),
				CONSTANT_REFERENCE
			],
			scope: {
				1: "title.class",
				3: "variable.constant"
			}
		},
		{
			match: [PASCAL_CASE_CLASS_NAME_RE, regex.concat("::", regex.lookahead(/(?!class\b)/))],
			scope: { 1: "title.class" }
		},
		{
			match: [
				PASCAL_CASE_CLASS_NAME_RE,
				/::/,
				/class/
			],
			scope: {
				1: "title.class",
				3: "variable.language"
			}
		}
	] };
	const NAMED_ARGUMENT = {
		scope: "attr",
		match: regex.concat(IDENT_RE, regex.lookahead(":"), regex.lookahead(/(?!::)/))
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
			hljs.C_LINE_COMMENT_MODE,
			hljs.HASH_COMMENT_MODE,
			STRING,
			NUMBER,
			CONSTRUCTOR_CALL
		]
	};
	const FUNCTION_INVOKE = {
		relevance: 0,
		match: [
			/\b/,
			regex.concat("(?!fn\\b|function\\b|", normalizeKeywords(KWS).join("\\b|"), "|", normalizeKeywords(BUILT_INS).join("\\b|"), "\\b)"),
			IDENT_RE,
			regex.concat(WHITESPACE, "*"),
			regex.lookahead(/(?=\()/)
		],
		scope: { 3: "title.function.invoke" },
		contains: [PARAMS_MODE]
	};
	PARAMS_MODE.contains.push(FUNCTION_INVOKE);
	const ATTRIBUTE_CONTAINS = [
		NAMED_ARGUMENT,
		LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
		hljs.C_BLOCK_COMMENT_MODE,
		hljs.C_LINE_COMMENT_MODE,
		hljs.HASH_COMMENT_MODE,
		STRING,
		NUMBER,
		CONSTRUCTOR_CALL
	];
	const ATTRIBUTES = {
		begin: regex.concat(/#\[\s*\\?/, regex.either(PASCAL_CASE_CLASS_NAME_RE, UPCASE_NAME_RE)),
		beginScope: "meta",
		end: /]/,
		endScope: "meta",
		keywords: {
			literal: LITERALS,
			keyword: ["new", "array"]
		},
		contains: [
			{
				begin: /\[/,
				end: /]/,
				keywords: {
					literal: LITERALS,
					keyword: ["new", "array"]
				},
				contains: ["self", ...ATTRIBUTE_CONTAINS]
			},
			...ATTRIBUTE_CONTAINS,
			{
				scope: "meta",
				variants: [{ match: PASCAL_CASE_CLASS_NAME_RE }, { match: UPCASE_NAME_RE }]
			}
		]
	};
	return {
		case_insensitive: false,
		keywords: KEYWORDS,
		contains: [
			ATTRIBUTES,
			hljs.HASH_COMMENT_MODE,
			hljs.COMMENT("//", "$"),
			hljs.COMMENT("/\\*", "\\*/", { contains: [{
				scope: "doctag",
				match: "@[A-Za-z]+"
			}] }),
			{
				match: /__halt_compiler\(\);/,
				keywords: "__halt_compiler",
				starts: {
					scope: "comment",
					end: hljs.MATCH_NOTHING_RE,
					contains: [{
						match: /\?>/,
						scope: "meta",
						endsParent: true
					}]
				}
			},
			PREPROCESSOR,
			{
				scope: "variable.language",
				match: /\$this\b/
			},
			VARIABLE,
			FUNCTION_INVOKE,
			LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
			{
				match: [
					/const/,
					/\s/,
					IDENT_RE
				],
				scope: {
					1: "keyword",
					3: "variable.constant"
				}
			},
			CONSTRUCTOR_CALL,
			{
				scope: "function",
				relevance: 0,
				beginKeywords: "fn function",
				end: /[;{]/,
				excludeEnd: true,
				illegal: "[$%\\[]",
				contains: [
					{ beginKeywords: "use" },
					hljs.UNDERSCORE_TITLE_MODE,
					{
						begin: "=>",
						endsParent: true
					},
					{
						scope: "params",
						begin: "\\(",
						end: "\\)",
						excludeBegin: true,
						excludeEnd: true,
						keywords: KEYWORDS,
						contains: [
							"self",
							ATTRIBUTES,
							VARIABLE,
							LEFT_AND_RIGHT_SIDE_OF_DOUBLE_COLON,
							hljs.C_BLOCK_COMMENT_MODE,
							hljs.C_LINE_COMMENT_MODE,
							hljs.HASH_COMMENT_MODE,
							STRING,
							NUMBER
						]
					}
				]
			},
			{
				scope: "class",
				variants: [{
					beginKeywords: "enum",
					illegal: /[($"]/
				}, {
					beginKeywords: "class interface trait",
					illegal: /[:($"]/
				}],
				relevance: 0,
				end: /\{/,
				excludeEnd: true,
				contains: [{ beginKeywords: "extends implements" }, hljs.UNDERSCORE_TITLE_MODE]
			},
			{
				beginKeywords: "namespace",
				relevance: 0,
				end: ";",
				illegal: /[.']/,
				contains: [hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { scope: "title.class" })]
			},
			{
				beginKeywords: "use",
				relevance: 0,
				end: ";",
				contains: [{
					match: /\b(as|const|function)\b/,
					scope: "keyword"
				}, hljs.UNDERSCORE_TITLE_MODE]
			},
			STRING,
			NUMBER
		]
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/plaintext.js
function plaintext(hljs) {
	return {
		name: "Plain text",
		aliases: ["text", "txt"],
		disableAutodetect: true
	};
}
//#endregion
//#region node_modules/highlight.js/es/languages/xml.js
/** @type LanguageFn */
function xml(hljs) {
	const regex = hljs.regex;
	const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
	const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
	const XML_ENTITIES = {
		className: "symbol",
		begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
	};
	const XML_META_KEYWORDS = {
		begin: /\s/,
		contains: [{
			className: "keyword",
			begin: /#?[a-z_][a-z1-9_-]+/,
			illegal: /\n/
		}]
	};
	const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
		begin: /\(/,
		end: /\)/
	});
	const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
	const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
	const TAG_INTERNALS = {
		endsWithParent: true,
		illegal: /</,
		relevance: 0,
		contains: [{
			className: "attr",
			begin: XML_IDENT_RE,
			relevance: 0
		}, {
			begin: /=\s*/,
			relevance: 0,
			contains: [{
				className: "string",
				endsParent: true,
				variants: [
					{
						begin: /"/,
						end: /"/,
						contains: [XML_ENTITIES]
					},
					{
						begin: /'/,
						end: /'/,
						contains: [XML_ENTITIES]
					},
					{ begin: /[^\s"'=<>`]+/ }
				]
			}]
		}]
	};
	return {
		name: "HTML, XML",
		aliases: [
			"html",
			"xhtml",
			"rss",
			"atom",
			"xjb",
			"xsd",
			"xsl",
			"plist",
			"wsf",
			"svg"
		],
		case_insensitive: true,
		unicodeRegex: true,
		contains: [
			{
				className: "meta",
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
						contains: [{
							className: "meta",
							begin: /<![a-z]/,
							end: />/,
							contains: [
								XML_META_KEYWORDS,
								XML_META_PAR_KEYWORDS,
								QUOTE_META_STRING_MODE,
								APOS_META_STRING_MODE
							]
						}]
					}
				]
			},
			hljs.COMMENT(/<!--/, /-->/, { relevance: 10 }),
			{
				begin: /<!\[CDATA\[/,
				end: /\]\]>/,
				relevance: 10
			},
			XML_ENTITIES,
			{
				className: "meta",
				end: /\?>/,
				variants: [{
					begin: /<\?xml/,
					relevance: 10,
					contains: [QUOTE_META_STRING_MODE]
				}, { begin: /<\?[a-z][a-z0-9]+/ }]
			},
			{
				className: "tag",
				begin: /<style(?=\s|>)/,
				end: />/,
				keywords: { name: "style" },
				contains: [TAG_INTERNALS],
				starts: {
					end: /<\/style>/,
					returnEnd: true,
					subLanguage: "css"
				}
			},
			{
				className: "tag",
				begin: /<script(?=\s|>)/,
				end: />/,
				keywords: { name: "script" },
				contains: [TAG_INTERNALS],
				starts: {
					end: /<\/script>/,
					returnEnd: true,
					subLanguage: "javascript"
				}
			},
			{
				className: "tag",
				begin: /<>|<\/>/
			},
			{
				className: "tag",
				begin: regex.concat(/</, regex.lookahead(regex.concat(TAG_NAME_RE, regex.either(/\/>/, />/, /\s/)))),
				end: /\/?>/,
				contains: [{
					className: "name",
					begin: TAG_NAME_RE,
					relevance: 0,
					starts: TAG_INTERNALS
				}]
			},
			{
				className: "tag",
				begin: regex.concat(/<\//, regex.lookahead(regex.concat(TAG_NAME_RE, />/))),
				contains: [{
					className: "name",
					begin: TAG_NAME_RE,
					relevance: 0
				}, {
					begin: />/,
					relevance: 0,
					endsParent: true
				}]
			}
		]
	};
}
//#endregion
//#region resources/js/highlight.ts
core_default.registerLanguage("php", php);
core_default.registerLanguage("dos", dos);
core_default.registerLanguage("css", css);
core_default.registerLanguage("cpp", cpp);
core_default.registerLanguage("csharp", csharp);
core_default.registerLanguage("ini", ini);
core_default.registerLanguage("json", json);
core_default.registerLanguage("xml", xml);
core_default.registerLanguage("angelscript", angelscript);
core_default.registerLanguage("javascript", javascript);
core_default.registerLanguage("plaintext", plaintext);
core_default.addPlugin({
	"before:highlightElement"({ el }) {
		const children = Array.from(el.children);
		el.__custom_highlight_children = children;
		children.forEach((x) => x.parentElement?.removeChild(x));
	},
	"after:highlightElement"({ el }) {
		const children = el.__custom_highlight_children;
		if (children) el.prepend(...children);
	}
});
var highlight_default = core_default;
//#endregion
//#region resources/js/image-cycler.ts
function init_all_image_cyclers(element) {
	element.querySelectorAll(".image-cycler").forEach((x) => {
		init_image_cycler(x);
	});
}
function init_image_cycler(element) {
	if (element.getAttribute("data-stop")) return;
	element.setAttribute("data-stop", "true");
	const images = Array.from(element.querySelectorAll("img"));
	const controls = element.querySelector(".controls");
	if (images.length <= 1 || !controls) return;
	const numImages = images.length;
	let curImage = 0;
	const prev = document.createElement("a");
	prev.href = "#";
	prev.innerHTML = "<span class=\"fas fa-chevron-left\"></span>";
	const next = document.createElement("a");
	next.href = "#";
	next.innerHTML = "<span class=\"fas fa-chevron-right\"></span>";
	const label = document.createElement("span");
	label.textContent = `${curImage + 1} / ${numImages}`;
	const cycle = (num) => {
		images[curImage].classList.add("d-none");
		curImage += num;
		while (curImage < 0) curImage += numImages;
		curImage = curImage % numImages;
		label.textContent = `${curImage + 1} / ${numImages}`;
		images[curImage].classList.remove("d-none");
	};
	prev.addEventListener("click", (event) => {
		event.preventDefault();
		cycle(-1);
	});
	next.addEventListener("click", (event) => {
		event.preventDefault();
		cycle(1);
	});
	controls.append(prev, label, next);
	if (element.classList.contains("image-cycler-clickable")) {
		const containers = Array.from(element.parentElement?.children || []);
		element.addEventListener("click", (event) => {
			if (event.target && ("" + event.target.tagName).toUpperCase() == "IMG") containers.forEach((c) => {
				c.classList.toggle("col-lg-12");
				c.classList.toggle("enlarged");
			});
		});
	}
}
//#endregion
//#region resources/js/parser.ts
var import_build = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var Colours = class Colours {
		static IsValidColor(text) {
			if (/^#(?:[0-9A-F]{3}){1,2}$/i.test(text)) return true;
			return Colours.ColorNames.includes(text.toLowerCase());
		}
	};
	Colours.ColorNames = [
		"aliceblue",
		"antiquewhite",
		"aqua",
		"aquamarine",
		"azure",
		"beige",
		"bisque",
		"black",
		"blanchedalmond",
		"blue",
		"blueviolet",
		"brown",
		"burlywood",
		"cadetblue",
		"chartreuse",
		"chocolate",
		"coral",
		"cornflowerblue",
		"cornsilk",
		"crimson",
		"cyan",
		"darkblue",
		"darkcyan",
		"darkgoldenrod",
		"darkgray",
		"darkgrey",
		"darkgreen",
		"darkkhaki",
		"darkmagenta",
		"darkolivegreen",
		"darkorange",
		"darkorchid",
		"darkred",
		"darksalmon",
		"darkseagreen",
		"darkslateblue",
		"darkslategray",
		"darkslategrey",
		"darkturquoise",
		"darkviolet",
		"deeppink",
		"deepskyblue",
		"dimgray",
		"dimgrey",
		"dodgerblue",
		"firebrick",
		"floralwhite",
		"forestgreen",
		"fuchsia",
		"gainsboro",
		"ghostwhite",
		"gold",
		"goldenrod",
		"gray",
		"grey",
		"green",
		"greenyellow",
		"honeydew",
		"hotpink",
		"indianred",
		"indigo",
		"ivory",
		"khaki",
		"lavender",
		"lavenderblush",
		"lawngreen",
		"lemonchiffon",
		"lightblue",
		"lightcoral",
		"lightcyan",
		"lightgoldenrodyellow",
		"lightgray",
		"lightgrey",
		"lightgreen",
		"lightpink",
		"lightsalmon",
		"lightseagreen",
		"lightskyblue",
		"lightslategray",
		"lightslategrey",
		"lightsteelblue",
		"lightyellow",
		"lime",
		"limegreen",
		"linen",
		"magenta",
		"maroon",
		"mediumaquamarine",
		"mediumblue",
		"mediumorchid",
		"mediumpurple",
		"mediumseagreen",
		"mediumslateblue",
		"mediumspringgreen",
		"mediumturquoise",
		"mediumvioletred",
		"midnightblue",
		"mintcream",
		"mistyrose",
		"moccasin",
		"navajowhite",
		"navy",
		"oldlace",
		"olive",
		"olivedrab",
		"orange",
		"orangered",
		"orchid",
		"palegoldenrod",
		"palegreen",
		"paleturquoise",
		"palevioletred",
		"papayawhip",
		"peachpuff",
		"peru",
		"pink",
		"plum",
		"powderblue",
		"purple",
		"red",
		"rosybrown",
		"royalblue",
		"saddlebrown",
		"salmon",
		"sandybrown",
		"seagreen",
		"seashell",
		"sienna",
		"silver",
		"skyblue",
		"slateblue",
		"slategray",
		"slategrey",
		"snow",
		"springgreen",
		"steelblue",
		"tan",
		"teal",
		"thistle",
		"tomato",
		"turquoise",
		"violet",
		"wheat",
		"white",
		"whitesmoke",
		"yellow",
		"yellowgreen"
	];
	function escapeEmoji(str) {
		return str.replace(/\p{Emoji_Presentation}/gmu, (s) => "&#" + s.codePointAt(0) + ";");
	}
	var ALLOWED_URL_SCHEMES = [
		"http",
		"https",
		"mailto",
		"ftp"
	];
	var HtmlHelper = class HtmlHelper {
		static Encode(text) {
			text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
			return escapeEmoji(text);
		}
		static UrlEncode(text) {
			return encodeURI(text);
		}
		static AttributeEncode(text) {
			text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
			return escapeEmoji(text);
		}
		static StripControlCharacters(text) {
			return text == null ? text : text.replace(/[\x00-\x1F\x7F]/g, "");
		}
		static GetUrlScheme(url) {
			if (url == null) return null;
			const match = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
			return match ? match[1].toLowerCase() : null;
		}
		static ValidateUrl(url) {
			if (url == null) return false;
			const scheme = HtmlHelper.GetUrlScheme(HtmlHelper.StripControlCharacters(url));
			return scheme == null || ALLOWED_URL_SCHEMES.includes(scheme);
		}
	};
	var Lines = class {
		constructor(content) {
			this.Content = content.split("\n");
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
	};
	var ParseData = class {
		constructor() {
			this._values = {};
		}
		Get(key, defaultValue) {
			if (this._values[key]) return this._values[key];
			const v = defaultValue();
			this._values[key] = v;
			return v;
		}
		Set(key, value) {
			this._values[key] = value;
		}
	};
	var NodeCollection = class {
		constructor(...nodes) {
			this.Nodes = Array.from(nodes);
		}
		ToHtml() {
			return this.Nodes.map((x) => x.ToHtml()).join("");
		}
		ToPlainText() {
			return this.Nodes.map((x) => x.ToPlainText()).join("");
		}
		GetChildren() {
			return this.Nodes;
		}
		ReplaceChild(i, node) {
			this.Nodes[i] = node;
		}
		HasContent() {
			return this.Nodes.some((x) => x.HasContent());
		}
	};
	var RemovedNode = class {
		constructor(originalNode) {
			this.OriginalNode = originalNode;
		}
		ToHtml() {
			return "";
		}
		ToPlainText() {
			return "";
		}
		GetChildren() {
			return [];
		}
		ReplaceChild(_i, _node) {
			throw new Error("Unsupported operation.");
		}
		HasContent() {
			return false;
		}
	};
	var NodeExtensions = class NodeExtensions {
		static Remove(root, remove) {
			const children = root.GetChildren();
			const idx = children.indexOf(remove);
			if (idx >= 0) {
				root.ReplaceChild(idx, new RemovedNode(remove));
				return true;
			}
			for (const ch of children) if (NodeExtensions.Remove(ch, remove)) return true;
			return false;
		}
		static Walk(node, visitor) {
			if (visitor(node) === false) return false;
			for (const child of node.GetChildren()) if (NodeExtensions.Walk(child, visitor) === false) return false;
			return true;
		}
		static WalkBack(node, visitor) {
			for (const child of Array.from(node.GetChildren()).reverse()) if (NodeExtensions.WalkBack(child, visitor) === false) return false;
			if (visitor(node) === false) return false;
			return true;
		}
	};
	var PlainTextNode = class PlainTextNode {
		static Empty() {
			return new PlainTextNode("");
		}
		constructor(text) {
			this.Text = text;
		}
		ToHtml() {
			return HtmlHelper.Encode(this.Text);
		}
		ToPlainText() {
			return this.Text;
		}
		GetChildren() {
			return [];
		}
		ReplaceChild(_i, _node) {
			throw new Error("Invalid operation");
		}
		HasContent() {
			return this.Text && this.Text.trim() != "";
		}
	};
	var UnprocessablePlainTextNode = class UnprocessablePlainTextNode {
		static Empty() {
			return new UnprocessablePlainTextNode("");
		}
		static NewLine() {
			return new UnprocessablePlainTextNode("\n");
		}
		constructor(text) {
			this.Text = text;
		}
		ToHtml() {
			return HtmlHelper.Encode(this.Text);
		}
		ToPlainText() {
			return this.Text;
		}
		GetChildren() {
			return [];
		}
		ReplaceChild(_i, _node) {
			throw new Error("Invalid operation");
		}
		HasContent() {
			return this.Text && this.Text.trim() != "";
		}
	};
	var MetadataNode = class {
		constructor(key, value) {
			this.Key = key;
			this.Value = value;
		}
		ToHtml() {
			return "";
		}
		ToPlainText() {
			return "";
		}
		GetChildren() {
			return [];
		}
		ReplaceChild(_i, _node) {
			throw new Error("Invalid operation.");
		}
		HasContent() {
			return false;
		}
	};
	var ParseResult = class {
		constructor() {
			this.Content = new NodeCollection();
		}
		GetMetadata() {
			const list = [];
			NodeExtensions.Walk(this.Content, (n) => {
				if (n instanceof MetadataNode) list.push({
					Key: n.Key,
					Value: n.Value
				});
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
	};
	var State = class {
		get Length() {
			return this.Text.length;
		}
		get Done() {
			return this.Index >= this.Length;
		}
		constructor(text) {
			this.Text = text;
			this.Index = 0;
		}
		ScanTo(find, ignoreCase = false) {
			let pos = ignoreCase ? this.Text.toLowerCase().indexOf(find.toLowerCase(), this.Index) : this.Text.indexOf(find, this.Index);
			if (pos < 0) pos = this.Length;
			const ret = this.Text.substring(this.Index, pos);
			this.Index = pos;
			return ret;
		}
		SkipWhitespace() {
			while (this.Index < this.Length && this.Text[this.Index].trim() == "") this.Index++;
		}
		PeekTo(find) {
			const pos = this.Text.indexOf(find, this.Index);
			if (pos < 0) return null;
			return this.Text.substring(this.Index, pos);
		}
		Seek(index, fromStart) {
			this.Index = fromStart ? index : this.Index + index;
		}
		Peek(count) {
			if (this.Index + count > this.Length) count = this.Length - this.Index;
			return this.Text.substring(this.Index, this.Index + count);
		}
		Next() {
			if (this.Index >= this.Length) return "\0";
			return this.Text[this.Index++];
		}
		GetToken() {
			if (this.Done || this.Text[this.Index] != "[") return null;
			let found = false;
			let tok = "";
			for (let i = this.Index + 1; i < Math.min(this.Index + 10, this.Length); i++) {
				const c = this.Text[i];
				if (c == " " || c == "=" || c == "]") {
					found = tok.length > 0;
					break;
				}
				tok += c;
			}
			return found ? tok.toLowerCase() : null;
		}
	};
	exports.TagParseContext = void 0;
	(function(TagParseContext) {
		TagParseContext[TagParseContext["Block"] = 0] = "Block";
		TagParseContext[TagParseContext["Inline"] = 1] = "Inline";
	})(exports.TagParseContext || (exports.TagParseContext = {}));
	function OrderBy(array, selector) {
		return Array.from(array).sort((a, b) => {
			const ka = selector(a);
			const kb = selector(b);
			if (ka < kb) return -1;
			if (ka > kb) return 1;
			return 0;
		});
	}
	function OrderByDescending(array, selector) {
		return OrderBy(array, selector).reverse();
	}
	function IndexOfAny(str, searchStrings, position = 0) {
		let min = -1;
		for (const searchString of searchStrings) {
			const idx = str.indexOf(searchString, position);
			if (idx >= 0) min = min < 0 ? idx : Math.min(min, idx);
		}
		return min;
	}
	function Template(template_string, obj) {
		return template_string.replace(/\{(.*?)\}/gi, function(_match, name) {
			return obj[name] || "";
		});
	}
	var Util = /*#__PURE__*/ Object.freeze({
		__proto__: null,
		IndexOfAny,
		OrderBy,
		OrderByDescending,
		Template
	});
	var Parser = class Parser {
		constructor(configuration) {
			this.Configuration = configuration;
		}
		ParseResult(text, scope = "") {
			const data = new ParseData();
			text = text.trim();
			let node = this.ParseElements(data, text, scope);
			node = this.RunProcessors(node, data, scope);
			const res = new ParseResult();
			res.Content = node;
			return res;
		}
		ParseElements(data, text, scope) {
			const root = new NodeCollection();
			text = text.replace("\r", "");
			const lines = new Lines(text);
			const inscope = OrderByDescending(this.Configuration.Elements.filter((x) => x.InScope(scope)), (x) => x.Priority);
			const plain = [];
			while (lines.Next()) {
				let matched = false;
				for (const e of inscope) {
					if (!e.Matches(lines)) continue;
					const con = e.Consume(this, data, lines, scope);
					if (con == null) continue;
					if (plain.length > 0) {
						root.Nodes.push(Parser.TrimWhitespace(this.ParseTags(data, plain.join("\n").trim(), scope, exports.TagParseContext.Block)));
						root.Nodes.push(UnprocessablePlainTextNode.NewLine());
					}
					plain.splice(0, plain.length);
					root.Nodes.push(con);
					root.Nodes.push(UnprocessablePlainTextNode.NewLine());
					matched = true;
					break;
				}
				if (!matched) plain.push(lines.Value());
			}
			if (plain.length > 0) root.Nodes.push(Parser.TrimWhitespace(this.ParseTags(data, plain.join("\n").trim(), scope, exports.TagParseContext.Block)));
			const shouldTrim = () => {
				if (root.Nodes.length === 0) return false;
				const last = root.Nodes[root.Nodes.length - 1];
				if (!(last instanceof UnprocessablePlainTextNode)) return false;
				return !last.Text || last.Text.trim() == "";
			};
			while (shouldTrim()) root.Nodes.splice(root.Nodes.length - 1, 1);
			Parser.FlattenNestedNodeCollections(root);
			return Parser.TrimWhitespace(root);
		}
		static TrimWhitespace(node, start = true, end = true) {
			const removeNodes = [];
			if (start) NodeExtensions.Walk(node, (x) => {
				if (x instanceof NodeCollection) return true;
				if (x.HasContent()) return false;
				if (x instanceof UnprocessablePlainTextNode || x instanceof PlainTextNode) removeNodes.push(x);
				return true;
			});
			if (end) NodeExtensions.WalkBack(node, (x) => {
				if (x instanceof NodeCollection) return true;
				if (x.HasContent()) return false;
				if (x instanceof UnprocessablePlainTextNode || x instanceof PlainTextNode) removeNodes.push(x);
				return true;
			});
			for (const rem of removeNodes) NodeExtensions.Remove(node, rem);
			return node;
		}
		ParseTags(data, text, scope, context) {
			text = text.replace(/\n{3,}/g, "\n\n");
			const state = new State(text);
			const root = new NodeCollection();
			const inscope = OrderByDescending(this.Configuration.Tags.filter((x) => x.InScope(scope)), (x) => x.Priority);
			while (!state.Done) {
				let plain = state.ScanTo("[");
				if (plain && plain != "") root.Nodes.push(new PlainTextNode(plain));
				if (state.Done) break;
				const token = state.GetToken();
				let found = false;
				for (const t of inscope) if (t.Matches(state, token, context)) {
					const parsed = t.Parse(this, data, state, scope, context);
					if (parsed != null) {
						root.Nodes.push(parsed);
						found = true;
						break;
					}
				}
				if (!found) {
					plain = state.Next();
					if (plain && plain != "") root.Nodes.push(new PlainTextNode(plain));
				}
			}
			return root;
		}
		static FlattenNestedNodeCollections(node) {
			if (node instanceof NodeCollection) {
				const coll = node;
				while (coll.Nodes.some((x) => x instanceof NodeCollection)) coll.Nodes = coll.Nodes.flatMap((x) => x instanceof NodeCollection ? x.Nodes : [x]);
			} else {
				const ch = node.GetChildren();
				for (let i = 0; i < ch.length; i++) while (ch[i] instanceof NodeCollection && ch[i].Nodes.length == 1) {
					const chcoll = ch[i];
					node.ReplaceChild(i, chcoll.Nodes[0]);
					ch[i] = chcoll.Nodes[0];
				}
			}
			for (const child of node.GetChildren()) Parser.FlattenNestedNodeCollections(child);
		}
		RunProcessors(node, data, scope) {
			for (const processor of OrderByDescending(this.Configuration.Processors, (x) => x.Priority)) node = this.RunProcessor(node, processor, data, scope);
			return node;
		}
		RunProcessor(node, processor, data, scope) {
			if (processor.ShouldProcess(node, scope)) {
				const result = processor.Process(this, data, node, scope);
				return result.length == 1 ? result[0] : new NodeCollection(...result);
			}
			const children = node.GetChildren();
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				const processed = this.RunProcessor(child, processor, data, scope);
				node.ReplaceChild(i, processed);
			}
			return node;
		}
	};
	var HtmlNode = class {
		constructor(htmlBefore, content, htmlAfter) {
			this.HtmlBefore = htmlBefore;
			this.Content = content;
			this.HtmlAfter = htmlAfter;
			this.PlainBefore = this.PlainAfter = "";
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
			if (i !== 0) throw new Error("Index out of range");
			this.Content = node;
		}
		HasContent() {
			return true;
		}
	};
	var Element = class {
		constructor() {
			this.Priority = 0;
		}
		InScope(scope) {
			return scope == null || scope.trim() == "" || this.Scopes.includes(scope);
		}
	};
	var PreElement = class PreElement extends Element {
		constructor() {
			super(...arguments);
			this.Token = "pre";
		}
		Matches(lines) {
			const value = lines.Value().trim();
			return value.length > this.Token.length + 1 && value.startsWith("[" + this.Token) && value.match(this.getTokenRegex()) != null;
		}
		getTokenRegex() {
			const escapedToken = this.Token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			return new RegExp("\\[" + escapedToken + "(?:=([a-z ]+))?\\]", "i");
		}
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
			let lang = void 0;
			let hl = false;
			if (res[1]) {
				const spl = res[1].split(" ");
				hl = spl.includes("highlight");
				lang = (_a = spl.find((x) => x != "highlight")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
				if (!PreElement.AllowedLanguages.includes(lang)) lang = void 0;
			}
			if (line.endsWith("[/" + this.Token + "]")) arr.push(line.substring(0, line.length - (this.Token.length + 3)));
			else {
				if (line.length > 0) arr.push(line);
				let found = false;
				while (lines.Next()) {
					const value = lines.Value().trimEnd();
					if (value.endsWith("[/" + this.Token + "]")) {
						const lastLine = value.substring(0, value.length - (this.Token.length + 3));
						arr.push(lastLine);
						found = true;
						break;
					} else arr.push(value);
				}
				if (!found || arr.length == 0) {
					lines.SetCurrent(current);
					return null;
				}
			}
			for (let i = 0; i < 2; i++) {
				while (arr.length > 0 && arr[0].trim() == "") arr.splice(0, 1);
				arr.reverse();
			}
			let highlight = [];
			if (hl) {
				const newArr = [];
				let firstLine = 0;
				for (const srcLine of arr) {
					if (srcLine.startsWith("@@")) {
						const match = srcLine.match(/^@@(?:(#[0-9a-f]{3}|#[0-9a-f]{6}|[a-z]+|\d+)(?::(\d+))?)?$/im);
						if (match != null) {
							let numLines = 1;
							let color = "#FF8000";
							for (let i = 1; i < match.length; i++) {
								const p = match[i];
								if (Colours.IsValidColor(p)) color = p;
								else if (parseInt(p, 10)) numLines = parseInt(p, 10);
							}
							highlight.push({
								firstLine,
								numLines,
								color
							});
							continue;
						}
					}
					firstLine++;
					newArr.push(srcLine);
				}
				arr = newArr;
				highlight.push({
					firstLine: arr.length,
					numLines: 0,
					color: ""
				});
				for (let i = 0; i < highlight.length - 1; i++) {
					const { firstLine: currFirst, numLines: currNum, color: currCol } = highlight[i];
					const { firstLine: nextFirst } = highlight[i + 1];
					if (currFirst + currNum - 1 >= nextFirst) highlight[i] = {
						firstLine: currFirst,
						numLines: nextFirst - currFirst,
						color: currCol
					};
				}
				highlight = highlight.filter((x) => x.numLines > 0);
			}
			arr = PreElement.FixCodeIndentation(arr);
			const highlights = highlight.map((h) => `<div class="line-highlight" style="top: ${h.firstLine}em; height: ${h.numLines}em; background: ${h.color};"></div>`).join("");
			const plain = new UnprocessablePlainTextNode(arr.join("\n"));
			return new HtmlNode(`<pre${!lang || lang.trim() == "" ? "" : ` class="lang-${lang}"`}><code>${highlights}`, plain, "</code></pre>");
		}
		static FixCodeIndentation(arr) {
			arr = arr.map((x) => x.replace(/\t/g, "    "));
			const longestWhitespace = arr.reduce((c, i) => {
				if (i.trim().length == 0) return c;
				const wht = i.length - i.trimStart().length;
				return Math.min(wht, c);
			}, 9999);
			return arr.map((a) => a.substring(Math.min(longestWhitespace, a.length)));
		}
	};
	PreElement.AllowedLanguages = [
		"php",
		"dos",
		"bat",
		"cmd",
		"css",
		"cpp",
		"c",
		"c++",
		"cs",
		"ini",
		"json",
		"xml",
		"html",
		"angelscript",
		"javascript",
		"js",
		"plaintext"
	];
	var MdCodeElement = class extends Element {
		constructor() {
			super();
			this.Priority = 10;
		}
		Matches(lines) {
			return lines.Value().startsWith("```");
		}
		Consume(parser, data, lines, _scope) {
			const current = lines.Current();
			let firstLine = lines.Value().substring(3).trimEnd();
			let lang = null;
			if (PreElement.AllowedLanguages.includes(firstLine.toLowerCase())) {
				lang = firstLine;
				firstLine = "";
			}
			let arr = [firstLine];
			let found = false;
			while (lines.Next()) {
				const value = lines.Value().trimEnd();
				if (value.endsWith("```")) {
					const lastLine = value.substring(0, value.length - 3);
					arr.push(lastLine);
					found = true;
					break;
				} else arr.push(value);
			}
			if (!found) {
				lines.SetCurrent(current);
				return null;
			}
			for (let i = 0; i < 2; i++) {
				while (arr.length > 0 && arr[0].trim() == "") arr.splice(0, 1);
				arr.reverse();
			}
			arr = arr.map((x) => x.replace(/\t/g, "    "));
			const longestWhitespace = arr.reduce((c, i) => {
				if (i.trim().length == 0) return c;
				const wht = i.length - i.trimStart().length;
				return Math.min(wht, c);
			}, 9999);
			arr = arr.map((a) => a.substring(Math.min(longestWhitespace, a.length)));
			const plain = new UnprocessablePlainTextNode(arr.join("\n"));
			return new HtmlNode(`<pre${!lang || lang.trim() == "" ? "" : ` class="lang-${lang}"`}><code>`, plain, "</code></pre>");
		}
	};
	var ColumnNode = class {
		constructor(width, content) {
			this.Width = width;
			this.Content = content;
		}
		ToHtml() {
			return `<div class="col-md-${this.Width}">\n${this.Content.ToHtml()}</div>\n`;
		}
		ToPlainText() {
			return this.Content.ToPlainText() + "\n\n";
		}
		GetChildren() {
			return [this.Content];
		}
		ReplaceChild(i, node) {
			if (i != 0) throw new Error("Argument out of range");
			this.Content = node;
		}
		HasContent() {
			return true;
		}
	};
	var MdColumnsElement = class extends Element {
		Matches(lines) {
			return lines.Value().startsWith("%%columns=");
		}
		Consume(parser, data, lines, scope) {
			const current = lines.Current();
			const colDefs = lines.Value().substring(10).split(":").map((x) => {
				var _a;
				return (_a = parseInt(x, 10)) !== null && _a !== void 0 ? _a : 0;
			});
			let total = 0;
			for (const d of colDefs) if (d > 0) total += d;
			else {
				lines.SetCurrent(current);
				return null;
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
				if (value == "%%") {
					cols.push(new ColumnNode(colDefs[i], parser.ParseElements(data, arr.join("\n"), scope)));
					arr = [];
					i++;
				} else arr.push(value);
				if (i >= colDefs.length) break;
			}
			if (i != colDefs.length || arr.length > 0) {
				lines.SetCurrent(current);
				return null;
			}
			return new HtmlNode("<div class=\"row\">", new NodeCollection(...cols), "</div>");
		}
	};
	var HeadingNode = class {
		constructor(level, id, text) {
			this.Level = level;
			this.ID = id;
			this.Text = text;
		}
		ToHtml() {
			return `<h${this.Level} id="${this.ID}">${this.Text.ToHtml()}</h${this.Level}>`;
		}
		ToPlainText() {
			const plain = this.Text.ToPlainText().replace(/\n/g, " ");
			return plain + "\n" + "-".repeat(plain.length);
		}
		GetChildren() {
			return [this.Text];
		}
		ReplaceChild(i, node) {
			if (i != 0) throw new Error("Argument out of range");
			this.Text = node;
		}
		HasContent() {
			return true;
		}
	};
	var MdHeadingElement = class MdHeadingElement extends Element {
		Matches(lines) {
			const value = lines.Value();
			return value.length > 0 && value.startsWith("=");
		}
		Consume(parser, data, lines, scope) {
			const value = lines.Value().trim();
			const res = /^(=+)(.*?)=*$/i.exec(value);
			const level = Math.min(6, res[1].length);
			const text = res[2].trim();
			let contents = parser.ParseTags(data, text, scope, exports.TagParseContext.Inline);
			contents = parser.RunProcessors(contents, data, scope);
			return new HeadingNode(level, MdHeadingElement.GetUniqueAnchor(data, contents.ToPlainText()), contents);
		}
		static GetUniqueAnchor(data, text) {
			const key = MdHeadingElement.name + ".IdList";
			const anchors = data.Get(key, () => /* @__PURE__ */ new Set());
			const id = text.replace(/[^\da-z?/:@\-._~!$&'()*+,;=]/gi, "_");
			let anchor = id;
			let inc = 1;
			do {
				if (!anchors.has(anchor)) break;
				inc++;
				anchor = `${id}_${inc}`;
			} while (true);
			anchors.add(anchor);
			return anchor;
		}
	};
	var MdLineElement = class extends Element {
		Matches(lines) {
			const value = lines.Value().trimEnd();
			return value.length >= 3 && value == "-".repeat(value.length);
		}
		Consume(_parser, _data, _lines, _scope) {
			const ret = new HtmlNode("<hr />", PlainTextNode.Empty(), "");
			ret.PlainBefore = "---";
			return ret;
		}
	};
	var RefNode = class {
		constructor(data, name) {
			this.Data = data;
			this.Name = name;
		}
		GetNode() {
			return this.Data.Get(`Ref::${this.Name}`, UnprocessablePlainTextNode.Empty);
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
			if (i != 0) throw new Error("Index out of range");
			this.Data.Set(`Ref::${this.Name}`, node);
		}
		HasContent() {
			return this.GetNode().HasContent();
		}
	};
	var ListNode = class {
		constructor(tag, ...items) {
			this.Tag = tag;
			this.Items = items;
		}
		ToHtml() {
			let sb = "";
			sb += `<${this.Tag}>\n`;
			for (const item of this.Items) sb += item.ToHtml();
			sb += `</${this.Tag}>\n`;
			return sb;
		}
		ToPlainText() {
			return this.ToPlainTextPrefixed("");
		}
		ToPlainTextPrefixed(prefix) {
			const st = prefix + (this.Tag == "ol" ? "#" : "-");
			let sb = "";
			for (const item of this.Items) sb += item.ToPlainTextPrefixed(st);
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
	};
	var ListItemNode = class {
		constructor(content) {
			this.Content = content;
			this.Subtrees = [];
		}
		ToHtml() {
			let sb = "<li>";
			sb += this.Content.ToHtml();
			for (const st of this.Subtrees) sb += st.ToHtml();
			sb += "</li>\n";
			return sb;
		}
		ToPlainText() {
			throw new Error("Invalid operation");
		}
		ToPlainTextPrefixed(prefix) {
			let sb = prefix + " ";
			sb += this.Content.ToPlainText() + "\n";
			for (const st of this.Subtrees) sb += st.ToPlainTextPrefixed(prefix);
			return sb;
		}
		GetChildren() {
			return [this.Content, ...this.Subtrees];
		}
		ReplaceChild(i, node) {
			if (i == 0) this.Content = node;
			else this.Subtrees[i - 1] = node;
		}
		HasContent() {
			return true;
		}
	};
	var MdListElement = class MdListElement extends Element {
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
			if (len == 0) return 0;
			let tokens = 0;
			let foundSpace = false;
			for (let i = 0; i < len; i++) {
				const c = value[i];
				if (MdListElement.IsListToken(c)) {
					tokens++;
					continue;
				}
				if (c == " ") {
					foundSpace = true;
					break;
				}
				return 0;
			}
			if (foundSpace && tokens > 0 && tokens <= currentLevel + 1) return tokens;
			return 0;
		}
		Matches(lines) {
			const value = lines.Value().trim();
			return MdListElement.IsValidListItem(value, 0) > 0;
		}
		Consume(parser, data, lines, scope) {
			const current = lines.Current();
			const item = new ListItemNode(PlainTextNode.Empty());
			this.CreateListItems(item, "", parser, data, lines, scope);
			if (item.Subtrees.length == 0) {
				lines.SetCurrent(current);
				return null;
			}
			if (item.Subtrees.length == 1) return item.Subtrees[0];
			return new NodeCollection(...item.Subtrees);
		}
		CreateListItems(lastItemNode, prefix, parser, data, lines, scope) {
			const ret = [];
			do {
				let value = lines.Value().trimEnd();
				if (!value.startsWith(prefix)) {
					lines.Back();
					break;
				}
				value = value.substring(prefix.length);
				if (value.length > 1 && value[0] == " " && prefix.length > 0) {
					value = value.trimStart();
					while (value.endsWith("^")) if (value.endsWith("\\^")) {
						value = value.substring(0, value.length - 2) + "^";
						break;
					} else if (lines.Next()) value = value.substring(0, value.length - 1).trim() + "\n" + lines.Value().trimStart();
					else break;
					value = value.trim();
					let pt;
					const res = /^:ref=([a-z0-9 ]+)$/i.exec(value);
					if (res) {
						const name = res[1];
						pt = new RefNode(data, name);
					} else pt = parser.ParseElements(data, value, scope);
					lastItemNode = new ListItemNode(pt);
					ret.push(lastItemNode);
				} else if (value.length > 2 && MdListElement.IsListToken(value[0]) && value[1] == " " && lastItemNode != null) {
					const sublist = new ListNode(MdListElement.IsSortedToken(value[0]) ? "ol" : "ul", ...this.CreateListItems(lastItemNode, prefix + value[0], parser, data, lines, scope));
					lastItemNode.Subtrees.push(sublist);
				} else {
					lines.Back();
					break;
				}
			} while (lines.Next());
			return ret;
		}
	};
	MdListElement.UlTokens = /* @__PURE__ */ new Set(["*", "-"]);
	MdListElement.OlTokens = /* @__PURE__ */ new Set(["#"]);
	var MdPanelElement = class extends Element {
		Matches(lines) {
			return lines.Value().startsWith("~~~");
		}
		Consume(parser, data, lines, scope) {
			const current = lines.Current();
			const meta = lines.Value().substring(3).trim();
			let title = "";
			let found = false;
			const arr = [];
			while (lines.Next()) {
				const value = lines.Value().trimEnd();
				if (value == "~~~") {
					found = true;
					break;
				}
				if (value.length > 1 && value[0] == ":") title = value.substring(1).trim();
				else arr.push(value);
			}
			if (!found) {
				lines.SetCurrent(current);
				return null;
			}
			let cls;
			if (meta == "message") cls = "card-success";
			else if (meta == "info") cls = "card-info";
			else if (meta == "warning") cls = "card-warning";
			else if (meta == "error") cls = "card-danger";
			else cls = "card-default";
			const node = new HtmlNode(`<div class="embed-panel card ${cls}">` + (title != "" ? `<div class="card-header">${HtmlHelper.Encode(title)}</div>` : "") + "<div class=\"card-body\">", parser.ParseElements(data, arr.join("\n"), scope), "</div></div>");
			node.PlainBefore = title == "" ? "" : title + "\n" + "-".repeat(title.length) + "\n";
			return node;
		}
	};
	var MdQuoteElement = class extends Element {
		Matches(lines) {
			const value = lines.Value();
			return value.length > 0 && value.startsWith(">");
		}
		Consume(parser, data, lines, scope) {
			let value = lines.Value();
			const arr = [value.substring(1).trim()];
			while (lines.Next()) {
				value = lines.Value().trim();
				if (value.length == 0 || value[0] != ">") {
					lines.Back();
					break;
				}
				arr.push(value.substring(1).trim());
			}
			const text = arr.join("\n").trim();
			const ret = new HtmlNode("<blockquote>", parser.ParseElements(data, text, scope), "</blockquote>");
			ret.PlainBefore = "[quote]\n";
			ret.PlainAfter = "\n[/quote]";
			return ret;
		}
	};
	var TableRow = class {
		constructor(type, ...cells) {
			this.Type = type;
			this.Cells = cells;
		}
		ToHtml() {
			let sb = "<tr>\n";
			for (const cell of this.Cells) sb += `<${this.Type}>${cell.ToHtml()}</${this.Type}>\n`;
			sb += "</tr>\n";
			return sb;
		}
		ToPlainText() {
			let sb = "";
			let first = true;
			for (const cell of this.Cells) {
				if (!first) sb += " | ";
				sb += cell.ToPlainText();
				first = false;
			}
			sb += "\n";
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
	};
	var MdTableElement = class MdTableElement extends Element {
		Matches(lines) {
			const value = lines.Value().trimEnd();
			return value.length >= 2 && value[0] == "|" && (value[1] == "=" || value[1] == "-");
		}
		Consume(parser, data, lines, scope) {
			const arr = [];
			do {
				const value = lines.Value().trimEnd();
				if (value.length < 2 || value[0] != "|" || value[1] != "=" && value[1] != "-") {
					lines.Back();
					break;
				}
				const cells = MdTableElement.SplitTable(value.substring(2)).map((x) => MdTableElement.ResolveCell(x, parser, data, scope));
				arr.push(new TableRow(value[1] == "=" ? "th" : "td", ...cells));
			} while (lines.Next());
			return new HtmlNode("<div class=\"table-responsive\"><table class=\"table table-bordered\">", new NodeCollection(...arr), "</table></div>");
		}
		static SplitTable(text) {
			const ret = [];
			let level = 0;
			let last = 0;
			text = text.trim();
			const len = text.length;
			let i = 0;
			for (; i < len; i++) {
				const c = text[i];
				if (c == "[") level++;
				else if (c == "]") level--;
				else if (c == "|" && level == 0 || i == len - 1) {
					ret.push(text.substring(last, i + (i == len - 1 ? 1 : 0)).trim());
					last = i + 1;
				}
			}
			if (last < len) ret.push(text.substring(last, i + (i == len - 1 ? 1 : 0)).trim());
			return ret;
		}
		static ResolveCell(text, parser, data, scope) {
			const res = /^:ref=([a-z0-9 ]+)$/i.exec(text.trim());
			if (res) {
				const name = res[1];
				return new RefNode(data, name);
			}
			return parser.ParseTags(data, text, scope, exports.TagParseContext.Block);
		}
	};
	var QuoteElement = class QuoteElement extends Element {
		Matches(lines) {
			const value = lines.Value().trim();
			return value.length > 6 && value.toLowerCase().startsWith("[quote") && QuoteElement.OpenQuote.test(value);
		}
		Consume(parser, data, lines, scope) {
			const current = lines.Current();
			let line = lines.Value().trim();
			if (!QuoteElement.OpenQuote.exec(line)) {
				lines.SetCurrent(current);
				return null;
			}
			const { text, author, postfix } = QuoteElement.BalanceQuotes(lines);
			if (!text) {
				lines.SetCurrent(current);
				return null;
			}
			let before = "<blockquote>";
			let plainBefore = "[quote]\n";
			if (author) {
				before += `<strong class="quote-name">${author} said:</strong><br/>`;
				plainBefore = `${author} said: ${plainBefore}`;
			}
			const node = new HtmlNode(before, parser.ParseElements(data, text, scope), "</blockquote>");
			node.PlainBefore = plainBefore;
			node.PlainAfter = "\n[/quote]";
			node.IsBlockNode = true;
			if (postfix) return new NodeCollection(node, parser.ParseTags(data, postfix, scope, exports.TagParseContext.Inline));
			return node;
		}
		static BalanceQuotes(lines) {
			let name = null;
			let postfix = null;
			const openQuote = new RegExp(QuoteElement.OpenQuote, "iy");
			let line = lines.Value().trimStart();
			let openMat = openQuote.exec(line);
			if (!openMat) return {
				text: null,
				author: name,
				postfix
			};
			if (openMat[1]) name = openMat[1];
			line = line.substring(openMat[0].length);
			const arr = [];
			let currentLevel = 1;
			do {
				let idx = 0;
				do {
					openQuote.lastIndex = idx;
					openMat = openQuote.exec(line);
					const openMatIdx = openMat ? openMat.index : -1;
					const closeMatIdx = line.toLowerCase().indexOf("[/quote]", idx);
					if (openMatIdx >= 0 && (closeMatIdx < 0 || closeMatIdx > openMatIdx)) {
						currentLevel++;
						idx = openMat.index + openMat[0].length;
					} else if (closeMatIdx >= 0) {
						currentLevel--;
						if (currentLevel === 0) {
							if (line.length > closeMatIdx + QuoteElement.CloseQuoteLength) postfix = line.substring(closeMatIdx + QuoteElement.CloseQuoteLength);
							arr.push(line.substring(0, closeMatIdx));
							return {
								text: arr.join("\n"),
								author: name,
								postfix
							};
						}
						idx = closeMatIdx + QuoteElement.CloseQuoteLength;
					} else {
						arr.push(line);
						break;
					}
				} while (true);
				if (lines.Next()) line = lines.Value();
				else break;
			} while (true);
			return {
				text: null,
				author: name,
				postfix
			};
		}
	};
	QuoteElement.OpenQuote = /^\[quote(?:(?: name)?=([^\]]*))?\]/i;
	QuoteElement.CloseQuoteLength = 8;
	var RefElement = class extends Element {
		Matches(lines) {
			const value = lines.Value().trim();
			return value.length > 4 && value.startsWith("[ref=") && value.match(/\[ref=[a-z0-9 ]+\]/i) != null;
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
			if (line.endsWith("[/ref]")) arr.push(line.substring(0, line.length - 6));
			else {
				if (line.length > 0) arr.push(line);
				let found = false;
				while (lines.Next()) {
					const value = lines.Value().trimEnd();
					if (value.endsWith("[/ref]")) {
						const lastLine = value.substring(0, value.length - 6);
						arr.push(lastLine);
						found = true;
						break;
					} else arr.push(value);
				}
				if (!found || arr.length == 0) {
					lines.SetCurrent(current);
					return null;
				}
			}
			const node = parser.ParseElements(data, arr.join("\n").trim(), scope);
			data.Set(`Ref::${name}`, node);
			return PlainTextNode.Empty();
		}
	};
	var AutoLinkingProcessor = class {
		constructor() {
			this.Priority = 9;
		}
		ShouldProcess(node, _scope) {
			return node instanceof PlainTextNode && (node.Text.includes("http") || node.Text.includes("@"));
		}
		Process(parser, data, node, _scope) {
			const text = node.Text;
			const ret = [];
			const allMatches = [];
			const urlMatcher = /(?<=^|\s)(?<url>https?:\/\/[^\][""\s]+)(?=\s|$)/gi;
			let urlMatch = urlMatcher.exec(text);
			while (urlMatch != null) {
				allMatches.push(urlMatch);
				urlMatch = urlMatcher.exec(text);
			}
			const emailMatcher = /(?<=^|\s)(?<email>[^\][""\s@]+@[^\][""\s@]+\.[^\][""\s@]+)(?=\s|$)/gi;
			let emailMatch = emailMatcher.exec(text);
			while (emailMatch != null) {
				allMatches.push(emailMatch);
				emailMatch = emailMatcher.exec(text);
			}
			allMatches.sort((a, b) => a.index - b.index);
			let start = 0;
			for (const urlMatch of allMatches) {
				if (urlMatch.index < start) continue;
				if (urlMatch.index > start) ret.push(new PlainTextNode(text.substring(start, urlMatch.index)));
				if (urlMatch.groups["url"]) {
					const url = urlMatch.groups["url"];
					ret.push(new HtmlNode(`<a href="${HtmlHelper.AttributeEncode(url)}">`, new PlainTextNode(url), "</a>"));
				} else if (urlMatch.groups["email"]) {
					const email = urlMatch.groups["email"];
					ret.push(new HtmlNode(`<a href="mailto:${HtmlHelper.AttributeEncode(email)}">`, new PlainTextNode(email), "</a>"));
				}
				start = urlMatch.index + urlMatch[0].length;
			}
			if (start < text.length) ret.push(new PlainTextNode(text.substring(start)));
			return ret;
		}
	};
	var MarkdownTextProcessor = class MarkdownTextProcessor {
		constructor() {
			this.Priority = 10;
		}
		ShouldProcess(node, _scope) {
			return node instanceof PlainTextNode && IndexOfAny(node.Text, MarkdownTextProcessor.Tokens) >= 0;
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
			if (tracker[tokenIndex] != 0) return null;
			const endToken = text.indexOf(token, position + 1);
			if (endToken <= position + 1) return null;
			if (text.substring(position, endToken).indexOf("\n") >= 0) return null;
			if (!((endToken + 1 == text.length || MarkdownTextProcessor.IsEndBreakChar(text[endToken + 1])) && text[endToken - 1].trim() != "")) return null;
			const str = text.substring(position + 1, endToken);
			tracker[tokenIndex] = 1;
			let contents;
			if (token == "`") contents = new UnprocessablePlainTextNode(str);
			else {
				const toks = MarkdownTextProcessor.ParseTokens(tracker, str);
				contents = toks.length == 1 ? toks[0] : new NodeCollection(...toks);
			}
			tracker[tokenIndex] = 0;
			endPositionObj.endPosition = endToken;
			const ret = new HtmlNode(MarkdownTextProcessor.OpenTags[tokenIndex], contents, MarkdownTextProcessor.CloseTags[tokenIndex]);
			ret.PlainBefore = token;
			ret.PlainAfter = token;
			return ret;
		}
		static ParseTokens(tracker, text) {
			const ret = [];
			let plainStart = 0;
			let index = 0;
			while (true) {
				const nextIndex = IndexOfAny(text, MarkdownTextProcessor.Tokens, index);
				if (nextIndex < 0) break;
				if (!((nextIndex == 0 || MarkdownTextProcessor.IsStartBreakChar(text[nextIndex - 1])) && nextIndex + 1 < text.length && text[nextIndex + 1].trim() != "")) {
					index = nextIndex + 1;
					continue;
				}
				const endIndexObj = { endPosition: -1 };
				const parsed = MarkdownTextProcessor.ParseToken(tracker, text, nextIndex, endIndexObj);
				if (parsed == null) index = nextIndex + 1;
				else {
					if (plainStart < nextIndex) ret.push(new PlainTextNode(text.substring(plainStart, nextIndex)));
					ret.push(parsed);
					index = plainStart = endIndexObj.endPosition + 1;
				}
			}
			if (plainStart < text.length) ret.push(new PlainTextNode(text.substring(plainStart)));
			return ret;
		}
		Process(_parser, _data, node, _scope) {
			const text = node.Text;
			const ret = [];
			if (IndexOfAny(text, MarkdownTextProcessor.Tokens, 0) < 0) {
				ret.push(node);
				return ret;
			}
			const tracker = MarkdownTextProcessor.Tokens.map(() => 0);
			for (const token of MarkdownTextProcessor.ParseTokens(tracker, text)) ret.push(token);
			return ret;
		}
	};
	MarkdownTextProcessor.Tokens = Array.from("`*/_~");
	MarkdownTextProcessor.OpenTags = [
		"<code>",
		"<strong>",
		"<em>",
		"<span class=\"underline\">",
		"<span class=\"strikethrough\">"
	];
	MarkdownTextProcessor.CloseTags = [
		"</code>",
		"</strong>",
		"</em>",
		"</span>",
		"</span>"
	];
	MarkdownTextProcessor.StartBreakChars = Array.from("!^()+=[]{}\"'<>?,. 	\r\n");
	MarkdownTextProcessor.ExtraEndBreakChars = Array.from(":;");
	var NewLineProcessor = class {
		constructor() {
			this.Priority = 1;
		}
		ShouldProcess(node, _scope) {
			return node instanceof PlainTextNode && (node.Text.includes("\n") || node.Text.includes("<br>"));
		}
		Process(parser, data, node, _scope) {
			let text = node.Text;
			text = text.replace(/ *<br> */g, "\n");
			const ret = [];
			const lines = text.split("\n");
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				ret.push(new PlainTextNode(line));
				if (i < lines.length - 1) ret.push(new HtmlNode("<br/>", UnprocessablePlainTextNode.NewLine(), ""));
			}
			return ret;
		}
	};
	var SmileyDefinition = class {
		constructor(name, tokens) {
			this.Name = name;
			this.Tokens = tokens;
		}
		GetMatchingToken(text, startIndex) {
			for (const token of this.Tokens) if (text.indexOf(token, startIndex) == startIndex) {
				if (startIndex + token.length < text.length - 1 && text[startIndex + token.length].trim() != "") continue;
				return token;
			}
			return null;
		}
	};
	var SmiliesProcessor = class SmiliesProcessor {
		constructor(urlFormatString) {
			this.Priority = 5;
			this.UrlFormatString = urlFormatString;
			this._definitions = [];
			this._initialised = false;
		}
		ShouldProcess(node, _scope) {
			return node instanceof PlainTextNode && this._definitions.length > 0;
		}
		Process(_parser, _data, node, _scope) {
			if (!this._initialised) {
				this._tokenStarts = new Set(this._definitions.flatMap((x) => x.Tokens).map((x) => x[0]));
				this._initialised = true;
			}
			const ret = [];
			const text = node.Text;
			let start = 0;
			let index = -1;
			let numSmilies = 0;
			while (index + 1 < text.length && (index = IndexOfAny(text, this._tokenStarts, index + 1)) >= 0) {
				if (numSmilies > SmiliesProcessor.MaxSmilies) {
					ret.push(new HtmlNode("<em class=\"text-danger\">", new UnprocessablePlainTextNode(" [warning: too many smilies in post] "), "</em>"));
					break;
				}
				if (index != 0 && text[index - 1].trim() != "") continue;
				let definition = null;
				let token = null;
				for (const def of this._definitions) {
					token = def.GetMatchingToken(text, index);
					if (token == null) continue;
					definition = def;
					break;
				}
				if (definition == null) continue;
				if (index + token.length < text.length - 1 && text[index + token.length].trim() != "") continue;
				if (start < index) ret.push(new PlainTextNode(text.substring(start, index)));
				const node = new HtmlNode(`<img class="smiley" src="${HtmlHelper.AttributeEncode(Template(this.UrlFormatString, { 0: definition.Name }))}" alt="${HtmlHelper.AttributeEncode(token)}" />`, PlainTextNode.Empty(), "");
				node.PlainBefore = token;
				ret.push(node);
				start = index + token.length;
				index += token.length;
				numSmilies++;
			}
			if (start < text.length) ret.push(new PlainTextNode(text.substring(start)));
			return ret;
		}
		Add(name, ...tokens) {
			this._definitions.push(new SmileyDefinition(name, tokens));
			this._initialised = false;
			return this;
		}
		AddTwhl() {
			this.Add("aggrieved", ":aggrieved:");
			this.Add("aghast", ":aghast:");
			this.Add("angry", ":x", ":-x", ":angry:");
			this.Add("badass", ":badass:");
			this.Add("confused", ":confused:");
			this.Add("cry", ":cry:");
			this.Add("cyclops", ":cyclops:");
			this.Add("lol", ":lol:");
			this.Add("frown", ":|", ":-|", ":frown:");
			this.Add("furious", ":furious:");
			this.Add("glad", ":glad:");
			this.Add("heart", ":heart:");
			this.Add("grin", ":D", ":-D", ":grin:");
			this.Add("nervous", ":nervous:");
			this.Add("nuke", ":nuke:");
			this.Add("nuts", ":nuts:");
			this.Add("quizzical", ":quizzical:");
			this.Add("rollseyes", ":roll:", ":rollseyes:");
			this.Add("sad", ":(", ":-(", ":sad:");
			this.Add("smile", ":)", ":-)", ":smile:");
			this.Add("surprised", ":o", ":-o", ":surprised:");
			this.Add("thebox", ":thebox:");
			this.Add("thefinger", ":thefinger:");
			this.Add("tired", ":tired:");
			this.Add("tongue", ":P", ":-P", ":tongue:");
			this.Add("toocool", ":cool:");
			this.Add("unsure", ":\\", ":-\\", ":unsure:");
			this.Add("biggrin", ":biggrin:");
			this.Add("wink", ";)", ";-)", ":wink:");
			this.Add("zonked", ":zonked:");
			this.Add("sarcastic", ":sarcastic:");
			this.Add("combine", ":combine:", ":elite:");
			this.Add("gak", ":gak:");
			this.Add("animehappy", ":^_^:");
			this.Add("pwnt", ":pwned:");
			this.Add("target", ":target:");
			this.Add("ninja", ":ninja:");
			this.Add("hammer", ":hammer:");
			this.Add("pirate", ":pirate:", ":yar:");
			this.Add("walter", ":walter:");
			this.Add("plastered", ":plastered:");
			this.Add("bigmouth", ":zomg:");
			this.Add("brokenheart", ":heartbreak:");
			this.Add("ciggiesmilie", ":ciggie:");
			this.Add("combines", ":combines:");
			this.Add("crowbar", ":crowbar:");
			this.Add("death", ":death:");
			this.Add("freeman", ":freeman:");
			this.Add("hecu", ":hecu:");
			this.Add("nya", ":nya:");
			return this;
		}
		AddSnarkpit() {
			this.Add("icon_biggrin", ":D");
			this.Add("sailor", ":sailor:");
			this.Add("icon_smile", ":)", ":-)");
			this.Add("dorky", ":geek:");
			this.Add("sad0019", ":(");
			this.Add("icon_eek", ":-o");
			this.Add("grenade", ":grenade:");
			this.Add("confused", ":confused:");
			this.Add("icon_cool", "8-)");
			this.Add("kitty", ":k1tt3h:");
			this.Add("laughing", ":lol:");
			this.Add("leper", ":leper:");
			this.Add("mad", ":mad:");
			this.Add("tongue0010", ":p");
			this.Add("popcorn", ":popcorn:");
			this.Add("icon_redface", ":oops:");
			this.Add("icon_cry", ":cry:");
			this.Add("icon_twisted", ":evil:");
			this.Add("rolleye0011", ":roll:");
			this.Add("shocked", ":scream:");
			this.Add("icon_wink", ";)");
			this.Add("dead", ":dead:");
			this.Add("pimp", ":pimp:");
			this.Add("beerchug", ":beer:");
			this.Add("chainsaw", ":chainsaw:");
			this.Add("arse", ":moonie:");
			this.Add("angel", ":angel:");
			this.Add("bday", ":bday:");
			this.Add("clap", ":clap:");
			this.Add("computer", ":computer:");
			this.Add("crash", ":pccrash:");
			this.Add("dizzy", ":dizzy:");
			this.Add("dodgy", ":naughty:");
			this.Add("drink", ":drink:");
			this.Add("facelick", ":lick:");
			this.Add("frown", ">:(");
			this.Add("heee", ":hee:");
			this.Add("imwithstupid", ":imwithstupid:");
			this.Add("jawdrop", ":jawdrop:");
			this.Add("king", ":king:");
			this.Add("ladysman", ":ladysman:");
			this.Add("mrT", ":mrt:");
			this.Add("nurse", ":nurse:");
			this.Add("outtahere", ":outtahere:");
			this.Add("aaatrigger", ":aaatrigger:");
			this.Add("repuke", ":repuke:");
			this.Add("rofl", ":rofl:");
			this.Add("rolling", ":rolling2:");
			this.Add("santa", ":santa:");
			this.Add("smash", ":smash:");
			this.Add("toilet", ":toilet:");
			this.Add("44", "~o)");
			this.Add("wavey", ":wavey:");
			this.Add("upyours", ":stfu:");
			this.Add("fart", ":fart:");
			this.Add("trout", ":trout:");
			this.Add("ar15firing", ":machinegun:");
			this.Add("microwave", ":microwave:");
			this.Add("guillotine", ":guillotine:");
			this.Add("poke", ":poke:");
			this.Add("sniper", ":sniper:");
			this.Add("monkee", ":monkee:");
			this.Add("bandit", ":gringo:");
			this.Add("wtf", ":wtf:");
			this.Add("azelito", ":azelito:");
			this.Add("crate", ":crate:");
			this.Add("argh", ":-&");
			this.Add("swear", ":swear:");
			this.Add("rocketwhore", ":launcher:");
			this.Add("skull", ":skull:");
			this.Add("munky", ":munky:");
			this.Add("evilgrin", ":E");
			this.Add("banghead", ":brickwall:");
			this.Add("wcc", ":wcc:");
			this.Add("smiley_sherlock", ":sherlock:");
			this.Add("nag", ":nag:");
			this.Add("rolling_eyes", ":rolling:");
			this.Add("angryfire", ":flame:");
			this.Add("character", ":ghost:");
			this.Add("character0007", ":pirate:");
			this.Add("indifferent0016", ":zzz:");
			this.Add("indifferent0002", ":|");
			this.Add("love0012", ":love:");
			this.Add("rolleye0006", ":lookup:");
			this.Add("sad0006", ";(");
			this.Add("scared0005", ":scared:");
			this.Add("flail", ":flail:");
			this.Add("emot-cowjump", ":cowjump:");
			this.Add("emot-eng101", ":teach:");
			this.Add("uncertain", ":uncertain:");
			this.Add("1sm071potstir", ":stirring:");
			this.Add("thumbs_up", ":thumbsup:");
			this.Add("happy_open", ":happy:");
			this.Add("snark_topic_icon", ":snark:");
			return this;
		}
	};
	SmiliesProcessor.MaxSmilies = 100;
	var TrimWhitespaceAroundBlockNodesProcessor = class {
		constructor() {
			this.Priority = 20;
		}
		ShouldProcess(node, _scope) {
			return node instanceof NodeCollection;
		}
		Process(parser, data, node, scope) {
			const coll = node;
			const ret = [];
			let trimStart = false;
			for (let i = 0; i < coll.Nodes.length; i++) {
				let child = coll.Nodes[i];
				const next = i < coll.Nodes.length - 1 ? coll.Nodes[i + 1] : null;
				if (child instanceof PlainTextNode) {
					let text = child.Text;
					if (trimStart) text = text.trimStart();
					if (next instanceof HtmlNode && next.IsBlockNode) text = text.trimEnd();
					child.Text = text;
				}
				child = parser.RunProcessor(child, this, data, scope);
				if (child instanceof HtmlNode && child.IsBlockNode) {
					trimStart = true;
					ret.push(UnprocessablePlainTextNode.NewLine());
					ret.push(child);
					ret.push(UnprocessablePlainTextNode.NewLine());
				} else {
					trimStart = false;
					ret.push(child);
				}
			}
			return ret;
		}
	};
	var Tag = class {
		TagContext() {
			return this.IsBlock ? exports.TagParseContext.Block : exports.TagParseContext.Inline;
		}
		constructor(token = "", element = "", elementClass = null) {
			this.Priority = 0;
			this.Token = token;
			this.Element = element;
			this.ElementClass = elementClass;
			this.Options = [];
			this.Scopes = [];
		}
		InScope(scope) {
			return !scope || scope.trim() == "" || this.Scopes.includes(scope);
		}
		Matches(state, token, context) {
			return (token === null || token === void 0 ? void 0 : token.toLowerCase()) == this.Token && (context == exports.TagParseContext.Block || !this.IsBlock);
		}
		Parse(parser, data, state, scope, context) {
			const index = state.Index;
			const tokenLength = this.Token.length;
			state.Seek(tokenLength + 1, false);
			let optionsString = state.ScanTo("]").trim();
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const options = {};
			if (optionsString.length > 0) {
				if (optionsString[0] == "=" && this.AllOptionsInMain && this.MainOption != null) options[this.MainOption] = optionsString.substring(1);
				else {
					if (optionsString[0] == "=") optionsString = this.MainOption + optionsString;
					const myregexp = /(?=\s|^)\s*([^ ]+?)=([^\s]*)(?=\s|$)(?!=)/gim;
					let m = myregexp.exec(optionsString);
					while (m != null) {
						const name = m[1].trim();
						options[name] = m[2].trim();
						m = myregexp.exec(optionsString);
					}
				}
			}
			if (this.IsNested) {
				let stack = 1;
				let text = "";
				while (!state.Done) {
					text += state.ScanTo("[");
					const tok = state.GetToken();
					if (tok.toLowerCase() == this.Token.toLowerCase()) stack++;
					if (tok.toLowerCase() == "/" + this.Token.toLowerCase() && state.Peek(tokenLength + 3).trim() == "[/" + this.Token.toLowerCase() + "]") stack--;
					if (stack == 0) {
						state.Seek(this.Token.length + 3, false);
						if (!this.Validate(options, text)) break;
						return this.FormatResult(parser, data, state, scope, options, text);
					}
					text += state.Next();
				}
				state.Seek(index, true);
				return null;
			} else {
				const text = state.ScanTo("[/" + this.Token + "]", true);
				if (state.Peek(tokenLength + 3).trim() == "[/" + this.Token.toLowerCase() + "]" && this.Validate(options, text)) {
					state.Seek(this.Token.length + 3, false);
					return this.FormatResult(parser, data, state, scope, options, text);
				} else {
					state.Seek(index, true);
					return null;
				}
			}
		}
		Validate(options, text) {
			return true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			before += ">";
			const after = "</" + this.Element + ">";
			const content = parser.ParseTags(data, text, scope, this.TagContext());
			const ret = new HtmlNode(before, content, after);
			ret.IsBlockNode = this.IsBlock;
			return ret;
		}
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
	};
	var AlignTag = class AlignTag extends Tag {
		constructor() {
			super();
			this.Token = "align";
			this.Element = "div";
			this.MainOption = "align";
			this.Options = ["align"];
			this.AllOptionsInMain = true;
			this.IsBlock = true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			let cls = (this.ElementClass || "") + " ";
			if (options["align"] && AlignTag.IsValidAlign(options["align"])) cls += "text-" + AlignTag.ConvertAlign(options["align"]);
			before += " class=\"" + cls.trim() + "\">";
			const content = parser.ParseTags(data, text, scope, this.TagContext());
			const after = "</" + this.Element + ">";
			const ret = new HtmlNode(before, content, after);
			ret.IsBlockNode = true;
			return ret;
		}
		static IsValidAlign(text) {
			return text == "left" || text == "right" || text == "center";
		}
		static ConvertAlign(text) {
			if (text == "left") return "start";
			if (text == "right") return "end";
			return "center";
		}
	};
	var CodeTag = class extends Tag {
		constructor() {
			super();
			this.Token = "code";
			this.Element = "code";
		}
		FormatResult(_parser, _data, _state, _scope, _options, text) {
			return new HtmlNode("<code>", new UnprocessablePlainTextNode(text), "</code>");
		}
	};
	var ColorTag = class extends Tag {
		constructor() {
			super();
			this.Token = "color";
			this.Element = "span";
			this.MainOption = "color";
			this.Options = ["color"];
			this.AllOptionsInMain = true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			if (options["color"] || options["colour"]) {
				before += " style=\"";
				if (options["color"] && Colours.IsValidColor(options["color"])) before += "color: " + options["color"] + "; ";
				else if (options["colour"] && Colours.IsValidColor(options["colour"])) before += "color: " + options["colour"] + "; ";
				before = before.trimEnd() + "\"";
			}
			before += ">";
			const content = parser.ParseTags(data, text, scope, this.TagContext());
			const after = "</" + this.Element + ">";
			return new HtmlNode(before, content, after);
		}
	};
	var FontTag = class FontTag extends Tag {
		constructor() {
			super();
			this.Token = "font";
			this.Element = "span";
			this.MainOption = "color";
			this.Options = [
				"color",
				"colour",
				"size"
			];
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			if (options["color"] || options["colour"] || options["size"]) {
				before += " style=\"";
				if (options["color"] && Colours.IsValidColor(options["color"])) before += "color: " + options["color"] + "; ";
				else if (options["colour"] && Colours.IsValidColor(options["colour"])) before += "color: " + options["colour"] + "; ";
				if (options["size"] && FontTag.IsValidSize(options["size"])) before += "font-size: " + options["size"] + "px; ";
				before = before.trimEnd() + "\"";
			}
			before += ">";
			const content = parser.ParseTags(data, text, scope, this.TagContext());
			const after = "</" + this.Element + ">";
			return new HtmlNode(before, content, after);
		}
		static IsValidSize(text) {
			var _a;
			const num = (_a = parseInt(text, 10)) !== null && _a !== void 0 ? _a : 0;
			return num >= 6 && num <= 40;
		}
	};
	var ImageTag = class ImageTag extends Tag {
		constructor() {
			super();
			this.Token = "img";
			this.Element = "div";
			this.MainOption = "url";
			this.Options = ["url"];
			this.IsBlock = true;
		}
		FormatResult(_parser, _data, state, _scope, options, text) {
			const url = HtmlHelper.AttributeEncode(ImageTag.BuildUrl(options, text));
			const classes = ["embedded", "image"];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			let element = this.Element;
			if (!this.IsBlock) {
				element = "span";
				classes.push("inline");
			} else state.SkipWhitespace();
			const before = `<${element} class="${classes.join(" ")}"><span class="caption-panel"><img class="caption-body" src="${url}" alt="User posted image" />`;
			const after = `</span></${element}>`;
			const plainsp = element == "div" ? "\n" : "";
			const ret = new HtmlNode(before, PlainTextNode.Empty(), after);
			ret.PlainBefore = `${plainsp}[User posted image]${plainsp}`;
			ret.IsBlockNode = element == "div";
			return ret;
		}
		Validate(options, text) {
			const url = ImageTag.BuildUrl(options, text);
			return HtmlHelper.ValidateUrl(url) && url.match(/^[^\]"\n ]+$/i) != null;
		}
		static BuildUrl(options, text) {
			let url = text;
			if (options["url"]) url = options["url"];
			url = HtmlHelper.StripControlCharacters(url);
			if (HtmlHelper.GetUrlScheme(url) == null) url = "http://" + url;
			return url;
		}
	};
	var LinkTag = class extends Tag {
		constructor() {
			super();
			this.Token = "url";
			this.Element = "a";
			this.MainOption = "url";
			this.Options = ["url"];
		}
		FormatResult(parser, data, state, scope, options, text) {
			const url = HtmlHelper.AttributeEncode(this.BuildUrl(options, text));
			const classes = [];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			const before = `<${this.Element} ` + (classes.length > 0 ? `class="${classes.join(" ")}" ` : "") + `href="${url}">`;
			const after = `</${this.Element}>`;
			return new HtmlNode(before, options["url"] ? parser.ParseTags(data, text, scope, this.TagContext()) : new UnprocessablePlainTextNode(text), after);
		}
		Validate(options, text) {
			const url = this.BuildUrl(options, text);
			return HtmlHelper.ValidateUrl(url) && url.match(/^[^\]"\n ]+$/i) != null;
		}
		BuildUrl(options, text) {
			let url = text;
			if (options["url"]) url = options["url"];
			url = HtmlHelper.StripControlCharacters(url);
			if (this.Token == "email") url = "mailto:" + url;
			else if (HtmlHelper.GetUrlScheme(url) == null) url = "http://" + url;
			return url;
		}
	};
	var ListTag = class extends Tag {
		constructor() {
			super();
			this.Token = "list";
			this.Element = "ul";
			this.IsBlock = true;
		}
		Validate(options, text) {
			const items = text.split("[*]").map((x) => x.trim()).filter((x) => (x === null || x === void 0 ? void 0 : x.length) > 0);
			return super.Validate(options, text) && items.length > 0;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			before += ">\n";
			const content = new NodeCollection();
			const items = text.split("[*]").map((x) => x.trim()).filter((x) => (x === null || x === void 0 ? void 0 : x.length) > 0);
			for (const item of items) {
				const node = new HtmlNode("<li>", parser.ParseTags(data, item, scope, this.TagContext()), "</li>\n");
				node.PlainBefore = "* ";
				node.PlainAfter = "\n";
				content.Nodes.push(node);
			}
			const after = "</" + this.Element + ">";
			const ret = new HtmlNode(before, content, after);
			ret.IsBlockNode = true;
			return ret;
		}
	};
	var PreTag = class extends Tag {
		constructor() {
			super();
			this.Token = "pre";
			this.Element = "pre";
			this.IsBlock = true;
		}
		FormatResult(_parser, _data, _state, _scope, _options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			before += "><code>";
			const after = "</code></" + this.Element + ">";
			let arr = text.split("\n");
			for (let i = 0; i < 2; i++) {
				while (arr.length > 0 && arr[0].trim() == "") arr.splice(0, 1);
				arr.reverse();
			}
			arr = PreElement.FixCodeIndentation(arr);
			text = arr.join("\n");
			const ret = new HtmlNode(before, new UnprocessablePlainTextNode(text), after);
			ret.IsBlockNode = true;
			return ret;
		}
	};
	var QuickLinkTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "a";
			this.MainOption = "url";
			this.Options = ["url"];
		}
		Matches(state, _token, _context) {
			let pt = state.PeekTo("]");
			if (!pt || pt == "") return false;
			pt = pt.substring(1);
			return pt.length > 0 && !pt.includes("\n") && pt.match(/^([a-z]{2,10}:\/\/[^\]]*?)(?:\|([^\]]*?))?/i) != null;
		}
		Parse(_parser, _data, state, _scope, _context) {
			var _a, _b;
			const index = state.Index;
			if (state.Next() != "[") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const match = str.match(/^([a-z]{2,10}:\/\/[^\]]*?)(?:\|([^\]]*?))?$/i);
			if (!match) {
				state.Seek(index, true);
				return null;
			}
			let url = HtmlHelper.StripControlCharacters(match[1]);
			const text = ((_a = match[2]) === null || _a === void 0 ? void 0 : _a.length) > 0 ? match[2] : url;
			const options = { url };
			if (!this.Validate(options, text)) {
				state.Seek(index, true);
				return null;
			}
			url = HtmlHelper.AttributeEncode(url);
			const before = `<${this.Element} href="${url}">`;
			const after = `</${this.Element}>`;
			const ret = new HtmlNode(before, new UnprocessablePlainTextNode(text), after);
			ret.PlainAfter = ((_b = match[2]) === null || _b === void 0 ? void 0 : _b.length) > 0 ? ` (${url})` : "";
			return ret;
		}
		Validate(options, text) {
			let url = text;
			if (options["url"]) url = options["url"];
			url = HtmlHelper.StripControlCharacters(url);
			return HtmlHelper.ValidateUrl(url) && url.match(/^[^\]"\n ]+$/i) != null;
		}
	};
	var SizeTag = class extends Tag {
		constructor() {
			super();
			this.Token = "size";
			this.Element = "span";
			this.MainOption = "size";
			this.Options = ["size"];
			this.AllOptionsInMain = true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			if (options["size"]) {
				before += " style=\"";
				if (options["size"] && FontTag.IsValidSize(options["size"])) before += "font-size: " + options["size"] + "px; ";
				before = before.trimEnd() + "\"";
			}
			before += ">";
			const content = parser.ParseTags(data, text, scope, this.TagContext());
			const after = "</" + this.Element + ">";
			return new HtmlNode(before, content, after);
		}
	};
	var SpoilerNode = class {
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
			if (i != 0) throw new Error("Argument out of range");
			this.SpoilerContent = node;
		}
		HasContent() {
			return true;
		}
	};
	var SpoilerTag = class extends Tag {
		constructor() {
			super();
			this.Token = "spoiler";
			this.Element = "span";
			this.ElementClass = "spoiler";
			this.MainOption = "text";
			this.Options = ["text"];
			this.AllOptionsInMain = true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let visibleText = "Spoiler";
			if (options["text"] && options["text"].length > 0) visibleText = options["text"];
			let before = `<${this.Element}`;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			before += ` title="${visibleText}">`;
			const after = `</${this.Element}>`;
			return new HtmlNode(before, new SpoilerNode(visibleText, parser.ParseTags(data, text, scope, this.TagContext())), after);
		}
	};
	var VaultEmbedTag = class extends Tag {
		constructor() {
			super();
			this.Element = "div";
			this.MainOption = "id";
			this.Options = ["id"];
		}
		Matches(state, _token, context) {
			const peekTag = state.Peek(7);
			const pt = state.PeekTo("]");
			return context == exports.TagParseContext.Block && peekTag == "[vault:" && (pt === null || pt === void 0 ? void 0 : pt.length) > 7 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.ScanTo(":") != "[vault" || state.Next() != ":") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const id = parseInt(str, 10);
			if (!id) {
				state.Seek(index, true);
				return null;
			}
			const classes = ["embedded", "vault"];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			state.SkipWhitespace();
			const ret = new HtmlNode(`<div class="${classes.join(" ")}"><div class="embed-container"><div class="embed-content"><div class="uninitialised" data-embed-type="vault" data-vault-id="${id}">Loading embedded content: Vault Item #${id}`, PlainTextNode.Empty(), "</div></div></div></div>");
			ret.PlainBefore = `[TWHL vault item #${id}]`;
			ret.PlainAfter = "\n";
			ret.IsBlockNode = true;
			return ret;
		}
	};
	var WikiRevisionCredit = class {};
	WikiRevisionCredit.TypeCredit = "c";
	WikiRevisionCredit.TypeArchive = "a";
	WikiRevisionCredit.TypeFull = "f";
	var WikiArchiveTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "";
		}
		Matches(state, _token, _context) {
			const peekTag = state.Peek(9);
			const pt = state.PeekTo("]");
			return peekTag == "[archive:" && pt != null && pt.length > 9 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.Next() != "[") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const credit = new WikiRevisionCredit();
			credit.Type = WikiRevisionCredit.TypeArchive;
			const sections = str.split("|");
			for (const section of sections) {
				const spl = section.split(":");
				const key = spl[0];
				const val = spl.length > 1 ? spl.slice(1).join(":") : "";
				switch (key) {
					case "archive":
						credit.Name = val;
						break;
					case "description":
						credit.Description = val;
						break;
					case "url":
						credit.Url = val;
						break;
					case "wayback":
						credit.WaybackUrl = val;
						break;
					case "full": credit.Type = WikiRevisionCredit.TypeFull;
				}
			}
			if (credit.WaybackUrl != null && credit.Url != null && !credit.WaybackUrl.startsWith("http://") && !credit.WaybackUrl.startsWith("https://") && parseInt(credit.WaybackUrl, 10)) credit.WaybackUrl = `https://web.archive.org/web/${credit.WaybackUrl}/${credit.Url}`;
			state.SkipWhitespace();
			return new MetadataNode("WikiCredit", credit);
		}
	};
	var WikiRevisionBook = class {};
	var WikiBookTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "";
		}
		Matches(state, _token, _context) {
			const peekTag = state.Peek(6);
			const pt = state.PeekTo("]");
			return peekTag == "[book:" && pt != null && pt.length > 6 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.Next() != "[") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const book = new WikiRevisionBook();
			const sections = str.split("|");
			for (const section of sections) {
				const spl = section.split(":");
				const key = spl[0];
				const val = spl.length > 1 ? spl.slice(1).join(":") : "";
				switch (key) {
					case "book":
						book.BookName = val;
						break;
					case "chapter":
						book.ChapterName = val;
						break;
					case "chapternumber":
						book.ChapterNumber = parseInt(val, 10) || null;
						break;
					case "pagenumber": book.PageNumber = parseInt(val, 10) || null;
				}
			}
			state.SkipWhitespace();
			return new MetadataNode("WikiBook", book);
		}
	};
	var WikiCategoryTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "";
		}
		Matches(state, _token, _context) {
			const peekTag = state.Peek(5);
			const pt = state.PeekTo("]");
			return peekTag == "[cat:" && pt != null && pt.length > 5 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.ScanTo(":") != "[cat" || state.Next() != ":") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			state.SkipWhitespace();
			return new MetadataNode("WikiCategory", str.trim());
		}
	};
	var WikiCreditTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "";
		}
		Matches(state, _token, _context) {
			const peekTag = state.Peek(8);
			const pt = state.PeekTo("]");
			return peekTag == "[credit:" && pt != null && pt.length > 8 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.Next() != "[") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const credit = new WikiRevisionCredit();
			credit.Type = WikiRevisionCredit.TypeCredit;
			const sections = str.split("|");
			for (const section of sections) {
				const spl = section.split(":");
				const key = spl[0];
				const val = spl.length > 1 ? spl.slice(1).join(":") : "";
				switch (key) {
					case "credit":
						credit.Description = val;
						break;
					case "user":
						credit.UserID = parseInt(val, 10) || null;
						break;
					case "name":
						credit.Name = val;
						break;
					case "url": credit.Url = val;
				}
			}
			state.SkipWhitespace();
			return new MetadataNode("WikiCredit", credit);
		}
	};
	var WikiRevision = class {
		static CreateSlug(text) {
			text = text.replace(/ /gi, "_");
			text = text.replace(/[^-$_.+!*'"(),:;<>^{}|~0-9a-z[\]]/gi, "");
			return text;
		}
	};
	var WikiFileTag = class WikiFileTag extends Tag {
		constructor() {
			super();
		}
		static GetTag(state) {
			const peekTag = state.Peek(6);
			const pt = state.PeekTo("]");
			if (peekTag == "[file:" && (pt === null || pt === void 0 ? void 0 : pt.length) > 6 && !pt.includes("\n")) return "file";
			return null;
		}
		Matches(state, _token, _context) {
			return WikiFileTag.GetTag(state) != null;
		}
		Parse(_parser, _data, state, _scope, _context) {
			var _a;
			const index = state.Index;
			const tag = WikiFileTag.GetTag(state);
			if (state.ScanTo(":") != `[${tag}` || state.Next() != ":") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
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
			const slug = WikiRevision.CreateSlug(page);
			const url = HtmlHelper.AttributeEncode(`https://twhl.info/wiki/embed/${slug}`);
			const before = `<span class="embedded-inline download" data-info="${HtmlHelper.AttributeEncode(`https://twhl.info/wiki/embed-info/${slug}`)}"><a href="${url}"><span class="fa fa-download"></span> `;
			const after = "</a></span>";
			const content = new NodeCollection();
			content.Nodes.push(new MetadataNode("WikiUpload", page));
			content.Nodes.push(new PlainTextNode(text));
			return new HtmlNode(before, content, after);
		}
	};
	var WikiImageTag = class WikiImageTag extends Tag {
		constructor() {
			super();
			this.TwhlBehaviour = false;
			this.Token = null;
			this.Element = "img";
		}
		static GetTag(state) {
			for (const tag of this.Tags) {
				const peekTag = state.Peek(2 + tag.length);
				const pt = state.PeekTo("]");
				if (peekTag == `[${tag}:` && (pt === null || pt === void 0 ? void 0 : pt.length) > 2 + tag.length && !pt.includes("\n")) return tag;
			}
			return null;
		}
		Matches(state, _token, _context) {
			return WikiImageTag.GetTag(state) != null;
		}
		Parse(_parser, _data, state, _scope, context) {
			const index = state.Index;
			const tag = WikiImageTag.GetTag(state);
			if (state.ScanTo(":") != `[${tag}` || state.Next() != ":") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const match = str.match(/^([^|\]]*?)(?:\|([^\]]*?))?$/i);
			if (!match) {
				state.Seek(index, true);
				return null;
			}
			const content = new NodeCollection();
			const image = match[1];
			const params = match[2] ? match[2].trim().split("|") : [];
			let src = image;
			if (!image.includes("/")) {
				if (this.TwhlBehaviour) {
					content.Nodes.push(new MetadataNode("WikiUpload", image));
					src = `https://twhl.info/wiki/embed/${WikiRevision.CreateSlug(image)}`;
				} else {
					state.Seek(index, true);
					return null;
				}
			} else {
				src = HtmlHelper.StripControlCharacters(src);
				if (!HtmlHelper.ValidateUrl(src)) {
					state.Seek(index, true);
					return null;
				}
			}
			let url = null;
			let caption = null;
			let loop = false;
			const classes = ["embedded", "image"];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			for (const p of params) {
				const l = p.toLowerCase();
				if (WikiImageTag.IsClass(l)) classes.push(l);
				else if (l == "loop") loop = true;
				else if (l.length > 4 && l.substring(0, 4) == "url:") url = p.substring(4).trim();
				else caption = p.trim();
			}
			if (!caption || caption.trim() == "") caption = null;
			if (url != null) url = HtmlHelper.StripControlCharacters(url);
			if (tag == "img" && url != null && HtmlHelper.ValidateUrl(url)) {
				if (this.TwhlBehaviour && HtmlHelper.GetUrlScheme(url) == null) {
					content.Nodes.push(new MetadataNode("WikiLink", url));
					url = `https://twhl.info/wiki/page/${WikiRevision.CreateSlug(url)}`;
				}
			} else url = "";
			let el = "span";
			if (context == exports.TagParseContext.Inline && !classes.includes("inline")) classes.push("inline");
			if (!classes.includes("inline")) {
				state.SkipWhitespace();
				el = "div";
			}
			const embed = WikiImageTag.GetEmbedObject(tag, src, caption, loop);
			if (embed != null) content.Nodes.push(embed);
			if (caption != null) {
				const cn = new HtmlNode("<span class=\"caption\">", new PlainTextNode(caption), "</span>");
				cn.PlainBefore = " ";
				content.Nodes.push(cn);
			}
			const ret = new HtmlNode(`<${el} class="${classes.join(" ")}"` + ((caption === null || caption === void 0 ? void 0 : caption.length) > 0 ? ` title="${HtmlHelper.AttributeEncode(caption)}"` : "") + ">" + (url.length > 0 ? "<a href=\"" + HtmlHelper.AttributeEncode(url) + "\">" : "") + "<span class=\"caption-panel\">", content, "</span>" + (url.length > 0 ? "</a>" : "") + `</${el}>`);
			ret.IsBlockNode = el == "div";
			return ret;
		}
		static GetEmbedObject(tag, url, caption, loop) {
			url = HtmlHelper.AttributeEncode(url);
			switch (tag) {
				case "img": {
					caption = caption !== null && caption !== void 0 ? caption : "User posted image";
					const cap = HtmlHelper.AttributeEncode(caption);
					const ret = new HtmlNode(`<img class="caption-body" src="${url}" alt="${cap}" />`, PlainTextNode.Empty(), "");
					ret.PlainBefore = "[Image]";
					return ret;
				}
				case "video":
				case "audio": {
					let auto = "";
					if (loop) auto = "autoplay loop muted";
					const ret = new HtmlNode(`<${tag} class="caption-body" src="${url}" playsinline controls ${auto}>Your browser doesn't support embedded ${tag}.</${tag}>`, PlainTextNode.Empty(), "");
					ret.PlainBefore = tag.substring(0, 1).toUpperCase() + tag.substring(1);
					return ret;
				}
			}
			return null;
		}
		static IsClass(param) {
			return WikiImageTag.ValidClasses.includes(param);
		}
	};
	WikiImageTag.Tags = [
		"img",
		"video",
		"audio"
	];
	WikiImageTag.ValidClasses = [
		"large",
		"medium",
		"small",
		"thumb",
		"left",
		"right",
		"center",
		"inline"
	];
	var WikiLinkTag = class extends Tag {
		constructor() {
			super();
			this.Token = null;
		}
		Matches(state, _token, _context) {
			const pt = state.PeekTo("]]");
			return (pt === null || pt === void 0 ? void 0 : pt.length) > 1 && pt[1] == "[" && !pt.includes("\n") && pt.substring(2).match(/([^\]]*?)(?:\|([^\]]*?))?/i) != null;
		}
		Parse(_parser, _data, state, _scope, _context) {
			const index = state.Index;
			if (state.Next() != "[" || state.Next() != "[") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]]");
			if (state.Next() != "]" || state.Next() != "]") {
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
			let hash = "";
			if (page.includes("#")) {
				const spl = page.split("#");
				page = spl[0];
				hash = "#" + (spl.length > 1 ? spl.slice(1).join("#") : "").replace(/[^\da-z?/:@\-._~!$&'()*+,;=]/gi, "_");
			}
			const before = `<a href="${HtmlHelper.AttributeEncode(`https://twhl.info/wiki/page/${WikiRevision.CreateSlug(page)}`) + hash}">`;
			const after = "</a>";
			const content = new NodeCollection();
			content.Nodes.push(new MetadataNode("WikiLink", page));
			content.Nodes.push(new PlainTextNode(text));
			return new HtmlNode(before, content, after);
		}
	};
	var WikiYoutubeTag = class WikiYoutubeTag extends Tag {
		constructor() {
			super();
			this.Token = null;
			this.Element = "div";
			this.MainOption = "id";
			this.Options = ["id"];
		}
		Matches(state, _token, context) {
			const peekTag = state.Peek(9);
			const pt = state.PeekTo("]");
			return context == exports.TagParseContext.Block && peekTag == "[youtube:" && pt != null && pt.length > 9 && !pt.includes("\n");
		}
		Parse(_parser, _data, state, _scope, _context) {
			var _a, _b;
			const index = state.Index;
			if (state.ScanTo(":") != "[youtube" || state.Next() != ":") {
				state.Seek(index, true);
				return null;
			}
			const str = state.ScanTo("]");
			if (state.Next() != "]") {
				state.Seek(index, true);
				return null;
			}
			const regs = str.match(/^([^|\]]*?)(?:\|([^\]]*?))?$/i);
			if (!regs) {
				state.Seek(index, true);
				return null;
			}
			const id = regs[1];
			const params = (_b = (_a = regs[2]) === null || _a === void 0 ? void 0 : _a.trim().split("|")) !== null && _b !== void 0 ? _b : [];
			if (!WikiYoutubeTag.ValidateID(id)) {
				state.Seek(index, true);
				return null;
			}
			state.SkipWhitespace();
			let caption = null;
			const classes = ["embedded", "video"];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			for (const p of params) {
				const l = p.toLowerCase();
				if (WikiYoutubeTag.IsClass(l)) classes.push(l);
				else caption = p.trim();
			}
			if (!caption || caption.trim() == "") caption = null;
			const captionNode = new HtmlNode(caption != null ? "<span class=\"caption\">" : "", new PlainTextNode(caption !== null && caption !== void 0 ? caption : ""), caption != null ? "</span>" : "");
			captionNode.PlainBefore = "[YouTube video] ";
			captionNode.PlainAfter = "\n";
			const ret = new HtmlNode(`<div class="${classes.join(" ")}"><div class="caption-panel"><div class="video-container caption-body"><div class="video-content"><div class="uninitialised" data-youtube-id="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"></div></div></div>`, captionNode, "</div></div>");
			ret.IsBlockNode = true;
			return ret;
		}
		static ValidateID(id) {
			return id.match(/^[a-zA-Z0-9_-]{6,11}$/i) != null;
		}
		static IsClass(param) {
			return WikiYoutubeTag.ValidClasses.includes(param);
		}
	};
	WikiYoutubeTag.ValidClasses = [
		"large",
		"medium",
		"small",
		"left",
		"right",
		"center"
	];
	var YoutubeTag = class extends Tag {
		constructor() {
			super();
			this.Token = "youtube";
			this.Element = "div";
			this.MainOption = "id";
			this.Options = ["id"];
		}
		FormatResult(parser, data, state, scope, options, text) {
			let id = text;
			if (options["id"]) id = options["id"];
			const classes = ["embedded", "video"];
			if (this.ElementClass != null) classes.push(this.ElementClass);
			const captionNode = new HtmlNode("", PlainTextNode.Empty(), "");
			captionNode.PlainBefore = "[YouTube video] ";
			captionNode.PlainAfter = "\n";
			const ret = new HtmlNode(`<div class="${classes.join(" ")}"> <div class="caption-panel">  <div class="video-container caption-body">   <div class="video-content">    <div class="uninitialised" data-youtube-id="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"></div>   </div>  </div>`, captionNode, "</div></div>");
			ret.IsBlockNode = true;
			return ret;
		}
		Validate(options, text) {
			let url = text;
			if (options["id"]) url = options["id"];
			return url.match(/^[a-zA-Z0-9_-]{6,11}$/i) != null;
		}
	};
	var ParserConfiguration = class ParserConfiguration {
		static Twhl() {
			const conf = new ParserConfiguration();
			conf.Tags.push(new Tag("b", "strong").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("i", "em").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("u", "span", "underline").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("s", "span", "strikethrough").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("green", "span", "green").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("blue", "span", "blue").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("red", "span", "red").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("purple", "span", "purple").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("yellow", "span", "yellow").WithScopes("inline", "excerpt"));
			conf.Tags.push(new PreTag());
			conf.Tags.push(new Tag("h", "h3").WithBlock(true));
			conf.Tags.push(new LinkTag().WithScopes("excerpt"));
			conf.Tags.push(new LinkTag().WithScopes("excerpt").WithToken("email"));
			conf.Tags.push(new QuickLinkTag());
			conf.Tags.push(new WikiLinkTag());
			conf.Tags.push(new WikiFileTag());
			conf.Tags.push(new ImageTag());
			conf.Tags.push(new ImageTag().WithToken("simg").WithBlock(false));
			const wikiImageTag = new WikiImageTag();
			wikiImageTag.TwhlBehaviour = true;
			conf.Tags.push(wikiImageTag);
			conf.Tags.push(new YoutubeTag());
			conf.Tags.push(new WikiYoutubeTag());
			conf.Tags.push(new VaultEmbedTag());
			conf.Tags.push(new FontTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new WikiCategoryTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new WikiBookTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new WikiCreditTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new WikiArchiveTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new SpoilerTag().WithScopes("inline", "excerpt"));
			conf.Tags.push(new CodeTag().WithScopes("excerpt"));
			conf.Elements.push(new MdCodeElement());
			conf.Elements.push(new PreElement());
			conf.Elements.push(new MdHeadingElement());
			conf.Elements.push(new MdLineElement());
			conf.Elements.push(new MdQuoteElement());
			conf.Elements.push(new MdListElement());
			conf.Elements.push(new MdTableElement());
			conf.Elements.push(new MdPanelElement());
			conf.Elements.push(new MdColumnsElement());
			conf.Elements.push(new RefElement());
			conf.Elements.push(new QuoteElement());
			conf.Processors.push(new MarkdownTextProcessor());
			conf.Processors.push(new AutoLinkingProcessor());
			conf.Processors.push(new SmiliesProcessor("https://twhl.info/images/smilies/{0}.png").AddTwhl());
			conf.Processors.push(new TrimWhitespaceAroundBlockNodesProcessor());
			conf.Processors.push(new NewLineProcessor());
			return conf;
		}
		static Snarkpit() {
			const conf = new ParserConfiguration();
			conf.Tags.push(new Tag("b", "strong").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("i", "em").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("u", "span", "underline").WithScopes("inline", "excerpt"));
			conf.Tags.push(new Tag("s", "span", "strikethrough").WithScopes("inline", "excerpt"));
			conf.Tags.push(new PreTag());
			conf.Tags.push(new Tag("center", "div", "text-center").WithBlock(true));
			conf.Tags.push(new AlignTag());
			conf.Tags.push(new ListTag());
			conf.Tags.push(new LinkTag().WithScopes("excerpt"));
			conf.Tags.push(new LinkTag().WithScopes("excerpt").WithToken("email"));
			conf.Tags.push(new QuickLinkTag());
			conf.Tags.push(new ImageTag());
			conf.Tags.push(new ImageTag().WithToken("simg").WithBlock(false));
			conf.Tags.push(new WikiImageTag());
			conf.Tags.push(new YoutubeTag());
			conf.Tags.push(new WikiYoutubeTag());
			conf.Tags.push(new ColorTag());
			conf.Tags.push(new SizeTag());
			conf.Tags.push(new SpoilerTag().WithScopes("inline", "excerpt"));
			conf.Elements.push(new MdCodeElement());
			const preElement = new PreElement();
			preElement.Token = "code";
			conf.Elements.push(preElement);
			conf.Elements.push(new MdHeadingElement());
			conf.Elements.push(new MdLineElement());
			conf.Elements.push(new MdQuoteElement());
			conf.Elements.push(new MdListElement());
			conf.Elements.push(new MdTableElement());
			conf.Elements.push(new MdPanelElement());
			conf.Elements.push(new MdColumnsElement());
			conf.Elements.push(new RefElement());
			conf.Elements.push(new QuoteElement());
			conf.Processors.push(new MarkdownTextProcessor());
			conf.Processors.push(new AutoLinkingProcessor());
			conf.Processors.push(new SmiliesProcessor("https://snarkpit.net/images/smilies/{0}.gif").AddSnarkpit());
			conf.Processors.push(new TrimWhitespaceAroundBlockNodesProcessor());
			conf.Processors.push(new NewLineProcessor());
			return conf;
		}
		constructor() {
			this.Elements = [];
			this.Tags = [];
			this.Processors = [];
		}
	};
	var QuoteTag = class extends Tag {
		constructor() {
			super();
			this.Token = "quote";
			this.Element = "blockquote";
			this.MainOption = "name";
			this.Options = ["name"];
			this.AllOptionsInMain = true;
			this.IsBlock = true;
			this.IsNested = true;
		}
		FormatResult(parser, data, state, scope, options, text) {
			let before = "<" + this.Element;
			if (this.ElementClass != null) before += " class=\"" + this.ElementClass + "\"";
			before += ">";
			if (options["name"]) before += "<strong class=\"quote-name\">" + options["name"] + " said:</strong><br/>";
			const after = "</" + this.Element + ">";
			const content = parser.ParseTags(data, text === null || text === void 0 ? void 0 : text.trim(), scope, this.TagContext());
			const ret = new HtmlNode(before, content, after);
			ret.PlainBefore = (options["name"] ? options["name"] + " said: " : "") + "[quote]\n";
			ret.PlainAfter = "\n[/quote]";
			ret.IsBlockNode = this.IsBlock;
			return ret;
		}
	};
	exports.AlignTag = AlignTag;
	exports.AutoLinkingProcessor = AutoLinkingProcessor;
	exports.CodeTag = CodeTag;
	exports.ColorTag = ColorTag;
	exports.Colours = Colours;
	exports.Element = Element;
	exports.FontTag = FontTag;
	exports.HtmlHelper = HtmlHelper;
	exports.HtmlNode = HtmlNode;
	exports.ImageTag = ImageTag;
	exports.Lines = Lines;
	exports.LinkTag = LinkTag;
	exports.ListTag = ListTag;
	exports.MarkdownTextProcessor = MarkdownTextProcessor;
	exports.MdCodeElement = MdCodeElement;
	exports.MdColumnsElement = MdColumnsElement;
	exports.MdHeadingElement = MdHeadingElement;
	exports.MdLineElement = MdLineElement;
	exports.MdListElement = MdListElement;
	exports.MdPanelElement = MdPanelElement;
	exports.MdQuoteElement = MdQuoteElement;
	exports.MdTableElement = MdTableElement;
	exports.MetadataNode = MetadataNode;
	exports.NewLineProcessor = NewLineProcessor;
	exports.NodeCollection = NodeCollection;
	exports.NodeExtensions = NodeExtensions;
	exports.ParseData = ParseData;
	exports.ParseResult = ParseResult;
	exports.Parser = Parser;
	exports.ParserConfiguration = ParserConfiguration;
	exports.PlainTextNode = PlainTextNode;
	exports.PreElement = PreElement;
	exports.PreTag = PreTag;
	exports.QuickLinkTag = QuickLinkTag;
	exports.QuoteElement = QuoteElement;
	exports.QuoteTag = QuoteTag;
	exports.RefElement = RefElement;
	exports.RefNode = RefNode;
	exports.RemovedNode = RemovedNode;
	exports.SizeTag = SizeTag;
	exports.SmiliesProcessor = SmiliesProcessor;
	exports.SpoilerTag = SpoilerTag;
	exports.State = State;
	exports.Tag = Tag;
	exports.TrimWhitespaceAroundBlockNodesProcessor = TrimWhitespaceAroundBlockNodesProcessor;
	exports.UnprocessablePlainTextNode = UnprocessablePlainTextNode;
	exports.Util = Util;
	exports.VaultEmbedTag = VaultEmbedTag;
	exports.WikiArchiveTag = WikiArchiveTag;
	exports.WikiBookTag = WikiBookTag;
	exports.WikiCategoryTag = WikiCategoryTag;
	exports.WikiCreditTag = WikiCreditTag;
	exports.WikiFileTag = WikiFileTag;
	exports.WikiImageTag = WikiImageTag;
	exports.WikiLinkTag = WikiLinkTag;
	exports.WikiRevision = WikiRevision;
	exports.WikiRevisionBook = WikiRevisionBook;
	exports.WikiRevisionCredit = WikiRevisionCredit;
	exports.WikiYoutubeTag = WikiYoutubeTag;
	exports.YoutubeTag = YoutubeTag;
})))();
var ArticleEmbedTag = class extends import_build.Tag {
	constructor() {
		super("athumb");
	}
	FormatResult(parser, data, state, scope, options, text) {
		const id = parseInt(text, 10);
		if (!id) return null;
		const before = "<div class=\"embedded article\"><div class=\"embed-container\"><div class=\"embed-content\"><div class=\"uninitialised\" data-embed-type=\"article\" data-article-id=\"" + id + "\">Loading embedded content: Article #" + id + "</div></div></div></div>";
		const content = import_build.PlainTextNode.Empty();
		const ret = new import_build.HtmlNode(before, content, "\n");
		ret.PlainAfter = "Article: " + window.urls.view.article.replace("{slug}", id.toString()) + "\n";
		ret.IsBlockNode = true;
		return ret;
	}
};
var DownloadEmbedTag = class extends import_build.Tag {
	constructor() {
		super("dlthumb");
	}
	FormatResult(parser, data, state, scope, options, text) {
		const id = parseInt(text, 10);
		if (!id) return null;
		const before = "<div class=\"embedded download\"><div class=\"embed-container\"><div class=\"embed-content\"><div class=\"uninitialised\" data-embed-type=\"download\" data-download-id=\"" + id + "\">Loading embedded content: Download #" + id + "</div></div></div></div>";
		const content = import_build.PlainTextNode.Empty();
		const ret = new import_build.HtmlNode(before, content, "\n");
		ret.PlainAfter = "Download: " + window.urls.view.download.replace("{id}", id.toString()) + "\n";
		ret.IsBlockNode = true;
		return ret;
	}
};
var MapEmbedTag = class extends import_build.Tag {
	constructor() {
		super("mthumb");
	}
	FormatResult(parser, data, state, scope, options, text) {
		const id = parseInt(text, 10);
		if (!id) return null;
		const before = "<div class=\"embedded map\"><div class=\"embed-container\"><div class=\"embed-content\"><div class=\"uninitialised\" data-embed-type=\"map\" data-map-id=\"" + id + "\">Loading embedded content: Map #" + id + "</div></div></div></div>";
		const content = import_build.PlainTextNode.Empty();
		const ret = new import_build.HtmlNode(before, content, "\n");
		ret.PlainAfter = "Map: " + window.urls.view.map.replace("{id}", id.toString()) + "\n";
		ret.IsBlockNode = true;
		return ret;
	}
};
var config = import_build.ParserConfiguration.Snarkpit();
config.Processors.forEach((x) => {
	if (x instanceof import_build.SmiliesProcessor) x.UrlFormatString = window.urls.images.smiley_folder + "/{0}.gif";
});
config.Tags.push(new ArticleEmbedTag());
config.Tags.push(new DownloadEmbedTag());
config.Tags.push(new MapEmbedTag());
var parser_default = new import_build.Parser(config);
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [
	"top",
	bottom,
	right,
	left
];
var start = "start";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /*#__PURE__*/ basePlacements.reduce(function(acc, placement) {
	return acc.concat([placement + "-" + start, placement + "-end"]);
}, []);
var placements = /*#__PURE__*/ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
	return acc.concat([
		placement,
		placement + "-" + start,
		placement + "-end"
	]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [
	beforeRead,
	read,
	afterRead,
	beforeMain,
	main,
	afterMain,
	beforeWrite,
	write,
	afterWrite
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
	return element ? (element.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
	if (node == null) return window;
	if (node.toString() !== "[object Window]") {
		var ownerDocument = node.ownerDocument;
		return ownerDocument ? ownerDocument.defaultView || window : window;
	}
	return node;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement$1(node) {
	return node instanceof getWindow(node).Element || node instanceof Element;
}
function isHTMLElement(node) {
	return node instanceof getWindow(node).HTMLElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
	if (typeof ShadowRoot === "undefined") return false;
	return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
	var state = _ref.state;
	Object.keys(state.elements).forEach(function(name) {
		var style = state.styles[name] || {};
		var attributes = state.attributes[name] || {};
		var element = state.elements[name];
		if (!isHTMLElement(element) || !getNodeName(element)) return;
		Object.assign(element.style, style);
		Object.keys(attributes).forEach(function(name) {
			var value = attributes[name];
			if (value === false) element.removeAttribute(name);
			else element.setAttribute(name, value === true ? "" : value);
		});
	});
}
function effect$2(_ref2) {
	var state = _ref2.state;
	var initialStyles = {
		popper: {
			position: state.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(state.elements.popper.style, initialStyles.popper);
	state.styles = initialStyles;
	if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
	return function() {
		Object.keys(state.elements).forEach(function(name) {
			var element = state.elements[name];
			var attributes = state.attributes[name] || {};
			var style = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]).reduce(function(style, property) {
				style[property] = "";
				return style;
			}, {});
			if (!isHTMLElement(element) || !getNodeName(element)) return;
			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(attribute) {
				element.removeAttribute(attribute);
			});
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: true,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
	return placement.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
	var uaData = navigator.userAgentData;
	if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map(function(item) {
		return item.brand + "/" + item.version;
	}).join(" ");
	return navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	var clientRect = element.getBoundingClientRect();
	var scaleX = 1;
	var scaleY = 1;
	if (includeScale && isHTMLElement(element)) {
		scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
		scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	}
	var visualViewport = (isElement$1(element) ? getWindow(element) : window).visualViewport;
	var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	var width = clientRect.width / scaleX;
	var height = clientRect.height / scaleY;
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
	var clientRect = getBoundingClientRect(element);
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
	if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width,
		height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
	var rootNode = child.getRootNode && child.getRootNode();
	if (parent.contains(child)) return true;
	else if (rootNode && isShadowRoot(rootNode)) {
		var next = child;
		do {
			if (next && parent.isSameNode(next)) return true;
			next = next.parentNode || next.host;
		} while (next);
	}
	return false;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(element)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
	return ((isElement$1(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
	if (getNodeName(element) === "html") return element;
	return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	return element.offsetParent;
}
function getContainingBlock(element) {
	var isFirefox = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement(element)) {
		if (getComputedStyle$1(element).position === "fixed") return null;
	}
	var currentNode = getParentNode(element);
	if (isShadowRoot(currentNode)) currentNode = currentNode.host;
	while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
		var css = getComputedStyle$1(currentNode);
		if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
		else currentNode = currentNode.parentNode;
	}
	return null;
}
function getOffsetParent(element) {
	var window = getWindow(element);
	var offsetParent = getTrueOffsetParent(element);
	while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
	if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) return window;
	return offsetParent || getContainingBlock(element) || window;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
	return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function within(min$2, value, max$2) {
	return max(min$2, min(value, max$2));
}
function withinMaxClamp(min, value, max) {
	var v = within(min, value, max);
	return v > max ? max : v;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
	return Object.assign({}, getFreshSideObject(), paddingObject);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
	return keys.reduce(function(hashMap, key) {
		hashMap[key] = value;
		return hashMap;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject(padding, state) {
	padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, { placement: state.placement })) : padding;
	return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
	var _state$modifiersData$;
	var state = _ref.state, name = _ref.name, options = _ref.options;
	var arrowElement = state.elements.arrow;
	var popperOffsets = state.modifiersData.popperOffsets;
	var basePlacement = getBasePlacement(state.placement);
	var axis = getMainAxisFromPlacement(basePlacement);
	var len = ["left", "right"].indexOf(basePlacement) >= 0 ? "height" : "width";
	if (!arrowElement || !popperOffsets) return;
	var paddingObject = toPaddingObject(options.padding, state);
	var arrowRect = getLayoutRect(arrowElement);
	var minProp = axis === "y" ? "top" : left;
	var maxProp = axis === "y" ? bottom : right;
	var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	var arrowOffsetParent = getOffsetParent(arrowElement);
	var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	var centerToReference = endDiff / 2 - startDiff / 2;
	var min = paddingObject[minProp];
	var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	var offset = within(min, center, max);
	var axisProp = axis;
	state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
	var state = _ref2.state;
	var _options$element = _ref2.options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
	if (arrowElement == null) return;
	if (typeof arrowElement === "string") {
		arrowElement = state.elements.popper.querySelector(arrowElement);
		if (!arrowElement) return;
	}
	if (!contains(state.elements.popper, arrowElement)) return;
	state.elements.arrow = arrowElement;
}
var arrow_default = {
	name: "arrow",
	enabled: true,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
	return placement.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
	var x = _ref.x, y = _ref.y;
	var dpr = win.devicePixelRatio || 1;
	return {
		x: round(x * dpr) / dpr || 0,
		y: round(y * dpr) / dpr || 0
	};
}
function mapToStyles(_ref2) {
	var _Object$assign2;
	var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
	var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
	var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
		x,
		y
	}) : {
		x,
		y
	};
	x = _ref3.x;
	y = _ref3.y;
	var hasX = offsets.hasOwnProperty("x");
	var hasY = offsets.hasOwnProperty("y");
	var sideX = left;
	var sideY = "top";
	var win = window;
	if (adaptive) {
		var offsetParent = getOffsetParent(popper);
		var heightProp = "clientHeight";
		var widthProp = "clientWidth";
		if (offsetParent === getWindow(popper)) {
			offsetParent = getDocumentElement(popper);
			if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
				heightProp = "scrollHeight";
				widthProp = "scrollWidth";
			}
		}
		offsetParent = offsetParent;
		if (placement === "top" || (placement === "left" || placement === "right") && variation === "end") {
			sideY = bottom;
			var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
			y -= offsetY - popperRect.height;
			y *= gpuAcceleration ? 1 : -1;
		}
		if (placement === "left" || (placement === "top" || placement === "bottom") && variation === "end") {
			sideX = right;
			var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
			x -= offsetX - popperRect.width;
			x *= gpuAcceleration ? 1 : -1;
		}
	}
	var commonStyles = Object.assign({ position }, adaptive && unsetSides);
	var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
		x,
		y
	}, getWindow(popper)) : {
		x,
		y
	};
	x = _ref4.x;
	y = _ref4.y;
	if (gpuAcceleration) {
		var _Object$assign;
		return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	}
	return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
	var state = _ref5.state, options = _ref5.options;
	var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	var commonStyles = {
		placement: getBasePlacement(state.placement),
		variation: getVariation(state.placement),
		popper: state.elements.popper,
		popperRect: state.rects.popper,
		gpuAcceleration,
		isFixed: state.options.strategy === "fixed"
	};
	if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.popperOffsets,
		position: state.options.strategy,
		adaptive,
		roundOffsets
	})));
	if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.arrow,
		position: "absolute",
		adaptive: false,
		roundOffsets
	})));
	state.attributes.popper = Object.assign({}, state.attributes.popper, { "data-popper-placement": state.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: true,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = { passive: true };
function effect(_ref) {
	var state = _ref.state, instance = _ref.instance, options = _ref.options;
	var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
	var window = getWindow(state.elements.popper);
	var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	if (scroll) scrollParents.forEach(function(scrollParent) {
		scrollParent.addEventListener("scroll", instance.update, passive);
	});
	if (resize) window.addEventListener("resize", instance.update, passive);
	return function() {
		if (scroll) scrollParents.forEach(function(scrollParent) {
			scrollParent.removeEventListener("scroll", instance.update, passive);
		});
		if (resize) window.removeEventListener("resize", instance.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: true,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, function(matched) {
		return hash$1[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(placement) {
	return placement.replace(/start|end/g, function(matched) {
		return hash[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
	var win = getWindow(node);
	return {
		scrollLeft: win.pageXOffset,
		scrollTop: win.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
	return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
	var win = getWindow(element);
	var html = getDocumentElement(element);
	var visualViewport = win.visualViewport;
	var width = html.clientWidth;
	var height = html.clientHeight;
	var x = 0;
	var y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		var layoutViewport = isLayoutViewport();
		if (layoutViewport || !layoutViewport && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x: x + getWindowScrollBarX(element),
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
	var _element$ownerDocumen;
	var html = getDocumentElement(element);
	var winScroll = getWindowScroll(element);
	var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	var y = -winScroll.scrollTop;
	if (getComputedStyle$1(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	return {
		width,
		height,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
	var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
	if ([
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
	if (isHTMLElement(node) && isScrollParent(node)) return node;
	return getScrollParent(getParentNode(node));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
	var _element$ownerDocumen;
	if (list === void 0) list = [];
	var scrollParent = getScrollParent(element);
	var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	var win = getWindow(scrollParent);
	var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	var updatedList = list.concat(target);
	return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
	return Object.assign({}, rect, {
		left: rect.x,
		top: rect.y,
		right: rect.x + rect.width,
		bottom: rect.y + rect.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
	var rect = getBoundingClientRect(element, false, strategy === "fixed");
	rect.top = rect.top + element.clientTop;
	rect.left = rect.left + element.clientLeft;
	rect.bottom = rect.top + element.clientHeight;
	rect.right = rect.left + element.clientWidth;
	rect.width = element.clientWidth;
	rect.height = element.clientHeight;
	rect.x = rect.left;
	rect.y = rect.top;
	return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
	return clippingParent === "viewport" ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
	var clippingParents = listScrollParents(getParentNode(element));
	var clipperElement = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0 && isHTMLElement(element) ? getOffsetParent(element) : element;
	if (!isElement$1(clipperElement)) return [];
	return clippingParents.filter(function(clippingParent) {
		return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
	});
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
	var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
	var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	var firstClippingParent = clippingParents[0];
	var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
		var rect = getClientRectFromMixedType(element, clippingParent, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromMixedType(element, firstClippingParent, strategy));
	clippingRect.width = clippingRect.right - clippingRect.left;
	clippingRect.height = clippingRect.bottom - clippingRect.top;
	clippingRect.x = clippingRect.left;
	clippingRect.y = clippingRect.top;
	return clippingRect;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
	var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
	var basePlacement = placement ? getBasePlacement(placement) : null;
	var variation = placement ? getVariation(placement) : null;
	var commonX = reference.x + reference.width / 2 - element.width / 2;
	var commonY = reference.y + reference.height / 2 - element.height / 2;
	var offsets;
	switch (basePlacement) {
		case "top":
			offsets = {
				x: commonX,
				y: reference.y - element.height
			};
			break;
		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY
			};
			break;
		default: offsets = {
			x: reference.x,
			y: reference.y
		};
	}
	var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	if (mainAxis != null) {
		var len = mainAxis === "y" ? "height" : "width";
		switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;
			case "end": offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
		}
	}
	return offsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
	if (options === void 0) options = {};
	var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
	var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
	var altContext = elementContext === "popper" ? reference : popper;
	var popperRect = state.rects.popper;
	var element = state.elements[altBoundary ? altContext : elementContext];
	var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	var referenceClientRect = getBoundingClientRect(state.elements.reference);
	var popperOffsets = computeOffsets({
		reference: referenceClientRect,
		element: popperRect,
		strategy: "absolute",
		placement
	});
	var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	var elementClientRect = elementContext === "popper" ? popperClientRect : referenceClientRect;
	var overflowOffsets = {
		top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
		bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
		left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
		right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	};
	var offsetData = state.modifiersData.offset;
	if (elementContext === "popper" && offsetData) {
		var offset = offsetData[placement];
		Object.keys(overflowOffsets).forEach(function(key) {
			var multiply = ["right", "bottom"].indexOf(key) >= 0 ? 1 : -1;
			var axis = ["top", "bottom"].indexOf(key) >= 0 ? "y" : "x";
			overflowOffsets[key] += offset[axis] * multiply;
		});
	}
	return overflowOffsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
	if (options === void 0) options = {};
	var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	var variation = getVariation(placement);
	var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
		return getVariation(placement) === variation;
	}) : basePlacements;
	var allowedPlacements = placements$1.filter(function(placement) {
		return allowedAutoPlacements.indexOf(placement) >= 0;
	});
	if (allowedPlacements.length === 0) allowedPlacements = placements$1;
	var overflows = allowedPlacements.reduce(function(acc, placement) {
		acc[placement] = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			padding
		})[getBasePlacement(placement)];
		return acc;
	}, {});
	return Object.keys(overflows).sort(function(a, b) {
		return overflows[a] - overflows[b];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
	if (getBasePlacement(placement) === "auto") return [];
	var oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeVariationPlacement(placement),
		oppositePlacement,
		getOppositeVariationPlacement(oppositePlacement)
	];
}
function flip(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	if (state.modifiersData[name]._skip) return;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
	var preferredPlacement = state.options.placement;
	var isBasePlacement = getBasePlacement(preferredPlacement) === preferredPlacement;
	var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
		return acc.concat(getBasePlacement(placement) === "auto" ? computeAutoPlacement(state, {
			placement,
			boundary,
			rootBoundary,
			padding,
			flipVariations,
			allowedAutoPlacements
		}) : placement);
	}, []);
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var checksMap = /* @__PURE__ */ new Map();
	var makeFallbackChecks = true;
	var firstFittingPlacement = placements[0];
	for (var i = 0; i < placements.length; i++) {
		var placement = placements[i];
		var _basePlacement = getBasePlacement(placement);
		var isStartVariation = getVariation(placement) === start;
		var isVertical = ["top", bottom].indexOf(_basePlacement) >= 0;
		var len = isVertical ? "width" : "height";
		var overflow = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			altBoundary,
			padding
		});
		var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : "top";
		if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
		var altVariationSide = getOppositePlacement(mainVariationSide);
		var checks = [];
		if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
		if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
		if (checks.every(function(check) {
			return check;
		})) {
			firstFittingPlacement = placement;
			makeFallbackChecks = false;
			break;
		}
		checksMap.set(placement, checks);
	}
	if (makeFallbackChecks) {
		var numberOfChecks = flipVariations ? 3 : 1;
		var _loop = function _loop(_i) {
			var fittingPlacement = placements.find(function(placement) {
				var checks = checksMap.get(placement);
				if (checks) return checks.slice(0, _i).every(function(check) {
					return check;
				});
			});
			if (fittingPlacement) {
				firstFittingPlacement = fittingPlacement;
				return "break";
			}
		};
		for (var _i = numberOfChecks; _i > 0; _i--) if (_loop(_i) === "break") break;
	}
	if (state.placement !== firstFittingPlacement) {
		state.modifiersData[name]._skip = true;
		state.placement = firstFittingPlacement;
		state.reset = true;
	}
}
var flip_default = {
	name: "flip",
	enabled: true,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: false }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
	if (preventedOffsets === void 0) preventedOffsets = {
		x: 0,
		y: 0
	};
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x
	};
}
function isAnySideFullyClipped(overflow) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(side) {
		return overflow[side] >= 0;
	});
}
function hide(_ref) {
	var state = _ref.state, name = _ref.name;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var preventedOffsets = state.modifiersData.preventOverflow;
	var referenceOverflow = detectOverflow(state, { elementContext: "reference" });
	var popperAltOverflow = detectOverflow(state, { altBoundary: true });
	var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped
	};
	state.attributes.popper = Object.assign({}, state.attributes.popper, {
		"data-popper-reference-hidden": isReferenceHidden,
		"data-popper-escaped": hasPopperEscaped
	});
}
var hide_default = {
	name: "hide",
	enabled: true,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset) {
	var basePlacement = getBasePlacement(placement);
	var invertDistance = ["left", "top"].indexOf(basePlacement) >= 0 ? -1 : 1;
	var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, { placement })) : offset, skidding = _ref[0], distance = _ref[1];
	skidding = skidding || 0;
	distance = (distance || 0) * invertDistance;
	return ["left", "right"].indexOf(basePlacement) >= 0 ? {
		x: distance,
		y: skidding
	} : {
		x: skidding,
		y: distance
	};
}
function offset(_ref2) {
	var state = _ref2.state, options = _ref2.options, name = _ref2.name;
	var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	var data = placements.reduce(function(acc, placement) {
		acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
		return acc;
	}, {});
	var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
	if (state.modifiersData.popperOffsets != null) {
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}
	state.modifiersData[name] = data;
}
var offset_default = {
	name: "offset",
	enabled: true,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
	var state = _ref.state, name = _ref.name;
	state.modifiersData[name] = computeOffsets({
		reference: state.rects.reference,
		element: state.rects.popper,
		strategy: "absolute",
		placement: state.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: true,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
	return axis === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	var overflow = detectOverflow(state, {
		boundary,
		rootBoundary,
		padding,
		altBoundary
	});
	var basePlacement = getBasePlacement(state.placement);
	var variation = getVariation(state.placement);
	var isBasePlacement = !variation;
	var mainAxis = getMainAxisFromPlacement(basePlacement);
	var altAxis = getAltAxis(mainAxis);
	var popperOffsets = state.modifiersData.popperOffsets;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, { placement: state.placement })) : tetherOffset;
	var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
		mainAxis: tetherOffsetValue,
		altAxis: tetherOffsetValue
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, tetherOffsetValue);
	var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	var data = {
		x: 0,
		y: 0
	};
	if (!popperOffsets) return;
	if (checkMainAxis) {
		var _offsetModifierState$;
		var mainSide = mainAxis === "y" ? "top" : left;
		var altSide = mainAxis === "y" ? bottom : right;
		var len = mainAxis === "y" ? "height" : "width";
		var offset = popperOffsets[mainAxis];
		var min$1 = offset + overflow[mainSide];
		var max$1 = offset - overflow[altSide];
		var additive = tether ? -popperRect[len] / 2 : 0;
		var minLen = variation === "start" ? referenceRect[len] : popperRect[len];
		var maxLen = variation === "start" ? -popperRect[len] : -referenceRect[len];
		var arrowElement = state.elements.arrow;
		var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
			width: 0,
			height: 0
		};
		var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
		var arrowPaddingMin = arrowPaddingObject[mainSide];
		var arrowPaddingMax = arrowPaddingObject[altSide];
		var arrowLen = within(0, referenceRect[len], arrowRect[len]);
		var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
		var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
		var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
		var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
		var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
		var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
		var tetherMax = offset + maxOffset - offsetModifierValue;
		var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
		popperOffsets[mainAxis] = preventedOffset;
		data[mainAxis] = preventedOffset - offset;
	}
	if (checkAltAxis) {
		var _offsetModifierState$2;
		var _mainSide = mainAxis === "x" ? "top" : left;
		var _altSide = mainAxis === "x" ? bottom : right;
		var _offset = popperOffsets[altAxis];
		var _len = altAxis === "y" ? "height" : "width";
		var _min = _offset + overflow[_mainSide];
		var _max = _offset - overflow[_altSide];
		var isOriginSide = ["top", left].indexOf(basePlacement) !== -1;
		var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
		var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
		var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
		var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
		popperOffsets[altAxis] = _preventedOffset;
		data[altAxis] = _preventedOffset - _offset;
	}
	state.modifiersData[name] = data;
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: true,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
	return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
	if (node === getWindow(node) || !isHTMLElement(node)) return getWindowScroll(node);
	else return getHTMLElementScroll(node);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
	var rect = element.getBoundingClientRect();
	var scaleX = round(rect.width) / element.offsetWidth || 1;
	var scaleY = round(rect.height) / element.offsetHeight || 1;
	return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	if (isFixed === void 0) isFixed = false;
	var isOffsetParentAnElement = isHTMLElement(offsetParent);
	var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	var documentElement = getDocumentElement(offsetParent);
	var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	var scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	var offsets = {
		x: 0,
		y: 0
	};
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement(offsetParent)) {
			offsets = getBoundingClientRect(offsetParent, true);
			offsets.x += offsetParent.clientLeft;
			offsets.y += offsetParent.clientTop;
		} else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
	}
	return {
		x: rect.left + scroll.scrollLeft - offsets.x,
		y: rect.top + scroll.scrollTop - offsets.y,
		width: rect.width,
		height: rect.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
	var map = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var result = [];
	modifiers.forEach(function(modifier) {
		map.set(modifier.name, modifier);
	});
	function sort(modifier) {
		visited.add(modifier.name);
		[].concat(modifier.requires || [], modifier.requiresIfExists || []).forEach(function(dep) {
			if (!visited.has(dep)) {
				var depModifier = map.get(dep);
				if (depModifier) sort(depModifier);
			}
		});
		result.push(modifier);
	}
	modifiers.forEach(function(modifier) {
		if (!visited.has(modifier.name)) sort(modifier);
	});
	return result;
}
function orderModifiers(modifiers) {
	var orderedModifiers = order(modifiers);
	return modifierPhases.reduce(function(acc, phase) {
		return acc.concat(orderedModifiers.filter(function(modifier) {
			return modifier.phase === phase;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
	var pending;
	return function() {
		if (!pending) pending = new Promise(function(resolve) {
			Promise.resolve().then(function() {
				pending = void 0;
				resolve(fn());
			});
		});
		return pending;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
	var merged = modifiers.reduce(function(merged, current) {
		var existing = merged[current.name];
		merged[current.name] = existing ? Object.assign({}, existing, current, {
			options: Object.assign({}, existing.options, current.options),
			data: Object.assign({}, existing.data, current.data)
		}) : current;
		return merged;
	}, {});
	return Object.keys(merged).map(function(key) {
		return merged[key];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return !args.some(function(element) {
		return !(element && typeof element.getBoundingClientRect === "function");
	});
}
function popperGenerator(generatorOptions) {
	if (generatorOptions === void 0) generatorOptions = {};
	var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	return function createPopper(reference, popper, options) {
		if (options === void 0) options = defaultOptions;
		var state = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
			modifiersData: {},
			elements: {
				reference,
				popper
			},
			attributes: {},
			styles: {}
		};
		var effectCleanupFns = [];
		var isDestroyed = false;
		var instance = {
			state,
			setOptions: function setOptions(setOptionsAction) {
				var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
				cleanupModifierEffects();
				state.options = Object.assign({}, defaultOptions, state.options, options);
				state.scrollParents = {
					reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
					popper: listScrollParents(popper)
				};
				var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
				state.orderedModifiers = orderedModifiers.filter(function(m) {
					return m.enabled;
				});
				runModifierEffects();
				return instance.update();
			},
			forceUpdate: function forceUpdate() {
				if (isDestroyed) return;
				var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
				if (!areValidElements(reference, popper)) return;
				state.rects = {
					reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
					popper: getLayoutRect(popper)
				};
				state.reset = false;
				state.placement = state.options.placement;
				state.orderedModifiers.forEach(function(modifier) {
					return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
				});
				for (var index = 0; index < state.orderedModifiers.length; index++) {
					if (state.reset === true) {
						state.reset = false;
						index = -1;
						continue;
					}
					var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
					if (typeof fn === "function") state = fn({
						state,
						options: _options,
						name,
						instance
					}) || state;
				}
			},
			update: debounce(function() {
				return new Promise(function(resolve) {
					instance.forceUpdate();
					resolve(state);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects();
				isDestroyed = true;
			}
		};
		if (!areValidElements(reference, popper)) return instance;
		instance.setOptions(options).then(function(state) {
			if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
		});
		function runModifierEffects() {
			state.orderedModifiers.forEach(function(_ref) {
				var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
				if (typeof effect === "function") {
					var cleanupFn = effect({
						state,
						name,
						instance,
						options
					});
					effectCleanupFns.push(cleanupFn || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			effectCleanupFns.forEach(function(fn) {
				return fn();
			});
			effectCleanupFns = [];
		}
		return instance;
	};
}
var createPopper$2 = /*#__PURE__*/ popperGenerator();
var createPopper$1 = /*#__PURE__*/ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default
] });
var createPopper = /*#__PURE__*/ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] });
//#endregion
//#region node_modules/@popperjs/core/lib/index.js
var lib_exports = /* @__PURE__ */ __exportAll({
	afterMain: () => afterMain,
	afterRead: () => afterRead,
	afterWrite: () => afterWrite,
	applyStyles: () => applyStyles_default,
	arrow: () => arrow_default,
	auto: () => auto,
	basePlacements: () => basePlacements,
	beforeMain: () => beforeMain,
	beforeRead: () => beforeRead,
	beforeWrite: () => beforeWrite,
	bottom: () => bottom,
	clippingParents: () => clippingParents,
	computeStyles: () => computeStyles_default,
	createPopper: () => createPopper,
	createPopperBase: () => createPopper$2,
	createPopperLite: () => createPopper$1,
	detectOverflow: () => detectOverflow,
	end: () => "end",
	eventListeners: () => eventListeners_default,
	flip: () => flip_default,
	hide: () => hide_default,
	left: () => left,
	main: () => main,
	modifierPhases: () => modifierPhases,
	offset: () => offset_default,
	placements: () => placements,
	popper: () => popper,
	popperGenerator: () => popperGenerator,
	popperOffsets: () => popperOffsets_default,
	preventOverflow: () => preventOverflow_default,
	read: () => read,
	reference: () => reference,
	right: () => right,
	start: () => start,
	top: () => "top",
	variationPlacements: () => variationPlacements,
	viewport: () => viewport,
	write: () => write
});
//#endregion
//#region node_modules/bootstrap/dist/js/bootstrap.esm.js
/*!
* Bootstrap v5.3.8 (https://getbootstrap.com/)
* Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/
/**
* --------------------------------------------------------------------------
* Bootstrap dom/data.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var elementMap = /* @__PURE__ */ new Map();
var Data = {
	set(element, key, instance) {
		if (!elementMap.has(element)) elementMap.set(element, /* @__PURE__ */ new Map());
		const instanceMap = elementMap.get(element);
		if (!instanceMap.has(key) && instanceMap.size !== 0) {
			console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			return;
		}
		instanceMap.set(key, instance);
	},
	get(element, key) {
		if (elementMap.has(element)) return elementMap.get(element).get(key) || null;
		return null;
	},
	remove(element, key) {
		if (!elementMap.has(element)) return;
		const instanceMap = elementMap.get(element);
		instanceMap.delete(key);
		if (instanceMap.size === 0) elementMap.delete(element);
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap util/index.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
var MAX_UID = 1e6;
var MILLISECONDS_MULTIPLIER = 1e3;
var TRANSITION_END = "transitionend";
/**
* Properly escape IDs selectors to handle weird IDs
* @param {string} selector
* @returns {string}
*/
var parseSelector = (selector) => {
	if (selector && window.CSS && window.CSS.escape) selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
	return selector;
};
var toType = (object) => {
	if (object === null || object === void 0) return `${object}`;
	return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
* Public Util API
*/
var getUID = (prefix) => {
	do
		prefix += Math.floor(Math.random() * MAX_UID);
	while (document.getElementById(prefix));
	return prefix;
};
var getTransitionDurationFromElement = (element) => {
	if (!element) return 0;
	let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
	if (!Number.parseFloat(transitionDuration) && !Number.parseFloat(transitionDelay)) return 0;
	transitionDuration = transitionDuration.split(",")[0];
	transitionDelay = transitionDelay.split(",")[0];
	return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
var triggerTransitionEnd = (element) => {
	element.dispatchEvent(new Event(TRANSITION_END));
};
var isElement = (object) => {
	if (!object || typeof object !== "object") return false;
	if (typeof object.jquery !== "undefined") object = object[0];
	return typeof object.nodeType !== "undefined";
};
var getElement = (object) => {
	if (isElement(object)) return object.jquery ? object[0] : object;
	if (typeof object === "string" && object.length > 0) return document.querySelector(parseSelector(object));
	return null;
};
var isVisible = (element) => {
	if (!isElement(element) || element.getClientRects().length === 0) return false;
	const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
	const closedDetails = element.closest("details:not([open])");
	if (!closedDetails) return elementIsVisible;
	if (closedDetails !== element) {
		const summary = element.closest("summary");
		if (summary && summary.parentNode !== closedDetails) return false;
		if (summary === null) return false;
	}
	return elementIsVisible;
};
var isDisabled = (element) => {
	if (!element || element.nodeType !== Node.ELEMENT_NODE) return true;
	if (element.classList.contains("disabled")) return true;
	if (typeof element.disabled !== "undefined") return element.disabled;
	return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
};
var findShadowRoot = (element) => {
	if (!document.documentElement.attachShadow) return null;
	if (typeof element.getRootNode === "function") {
		const root = element.getRootNode();
		return root instanceof ShadowRoot ? root : null;
	}
	if (element instanceof ShadowRoot) return element;
	if (!element.parentNode) return null;
	return findShadowRoot(element.parentNode);
};
var noop = () => {};
/**
* Trick to restart an element's animation
*
* @param {HTMLElement} element
* @return void
*
* @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
*/
var reflow = (element) => {
	element.offsetHeight;
};
var getjQuery = () => {
	if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) return window.jQuery;
	return null;
};
var DOMContentLoadedCallbacks = [];
var onDOMContentLoaded = (callback) => {
	if (document.readyState === "loading") {
		if (!DOMContentLoadedCallbacks.length) document.addEventListener("DOMContentLoaded", () => {
			for (const callback of DOMContentLoadedCallbacks) callback();
		});
		DOMContentLoadedCallbacks.push(callback);
	} else callback();
};
var isRTL = () => document.documentElement.dir === "rtl";
var defineJQueryPlugin = (plugin) => {
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
var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
	return typeof possibleCallback === "function" ? possibleCallback.call(...args) : defaultValue;
};
var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	if (!waitForTransition) {
		execute(callback);
		return;
	}
	const emulatedDuration = getTransitionDurationFromElement(transitionElement) + 5;
	let called = false;
	const handler = ({ target }) => {
		if (target !== transitionElement) return;
		called = true;
		transitionElement.removeEventListener(TRANSITION_END, handler);
		execute(callback);
	};
	transitionElement.addEventListener(TRANSITION_END, handler);
	setTimeout(() => {
		if (!called) triggerTransitionEnd(transitionElement);
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
var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	const listLength = list.length;
	let index = list.indexOf(activeElement);
	if (index === -1) return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
	index += shouldGetNext ? 1 : -1;
	if (isCycleAllowed) index = (index + listLength) % listLength;
	return list[Math.max(0, Math.min(index, listLength - 1))];
};
/**
* --------------------------------------------------------------------------
* Bootstrap dom/event-handler.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {};
var uidEvent = 1;
var customEvents = {
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};
var nativeEvents = /* @__PURE__ */ new Set([
	"click",
	"dblclick",
	"mouseup",
	"mousedown",
	"contextmenu",
	"mousewheel",
	"DOMMouseScroll",
	"mouseover",
	"mouseout",
	"mousemove",
	"selectstart",
	"selectend",
	"keydown",
	"keypress",
	"keyup",
	"orientationchange",
	"touchstart",
	"touchmove",
	"touchend",
	"touchcancel",
	"pointerdown",
	"pointermove",
	"pointerup",
	"pointerleave",
	"pointercancel",
	"gesturestart",
	"gesturechange",
	"gestureend",
	"focus",
	"blur",
	"change",
	"reset",
	"select",
	"submit",
	"focusin",
	"focusout",
	"load",
	"unload",
	"beforeunload",
	"resize",
	"move",
	"DOMContentLoaded",
	"readystatechange",
	"error",
	"abort",
	"scroll"
]);
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
		hydrateObj(event, { delegateTarget: element });
		if (handler.oneOff) EventHandler.off(element, event.type, fn);
		return fn.apply(element, [event]);
	};
}
function bootstrapDelegationHandler(element, selector, fn) {
	return function handler(event) {
		const domElements = element.querySelectorAll(selector);
		for (let { target } = event; target && target !== this; target = target.parentNode) for (const domElement of domElements) {
			if (domElement !== target) continue;
			hydrateObj(event, { delegateTarget: target });
			if (handler.oneOff) EventHandler.off(element, event.type, selector, fn);
			return fn.apply(target, [event]);
		}
	};
}
function findHandler(events, callable, delegationSelector = null) {
	return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
	const isDelegated = typeof handler === "string";
	const callable = isDelegated ? delegationFunction : handler || delegationFunction;
	let typeEvent = getTypeEvent(originalTypeEvent);
	if (!nativeEvents.has(typeEvent)) typeEvent = originalTypeEvent;
	return [
		isDelegated,
		callable,
		typeEvent
	];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
	if (typeof originalTypeEvent !== "string" || !element) return;
	let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
	if (originalTypeEvent in customEvents) {
		const wrapFunction = (fn) => {
			return function(event) {
				if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) return fn.call(this, event);
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
	const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
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
	if (!fn) return;
	element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	delete events[typeEvent][fn.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	const storeElementEvent = events[typeEvent] || {};
	for (const [handlerKey, event] of Object.entries(storeElementEvent)) if (handlerKey.includes(namespace)) removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
}
function getTypeEvent(event) {
	event = event.replace(stripNameRegex, "");
	return customEvents[event] || event;
}
var EventHandler = {
	on(element, event, handler, delegationFunction) {
		addHandler(element, event, handler, delegationFunction, false);
	},
	one(element, event, handler, delegationFunction) {
		addHandler(element, event, handler, delegationFunction, true);
	},
	off(element, originalTypeEvent, handler, delegationFunction) {
		if (typeof originalTypeEvent !== "string" || !element) return;
		const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
		const inNamespace = typeEvent !== originalTypeEvent;
		const events = getElementEvents(element);
		const storeElementEvent = events[typeEvent] || {};
		const isNamespace = originalTypeEvent.startsWith(".");
		if (typeof callable !== "undefined") {
			if (!Object.keys(storeElementEvent).length) return;
			removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			return;
		}
		if (isNamespace) for (const elementEvent of Object.keys(events)) removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
		for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
			const handlerKey = keyHandlers.replace(stripUidRegex, "");
			if (!inNamespace || originalTypeEvent.includes(handlerKey)) removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
		}
	},
	trigger(element, event, args) {
		if (typeof event !== "string" || !element) return null;
		const $ = getjQuery();
		const inNamespace = event !== getTypeEvent(event);
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
		const evt = hydrateObj(new Event(event, {
			bubbles,
			cancelable: true
		}), args);
		if (defaultPrevented) evt.preventDefault();
		if (nativeDispatch) element.dispatchEvent(evt);
		if (evt.defaultPrevented && jQueryEvent) jQueryEvent.preventDefault();
		return evt;
	}
};
function hydrateObj(obj, meta = {}) {
	for (const [key, value] of Object.entries(meta)) try {
		obj[key] = value;
	} catch (_unused) {
		Object.defineProperty(obj, key, {
			configurable: true,
			get() {
				return value;
			}
		});
	}
	return obj;
}
/**
* --------------------------------------------------------------------------
* Bootstrap dom/manipulator.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
function normalizeData(value) {
	if (value === "true") return true;
	if (value === "false") return false;
	if (value === Number(value).toString()) return Number(value);
	if (value === "" || value === "null") return null;
	if (typeof value !== "string") return value;
	try {
		return JSON.parse(decodeURIComponent(value));
	} catch (_unused) {
		return value;
	}
}
function normalizeDataKey(key) {
	return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
var Manipulator = {
	setDataAttribute(element, key, value) {
		element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	},
	removeDataAttribute(element, key) {
		element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	},
	getDataAttributes(element) {
		if (!element) return {};
		const attributes = {};
		const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
		for (const key of bsKeys) {
			let pureKey = key.replace(/^bs/, "");
			pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
			attributes[pureKey] = normalizeData(element.dataset[key]);
		}
		return attributes;
	},
	getDataAttribute(element, key) {
		return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap util/config.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Class definition
*/
var Config = class {
	static get Default() {
		return {};
	}
	static get DefaultType() {
		return {};
	}
	static get NAME() {
		throw new Error("You have to implement the static method \"NAME\", for each component!");
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
		const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, "config") : {};
		return {
			...this.constructor.Default,
			...typeof jsonConfig === "object" ? jsonConfig : {},
			...isElement(element) ? Manipulator.getDataAttributes(element) : {},
			...typeof config === "object" ? config : {}
		};
	}
	_typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
		for (const [property, expectedTypes] of Object.entries(configTypes)) {
			const value = config[property];
			const valueType = isElement(value) ? "element" : toType(value);
			if (!new RegExp(expectedTypes).test(valueType)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
		}
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap base-component.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var VERSION = "5.3.8";
/**
* Class definition
*/
var BaseComponent = class extends Config {
	constructor(element, config) {
		super();
		element = getElement(element);
		if (!element) return;
		this._element = element;
		this._config = this._getConfig(config);
		Data.set(this._element, this.constructor.DATA_KEY, this);
	}
	dispose() {
		Data.remove(this._element, this.constructor.DATA_KEY);
		EventHandler.off(this._element, this.constructor.EVENT_KEY);
		for (const propertyName of Object.getOwnPropertyNames(this)) this[propertyName] = null;
	}
	_queueCallback(callback, element, isAnimated = true) {
		executeAfterTransition(callback, element, isAnimated);
	}
	_getConfig(config) {
		config = this._mergeConfigObj(config, this._element);
		config = this._configAfterMerge(config);
		this._typeCheckConfig(config);
		return config;
	}
	static getInstance(element) {
		return Data.get(getElement(element), this.DATA_KEY);
	}
	static getOrCreateInstance(element, config = {}) {
		return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
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
};
/**
* --------------------------------------------------------------------------
* Bootstrap dom/selector-engine.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
var getSelector = (element) => {
	let selector = element.getAttribute("data-bs-target");
	if (!selector || selector === "#") {
		let hrefAttribute = element.getAttribute("href");
		if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) return null;
		if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
		selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
	}
	return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
};
var SelectorEngine = {
	find(selector, element = document.documentElement) {
		return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	},
	findOne(selector, element = document.documentElement) {
		return Element.prototype.querySelector.call(element, selector);
	},
	children(element, selector) {
		return [].concat(...element.children).filter((child) => child.matches(selector));
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
			if (previous.matches(selector)) return [previous];
			previous = previous.previousElementSibling;
		}
		return [];
	},
	next(element, selector) {
		let next = element.nextElementSibling;
		while (next) {
			if (next.matches(selector)) return [next];
			next = next.nextElementSibling;
		}
		return [];
	},
	focusableChildren(element) {
		const focusables = [
			"a",
			"button",
			"input",
			"textarea",
			"select",
			"details",
			"[tabindex]",
			"[contenteditable=\"true\"]"
		].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
		return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
	},
	getSelectorFromElement(element) {
		const selector = getSelector(element);
		if (selector) return SelectorEngine.findOne(selector) ? selector : null;
		return null;
	},
	getElementFromSelector(element) {
		const selector = getSelector(element);
		return selector ? SelectorEngine.findOne(selector) : null;
	},
	getMultipleElementsFromSelector(element) {
		const selector = getSelector(element);
		return selector ? SelectorEngine.find(selector) : [];
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap util/component-functions.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
var enableDismissTrigger = (component, method = "hide") => {
	const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	const name = component.NAME;
	EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
		if (["A", "AREA"].includes(this.tagName)) event.preventDefault();
		if (isDisabled(this)) return;
		const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
		component.getOrCreateInstance(target)[method]();
	});
};
/**
* --------------------------------------------------------------------------
* Bootstrap alert.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$f = "alert";
var EVENT_KEY$b = `.bs.alert`;
var EVENT_CLOSE = `close${EVENT_KEY$b}`;
var EVENT_CLOSED = `closed${EVENT_KEY$b}`;
var CLASS_NAME_FADE$5 = "fade";
var CLASS_NAME_SHOW$8 = "show";
/**
* Class definition
*/
var Alert = class Alert extends BaseComponent {
	static get NAME() {
		return NAME$f;
	}
	close() {
		if (EventHandler.trigger(this._element, EVENT_CLOSE).defaultPrevented) return;
		this._element.classList.remove(CLASS_NAME_SHOW$8);
		const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
		this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	}
	_destroyElement() {
		this._element.remove();
		EventHandler.trigger(this._element, EVENT_CLOSED);
		this.dispose();
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Alert.getOrCreateInstance(this);
			if (typeof config !== "string") return;
			if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
			data[config](this);
		});
	}
};
/**
* Data API implementation
*/
enableDismissTrigger(Alert, "close");
/**
* jQuery
*/
defineJQueryPlugin(Alert);
/**
* --------------------------------------------------------------------------
* Bootstrap button.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$e = "button";
var EVENT_KEY$a = `.bs.button`;
var DATA_API_KEY$6 = ".data-api";
var CLASS_NAME_ACTIVE$3 = "active";
var SELECTOR_DATA_TOGGLE$5 = "[data-bs-toggle=\"button\"]";
var EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
/**
* Class definition
*/
var Button = class Button extends BaseComponent {
	static get NAME() {
		return NAME$e;
	}
	toggle() {
		this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Button.getOrCreateInstance(this);
			if (config === "toggle") data[config]();
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
	event.preventDefault();
	const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
	Button.getOrCreateInstance(button).toggle();
});
/**
* jQuery
*/
defineJQueryPlugin(Button);
/**
* --------------------------------------------------------------------------
* Bootstrap util/swipe.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$d = "swipe";
var EVENT_KEY$9 = ".bs.swipe";
var EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
var EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
var EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
var EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
var EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
var POINTER_TYPE_TOUCH = "touch";
var POINTER_TYPE_PEN = "pen";
var CLASS_NAME_POINTER_EVENT = "pointer-event";
var SWIPE_THRESHOLD = 40;
var Default$c = {
	endCallback: null,
	leftCallback: null,
	rightCallback: null
};
var DefaultType$c = {
	endCallback: "(function|null)",
	leftCallback: "(function|null)",
	rightCallback: "(function|null)"
};
/**
* Class definition
*/
var Swipe = class Swipe extends Config {
	constructor(element, config) {
		super();
		this._element = element;
		if (!element || !Swipe.isSupported()) return;
		this._config = this._getConfig(config);
		this._deltaX = 0;
		this._supportPointerEvents = Boolean(window.PointerEvent);
		this._initEvents();
	}
	static get Default() {
		return Default$c;
	}
	static get DefaultType() {
		return DefaultType$c;
	}
	static get NAME() {
		return NAME$d;
	}
	dispose() {
		EventHandler.off(this._element, EVENT_KEY$9);
	}
	_start(event) {
		if (!this._supportPointerEvents) {
			this._deltaX = event.touches[0].clientX;
			return;
		}
		if (this._eventIsPointerPenTouch(event)) this._deltaX = event.clientX;
	}
	_end(event) {
		if (this._eventIsPointerPenTouch(event)) this._deltaX = event.clientX - this._deltaX;
		this._handleSwipe();
		execute(this._config.endCallback);
	}
	_move(event) {
		this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
	}
	_handleSwipe() {
		const absDeltaX = Math.abs(this._deltaX);
		if (absDeltaX <= SWIPE_THRESHOLD) return;
		const direction = absDeltaX / this._deltaX;
		this._deltaX = 0;
		if (!direction) return;
		execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
	}
	_initEvents() {
		if (this._supportPointerEvents) {
			EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
			EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
			this._element.classList.add(CLASS_NAME_POINTER_EVENT);
		} else {
			EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
			EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
			EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
		}
	}
	_eventIsPointerPenTouch(event) {
		return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	}
	static isSupported() {
		return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap carousel.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$c = "carousel";
var EVENT_KEY$8 = `.bs.carousel`;
var DATA_API_KEY$5 = ".data-api";
var ARROW_LEFT_KEY$1 = "ArrowLeft";
var ARROW_RIGHT_KEY$1 = "ArrowRight";
var TOUCHEVENT_COMPAT_WAIT = 500;
var ORDER_NEXT = "next";
var ORDER_PREV = "prev";
var DIRECTION_LEFT = "left";
var DIRECTION_RIGHT = "right";
var EVENT_SLIDE = `slide${EVENT_KEY$8}`;
var EVENT_SLID = `slid${EVENT_KEY$8}`;
var EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
var EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
var EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
var EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
var EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
var EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
var CLASS_NAME_CAROUSEL = "carousel";
var CLASS_NAME_ACTIVE$2 = "active";
var CLASS_NAME_SLIDE = "slide";
var CLASS_NAME_END = "carousel-item-end";
var CLASS_NAME_START = "carousel-item-start";
var CLASS_NAME_NEXT = "carousel-item-next";
var CLASS_NAME_PREV = "carousel-item-prev";
var SELECTOR_ACTIVE = ".active";
var SELECTOR_ITEM = ".carousel-item";
var SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
var SELECTOR_ITEM_IMG = ".carousel-item img";
var SELECTOR_INDICATORS = ".carousel-indicators";
var SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
var SELECTOR_DATA_RIDE = "[data-bs-ride=\"carousel\"]";
var KEY_TO_DIRECTION = {
	[ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
	[ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
var Default$b = {
	interval: 5e3,
	keyboard: true,
	pause: "hover",
	ride: false,
	touch: true,
	wrap: true
};
var DefaultType$b = {
	interval: "(number|boolean)",
	keyboard: "boolean",
	pause: "(string|boolean)",
	ride: "(boolean|string)",
	touch: "boolean",
	wrap: "boolean"
};
/**
* Class definition
*/
var Carousel = class Carousel extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._interval = null;
		this._activeElement = null;
		this._isSliding = false;
		this.touchTimeout = null;
		this._swipeHelper = null;
		this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
		this._addEventListeners();
		if (this._config.ride === CLASS_NAME_CAROUSEL) this.cycle();
	}
	static get Default() {
		return Default$b;
	}
	static get DefaultType() {
		return DefaultType$b;
	}
	static get NAME() {
		return NAME$c;
	}
	next() {
		this._slide(ORDER_NEXT);
	}
	nextWhenVisible() {
		if (!document.hidden && isVisible(this._element)) this.next();
	}
	prev() {
		this._slide(ORDER_PREV);
	}
	pause() {
		if (this._isSliding) triggerTransitionEnd(this._element);
		this._clearInterval();
	}
	cycle() {
		this._clearInterval();
		this._updateInterval();
		this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
	}
	_maybeEnableCycle() {
		if (!this._config.ride) return;
		if (this._isSliding) {
			EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
			return;
		}
		this.cycle();
	}
	to(index) {
		const items = this._getItems();
		if (index > items.length - 1 || index < 0) return;
		if (this._isSliding) {
			EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
			return;
		}
		const activeIndex = this._getItemIndex(this._getActive());
		if (activeIndex === index) return;
		const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		this._slide(order, items[index]);
	}
	dispose() {
		if (this._swipeHelper) this._swipeHelper.dispose();
		super.dispose();
	}
	_configAfterMerge(config) {
		config.defaultInterval = config.interval;
		return config;
	}
	_addEventListeners() {
		if (this._config.keyboard) EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
		if (this._config.pause === "hover") {
			EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
			EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
		}
		if (this._config.touch && Swipe.isSupported()) this._addTouchEventListeners();
	}
	_addTouchEventListeners() {
		for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
		const endCallBack = () => {
			if (this._config.pause !== "hover") return;
			this.pause();
			if (this.touchTimeout) clearTimeout(this.touchTimeout);
			this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		};
		const swipeConfig = {
			leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
			rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
			endCallback: endCallBack
		};
		this._swipeHelper = new Swipe(this._element, swipeConfig);
	}
	_keydown(event) {
		if (/input|textarea/i.test(event.target.tagName)) return;
		const direction = KEY_TO_DIRECTION[event.key];
		if (direction) {
			event.preventDefault();
			this._slide(this._directionToOrder(direction));
		}
	}
	_getItemIndex(element) {
		return this._getItems().indexOf(element);
	}
	_setActiveIndicatorElement(index) {
		if (!this._indicatorsElement) return;
		const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
		activeIndicator.removeAttribute("aria-current");
		const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		if (newActiveIndicator) {
			newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
			newActiveIndicator.setAttribute("aria-current", "true");
		}
	}
	_updateInterval() {
		const element = this._activeElement || this._getActive();
		if (!element) return;
		const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
		this._config.interval = elementInterval || this._config.defaultInterval;
	}
	_slide(order, element = null) {
		if (this._isSliding) return;
		const activeElement = this._getActive();
		const isNext = order === ORDER_NEXT;
		const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		if (nextElement === activeElement) return;
		const nextElementIndex = this._getItemIndex(nextElement);
		const triggerEvent = (eventName) => {
			return EventHandler.trigger(this._element, eventName, {
				relatedTarget: nextElement,
				direction: this._orderToDirection(order),
				from: this._getItemIndex(activeElement),
				to: nextElementIndex
			});
		};
		if (triggerEvent(EVENT_SLIDE).defaultPrevented) return;
		if (!activeElement || !nextElement) return;
		const isCycling = Boolean(this._interval);
		this.pause();
		this._isSliding = true;
		this._setActiveIndicatorElement(nextElementIndex);
		this._activeElement = nextElement;
		const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		nextElement.classList.add(orderClassName);
		reflow(nextElement);
		activeElement.classList.add(directionalClassName);
		nextElement.classList.add(directionalClassName);
		const completeCallBack = () => {
			nextElement.classList.remove(directionalClassName, orderClassName);
			nextElement.classList.add(CLASS_NAME_ACTIVE$2);
			activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
			this._isSliding = false;
			triggerEvent(EVENT_SLID);
		};
		this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		if (isCycling) this.cycle();
	}
	_isAnimated() {
		return this._element.classList.contains(CLASS_NAME_SLIDE);
	}
	_getActive() {
		return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
	}
	_getItems() {
		return SelectorEngine.find(SELECTOR_ITEM, this._element);
	}
	_clearInterval() {
		if (this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
	}
	_directionToOrder(direction) {
		if (isRTL()) return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	}
	_orderToDirection(order) {
		if (isRTL()) return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Carousel.getOrCreateInstance(this, config);
			if (typeof config === "number") {
				data.to(config);
				return;
			}
			if (typeof config === "string") {
				if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
				data[config]();
			}
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function(event) {
	const target = SelectorEngine.getElementFromSelector(this);
	if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) return;
	event.preventDefault();
	const carousel = Carousel.getOrCreateInstance(target);
	const slideIndex = this.getAttribute("data-bs-slide-to");
	if (slideIndex) {
		carousel.to(slideIndex);
		carousel._maybeEnableCycle();
		return;
	}
	if (Manipulator.getDataAttribute(this, "slide") === "next") {
		carousel.next();
		carousel._maybeEnableCycle();
		return;
	}
	carousel.prev();
	carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
	const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
	for (const carousel of carousels) Carousel.getOrCreateInstance(carousel);
});
/**
* jQuery
*/
defineJQueryPlugin(Carousel);
/**
* --------------------------------------------------------------------------
* Bootstrap collapse.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$b = "collapse";
var EVENT_KEY$7 = `.bs.collapse`;
var DATA_API_KEY$4 = ".data-api";
var EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
var EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
var EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
var EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
var EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
var CLASS_NAME_SHOW$7 = "show";
var CLASS_NAME_COLLAPSE = "collapse";
var CLASS_NAME_COLLAPSING = "collapsing";
var CLASS_NAME_COLLAPSED = "collapsed";
var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
var WIDTH = "width";
var HEIGHT = "height";
var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
var SELECTOR_DATA_TOGGLE$4 = "[data-bs-toggle=\"collapse\"]";
var Default$a = {
	parent: null,
	toggle: true
};
var DefaultType$a = {
	parent: "(null|element)",
	toggle: "boolean"
};
/**
* Class definition
*/
var Collapse = class Collapse extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._isTransitioning = false;
		this._triggerArray = [];
		const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
		for (const elem of toggleList) {
			const selector = SelectorEngine.getSelectorFromElement(elem);
			const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
			if (selector !== null && filterElement.length) this._triggerArray.push(elem);
		}
		this._initializeChildren();
		if (!this._config.parent) this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		if (this._config.toggle) this.toggle();
	}
	static get Default() {
		return Default$a;
	}
	static get DefaultType() {
		return DefaultType$a;
	}
	static get NAME() {
		return NAME$b;
	}
	toggle() {
		if (this._isShown()) this.hide();
		else this.show();
	}
	show() {
		if (this._isTransitioning || this._isShown()) return;
		let activeChildren = [];
		if (this._config.parent) activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => Collapse.getOrCreateInstance(element, { toggle: false }));
		if (activeChildren.length && activeChildren[0]._isTransitioning) return;
		if (EventHandler.trigger(this._element, EVENT_SHOW$6).defaultPrevented) return;
		for (const activeInstance of activeChildren) activeInstance.hide();
		const dimension = this._getDimension();
		this._element.classList.remove(CLASS_NAME_COLLAPSE);
		this._element.classList.add(CLASS_NAME_COLLAPSING);
		this._element.style[dimension] = 0;
		this._addAriaAndCollapsedClass(this._triggerArray, true);
		this._isTransitioning = true;
		const complete = () => {
			this._isTransitioning = false;
			this._element.classList.remove(CLASS_NAME_COLLAPSING);
			this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
			this._element.style[dimension] = "";
			EventHandler.trigger(this._element, EVENT_SHOWN$6);
		};
		const scrollSize = `scroll${dimension[0].toUpperCase() + dimension.slice(1)}`;
		this._queueCallback(complete, this._element, true);
		this._element.style[dimension] = `${this._element[scrollSize]}px`;
	}
	hide() {
		if (this._isTransitioning || !this._isShown()) return;
		if (EventHandler.trigger(this._element, EVENT_HIDE$6).defaultPrevented) return;
		const dimension = this._getDimension();
		this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		reflow(this._element);
		this._element.classList.add(CLASS_NAME_COLLAPSING);
		this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
		for (const trigger of this._triggerArray) {
			const element = SelectorEngine.getElementFromSelector(trigger);
			if (element && !this._isShown(element)) this._addAriaAndCollapsedClass([trigger], false);
		}
		this._isTransitioning = true;
		const complete = () => {
			this._isTransitioning = false;
			this._element.classList.remove(CLASS_NAME_COLLAPSING);
			this._element.classList.add(CLASS_NAME_COLLAPSE);
			EventHandler.trigger(this._element, EVENT_HIDDEN$6);
		};
		this._element.style[dimension] = "";
		this._queueCallback(complete, this._element, true);
	}
	_isShown(element = this._element) {
		return element.classList.contains(CLASS_NAME_SHOW$7);
	}
	_configAfterMerge(config) {
		config.toggle = Boolean(config.toggle);
		config.parent = getElement(config.parent);
		return config;
	}
	_getDimension() {
		return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	}
	_initializeChildren() {
		if (!this._config.parent) return;
		const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
		for (const element of children) {
			const selected = SelectorEngine.getElementFromSelector(element);
			if (selected) this._addAriaAndCollapsedClass([element], this._isShown(selected));
		}
	}
	_getFirstLevelChildren(selector) {
		const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
		return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
	}
	_addAriaAndCollapsedClass(triggerArray, isOpen) {
		if (!triggerArray.length) return;
		for (const element of triggerArray) {
			element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
			element.setAttribute("aria-expanded", isOpen);
		}
	}
	static jQueryInterface(config) {
		const _config = {};
		if (typeof config === "string" && /show|hide/.test(config)) _config.toggle = false;
		return this.each(function() {
			const data = Collapse.getOrCreateInstance(this, _config);
			if (typeof config === "string") {
				if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
				data[config]();
			}
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
	if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") event.preventDefault();
	for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) Collapse.getOrCreateInstance(element, { toggle: false }).toggle();
});
/**
* jQuery
*/
defineJQueryPlugin(Collapse);
/**
* --------------------------------------------------------------------------
* Bootstrap dropdown.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$a = "dropdown";
var EVENT_KEY$6 = `.bs.dropdown`;
var DATA_API_KEY$3 = ".data-api";
var ESCAPE_KEY$2 = "Escape";
var TAB_KEY$1 = "Tab";
var ARROW_UP_KEY$1 = "ArrowUp";
var ARROW_DOWN_KEY$1 = "ArrowDown";
var RIGHT_MOUSE_BUTTON = 2;
var EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
var EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
var EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
var EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
var EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
var CLASS_NAME_SHOW$6 = "show";
var CLASS_NAME_DROPUP = "dropup";
var CLASS_NAME_DROPEND = "dropend";
var CLASS_NAME_DROPSTART = "dropstart";
var CLASS_NAME_DROPUP_CENTER = "dropup-center";
var CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
var SELECTOR_DATA_TOGGLE$3 = "[data-bs-toggle=\"dropdown\"]:not(.disabled):not(:disabled)";
var SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
var SELECTOR_MENU = ".dropdown-menu";
var SELECTOR_NAVBAR = ".navbar";
var SELECTOR_NAVBAR_NAV = ".navbar-nav";
var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
var PLACEMENT_TOPCENTER = "top";
var PLACEMENT_BOTTOMCENTER = "bottom";
var Default$9 = {
	autoClose: true,
	boundary: "clippingParents",
	display: "dynamic",
	offset: [0, 2],
	popperConfig: null,
	reference: "toggle"
};
var DefaultType$9 = {
	autoClose: "(boolean|string)",
	boundary: "(string|element)",
	display: "string",
	offset: "(array|string|function)",
	popperConfig: "(null|object|function)",
	reference: "(string|element|object)"
};
/**
* Class definition
*/
var Dropdown = class Dropdown extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._popper = null;
		this._parent = this._element.parentNode;
		this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
		this._inNavbar = this._detectNavbar();
	}
	static get Default() {
		return Default$9;
	}
	static get DefaultType() {
		return DefaultType$9;
	}
	static get NAME() {
		return NAME$a;
	}
	toggle() {
		return this._isShown() ? this.hide() : this.show();
	}
	show() {
		if (isDisabled(this._element) || this._isShown()) return;
		const relatedTarget = { relatedTarget: this._element };
		if (EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget).defaultPrevented) return;
		this._createPopper();
		if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) for (const element of [].concat(...document.body.children)) EventHandler.on(element, "mouseover", noop);
		this._element.focus();
		this._element.setAttribute("aria-expanded", true);
		this._menu.classList.add(CLASS_NAME_SHOW$6);
		this._element.classList.add(CLASS_NAME_SHOW$6);
		EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
	}
	hide() {
		if (isDisabled(this._element) || !this._isShown()) return;
		const relatedTarget = { relatedTarget: this._element };
		this._completeHide(relatedTarget);
	}
	dispose() {
		if (this._popper) this._popper.destroy();
		super.dispose();
	}
	update() {
		this._inNavbar = this._detectNavbar();
		if (this._popper) this._popper.update();
	}
	_completeHide(relatedTarget) {
		if (EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget).defaultPrevented) return;
		if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.off(element, "mouseover", noop);
		if (this._popper) this._popper.destroy();
		this._menu.classList.remove(CLASS_NAME_SHOW$6);
		this._element.classList.remove(CLASS_NAME_SHOW$6);
		this._element.setAttribute("aria-expanded", "false");
		Manipulator.removeDataAttribute(this._menu, "popper");
		EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
	}
	_getConfig(config) {
		config = super._getConfig(config);
		if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		return config;
	}
	_createPopper() {
		if (typeof lib_exports === "undefined") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
		let referenceElement = this._element;
		if (this._config.reference === "parent") referenceElement = this._parent;
		else if (isElement(this._config.reference)) referenceElement = getElement(this._config.reference);
		else if (typeof this._config.reference === "object") referenceElement = this._config.reference;
		const popperConfig = this._getPopperConfig();
		this._popper = createPopper(referenceElement, this._menu, popperConfig);
	}
	_isShown() {
		return this._menu.classList.contains(CLASS_NAME_SHOW$6);
	}
	_getPlacement() {
		const parentDropdown = this._parent;
		if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) return PLACEMENT_RIGHT;
		if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) return PLACEMENT_LEFT;
		if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) return PLACEMENT_TOPCENTER;
		if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) return PLACEMENT_BOTTOMCENTER;
		const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
		if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	}
	_detectNavbar() {
		return this._element.closest(SELECTOR_NAVBAR) !== null;
	}
	_getOffset() {
		const { offset } = this._config;
		if (typeof offset === "string") return offset.split(",").map((value) => Number.parseInt(value, 10));
		if (typeof offset === "function") return (popperData) => offset(popperData, this._element);
		return offset;
	}
	_getPopperConfig() {
		const defaultBsPopperConfig = {
			placement: this._getPlacement(),
			modifiers: [{
				name: "preventOverflow",
				options: { boundary: this._config.boundary }
			}, {
				name: "offset",
				options: { offset: this._getOffset() }
			}]
		};
		if (this._inNavbar || this._config.display === "static") {
			Manipulator.setDataAttribute(this._menu, "popper", "static");
			defaultBsPopperConfig.modifiers = [{
				name: "applyStyles",
				enabled: false
			}];
		}
		return {
			...defaultBsPopperConfig,
			...execute(this._config.popperConfig, [void 0, defaultBsPopperConfig])
		};
	}
	_selectMenuItem({ key, target }) {
		const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
		if (!items.length) return;
		getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Dropdown.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
			data[config]();
		});
	}
	static clearMenus(event) {
		if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) return;
		const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
		for (const toggle of openToggles) {
			const context = Dropdown.getInstance(toggle);
			if (!context || context._config.autoClose === false) continue;
			const composedPath = event.composedPath();
			const isMenuTarget = composedPath.includes(context._menu);
			if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) continue;
			if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) continue;
			const relatedTarget = { relatedTarget: context._element };
			if (event.type === "click") relatedTarget.clickEvent = event;
			context._completeHide(relatedTarget);
		}
	}
	static dataApiKeydownHandler(event) {
		const isInput = /input|textarea/i.test(event.target.tagName);
		const isEscapeEvent = event.key === ESCAPE_KEY$2;
		const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
		if (!isUpOrDownEvent && !isEscapeEvent) return;
		if (isInput && !isEscapeEvent) return;
		event.preventDefault();
		const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
		const instance = Dropdown.getOrCreateInstance(getToggleButton);
		if (isUpOrDownEvent) {
			event.stopPropagation();
			instance.show();
			instance._selectMenuItem(event);
			return;
		}
		if (instance._isShown()) {
			event.stopPropagation();
			instance.hide();
			getToggleButton.focus();
		}
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
	event.preventDefault();
	Dropdown.getOrCreateInstance(this).toggle();
});
/**
* jQuery
*/
defineJQueryPlugin(Dropdown);
/**
* --------------------------------------------------------------------------
* Bootstrap util/backdrop.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$9 = "backdrop";
var CLASS_NAME_FADE$4 = "fade";
var CLASS_NAME_SHOW$5 = "show";
var EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
var Default$8 = {
	className: "modal-backdrop",
	clickCallback: null,
	isAnimated: false,
	isVisible: true,
	rootElement: "body"
};
var DefaultType$8 = {
	className: "string",
	clickCallback: "(function|null)",
	isAnimated: "boolean",
	isVisible: "boolean",
	rootElement: "(element|string)"
};
/**
* Class definition
*/
var Backdrop = class extends Config {
	constructor(config) {
		super();
		this._config = this._getConfig(config);
		this._isAppended = false;
		this._element = null;
	}
	static get Default() {
		return Default$8;
	}
	static get DefaultType() {
		return DefaultType$8;
	}
	static get NAME() {
		return NAME$9;
	}
	show(callback) {
		if (!this._config.isVisible) {
			execute(callback);
			return;
		}
		this._append();
		const element = this._getElement();
		if (this._config.isAnimated) reflow(element);
		element.classList.add(CLASS_NAME_SHOW$5);
		this._emulateAnimation(() => {
			execute(callback);
		});
	}
	hide(callback) {
		if (!this._config.isVisible) {
			execute(callback);
			return;
		}
		this._getElement().classList.remove(CLASS_NAME_SHOW$5);
		this._emulateAnimation(() => {
			this.dispose();
			execute(callback);
		});
	}
	dispose() {
		if (!this._isAppended) return;
		EventHandler.off(this._element, EVENT_MOUSEDOWN);
		this._element.remove();
		this._isAppended = false;
	}
	_getElement() {
		if (!this._element) {
			const backdrop = document.createElement("div");
			backdrop.className = this._config.className;
			if (this._config.isAnimated) backdrop.classList.add(CLASS_NAME_FADE$4);
			this._element = backdrop;
		}
		return this._element;
	}
	_configAfterMerge(config) {
		config.rootElement = getElement(config.rootElement);
		return config;
	}
	_append() {
		if (this._isAppended) return;
		const element = this._getElement();
		this._config.rootElement.append(element);
		EventHandler.on(element, EVENT_MOUSEDOWN, () => {
			execute(this._config.clickCallback);
		});
		this._isAppended = true;
	}
	_emulateAnimation(callback) {
		executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap util/focustrap.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$8 = "focustrap";
var EVENT_KEY$5 = `.bs.focustrap`;
var EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
var TAB_KEY = "Tab";
var TAB_NAV_FORWARD = "forward";
var TAB_NAV_BACKWARD = "backward";
var Default$7 = {
	autofocus: true,
	trapElement: null
};
var DefaultType$7 = {
	autofocus: "boolean",
	trapElement: "element"
};
/**
* Class definition
*/
var FocusTrap = class extends Config {
	constructor(config) {
		super();
		this._config = this._getConfig(config);
		this._isActive = false;
		this._lastTabNavDirection = null;
	}
	static get Default() {
		return Default$7;
	}
	static get DefaultType() {
		return DefaultType$7;
	}
	static get NAME() {
		return NAME$8;
	}
	activate() {
		if (this._isActive) return;
		if (this._config.autofocus) this._config.trapElement.focus();
		EventHandler.off(document, EVENT_KEY$5);
		EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
		EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
		this._isActive = true;
	}
	deactivate() {
		if (!this._isActive) return;
		this._isActive = false;
		EventHandler.off(document, EVENT_KEY$5);
	}
	_handleFocusin(event) {
		const { trapElement } = this._config;
		if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) return;
		const elements = SelectorEngine.focusableChildren(trapElement);
		if (elements.length === 0) trapElement.focus();
		else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) elements[elements.length - 1].focus();
		else elements[0].focus();
	}
	_handleKeydown(event) {
		if (event.key !== TAB_KEY) return;
		this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap util/scrollBar.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
var SELECTOR_STICKY_CONTENT = ".sticky-top";
var PROPERTY_PADDING = "padding-right";
var PROPERTY_MARGIN = "margin-right";
/**
* Class definition
*/
var ScrollBarHelper = class {
	constructor() {
		this._element = document.body;
	}
	getWidth() {
		const documentWidth = document.documentElement.clientWidth;
		return Math.abs(window.innerWidth - documentWidth);
	}
	hide() {
		const width = this.getWidth();
		this._disableOverFlow();
		this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
		this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
		this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
	}
	reset() {
		this._resetElementAttributes(this._element, "overflow");
		this._resetElementAttributes(this._element, PROPERTY_PADDING);
		this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
		this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
	}
	isOverflowing() {
		return this.getWidth() > 0;
	}
	_disableOverFlow() {
		this._saveInitialAttribute(this._element, "overflow");
		this._element.style.overflow = "hidden";
	}
	_setElementAttributes(selector, styleProperty, callback) {
		const scrollbarWidth = this.getWidth();
		const manipulationCallBack = (element) => {
			if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) return;
			this._saveInitialAttribute(element, styleProperty);
			const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
		};
		this._applyManipulationCallback(selector, manipulationCallBack);
	}
	_saveInitialAttribute(element, styleProperty) {
		const actualValue = element.style.getPropertyValue(styleProperty);
		if (actualValue) Manipulator.setDataAttribute(element, styleProperty, actualValue);
	}
	_resetElementAttributes(selector, styleProperty) {
		const manipulationCallBack = (element) => {
			const value = Manipulator.getDataAttribute(element, styleProperty);
			if (value === null) {
				element.style.removeProperty(styleProperty);
				return;
			}
			Manipulator.removeDataAttribute(element, styleProperty);
			element.style.setProperty(styleProperty, value);
		};
		this._applyManipulationCallback(selector, manipulationCallBack);
	}
	_applyManipulationCallback(selector, callBack) {
		if (isElement(selector)) {
			callBack(selector);
			return;
		}
		for (const sel of SelectorEngine.find(selector, this._element)) callBack(sel);
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap modal.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$7 = "modal";
var EVENT_KEY$4 = `.bs.modal`;
var DATA_API_KEY$2 = ".data-api";
var ESCAPE_KEY$1 = "Escape";
var EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
var EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
var EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
var EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
var EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
var EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
var EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
var EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
var EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
var EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
var CLASS_NAME_OPEN = "modal-open";
var CLASS_NAME_FADE$3 = "fade";
var CLASS_NAME_SHOW$4 = "show";
var CLASS_NAME_STATIC = "modal-static";
var OPEN_SELECTOR$1 = ".modal.show";
var SELECTOR_DIALOG = ".modal-dialog";
var SELECTOR_MODAL_BODY = ".modal-body";
var SELECTOR_DATA_TOGGLE$2 = "[data-bs-toggle=\"modal\"]";
var Default$6 = {
	backdrop: true,
	focus: true,
	keyboard: true
};
var DefaultType$6 = {
	backdrop: "(boolean|string)",
	focus: "boolean",
	keyboard: "boolean"
};
/**
* Class definition
*/
var Modal = class Modal extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
		this._backdrop = this._initializeBackDrop();
		this._focustrap = this._initializeFocusTrap();
		this._isShown = false;
		this._isTransitioning = false;
		this._scrollBar = new ScrollBarHelper();
		this._addEventListeners();
	}
	static get Default() {
		return Default$6;
	}
	static get DefaultType() {
		return DefaultType$6;
	}
	static get NAME() {
		return NAME$7;
	}
	toggle(relatedTarget) {
		return this._isShown ? this.hide() : this.show(relatedTarget);
	}
	show(relatedTarget) {
		if (this._isShown || this._isTransitioning) return;
		if (EventHandler.trigger(this._element, EVENT_SHOW$4, { relatedTarget }).defaultPrevented) return;
		this._isShown = true;
		this._isTransitioning = true;
		this._scrollBar.hide();
		document.body.classList.add(CLASS_NAME_OPEN);
		this._adjustDialog();
		this._backdrop.show(() => this._showElement(relatedTarget));
	}
	hide() {
		if (!this._isShown || this._isTransitioning) return;
		if (EventHandler.trigger(this._element, EVENT_HIDE$4).defaultPrevented) return;
		this._isShown = false;
		this._isTransitioning = true;
		this._focustrap.deactivate();
		this._element.classList.remove(CLASS_NAME_SHOW$4);
		this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
	}
	dispose() {
		EventHandler.off(window, EVENT_KEY$4);
		EventHandler.off(this._dialog, EVENT_KEY$4);
		this._backdrop.dispose();
		this._focustrap.deactivate();
		super.dispose();
	}
	handleUpdate() {
		this._adjustDialog();
	}
	_initializeBackDrop() {
		return new Backdrop({
			isVisible: Boolean(this._config.backdrop),
			isAnimated: this._isAnimated()
		});
	}
	_initializeFocusTrap() {
		return new FocusTrap({ trapElement: this._element });
	}
	_showElement(relatedTarget) {
		if (!document.body.contains(this._element)) document.body.append(this._element);
		this._element.style.display = "block";
		this._element.removeAttribute("aria-hidden");
		this._element.setAttribute("aria-modal", true);
		this._element.setAttribute("role", "dialog");
		this._element.scrollTop = 0;
		const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
		if (modalBody) modalBody.scrollTop = 0;
		reflow(this._element);
		this._element.classList.add(CLASS_NAME_SHOW$4);
		const transitionComplete = () => {
			if (this._config.focus) this._focustrap.activate();
			this._isTransitioning = false;
			EventHandler.trigger(this._element, EVENT_SHOWN$4, { relatedTarget });
		};
		this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
	}
	_addEventListeners() {
		EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
			if (event.key !== ESCAPE_KEY$1) return;
			if (this._config.keyboard) {
				this.hide();
				return;
			}
			this._triggerBackdropTransition();
		});
		EventHandler.on(window, EVENT_RESIZE$1, () => {
			if (this._isShown && !this._isTransitioning) this._adjustDialog();
		});
		EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
			EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
				if (this._element !== event.target || this._element !== event2.target) return;
				if (this._config.backdrop === "static") {
					this._triggerBackdropTransition();
					return;
				}
				if (this._config.backdrop) this.hide();
			});
		});
	}
	_hideModal() {
		this._element.style.display = "none";
		this._element.setAttribute("aria-hidden", true);
		this._element.removeAttribute("aria-modal");
		this._element.removeAttribute("role");
		this._isTransitioning = false;
		this._backdrop.hide(() => {
			document.body.classList.remove(CLASS_NAME_OPEN);
			this._resetAdjustments();
			this._scrollBar.reset();
			EventHandler.trigger(this._element, EVENT_HIDDEN$4);
		});
	}
	_isAnimated() {
		return this._element.classList.contains(CLASS_NAME_FADE$3);
	}
	_triggerBackdropTransition() {
		if (EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1).defaultPrevented) return;
		const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		const initialOverflowY = this._element.style.overflowY;
		if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) return;
		if (!isModalOverflowing) this._element.style.overflowY = "hidden";
		this._element.classList.add(CLASS_NAME_STATIC);
		this._queueCallback(() => {
			this._element.classList.remove(CLASS_NAME_STATIC);
			this._queueCallback(() => {
				this._element.style.overflowY = initialOverflowY;
			}, this._dialog);
		}, this._dialog);
		this._element.focus();
	}
	/**
	* The following methods are used to handle overflowing modals
	*/
	_adjustDialog() {
		const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		const scrollbarWidth = this._scrollBar.getWidth();
		const isBodyOverflowing = scrollbarWidth > 0;
		if (isBodyOverflowing && !isModalOverflowing) {
			const property = isRTL() ? "paddingLeft" : "paddingRight";
			this._element.style[property] = `${scrollbarWidth}px`;
		}
		if (!isBodyOverflowing && isModalOverflowing) {
			const property = isRTL() ? "paddingRight" : "paddingLeft";
			this._element.style[property] = `${scrollbarWidth}px`;
		}
	}
	_resetAdjustments() {
		this._element.style.paddingLeft = "";
		this._element.style.paddingRight = "";
	}
	static jQueryInterface(config, relatedTarget) {
		return this.each(function() {
			const data = Modal.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
			data[config](relatedTarget);
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
	const target = SelectorEngine.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName)) event.preventDefault();
	EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
		if (showEvent.defaultPrevented) return;
		EventHandler.one(target, EVENT_HIDDEN$4, () => {
			if (isVisible(this)) this.focus();
		});
	});
	const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
	if (alreadyOpen) Modal.getInstance(alreadyOpen).hide();
	Modal.getOrCreateInstance(target).toggle(this);
});
enableDismissTrigger(Modal);
/**
* jQuery
*/
defineJQueryPlugin(Modal);
/**
* --------------------------------------------------------------------------
* Bootstrap offcanvas.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$6 = "offcanvas";
var EVENT_KEY$3 = `.bs.offcanvas`;
var DATA_API_KEY$1 = ".data-api";
var EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
var ESCAPE_KEY = "Escape";
var CLASS_NAME_SHOW$3 = "show";
var CLASS_NAME_SHOWING$1 = "showing";
var CLASS_NAME_HIDING = "hiding";
var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
var OPEN_SELECTOR = ".offcanvas.show";
var EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
var EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
var EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
var EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
var EVENT_RESIZE = `resize${EVENT_KEY$3}`;
var EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
var SELECTOR_DATA_TOGGLE$1 = "[data-bs-toggle=\"offcanvas\"]";
var Default$5 = {
	backdrop: true,
	keyboard: true,
	scroll: false
};
var DefaultType$5 = {
	backdrop: "(boolean|string)",
	keyboard: "boolean",
	scroll: "boolean"
};
/**
* Class definition
*/
var Offcanvas = class Offcanvas extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._isShown = false;
		this._backdrop = this._initializeBackDrop();
		this._focustrap = this._initializeFocusTrap();
		this._addEventListeners();
	}
	static get Default() {
		return Default$5;
	}
	static get DefaultType() {
		return DefaultType$5;
	}
	static get NAME() {
		return NAME$6;
	}
	toggle(relatedTarget) {
		return this._isShown ? this.hide() : this.show(relatedTarget);
	}
	show(relatedTarget) {
		if (this._isShown) return;
		if (EventHandler.trigger(this._element, EVENT_SHOW$3, { relatedTarget }).defaultPrevented) return;
		this._isShown = true;
		this._backdrop.show();
		if (!this._config.scroll) new ScrollBarHelper().hide();
		this._element.setAttribute("aria-modal", true);
		this._element.setAttribute("role", "dialog");
		this._element.classList.add(CLASS_NAME_SHOWING$1);
		const completeCallBack = () => {
			if (!this._config.scroll || this._config.backdrop) this._focustrap.activate();
			this._element.classList.add(CLASS_NAME_SHOW$3);
			this._element.classList.remove(CLASS_NAME_SHOWING$1);
			EventHandler.trigger(this._element, EVENT_SHOWN$3, { relatedTarget });
		};
		this._queueCallback(completeCallBack, this._element, true);
	}
	hide() {
		if (!this._isShown) return;
		if (EventHandler.trigger(this._element, EVENT_HIDE$3).defaultPrevented) return;
		this._focustrap.deactivate();
		this._element.blur();
		this._isShown = false;
		this._element.classList.add(CLASS_NAME_HIDING);
		this._backdrop.hide();
		const completeCallback = () => {
			this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
			this._element.removeAttribute("aria-modal");
			this._element.removeAttribute("role");
			if (!this._config.scroll) new ScrollBarHelper().reset();
			EventHandler.trigger(this._element, EVENT_HIDDEN$3);
		};
		this._queueCallback(completeCallback, this._element, true);
	}
	dispose() {
		this._backdrop.dispose();
		this._focustrap.deactivate();
		super.dispose();
	}
	_initializeBackDrop() {
		const clickCallback = () => {
			if (this._config.backdrop === "static") {
				EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
				return;
			}
			this.hide();
		};
		const isVisible = Boolean(this._config.backdrop);
		return new Backdrop({
			className: CLASS_NAME_BACKDROP,
			isVisible,
			isAnimated: true,
			rootElement: this._element.parentNode,
			clickCallback: isVisible ? clickCallback : null
		});
	}
	_initializeFocusTrap() {
		return new FocusTrap({ trapElement: this._element });
	}
	_addEventListeners() {
		EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
			if (event.key !== ESCAPE_KEY) return;
			if (this._config.keyboard) {
				this.hide();
				return;
			}
			EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
		});
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Offcanvas.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
			data[config](this);
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
	const target = SelectorEngine.getElementFromSelector(this);
	if (["A", "AREA"].includes(this.tagName)) event.preventDefault();
	if (isDisabled(this)) return;
	EventHandler.one(target, EVENT_HIDDEN$3, () => {
		if (isVisible(this)) this.focus();
	});
	const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
	if (alreadyOpen && alreadyOpen !== target) Offcanvas.getInstance(alreadyOpen).hide();
	Offcanvas.getOrCreateInstance(target).toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
	for (const selector of SelectorEngine.find(OPEN_SELECTOR)) Offcanvas.getOrCreateInstance(selector).show();
});
EventHandler.on(window, EVENT_RESIZE, () => {
	for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) if (getComputedStyle(element).position !== "fixed") Offcanvas.getOrCreateInstance(element).hide();
});
enableDismissTrigger(Offcanvas);
/**
* jQuery
*/
defineJQueryPlugin(Offcanvas);
var DefaultAllowlist = {
	"*": [
		"class",
		"dir",
		"id",
		"lang",
		"role",
		/^aria-[\w-]*$/i
	],
	a: [
		"target",
		"href",
		"title",
		"rel"
	],
	area: [],
	b: [],
	br: [],
	col: [],
	code: [],
	dd: [],
	div: [],
	dl: [],
	dt: [],
	em: [],
	hr: [],
	h1: [],
	h2: [],
	h3: [],
	h4: [],
	h5: [],
	h6: [],
	i: [],
	img: [
		"src",
		"srcset",
		"alt",
		"title",
		"width",
		"height"
	],
	li: [],
	ol: [],
	p: [],
	pre: [],
	s: [],
	small: [],
	span: [],
	sub: [],
	sup: [],
	strong: [],
	u: [],
	ul: []
};
var uriAttributes = /* @__PURE__ */ new Set([
	"background",
	"cite",
	"href",
	"itemtype",
	"longdesc",
	"poster",
	"src",
	"xlink:href"
]);
/**
* A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
* contexts.
*
* Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
*/
var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
var allowedAttribute = (attribute, allowedAttributeList) => {
	const attributeName = attribute.nodeName.toLowerCase();
	if (allowedAttributeList.includes(attributeName)) {
		if (uriAttributes.has(attributeName)) return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
		return true;
	}
	return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
	if (!unsafeHtml.length) return unsafeHtml;
	if (sanitizeFunction && typeof sanitizeFunction === "function") return sanitizeFunction(unsafeHtml);
	const createdDocument = new window.DOMParser().parseFromString(unsafeHtml, "text/html");
	const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
	for (const element of elements) {
		const elementName = element.nodeName.toLowerCase();
		if (!Object.keys(allowList).includes(elementName)) {
			element.remove();
			continue;
		}
		const attributeList = [].concat(...element.attributes);
		const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
		for (const attribute of attributeList) if (!allowedAttribute(attribute, allowedAttributes)) element.removeAttribute(attribute.nodeName);
	}
	return createdDocument.body.innerHTML;
}
/**
* --------------------------------------------------------------------------
* Bootstrap util/template-factory.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$5 = "TemplateFactory";
var Default$4 = {
	allowList: DefaultAllowlist,
	content: {},
	extraClass: "",
	html: false,
	sanitize: true,
	sanitizeFn: null,
	template: "<div></div>"
};
var DefaultType$4 = {
	allowList: "object",
	content: "object",
	extraClass: "(string|function)",
	html: "boolean",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	template: "string"
};
var DefaultContentType = {
	entry: "(string|element|function|null)",
	selector: "(string|element)"
};
/**
* Class definition
*/
var TemplateFactory = class extends Config {
	constructor(config) {
		super();
		this._config = this._getConfig(config);
	}
	static get Default() {
		return Default$4;
	}
	static get DefaultType() {
		return DefaultType$4;
	}
	static get NAME() {
		return NAME$5;
	}
	getContent() {
		return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
	}
	hasContent() {
		return this.getContent().length > 0;
	}
	changeContent(content) {
		this._checkContent(content);
		this._config.content = {
			...this._config.content,
			...content
		};
		return this;
	}
	toHtml() {
		const templateWrapper = document.createElement("div");
		templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
		for (const [selector, text] of Object.entries(this._config.content)) this._setContent(templateWrapper, text, selector);
		const template = templateWrapper.children[0];
		const extraClass = this._resolvePossibleFunction(this._config.extraClass);
		if (extraClass) template.classList.add(...extraClass.split(" "));
		return template;
	}
	_typeCheckConfig(config) {
		super._typeCheckConfig(config);
		this._checkContent(config.content);
	}
	_checkContent(arg) {
		for (const [selector, content] of Object.entries(arg)) super._typeCheckConfig({
			selector,
			entry: content
		}, DefaultContentType);
	}
	_setContent(template, content, selector) {
		const templateElement = SelectorEngine.findOne(selector, template);
		if (!templateElement) return;
		content = this._resolvePossibleFunction(content);
		if (!content) {
			templateElement.remove();
			return;
		}
		if (isElement(content)) {
			this._putElementInTemplate(getElement(content), templateElement);
			return;
		}
		if (this._config.html) {
			templateElement.innerHTML = this._maybeSanitize(content);
			return;
		}
		templateElement.textContent = content;
	}
	_maybeSanitize(arg) {
		return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
	}
	_resolvePossibleFunction(arg) {
		return execute(arg, [void 0, this]);
	}
	_putElementInTemplate(element, templateElement) {
		if (this._config.html) {
			templateElement.innerHTML = "";
			templateElement.append(element);
			return;
		}
		templateElement.textContent = element.textContent;
	}
};
/**
* --------------------------------------------------------------------------
* Bootstrap tooltip.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$4 = "tooltip";
var DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set([
	"sanitize",
	"allowList",
	"sanitizeFn"
]);
var CLASS_NAME_FADE$2 = "fade";
var CLASS_NAME_MODAL = "modal";
var CLASS_NAME_SHOW$2 = "show";
var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
var SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
var EVENT_MODAL_HIDE = "hide.bs.modal";
var TRIGGER_HOVER = "hover";
var TRIGGER_FOCUS = "focus";
var TRIGGER_CLICK = "click";
var TRIGGER_MANUAL = "manual";
var EVENT_HIDE$2 = "hide";
var EVENT_HIDDEN$2 = "hidden";
var EVENT_SHOW$2 = "show";
var EVENT_SHOWN$2 = "shown";
var EVENT_INSERTED = "inserted";
var EVENT_CLICK$1 = "click";
var EVENT_FOCUSIN$1 = "focusin";
var EVENT_FOCUSOUT$1 = "focusout";
var EVENT_MOUSEENTER = "mouseenter";
var EVENT_MOUSELEAVE = "mouseleave";
var AttachmentMap = {
	AUTO: "auto",
	TOP: "top",
	RIGHT: isRTL() ? "left" : "right",
	BOTTOM: "bottom",
	LEFT: isRTL() ? "right" : "left"
};
var Default$3 = {
	allowList: DefaultAllowlist,
	animation: true,
	boundary: "clippingParents",
	container: false,
	customClass: "",
	delay: 0,
	fallbackPlacements: [
		"top",
		"right",
		"bottom",
		"left"
	],
	html: false,
	offset: [0, 6],
	placement: "top",
	popperConfig: null,
	sanitize: true,
	sanitizeFn: null,
	selector: false,
	template: "<div class=\"tooltip\" role=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
	title: "",
	trigger: "hover focus"
};
var DefaultType$3 = {
	allowList: "object",
	animation: "boolean",
	boundary: "(string|element)",
	container: "(string|element|boolean)",
	customClass: "(string|function)",
	delay: "(number|object)",
	fallbackPlacements: "array",
	html: "boolean",
	offset: "(array|string|function)",
	placement: "(string|function)",
	popperConfig: "(null|object|function)",
	sanitize: "boolean",
	sanitizeFn: "(null|function)",
	selector: "(string|boolean)",
	template: "string",
	title: "(string|element|function)",
	trigger: "string"
};
/**
* Class definition
*/
var Tooltip = class Tooltip extends BaseComponent {
	constructor(element, config) {
		if (typeof lib_exports === "undefined") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
		super(element, config);
		this._isEnabled = true;
		this._timeout = 0;
		this._isHovered = null;
		this._activeTrigger = {};
		this._popper = null;
		this._templateFactory = null;
		this._newContent = null;
		this.tip = null;
		this._setListeners();
		if (!this._config.selector) this._fixTitle();
	}
	static get Default() {
		return Default$3;
	}
	static get DefaultType() {
		return DefaultType$3;
	}
	static get NAME() {
		return NAME$4;
	}
	enable() {
		this._isEnabled = true;
	}
	disable() {
		this._isEnabled = false;
	}
	toggleEnabled() {
		this._isEnabled = !this._isEnabled;
	}
	toggle() {
		if (!this._isEnabled) return;
		if (this._isShown()) {
			this._leave();
			return;
		}
		this._enter();
	}
	dispose() {
		clearTimeout(this._timeout);
		EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		if (this._element.getAttribute("data-bs-original-title")) this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
		this._disposePopper();
		super.dispose();
	}
	show() {
		if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
		if (!(this._isWithContent() && this._isEnabled)) return;
		const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
		const isInTheDom = (findShadowRoot(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
		if (showEvent.defaultPrevented || !isInTheDom) return;
		this._disposePopper();
		const tip = this._getTipElement();
		this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
		const { container } = this._config;
		if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
			container.append(tip);
			EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		}
		this._popper = this._createPopper(tip);
		tip.classList.add(CLASS_NAME_SHOW$2);
		if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.on(element, "mouseover", noop);
		const complete = () => {
			EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
			if (this._isHovered === false) this._leave();
			this._isHovered = false;
		};
		this._queueCallback(complete, this.tip, this._isAnimated());
	}
	hide() {
		if (!this._isShown()) return;
		if (EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2)).defaultPrevented) return;
		this._getTipElement().classList.remove(CLASS_NAME_SHOW$2);
		if ("ontouchstart" in document.documentElement) for (const element of [].concat(...document.body.children)) EventHandler.off(element, "mouseover", noop);
		this._activeTrigger[TRIGGER_CLICK] = false;
		this._activeTrigger[TRIGGER_FOCUS] = false;
		this._activeTrigger[TRIGGER_HOVER] = false;
		this._isHovered = null;
		const complete = () => {
			if (this._isWithActiveTrigger()) return;
			if (!this._isHovered) this._disposePopper();
			this._element.removeAttribute("aria-describedby");
			EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
		};
		this._queueCallback(complete, this.tip, this._isAnimated());
	}
	update() {
		if (this._popper) this._popper.update();
	}
	_isWithContent() {
		return Boolean(this._getTitle());
	}
	_getTipElement() {
		if (!this.tip) this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		return this.tip;
	}
	_createTipElement(content) {
		const tip = this._getTemplateFactory(content).toHtml();
		if (!tip) return null;
		tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
		tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		const tipId = getUID(this.constructor.NAME).toString();
		tip.setAttribute("id", tipId);
		if (this._isAnimated()) tip.classList.add(CLASS_NAME_FADE$2);
		return tip;
	}
	setContent(content) {
		this._newContent = content;
		if (this._isShown()) {
			this._disposePopper();
			this.show();
		}
	}
	_getTemplateFactory(content) {
		if (this._templateFactory) this._templateFactory.changeContent(content);
		else this._templateFactory = new TemplateFactory({
			...this._config,
			content,
			extraClass: this._resolvePossibleFunction(this._config.customClass)
		});
		return this._templateFactory;
	}
	_getContentForTemplate() {
		return { [SELECTOR_TOOLTIP_INNER]: this._getTitle() };
	}
	_getTitle() {
		return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
	}
	_initializeOnDelegatedTarget(event) {
		return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	}
	_isAnimated() {
		return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
	}
	_isShown() {
		return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
	}
	_createPopper(tip) {
		const attachment = AttachmentMap[execute(this._config.placement, [
			this,
			tip,
			this._element
		]).toUpperCase()];
		return createPopper(this._element, tip, this._getPopperConfig(attachment));
	}
	_getOffset() {
		const { offset } = this._config;
		if (typeof offset === "string") return offset.split(",").map((value) => Number.parseInt(value, 10));
		if (typeof offset === "function") return (popperData) => offset(popperData, this._element);
		return offset;
	}
	_resolvePossibleFunction(arg) {
		return execute(arg, [this._element, this._element]);
	}
	_getPopperConfig(attachment) {
		const defaultBsPopperConfig = {
			placement: attachment,
			modifiers: [
				{
					name: "flip",
					options: { fallbackPlacements: this._config.fallbackPlacements }
				},
				{
					name: "offset",
					options: { offset: this._getOffset() }
				},
				{
					name: "preventOverflow",
					options: { boundary: this._config.boundary }
				},
				{
					name: "arrow",
					options: { element: `.${this.constructor.NAME}-arrow` }
				},
				{
					name: "preSetPlacement",
					enabled: true,
					phase: "beforeMain",
					fn: (data) => {
						this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
					}
				}
			]
		};
		return {
			...defaultBsPopperConfig,
			...execute(this._config.popperConfig, [void 0, defaultBsPopperConfig])
		};
	}
	_setListeners() {
		const triggers = this._config.trigger.split(" ");
		for (const trigger of triggers) if (trigger === "click") EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => {
			const context = this._initializeOnDelegatedTarget(event);
			context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK]);
			context.toggle();
		});
		else if (trigger !== TRIGGER_MANUAL) {
			const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
			const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
			EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
				const context = this._initializeOnDelegatedTarget(event);
				context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
				context._enter();
			});
			EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
				const context = this._initializeOnDelegatedTarget(event);
				context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
				context._leave();
			});
		}
		this._hideModalHandler = () => {
			if (this._element) this.hide();
		};
		EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
	}
	_fixTitle() {
		const title = this._element.getAttribute("title");
		if (!title) return;
		if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) this._element.setAttribute("aria-label", title);
		this._element.setAttribute("data-bs-original-title", title);
		this._element.removeAttribute("title");
	}
	_enter() {
		if (this._isShown() || this._isHovered) {
			this._isHovered = true;
			return;
		}
		this._isHovered = true;
		this._setTimeout(() => {
			if (this._isHovered) this.show();
		}, this._config.delay.show);
	}
	_leave() {
		if (this._isWithActiveTrigger()) return;
		this._isHovered = false;
		this._setTimeout(() => {
			if (!this._isHovered) this.hide();
		}, this._config.delay.hide);
	}
	_setTimeout(handler, timeout) {
		clearTimeout(this._timeout);
		this._timeout = setTimeout(handler, timeout);
	}
	_isWithActiveTrigger() {
		return Object.values(this._activeTrigger).includes(true);
	}
	_getConfig(config) {
		const dataAttributes = Manipulator.getDataAttributes(this._element);
		for (const dataAttribute of Object.keys(dataAttributes)) if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) delete dataAttributes[dataAttribute];
		config = {
			...dataAttributes,
			...typeof config === "object" && config ? config : {}
		};
		config = this._mergeConfigObj(config);
		config = this._configAfterMerge(config);
		this._typeCheckConfig(config);
		return config;
	}
	_configAfterMerge(config) {
		config.container = config.container === false ? document.body : getElement(config.container);
		if (typeof config.delay === "number") config.delay = {
			show: config.delay,
			hide: config.delay
		};
		if (typeof config.title === "number") config.title = config.title.toString();
		if (typeof config.content === "number") config.content = config.content.toString();
		return config;
	}
	_getDelegateConfig() {
		const config = {};
		for (const [key, value] of Object.entries(this._config)) if (this.constructor.Default[key] !== value) config[key] = value;
		config.selector = false;
		config.trigger = "manual";
		return config;
	}
	_disposePopper() {
		if (this._popper) {
			this._popper.destroy();
			this._popper = null;
		}
		if (this.tip) {
			this.tip.remove();
			this.tip = null;
		}
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Tooltip.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
			data[config]();
		});
	}
};
/**
* jQuery
*/
defineJQueryPlugin(Tooltip);
/**
* --------------------------------------------------------------------------
* Bootstrap popover.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$3 = "popover";
var SELECTOR_TITLE = ".popover-header";
var SELECTOR_CONTENT = ".popover-body";
var Default$2 = {
	...Tooltip.Default,
	content: "",
	offset: [0, 8],
	placement: "right",
	template: "<div class=\"popover\" role=\"tooltip\"><div class=\"popover-arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>",
	trigger: "click"
};
var DefaultType$2 = {
	...Tooltip.DefaultType,
	content: "(null|string|element|function)"
};
/**
* jQuery
*/
defineJQueryPlugin(class Popover extends Tooltip {
	static get Default() {
		return Default$2;
	}
	static get DefaultType() {
		return DefaultType$2;
	}
	static get NAME() {
		return NAME$3;
	}
	_isWithContent() {
		return this._getTitle() || this._getContent();
	}
	_getContentForTemplate() {
		return {
			[SELECTOR_TITLE]: this._getTitle(),
			[SELECTOR_CONTENT]: this._getContent()
		};
	}
	_getContent() {
		return this._resolvePossibleFunction(this._config.content);
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Popover.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
			data[config]();
		});
	}
});
/**
* --------------------------------------------------------------------------
* Bootstrap scrollspy.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$2 = "scrollspy";
var EVENT_KEY$2 = `.bs.scrollspy`;
var DATA_API_KEY = ".data-api";
var EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
var EVENT_CLICK = `click${EVENT_KEY$2}`;
var EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
var CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
var CLASS_NAME_ACTIVE$1 = "active";
var SELECTOR_DATA_SPY = "[data-bs-spy=\"scroll\"]";
var SELECTOR_TARGET_LINKS = "[href]";
var SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
var SELECTOR_NAV_LINKS = ".nav-link";
var SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, .nav-item > ${SELECTOR_NAV_LINKS}, .list-group-item`;
var SELECTOR_DROPDOWN = ".dropdown";
var SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
var Default$1 = {
	offset: null,
	rootMargin: "0px 0px -25%",
	smoothScroll: false,
	target: null,
	threshold: [
		.1,
		.5,
		1
	]
};
var DefaultType$1 = {
	offset: "(number|null)",
	rootMargin: "string",
	smoothScroll: "boolean",
	target: "element",
	threshold: "array"
};
/**
* Class definition
*/
var ScrollSpy = class ScrollSpy extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._targetLinks = /* @__PURE__ */ new Map();
		this._observableSections = /* @__PURE__ */ new Map();
		this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
		this._activeTarget = null;
		this._observer = null;
		this._previousScrollData = {
			visibleEntryTop: 0,
			parentScrollTop: 0
		};
		this.refresh();
	}
	static get Default() {
		return Default$1;
	}
	static get DefaultType() {
		return DefaultType$1;
	}
	static get NAME() {
		return NAME$2;
	}
	refresh() {
		this._initializeTargetsAndObservables();
		this._maybeEnableSmoothScroll();
		if (this._observer) this._observer.disconnect();
		else this._observer = this._getNewObserver();
		for (const section of this._observableSections.values()) this._observer.observe(section);
	}
	dispose() {
		this._observer.disconnect();
		super.dispose();
	}
	_configAfterMerge(config) {
		config.target = getElement(config.target) || document.body;
		config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		if (typeof config.threshold === "string") config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
		return config;
	}
	_maybeEnableSmoothScroll() {
		if (!this._config.smoothScroll) return;
		EventHandler.off(this._config.target, EVENT_CLICK);
		EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
			const observableSection = this._observableSections.get(event.target.hash);
			if (observableSection) {
				event.preventDefault();
				const root = this._rootElement || window;
				const height = observableSection.offsetTop - this._element.offsetTop;
				if (root.scrollTo) {
					root.scrollTo({
						top: height,
						behavior: "smooth"
					});
					return;
				}
				root.scrollTop = height;
			}
		});
	}
	_getNewObserver() {
		const options = {
			root: this._rootElement,
			threshold: this._config.threshold,
			rootMargin: this._config.rootMargin
		};
		return new IntersectionObserver((entries) => this._observerCallback(entries), options);
	}
	_observerCallback(entries) {
		const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
		const activate = (entry) => {
			this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
			this._process(targetElement(entry));
		};
		const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		this._previousScrollData.parentScrollTop = parentScrollTop;
		for (const entry of entries) {
			if (!entry.isIntersecting) {
				this._activeTarget = null;
				this._clearActiveClass(targetElement(entry));
				continue;
			}
			const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
			if (userScrollsDown && entryIsLowerThanPrevious) {
				activate(entry);
				if (!parentScrollTop) return;
				continue;
			}
			if (!userScrollsDown && !entryIsLowerThanPrevious) activate(entry);
		}
	}
	_initializeTargetsAndObservables() {
		this._targetLinks = /* @__PURE__ */ new Map();
		this._observableSections = /* @__PURE__ */ new Map();
		const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
		for (const anchor of targetLinks) {
			if (!anchor.hash || isDisabled(anchor)) continue;
			const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
			if (isVisible(observableSection)) {
				this._targetLinks.set(decodeURI(anchor.hash), anchor);
				this._observableSections.set(anchor.hash, observableSection);
			}
		}
	}
	_process(target) {
		if (this._activeTarget === target) return;
		this._clearActiveClass(this._config.target);
		this._activeTarget = target;
		target.classList.add(CLASS_NAME_ACTIVE$1);
		this._activateParents(target);
		EventHandler.trigger(this._element, EVENT_ACTIVATE, { relatedTarget: target });
	}
	_activateParents(target) {
		if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
			SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
			return;
		}
		for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) item.classList.add(CLASS_NAME_ACTIVE$1);
	}
	_clearActiveClass(parent) {
		parent.classList.remove(CLASS_NAME_ACTIVE$1);
		const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
		for (const node of activeNodes) node.classList.remove(CLASS_NAME_ACTIVE$1);
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = ScrollSpy.getOrCreateInstance(this, config);
			if (typeof config !== "string") return;
			if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
			data[config]();
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
	for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) ScrollSpy.getOrCreateInstance(spy);
});
/**
* jQuery
*/
defineJQueryPlugin(ScrollSpy);
/**
* --------------------------------------------------------------------------
* Bootstrap tab.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME$1 = "tab";
var EVENT_KEY$1 = `.bs.tab`;
var EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
var EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
var EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
var EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
var EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
var EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
var EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
var ARROW_LEFT_KEY = "ArrowLeft";
var ARROW_RIGHT_KEY = "ArrowRight";
var ARROW_UP_KEY = "ArrowUp";
var ARROW_DOWN_KEY = "ArrowDown";
var HOME_KEY = "Home";
var END_KEY = "End";
var CLASS_NAME_ACTIVE = "active";
var CLASS_NAME_FADE$1 = "fade";
var CLASS_NAME_SHOW$1 = "show";
var CLASS_DROPDOWN = "dropdown";
var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
var SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
var NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
var SELECTOR_TAB_PANEL = ".list-group, .nav, [role=\"tablist\"]";
var SELECTOR_OUTER = ".nav-item, .list-group-item";
var SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
var SELECTOR_DATA_TOGGLE = "[data-bs-toggle=\"tab\"], [data-bs-toggle=\"pill\"], [data-bs-toggle=\"list\"]";
var SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
var SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
/**
* Class definition
*/
var Tab = class Tab extends BaseComponent {
	constructor(element) {
		super(element);
		this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		if (!this._parent) return;
		this._setInitialAttributes(this._parent, this._getChildren());
		EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
	}
	static get NAME() {
		return NAME$1;
	}
	show() {
		const innerElem = this._element;
		if (this._elemIsActive(innerElem)) return;
		const active = this._getActiveElem();
		const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, { relatedTarget: innerElem }) : null;
		if (EventHandler.trigger(innerElem, EVENT_SHOW$1, { relatedTarget: active }).defaultPrevented || hideEvent && hideEvent.defaultPrevented) return;
		this._deactivate(active, innerElem);
		this._activate(innerElem, active);
	}
	_activate(element, relatedElem) {
		if (!element) return;
		element.classList.add(CLASS_NAME_ACTIVE);
		this._activate(SelectorEngine.getElementFromSelector(element));
		const complete = () => {
			if (element.getAttribute("role") !== "tab") {
				element.classList.add(CLASS_NAME_SHOW$1);
				return;
			}
			element.removeAttribute("tabindex");
			element.setAttribute("aria-selected", true);
			this._toggleDropDown(element, true);
			EventHandler.trigger(element, EVENT_SHOWN$1, { relatedTarget: relatedElem });
		};
		this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	}
	_deactivate(element, relatedElem) {
		if (!element) return;
		element.classList.remove(CLASS_NAME_ACTIVE);
		element.blur();
		this._deactivate(SelectorEngine.getElementFromSelector(element));
		const complete = () => {
			if (element.getAttribute("role") !== "tab") {
				element.classList.remove(CLASS_NAME_SHOW$1);
				return;
			}
			element.setAttribute("aria-selected", false);
			element.setAttribute("tabindex", "-1");
			this._toggleDropDown(element, false);
			EventHandler.trigger(element, EVENT_HIDDEN$1, { relatedTarget: relatedElem });
		};
		this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
	}
	_keydown(event) {
		if (![
			ARROW_LEFT_KEY,
			ARROW_RIGHT_KEY,
			ARROW_UP_KEY,
			ARROW_DOWN_KEY,
			HOME_KEY,
			END_KEY
		].includes(event.key)) return;
		event.stopPropagation();
		event.preventDefault();
		const children = this._getChildren().filter((element) => !isDisabled(element));
		let nextActiveElement;
		if ([HOME_KEY, END_KEY].includes(event.key)) nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
		else {
			const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
			nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
		}
		if (nextActiveElement) {
			nextActiveElement.focus({ preventScroll: true });
			Tab.getOrCreateInstance(nextActiveElement).show();
		}
	}
	_getChildren() {
		return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
	}
	_getActiveElem() {
		return this._getChildren().find((child) => this._elemIsActive(child)) || null;
	}
	_setInitialAttributes(parent, children) {
		this._setAttributeIfNotExists(parent, "role", "tablist");
		for (const child of children) this._setInitialAttributesOnChild(child);
	}
	_setInitialAttributesOnChild(child) {
		child = this._getInnerElement(child);
		const isActive = this._elemIsActive(child);
		const outerElem = this._getOuterElement(child);
		child.setAttribute("aria-selected", isActive);
		if (outerElem !== child) this._setAttributeIfNotExists(outerElem, "role", "presentation");
		if (!isActive) child.setAttribute("tabindex", "-1");
		this._setAttributeIfNotExists(child, "role", "tab");
		this._setInitialAttributesOnTargetPanel(child);
	}
	_setInitialAttributesOnTargetPanel(child) {
		const target = SelectorEngine.getElementFromSelector(child);
		if (!target) return;
		this._setAttributeIfNotExists(target, "role", "tabpanel");
		if (child.id) this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
	}
	_toggleDropDown(element, open) {
		const outerElem = this._getOuterElement(element);
		if (!outerElem.classList.contains(CLASS_DROPDOWN)) return;
		const toggle = (selector, className) => {
			const element = SelectorEngine.findOne(selector, outerElem);
			if (element) element.classList.toggle(className, open);
		};
		toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
		outerElem.setAttribute("aria-expanded", open);
	}
	_setAttributeIfNotExists(element, attribute, value) {
		if (!element.hasAttribute(attribute)) element.setAttribute(attribute, value);
	}
	_elemIsActive(elem) {
		return elem.classList.contains(CLASS_NAME_ACTIVE);
	}
	_getInnerElement(elem) {
		return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
	}
	_getOuterElement(elem) {
		return elem.closest(SELECTOR_OUTER) || elem;
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Tab.getOrCreateInstance(this);
			if (typeof config !== "string") return;
			if (data[config] === void 0 || config.startsWith("_") || config === "constructor") throw new TypeError(`No method named "${config}"`);
			data[config]();
		});
	}
};
/**
* Data API implementation
*/
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
	if (["A", "AREA"].includes(this.tagName)) event.preventDefault();
	if (isDisabled(this)) return;
	Tab.getOrCreateInstance(this).show();
});
/**
* Initialize on focus
*/
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
	for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) Tab.getOrCreateInstance(element);
});
/**
* jQuery
*/
defineJQueryPlugin(Tab);
/**
* --------------------------------------------------------------------------
* Bootstrap toast.js
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
* --------------------------------------------------------------------------
*/
/**
* Constants
*/
var NAME = "toast";
var EVENT_KEY = `.bs.toast`;
var EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
var EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
var EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
var EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
var EVENT_HIDE = `hide${EVENT_KEY}`;
var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
var EVENT_SHOW = `show${EVENT_KEY}`;
var EVENT_SHOWN = `shown${EVENT_KEY}`;
var CLASS_NAME_FADE = "fade";
var CLASS_NAME_HIDE = "hide";
var CLASS_NAME_SHOW = "show";
var CLASS_NAME_SHOWING = "showing";
var DefaultType = {
	animation: "boolean",
	autohide: "boolean",
	delay: "number"
};
var Default = {
	animation: true,
	autohide: true,
	delay: 5e3
};
/**
* Class definition
*/
var Toast = class Toast extends BaseComponent {
	constructor(element, config) {
		super(element, config);
		this._timeout = null;
		this._hasMouseInteraction = false;
		this._hasKeyboardInteraction = false;
		this._setListeners();
	}
	static get Default() {
		return Default;
	}
	static get DefaultType() {
		return DefaultType;
	}
	static get NAME() {
		return NAME;
	}
	show() {
		if (EventHandler.trigger(this._element, EVENT_SHOW).defaultPrevented) return;
		this._clearTimeout();
		if (this._config.animation) this._element.classList.add(CLASS_NAME_FADE);
		const complete = () => {
			this._element.classList.remove(CLASS_NAME_SHOWING);
			EventHandler.trigger(this._element, EVENT_SHOWN);
			this._maybeScheduleHide();
		};
		this._element.classList.remove(CLASS_NAME_HIDE);
		reflow(this._element);
		this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		this._queueCallback(complete, this._element, this._config.animation);
	}
	hide() {
		if (!this.isShown()) return;
		if (EventHandler.trigger(this._element, EVENT_HIDE).defaultPrevented) return;
		const complete = () => {
			this._element.classList.add(CLASS_NAME_HIDE);
			this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
			EventHandler.trigger(this._element, EVENT_HIDDEN);
		};
		this._element.classList.add(CLASS_NAME_SHOWING);
		this._queueCallback(complete, this._element, this._config.animation);
	}
	dispose() {
		this._clearTimeout();
		if (this.isShown()) this._element.classList.remove(CLASS_NAME_SHOW);
		super.dispose();
	}
	isShown() {
		return this._element.classList.contains(CLASS_NAME_SHOW);
	}
	_maybeScheduleHide() {
		if (!this._config.autohide) return;
		if (this._hasMouseInteraction || this._hasKeyboardInteraction) return;
		this._timeout = setTimeout(() => {
			this.hide();
		}, this._config.delay);
	}
	_onInteraction(event, isInteracting) {
		switch (event.type) {
			case "mouseover":
			case "mouseout":
				this._hasMouseInteraction = isInteracting;
				break;
			case "focusin":
			case "focusout": this._hasKeyboardInteraction = isInteracting;
		}
		if (isInteracting) {
			this._clearTimeout();
			return;
		}
		const nextElement = event.relatedTarget;
		if (this._element === nextElement || this._element.contains(nextElement)) return;
		this._maybeScheduleHide();
	}
	_setListeners() {
		EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
		EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
		EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
		EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
	}
	_clearTimeout() {
		clearTimeout(this._timeout);
		this._timeout = null;
	}
	static jQueryInterface(config) {
		return this.each(function() {
			const data = Toast.getOrCreateInstance(this, config);
			if (typeof config === "string") {
				if (typeof data[config] === "undefined") throw new TypeError(`No method named "${config}"`);
				data[config](this);
			}
		});
	}
};
/**
* Data API implementation
*/
enableDismissTrigger(Toast);
/**
* jQuery
*/
defineJQueryPlugin(Toast);
//#endregion
//#region resources/js/bbcode-preview.ts
/**
* Cheap jquery replacement
*/
function el(type, cls, contents, cback) {
	const element = document.createElement(type);
	if (cls) element.className = cls;
	if (contents) element.append(contents);
	if (cback) cback(element);
	return element;
}
function insertIntoInput(textarea, template, cursor, cursor2, force_newline) {
	let val = textarea.value || "", st = textarea.selectionStart || 0, end = textarea.selectionEnd || 0, prev = val.substring(0, st), is_newline = prev.length === 0 || prev[prev.length] === "\n", before = force_newline === true && !is_newline ? prev + "\n" : prev, between = val.substring(st, end), curVal = between || cursor, after = val.substring(end), c1i = template.indexOf("CUR1"), c2i = template.indexOf("CUR2");
	textarea.value = before + template.replace("CUR1", curVal).replace("CUR2", cursor2) + after;
	textarea.focus();
	if (c2i < 0) c2i = Number.MAX_VALUE;
	let cstart = before.length + c1i + (c2i < c1i ? cursor2.length - 4 : 0), cend = cstart + curVal.length;
	if (between && c2i <= val.length) {
		cstart = before.length + c2i + (c2i > c1i ? between.length - 4 : 0);
		cend = cstart + cursor2.length;
	}
	textarea.setSelectionRange(cstart, cend);
	textarea.dispatchEvent(new Event("change", { bubbles: true }));
}
var buttons = [
	[
		{
			icon: "bold",
			title: "Bold text",
			template: "*CUR1*",
			cur1: "bold text",
			cur2: ""
		},
		{
			icon: "italic",
			title: "Italic text",
			template: "/CUR1/",
			cur1: "italic text",
			cur2: ""
		},
		{
			icon: "underline",
			title: "Underline text",
			template: "_CUR1_",
			cur1: "underline text",
			cur2: ""
		},
		{
			icon: "strikethrough",
			title: "Strikethrough text",
			template: "~CUR1~",
			cur1: "strikethrough text",
			cur2: ""
		},
		{
			icon: "code",
			title: "Code",
			template: "`CUR1`",
			cur1: "code",
			cur2: ""
		},
		{
			icon: "palette",
			title: "Colour",
			template: "[color=CUR2]CUR1[/color]",
			cur1: "text",
			cur2: "red"
		}
	],
	[
		{
			icon: "header",
			text: "1",
			title: "Header 1",
			template: "= CUR1",
			cur1: "Header",
			cur2: ""
		},
		{
			icon: "header",
			text: "2",
			title: "Header 2",
			template: "== CUR1",
			cur1: "Header",
			cur2: ""
		},
		{
			icon: "header",
			text: "3",
			title: "Header 3",
			template: "=== CUR1",
			cur1: "Header",
			cur2: ""
		}
	],
	[
		{
			icon: "link",
			title: "Link",
			template: "[CUR2|CUR1]",
			cur1: "link text",
			cur2: "http://example.com/"
		},
		{
			icon: "image",
			title: "Image",
			template: "[img:CUR2|CUR1]",
			cur1: "caption text",
			cur2: "http://example.com/image.jpg"
		},
		{
			icon: "video-camera",
			title: "Youtube",
			template: "[youtube:CUR2|CUR1]",
			cur1: "caption text",
			cur2: "youtube_id"
		},
		{
			icon: "quote-right",
			title: "Quote",
			template: "> CUR1",
			cur1: "quoted text",
			cur2: "",
			force_newline: true
		}
	],
	[{
		icon: "list-ul",
		title: "Unsorted List",
		template: "- CUR1",
		cur1: "Item 1",
		cur2: "",
		force_newline: true
	}, {
		icon: "list-ol",
		title: "Sorted List",
		template: "# CUR1",
		cur1: "Item 1",
		cur2: "",
		force_newline: true
	}]
];
var smilies = [
	{
		img: "icon_biggrin",
		code: ":D"
	},
	{
		img: "icon_smile",
		code: ":)"
	},
	{
		img: "dorky",
		code: ":geek:"
	},
	{
		img: "sad0019",
		code: ":("
	},
	{
		img: "icon_eek",
		code: ":-o"
	},
	{
		img: "confused",
		code: ":confused:"
	},
	{
		img: "icon_cool",
		code: "8-)"
	},
	{
		img: "kitty",
		code: ":k1tt3h:"
	},
	{
		img: "laughing",
		code: ":lol:"
	},
	{
		img: "leper",
		code: ":leper:"
	},
	{
		img: "mad",
		code: ":mad:"
	},
	{
		img: "tongue0010",
		code: ":p"
	},
	{
		img: "icon_redface",
		code: ":oops:"
	},
	{
		img: "icon_twisted",
		code: ":evil:"
	},
	{
		img: "rolleye0011",
		code: ":roll:"
	},
	{
		img: "shocked",
		code: ":scream:"
	},
	{
		img: "icon_wink",
		code: ";)"
	},
	{
		img: "dodgy",
		code: ":naughty:"
	},
	{
		img: "heee",
		code: ":hee:"
	},
	{
		img: "44",
		code: "~o)"
	},
	{
		img: "wcc",
		code: ":wcc:"
	},
	{
		img: "smiley_sherlock",
		code: ":sherlock:"
	},
	{
		img: "nag",
		code: ":nag:"
	},
	{
		img: "rolling_eyes",
		code: ":rolling:"
	},
	{
		img: "angryfire",
		code: ":flame:"
	},
	{
		img: "character",
		code: ":ghost:"
	},
	{
		img: "character0007",
		code: ":pirate:"
	},
	{
		img: "indifferent0016",
		code: ":zzz:"
	},
	{
		img: "indifferent0002",
		code: ":|"
	},
	{
		img: "love0012",
		code: ":love:"
	},
	{
		img: "rolleye0006",
		code: ":lookup:"
	},
	{
		img: "sad0006",
		code: ";("
	},
	{
		img: "scared0005",
		code: ":scared:"
	},
	{
		img: "flail",
		code: ":flail:"
	},
	{
		img: "emot-cowjump",
		code: ":cowjump:"
	},
	{
		img: "emot-eng101",
		code: ":teach:"
	},
	{
		img: "uncertain",
		code: ":uncertain:"
	},
	{
		img: "1sm071potstir",
		code: ":stirring:"
	},
	{
		img: "thumbs_up",
		code: ":thumbsup:"
	},
	{
		img: "happy_open",
		code: ":happy:"
	}
];
var more_smilies = [
	{
		img: "sailor",
		code: ":sailor:"
	},
	{
		img: "grenade",
		code: ":grenade:"
	},
	{
		img: "popcorn",
		code: ":popcorn:"
	},
	{
		img: "icon_cry",
		code: ":cry:"
	},
	{
		img: "dead",
		code: ":dead:"
	},
	{
		img: "pimp",
		code: ":pimp:"
	},
	{
		img: "beerchug",
		code: ":beer:"
	},
	{
		img: "chainsaw",
		code: ":chainsaw:"
	},
	{
		img: "arse",
		code: ":moonie:"
	},
	{
		img: "angel",
		code: ":angel:"
	},
	{
		img: "bday",
		code: ":bday:"
	},
	{
		img: "clap",
		code: ":clap:"
	},
	{
		img: "computer",
		code: ":computer:"
	},
	{
		img: "crash",
		code: ":pccrash:"
	},
	{
		img: "dizzy",
		code: ":dizzy:"
	},
	{
		img: "drink",
		code: ":drink:"
	},
	{
		img: "facelick",
		code: ":lick:"
	},
	{
		img: "frown",
		code: ">:("
	},
	{
		img: "imwithstupid",
		code: ":imwithstupid:"
	},
	{
		img: "jawdrop",
		code: ":jawdrop:"
	},
	{
		img: "king",
		code: ":king:"
	},
	{
		img: "ladysman",
		code: ":ladysman:"
	},
	{
		img: "mrT",
		code: ":mrt:"
	},
	{
		img: "nurse",
		code: ":nurse:"
	},
	{
		img: "outtahere",
		code: ":outtahere:"
	},
	{
		img: "aaatrigger",
		code: ":aaatrigger:"
	},
	{
		img: "repuke",
		code: ":repuke:"
	},
	{
		img: "rofl",
		code: ":rofl:"
	},
	{
		img: "rolling",
		code: ":rolling2:"
	},
	{
		img: "santa",
		code: ":santa:"
	},
	{
		img: "smash",
		code: ":smash:"
	},
	{
		img: "toilet",
		code: ":toilet:"
	},
	{
		img: "wavey",
		code: ":wavey:"
	},
	{
		img: "upyours",
		code: ":stfu:"
	},
	{
		img: "fart",
		code: ":fart:"
	},
	{
		img: "trout",
		code: ":trout:"
	},
	{
		img: "ar15firing",
		code: ":machinegun:"
	},
	{
		img: "microwave",
		code: ":microwave:"
	},
	{
		img: "guillotine",
		code: ":guillotine:"
	},
	{
		img: "poke",
		code: ":poke:"
	},
	{
		img: "sniper",
		code: ":sniper:"
	},
	{
		img: "monkee",
		code: ":monkee:"
	},
	{
		img: "bandit",
		code: ":gringo:"
	},
	{
		img: "wtf",
		code: ":wtf:"
	},
	{
		img: "azelito",
		code: ":azelito:"
	},
	{
		img: "crate",
		code: ":crate:"
	},
	{
		img: "argh",
		code: ":-&amp;"
	},
	{
		img: "swear",
		code: ":swear:"
	},
	{
		img: "rocketwhore",
		code: ":launcher:"
	},
	{
		img: "skull",
		code: ":skull:"
	},
	{
		img: "munky",
		code: ":munky:"
	},
	{
		img: "evilgrin",
		code: ":E"
	},
	{
		img: "banghead",
		code: ":brickwall:"
	},
	{
		img: "snark_topic_icon",
		code: ":snark:"
	}
];
function addButtons(container, textarea) {
	const toolbar = el("div", "btn-toolbar d-none d-md-flex");
	container.append(toolbar);
	for (let j = 0; j < buttons.length; j++) {
		const group = el("div", "btn-group btn-group-xs mr-2");
		toolbar.append(group);
		const a = buttons[j];
		for (let i = 0; i < a.length; i++) {
			const btn = a[i];
			const b = el("button", "btn btn-outline-dark btn-xs");
			b.setAttribute("title", btn.title);
			if (btn.icon) b.append(el("span", "fa fa-" + btn.icon));
			if (btn.text) b.append(el("span", "", " " + btn.text));
			group.append(b);
			b.addEventListener("click", (event) => {
				insertIntoInput(textarea, btn.template, btn.cur1, btn.cur2, btn.force_newline);
				event.preventDefault();
			});
		}
	}
	{
		const ddm = el("div", "dropdown-menu dropdown-menu-right p-1 smiley-dropdown border");
		ddm.style.width = "300px";
		const b = el("button", "btn btn-outline-dark btn-xs dropdown-toggle");
		b.setAttribute("data-bs-toggle", "dropdown");
		b.setAttribute("title", "Smilies");
		b.append(el("span", "fa fa-face-smile"));
		const group = el("div", "btn-group btn-group-xs mr-2 d-lg-none");
		group.append(b);
		group.append(ddm);
		toolbar.append(group);
		new Dropdown(b);
		addSmilies(ddm, textarea, false);
	}
}
function addSmilies(container, textarea, more = true) {
	const wrap = el("div", "editor-smilies");
	container.append(wrap);
	wrap.append(el("h2", "text-center mb-2", "Smilies"));
	const sec = el("section", "");
	wrap.append(sec);
	const visDiv = el("div", "");
	sec.append(visDiv);
	for (let i = 0; i < smilies.length; i++) {
		const s = smilies[i];
		const img = document.createElement("img");
		img.src = window.urls.images.smiley_folder + "/" + s.img + ".gif";
		img.alt = s.code;
		const sma = document.createElement("a");
		sma.href = "#";
		sma.title = s.code;
		sma.append(img);
		visDiv.append(sma);
		sma.addEventListener("click", function(event) {
			event.preventDefault();
			insertIntoInput(textarea, " " + event.currentTarget.getAttribute("title") + " CUR1", "", "");
		});
	}
	if (!more) return;
	const moreLink = el("a", "", "Show more", (x) => x.href = "#");
	const moreLinkCon = el("div", "more-link text-center", moreLink);
	sec.append(moreLinkCon);
	const moreDiv = el("div", "d-none");
	sec.append(moreDiv);
	for (let i = 0; i < more_smilies.length; i++) {
		const s = more_smilies[i];
		const img = document.createElement("img");
		img.src = window.urls.images.smiley_folder + "/" + s.img + ".gif";
		img.alt = s.code;
		const sma = document.createElement("a");
		sma.href = "#";
		sma.title = s.code;
		sma.append(img);
		moreDiv.append(sma);
		sma.addEventListener("click", function(event) {
			event.preventDefault();
			insertIntoInput(textarea, " " + event.currentTarget.getAttribute("title") + " CUR1", "", "");
		});
	}
	moreLink.addEventListener("click", (event) => {
		moreLink.textContent = moreDiv.classList.contains("d-none") ? "Show less" : "Show more";
		moreDiv.classList.toggle("d-none");
		event.preventDefault();
	});
}
window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".bbcode-input").forEach((input) => {
		let group = el("div", "form-group"), heading = el("div", "mb-1 d-flex align-items-center", el("h4", "me-auto", "Message preview")), btn = el("button", "btn btn-info btn-xs ms-2", "Update Preview", (x) => x.type = "button"), card = el("div", "card"), panel = el("div", "card-body bbcode"), form = input.closest("form"), ta = input.querySelector("textarea"), name = ta.getAttribute("name"), help = el("a", "float-end btn btn-outline-secondary mb-1", "Formatting help", (x) => {
			x.target = "_blank";
			x.href = window.urls.formatting_help;
		}), btnCon = el("div", "mb-1"), row = el("div", "row"), colLeft = el("div", "col-12 col-lg-9"), colRight = el("div", "d-none d-lg-block col-lg-3"), livePreviewInput = el("input", "form-check-input", void 0, (x) => {
			x.type = "checkbox";
		}), livePreviewLabel = el("label", "form-check w-auto", "Live preview");
		row.append(colLeft);
		row.append(colRight);
		colLeft.append(...input.children);
		input.append(row);
		livePreviewInput.checked = !document.cookie.split(";").some((x) => x.includes("live_preview=no"));
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
		const refresh = async function() {
			const formData = new FormData(form);
			const data = parser_default.ParseResult(formData.get(name)).ToHtml();
			const event = new CustomEvent("bbcode-preview-updating", { detail: {
				html: data,
				element: panel
			} });
			ta.dispatchEvent(event);
			panel.innerHTML = await Promise.resolve(event.detail.html);
			panel.querySelectorAll("pre code").forEach((x) => {
				highlight_default.highlightElement(x);
			});
			ta.dispatchEvent(new CustomEvent("bbcode-preview-updated", { detail: { element: panel } }));
		};
		btn.addEventListener("click", refresh);
		let timeout = void 0;
		const liveRefresh = function() {
			clearTimeout(timeout);
			if (!livePreviewInput.checked) return;
			timeout = setTimeout(() => {
				refresh();
			}, 250);
		};
		input.addEventListener("input", liveRefresh);
		input.addEventListener("change", liveRefresh);
		livePreviewInput.addEventListener("change", () => {
			btn.classList.toggle("d-none", livePreviewInput.checked);
			document.cookie = `live_preview=${livePreviewInput.checked ? "yes" : "no"}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
			liveRefresh();
		});
		refresh();
		btn.classList.toggle("d-none", livePreviewInput.checked);
	});
	document.addEventListener("paste", async (event) => {
		const active = document.activeElement;
		if (!active || !active.closest(".bbcode-input") || active.tagName !== "TEXTAREA") return;
		const data = event.clipboardData;
		if (!data || !data.getData || data.items.length !== 1) return;
		const item = data.items[0];
		const fileData = item.getAsFile();
		if (!fileData || !(fileData instanceof File)) return;
		let fileName;
		switch (item.type) {
			case "image/gif":
				fileName = "image.gif";
				break;
			case "image/png":
				fileName = "image.png";
				break;
			case "image/jpeg":
				fileName = "image.jpg";
				break;
			default: return;
		}
		event.preventDefault();
		const form = new FormData();
		form.append("image", fileData, fileName);
		form.append("_token", document.head.querySelector("meta[name=\"csrf-token\"]").content);
		const tempText = "uploading image " + Date.now() + "...";
		insertIntoInput(active, "[img:" + tempText + "]", "", "", true);
		const response = await fetch(window.urls.api.image_upload, {
			method: "post",
			body: form
		});
		const json = await response.json();
		let replace;
		if (!response.ok) replace = "Error: " + json.image[0];
		else replace = json.url;
		let text = active.value;
		if (text.indexOf(tempText) >= 0) text = text.replace(tempText, replace);
		else text += "\n[img:" + replace + "]";
		active.value = text;
	});
	const replybox = document.querySelector("#reply textarea");
	if (replybox) document.querySelectorAll(".quote-post").forEach((qp) => {
		const id = parseInt(qp.getAttribute("data-post-id"), 10);
		if (!id) return;
		qp.addEventListener("click", async () => {
			const resp = await fetch(window.urls.api.get_post, {
				method: "post",
				body: JSON.stringify({
					id,
					_token: document.head.querySelector("meta[name=\"csrf-token\"]").content
				}),
				headers: { "Content-Type": "application/json" }
			});
			if (!resp.ok) return;
			const json = await resp.json();
			const text = `[quote=${json.user.name}]\n${json.content_text}\n[/quote]`;
			insertIntoInput(replybox, text + "\n\nCUR1", "", "");
		});
	});
});
//#endregion
//#region resources/js/embed.ts
document.addEventListener("click", (event) => {
	const target = event.target;
	if (!target) return;
	const uninit = target.matches(".uninitialised") ? target : target.closest(".uninitialised");
	if (!uninit) return;
	if (!uninit.closest(".video-content")) return;
	const url = "https://www.youtube.com/embed/" + target.getAttribute("data-youtube-id") + "?autoplay=1&rel=0";
	const frame = document.createElement("iframe");
	frame.setAttribute("src", url);
	frame.setAttribute("frameborder", "0");
	frame.setAttribute("allowfullscreen", "");
	frame.classList.add("caption-body");
	target.replaceWith(frame);
});
function esc(text) {
	const e = document.createElement("div");
	e.textContent = text;
	return e.innerHTML;
}
function attr_esc(text) {
	text = (text || "").toString();
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var embed_callbacks = {
	error: function(element, json) {
		const template = `<div class="text-center">
            <h2><span class="fa fa-warning"></span> Error: Unable to load ${json.type}.</h2>
        </div>`;
		console.log(template);
		const embed = document.createElement("div");
		embed.innerHTML = template;
		element.replaceWith(embed.children[0]);
	},
	article: function(element, json) {
		const thread_link = json.forum_thread_id ? `<li><a href="${attr_esc(window.urls.view.thread.replace("{id}", json.forum_thread_id))}">Discussion topic &raquo;</a></li>` : "";
		const template = `
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-fluid" src="${attr_esc(window.urls.images.root)}${attr_esc(json.current_version.thumbnail_file || "images/no_image.png")}" alt="Article thumbnail" />
                </div>
                <div class="col-6">
                    <h2>
                        <a href="${attr_esc(window.urls.view.article.replace("{slug}", json.current_version.slug))}">${esc(json.current_version.title)}</a>
                    </h2>
                    <div class="bbcode">${esc(json.current_version.description)}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        <li>by <a href="${attr_esc(window.urls.view.user.replace("{id}", json.user_id))}">${json.user.name}</a></li>
                        <li>in <a href="${attr_esc(window.urls.list.article)}?game=${attr_esc(json.game_id)}&cat=${attr_esc(json.article_category_id)}">${esc(json.game.name)} &raquo; ${esc(json.category.name)}</a></li>
                        <li>updated ${esc(new Date(json.created_at).toLocaleDateString())}</li>
                        <li>viewed ${esc(json.stat_views)} time${json.stat_views == 1 ? "" : "s"}</li>
                        ${thread_link}
                    </ul>
                </div>
            </div>
        `.trim();
		const embed = document.createElement("div");
		embed.innerHTML = template;
		element.replaceWith(embed.children[0]);
	},
	download: function(element, json) {
		const mirrors = json.mirror_list.map((x) => `<li class="mb-1"><a target="_blank" href="${attr_esc(x.url)}" class="btn btn-primary">${esc(x.text)}</a></li>`).join("");
		const size = json.file_size_readable ? `<li>Size: ${json.file_size_readable}</li>` : "";
		const template = `
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-fluid" src="${attr_esc(window.urls.images.root)}${attr_esc(json.image_file || "images/no_image.png")}" alt="Article thumbnail" />
                </div>
                <div class="col-6">
                    <h2>
                        <a href="${attr_esc(window.urls.view.download.replace("{id}", json.id))}">${esc(json.name)}</a>
                    </h2>
                    <div class="bbcode">${json.content_html}</div>
                </div>
                <div class="col-3">
                    <ul class="list-unstyled">
                        ${mirrors}
                        ${size}
                        <li>by <a href="${attr_esc(window.urls.view.user.replace("{id}", json.user_id))}">${esc(json.user.name)}</a></li>
                        <li>in <a href="${attr_esc(window.urls.list.download)}?game=${attr_esc(json.game_id)}&cat=${attr_esc(json.download_category_id)}">${esc(json.game.name)} &raquo; ${esc(json.category.name)}</a></li>
                        <li>updated ${esc(new Date(json.created_at).toLocaleDateString())}</li>
                        <li>downloaded ${esc(json.stat_downloads)} time${json.stat_downloads == 1 ? "" : "s"}</li>
                        <li><a href="${attr_esc(window.urls.view.thread.replace("{id}", json.thread_id))}">Discussion topic &raquo;</a></li>
                    </ul>
                </div>
            </div>
        `.trim();
		const embed = document.createElement("div");
		embed.innerHTML = template;
		element.replaceWith(embed.children[0]);
	},
	map: function(element, json) {
		const images = json.images.length ? json.images.map((x, i) => `<img class="img-fluid ${i == 0 ? "" : "d-none"}" src="${attr_esc(window.urls.images.root + x.image_file)}" />`).join("") : `<img class="img-fluid" src="${attr_esc(window.urls.images.no_image)}" />`;
		const template = `
            <div>
                <h1 class="d-flex align-items-start">
                    <a href="${attr_esc(window.urls.list.map)}?game=${attr_esc(json.game_id)}">
                        <img src="${attr_esc(window.urls.images.root + "images/games/" + json.game_id + ".png")}" alt="${json.game.name}" />
                    </a>
                    <span class="flex-fill">
                        <a href="${attr_esc(window.urls.view.map.replace("{id}", json.id))}">
                            ${esc(json.name)}
                        </a>
                        by
                        <a href="${attr_esc(window.urls.view.user.replace("{id}", json.user_id))}">
                            ${esc(json.user.name)}
                        </a>
                    </span>
                    <span class="game-image-filler"></span>
                </h1>
                <div class="image-cycler m-auto">
                    ${images}
                    <span class="controls"></span>
                </div>
            </div>
        `.trim();
		const embed = document.createElement("div");
		embed.innerHTML = template;
		element.replaceWith(embed.children[0]);
	}
};
var embed_cache = {};
async function load_embed(el) {
	el.textContent = "Loading...";
	el.parentElement;
	let typ = el.getAttribute("data-embed-type");
	const id = el.getAttribute("data-" + typ + "-id");
	const url = typ == "error" ? "" : window.urls.embed[typ];
	if (el.getAttribute("data-stop")) return;
	el.setAttribute("data-stop", "true");
	observer.unobserve(el);
	let json;
	const cacheKey = `${typ}:${id}`;
	if (url === "") json = { type: "error" };
	else if (embed_cache[cacheKey]) json = embed_cache[cacheKey];
	else {
		const resp = await fetch(url, {
			method: "post",
			body: JSON.stringify({ id }),
			headers: { "Content-Type": "application/json" }
		});
		if (resp.ok) {
			json = await resp.json();
			embed_cache[cacheKey] = json;
		} else {
			json = {
				resp,
				type: typ
			};
			embed_cache[cacheKey] = json;
			typ = "error";
		}
	}
	embed_callbacks[typ].call(window, el, json);
	init_all_image_cyclers(document);
}
var observer = new IntersectionObserver((entries, options) => {
	entries.forEach((x) => {
		if (!x.isIntersecting) return;
		load_embed(x.target);
	});
}, { threshold: .1 });
function addEmbedInit(el) {
	el.querySelectorAll(".embed-content .uninitialised").forEach((x) => {
		observer.observe(x);
	});
}
document.querySelectorAll(".bbcode-input textarea").forEach((x) => {
	x.addEventListener("bbcode-preview-updated", (event) => {
		addEmbedInit(event.detail.element);
	});
});
addEmbedInit(document);
//#endregion
//#region resources/js/snowsnarks.ts
window.addEventListener("DOMContentLoaded", function() {
	if (!document.body.classList.contains("snow")) return;
	const imgSnark = "/images/xmassnark.gif";
	const imgBang = "/images/anibang.gif";
	const preload = new Image();
	preload.src = imgBang;
	const averageHspeed = 10;
	const averageVspeed = .75;
	const averageDrift = 50;
	const minScale = .7;
	const horizontalPaddingPx = 100;
	const minSnarks = 8;
	const snowContainer = document.createElement("div");
	snowContainer.classList.add("snowfield");
	const flakes = [];
	function repositionSnowflake(flake, initial) {
		if (initial) flake.top = -60 - Math.random() * window.innerHeight * .5;
		else flake.top = -60;
		flake.left = horizontalPaddingPx / 2 + Math.random() * (window.innerWidth - horizontalPaddingPx);
		flake.drift = Math.random() * averageDrift;
		flake.vspeed = averageVspeed + Math.random() * averageVspeed;
		flake.hspeed = averageHspeed + Math.random() * averageHspeed;
		flake.direction = Math.random() < .5 ? -1 : 1;
		flake.element.style.opacity = "" + (.5 + Math.random() * .5);
		flake.element.style.transform = "scale(" + (Math.random() * .8 + minScale) + ")";
	}
	let last = 0;
	function animateSnowflakes(timestamp) {
		const elapsed = (timestamp - last) / 1e3;
		last = timestamp;
		for (let i = 0; i < flakes.length; i++) {
			const flake = flakes[i];
			if (flake.exploding) {
				if (flake.explodeTimeout <= 0) {
					flake.exploding = false;
					flake.explodeTimeout = 0;
					flake.element.src = imgSnark;
					repositionSnowflake(flake, false);
				} else flake.explodeTimeout -= elapsed;
				continue;
			}
			flake.top += flake.vspeed * elapsed * 60;
			if (flake.top > window.innerHeight) repositionSnowflake(flake, false);
			else {
				const distance = flake.hspeed * elapsed;
				flake.left += distance * flake.direction;
				flake.drift -= distance;
				if (flake.drift < 0) {
					flake.drift = Math.random() * averageDrift;
					flake.direction = Math.random() < .5 ? -1 : 1;
					flake.hspeed = averageHspeed + Math.random() * averageHspeed;
				}
			}
			flake.element.style.top = flake.top + "px";
			flake.element.style.left = flake.left + "px";
		}
		window.requestAnimationFrame(animateSnowflakes);
	}
	function explodeSnark(flake) {
		if (flake.exploding) return;
		flake.exploding = true;
		flake.explodeTimeout = 1.7;
		flake.element.src = imgBang;
	}
	const numFlakes = minSnarks + Math.floor(Math.random() * 4);
	for (let i = 0; i < numFlakes; i++) {
		const el = document.createElement("img");
		el.src = imgSnark;
		el.classList.add("snowflake");
		const flake = {
			element: el,
			top: 0,
			left: 0,
			drift: 0,
			hspeed: 0,
			vspeed: 0,
			direction: 0,
			exploding: false,
			explodeTimeout: 0
		};
		flakes.push(flake);
		snowContainer.append(flake.element);
		repositionSnowflake(flake, true);
		flake.element.addEventListener("mousedown", () => explodeSnark(flake));
	}
	document.body.prepend(snowContainer);
	window.requestAnimationFrame(animateSnowflakes);
});
//#endregion
//#region resources/js/images-form.ts
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".images-form-container").forEach((form) => {
		const btn = form.querySelector("button");
		if (!btn) return;
		const max_images = parseInt(form.getAttribute("data-max-images"), 10) || 9;
		const before = btn.closest(".text-center");
		form.querySelectorAll("a").forEach((remove) => {
			const div = remove.parentElement;
			remove.addEventListener("click", (e) => {
				e.preventDefault();
				div.remove();
				updateButtonVisibility();
			});
		});
		const updateButtonVisibility = () => {
			const num = form.querySelectorAll("input").length;
			before.classList.toggle("d-none", num >= max_images);
		};
		updateButtonVisibility();
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			if (form.querySelectorAll("input").length >= max_images) return;
			const div = document.createElement("div");
			const input = document.createElement("input");
			const remove = document.createElement("a");
			div.classList.add("d-flex", "flex-row");
			input.classList.add("flex-fill", "my-1");
			input.type = "file";
			input.name = "images[]";
			input.accept = ".jpg,.jpeg";
			remove.classList.add("align-self-center", "px-2");
			remove.href = "#";
			remove.innerHTML = "<span class=\"fas fa-times\"></span>";
			remove.addEventListener("click", (e) => {
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
//#endregion
//#region resources/js/bootstrap.ts
document.addEventListener("DOMContentLoaded", () => {
	highlight_default.highlightAll();
	init_all_image_cyclers(document);
});
//#endregion
