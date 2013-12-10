/*globals require, jasmine, describe, it, expect, spyOn */
require("../build/developement/date.js");

describe("Core Library", function() {
	describe("has Exception handling for when", function() {
		it("no params are passed to Date.parse()", function() {
			var d = Date.parse();
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
			var d2 = new Date();
			d.setTimeToNow();
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
		});
		it("can get the Timezone offset from the abbrivation", function() {
			expect(Date.getTimezoneOffset("CET")).toBe("+0100");
			expect(Date.getTimezoneOffset("BST", true)).toBe("+0100"); // forces dst priority
			expect(Date.getTimezoneOffset("BST")).toBe("+0600"); // Bangladesh Standard Time
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
	});
	describe("can set Date attributes like",function (){
		// millisecond
		// second
		// minute
		// hour
		// week
		// timezone
		// timezoneOffset
		it("day", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 1, 10);
			d2.set({day: 1});
			expect(d1.equals(d2)).toBe(true);
		});
		it("month", function() {
			var d1 = new Date(2010, 1, 1);
			var d2 = new Date(2010, 2, 1);
			d2.set({month: 1});
			expect(d1.equals(d2)).toBe(true);
		});
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
	});
});

//     'last().monday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().monday();
//       },
//       assert: function() { return Date.parse('last monday').equals(this.date) }
//     },
//     'last().tuesday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().tuesday();
//       },
//       assert: function() { return Date.parse('last tuesday').equals(this.date) }
//     },
//     'last().wednesday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().wednesday();
//       },
//       assert: function() { return Date.parse('last wednesday').equals(this.date) }
//     },
//     'last().thursday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().thursday();
//       },
//       assert: function() { return Date.parse('last thursday').equals(this.date) }
//     },
//     'last().friday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().friday();
//       },
//       assert: function() { return Date.parse('last friday').equals(this.date) }
//     },
//     'last().saturday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().saturday();
//       },
//       assert: function() { return Date.parse('last saturday').equals(this.date) }
//     },
//     'last().sunday()': {
//       run: function() { 
//         this.date = new Date().clearTime().last().sunday();
//       },
//       assert: function() { return Date.parse('last sunday').equals(this.date) }
//     }, 
//     'monday()': {
//       run: function() { 
//         this.date = new Date().clearTime().monday();
//       },
//       assert: function() { return Date.parse('next monday').equals(this.date) }
//     },
//     'tuesday()': {
//       run: function() { 
//         this.date = new Date().clearTime().tuesday();
//       },
//       assert: function() { return Date.parse('next tuesday').equals(this.date) }
//     },
//     'wednesday()': {
//       run: function() { 
//         this.date = new Date().clearTime().wednesday();
//       },
//       assert: function() { return Date.parse('next wednesday').equals(this.date) }
//     },
//     'thursday()': {
//       run: function() { 
//         this.date = new Date().clearTime().thursday();
//       },
//       assert: function() { return Date.parse('next thursday').equals(this.date) }
//     },
//     'friday()': {
//       run: function() { 
//         this.date = new Date().clearTime().friday();
//       },
//       assert: function() { return Date.parse('next friday').equals(this.date) }
//     },
//     'saturday()': {
//       run: function() { 
//         this.date = new Date().clearTime().saturday();
//       },
//       assert: function() { return Date.parse('next saturday').equals(this.date) }
//     },
//     'sunday()': {
//       run: function() { 
//         this.date = Date.today().sunday();
//       },
//       assert: function() { return Date.parse('next sunday').equals(this.date) }
//     }
//   },
  
//   '.is()': {
//     setup: function() {},
//     '.is().monday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().monday() == true; }
//     },
//     '.is().mon()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().mon() == true; }
//     },
//     '.is().tuesday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).is().tuesday() == true; }
//     },
//     '.is().tue()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).is().tue() == true; }
//     },
//     '.is().wednesday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 3).is().wednesday() == true; }
//     },
//     '.is().wed()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 3).is().wed() == true; }
//     },
//     '.is().thursday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 4).is().thursday() == true; }
//     },
//     '.is().thu()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 4).is().thu() == true; }
//     },
//     '.is().friday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 5).is().friday() == true; }
//     },
//     '.is().fri()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 5).is().fri() == true; }
//     },
//     '.is().saturday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 6).is().saturday() == true; }
//     },
//     '.is().sat()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 6).is().sat() == true; }
//     },
//     '.is().sunday()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 7).is().sunday() == true; }
//     },
//     '.is().sun()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 7).is().sun() == true; }
//     },
//     '.is().january()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().january() == true; }
//     },
//     '.is().jan()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().jan() == true; }
//     },
//     '.is().february()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(1).month().is().february() == true; }
//     },
//     '.is().feb()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(1).month().feb() == true; }
//     },
//     '.is().march()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(2).months().is().march() == true; }
//     },
//     '.is().mar()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(2).months().mar() == true; }
//     },
//     '.is().april()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(3).months().is().april() == true; }
//     },
//     '.is().apr()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(3).months().april() == true; }
//     },
//     '.is().may()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(4).months().is().may() == true; }
//     },
//     '.is().june()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(5).months().is().june() == true; }
//     },
//     '.is().jun()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(5).months().jun() == true; }
//     },
//     '.is().july()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(6).months().is().july() == true; }
//     },
//     '.is().jul()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(6).months().jul() == true; }
//     },
//     '.is().august()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(7).months().is().august() == true; }
//     },
//     '.is().aug()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(7).months().aug() == true; }
//     },
//     '.is().september()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(8).months().is().september() == true; }
//     },
//     '.is().sep()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(8).months().sep() == true; }
//     },
//     '.is().october()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(9).months().is().october() == true; }
//     },
//     '.is().oct()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(9).months().oct() == true; }
//     },
//     '.is().november()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(10).months().is().november() == true; }
//     },
//     '.is().nov()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(10).months().nov() == true; }
//     },
//     '.is().december()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(11).months().is().december() == true; }
//     },
//     '.is().dec()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).is().add(11).months().dec() == true; }
//     }
    
//   },
  
//   '.add()': {
//     setup: function() {},
//     '.add(1).second()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(1).second().equals(new Date(2001, 0, 2, 0, 0, 1)); }
//     },
//     '.add(-1).second()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-1).second().equals(new Date(2001, 0, 1, 23, 59, 59)); }
//     },
//     '.add(10).seconds()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(10).seconds().equals(new Date(2001, 0, 2, 0, 0, 10)); }
//     },
//     '.add(-10).seconds()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-10).seconds().equals(new Date(2001, 0, 1, 23, 59, 50)); }
//     },
    
//     '.add(1).minute()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(1).minute().equals(new Date(2001, 0, 2, 0, 1, 0)); }
//     },
//     '.add(-1).minute()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-1).minute().equals(new Date(2001, 0, 1, 23, 59, 0)); }
//     },
//     '.add(10).minutes()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(10).minutes().equals(new Date(2001, 0, 2, 0, 10, 0)); }
//     },
//     '.add(-10).minutes()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-10).minutes().equals(new Date(2001, 0, 1, 23, 50, 0)); }
//     },

//     '.add(1).hour()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(1).hour().equals(new Date(2001, 0, 2, 1, 0, 0)); }
//     },
//     '.add(-1).hour()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-1).hour().equals(new Date(2001, 0, 1, 23, 0, 0)); }
//     },
//     '.add(10).hours()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(10).hours().equals(new Date(2001, 0, 2, 10, 0, 0)); }
//     },
//     '.add(-10).hours()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 2).add(-10).hours().equals(new Date(2001, 0, 1, 14, 0, 0)); }
//     },    
            
//     '.add(1).day()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(1).day().equals(new Date(2001, 0, 2)); }
//     },
//     '.add(-1).day()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-1).day().equals(new Date(2000, 11, 31)); }
//     },
//     '.add(31).days()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(31).days().equals(new Date(2001, 1, 1)); }
//     },
//     '.add(-31).days()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-31).days().equals(new Date(2000, 11, 1)); }
//     },
//     '.add(1).month()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(1).month().equals(new Date(2001, 1, 1)); }
//     },
//     '.add(-1).month()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-1).month().equals(new Date(2000, 11, 1)); }
//     },
//     '.add(6).months()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(6).months().equals(new Date(2001, 6, 1)); }
//     },
//     '.add(-6).months()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-6).months().equals(new Date(2000, 6, 1)); }
//     },
//     '.add(1).month() : 31-Jan to 28-Feb': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 31).add(1).month().equals(new Date(2001, 1, 28)); }
//     },
//     '.add(-1).month() : 31-Mar to 28-Feb': {
//       run: function() {},
//       assert: function() { return new Date(2001, 2, 31).add(-1).month().equals(new Date(2001, 1, 28)); }
//     },
//     '.add(1).month() : 31-Jan to 29-Feb [leap year]': {
//       run: function() {},
//       assert: function() { return new Date(2008, 0, 31).add(1).month().equals(new Date(2008, 1, 29)); }
//     },
//     '.add(-1).month() : 31-Mar to 29-Feb [leap year]': {
//       run: function() {},
//       assert: function() { return new Date(2008, 2, 31).add(-1).month().equals(new Date(2008, 1, 29)); }
//     },
//     '.add(1).year()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(1).year().equals(new Date(2002, 0, 1)); }
//     },
//     '.add(-1).year()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-1).year().equals(new Date(2000, 0, 1)); }
//     },
//     '.add(-1).year() : 29-Feb-2000 to 28-Feb-2001 [leap year]': {
//       run: function() {},
//       assert: function() { return new Date(2000, 1, 29).add(1).year().equals(new Date(2001, 1, 28)); }
//     },
//     '.add(5).years()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(5).years().equals(new Date(2006, 0, 1)); }
//     },
//     '.add(-5).years()': {
//       run: function() {},
//       assert: function() { return new Date(2001, 0, 1).add(-5).years().equals(new Date(1996, 0, 1)); }
//     }    
//   }   ,
  
//   '.moveToNthOccurrence()': {
//     setup: function() {},
//     'Final Sunday in Jan': {
//       run: function() {},
//       assert: function() { return new Date(2008, 0, 27).equals(Date.today().set({year: 2008, month: 0}).final().sunday()); }
//     },
//     'Final Sunday in Feb': {
//       run: function() {},
//       assert: function() { return new Date(2008, 1, 24).equals(Date.today().set({year: 2008, month: 1}).final().sunday()); }
//     },    
//     'Final Sunday in Mar': {
//       run: function() {},
//       assert: function() { return new Date(2008, 2, 30).equals(Date.today().set({year: 2008, month: 2}).final().sunday()); }
//     },
//     'Final Sunday in Apr': {
//       run: function() {},
//       assert: function() { return new Date(2008, 3, 27).equals(Date.today().set({year: 2008, month: 3}).final().sunday()); }
//     },
//     'Final Sunday in May': {
//       run: function() {},
//       assert: function() { return new Date(2008, 4, 25).equals(Date.today().set({year: 2008, month: 4}).final().sunday()); }
//     },
//     'Final Sunday in Jun': {
//       run: function() {},
//       assert: function() { return new Date(2008, 5, 29).equals(Date.today().set({year: 2008, month: 5}).final().sunday()); }
//     },
//     'Final Sunday in Jul': {
//       run: function() {},
//       assert: function() { return new Date(2008, 6, 27).equals(Date.today().set({year: 2008, month: 6}).final().sunday()); }
//     },
//     'Final Sunday in Aug': {
//       run: function() {},
//       assert: function() { return new Date(2008, 7, 31).equals(Date.today().set({year: 2008, month: 7}).final().sunday()); }
//     },
//     'Final Sunday in Sep': {
//       run: function() {},
//       assert: function() { return new Date(2008, 8, 28).equals(Date.today().set({year: 2008, month: 8}).final().sunday()); }
//     },    
//     'Final Sunday in Oct': {
//       run: function() {},
//       assert: function() { return new Date(2008, 9, 26).equals(Date.today().set({year: 2008, month: 9}).final().sunday()); }
//     },
//     'Final Sunday in Nov': {
//       run: function() {},
//       assert: function() { return new Date(2008, 10, 30).equals(Date.today().set({year: 2008, month: 10}).final().sunday()); }
//     },
//     'Final Sunday in Dec': {
//       run: function() {},
//       assert: function() { return new Date(2008, 11, 28).equals(Date.today().set({year: 2008, month: 11}).final().sunday()); }
//     }
//   },
  
//   '.getWeek()': {
//     setup: function() {
//         this.d = new Date(1969, 0, 1);
//     },
//     '1969': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(0).getWeek() == 1); }
//     },
//     '1970': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(1).getWeek() == 1); }
//     },
//     '1971': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(2).getWeek() == 53); }
//     },
//     '1972': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(3).getWeek() == 52); }
//     },
//     '1973': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(4).getWeek() == 1); }
//     },
//     '1974': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(5).getWeek() == 1); }
//     },
//     '1975': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(6).getWeek() == 1); }
//     },
//     '1976': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(7).getWeek() == 1); }
//     },
//     '1977': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(8).getWeek() == 53); }
//     },
//     '1978': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(9).getWeek() == 52); }
//     },
//     '1979': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(10).getWeek() == 1); }
//     },
//     '1980': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(11).getWeek() == 1); }
//     },
//     '1981': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(12).getWeek() == 1); }
//     },
//     '1982': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(13).getWeek() == 53); }
//     },
//     '1983': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(14).getWeek() == 52); }
//     },
//     '1984': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(15).getWeek() == 52); }
//     },
//     '1985': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(16).getWeek() == 1); }
//     },
//     '1986': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(17).getWeek() == 1); }
//     },
//     '1987': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(18).getWeek() == 1); }
//     },
//     '1988': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(19).getWeek() == 53); }
//     },
//     '1989': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(20).getWeek() == 52); }
//     },
//     '1990': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(21).getWeek() == 1); }
//     },
//     '1991': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(22).getWeek() == 1); }
//     },
//     '1992': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(23).getWeek() == 1); }
//     },
//     '1993': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(24).getWeek() == 53); }
//     },
//     '1994': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(25).getWeek() == 52); }
//     },
//     '1995': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(26).getWeek() == 52); }
//     },
//     '1996': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(27).getWeek() == 1); }
//     },
//     '1997': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(28).getWeek() == 1); }
//     },
//     '1998': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(29).getWeek() == 1); }
//     },
//     '1999': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(30).getWeek() == 53); }
//     },
//     '2000': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(31).getWeek() == 52); }
//     },
//     '2001': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(32).getWeek() == 1); }
//     },
//     '2002': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(33).getWeek() == 1); }
//     },
//     '2003': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(34).getWeek() == 1); }
//     },
//     '2004': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(35).getWeek() == 1); }
//     },
//     '2005': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(36).getWeek() == 53); }
//     },
//     '2006': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(37).getWeek() == 52); }
//     },
//     '2007': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(38).getWeek() == 1); }
//     },
//     '2008': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(39).getWeek() == 1); }
//     },
//     '2009': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(40).getWeek() == 1); }
//     },
//     '2010': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(41).getWeek() == 53); }
//     },
//     '2011': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(42).getWeek() == 52); }
//     },
//     '2012': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(43).getWeek() == 52); }
//     },
//     '2013': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(44).getWeek() == 1); }
//     },
//     '2014': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(45).getWeek() == 1); }
//     },
//     '2015': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(46).getWeek() == 1); }
//     },
//     '2016': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(47).getWeek() == 53); }
//     },
//     '2017': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(48).getWeek() == 52); }
//     },
//     '2018': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(49).getWeek() == 1); }
//     },
//     '2019': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(50).getWeek() == 1); }
//     },
//     '2020': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(51).getWeek() == 1); }
//     },
//     '2021': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(52).getWeek() == 53); }
//     },
//     '2022': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(53).getWeek() == 52); }
//     },
//     '2023': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(54).getWeek() == 52); }
//     },
//     '2024': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(55).getWeek() == 1); }
//     },
//     '2025': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(56).getWeek() == 1); }
//     },
//     '2026': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(57).getWeek() == 1); }
//     },
//     '2027': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(58).getWeek() == 53); }
//     },
//     '2028': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(59).getWeek() == 52); }
//     },
//     '2029': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(60).getWeek() == 1); }
//     },
//     '2030': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(61).getWeek() == 1); }
//     },
//     '2031': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(62).getWeek() == 1); }
//     },
//     '2032': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(63).getWeek() == 1); }
//     },
//     '2033': {
//       run: function() {},
//       assert: function() { return (this.d.addYears(64).getWeek() == 53); }
//     }
    
//   }
  
  
//   ,
  
//   '.setWeek()': {
//     setup: function() {
//         this.d = Date.today().set({year: 1969});
//     },
//     '1969': {
//       run: function() {},
//       assert: function() { return this.d.addYears(0).setWeek(1).equals(new Date(1968, 11, 30)); }
//     },
//     '1970': {
//       run: function() {},
//       assert: function() { return this.d.addYears(1).setWeek(1).equals(new Date(1969, 11, 29)); }
//     },
//     '1971': {
//       run: function() {},
//       assert: function() { return this.d.addYears(2).setWeek(1).equals(new Date(1971, 0, 4)); }
//     },
//     '1972': {
//       run: function() {},
//       assert: function() { return this.d.addYears(3).setWeek(1).equals(new Date(1972, 0, 3)); }
//     },
//     '1973': {
//       run: function() {},
//       assert: function() { return this.d.addYears(4).setWeek(1).equals(new Date(1973, 0, 1)); }
//     },
//     '1974': {
//       run: function() {},
//       assert: function() { return this.d.addYears(5).setWeek(1).equals(new Date(1973, 11, 31)); }
//     },
//     '1975': {
//       run: function() {},
//       assert: function() { return this.d.addYears(6).setWeek(1).equals(new Date(1974, 11, 30)); }
//     },
//     '1976': {
//       run: function() {},
//       assert: function() { return this.d.addYears(7).setWeek(1).equals(new Date(1975, 11, 29)); }
//     },
//     '1977': {
//       run: function() {},
//       assert: function() { return this.d.addYears(8).setWeek(1).equals(new Date(1977, 0, 3)); }
//     },
//     '1978': {
//       run: function() {},
//       assert: function() { return this.d.addYears(9).setWeek(1).equals(new Date(1978, 0, 2)); }
//     },
//     '1979': {
//       run: function() {},
//       assert: function() { return this.d.addYears(10).setWeek(1).equals(new Date(1979, 0, 1)); }
//     },
//     '1980': {
//       run: function() {},
//       assert: function() { return this.d.addYears(11).setWeek(1).equals(new Date(1979, 11, 31)); }
//     },
//     '1981': {
//       run: function() {},
//       assert: function() { return this.d.addYears(12).setWeek(1).equals(new Date(1980, 11, 29)); }
//     },
//     '1982': {
//       run: function() {},
//       assert: function() { return this.d.addYears(13).setWeek(1).equals(new Date(1982, 0, 4)); }
//     },
//     '1983': {
//       run: function() {},
//       assert: function() { return this.d.addYears(14).setWeek(1).equals(new Date(1983, 0, 3)); }
//     },
//     '1984': {
//       run: function() {},
//       assert: function() { return this.d.addYears(15).setWeek(1).equals(new Date(1984, 0, 2)); }
//     },
//     '1985': {
//       run: function() {},
//       assert: function() { return this.d.addYears(16).setWeek(1).equals(new Date(1984, 11, 31)); }
//     },
//     '1986': {
//       run: function() {},
//       assert: function() { return this.d.addYears(17).setWeek(1).equals(new Date(1985, 11, 30)); }
//     },
//     '1987': {
//       run: function() {},
//       assert: function() { return this.d.addYears(18).setWeek(1).equals(new Date(1986, 11, 29)); }
//     },
//     '1988': {
//       run: function() {},
//       assert: function() { return this.d.addYears(19).setWeek(1).equals(new Date(1988, 0, 4)); }
//     },
//     '1989': {
//       run: function() {},
//       assert: function() { return this.d.addYears(20).setWeek(1).equals(new Date(1989, 0, 2)); }
//     },
//     '1990': {
//       run: function() {},
//       assert: function() { return this.d.addYears(21).setWeek(1).equals(new Date(1990, 0, 1)); }
//     },
//     '1991': {
//       run: function() {},
//       assert: function() { return this.d.addYears(22).setWeek(1).equals(new Date(1990, 11, 31)); }
//     },
//     '1992': {
//       run: function() {},
//       assert: function() { return this.d.addYears(23).setWeek(1).equals(new Date(1991, 11, 30)); }
//     },
//     '1993': {
//       run: function() {},
//       assert: function() { return this.d.addYears(24).setWeek(1).equals(new Date(1993, 0, 4)); }
//     },
//     '1994': {
//       run: function() {},
//       assert: function() { return this.d.addYears(25).setWeek(1).equals(new Date(1994, 0, 3)); }
//     },
//     '1995': {
//       run: function() {},
//       assert: function() { return this.d.addYears(26).setWeek(1).equals(new Date(1995, 0, 2)); }
//     },
//     '1996': {
//       run: function() {},
//       assert: function() { return this.d.addYears(27).setWeek(1).equals(new Date(1996, 0, 1)); }
//     },
//     '1997': {
//       run: function() {},
//       assert: function() { return this.d.addYears(28).setWeek(1).equals(new Date(1996, 11, 30)); }
//     },
//     '1998': {
//       run: function() {},
//       assert: function() { return this.d.addYears(29).setWeek(1).equals(new Date(1997, 11, 29)); }
//     },
//     '1999': {
//       run: function() {},
//       assert: function() { return this.d.addYears(30).setWeek(1).equals(new Date(1999, 0, 4)); }
//     },
//     '2000': {
//       run: function() {},
//       assert: function() { return this.d.addYears(31).setWeek(1).equals(new Date(2000, 0, 3)); }
//     },
//     '2001': {
//       run: function() {},
//       assert: function() { return this.d.addYears(32).setWeek(1).equals(new Date(2001, 0, 1)); }
//     },
//     '2002': {
//       run: function() {},
//       assert: function() { return this.d.addYears(33).setWeek(1).equals(new Date(2001, 11, 31)); }
//     },
//     '2003': {
//       run: function() {},
//       assert: function() { return this.d.addYears(34).setWeek(1).equals(new Date(2002, 11, 30)); }
//     },
//     '2004': {
//       run: function() {},
//       assert: function() { return this.d.addYears(35).setWeek(1).equals(new Date(2003, 11, 29)); }
//     },
//     '2005': {
//       run: function() {},
//       assert: function() { return this.d.addYears(36).setWeek(1).equals(new Date(2005, 0, 3)); }
//     },
//     '2006': {
//       run: function() {},
//       assert: function() { return this.d.addYears(37).setWeek(1).equals(new Date(2006, 0, 2)); }
//     },
//     '2007': {
//       run: function() {},
//       assert: function() { return this.d.addYears(38).setWeek(1).equals(new Date(2007, 0, 1)); }
//     },
//     '2008': {
//       run: function() {},
//       assert: function() { return this.d.addYears(39).setWeek(1).equals(new Date(2007, 11, 31)); }
//     },
//     '2009': {
//       run: function() {},
//       assert: function() { return this.d.addYears(40).setWeek(1).equals(new Date(2008, 11, 29)); }
//     },
//     '2010': {
//       run: function() {},
//       assert: function() { return this.d.addYears(41).setWeek(1).equals(new Date(2010, 0, 4)); }
//     },
//     '2011': {
//       run: function() {},
//       assert: function() { return this.d.addYears(42).setWeek(1).equals(new Date(2011, 0, 3)); }
//     },
//     '2012': {
//       run: function() {},
//       assert: function() { return this.d.addYears(43).setWeek(1).equals(new Date(2012, 0, 2)); }
//     },
//     '2013': {
//       run: function() {},
//       assert: function() { return this.d.addYears(44).setWeek(1).equals(new Date(2012, 11, 31)); }
//     },
//     '2014': {
//       run: function() {},
//       assert: function() { return this.d.addYears(45).setWeek(1).equals(new Date(2013, 11, 30)); }
//     },
//     '2015': {
//       run: function() {},
//       assert: function() { return this.d.addYears(46).setWeek(1).equals(new Date(2014, 11, 29)); }
//     },
//     '2016': {
//       run: function() {},
//       assert: function() { return this.d.addYears(47).setWeek(1).equals(new Date(2016, 0, 4)); }
//     },
//     '2017': {
//       run: function() {},
//       assert: function() { return this.d.addYears(48).setWeek(1).equals(new Date(2017, 0, 2)); }
//     },
//     '2018': {
//       run: function() {},
//       assert: function() { return this.d.addYears(49).setWeek(1).equals(new Date(2018, 0, 1)); }
//     },
//     '2019': {
//       run: function() {},
//       assert: function() { return this.d.addYears(50).setWeek(1).equals(new Date(2018, 11, 31)); }
//     },
//     '2020': {
//       run: function() {},
//       assert: function() { return this.d.addYears(51).setWeek(1).equals(new Date(2019, 11, 30)); }
//     },
//     '2021': {
//       run: function() {},
//       assert: function() { return this.d.addYears(52).setWeek(1).equals(new Date(2021, 0, 4)); }
//     },
//     '2022': {
//       run: function() {},
//       assert: function() { return this.d.addYears(53).setWeek(1).equals(new Date(2022, 0, 3)); }
//     },
//     '2023': {
//       run: function() {},
//       assert: function() { return this.d.addYears(54).setWeek(1).equals(new Date(2023, 0, 2)); }
//     },
//     '2024': {
//       run: function() {},
//       assert: function() { return this.d.addYears(55).setWeek(1).equals(new Date(2024, 0, 1)); }
//     },
//     '2025': {
//       run: function() {},
//       assert: function() { return this.d.addYears(56).setWeek(1).equals(new Date(2024, 11, 30)); }
//     },
//     '2026': {
//       run: function() {},
//       assert: function() { return this.d.addYears(57).setWeek(1).equals(new Date(2025, 11, 29)); }
//     },
//     '2027': {
//       run: function() {},
//       assert: function() { return this.d.addYears(58).setWeek(1).equals(new Date(2027, 0, 4)); }
//     },
//     '2028': {
//       run: function() {},
//       assert: function() { return this.d.addYears(59).setWeek(1).equals(new Date(2028, 0, 3)); }
//     },
//     '2029': {
//       run: function() {},
//       assert: function() { return this.d.addYears(60).setWeek(1).equals(new Date(2029, 0, 1)); }
//     },
//     '2030': {
//       run: function() {},
//       assert: function() { return this.d.addYears(61).setWeek(1).equals(new Date(2029, 11, 31)); }
//     },
//     '2031': {
//       run: function() {},
//       assert: function() { return this.d.addYears(62).setWeek(1).equals(new Date(2030, 11, 30)); }
//     },
//     '2032': {
//       run: function() {},
//       assert: function() { return this.d.addYears(63).setWeek(1).equals(new Date(2031, 11, 29)); }
//     },
//     '2033': {
//       run: function() {},
//       assert: function() { return this.d.addYears(64).setWeek(1).equals(new Date(2033, 0, 3)); }
//     }
    
//   }
  
//   ,
  
//   '.getOrdinalNumber() at 00:00': {
//     setup: function() { },
//     '1-Jan-2008 (Ordinal Day: 1)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 0, 1).getOrdinalNumber() === 1); }
//     },
//     '15-Jan-2008 (Ordinal Day: 15)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 0, 15).getOrdinalNumber() === 15); }
//     },
//     '1-Feb-2008 (Ordinal Day: 32)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 1, 1).getOrdinalNumber() === 32); }
//     },
//     '28-Feb-2007 (Ordinal Day: 59)': {
//       run: function() {},
//       assert: function() { return (new Date(2007, 1, 28).getOrdinalNumber() === 59); }
//     },
//     '29-Feb-2008 (Ordinal Day: 60)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 1, 29).getOrdinalNumber() === 60); }
//     },
//     '1-Mar-2008 (Ordinal Day: 61)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 2, 1).getOrdinalNumber() === 61); }
//     },
//     '1-Apr-2008 (Ordinal Day: 92)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 3, 1).getOrdinalNumber() === 92); }
//     },
//     '1-May-2008 (Ordinal Day: 122)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 4, 1).getOrdinalNumber() === 122); }
//     },
//     '1-Jun-2008 (Ordinal Day: 153)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 5, 1).getOrdinalNumber() === 153); }
//     },
//     '1-Jul-2008 (Ordinal Day: 183)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 6, 1).getOrdinalNumber() === 183); }
//     },
//     '1-Aug-2008 (Ordinal Day: 214)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 7, 1).getOrdinalNumber() === 214); }
//     },
//     '1-Sep-2008 (Ordinal Day: 245)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 8, 1).getOrdinalNumber() === 245); }
//     },
//     '1-Oct-2008 (Ordinal Day: 275)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 9, 1).getOrdinalNumber() === 275); }
//     },
//     '1-Nov-2008 (Ordinal Day: 306)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 10, 1).getOrdinalNumber() === 306); }
//     },
//     '1-Dec-2008 (Ordinal Day: 336)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 11, 1).getOrdinalNumber() === 336); }
//     },
//     '31-Dec-2008 (Ordinal Day: 366)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 11, 31).getOrdinalNumber() === 366); }
//     }
    
//   }
  
//   ,
  
//   '.getOrdinalNumber() with time set to now': {
//     setup: function() { },
//     '1-Jan-2008 (Ordinal Day: 1)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 0, 1).setTimeToNow().getOrdinalNumber() === 1); }
//     },
//     '15-Jan-2008 (Ordinal Day: 15)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 0, 15).setTimeToNow().getOrdinalNumber() === 15); }
//     },
//     '1-Feb-2008 (Ordinal Day: 32)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 1, 1).setTimeToNow().getOrdinalNumber() === 32); }
//     },
//     '28-Feb-2007 (Ordinal Day: 59)': {
//       run: function() {},
//       assert: function() { return (new Date(2007, 1, 28).setTimeToNow().getOrdinalNumber() === 59); }
//     },
//     '29-Feb-2008 (Ordinal Day: 60)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 1, 29).setTimeToNow().getOrdinalNumber() === 60); }
//     },
//     '1-Mar-2008 (Ordinal Day: 61)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 2, 1).setTimeToNow().getOrdinalNumber() === 61); }
//     },
//     '1-Apr-2008 (Ordinal Day: 92)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 3, 1).setTimeToNow().getOrdinalNumber() === 92); }
//     },
//     '1-May-2008 (Ordinal Day: 122)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 4, 1).setTimeToNow().getOrdinalNumber() === 122); }
//     },
//     '1-Jun-2008 (Ordinal Day: 153)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 5, 1).setTimeToNow().getOrdinalNumber() === 153); }
//     },
//     '1-Jul-2008 (Ordinal Day: 183)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 6, 1).setTimeToNow().getOrdinalNumber() === 183); }
//     },
//     '1-Aug-2008 (Ordinal Day: 214)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 7, 1).setTimeToNow().getOrdinalNumber() === 214); }
//     },
//     '1-Sep-2008 (Ordinal Day: 245)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 8, 1).setTimeToNow().getOrdinalNumber() === 245); }
//     },
//     '1-Oct-2008 (Ordinal Day:275 )': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 9, 1).setTimeToNow().getOrdinalNumber() === 275); }
//     },
//     '1-Nov-2008 (Ordinal Day: 306)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 10, 1).setTimeToNow().getOrdinalNumber() === 306); }
//     },
//     '1-Dec-2008 (Ordinal Day: 336)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 11, 1).setTimeToNow().getOrdinalNumber() === 336); }
//     },
//     '31-Dec-2008 (Ordinal Day: 366)': {
//       run: function() {},
//       assert: function() { return (new Date(2008, 11, 31).setTimeToNow().getOrdinalNumber() === 366); }
//     }
    
//   }
  
// });
