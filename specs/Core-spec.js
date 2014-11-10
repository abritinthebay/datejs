/*globals require, jasmine, describe, it, expect, spyOn */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
if (typeof require === "function") {
	require("../index.js");
}

describe("Core Module", function() {
	describe("has Exception handling for when", function() {
		it("no params are passed to Date.parse()", function() {
			var d = Date.parse("");
			expect(Date.parse.bind(null)).not.toThrow();
			expect(d).toBe(null);
		});
		it("an empty string is passed to Date.parse()", function() {
			var d = Date.parse("");
			expect(Date.parse.bind(null, "")).not.toThrow();
			expect(d).toBe(null);
		});
		it("a junk string is passed to Date.parse()", function() {
			expect(Date.parse.bind(null, "randomstring")).not.toThrow();
			var d = Date.parse("randomstring");
			expect(d).toBe(null);
		});
		it("null is passed to Date.parse()", function() {
			expect(Date.parse.bind(null, null)).not.toThrow();
			var d = Date.parse(null);
			expect(d).toBe(null);
		});
	});
	describe("throws Exceptions when", function() {
		it("compares a valid date to an invalid date", function() {
			var d = new Date("");
			expect(d.compareTo.bind(d, new Date())).toThrow();
		});
		it("checks quality of a valid date to an invalid date", function() {
			var d = new Date("");
			expect(d.equals.bind(d, new Date())).toThrow();
		});
		it("checks equality of a valid date to an invalid date", function() {
			var d = new Date("");
			expect(d.equals.bind(d, new Date())).toThrow();
		});
		it("compares a valid date to invalid type", function() {
			var d = new Date();
			expect(d.compareTo.bind(d, 0)).toThrow(new TypeError(d+ " - " + 0));
		});
		it("checks equality of a valid date with an invalid type", function() {
			var d = new Date();
			expect(d.equals.bind(d, 0)).toThrow(new TypeError(d+ " - " + 0));
		});
		it("compares a valid date to invalid date", function() {
			var d = new Date();
			expect(d.compareTo.bind(d, new Date(""))).toThrow();
		});
		it("checks equality of a valid date with an invalid date", function() {
			var d = new Date();
			expect(d.equals.bind(d, new Date(""))).toThrow();
		});
	});
	describe("has basic functionality that",function (){
		it("sets up (and creates if required) overloaded Date.now", function(){
			var n = Date._now;
			Date.now = undefined;
			Date._now = undefined;
			Date.initOverloads();
			expect(typeof Date.now).toBe("function");
			expect(typeof Date._now).toBe("function");
			expect(typeof Date._now()).toBe("number");
			Date.now = n;
			Date._now = undefined;
			Date.initOverloads(); // will now only created _now with our date.now
			expect(typeof Date.now).toBe("function");
			expect(typeof Date._now).toBe("function");
		});
		it("creates toISOString if no browser support", function(){
			var s = Date.prototype.toISOString;
			Date.prototype.toISOString = undefined;
			Date.initOverloads();
			expect(typeof Date.prototype.toISOString).toBe("function");
			var d = new Date();
			var i = d.toISOString();
			expect(typeof i).toBe("string");
			Date.toISOString = s;
		});
		it("aliases native toString if present", function(){
			var s = Date.prototype._toString;
			Date.prototype._toString = undefined;
			Date.initOverloads();
			expect(typeof Date.prototype._toString).toBe("function");
			Date.prototype._toString = s;
		});
		it("zeros the time", function(){
			var d = new Date();
			d.clearTime();
			expect(d.getHours()).toBe(0);
			expect(d.getMinutes()).toBe(0);
			expect(d.getSeconds()).toBe(0);
			expect(d.getMilliseconds()).toBe(0);
		});
		it("updates time to now", function(){
			var d = new Date(1995, 1,1,1,1,1,1);
			var d2;
			d.setTimeToNow();
			d2 = new Date();
			expect(d.getHours()).toBe(d2.getHours());
			expect(d.getMinutes()).toBe(d2.getMinutes());
			expect(d.getSeconds()).toBe(d2.getSeconds());
			expect(d.getMilliseconds()).toBe(d2.getMilliseconds());
		});
		it("allows chainable todays date with Date.today()", function(){
			var d = Date.today();
			var d2 = new Date();
			expect(d.getHours()).toBe(0);
			expect(d.getMinutes()).toBe(0);
			expect(d.getSeconds()).toBe(0);
			expect(d.getMilliseconds()).toBe(0);
			expect(d.getDate()).toBe(d2.getDate());
			expect(d.getMonth()).toBe(d2.getMonth());
			expect(d.getFullYear()).toBe(d2.getFullYear());
		});
		it("allows chainable todays date and time with Date.present()", function(){
			var d = Date.present();
			var d2 = new Date();
			expect(d.getHours()).toBe(d2.getHours());
			expect(d.getMinutes()).toBe(d2.getMinutes());
			expect(d.getSeconds()).toBe(d2.getSeconds());
			expect(d.getMilliseconds()).toBe(d2.getMilliseconds());
			expect(d.getDate()).toBe(d2.getDate());
			expect(d.getMonth()).toBe(d2.getMonth());
			expect(d.getFullYear()).toBe(d2.getFullYear());
		});
		it("extends Date.now() to also be able to return a Date Object", function(){
			var d = Date.now();
			var d2 = Date.now(true);
			expect(d).toEqual(jasmine.any(Number));
			expect(d2).toEqual(jasmine.any(Date));
		});
		it("gets the Day Name from the Day Number", function(){
			expect(Date.getDayName(5)).toBe("Friday");
		});
		it("gets the Day Number from the Day Name", function(){
			expect(Date.getDayNumberFromName("Sunday")).toBe(0);
			expect(Date.getDayNumberFromName("Sun")).toBe(0);
			expect(Date.getDayNumberFromName("Su")).toBe(0);
			expect(Date.getDayNumberFromName("Monday")).toBe(1);
			expect(Date.getDayNumberFromName("Mon")).toBe(1);
			expect(Date.getDayNumberFromName("Mo")).toBe(1);
			expect(Date.getDayNumberFromName("Tuesday")).toBe(2);
			expect(Date.getDayNumberFromName("Tue")).toBe(2);
			expect(Date.getDayNumberFromName("Tu")).toBe(2);
			expect(Date.getDayNumberFromName("Wednesday")).toBe(3);
			expect(Date.getDayNumberFromName("Wed")).toBe(3);
			expect(Date.getDayNumberFromName("We")).toBe(3);
			expect(Date.getDayNumberFromName("Thursday")).toBe(4);
			expect(Date.getDayNumberFromName("Thu")).toBe(4);
			expect(Date.getDayNumberFromName("Th")).toBe(4);
			expect(Date.getDayNumberFromName("Friday")).toBe(5);
			expect(Date.getDayNumberFromName("Fri")).toBe(5);
			expect(Date.getDayNumberFromName("Fr")).toBe(5);
			expect(Date.getDayNumberFromName("Saturday")).toBe(6);
			expect(Date.getDayNumberFromName("Sat")).toBe(6);
			expect(Date.getDayNumberFromName("Sa")).toBe(6);
			expect(Date.getDayNumberFromName("NotARealDay")).toBe(-1);
		});
		it("gets the Month Name from the Month Number", function(){
			expect(Date.getMonthName(5)).toBe("June");
		});
		it("gets the Month Number from the Month Name", function(){
			expect(Date.getMonthNumberFromName("January")).toBe(0);
			expect(Date.getMonthNumberFromName("Jan")).toBe(0);
			expect(Date.getMonthNumberFromName("February")).toBe(1);
			expect(Date.getMonthNumberFromName("Feb")).toBe(1);
			expect(Date.getMonthNumberFromName("March")).toBe(2);
			expect(Date.getMonthNumberFromName("Mar")).toBe(2);
			expect(Date.getMonthNumberFromName("April")).toBe(3);
			expect(Date.getMonthNumberFromName("Apr")).toBe(3);
			expect(Date.getMonthNumberFromName("May")).toBe(4);
			expect(Date.getMonthNumberFromName("June")).toBe(5);
			expect(Date.getMonthNumberFromName("Jun")).toBe(5);
			expect(Date.getMonthNumberFromName("July")).toBe(6);
			expect(Date.getMonthNumberFromName("Jul")).toBe(6);
			expect(Date.getMonthNumberFromName("August")).toBe(7);
			expect(Date.getMonthNumberFromName("Aug")).toBe(7);
			expect(Date.getMonthNumberFromName("September")).toBe(8);
			expect(Date.getMonthNumberFromName("Sep")).toBe(8);
			expect(Date.getMonthNumberFromName("October")).toBe(9);
			expect(Date.getMonthNumberFromName("Oct")).toBe(9);
			expect(Date.getMonthNumberFromName("November")).toBe(10);
			expect(Date.getMonthNumberFromName("Nov")).toBe(10);
			expect(Date.getMonthNumberFromName("December")).toBe(11);
			expect(Date.getMonthNumberFromName("Dec")).toBe(11);
			expect(Date.getMonthNumberFromName("NotARealMonth")).toBe(-1);

		});
		it("can check if a year is a leap year or not", function() {
			expect(Date.isLeapYear(2008)).toBe(true);
			expect(Date.isLeapYear(1995)).toBe(false);
		});
		it("can get the number of days in a given month", function() {
			var leap = Date.isLeapYear(Date.today().getFullYear()) ? 29 : 28;
			expect(Date.getDaysInMonth(0)).toBe(31);
			expect(Date.getDaysInMonth(1)).toBe(leap);
			expect(Date.getDaysInMonth(2)).toBe(31);
			expect(Date.getDaysInMonth(3)).toBe(30);
			expect(Date.getDaysInMonth(4)).toBe(31);
			expect(Date.getDaysInMonth(5)).toBe(30);
			expect(Date.getDaysInMonth(6)).toBe(31);
			expect(Date.getDaysInMonth(7)).toBe(31);
			expect(Date.getDaysInMonth(8)).toBe(30);
			expect(Date.getDaysInMonth(9)).toBe(31);
			expect(Date.getDaysInMonth(10)).toBe(30);
			expect(Date.getDaysInMonth(11)).toBe(31);
		});
		it("can get the number of days in a given month and year including leap years", function() {
			expect(Date.getDaysInMonth(2009, 1)).toBe(28);
			expect(Date.getDaysInMonth(2008, 1)).toBe(29);
		});
		it("can get the Timezone abbrivation with or without Daylight Savings Time", function() {
			expect(Date.getTimezoneAbbreviation("+0100", false)).toBe("CET");
			expect(Date.getTimezoneAbbreviation("+0100", true)).toBe("BST");
			expect(Date.getTimezoneAbbreviation("NotARealOffset")).toBeNull();
		});
		it("can get the Timezone offset from the abbrivation", function() {
			expect(Date.getTimezoneOffset("CET")).toBe("+0100");
			expect(Date.getTimezoneOffset("BST", true)).toBe("+0100"); // forces dst priority
			expect(Date.getTimezoneOffset("BST")).toBe("+0600"); // Bangladesh Standard Time
			expect(Date.getTimezoneOffset("NotARealTimeZone")).toBeNull();
		});
		it("can get the correct Quarter a Date is in", function() {
			var d = new Date(1995, 11, 4, 0, 0, 0, 0);
			expect(Date.getQuarter(d)).toBe(4);
		});
		it("can get the correct number of days left in a Quarter", function() {
			var d = new Date(1995, 11, 4, 0, 0, 0, 0);
			expect(Date.getDaysLeftInQuarter(d)).toBe(27);
		});
		it("can clone Dates", function() {
			var d = new Date(1995, 11, 4, 0, 0, 0, 0);
			var d2 = d.clone();
			expect(d2.getTime()).toBe(d.getTime());
		});
	});
	describe("can Compare dates like",function (){
		it("today == today", function() {
			expect(Date.today().compareTo(Date.today())).toBe(0);
		});
		it("today > yesterday", function() {
			expect(Date.today().compareTo(Date.today().addDays(-1))).toBe(1);
		});
		it("today < tomorrow", function() {
			expect(Date.today().compareTo(Date.today().addDays(1))).toBe(-1);
		});
	});
	describe("can check Equality of",function (){
		it("today == today", function() {
			expect(Date.today().equals(Date.today())).toBe(true);
		});
		it("today != yesterday", function() {
			expect(Date.today().equals(Date.today().addDays(-1))).not.toBe(true);
		});
		it("today != tomorrow", function() {
			expect(Date.today().equals(Date.today().addDays(1))).not.toBe(true);
		});
	});
	describe("can check relativity like if a Date",function (){
		it("is between dates", function() {
			var d = new Date(1995,11,4);
			var b = d.between(new Date(1994, 0), new Date(1996, 0));
			expect(b).toBe(true);
		});
		it("is after a date", function() {
			var d = new Date(1995,11,4);
			var a = d.isAfter(new Date(1996, 0));
			var b = d.isAfter(new Date(1994, 0));
			expect(a).toBe(false);
			expect(b).toBe(true);
		});
		it("is before a date", function() {
			var d = new Date(1995,11,4);
			var a = d.isBefore(new Date(1996, 0));
			var b = d.isBefore(new Date(1994, 0));
			expect(a).toBe(true);
			expect(b).toBe(false);
		});
		it("is today", function() {
			var d = Date.today();
			expect(d.isToday()).toBe(true);
		});
		it("is same day", function() {
			var d = new Date(1995,11,4);
			var d2 = new Date(1995,11,4);
			expect(d.isSameDay(d2)).toBe(true);
		});
	});
	describe("can get and set Date attributes like",function (){
		it("get the week number", function() {
			var d = new Date(1995,11,4);
			expect(d.getWeek()).toBe(49);
		});
		it("get the ISO week number", function() {
			var d = new Date(1995,11,4);
			expect(d.getISOWeek()).toBe("49");
		});
		it("get the days left in the Quarter", function() {
			var d = new Date(1995,11,4);
			expect(d.getDaysLeftInQuarter()).toBe(27);
		});
		it("get the ordinate of the current date", function() {
			var d = new Date(1995,11,4);
			expect(d.getOrdinate()).toBe("th");
		});
		it("get the ordinal day number of the current date", function() {
			var d = new Date(1995,11,4);
			expect(d.getOrdinalNumber()).toBe(338);
		});
		it("get the UTCOffset of a date", function() {
			var d = new Date(1995,11,4);
			expect(d.getUTCOffset(480)).toBe("-0800");
			expect(d.getUTCOffset(-480)).toBe("+0800");
		});
		it("get the time elapsed between current date and supplied date", function() {
			var d = new Date(1995,11,4);
			var d2 = new Date(1995,11,4,0,0,0,250);
			expect(d.getElapsed(d2)).toBe(250);
		});
		it("move to the first day of the month", function() {
			var d = new Date(1995,1,3);
			d.moveToFirstDayOfMonth();
			expect(d.getDate()).toBe(1);
		});
		it("move to the last day of the month", function() {
			var d = new Date(1995,1,3);
			var d2 = new Date(2004,1,3);
			d.moveToLastDayOfMonth();
			d2.moveToLastDayOfMonth();
			expect(d.getDate()).toBe(28);
			expect(d2.getDate()).toBe(29);
		});
		it("move to the nth occurance of a weekday in the month", function() {
			var d = new Date(1995,11,4);
			d.moveToNthOccurrence(0, -1); // sunday, last occurrence
			expect(d.getDate()).toBe(31);
			d.moveToNthOccurrence(6, -1); // saturday, last occurrence
			expect(d.getDate()).toBe(30);
			d.moveToNthOccurrence(0, 1); // sunday, 1st occurrence
			expect(d.getDate()).toBe(3);
			d.moveToNthOccurrence(0, 2); // sunday, 2nd occurrence
			expect(d.getDate()).toBe(10);
			d.moveToNthOccurrence(0, 3); // sunday, 3rd occurrence
			expect(d.getDate()).toBe(17);
			d.moveToNthOccurrence(0, 4); // sunday, 4th occurrence
			expect(d.getDate()).toBe(24);
			d.moveToNthOccurrence(0, 5); // sunday, 5th occurrence
			expect(d.getDate()).toBe(31);
			d.moveToNthOccurrence("Weekday", 1); // first weekday
			expect(d.getDate()).toBe(1);
			d.moveToNthOccurrence("Weekday", -1); // last weekday
			expect(d.getDate()).toBe(29);
			d = new Date(1995,11,4);
			d.moveToNthOccurrence("Weekday", 0); // does nothing
			expect(d.getDate()).toBe(4);
			d = new Date(1995,10,4);
			d.moveToNthOccurrence("Weekday", -1); // last weekday, when last day is weekday
			expect(d.getDate()).toBe(30);
		});
		it("move to a month - changing year if appropriate", function() {
			var d = new Date(1995,11,4);
			d.moveToMonth(3);
			expect(d.getMonth()).toBe(3);
			expect(d.getFullYear()).toBe(1996);
			d.moveToMonth(11, -1);
			expect(d.getMonth()).toBe(11);
			expect(d.getFullYear()).toBe(1995);
		});
	});
	describe("can set Date attributes like",function (){
		it("milliseconds", function() {
			var d = new Date(2010, 1, 1);
			var t = d.getTime();
			d.set({millisecond: 250});
			expect(d.getTime()).toBe(t+250);
		});
		it("seconds", function() {
			var d = new Date(2010, 1, 1);
			var t = d.getTime();
			d.set({second: 3});
			expect(d.getTime()).toBe(t+3000);
		});
		it("minutes", function() {
			var d = new Date(2010, 1, 1);
			d.set({minute: 30});
			expect(d.getMinutes()).toBe(30);
		});
		it("hours", function() {
			var d = new Date(2010, 1, 1);
			d.set({hour: 1});
			expect(d.getHours()).toBe(1);
		});
		it("add weekdays", function() {
			var d = new Date(2010, 1, 1);
			d.addWeekdays(4);
			expect(d.getDay()).toBe(5);
			d.addWeekdays(1);
			expect(d.getDay()).toBe(1);
			d.next().sunday();
			d.addWeekdays(1);
			expect(d.getDay()).toBe(1);
			d.next().monday();
			d.addWeekdays(-1);
			expect(d.getDay()).toBe(5);
			d.next().sunday();
			d.addWeekdays(-1);
			expect(d.getDay()).toBe(5);
			d.next().sunday();
			d.addDays(-1);
			d.addWeekdays(2);
			expect(d.getDay()).toBe(2);
		});
		it("day", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 1, 10);
			d2.set({day: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("weeks", function() {
			var d = new Date(2013, 1, 1);
			var w = d.getWeek();
			d.addWeeks(1);
			expect(d.getWeek()).toBe(w+1);
			d.setWeek(16);
			expect(d.getDate()).toBe(15);
			expect(d.getMonth()).toBe(3);
			d.set({week: 5});
			expect(d.getDate()).toBe(28);
			expect(d.getMonth()).toBe(0);
			// bug check
			d = new Date(2014, 11, 22) // Mon Dec 22 2014 00:00:00 GMT
			d.setWeek(52);
			expect(d.getDate()).toBe(22);
			expect(d.getMonth()).toBe(11);
			expect(d.getFullYear()).toBe(2014);
		});
		it("month", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 2, 1);
			d2.set({month: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("quarter", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 4, 1);
			var d3 = new Date(2010, 1, 1);
			d1.addQuarters(1);
			expect(d1.equals(d2)).toBe(true);
			expect(d1.getQuarter()).toBe(2);
			d1.setQuarter(1);
			expect(d1.equals(d3)).toBe(true);
			expect(d1.getQuarter()).toBe(1);
		});
		it("timezone", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = d1.clone().add(-8).hours();
			d1.set({timezone: "GMT"});
			expect(d1.equals(d2)).toBe(true);
		});
		it("timezone offset", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = d1.clone().add(-3).hours();
			var d3 = d1.clone();
			var d4 = d1.clone().add(-9).hours();
			d1.set({timezoneOffset: "-0500"});
			expect(d1.equals(d2)).toBe(true);
			d3.set({timezoneOffset: "+0100"});
			expect(d3.equals(d4)).toBe(true);
		});
		// timezoneOffset
		it("year", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2011, 1, 1);
			d2.set({year: 2010});
			expect(d1.equals(d2)).toBe(true);
		});
		it("year, but throws an exception when type is wrong", function() {
			var d = new Date(2010, 1, 1);
			expect(d.set.bind(d, {year: "string"})).toThrow(new TypeError("string is not a Number."));
		});
		it("year from leap day and preserve the month", function() {
			var d1 = new Date(2009, 1, 28);
			var d2 = new Date(2008, 1, 29);
			d2.set({year: 2009});
			expect(d1.equals(d2)).toBe(true);
		});
		it("month and adjust to correct last day of month", function() {
			var d1 = new Date(2009, 1, 28);
			var d2 = new Date(2009, 0, 31);
			d2.set({month: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("month and adjust correctly to a leap day", function() {
			var d1 = new Date(2008, 1, 29);
			var d2 = new Date(2008, 2, 31);
			d2.set({month: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("same day", function() {
			var d1 = new Date(2008, 1, 29);
			var d2 = new Date(2008, 1, 29);
			d2.set({day: 29});
			expect(d1.equals(d2)).toBe(true);
		});
		it("same month", function() {
			var d1 = new Date(2008, 1, 29);
			var d2 = new Date(2008, 1, 29);
			d2.set({month: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("same year", function() {
			var d1 = new Date(2008, 1, 29);
			var d2 = new Date(2008, 1, 29);
			d2.set({year: 2008});
			expect(d1.equals(d2)).toBe(true);
		});
		it("day, ignoring invalid month, year, and milliseconds", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 1, 10);
			d2.set({day: 1, month: 24, year: -271823, milliseconds: 20000});
			expect(d1.equals(d2)).toBe(true);
		});
		it("can add to any property", function() {
			var d = new Date(2010, 0, 1);
			var d2 = new Date(2011, 1, 9, 10, 10, 10, 10);
			d.add({
				milliseconds: 10,
				seconds: 10,
				minutes: 10,
				hours: 10,
				weeks: 1,
				months: 1,
				years: 1,
				days: 1
			});
			expect(d.equals(d2)).toBe(true);
			d.add(1).day();
			d2 = new Date(2011, 1, 10, 10, 10, 10, 10);
			expect(d.equals(d2)).toBe(true);
		});
		it("validates undefined values correctly", function () {
			expect(Date.validateSecond(undefined)).toBe(false);
		});

	});
	describe("has Timezone support that", function() {
		it("can check if the current location has Daylight Savings Time", function() {
			var d = Date.today();
			expect(d.hasDaylightSavingTime()).toBe(true);
		});
		it("can check if a date is in Daylight Savings Time", function() {
			var d = new Date(2013, 6, 1);
			expect(d.isDaylightSavingTime()).toBe(true);
			d.set({month: 11});
			expect(d.isDaylightSavingTime()).toBe(false);
		});
		it("can get the current timezone", function() {
			var d = Date.today();
			if (d.isDaylightSavingTime()) {
				expect(d.getTimezone()).toBe("PDT");
			} else {
				expect(d.getTimezone()).toBe("PST");
			}
		});
	});
	describe("can convert Date toString in various formats", function(){
		var d = new Date(1995, 11, 4, 0, 0, 0, 0);
		describe("has CultureInfo defined standard formats", function(){
			it("d == shortDate", function() {
				expect(d.toString("d")).toBe("12/4/1995");
			});
			it("D == longDate", function() {
				expect(d.toString("D")).toBe("Monday, December 04, 1995");
			});
			it("F == fullDateTime", function() {
				expect(d.toString("F")).toBe("Monday, December 04, 1995 12:00:00 AM");
			});
			it("m == monthDay", function() {
				expect(d.toString("m")).toBe("December 04");
			});
			it("r == RFC1123", function() {
				expect(d.toString("r")).toBe("Mon, 04 Dec 1995 08:00:00 GMT");
				expect(d.toString("R")).toBe("Mon, 04 Dec 1995 08:00:00 GMT");
			});
			it("s == sortableDateTime", function() {
				expect(d.toString("s")).toBe("1995-12-04T00:00:00");
			});
			it("t == shortTime", function() {
				expect(d.toString("t")).toBe("12:00 AM");
			});
			it("T == longTime", function() {
				expect(d.toString("T")).toBe("12:00:00 AM");
			});
			it("u == universalSortableDateTime", function() {
				expect(d.toString("u")).toBe("1995-12-04 08:00:00Z");
			});
			it("y == yearMonth", function() {
				expect(d.toString("y")).toBe("December, 1995");
			});
			it("W == Week Number", function() {
				expect(d.toString("W")).toBe("49");
				var d2 = d.clone();
				d2.addWeeks(4);
				expect(d2.toString("W")).toBe("1");
			});
			it("WW == ISO Week Number", function() {
				var d2 = d.clone();
				d2.addWeeks(4);
				expect(d2.toString("WW")).toBe("01");
			});
		});

		it("doesn't parse strings between [ and ]", function() {
			expect(d.toString("[the date is] MM/dd/yyyy")).toBe("the date is 12/04/1995");
		});
		it("hh:mm tt", function() {
			expect(d.toString("hh:mm tt")).toBe("12:00 AM");
		});
		it("MMMM dddd, yyyy - hh:mm:ss tt", function() {
			expect(d.toString("MMMM dd, yyyy - hh:mm:ss tt")).toBe("December 04, 1995 - 12:00:00 AM");
		});
		it("MMM dS, 'yy - HH:mm", function() {
			expect(d.toString("MMM dS, 'yy - HH:mm")).toBe("Dec 4th, '95 - 00:00");
		});
		it("ddd dS @ h:mmt", function() {
			expect(d.toString("ddd dS @ h:mmt")).toBe("Mon 4th @ 12:00A");
		});
		it("MM/dd/yyyy", function() {
			expect(d.toString("MM/dd/yyyy")).toBe("12/04/1995");
		});
		it("dddd H m s", function() {
			var d2 = d.clone();
			d2.set({minute: 14, second: 12});
			expect(d2.toString("dddd H m s")).toBe("Monday 0 14 12");
		});
		it("fixes incorrectly escaped characters", function() {
			expect(d.toString("\\MM/\\dd/\\yyyy")).toBe("MM/dd/yyyy");
		});
		it("returns unknown string unchanged", function() {
			expect(d.toString("xxxxxzxz")).toBe("xxxxxzxz");
		});
		it("works with different ordinal suffixes (1st,2nd,3rd,4th..)", function() {
			expect(d.toString("S")).toBe("th");
			d.addDays(-1);
			expect(d.toString("S")).toBe("rd");
			d.addDays(-1);
			expect(d.toString("S")).toBe("nd");
			d.addDays(-1);
			expect(d.toString("S")).toBe("st");
		});
		it("can output quarters with 'q' and 'Q'", function() {
			expect(d.toString("Q")).toBe("Q4");
			expect(d.toString("q")).toBe("4");
		});
	});
});
