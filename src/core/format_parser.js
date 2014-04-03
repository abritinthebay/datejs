(function () {
	"use strict";
	Date.Parsing = {
		Exception: function (s) {
			this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
		}
	};
	var $P = Date.Parsing;
	var dayOffsets = {
		standard: [0,31,59,90,120,151,181,212,243,273,304,334],
		leap: [0,31,60,91,121,152,182,213,244,274,305,335]
	};

	var multiReplace = function (str, hash ) {
		var key;
		for (key in hash) {
			if (Object.prototype.hasOwnProperty.call(hash, key)) {
				var regex = (hash[key] instanceof RegExp) ? hash[key] : new RegExp(hash[key], "g");
				str = str.replace(regex, key);
			}
		}
		return str;
	};

	$P.isLeapYear = function(year) {
		return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
	};

	$P.processTimeObject = function (obj) {
		var d, jan4, date, offset, dayOffset;
		d = new Date();
		dayOffset = ($P.isLeapYear(obj.year)) ? dayOffsets.leap : dayOffsets.standard;
		obj.hours = obj.hours ? obj.hours : 0;
		obj.minutes = obj.minutes ? obj.minutes : 0;
		obj.seconds = obj.seconds ? obj.seconds : 0;
		obj.milliseconds = obj.milliseconds ? obj.milliseconds : 0;
		if (!obj.year) {
			obj.year = d.getFullYear();
		}
		if (!obj.month && (obj.week || obj.dayOfYear)) {
			// work out the day of the year...
			if (!obj.dayOfYear) {
				obj.weekDay = (!obj.weekDay && obj.weekDay !== 0) ? 1 : obj.weekDay;
				d = new Date(obj.year, 0, 4);
				jan4 = d.getDay() === 0 ? 7 : d.getDay(); // JS is 0 indexed on Sunday.
				offset = jan4+3;
				obj.dayOfYear = ((obj.week * 7) + (obj.weekDay === 0 ? 7 : obj.weekDay))-offset;
			}
			for (var i=0;i <= dayOffset.length;i++) {
				if (obj.dayOfYear < dayOffset[i] || i === dayOffset.length) {
					obj.day = obj.day ? obj.day : (obj.dayOfYear - dayOffset[i-1]);
					break;
				} else {
					obj.month = i;
				}
			}
		} else {
			obj.month = obj.month ? obj.month : 0;
			obj.day = obj.day ? obj.day : 1;
			obj.dayOfYear = dayOffset[obj.month] + obj.day;
		}
		date = new Date(obj.year, obj.month, obj.day, obj.hours, obj.minutes, obj.seconds, obj.milliseconds);

		if (obj.zone) {
			// adjust (and calculate) for timezone here
			if (obj.zone.toUpperCase() === "Z" || (obj.zone_hours === 0 && obj.zone_minutes === 0)) {
				// it's UTC/GML so work out the current timeszone offset
				offset = -date.getTimezoneOffset();
			} else {
				offset = (obj.zone_hours*60) + (obj.zone_minutes ? obj.zone_minutes : 0);
				if (obj.zone_sign === "+") {
					offset *= -1;
				}
				offset -= date.getTimezoneOffset();
			}
			date.setMinutes(date.getMinutes()+offset);
		}
		return date;
	};
	
	$P.ISO = {
		regex : /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-4])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?\s?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
		parse : function (s) {
			var data = s.match(this.regex);
			if (!data || !data.length) {
				return null;
			}
			var time = {
				year : data[1] ? Number(data[1]) : data[1],
				month : data[5] ? (Number(data[5])-1) : data[5],
				day : data[7] ? Number(data[7]) : data[7],
				week : data[8] ? Number(data[8]) : data[8],
				weekDay : data[9] ? (Math.abs(Number(data[9])) === 7 ? 0 : Math.abs(Number(data[9]))) : data[9], // 1-7, starts on Monday. Convert to JS's 0-6 index.
				dayOfYear : data[10] ? Number(data[10]) : data[10],
				hours : data[15] ? Number(data[15]) : data[15],
				minutes : data[16] ? Number(data[16].replace(":","")) : data[16],
				seconds : data[19] ? Math.floor(Number(data[19].replace(":","").replace(",","."))) : data[19],
				milliseconds : data[20] ? (Number(data[20].replace(",","."))*1000) : data[20],
				zone : data[21],
				zone_sign : data[22],
				zone_hours : (data[23] && typeof data[23] !== "undefined") ? Number(data[23]) : data[23],
				zone_minutes : (data[24] && typeof data[23] !== "undefined") ? Number(data[24]) : data[24]
			};
			if (data[18]) {
				data[18] = 60 * Number(data[18].replace(",", "."));
				if (!time.minutes) {
					time.minutes = data[18];
				} else if (!time.seconds) {
					time.seconds = data[18];
				}
			}
			if (!time.year || (!time.year && (!time.month && !time.day) && (!time.week && !time.dayOfYear)) ) {
				return null;
			}
			return $P.processTimeObject(time);
		}
	};
	$P.Numeric = {
		isNumeric: function (e){return!isNaN(parseFloat(e))&&isFinite(e);},
		regex: /\b([0-1]?[0-9])([0-3]?[0-9])([0-2]?[0-9]?[0-9][0-9])\b/i,
		parse: function (s) {
			var data, i,
				time = {},
				order = Date.CultureInfo.dateElementOrder.split("");
			if (!(this.isNumeric(s)) || // if it's non-numeric OR
				(s[0] === "+" && s[0] === "-")) {			// It's an arithmatic string (eg +/-1000)
				return null;
			}
			if (s.length < 5) { // assume it's just a year.
				time.year = s;
				return $P.processTimeObject(time);
			}
			data = s.match(this.regex);
			if (!data || !data.length) {
				return null;
			}
			for (i=0; i < order.length; i++) {
				switch(order[i]) {
					case "d":
						time.day = data[i+1];
						break;
					case "m":
						time.month = (data[i+1]-1);
						break;
					case "y":
						time.year = data[i+1];
						break;
				}
			}
			return $P.processTimeObject(time);
		}
	};
	$P.Normalizer = {
		parse: function (s) {
			var $R = Date.CultureInfo.regexPatterns,
				__ = Date.i18n.__,
				tomorrow = Date.today().addDays(1).toString("d"),
				yesterday = Date.today().addDays(-1).toString("d"),
				lastMon = Date.today().last().monday().toString("d"),
				lastTues = Date.today().last().tuesday().toString("d"),
				lastWed = Date.today().last().wednesday().toString("d"),
				lastThurs = Date.today().last().thursday().toString("d"),
				lastFri = Date.today().last().friday().toString("d"),
				lastSat = Date.today().last().saturday().toString("d"),
				lastSun = Date.today().last().sunday().toString("d");

			var replaceHash = {
				"January": $R.jan.source,
				"February": $R.feb,
				"March": $R.mar,
				"April": $R.apr,
				"May": $R.may,
				"June": $R.jun,
				"July": $R.jul,
				"August": $R.aug,
				"September": $R.sep,
				"October": $R.oct,
				"November": $R.nov,
				"December": $R.dec,
				"": /\bat\b/gi,
				" ": /\s{2,}/,
			};
			replaceHash[tomorrow] = $R.tomorrow;
			replaceHash[yesterday] = $R.yesterday;
			replaceHash[lastMon] = new RegExp("(("+$R.past.source+")\\s("+$R.mon.source+"))");
			replaceHash[lastTues] = new RegExp("(("+$R.past.source+")\\s("+$R.tue.source+"))");
			replaceHash[lastWed] = new RegExp("(("+$R.past.source+")\\s("+$R.wed.source+"))");
			replaceHash[lastThurs] = new RegExp("(("+$R.past.source+")\\s("+$R.thu.source+"))");
			replaceHash[lastFri] = new RegExp("(("+$R.past.source+")\\s("+$R.fri.source+"))");
			replaceHash[lastSat] = new RegExp("(("+$R.past.source+")\\s("+$R.sat.source+"))");
			replaceHash[lastSun] = new RegExp("(("+$R.past.source+")\\s("+$R.sun.source+"))");

			var regexStr = "(\\b\\d\\d?("+__("AM")+"|"+__("PM")+")? )("+$R.tomorrow.source.slice(1)+")";
			s = s.replace(new RegExp(regexStr, "i"), function(full, m1) {
				var t = Date.today().addDays(1).toString("d");
				return (t + " " + m1);
			});

			s =	s.replace($R.amThisMorning, function(str, am){return am;})
				.replace($R.inTheMorning, "am")
				.replace($R.thisMorning, "9am")
				.replace($R.amThisEvening, function(str, pm){return pm;})
				.replace($R.inTheEvening, "pm")
				.replace($R.thisEvening, "7pm");

			s = multiReplace(s, replaceHash);

			try {
				var n = s.split(/([\s\-\.\,\/\x27]+)/);
				if (n.length === 3) {
					if ($P.Numeric.isNumeric(n[0]) && $P.Numeric.isNumeric(n[2])) {
						if (n[2].length >= 4) {
							// ok, so we're dealing with x/year. But that's not a full date.
							// This fixes wonky dateElementOrder parsing when set to dmy order.
							if (Date.CultureInfo.dateElementOrder[0] === "d") {
								s = "1/" + n[0] + "/" + n[2]; // set to 1st of month and normalize the seperator
							}
						}
					}
				}
			} catch (e) {
				// continue...
			}

			return s;
		}
	};
}());