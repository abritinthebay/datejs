(function () {
	var $D = Date;
	var lang = Date.CultureStrings ? Date.CultureStrings.lang : null;
	var loggedKeys = {}; // for debug purposes.
	var __ = function (key, language) {
		var output, split, length, last;
		var countryCode = (language) ? language : lang;
		if (Date.CultureStrings && Date.CultureStrings[countryCode] && Date.CultureStrings[countryCode][key]) {
			output = Date.CultureStrings[countryCode][key];
		} else {
			switch(key) {
				case "name":
					output = "en-US";
					break;
				case "englishName":
					output = "English (United States)";
					break;
				case "nativeName":
					output = "English (United States)";
					break;
				case "twoDigitYearMax":
					output = 2049;
					break;
				case "firstDayOfWeek":
					output = 0;
					break;
				default:
					output = key;
					split = key.split("_");
					length = split.length;
					if (length > 1 && key.charAt(0) !== "/") {
						// if the key isn't a regex and it has a split.
						last = split[(length - 1)].toLowerCase();
						if (last === "initial" || last === "abbr") {
							output = split[0];
						}
					}
			}
		}
		if (key.charAt(0) === "/") {
			// Assume it's a regex
			if (Date.CultureStrings && Date.CultureStrings[countryCode] && Date.CultureStrings[countryCode][key]) {
				output = new RegExp(Date.CultureStrings[countryCode][key], "i");
			} else {
				output = new RegExp(key.replace(new RegExp("/", "g"),""), "i");
			}
		}
		loggedKeys[key] = key;
		return output;
	};
	var loadI18nScript = function (code) {
		// paatterned after jQuery's getScript.
		var url = Date.Config.i18n + code + ".js";
		var head = document.getElementsByTagName("head")[0] || document.documentElement;
		var script = document.createElement("script");
		script.src = url;

		var completed = false;
		var events = {
			done: function (){} // dummy function
		};
		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function() {
			if ( !completed && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
				events.done();
				head.removeChild(script);
			}
		};

		setTimeout(function() {
			head.insertBefore(script, head.firstChild);
		}, 0); // allows return to execute first
		
		return {
			done: function (cb) {
				events.done = function() {
					if (cb) {
						cb();
					}
				};
			}
		};
	};

	var buildInfo = {
		timeZoneDST: function () {
			var DST = {};
			DST[__("CHADT")] = "+1345";
			DST[__("NZDT")] = "+1300";
			DST[__("AEDT")] = "+1100";
			DST[__("ACDT")] = "+1030";
			DST[__("AZST")] = "+0500";
			DST[__("IRDT")] = "+0430";
			DST[__("EEST")] = "+0300";
			DST[__("CEST")] = "+0200";
			DST[__("BST")] = "+0100";
			DST[__("PMDT")] = "-0200";
			DST[__("ADT")] = "-0300";
			DST[__("NDT")] = "-0230";
			DST[__("EDT")] = "-0400";
			DST[__("CDT")] = "-0500";
			DST[__("MDT")] = "-0600";
			DST[__("PDT")] = "-0700";
			DST[__("AKDT")] = "-0800";
			DST[__("HADT")] = "-0900";
			return DST;
		},
		timeZoneStandard: function () {
			var standard = {};
			standard[__("LINT")] = "+1400";
			standard[__("TOT")] = "+1300";
			standard[__("CHAST")] = "+1245";
			standard[__("NZST")] = "+1200";
			standard[__("NFT")] = "+1130";
			standard[__("SBT")] = "+1100";
			standard[__("AEST")] = "+1000";
			standard[__("ACST")] = "+0930";
			standard[__("JST")] = "+0900";
			standard[__("CWST")] = "+0845";
			standard[__("CT")] = "+0800";
			standard[__("ICT")] = "+0700";
			standard[__("MMT")] = "+0630";
			standard[__("BST")] = "+0600";
			standard[__("NPT")] = "+0545";
			standard[__("IST")] = "+0530";
			standard[__("PKT")] = "+0500";
			standard[__("AFT")] = "+0430";
			standard[__("MSK")] = "+0400";
			standard[__("IRST")] = "+0330";
			standard[__("FET")] = "+0300";
			standard[__("EET")] = "+0200";
			standard[__("CET")] = "+0100";
			standard[__("GMT")] = "+0000";
			standard[__("UTC")] = "+0000";
			standard[__("CVT")] = "-0100";
			standard[__("GST")] = "-0200";
			standard[__("BRT")] = "-0300";
			standard[__("NST")] = "-0330";
			standard[__("AST")] = "-0400";
			standard[__("EST")] = "-0500";
			standard[__("CST")] = "-0600";
			standard[__("MST")] = "-0700";
			standard[__("PST")] = "-0800";
			standard[__("AKST")] = "-0900";
			standard[__("MIT")] = "-0930";
			standard[__("HST")] = "-1000";
			standard[__("SST")] = "-1100";
			standard[__("BIT")] = "-1200";
			return standard;
		},
		timeZones: function (data) {
			var zone;
			for (zone in data.abbreviatedTimeZoneStandard) {
				if (data.abbreviatedTimeZoneStandard.hasOwnProperty(zone)) {
					data.timezones.push({ name: zone, offset: data.abbreviatedTimeZoneStandard[zone]});
				}
			}
			for (zone in data.abbreviatedTimeZoneDST) {
				if (data.abbreviatedTimeZoneDST.hasOwnProperty(zone)) {
					data.timezones.push({ name: zone, offset: data.abbreviatedTimeZoneDST[zone], dst: true});
				}
			}
			return data.timezones;
		},
		days: function () {
			return [
				__("Sunday"),
				__("Monday"),
				__("Tuesday"),
				__("Wednesday"),
				__("Thursday"),
				__("Friday"),
				__("Saturday")
			];
		},
		dayAbbr: function () {
			return [
				__("Sun"),
				__("Mon"),
				__("Tue"),
				__("Wed"),
				__("Thu"),
				__("Fri"),
				__("Sat")
			];
		},
		dayShortNames: function () {
			return [
				__("Su"),
				__("Mo"),
				__("Tu"),
				__("We"),
				__("Th"),
				__("Fr"),
				__("Sa")
			];
		},
		dayFirstLetters: function () {
			return [
				__("S_Sun_Initial"),
				__("M_Mon_Initial"),
				__("T_Tues_Initial"),
				__("W_Wed_Initial"),
				__("T_Thu_Initial"),
				__("F_Fri_Initial"),
				__("S_Sat_Initial")
			];
		},
		months: function () {
			return [
				__("January"),
				__("February"),
				__("March"),
				__("April"),
				__("May"),
				__("June"),
				__("July"),
				__("August"),
				__("September"),
				__("October"),
				__("November"),
				__("December")
			];
		},
		monthAbbr: function () {
			return [
				__("Jan_Abbr"),
				__("Feb_Abbr"),
				__("Mar_Abbr"),
				__("Apr_Abbr"),
				__("May_Abbr"),
				__("Jun_Abbr"),
				__("Jul_Abbr"),
				__("Aug_Abbr"),
				__("Sep_Abbr"),
				__("Oct_Abbr"),
				__("Nov_Abbr"),
				__("Dec_Abbr")
			];
		},
		formatPatterns: function () {
			return {
				shortDate: __("M/d/yyyy"),
				longDate: __("dddd, MMMM dd, yyyy"),
				shortTime: __("h:mm tt"),
				longTime: __("h:mm:ss tt"),
				fullDateTime: __("dddd, MMMM dd, yyyy h:mm:ss tt"),
				sortableDateTime: __("yyyy-MM-ddTHH:mm:ss"),
				universalSortableDateTime: __("yyyy-MM-dd HH:mm:ssZ"),
				rfc1123: __("ddd, dd MMM yyyy HH:mm:ss"),
				monthDay: __("MMMM dd"),
				yearMonth: __("MMMM, yyyy")
			};
		},
		regex: function () {
			return {
				inTheMorning: __("/( in the )(morn(ing)?)\\b/"),
				thisMorning: __("/(this )(morn(ing)?)\\b/"),
				amThisMorning: __("/(\b\\d(am)? )(this )(morn(ing)?)/"),
				inTheEvening: __("/( in the )(even(ing)?)\\b/"),
				thisEvening: __("/(this )(even(ing)?)\\b/"),
				pmThisEvening: __("/(\b\\d(pm)? )(this )(even(ing)?)/"),
				jan: __("/jan(uary)?/"),
				feb: __("/feb(ruary)?/"),
				mar: __("/mar(ch)?/"),
				apr: __("/apr(il)?/"),
				may: __("/may/"),
				jun: __("/jun(e)?/"),
				jul: __("/jul(y)?/"),
				aug: __("/aug(ust)?/"),
				sep: __("/sep(t(ember)?)?/"),
				oct: __("/oct(ober)?/"),
				nov: __("/nov(ember)?/"),
				dec: __("/dec(ember)?/"),
				sun: __("/^su(n(day)?)?/"),
				mon: __("/^mo(n(day)?)?/"),
				tue: __("/^tu(e(s(day)?)?)?/"),
				wed: __("/^we(d(nesday)?)?/"),
				thu: __("/^th(u(r(s(day)?)?)?)?/"),
				fri: __("/fr(i(day)?)?/"),
				sat: __("/^sa(t(urday)?)?/"),
				future: __("/^next/"),
				past: __("/last|past|prev(ious)?/"),
				add: __("/^(\\+|aft(er)?|from|hence)/"),
				subtract: __("/^(\\-|bef(ore)?|ago)/"),
				yesterday: __("/^yes(terday)?/"),
				today: __("/^t(od(ay)?)?/"),
				tomorrow: __("/^tom(orrow)?/"),
				now: __("/^n(ow)?/"),
				millisecond: __("/^ms|milli(second)?s?/"),
				second: __("/^sec(ond)?s?/"),
				minute: __("/^mn|min(ute)?s?/"),
				hour: __("/^h(our)?s?/"),
				week: __("/^w(eek)?s?/"),
				month: __("/^m(onth)?s?/"),
				day: __("/^d(ay)?s?/"),
				year: __("/^y(ear)?s?/"),
				shortMeridian: __("/^(a|p)/"),
				longMeridian: __("/^(a\\.?m?\\.?|p\\.?m?\\.?)/"),
				timezone: __("/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\\s*(\\+|\\-)\\s*\\d\\d\\d\\d?)|gmt|utc)/"),
				ordinalSuffix: __("/^\\s*(st|nd|rd|th)/"),
				timeContext: __("/^\\s*(\\:|a(?!u|p)|p)/")
			};
		}
	};

	var CultureInfo = function () {
		var info =  {
			name: __("name"),
			englishName: __("englishName"),
			nativeName: __("nativeName"),
			timezones: [],
			abbreviatedTimeZoneDST: {},
			abbreviatedTimeZoneStandard: {},
			dayNames: buildInfo.days(),
			abbreviatedDayNames: buildInfo.dayAbbr(),
			shortestDayNames: buildInfo.dayShortNames(),
			firstLetterDayNames: buildInfo.dayFirstLetters(),
			monthNames: buildInfo.months(),
			abbreviatedMonthNames: buildInfo.monthAbbr(),
			amDesignator: __("AM"),
			pmDesignator: __("PM"),
			firstDayOfWeek: __("firstDayOfWeek"),
			twoDigitYearMax: __("twoDigitYearMax"),
			dateElementOrder: __("mdy"),
			formatPatterns: buildInfo.formatPatterns(),
			regexPatterns: buildInfo.regex()
		};

		info.abbreviatedTimeZoneDST = buildInfo.timeZoneDST();
		info.abbreviatedTimeZoneStandard = buildInfo.timeZoneStandard();
		buildInfo.timeZones(info);

		return info;
	};

	$D.i18n = {
		__: function (key, lang) {
			return __(key, lang);
		},
		currentLanguage: function () {
			return lang || "en-US";
		},
		setLanguage: function (code, force) {
			if (force || code === "en-US" || (!!Date.CultureStrings && !!Date.CultureStrings[code])) {
				lang = code;
				Date.CultureStrings.lang = code;
				Date.CultureInfo = new CultureInfo();
			} else {
				if (!(!!Date.CultureStrings && !!Date.CultureStrings[code])) {
					if (typeof exports !== "undefined" && this.exports !== exports) {
						// we're in a Node enviroment, load it using require
						try {
							require("../i18n/" + code + ".js");
							lang = code;
							Date.CultureStrings.lang = code;
							Date.CultureInfo = new CultureInfo();
						} catch (e) {
							// var str = "The language for '" + code + "' could not be loaded by Node. It likely does not exist.";
							throw new Error("The DateJS IETF language tag '" + code + "' could not be loaded by Node. It likely does not exist.");
						}
					} else if (Date.Config && Date.Config.i18n) {
						// we know the location of the files, so lets load them
						loadI18nScript(code).done(function(){
							lang = code;
							Date.CultureStrings.lang = code;
							Date.CultureInfo = new CultureInfo();
						});
					} else {
						Date.console.error("The DateJS IETF language tag '" + code + "' is not available and has not been loaded.");
				
					}
				}
			}
		},
		getLoggedKeys: function () {
			return loggedKeys;
		},
		updateCultureInfo: function () {
			Date.CultureInfo = new CultureInfo();
		}
	};
	$D.i18n.updateCultureInfo(); // run automatically
}());