(function () {
	/*
	 * The following is a UTF8 conversion process. Technically decodeURIComponent(escape(s)) would work
	 * however there are two downsides that: 
	 *     1) It's slow. Even slower with large text. 
	 *     2) escape was deprecated in JavaScript version 1.5 and it's replacement (encodeURIComponent) doesn't
	 *        have the same behavior.
	 */
	var UTF8_ACCEPT = 0,
		UTF8D = [
			// The first part of the table maps bytes to character classes that
			// to reduce the size of the transition table and create bitmasks.
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
			7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,   7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
			8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,   2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3,  11, 6, 6, 6, 5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,

			// The second part is a transition table that maps a combination
			// of a state of the automaton and a character class to a state.
			0, 12, 24, 36, 60, 96, 84, 12, 12, 12, 48, 72,  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
			12,  0, 12, 12, 12, 12, 12,  0, 12,  0, 12, 12,  12, 24, 12, 12, 12, 12, 12, 24, 12, 24, 12, 12,
			12, 12, 12, 12, 12, 12, 12, 24, 12, 12, 12, 12,  12, 24, 12, 12, 12, 12, 12, 12, 12, 24, 12, 12,
			12, 12, 12, 12, 12, 12, 12, 36, 12, 36, 12, 12,  12, 36, 12, 12, 12, 12, 12, 36, 12, 36, 12, 12,
			12, 36, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
		];
	function decode (utftext) {
		var i, charCode, type,
			codep = 0,
			state = UTF8_ACCEPT,
			string = [],
			len = utftext.length;

		for (i = 0; i < len; i++) {
			charCode = utftext.charCodeAt(i);
			type = UTF8D[charCode];

			if (state !== UTF8_ACCEPT) {
				codep = (charCode & 0x3f) | (codep << 6);
			} else {
				codep = (0xff >> type) & charCode;
			}

			state = UTF8D[256 + state + type];

			if (state === UTF8_ACCEPT) {
				if (codep > 0xffff) {
					string.push(0xD7C0 + (codep >> 10), 0xDC00 + (codep & 0x3FF));
				} else {
					string.push(codep);
				}
			}
		}

		return String.fromCharCode.apply(null, string);
	}
	
	var $D = Date;
	var lang = Date.CultureStrings ? Date.CultureStrings.lang : null;
	var loggedKeys = {}; // for debug purposes.
	var __ = function (key, language) {
		var output, split, length, last;
		var countryCode = (language) ? language : lang;
		if (Date.CultureStrings && Date.CultureStrings[countryCode] && Date.CultureStrings[countryCode][key]) {
			output = (typeof Date.CultureStrings[countryCode][key] === "string") ? decode(Date.CultureStrings[countryCode][key]) : Date.CultureStrings[countryCode][key]; // UTF support
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
				output = new RegExp(decode(Date.CultureStrings[countryCode][key]), "i");
			} else {
				output = new RegExp(key.replace(new RegExp("/", "g"),""), "i");
			}
		}
		loggedKeys[key] = key;
		return output;
	};
	var loadI18nScript = function (code) {
		// paatterned after jQuery's getScript.
		var url = Date.Config.i18n + code + '.js';
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
				done = true;
				events.done();
				head.removeChild(script);
			}
		};

		setTimeout(function() {
			head.insertBefore(script, head.firstChild);
		}, 0); // allows return to execute first
		
		return {
			done: function (f) {
				events.done = function() {
					if (f) {
						f();
					}
				};
			}
		};
	};

	var CultureInfo = function () {
		var buildTimeZones = function (data) {
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
		};
		var info =  {
			name: __("name"),
			englishName: __("englishName"),
			nativeName: __("nativeName"),
			/* Day Name Strings */
			dayNames: [
				__("Sunday"),
				__("Monday"),
				__("Tuesday"),
				__("Wednesday"),
				__("Thursday"),
				__("Friday"),
				__("Saturday")
			],
			abbreviatedDayNames: [
				__("Sun"),
				__("Mon"),
				__("Tue"),
				__("Wed"),
				__("Thu"),
				__("Fri"),
				__("Sat")
			],
			shortestDayNames: [
				__("Su"),
				__("Mo"),
				__("Tu"),
				__("We"),
				__("Th"),
				__("Fr"),
				__("Sa")
			],
			firstLetterDayNames: [
				__("S_Sun_Initial"),
				__("M_Mon_Initial"),
				__("T_Tues_Initial"),
				__("W_Wed_Initial"),
				__("T_Thu_Initial"),
				__("F_Fri_Initial"),
				__("S_Sat_Initial")
			],

			/* Month Name Strings */
			monthNames: [
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
			],
			abbreviatedMonthNames: [
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
			],
			/* AM/PM Designators */
			amDesignator: __("AM"),
			pmDesignator: __("PM"),
			firstDayOfWeek: __("firstDayOfWeek"),
			twoDigitYearMax: __("twoDigitYearMax"),
			dateElementOrder: __("mdy"),
			/* Standard date and time format patterns */
			formatPatterns: {
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
			},
			regexPatterns: {
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
			},
			timezones: [],
			abbreviatedTimeZoneDST: {},
			abbreviatedTimeZoneStandard: {}
		};
		
		info.abbreviatedTimeZoneDST[__("CHADT")] = "+1345";
		info.abbreviatedTimeZoneDST[__("NZDT")] = "+1300";
		info.abbreviatedTimeZoneDST[__("AEDT")] = "+1100";
		info.abbreviatedTimeZoneDST[__("ACDT")] = "+1030";
		info.abbreviatedTimeZoneDST[__("AZST")] = "+0500";
		info.abbreviatedTimeZoneDST[__("IRDT")] = "+0430";
		info.abbreviatedTimeZoneDST[__("EEST")] = "+0300";
		info.abbreviatedTimeZoneDST[__("CEST")] = "+0200";
		info.abbreviatedTimeZoneDST[__("BST")] = "+0100";
		info.abbreviatedTimeZoneDST[__("PMDT")] = "-0200";
		info.abbreviatedTimeZoneDST[__("ADT")] = "-0300";
		info.abbreviatedTimeZoneDST[__("NDT")] = "-0230";
		info.abbreviatedTimeZoneDST[__("EDT")] = "-0400";
		info.abbreviatedTimeZoneDST[__("CDT")] = "-0500";
		info.abbreviatedTimeZoneDST[__("MDT")] = "-0600";
		info.abbreviatedTimeZoneDST[__("PDT")] = "-0700";
		info.abbreviatedTimeZoneDST[__("AKDT")] = "-0800";
		info.abbreviatedTimeZoneDST[__("HADT")] = "-0900";

		info.abbreviatedTimeZoneStandard[__("LINT")] = "+1400";
		info.abbreviatedTimeZoneStandard[__("TOT")] = "+1300";
		info.abbreviatedTimeZoneStandard[__("CHAST")] = "+1245";
		info.abbreviatedTimeZoneStandard[__("NZST")] = "+1200";
		info.abbreviatedTimeZoneStandard[__("NFT")] = "+1130";
		info.abbreviatedTimeZoneStandard[__("SBT")] = "+1100";
		info.abbreviatedTimeZoneStandard[__("AEST")] = "+1000";
		info.abbreviatedTimeZoneStandard[__("ACST")] = "+0930";
		info.abbreviatedTimeZoneStandard[__("JST")] = "+0900";
		info.abbreviatedTimeZoneStandard[__("CWST")] = "+0845";
		info.abbreviatedTimeZoneStandard[__("CT")] = "+0800";
		info.abbreviatedTimeZoneStandard[__("ICT")] = "+0700";
		info.abbreviatedTimeZoneStandard[__("MMT")] = "+0630";
		info.abbreviatedTimeZoneStandard[__("BST")] = "+0600";
		info.abbreviatedTimeZoneStandard[__("NPT")] = "+0545";
		info.abbreviatedTimeZoneStandard[__("IST")] = "+0530";
		info.abbreviatedTimeZoneStandard[__("PKT")] = "+0500";
		info.abbreviatedTimeZoneStandard[__("AFT")] = "+0430";
		info.abbreviatedTimeZoneStandard[__("MSK")] = "+0400";
		info.abbreviatedTimeZoneStandard[__("IRST")] = "+0330";
		info.abbreviatedTimeZoneStandard[__("FET")] = "+0300";
		info.abbreviatedTimeZoneStandard[__("EET")] = "+0200";
		info.abbreviatedTimeZoneStandard[__("CET")] = "+0100";
		info.abbreviatedTimeZoneStandard[__("GMT")] = "+0000";
		info.abbreviatedTimeZoneStandard[__("UTC")] = "+0000";
		info.abbreviatedTimeZoneStandard[__("CVT")] = "-0100";
		info.abbreviatedTimeZoneStandard[__("GST")] = "-0200";
		info.abbreviatedTimeZoneStandard[__("BRT")] = "-0300";
		info.abbreviatedTimeZoneStandard[__("NST")] = "-0330";
		info.abbreviatedTimeZoneStandard[__("AST")] = "-0400";
		info.abbreviatedTimeZoneStandard[__("EST")] = "-0500";
		info.abbreviatedTimeZoneStandard[__("CST")] = "-0600";
		info.abbreviatedTimeZoneStandard[__("MST")] = "-0700";
		info.abbreviatedTimeZoneStandard[__("PST")] = "-0800";
		info.abbreviatedTimeZoneStandard[__("AKST")] = "-0900";
		info.abbreviatedTimeZoneStandard[__("MIT")] = "-0930";
		info.abbreviatedTimeZoneStandard[__("HST")] = "-1000";
		info.abbreviatedTimeZoneStandard[__("SST")] = "-1100";
		info.abbreviatedTimeZoneStandard[__("BIT")] = "-1200";

		buildTimeZones(info);

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
				Date.CultureInfo = CultureInfo();
			} else {
				if (!(!!Date.CultureStrings && !!Date.CultureStrings[code])) {
					if (typeof exports !== 'undefined' && this.exports !== exports) {
						// we're in a Node enviroment, load it using require
						try {
							require("../i18n/" + code + ".js");
							lang = code;
							Date.CultureStrings.lang = code;
							Date.CultureInfo = CultureInfo();
						} catch (e) {
							// var str = "The language for '" + code + "' could not be loaded by Node. It likely does not exist.";
							throw new Error("The DateJS IETF language tag '" + code + "' could not be loaded by Node. It likely does not exist.");
						}
					} else if (Date.Config && Date.Config.i18n) {
						// we know the location of the files, so lets load them
						loadI18nScript(code).done(function(){
							lang = code;
							Date.CultureStrings.lang = code;
							Date.CultureInfo = CultureInfo();
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
			Date.CultureInfo = CultureInfo();
		}
	};
	$D.i18n.updateCultureInfo(); // run automatically
}());