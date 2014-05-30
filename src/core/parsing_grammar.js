(function () {
	var $D = Date;
	$D.Grammar = {};
	var _ = $D.Parsing.Operators, g = $D.Grammar, t = $D.Translator, _fn;

	g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
	g.timePartDelimiter = _.stoken(":");
	g.whiteSpace = _.rtoken(/^\s*/);
	g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
  
	var _C = {};
	g.ctoken = function (keys) {
		var fn = _C[keys];
		if (! fn) {
			var c = Date.CultureInfo.regexPatterns;
			var kx = keys.split(/\s+/), px = [];
			for (var i = 0; i < kx.length ; i++) {
				px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
			}
			fn = _C[keys] = _.any.apply(null, px);
		}
		return fn;
	};
	g.ctoken2 = function (key) {
		return _.rtoken(Date.CultureInfo.regexPatterns[key]);
	};
	var cacheProcessRtoken = function (token, type, eachToken) {
		if (eachToken) {
			return _.cache(_.process(_.each(_.rtoken(token),_.optional(g.ctoken2(eachToken))), type));
		} else {
			return _.cache(_.process(_.rtoken(token), type));
		}
	};

	var _F = {
		//"M/d/yyyy": function (s) { 
		//	var m = s.match(/^([0-2]\d|3[0-1]|\d)\/(1[0-2]|0\d|\d)\/(\d\d\d\d)/);
		//	if (m!=null) { 
		//		var r =  [ t.month.call(this,m[1]), t.day.call(this,m[2]), t.year.call(this,m[3]) ];
		//		r = t.finishExact.call(this,r);
		//		return [ r, "" ];
		//	} else {
		//		throw new Date.Parsing.Exception(s);
		//	}
		//}
		//"M/d/yyyy": function (s) { return [ new Date(Date._parse(s)), ""]; }
	};
	var _get = function (f) {
		_F[f] = (_F[f] || g.format(f)[0]);
		return _F[f];
	};

	g.allformats = function (fx) {
		var rx = [];
		if (fx instanceof Array) {
			for (var i = 0; i < fx.length; i++) {
				rx.push(_get(fx[i]));
			}
		} else {
			rx.push(_get(fx));
		}
		return rx;
	};
  
	g.formats = function (fx) {
		if (fx instanceof Array) {
			var rx = [];
			for (var i = 0 ; i < fx.length ; i++) {
				rx.push(_get(fx[i]));
			}
			return _.any.apply(null, rx);
		} else {
			return _get(fx);
		}
	};

	g.buildGrammarFormats = function () {
		// these need to be rebuilt every time the language changes.
		_C = {};
		// hour, minute, second, meridian, timezone
		g.h = cacheProcessRtoken(/^(0[0-9]|1[0-2]|[1-9])/, t.hour);
		g.hh = cacheProcessRtoken(/^(0[0-9]|1[0-2])/, t.hour);
		g.H = cacheProcessRtoken(/^([0-1][0-9]|2[0-3]|[0-9])/, t.hour);
		g.HH = cacheProcessRtoken(/^([0-1][0-9]|2[0-3])/, t.hour);
		g.m = cacheProcessRtoken(/^([0-5][0-9]|[0-9])/, t.minute);
		g.mm = cacheProcessRtoken(/^[0-5][0-9]/, t.minute);
		g.s = cacheProcessRtoken(/^([0-5][0-9]|[0-9])/, t.second);
		g.ss = cacheProcessRtoken(/^[0-5][0-9]/, t.second);
		g["ss.s"] = cacheProcessRtoken(/^[0-5][0-9]\.[0-9]{1,3}/, t.secondAndMillisecond);
		g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
	  
		// _.min(1, _.set([ g.H, g.m, g.s ], g._t));
		g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
		g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
		g.z = cacheProcessRtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/, t.timezone);
		g.zz = cacheProcessRtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/, t.timezone);
		
		g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
		g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([ g.tt, g.zzz ]));
		g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
			  
		// days, months, years
		g.d = cacheProcessRtoken(/^([0-2]\d|3[0-1]|\d)/, t.day, "ordinalSuffix");
		g.dd = cacheProcessRtoken(/^([0-2]\d|3[0-1])/, t.day, "ordinalSuffix");
		g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),
			function (s) {
				return function () {
					this.weekday = s;
				};
			}
		));
		g.M = cacheProcessRtoken(/^(1[0-2]|0\d|\d)/, t.month);
		g.MM = cacheProcessRtoken(/^(1[0-2]|0\d)/, t.month);
		g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
	//	g.MMM = g.MMMM = _.cache(_.process(g.ctoken(Date.CultureInfo.abbreviatedMonthNames.join(" ")), t.month));
		g.y = cacheProcessRtoken(/^(\d+)/, t.year);
		g.yy = cacheProcessRtoken(/^(\d\d)/, t.year);
		g.yyy = cacheProcessRtoken(/^(\d\d?\d?\d?)/, t.year);
		g.yyyy = cacheProcessRtoken(/^(\d\d\d\d)/, t.year);
		
		// rolling these up into general purpose rules
		_fn = function () {
			return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
		};
		
		g.day = _fn(g.d, g.dd);
		g.month = _fn(g.M, g.MMM);
		g.year = _fn(g.yyyy, g.yy);

		// relative date / time expressions
		g.orientation = _.process(g.ctoken("past future"),
			function (s) {
				return function () {
					this.orient = s;
				};
			}
		);

		g.operator = _.process(g.ctoken("add subtract"),
			function (s) {
				return function () {
					this.operator = s;
				};
			}
		);
		g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
		g.unit = _.process(g.ctoken("second minute hour day week month year"),
			function (s) {
				return function () {
					this.unit = s;
				};
			}
		);
		g.value = _.process(_.rtoken(/^([-+]?\d+)?(st|nd|rd|th)?/),
			function (s) {
				return function () {
					this.value = s.replace(/\D/g, "");
				};
			}
		);
		g.expression = _.set([ g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM ]);

		// pre-loaded rules for different date part order preferences
		_fn = function () {
			return  _.set(arguments, g.datePartDelimiter);
		};
		g.mdy = _fn(g.ddd, g.month, g.day, g.year);
		g.ymd = _fn(g.ddd, g.year, g.month, g.day);
		g.dmy = _fn(g.ddd, g.day, g.month, g.year);
		g.date = function (s) {
			return ((g[Date.CultureInfo.dateElementOrder] || g.mdy).call(this, s));
		};

		g.format = _.process(_.many(
			_.any(
				// translate format specifiers into grammar rules
				_.process(
					_.rtoken(/^(dd?d?d?(?!e)|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),
						function (fmt) {
							if (g[fmt]) {
								return g[fmt];
							} else {
								throw $D.Parsing.Exception(fmt);
							}
						}
					),
					// translate separator tokens into token rules
					_.process(_.rtoken(/^[^dMyhHmstz]+/), // all legal separators 
						function (s) {
							return _.ignore(_.stoken(s));
						}
					)
				)
			),
			// construct the parser ...
			function (rules) {
				return _.process(_.each.apply(null, rules), t.finishExact);
			}
		);

		// starting rule for general purpose grammar
		g._start = _.process(_.set([ g.date, g.time, g.expression ],
		g.generalDelimiter, g.whiteSpace), t.finish);
	};
	g.buildGrammarFormats();
	// parsing date format specifiers - ex: "h:m:s tt" 
	// this little guy will generate a custom parser based
	// on the format string, ex: g.format("h:m:s tt")
	

	

	// check for these formats first
	g._formats = g.formats([
		"\"yyyy-MM-ddTHH:mm:ssZ\"",
		"yyyy-MM-ddTHH:mm:ss.sz",
		"yyyy-MM-ddTHH:mm:ssZ",
		"yyyy-MM-ddTHH:mm:ssz",
		"yyyy-MM-ddTHH:mm:ss",
		"yyyy-MM-ddTHH:mmZ",
		"yyyy-MM-ddTHH:mmz",
		"yyyy-MM-ddTHH:mm",
		"ddd, MMM dd, yyyy H:mm:ss tt",
		"ddd MMM d yyyy HH:mm:ss zzz",
		"MMddyyyy",
		"ddMMyyyy",
		"Mddyyyy",
		"ddMyyyy",
		"Mdyyyy",
		"dMyyyy",
		"yyyy",
		"Mdyy",
		"dMyy",
		"d"
	]);
	
	// real starting rule: tries selected formats first, 
	// then general purpose rule
	g.start = function (s) {
		try {
			var r = g._formats.call({}, s);
			if (r[1].length === 0) {
				return r;
			}
		} catch (e) {}
		return g._start.call({}, s);
	};
}());