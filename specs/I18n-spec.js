/*globals require, jasmine, describe, it, expect, spyOn */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
require("../build/development/date.js");
require("../src/i18n/de-DE.js");

describe("Internationalization Module", function() {
	it("can support other languages", function() {
		Date.i18n.setLanguage("de-DE");
		var d = Date.parse("31/Oktober/2013");
		expect(d.getDate()).toBe(31);
		expect(d.getMonth()).toBe(9);
		expect(d.getFullYear()).toBe(2013);
		expect(Date.i18n.__("Sunday")).toBe("Sonntag");
		expect(Date.getDayNumberFromName("Sonntag")).toBe(0);

	});
	it("defaults to US English when no other language is loaded", function() {
		// now force language to be null
		Date.i18n.setLanguage(null, true);
		Date.i18n.updateCultureInfo();
		expect(Date.i18n.__("Sunday")).toBe("Sunday");
		expect(Date.getDayNumberFromName("Sonntag")).toBe(-1);
		expect(Date.getDayNumberFromName("Sunday")).toBe(0);

	});
});