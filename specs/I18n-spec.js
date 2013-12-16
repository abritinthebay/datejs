/*globals require, jasmine, describe, it, expect, spyOn */
require("../core/i18n.js");
require("../i18n/de-DE.js");

describe("Internationalization Module", function() {
	it("can support other languages", function() {
		expect(Date.i18n.__("Sunday")).toBe("Sonntag");
		expect(Date.getDayNumberFromName("Sonntag")).toBe(0);
	});
	it("defaults to US English when no other language is loaded", function() {
		// now reset to US english...
		Date.CultureStrings = undefined;
		Date.i18n.updateCultureInfo();
		expect(Date.i18n.__("Sunday")).toBe("Sunday");
		expect(Date.getDayNumberFromName("Sonntag")).toBe(-1);
		expect(Date.getDayNumberFromName("Sunday")).toBe(0);

	});
});