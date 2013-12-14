/*globals require, jasmine, describe, it, expect, spyOn */
require("../build/developement/date.js");

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
});
