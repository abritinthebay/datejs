/*globals require, describe, it, expect */
if (typeof process !== "undefined") {
	process.env.TZ = "America/Los_Angeles";
}
if (typeof require === "function") {
	require("../index.js");
}

describe("Date Math operations support", function() {
	beforeEach(function() {
		this.d = Date.today();
	});
	it("t and today ", function () {
		var d2 = Date.parse("t");
		var d3 = Date.parse("today");
		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
	});
	it("t+ and today+", function () {
		this.d.add(1).days();
		var d2 = Date.parse("t+");
		var d3 = Date.parse("today+");
		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
	});
	it("t+1d and today+1d and variants", function () {
		this.d.add(1).days();
		var d2 = Date.parse("t+1d");
		var d3 = Date.parse("t+1 d");
		var d4 = Date.parse("t + 1 d");
		var d5 = Date.parse("t+1day");
		var d6 = Date.parse("t+1 day");
		var d7 = Date.parse("t + 1 day");
		var d8 = Date.parse("today+1d");
		var d9 = Date.parse("today+1 d");
		var d10 = Date.parse("today + 1 d");
		var d11 = Date.parse("today+1day");
		var d12 = Date.parse("today+1 day");
		var d13 = Date.parse("today + 1 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+15d and today+15d and variants", function () {
		this.d.add(15).days();
		var d2 = Date.parse("t+15d");
		var d3 = Date.parse("t+15 d");
		var d4 = Date.parse("t + 15 d");
		var d5 = Date.parse("t+15day");
		var d6 = Date.parse("t+15 day");
		var d7 = Date.parse("t + 15 day");
		var d8 = Date.parse("today+15d");
		var d9 = Date.parse("today+15 d");
		var d10 = Date.parse("today + 15 d");
		var d11 = Date.parse("today+15day");
		var d12 = Date.parse("today+15 day");
		var d13 = Date.parse("today + 15 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+100d and today+100d and variants", function () {
		this.d.add(100).days();
		var d2 = Date.parse("t+100d");
		var d3 = Date.parse("t+100 d");
		var d13 = Date.parse("t + 100 d");
		var d4 = Date.parse("t+100day");
		var d5 = Date.parse("t+100 day");
		var d6 = Date.parse("t + 100 day");
		var d7 = Date.parse("today+100d");
		var d8 = Date.parse("today+100 d");
		var d9 = Date.parse("today + 100 d");
		var d10 = Date.parse("today+100day");
		var d11 = Date.parse("today+100 day");
		var d12 = Date.parse("today + 100 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+1m and today+1m and variants", function () {
		this.d.add(1).months();
		var d2 = Date.parse("t+1m");
		var d3 = Date.parse("t+1 m");
		var d13 = Date.parse("t + 1 m");
		var d4 = Date.parse("t+1month");
		var d5 = Date.parse("t+1 month");
		var d6 = Date.parse("t + 1 month");
		var d7 = Date.parse("today+1m");
		var d8 = Date.parse("today+1 m");
		var d9 = Date.parse("today + 1 m");
		var d10 = Date.parse("today+1month");
		var d11 = Date.parse("today+1 month");
		var d12 = Date.parse("today + 1 month");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+15m and today+15m and variants", function () {
		this.d.add(15).months();
		var d2 = Date.parse("t+15m");
		var d3 = Date.parse("t+15 m");
		var d13 = Date.parse("t + 15 m");
		var d4 = Date.parse("t+15months");
		var d5 = Date.parse("t+15 months");
		var d6 = Date.parse("t + 15 months");
		var d7 = Date.parse("today+15m");
		var d8 = Date.parse("today+15 m");
		var d9 = Date.parse("today + 15 m");
		var d10 = Date.parse("today+15months");
		var d11 = Date.parse("today+15 months");
		var d12 = Date.parse("today + 15 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+100d and today+100m and variants", function () {
		this.d.add(100).months();
		var d2 = Date.parse("t+100m");
		var d3 = Date.parse("t+100 m");
		var d13 = Date.parse("t + 100 m");
		var d4 = Date.parse("t+100months");
		var d5 = Date.parse("t+100 months");
		var d6 = Date.parse("t + 100 months");
		var d7 = Date.parse("today+100m");
		var d8 = Date.parse("today+100 m");
		var d9 = Date.parse("today + 100 m");
		var d10 = Date.parse("today+100months");
		var d11 = Date.parse("today+100 months");
		var d12 = Date.parse("today + 100 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+1y and today+1y and variants", function () {
		this.d.add(1).years();
		var d2 = Date.parse("t+1y");
		var d3 = Date.parse("t+1 y");
		var d13 = Date.parse("t + 1 y");
		var d4 = Date.parse("t+1year");
		var d5 = Date.parse("t+1 year");
		var d6 = Date.parse("t + 1 year");
		var d7 = Date.parse("today+1y");
		var d8 = Date.parse("today+1 y");
		var d9 = Date.parse("today + 1 y");
		var d10 = Date.parse("today+1year");
		var d11 = Date.parse("today+1 year");
		var d12 = Date.parse("today + 1 year");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+15y and today+15y and variants", function () {
		this.d.add(15).years();
		var d2 = Date.parse("t+15y");
		var d3 = Date.parse("t+15 y");
		var d13 = Date.parse("t + 15 y");
		var d4 = Date.parse("t+15years");
		var d5 = Date.parse("t+15 years");
		var d6 = Date.parse("t + 15 years");
		var d7 = Date.parse("today+15y");
		var d8 = Date.parse("today+15 y");
		var d9 = Date.parse("today + 15 y");
		var d10 = Date.parse("today+15years");
		var d11 = Date.parse("today+15 years");
		var d12 = Date.parse("today + 15 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t+100d and today+100y and variants", function () {
		this.d.add(100).years();
		var d2 = Date.parse("t+100y");
		var d3 = Date.parse("t+100 y");
		var d13 = Date.parse("t + 100 y");
		var d4 = Date.parse("t+100years");
		var d5 = Date.parse("t+100 years");
		var d6 = Date.parse("t + 100 years");
		var d7 = Date.parse("today+100y");
		var d8 = Date.parse("today+100 y");
		var d9 = Date.parse("today + 100 y");
		var d10 = Date.parse("today+100years");
		var d11 = Date.parse("today+100 years");
		var d12 = Date.parse("today + 100 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	
	// now swtich to minus

	it("t- and today-", function () {
		this.d.add(-1).days();
		var d2 = Date.parse("t-");
		var d3 = Date.parse("today-");
		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
	});
	it("t-1d and today-1d and variants", function () {
		this.d.add(-1).days();
		var d2 = Date.parse("t-1d");
		var d3 = Date.parse("t-1 d");
		var d13 = Date.parse("t - 1 d");
		var d4 = Date.parse("t-1day");
		var d5 = Date.parse("t-1 day");
		var d6 = Date.parse("t - 1 day");
		var d7 = Date.parse("today-1d");
		var d8 = Date.parse("today-1 d");
		var d9 = Date.parse("today - 1 d");
		var d10 = Date.parse("today-1day");
		var d11 = Date.parse("today-1 day");
		var d12 = Date.parse("today - 1 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-15d and today-15d and variants", function () {
		this.d.add(-15).days();
		var d2 = Date.parse("t-15d");
		var d3 = Date.parse("t-15 d");
		var d13 = Date.parse("t - 15 d");
		var d4 = Date.parse("t-15day");
		var d5 = Date.parse("t-15 day");
		var d6 = Date.parse("t - 15 day");
		var d7 = Date.parse("today-15d");
		var d8 = Date.parse("today-15 d");
		var d9 = Date.parse("today - 15 d");
		var d10 = Date.parse("today-15day");
		var d11 = Date.parse("today-15 day");
		var d12 = Date.parse("today - 15 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-100d and today-100d and variants", function () {
		this.d.add(-100).days();
		var d2 = Date.parse("t-100d");
		var d3 = Date.parse("t-100 d");
		var d13 = Date.parse("t - 100 d");
		var d4 = Date.parse("t-100day");
		var d5 = Date.parse("t-100 day");
		var d6 = Date.parse("t - 100 day");
		var d7 = Date.parse("today-100d");
		var d8 = Date.parse("today-100 d");
		var d9 = Date.parse("today - 100 d");
		var d10 = Date.parse("today-100day");
		var d11 = Date.parse("today-100 day");
		var d12 = Date.parse("today - 100 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-1m and today-1m and variants", function () {
		this.d.add(-1).months();
		var d2 = Date.parse("t-1m");
		var d3 = Date.parse("t-1 m");
		var d13 = Date.parse("t - 1 m");
		var d4 = Date.parse("t-1month");
		var d5 = Date.parse("t-1 month");
		var d6 = Date.parse("t - 1 month");
		var d7 = Date.parse("today-1m");
		var d8 = Date.parse("today-1 m");
		var d9 = Date.parse("today - 1 m");
		var d10 = Date.parse("today-1month");
		var d11 = Date.parse("today-1 month");
		var d12 = Date.parse("today - 1 month");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-15m and today-15m and variants", function () {
		this.d.add(-15).months();
		var d2 = Date.parse("t-15m");
		var d3 = Date.parse("t-15 m");
		var d13 = Date.parse("t - 15 m");
		var d4 = Date.parse("t-15months");
		var d5 = Date.parse("t-15 months");
		var d6 = Date.parse("t - 15 months");
		var d7 = Date.parse("today-15m");
		var d8 = Date.parse("today-15 m");
		var d9 = Date.parse("today - 15 m");
		var d10 = Date.parse("today-15months");
		var d11 = Date.parse("today-15 months");
		var d12 = Date.parse("today - 15 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-100d and today-100m and variants", function () {
		this.d.add(-100).months();
		var d2 = Date.parse("t-100m");
		var d3 = Date.parse("t-100 m");
		var d13 = Date.parse("t - 100 m");
		var d4 = Date.parse("t-100months");
		var d5 = Date.parse("t-100 months");
		var d6 = Date.parse("t - 100 months");
		var d7 = Date.parse("today-100m");
		var d8 = Date.parse("today-100 m");
		var d9 = Date.parse("today - 100 m");
		var d10 = Date.parse("today-100months");
		var d11 = Date.parse("today-100 months");
		var d12 = Date.parse("today - 100 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-1y and today-1y and variants", function () {
		this.d.add(-1).years();
		var d2 = Date.parse("t-1y");
		var d3 = Date.parse("t-1 y");
		var d13 = Date.parse("t - 1 y");
		var d4 = Date.parse("t-1year");
		var d5 = Date.parse("t-1 year");
		var d6 = Date.parse("t - 1 year");
		var d7 = Date.parse("today-1y");
		var d8 = Date.parse("today-1 y");
		var d9 = Date.parse("today - 1 y");
		var d10 = Date.parse("today-1year");
		var d11 = Date.parse("today-1 year");
		var d12 = Date.parse("today - 1 year");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-15y and today-15y and variants", function () {
		this.d.add(-15).years();
		var d2 = Date.parse("t-15y");
		var d3 = Date.parse("t-15 y");
		var d13 = Date.parse("t - 15 y");
		var d4 = Date.parse("t-15years");
		var d5 = Date.parse("t-15 years");
		var d6 = Date.parse("t - 15 years");
		var d7 = Date.parse("today-15y");
		var d8 = Date.parse("today-15 y");
		var d9 = Date.parse("today - 15 y");
		var d10 = Date.parse("today-15years");
		var d11 = Date.parse("today-15 years");
		var d12 = Date.parse("today - 15 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});
	it("t-100y and today-100y and variants", function () {
		this.d.add(-100).years();
		var d2 = Date.parse("t-100y");
		var d3 = Date.parse("t-100 y");
		var d13 = Date.parse("t - 100 y");
		var d4 = Date.parse("t-100years");
		var d5 = Date.parse("t-100 years");
		var d6 = Date.parse("t - 100 years");
		var d7 = Date.parse("today-100y");
		var d8 = Date.parse("today-100 y");
		var d9 = Date.parse("today - 100 y");
		var d10 = Date.parse("today-100years");
		var d11 = Date.parse("today-100 years");
		var d12 = Date.parse("today - 100 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
		expect(this.d.equals(d8)).toBe(true);
		expect(this.d.equals(d9)).toBe(true);
		expect(this.d.equals(d10)).toBe(true);
		expect(this.d.equals(d11)).toBe(true);
		expect(this.d.equals(d12)).toBe(true);
		expect(this.d.equals(d13)).toBe(true);
	});

	// switch to non t or today

	it("+", function () {
		this.d.add(1).days();
		var d2 = Date.parse("+");
		expect(this.d.equals(d2)).toBe(true);
	});
	it("+1d and variants", function () {
		this.d.add(1).days();
		var d2 = Date.parse("+1d");
		var d3 = Date.parse("+1 d");
		var d4 = Date.parse(" + 1 d");
		var d5 = Date.parse("+1day");
		var d6 = Date.parse("+1 day");
		var d7 = Date.parse(" + 1 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+15d and variants", function () {
		this.d.add(15).days();
		var d2 = Date.parse("+15d");
		var d3 = Date.parse("+15 d");
		var d4 = Date.parse(" + 15 d");
		var d5 = Date.parse("+15day");
		var d6 = Date.parse("+15 day");
		var d7 = Date.parse(" + 15 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+100d and variants", function () {
		this.d.add(100).days();
		var d2 = Date.parse("+100d");
		var d3 = Date.parse("+100 d");
		var d4 = Date.parse(" + 100 d");
		var d5 = Date.parse("+100day");
		var d6 = Date.parse("+100 day");
		var d7 = Date.parse(" + 100 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+1m and variants", function () {
		this.d.add(1).months();
		var d2 = Date.parse("+1m");
		var d3 = Date.parse("+1 m");
		var d4 = Date.parse(" + 1 m");
		var d5 = Date.parse("+1month");
		var d6 = Date.parse("+1 month");
		var d7 = Date.parse(" + 1 month");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+15m and variants", function () {
		this.d.add(15).months();
		var d2 = Date.parse("+15m");
		var d3 = Date.parse("+15 m");
		var d4 = Date.parse(" + 15 m");
		var d5 = Date.parse("+15months");
		var d6 = Date.parse("+15 months");
		var d7 = Date.parse(" + 15 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+100d and variants", function () {
		this.d.add(100).months();
		var d2 = Date.parse("+100m");
		var d3 = Date.parse("+100 m");
		var d4 = Date.parse(" + 100 m");
		var d5 = Date.parse("+100months");
		var d6 = Date.parse("+100 months");
		var d7 = Date.parse(" + 100 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+1y and variants", function () {
		this.d.add(1).years();
		var d2 = Date.parse("+1y");
		var d3 = Date.parse("+1 y");
		var d4 = Date.parse(" + 1 y");
		var d5 = Date.parse("+1year");
		var d6 = Date.parse("+1 year");
		var d7 = Date.parse(" + 1 year");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+15y and variants", function () {
		this.d.add(15).years();
		var d2 = Date.parse("+15y");
		var d3 = Date.parse("+15 y");
		var d4 = Date.parse(" + 15 y");
		var d5 = Date.parse("+15years");
		var d6 = Date.parse("+15 years");
		var d7 = Date.parse(" + 15 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("+100d and variants", function () {
		this.d.add(100).years();
		var d2 = Date.parse("+100y");
		var d3 = Date.parse("+100 y");
		var d4 = Date.parse(" + 100 y");
		var d5 = Date.parse("+100years");
		var d6 = Date.parse("+100 years");
		var d7 = Date.parse(" + 100 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	
	// now swtich to minus with no t or today

	it("-", function () {
		this.d.add(-1).days();
		var d2 = Date.parse("-");
		expect(this.d.equals(d2)).toBe(true);
	});
	it("-1d and variants", function () {
		this.d.add(-1).days();
		var d2 = Date.parse("-1d");
		var d3 = Date.parse("-1 d");
		var d4 = Date.parse(" - 1 d");
		var d5 = Date.parse("-1day");
		var d6 = Date.parse("-1 day");
		var d7 = Date.parse(" - 1 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-15d and variants", function () {
		this.d.add(-15).days();
		var d2 = Date.parse("-15d");
		var d3 = Date.parse("-15 d");
		var d4 = Date.parse(" - 15 d");
		var d5 = Date.parse("-15day");
		var d6 = Date.parse("-15 day");
		var d7 = Date.parse(" - 15 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-100d and variants", function () {
		this.d.add(-100).days();
		var d2 = Date.parse("-100d");
		var d3 = Date.parse("-100 d");
		var d4 = Date.parse(" - 100 d");
		var d5 = Date.parse("-100day");
		var d6 = Date.parse("-100 day");
		var d7 = Date.parse(" - 100 day");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-1m and variants", function () {
		this.d.add(-1).months();
		var d2 = Date.parse("-1m");
		var d3 = Date.parse("-1 m");
		var d4 = Date.parse(" - 1 m");
		var d5 = Date.parse("-1month");
		var d6 = Date.parse("-1 month");
		var d7 = Date.parse(" - 1 month");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-15m and variants", function () {
		this.d.add(-15).months();
		var d2 = Date.parse("-15m");
		var d3 = Date.parse("-15 m");
		var d4 = Date.parse(" - 15 m");
		var d5 = Date.parse("-15months");
		var d6 = Date.parse("-15 months");
		var d7 = Date.parse(" - 15 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-100d and variants", function () {
		this.d.add(-100).months();
		var d2 = Date.parse("-100m");
		var d3 = Date.parse("-100 m");
		var d4 = Date.parse(" - 100 m");
		var d5 = Date.parse("-100months");
		var d6 = Date.parse("-100 months");
		var d7 = Date.parse(" - 100 months");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-1y and variants", function () {
		this.d.add(-1).years();
		var d2 = Date.parse("-1y");
		var d3 = Date.parse("-1 y");
		var d4 = Date.parse(" - 1 y");
		var d5 = Date.parse("-1year");
		var d6 = Date.parse("-1 year");
		var d7 = Date.parse(" - 1 year");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-15y and variants", function () {
		this.d.add(-15).years();
		var d2 = Date.parse("-15y");
		var d3 = Date.parse("-15 y");
		var d4 = Date.parse(" - 15 y");
		var d5 = Date.parse("-15years");
		var d6 = Date.parse("-15 years");
		var d7 = Date.parse(" - 15 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});
	it("-100y and variants", function () {
		this.d.add(-100).years();
		var d2 = Date.parse("-100y");
		var d3 = Date.parse("-100 y");
		var d4 = Date.parse(" - 100 y");
		var d5 = Date.parse("-100years");
		var d6 = Date.parse("-100 years");
		var d7 = Date.parse(" - 100 years");

		expect(this.d.equals(d2)).toBe(true);
		expect(this.d.equals(d3)).toBe(true);
		expect(this.d.equals(d4)).toBe(true);
		expect(this.d.equals(d5)).toBe(true);
		expect(this.d.equals(d6)).toBe(true);
		expect(this.d.equals(d7)).toBe(true);
	});

	// switch to smaller formats

	it("+5 second and variants", function () {
		var d1 = Date.parse("+5sec");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d1.getSeconds());
		var d2 = Date.parse("+5 sec");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d2.getSeconds());
		var d3 = Date.parse(" + 5 sec");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d3.getSeconds());
		var d4 = Date.parse("+5second");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d4.getSeconds());
		var d5 = Date.parse("+5 second");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d5.getSeconds());
		var d6 = Date.parse(" + 5 second");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d6.getSeconds());
		var d7 = Date.parse("+5seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d7.getSeconds());
		var d8 = Date.parse("+5 seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d8.getSeconds());
		var d9 = Date.parse(" + 5 seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d9.getSeconds());
		var d10 = Date.parse("+5Second");		
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d10.getSeconds());
		var d11 = Date.parse("+5 Second");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d11.getSeconds());
		var d12 = Date.parse(" + 5 Second");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d12.getSeconds());
		var d13 = Date.parse("+5Seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d13.getSeconds());
		var d14 = Date.parse("+5 Seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d14.getSeconds());
		var d15 = Date.parse(" + 5 Seconds");
		this.d = (new Date()).add(+5).seconds();
		expect(this.d.getSeconds()).toBe(d15.getSeconds());
	});
	it("-5 second and variants", function () {
		var d1 = Date.parse("-5sec");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d1.getSeconds());
		var d2 = Date.parse("-5 sec");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d2.getSeconds());
		var d3 = Date.parse(" - 5 sec");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d3.getSeconds());
		var d4 = Date.parse("-5second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d4.getSeconds());
		var d5 = Date.parse("-5 second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d5.getSeconds());
		var d6 = Date.parse(" - 5 second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d6.getSeconds());
		var d7 = Date.parse("-5seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d7.getSeconds());
		var d8 = Date.parse("-5 seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d8.getSeconds());
		var d9 = Date.parse(" - 5 seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d9.getSeconds());
		var d10 = Date.parse("-5Second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d10.getSeconds());
		var d11 = Date.parse("-5 Second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d11.getSeconds());
		var d12 = Date.parse(" - 5 Second");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d12.getSeconds());
		var d13 = Date.parse("-5Seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d13.getSeconds());
		var d14 = Date.parse("-5 Seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d14.getSeconds());
		var d15 = Date.parse(" - 5 Seconds");
		this.d = (new Date()).add(-5).seconds();
		expect(this.d.getSeconds()).toBe(d15.getSeconds());
	});

	it("+5 minute and variants", function () {
		this.d = (new Date()).add(5).minutes();
		var d2 = Date.parse("+5min");
		var d3 = Date.parse("+5 min");
		var d16 = Date.parse(" + 5 min");
		var d4 = Date.parse("+5minute");
		var d5 = Date.parse("+5 minute");
		var d6 = Date.parse(" + 5 minute");
		var d7 = Date.parse("+5minutes");
		var d8 = Date.parse("+5 minutes");
		var d9 = Date.parse(" + 5 minutes");
		var d10 = Date.parse("+5Minute");
		var d11 = Date.parse("+5 Minute");
		var d12 = Date.parse(" + 5 Minute");
		var d13 = Date.parse("+5Minutes");
		var d14 = Date.parse("+5 Minutes");
		var d15 = Date.parse(" + 5 Minutes");

		expect(this.d.getMinutes()).toBe(d2.getMinutes());
		expect(this.d.getMinutes()).toBe(d3.getMinutes());
		expect(this.d.getMinutes()).toBe(d4.getMinutes());
		expect(this.d.getMinutes()).toBe(d5.getMinutes());
		expect(this.d.getMinutes()).toBe(d6.getMinutes());
		expect(this.d.getMinutes()).toBe(d7.getMinutes());
		expect(this.d.getMinutes()).toBe(d8.getMinutes());
		expect(this.d.getMinutes()).toBe(d9.getMinutes());
		expect(this.d.getMinutes()).toBe(d10.getMinutes());
		expect(this.d.getMinutes()).toBe(d11.getMinutes());
		expect(this.d.getMinutes()).toBe(d12.getMinutes());
		expect(this.d.getMinutes()).toBe(d13.getMinutes());
		expect(this.d.getMinutes()).toBe(d14.getMinutes());
		expect(this.d.getMinutes()).toBe(d15.getMinutes());
		expect(this.d.getMinutes()).toBe(d16.getMinutes());
	});

	it("-5 minute and variants", function () {
		this.d = (new Date()).add(-5).minutes();
		var d2 = Date.parse("-5min");
		var d3 = Date.parse("-5 min");
		var d16 = Date.parse(" - 5 min");
		var d4 = Date.parse("-5minute");
		var d5 = Date.parse("-5 minute");
		var d6 = Date.parse(" - 5 minute");
		var d7 = Date.parse("-5minutes");
		var d8 = Date.parse("-5 minutes");
		var d9 = Date.parse(" - 5 minutes");
		var d10 = Date.parse("-5Minute");
		var d11 = Date.parse("-5 Minute");
		var d12 = Date.parse(" - 5 Minute");
		var d13 = Date.parse("-5Minutes");
		var d14 = Date.parse("-5 Minutes");
		var d15 = Date.parse(" - 5 Minutes");

		expect(this.d.getMinutes()).toBe(d2.getMinutes());
		expect(this.d.getMinutes()).toBe(d3.getMinutes());
		expect(this.d.getMinutes()).toBe(d4.getMinutes());
		expect(this.d.getMinutes()).toBe(d5.getMinutes());
		expect(this.d.getMinutes()).toBe(d6.getMinutes());
		expect(this.d.getMinutes()).toBe(d7.getMinutes());
		expect(this.d.getMinutes()).toBe(d8.getMinutes());
		expect(this.d.getMinutes()).toBe(d9.getMinutes());
		expect(this.d.getMinutes()).toBe(d10.getMinutes());
		expect(this.d.getMinutes()).toBe(d11.getMinutes());
		expect(this.d.getMinutes()).toBe(d12.getMinutes());
		expect(this.d.getMinutes()).toBe(d13.getMinutes());
		expect(this.d.getMinutes()).toBe(d14.getMinutes());
		expect(this.d.getMinutes()).toBe(d15.getMinutes());
		expect(this.d.getMinutes()).toBe(d16.getMinutes());
	});

	it("+5 hour and variants", function () {
		this.d = (new Date()).add(5).hours();
		var d2 = Date.parse("+5h");
		var d3 = Date.parse("+5 h");
		var d16 = Date.parse(" + 5 h");
		var d4 = Date.parse("+5hour");
		var d5 = Date.parse("+5 hour");
		var d6 = Date.parse(" + 5 hour");
		var d7 = Date.parse("+5hours");
		var d8 = Date.parse("+5 hours");
		var d9 = Date.parse(" + 5 hours");
		var d10 = Date.parse("+5Hour");
		var d11 = Date.parse("+5 Hour");
		var d12 = Date.parse(" + 5 Hour");
		var d13 = Date.parse("+5Hours");
		var d14 = Date.parse("+5 Hours");
		var d15 = Date.parse(" + 5 Hours");

		expect(this.d.getHours()).toBe(d2.getHours());
		expect(this.d.getHours()).toBe(d3.getHours());
		expect(this.d.getHours()).toBe(d4.getHours());
		expect(this.d.getHours()).toBe(d5.getHours());
		expect(this.d.getHours()).toBe(d6.getHours());
		expect(this.d.getHours()).toBe(d7.getHours());
		expect(this.d.getHours()).toBe(d8.getHours());
		expect(this.d.getHours()).toBe(d9.getHours());
		expect(this.d.getHours()).toBe(d10.getHours());
		expect(this.d.getHours()).toBe(d11.getHours());
		expect(this.d.getHours()).toBe(d12.getHours());
		expect(this.d.getHours()).toBe(d13.getHours());
		expect(this.d.getHours()).toBe(d14.getHours());
		expect(this.d.getHours()).toBe(d15.getHours());
		expect(this.d.getHours()).toBe(d16.getHours());
	});

	it("-5 hour and variants", function () {
		this.d = (new Date()).add(-5).hours();
		var d2 = Date.parse("-5h");
		var d3 = Date.parse("-5 h");
		var d16 = Date.parse(" - 5 h");
		var d4 = Date.parse("-5hour");
		var d5 = Date.parse("-5 hour");
		var d6 = Date.parse(" - 5 hour");
		var d7 = Date.parse("-5hours");
		var d8 = Date.parse("-5 hours");
		var d9 = Date.parse(" - 5 hours");
		var d10 = Date.parse("-5Hour");
		var d11 = Date.parse("-5 Hour");
		var d12 = Date.parse(" - 5 Hour");
		var d13 = Date.parse("-5Hours");
		var d14 = Date.parse("-5 Hours");
		var d15 = Date.parse(" - 5 Hours");

		expect(this.d.getHours()).toBe(d2.getHours());
		expect(this.d.getHours()).toBe(d3.getHours());
		expect(this.d.getHours()).toBe(d4.getHours());
		expect(this.d.getHours()).toBe(d5.getHours());
		expect(this.d.getHours()).toBe(d6.getHours());
		expect(this.d.getHours()).toBe(d7.getHours());
		expect(this.d.getHours()).toBe(d8.getHours());
		expect(this.d.getHours()).toBe(d9.getHours());
		expect(this.d.getHours()).toBe(d10.getHours());
		expect(this.d.getHours()).toBe(d11.getHours());
		expect(this.d.getHours()).toBe(d12.getHours());
		expect(this.d.getHours()).toBe(d13.getHours());
		expect(this.d.getHours()).toBe(d14.getHours());
		expect(this.d.getHours()).toBe(d15.getHours());
		expect(this.d.getHours()).toBe(d16.getHours());
	});

	it("+5 week and variants", function () {
		this.d = (new Date()).add(5).weeks();
		var d2 = Date.parse("+5w");
		var d3 = Date.parse("+5 w");
		var d16 = Date.parse(" + 5 w");
		var d4 = Date.parse("+5week");
		var d5 = Date.parse("+5 week");
		var d6 = Date.parse(" + 5 week");
		var d7 = Date.parse("+5weeks");
		var d8 = Date.parse("+5 weeks");
		var d9 = Date.parse(" + 5 weeks");
		var d10 = Date.parse("+5Week");
		var d11 = Date.parse("+5 Week");
		var d12 = Date.parse(" + 5 Week");
		var d13 = Date.parse("+5Weeks");
		var d14 = Date.parse("+5 Weeks");
		var d15 = Date.parse(" + 5 Weeks");

		expect(this.d.getWeek()).toBe(d2.getWeek());
		expect(this.d.getWeek()).toBe(d3.getWeek());
		expect(this.d.getWeek()).toBe(d4.getWeek());
		expect(this.d.getWeek()).toBe(d5.getWeek());
		expect(this.d.getWeek()).toBe(d6.getWeek());
		expect(this.d.getWeek()).toBe(d7.getWeek());
		expect(this.d.getWeek()).toBe(d8.getWeek());
		expect(this.d.getWeek()).toBe(d9.getWeek());
		expect(this.d.getWeek()).toBe(d10.getWeek());
		expect(this.d.getWeek()).toBe(d11.getWeek());
		expect(this.d.getWeek()).toBe(d12.getWeek());
		expect(this.d.getWeek()).toBe(d13.getWeek());
		expect(this.d.getWeek()).toBe(d14.getWeek());
		expect(this.d.getWeek()).toBe(d15.getWeek());
		expect(this.d.getWeek()).toBe(d16.getWeek());
	});

	it("-5 week and variants", function () {
		this.d = (new Date()).add(-5).weeks();
		var d2 = Date.parse("-5w");
		var d3 = Date.parse("-5 w");
		var d16 = Date.parse(" - 5 w");
		var d4 = Date.parse("-5week");
		var d5 = Date.parse("-5 week");
		var d6 = Date.parse(" - 5 week");
		var d7 = Date.parse("-5weeks");
		var d8 = Date.parse("-5 weeks");
		var d9 = Date.parse(" - 5 weeks");
		var d10 = Date.parse("-5Week");
		var d11 = Date.parse("-5 Week");
		var d12 = Date.parse(" - 5 Week");
		var d13 = Date.parse("-5Weeks");
		var d14 = Date.parse("-5 Weeks");
		var d15 = Date.parse(" - 5 Weeks");

		expect(this.d.getWeek()).toBe(d2.getWeek());
		expect(this.d.getWeek()).toBe(d3.getWeek());
		expect(this.d.getWeek()).toBe(d4.getWeek());
		expect(this.d.getWeek()).toBe(d5.getWeek());
		expect(this.d.getWeek()).toBe(d6.getWeek());
		expect(this.d.getWeek()).toBe(d7.getWeek());
		expect(this.d.getWeek()).toBe(d8.getWeek());
		expect(this.d.getWeek()).toBe(d9.getWeek());
		expect(this.d.getWeek()).toBe(d10.getWeek());
		expect(this.d.getWeek()).toBe(d11.getWeek());
		expect(this.d.getWeek()).toBe(d12.getWeek());
		expect(this.d.getWeek()).toBe(d13.getWeek());
		expect(this.d.getWeek()).toBe(d14.getWeek());
		expect(this.d.getWeek()).toBe(d15.getWeek());
		expect(this.d.getWeek()).toBe(d16.getWeek());
	});

});