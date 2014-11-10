/*globals require, describe, it, expect */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
if (typeof require === "function") {
	require("../index.js");
}

describe("Sugarpak Extensions", function() {
	describe("has syntax sugar to allow movement to relative dates",function (){
		it("can move to the nth instance of a day",function(){
			var d = new Date(2013, 0);
			d.april().second().monday();
			expect(d.getMonth()).toBe(3);
			expect(d.getDate()).toBe(8);
			expect(d.getDay()).toBe(1);
			d.march().add(1).second().second().monday();
			expect(d.getMonth()).toBe(2);
			expect(d.getDate()).toBe(10);
			expect(d.getDay()).toBe(1);
			expect(d.getSeconds()).toBe(1);
			d = new Date(2013, 0);
			d.second().weekday();
			expect(d.getDate()).toBe(2);
		});
		it("like month names", function() {
			expect(Date.today().jan().getMonth()).toBe(0);
			expect(Date.today().feb().getMonth()).toBe(1);
			expect(Date.today().mar().getMonth()).toBe(2);
			expect(Date.today().apr().getMonth()).toBe(3);
			expect(Date.today().may().getMonth()).toBe(4);
			expect(Date.today().jun().getMonth()).toBe(5);
			expect(Date.today().jul().getMonth()).toBe(6);
			expect(Date.today().aug().getMonth()).toBe(7);
			expect(Date.today().sep().getMonth()).toBe(8);
			expect(Date.today().oct().getMonth()).toBe(9);
			expect(Date.today().nov().getMonth()).toBe(10);
			expect(Date.today().dec().getMonth()).toBe(11);
		});
		it("will throw an exception when nth instance doesn't exist", function() {
			var d = new Date(2013, 0);
			var foo = function () {
				d.february().fifth().friday();
			};
			expect(foo).toThrow();
		});
	});
	describe("has constants to describe",function (){
		it("months", function() {
			expect(Date.MARCH).toBe(2);
			expect(Date.MAR).toBe(2);
		});
		it("days", function() {
			expect(Date.FRIDAY).toBe(5);
			expect(Date.FRI).toBe(5);
		});
	});
	describe("can move to next",function (){
		it("monday", function() {
			var d1 = new Date(1995, 11, 11);
			var d2 = new Date(1995, 11, 4);
			d2.next().monday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().monday();
			expect(d3.getDay()).toBe(1);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("tuesday", function() {
			var d1 = new Date(1995, 11, 5);
			var d2 = new Date(1995, 11, 4);
			d2.next().tuesday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().tuesday();
			expect(d3.getDay()).toBe(2);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("wednesday", function() {
			var d1 = new Date(1995, 11, 6);
			var d2 = new Date(1995, 11, 4);
			d2.next().wednesday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().wednesday();
			expect(d3.getDay()).toBe(3);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("thursday", function() {
			var d1 = new Date(1995, 11, 7);
			var d2 = new Date(1995, 11, 4);
			d2.next().thursday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().thursday();
			expect(d3.getDay()).toBe(4);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("friday", function() {
			var d1 = new Date(1995, 11, 8);
			var d2 = new Date(1995, 11, 4);
			d2.next().friday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().friday();
			expect(d3.getDay()).toBe(5);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("saturday", function() {
			var d1 = new Date(1995, 11, 9);
			var d2 = new Date(1995, 11, 4);
			d2.next().saturday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().saturday();
			expect(d3.getDay()).toBe(6);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("sunday", function() {
			var d1 = new Date(1995, 11, 10);
			var d2 = new Date(1995, 11, 4);
			d2.next().sunday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.next().sunday();
			expect(d3.getDay()).toBe(0);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(8);
			expect(elapsed).toBeGreaterThan(0);
		});
		it("weekday", function() {
			var d1 = new Date(1995, 11, 5);
			var d2 = new Date(1995, 11, 4);
			d2.next().weekday();
			expect(d1.equals(d2)).toBe(true);
			d1 = new Date(1995, 11, 4);
			d2 = new Date(1995, 11, 1);
			d2.next().weekday();
			expect(d1.equals(d2)).toBe(true);
		});
	});
	describe("can move to last",function (){
		it("monday", function() {
			var d1 = new Date(1995, 10, 27);
			var d2 = new Date(1995, 11, 4);
			d2.last().monday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().monday();
			expect(d3.getDay()).toBe(1);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("tuesday", function() {
			var d1 = new Date(1995, 10, 28);
			var d2 = new Date(1995, 11, 4);
			d2.last().tuesday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().tuesday();
			expect(d3.getDay()).toBe(2);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("wednesday", function() {
			var d1 = new Date(1995, 10, 29);
			var d2 = new Date(1995, 11, 4);
			d2.last().wednesday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().wednesday();
			expect(d3.getDay()).toBe(3);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("thursday", function() {
			var d1 = new Date(1995, 10, 30);
			var d2 = new Date(1995, 11, 4);
			d2.last().thursday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().thursday();
			expect(d3.getDay()).toBe(4);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("friday", function() {
			var d1 = new Date(1995, 11, 1);
			var d2 = new Date(1995, 11, 4);
			d2.last().friday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().friday();
			expect(d3.getDay()).toBe(5);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("saturday", function() {
			var d1 = new Date(1995, 11, 2);
			var d2 = new Date(1995, 11, 4);
			d2.last().saturday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().saturday();
			expect(d3.getDay()).toBe(6);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("sunday", function() {
			var d1 = new Date(1995, 11, 3);
			var d2 = new Date(1995, 11, 4);
			d2.last().sunday();
			expect(d1.equals(d2)).toBe(true);
			var d3 = Date.last().sunday();
			expect(d3.getDay()).toBe(0);
			var elapsed = (Date.today().getElapsed(d3))/86400000; // milliseconds in a day
			expect(elapsed).toBeLessThan(0);
			expect(elapsed).toBeGreaterThan(-8);
		});
		it("weekday", function() {
			var d1 = new Date(1995, 11, 5);
			var d2 = new Date(1995, 11, 4);
			d1.last().weekday();
			expect(d1.equals(d2)).toBe(true);
			d1 = new Date(1995, 11, 1);
			d2 = new Date(1995, 11, 4);
			d2.last().weekday();
			expect(d1.equals(d2)).toBe(true);
		});
	});
	describe("can can check if a date is",function (){
		it("a specific day", function() {
			var d = new Date(1995, 10, 27);
			expect(d.is().monday()).toBe(true);
			expect(d.is().friday()).toBe(false);
		});
		it("a weekday", function() {
			var d = new Date(1995, 10, 27);
			expect(d.is().weekday()).toBe(true);
			expect(d.weekday()).toBe(false);
			d = new Date(1995, 10, 26);
			expect(d.is().weekday()).toBe(false);
			expect(Date.today().next().sunday().is().weekday()).toBe(false);
		});
		it("a weekend", function() {
			var d = new Date(1995, 10, 27);
			expect(d.is().weekend()).toBe(false);
			d = new Date(1995, 10, 26);
			expect(d.is().weekend()).toBe(true);
			expect(d.weekend()).toBe(false);
		});
		it("a month", function() {
			var d = new Date(1995, 10, 27);
			expect(d.is().november()).toBe(true);
			expect(d.is().april()).toBe(false);
		});
		it("today", function() {
			var d = new Date();
			expect(d.is().today()).toBe(true);
		});
		it("holding the same properties as another date", function() {
			var d = new Date();
			var d2 = Date.today();
			expect(d.same().day(d2)).toBe(true);
			expect(d.same().minute(d2)).toBe(false);
		});
	});
	describe("can create Dates using syntax sugar",function (){
		it("at a time that we can parse", function() {
			var d = Date.today().at("6:15pm");
			expect(d.is().today()).toBe(true);
			expect(d.is().today()).toBe(true);
		});
		it("like (Number) ago", function() {
			var d = (3).days().ago();
			var elapsed = Math.floor((d.getElapsed(Date.now(true)))/86400000);  // milliseconds in a day
			expect(elapsed).toBe(3);
		});
		it("like (Number) fromNow", function() {
			var d = (3).days().fromNow();
			var elapsed = Math.floor((d.getElapsed(Date.now(true)))/86400000); // milliseconds in a day
			expect(elapsed).toBe(-3);
		});
		it("from an object", function() {
			var o = {month: 3, day: 17, hour: 13};
			var d = Date.fromObject(o);
			expect(d.getDate()).toBe(17);
			expect(d.getMonth()).toBe(3);
			expect(d.getHours()).toBe(13);
		});
		it("like month names", function() {
			expect(Date.jan().getMonth()).toBe(0);
			expect(Date.feb().getMonth()).toBe(1);
			expect(Date.mar().getMonth()).toBe(2);
			expect(Date.apr().getMonth()).toBe(3);
			expect(Date.may().getMonth()).toBe(4);
			expect(Date.jun().getMonth()).toBe(5);
			expect(Date.jul().getMonth()).toBe(6);
			expect(Date.aug().getMonth()).toBe(7);
			expect(Date.sep().getMonth()).toBe(8);
			expect(Date.oct().getMonth()).toBe(9);
			expect(Date.nov().getMonth()).toBe(10);
			expect(Date.dec().getMonth()).toBe(11);
		});
	});
});