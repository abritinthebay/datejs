/*globals require, jasmine, describe, it, expect, spyOn */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
require("../build/development/date.js");

describe("Parsing Module", function() {
	var correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
	describe("can work with Time objects", function(){
		it("simple example", function () {
			var d = Date.parse("December 4th, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("more complex example", function () {
			var now = Date.today();
			var t = {day: now.getDate(), month: now.getMonth()};
			var d = Date.Parsing.processTimeObject(t);
			expect(d.getTime()).toBe(now.getTime());
		});
	});
	describe("has basic date string parsing e.g.", function() {
		it("December 4th, 1995", function () {
			var d = Date.parse("December 4th, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Dec-04-95", function () {
			var d = Date.parse("Dec-04-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12-04-95", function () {
			var d = Date.parse("12-04-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12/04/95", function () {
			var d = Date.parse("12/04/95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("4-Dec-1995", function () {
			var d = Date.parse("12/04/95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995-12-04", function () {
			var d = Date.parse("1995-12-04");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995.12.04", function () {
			var d = Date.parse("1995.12.04");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12-4, '95", function () {
			var d = Date.parse("12-4, '95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
	});
	describe("supports variations in phrasing like", function() {
		it("4-Dec-1995", function () {
			var d = Date.parse("4-Dec-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("04-Dec-1995", function () {
			var d = Date.parse("04-Dec-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("04-Dec-95", function () {
			var d = Date.parse("04-Dec-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("4-December-95", function () {
			var d = Date.parse("4-December-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("4-December-1995", function () {
			var d = Date.parse("4-December-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("04-December-95", function () {
			var d = Date.parse("04-December-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("04-December-1995", function () {
			var d = Date.parse("04-December-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4 1995", function () {
			var d = Date.parse("December 4 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4, 1995", function () {
			var d = Date.parse("December 4, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 04, 1995", function () {
			var d = Date.parse("December 04, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4,1995", function () {
			var d = Date.parse("December 4,1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 04,1995", function () {
			var d = Date.parse("December 04,1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4, 95", function () {
			var d = Date.parse("December 4, 95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 04,95", function () {
			var d = Date.parse("December 04,95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4th, 1995", function () {
			var d = Date.parse("December 4th, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("December 4th 1995", function () {
			var d = Date.parse("December 4th 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Dec 4th 1995", function () {
			var d = Date.parse("Dec 4th 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Dec 4th 95", function () {
			var d = Date.parse("Dec 4th 95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Mon December 4, 1995", function () {
			var d = Date.parse("Mon December 4, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Mon December 4th, 1995", function () {
			var d = Date.parse("Mon December 4th, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Monday December 4, 1995", function () {
			var d = Date.parse("Monday December 4, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Monday December 4th, 1995", function () {
			var d = Date.parse("Monday December 4th, 1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Dec-04-1995", function () {
			var d = Date.parse("Dec-04-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("Dec-04-95", function () {
			var d = Date.parse("Dec-04-95");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
	});
	describe("supports variations in seperators like", function() {
		it("12/4/1995", function () {
			var d = Date.parse("12/4/1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12-4-1995", function () {
			var d = Date.parse("12-4-1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12.4.1995", function () {
			var d = Date.parse("12.4.1995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
	});
	describe("supports variations in sortable date formats", function() {
		it("1995/12/04", function () {
			var d = Date.parse("1995/12/04");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995-12-04", function () {
			var d = Date.parse("1995-12-04");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995.12.04", function () {
			var d = Date.parse("1995.12.04");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995/12/4", function () {
			var d = Date.parse("1995/12/4");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995-12-4", function () {
			var d = Date.parse("1995-12-4");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1995.12.4", function () {
			var d = Date.parse("1995.12.4");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
	});
	describe("supports completely numeric date formats", function() {
		it("12495", function () {
			var d = Date.parse("12495");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("120495", function () {
			var d = Date.parse("120495");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("1241995", function () {
			var d = Date.parse("1241995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("12041995", function () {
			var d = Date.parse("12041995");
			expect(d.getTime()).toBe(correctDate.getTime());
		});
		it("treats formats less than 5 digits as years", function () {
			var d = Date.Parsing.Numeric.parse("2004");
			expect(d.getFullYear()).toBe(2004);
		});
		it("returns null for invalid Numeric formats", function () {
			var d = Date.Parsing.Numeric.parse("331220045");
			expect(d).toBeNull();
		});
		it("returns null for non-Numeric formats", function () {
			var d = Date.Parsing.Numeric.parse("nonnumeric");
			expect(d).toBeNull();
		});
	});
	describe("supports relative dates like", function() {
		it("last week", function () {
			var d = Date.parse("last week");
			var w = Date.today().addWeeks(-1).getWeek();
			expect(w).toBe(d.getWeek());
		});
		it("next week", function () {
			var d = Date.parse("next week");
			var w = Date.today().getWeek();
			expect(w+1).toBe(d.getWeek());
		});
		it("thursday last week", function () {
			var d = Date.parse("thursday last week");
			var d2 = Date.thursday().last().week();
			expect(d2.equals(d)).toBe(true);
		});
		it("tuesday next week", function () {
			var d = Date.parse("tuesday next week");
			var d2 = Date.tuesday().next().week();
			expect(d2.equals(d)).toBe(true);
		});
		it("tuesday 2 weeks from now", function () {
			var d = Date.parse("tuesday 2 weeks from now");
			var d2 = Date.tuesday().addWeeks(2).setTimeToNow();
			expect(d2.equals(d)).toBe(true);
		});
		it("this morning", function () {
			var d = Date.parse("this morning");
			var d2 = Date.today().set({hour: 9});
			expect(d2.equals(d)).toBe(true);
		});
		it("6 in the morning", function () {
			var d = Date.parse("6 in the morning");
			var d2 = Date.today().set({hour: 6});
			expect(d2.equals(d)).toBe(true);
		});
		it("sat 7 in the evening", function () {
			var d = Date.parse("sat 7 in the evening");
			var d2 = Date.saturday().set({hour:19});
			expect(d2.equals(d)).toBe(true);
		});
		it("tomorrow 3pm", function () {
			var d = Date.parse("tomorrow 3pm");
			var d2 = Date.today().addDays(1).set({hour: 15});
			expect(d2.equals(d)).toBe(true);
		});
		it("tomorrow 3am", function () {
			var d = Date.parse("tomorrow 3am");
			var d2 = Date.today().addDays(1).set({hour: 3});
			expect(d2.equals(d)).toBe(true);
		});
		it("3pm tomorrow", function () {
			var d = Date.parse("3pm tomorrow");
			var d2 = Date.today().addDays(1).set({hour: 15});
			expect(d2.equals(d)).toBe(true);
		});
		it("3am tomorrow", function () {
			var d = Date.parse("3am tomorrow");
			var d2 = Date.today().addDays(1).set({hour: 3});
			expect(d2.equals(d)).toBe(true);
		});
		it("3 tomorrow", function () {
			var d = Date.parse("3 tomorrow");
			var d2 = Date.today().addDays(1).set({hour: 3});
			expect(d2.equals(d)).toBe(true);
		});
		it("15 tomorrow", function () {
			var d = Date.parse("15 tomorrow");
			var d2 = Date.today().addDays(1).set({hour: 15});
			expect(d2.equals(d)).toBe(true);
		});

	});
});
