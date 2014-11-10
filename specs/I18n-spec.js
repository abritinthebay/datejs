/*globals require, jasmine, describe, it, expect, spyOn */
if (typeof process !== "undefined") {
	process.env.TZ = 'America/Los_Angeles';
}
if (typeof require === "function") {
	require("../index.js");
}

var langList = ["af-ZA",
				"ar-AE",
				"ar-BH",
				"ar-DZ",
				"ar-EG",
				"ar-IQ",
				"ar-JO",
				"ar-KW",
				"ar-LB",
				"ar-LY",
				"ar-MA",
				"ar-OM",
				"ar-QA",
				"ar-SA",
				"ar-SY",
				"ar-TN",
				"ar-YE",
				"az-Cyrl-AZ",
				"az-Latn-AZ",
				"be-BY",
				"bg-BG",
				"bs-Latn-BA",
				"ca-ES",
				"cs-CZ",
				"cy-GB",
				"da-DK",
				"de-AT",
				"de-CH",
				"de-DE",
				"de-LI",
				"de-LU",
				"dv-MV",
				"el-GR",
				"en-029",
				"en-AU",
				"en-BZ",
				"en-CA",
				"en-GB",
				"en-IE",
				"en-JM",
				"en-NZ",
				"en-PH",
				"en-TT",
				"en-US",
				"en-ZA",
				"en-ZW",
				"es-AR",
				"es-BO",
				"es-CL",
				"es-CO",
				"es-CR",
				"es-DO",
				"es-EC",
				"es-ES",
				"es-GT",
				"es-HN",
				"es-MX",
				"es-NI",
				"es-PA",
				"es-PE",
				"es-PR",
				"es-PY",
				"es-SV",
				"es-UY",
				"es-VE",
				"et-EE",
				"eu-ES",
				"fa-IR",
				"fi-FI",
				"fo-FO",
				"fr-BE",
				"fr-CA",
				"fr-CH",
				"fr-FR",
				"fr-LU",
				"fr-MC",
				"gl-ES",
				"gu-IN",
				"he-IL",
				"hi-IN",
				"hr-BA",
				"hr-HR",
				"hu-HU",
				"hy-AM",
				"id-ID",
				"is-IS",
				"it-CH",
				"it-IT",
				"ja-JP",
				"ka-GE",
				"kk-KZ",
				"kn-IN",
				"ko-KR",
				"kok-IN",
				"ky-KG",
				"lt-LT",
				"lv-LV",
				"mi-NZ",
				"mk-MK",
				"mn-MN",
				"mr-IN",
				"ms-BN",
				"ms-MY",
				"mt-MT",
				"nb-NO",
				"nl-BE",
				"nl-NL",
				"nn-NO",
				"ns-ZA",
				"pa-IN",
				"pl-PL",
				"pt-BR",
				"pt-PT",
				"quz-BO",
				"quz-EC",
				"quz-PE",
				"ro-RO",
				"ru-RU",
				"sa-IN",
				"se-FI",
				"se-NO",
				"se-SE",
				"sk-SK",
				"sl-SI",
				"sma-NO",
				"sma-SE",
				"smj-NO",
				"smj-SE",
				"smn-FI",
				"sms-FI",
				"sq-AL",
				"sr-Cyrl-BA",
				"sr-Cyrl-CS",
				"sr-Latn-BA",
				"sr-Latn-CS",
				"sv-FI",
				"sv-SE",
				"sw-KE",
				"syr-SY",
				"ta-IN",
				"te-IN",
				"th-TH",
				"tn-ZA",
				"tr-TR",
				"tt-RU",
				"uk-UA",
				"ur-PK",
				"uz-Cyrl-UZ",
				"uz-Latn-UZ",
				"vi-VN",
				"xh-ZA",
				"zh-CN",
				"zh-HK",
				"zh-MO",
				"zh-SG",
				"zh-TW",
				"zu-ZA"];

describe("Internationalization Module", function() {
	describe("has " + langList.length + " supported languages", function() {
			var list = langList.slice(0); // clone array;
			var next;
			for (var i=0; i < langList.length; i++) {
				next = list.shift();
				it("loads " + next, function(done) {
					Date.i18n.setLanguage(next, false, function(){
						expect(Date.i18n.currentLanguage()).toBe(next);
						done();
					});
				});
			}
	});

	xit("can support parsing other languages", function(done) {
		// x'ing out atm as there are issues running this in phantom JS for... no obvious reason.
		// this is an async spec
		function cb(){
			setTimeout(function(){
				var d = Date.parse("31/Oktober/2013");
				expect(d).not.toBeNull();
				expect(d).not.toBeNaN();
				expect(d).not.toBeUndefined();
				if (d) {
					expect(d.getDate()).toBe(31);
					expect(d.getMonth()).toBe(9);
					expect(d.getFullYear()).toBe(2013);
				}
				expect(Date.i18n.__("Sunday")).toBe("Sonntag");
				expect(Date.getDayNumberFromName("Sonntag")).toBe(0);
				done();
			},0);
		}
		
		Date.i18n.setLanguage("de-DE",false, cb);
	});

	it("handles junk/invalid tags gracefully", function() {
		// now force language to be null
		var cfg = Date.Config;
		Date.Config = {};
		var langSet = Date.i18n.setLanguage("junk");
		expect(langSet).toBe(false);
		Date.Config = cfg;
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