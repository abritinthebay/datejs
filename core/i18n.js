(function () {
	var $D = Date;
	var __ = function (key) {
		var output, split, length, last;
		if (Date.CultureStrings[key]) {
			output = Date.CultureStrings[key];
		} else {
			output = key;
			split = key.split("_");
			length = split.length;
			if (length > 1 && key.charAt(0) !== "^") {
				// if the key isn't a regex and it has a split.
				last = split[(length - 1)].toLowerCase();
				if (last === "initial" || last === "abbr") {
					output = split[0];
				}
			}
		}
		if (key.charAt(0) === "^") {
			// it's a regex
			output = new RegExp(key);
		}
		return output;
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
					data.timezones.push({ name: zone, offset: data.abbreviatedTimeZoneDST[zone]});
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
				rfc1123: __("ddd, dd MMM yyyy HH:mm:ss GMT"),
				monthDay: __("MMMM dd"),
				yearMonth: __("MMMM, yyyy")
			},
			regexPatterns: {
				jan: __("^jan(uary)?/i"),
				feb: __("^feb(ruary)?/i"),
				mar: __("^mar(ch)?/i"),
				apr: __("^apr(il)?/i"),
				may: __("^may/i"),
				jun: __("^jun(e)?/i"),
				jul: __("^jul(y)?/i"),
				aug: __("^aug(ust)?/i"),
				sep: __("^sep(t(ember)?)?/i"),
				oct: __("^oct(ober)?/i"),
				nov: __("^nov(ember)?/i"),
				dec: __("^dec(ember)?/i"),
				sun: __("^su(n(day)?)?/i"),
				mon: __("^mo(n(day)?)?/i"),
				tue: __("^tu(e(s(day)?)?)?/i"),
				wed: __("^we(d(nesday)?)?/i"),
				thu: __("^th(u(r(s(day)?)?)?)?/i"),
				fri: __("^fr(i(day)?)?/i"),
				sat: __("^sa(t(urday)?)?/i"),
				future: __("^next/i"),
				past: __("^last|past|prev(ious)?/i"),
				add: __("^(\\+|aft(er)?|from|hence)/i"),
				subtract: __("^(\\-|bef(ore)?|ago)/i"),
				yesterday: __("^yes(terday)?/i"),
				today: __("^t(od(ay)?)?/i"),
				tomorrow: __("^tom(orrow)?/i"),
				now: __("^n(ow)?/i"),
				millisecond: __("^ms|milli(second)?s?/i"),
				second: __("^sec(ond)?s?/i"),
				minute: __("^mn|min(ute)?s?/i"),
				hour: __("^h(our)?s?/i"),
				week: __("^w(eek)?s?/i"),
				month: __("^m(onth)?s?/i"),
				day: __("^d(ay)?s?/i"),
				year: __("^y(ear)?s?/i"),
				shortMeridian: __("^(a|p)/i"),
				longMeridian: __("^(a\\.?m?\\.?|p\\.?m?\\.?)/i"),
				timezone: __("^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\\s*(\\+|\\-)\\s*\\d\\d\\d\\d?)|gmt|utc)/i"),
				ordinalSuffix: __("^\\s*(st|nd|rd|th)/i"),
				timeContext: __("^\\s*(\\:|a(?!u|p)|p)/i")
			},
			timezones: [
				// { name: "UTC", offset: "-000"},
				// { name: "GMT", offset: "-000"},
				// { name: "EST", offset: "-0500"},
				// { name: "EDT", offset: "-0400"},
				// { name: "CST", offset: "-0600"},
				// { name: "CDT", offset: "-0500"},
				// { name: "MST", offset: "-0700"},
				// { name: "MDT", offset: "-0600"},
				// { name: "PST", offset: "-0800"},
				// { name: "PDT", offset: "-0700"}
			],
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
		info.abbreviatedTimeZoneStandard[__("UTC")] = "+000";
		info.abbreviatedTimeZoneStandard[__("GMT")] = "+000";
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

	$D.l18n = {
		__: function (key) {
			return __(key);
		},
		updateCultureInfo: function () {
			$D.CultureInfo = CultureInfo();
		},
	};
	$D.l18n.updateCultureInfo(); // run automatically
}());