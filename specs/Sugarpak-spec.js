/*globals require, describe, it, expect */
require("../build/developement/date.js");

describe("Sugarpak Extensions", function() {
	describe("can move to next",function (){
		it("monday", function() {
			var d1 = new Date(1995, 11, 11);
			var d2 = new Date(1995, 11, 4);
			d2.next().monday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("tuesday", function() {
			var d1 = new Date(1995, 11, 5);
			var d2 = new Date(1995, 11, 4);
			d2.next().tuesday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("wednesday", function() {
			var d1 = new Date(1995, 11, 6);
			var d2 = new Date(1995, 11, 4);
			d2.next().wednesday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("thursday", function() {
			var d1 = new Date(1995, 11, 7);
			var d2 = new Date(1995, 11, 4);
			d2.next().thursday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("friday", function() {
			var d1 = new Date(1995, 11, 8);
			var d2 = new Date(1995, 11, 4);
			d2.next().friday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("saturday", function() {
			var d1 = new Date(1995, 11, 9);
			var d2 = new Date(1995, 11, 4);
			d2.next().saturday();
			expect(d1.equals(d2)).toBe(true);
		});
		it("sunday", function() {
			var d1 = new Date(1995, 11, 10);
			var d2 = new Date(1995, 11, 4);
			d2.next().sunday();
			expect(d1.equals(d2)).toBe(true);
		});
	});
});