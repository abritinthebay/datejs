/*globals require, jasmine, describe, it, expect, spyOn */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
if (typeof require === "function") {
	require("../index.js");
}

describe("ISO 8601 Date Parser", function() {
	var correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
	var $P = Date.Parsing;
	it("should return a Date object for valid ISO Date", function() {
		var d = $P.ISO.parse("1995-12-04");
		expect(d instanceof Date).toEqual(true);
	});
	it("should return null for invalid ISO Date", function() {
		var d = $P.ISO.parse("notarealISOdate");
		expect(d).toBeNull();
	});
	it("should call processTimeObject method when has valid ISO Date", function() {
		spyOn($P, "processTimeObject");
		$P.ISO.parse("1995-12-04");
		expect($P.processTimeObject).toHaveBeenCalled();
	});
	it("should not call processTimeObject method when invalid ISO Date", function() {
		spyOn($P, "processTimeObject");
		$P.ISO.parse("notarealISOdate");
		expect($P.processTimeObject).not.toHaveBeenCalled();
	});
	it("should pass processTimeObject an object with at least a year property", function() {
		spyOn($P, "processTimeObject");
		$P.ISO.parse("1995-12-04");
		var x = $P.processTimeObject.calls.mostRecent().args[0];
		expect($P.processTimeObject).toHaveBeenCalled();
		expect(x).toEqual(jasmine.any(Object));
		expect(x.year).toBeDefined();
	});

	describe("should parse the following", function() {
		describe("date formats", function() {
			it("1995", function() {
				correctDate.setMonth(0);
				correctDate.setDate(1);
				var d = Date.parse("1995");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12", function() {
				correctDate.setMonth(11);
				var d = Date.parse("1995-12");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04", function() {
				correctDate.setMonth(11);
				correctDate.setDate(4);
				var d = Date.parse("1995-12-04");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("19951204", function() {
				correctDate.setMonth(11);
				correctDate.setDate(4);
				var d = Date.parse("19951204");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
		});

		describe("time formats", function() {
			it("1995-12T13", function() {
				correctDate = new Date(1995, 11, 1, 13, 0, 0, 0);
				var d = Date.parse("1995-12T13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12T13:30", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 0, 0);
				var d = Date.parse("1995-12T13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12T13:30:30", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 30, 0);
				var d = Date.parse("1995-12T13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12T13:30:30.255", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 30, 255);
				var d = Date.parse("1995-12T13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12 13", function() {
				correctDate = new Date(1995, 11, 1, 13, 0, 0, 0);
				var d = Date.parse("1995-12 13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12 13:30", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 0, 0);
				var d = Date.parse("1995-12 13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12 13:30:30", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 30, 0);
				var d = Date.parse("1995-12 13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12 13:30:30.255", function() {
				correctDate = new Date(1995, 11, 1, 13, 30, 30, 255);
				var d = Date.parse("1995-12T13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13", function() {
				correctDate = new Date(1995, 11, 4, 13, 0, 0, 0);
				var d = Date.parse("1995-12-04T13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13", function() {
				var d = Date.parse("1995-12-04 13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30", function() {
			correctDate = new Date(1995, 11, 4, 13, 30, 0, 0);
				var d = Date.parse("1995-12-04T13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30", function() {
				var d = Date.parse("1995-12-04 13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13.5", function() {
				var d = Date.parse("1995-12-04T13.5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13.5", function() {
				var d = Date.parse("1995-12-04 13.5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13,5", function() {
				var d = Date.parse("1995-12-04T13,5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13,5", function() {
				var d = Date.parse("1995-12-04 13,5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30:30", function() {
				correctDate = new Date(1995, 11, 4, 13, 30, 30, 0);
				var d = Date.parse("1995-12-04T13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30", function() {
				var d = Date.parse("1995-12-04 13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("19951204T133030", function() {
				var d = Date.parse("19951204T133030");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30.5", function() {
				var d = Date.parse("1995-12-04T13:30.5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30.5", function() {
				var d = Date.parse("1995-12-04 13:30.5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30,5", function() {
				var d = Date.parse("1995-12-04T13:30,5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30,5", function() {
				var d = Date.parse("1995-12-04 13:30,5");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30:30.255", function() {
				correctDate = new Date(1995, 11, 4, 13, 30, 30, 255);
				var d = Date.parse("1995-12-04T13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255", function() {
				var d = Date.parse("1995-12-04 13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30:30,255", function() {
				correctDate = new Date(1995, 11, 4, 13, 30, 30, 255);
				var d = Date.parse("1995-12-04T13:30:30,255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30,255", function() {
				var d = Date.parse("1995-12-04 13:30:30,255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
		});

		describe("timezone formats", function() {
			it("1995-12-04T13:30:30.255Z", function() {
				correctDate.setUTCHours(13);
				correctDate.setUTCDate(4);
				var d = Date.parse("1995-12-04T13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255Z", function() {
				var d = Date.parse("1995-12-04 13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30:30.255 Z", function() {
				var d = Date.parse("1995-12-04T13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255 Z", function() {
				var d = Date.parse("1995-12-04 13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("19951204T133030Z", function() {
				correctDate.setMilliseconds(0);
				var d = Date.parse("19951204T133030Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("19951204T133030.255Z", function() {
				correctDate.setMilliseconds(255);
				var d = Date.parse("19951204T133030.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255+00:00", function() {
				var d = Date.parse("1995-12-04 13:30:30.255+00:00");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255+01:00", function() {
				correctDate.setUTCHours(12);
				var d = Date.parse("1995-12-04 13:30:30.255+01:00");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255+01", function() {
				correctDate.setUTCHours(12);
				var d = Date.parse("1995-12-04 13:30:30.255+01");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255-05:00", function() {
				correctDate.setUTCHours(18);
				var d = Date.parse("1995-12-04 13:30:30.255-05:00");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04 13:30:30.255-05", function() {
				var d = Date.parse("1995-12-04 13:30:30.255-05");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-12-04T13:30:30,255-05:00", function() {
				var d = Date.parse("1995-12-04 13:30:30.255-05");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
		});

		describe("week formats", function() {
			it("1995-W49", function() {
				correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
				var d = Date.parse("1995-W49-1");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1", function() {
				var d = Date.parse("1995-W49-1");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W491", function() {
				var d = Date.parse("1995-W491");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995W491", function() {
				var d = Date.parse("1995W491");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("2004-W53-6", function() {
				// years can have 53 weeks! (per iso spec for weeks)
				correctDate = new Date(2005, 0, 1, 0, 0, 0, 0);
				var d = Date.parse("2004-W53-6");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13", function() {
				correctDate = new Date(1995, 11, 4, 13, 0, 0, 0);
				var d = Date.parse("1995-W49-1T13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13", function() {
				var d = Date.parse("1995-W49-1 13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13:30", function() {
				correctDate.setMinutes(30);
				var d = Date.parse("1995-W49-1T13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13:30", function() {
				var d = Date.parse("1995-W49-1 13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13:30:30", function() {
				correctDate.setSeconds(30);
				var d = Date.parse("1995-W49-1T13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13:30:30", function() {
				var d = Date.parse("1995-W49-1 13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13:30:30.255", function() {
				correctDate.setMilliseconds(255);
				var d = Date.parse("1995-W49-1T13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13:30:30.255", function() {
				var d = Date.parse("1995-W49-1 13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13:30:30.255Z", function() {
				correctDate.setUTCHours(13);
				correctDate.setUTCDate(4);
				var d = Date.parse("1995-W49-1T13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13:30:30.255Z", function() {
				var d = Date.parse("1995-W49-1 13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1T13:30:30.255 Z", function() {
				var d = Date.parse("1995-W49-1T13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-W49-1 13:30:30.255 Z", function() {
				var d = Date.parse("1995-W49-1 13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
		});
		describe("ordinal formats", function() {
			it("1995-338", function() {
				correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
				var d = Date.parse("1995-338");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995338", function() {
				correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
				var d = Date.parse("1995338");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13", function() {
				correctDate.setHours(13);
				var d = Date.parse("1995-338T13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13", function() {
				var d = Date.parse("1995-338 13");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13:30", function() {
				correctDate.setMinutes(30);
				var d = Date.parse("1995-338T13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13:30", function() {
				var d = Date.parse("1995-338 13:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13:30:30", function() {
				correctDate.setSeconds(30);
				var d = Date.parse("1995-338T13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13:30:30", function() {
				var d = Date.parse("1995-338 13:30:30");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13:30:30.255", function() {
				correctDate.setMilliseconds(255);
				var d = Date.parse("1995-338T13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13:30:30.255", function() {
				var d = Date.parse("1995-338 13:30:30.255");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13:30:30.255Z", function() {
				correctDate = new Date(1995, 11, 4, 13, 30, 30, 255);
				correctDate.setUTCHours(13);
				var d = Date.parse("1995-338T13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13:30:30.255Z", function() {
				var d = Date.parse("1995-338 13:30:30.255Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338T13:30:30.255 Z", function() {
				var d = Date.parse("1995-338T13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
			it("1995-338 13:30:30.255 Z", function() {
				var d = Date.parse("1995-338 13:30:30.255 Z");
				expect(d.getTime()).toEqual(correctDate.getTime());
			});
		});
	});
});