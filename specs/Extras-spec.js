/*globals require, describe, it, expect */
if (typeof process !== "undefined") {
	process.env.TZ = "America/Los_Angeles";
}
require("../index.js");

describe("Extras Module", function() {
	// var correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
	describe("has Normalization functions", function(){
		it("can substitute PHP Date formats to SimpleDateFormat", function () {
			var PHPFormat ="d/%d/dd/D/%a/j/l/%A/S/F/%B/m/%m/M/%b/%h/n/Y/%Y/y/%y/g/%I/G/h/H/%H/i/%M/s/%S/%r/%R/%T/%X/%x/%e/%D/%n/%t";
			var SimpleDateFormat = "dd/dd/dddd/ddd/ddd/dddd/dddd/dddd/S/MMMM/MMMM/MM/MM/MMM/MMM/MMM/M/yyyy/yyyy/yy/yy/h/h/H/hh/HH/HH/mm/mm/ss/ss/hh:mm tt/H:mm/H:mm:ss/t/d/d/MM/dd/yy/\\n/\\t";
			expect(Date.normalizeFormat(PHPFormat)).toBe(SimpleDateFormat);
		});
		it("can interpret PHP Date formats to calculated formats", function () {
			var PHPFormat ="d/%d/dd/D/%a/j/l/%A/S/F/%B/m/%m/M/%b/%h/n/Y/%Y/y/%y/g/%I/G/h/H/%H/i/%M/s/%S/%r/%R/%T/%X/%x/%e/%D/%n/%t";
			var SimpleDateFormat = "dd/dd/dddd/ddd/ddd/dddd/dddd/dddd/S/MMMM/MMMM/MM/MM/MMM/MMM/MMM/M/yyyy/yyyy/yy/yy/h/h/H/hh/HH/HH/mm/mm/ss/ss/hh:mm tt/H:mm/H:mm:ss/t/d/d/MM/dd/yy/\\n/\\t";
			expect(Date.normalizeFormat(PHPFormat)).toBe(SimpleDateFormat);
		});
	});
});