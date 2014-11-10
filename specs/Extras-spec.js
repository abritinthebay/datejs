/*globals require, describe, it, expect */
if (typeof process !== "undefined") {
	process.env.TZ = "America/Los_Angeles";
}
if (typeof require === "function") {
	require("../index.js");
}

describe("Extras Module", function(){
	var correctDate = new Date(1995, 11, 4, 0, 0, 0, 0);
	describe("Supports basic utilities", function(){
		it("has strtotime for String to Timestamp conversion", function () {
			var t = Date.strtotime("04/13/08");					// 1208070000
			var t2 = Date.strtotime("1970-01-01T00:00:00Z");	// 0
			expect(t).toBe(1208070000);
			expect(t2).toBe(0);
		});
		it("has strftime for UNIX style String formatting", function () {
			var d = Date.strftime("%m/%d/%y", correctDate);
			var d2 = Date.strftime("c", correctDate);
			expect(d).toBe("12/04/95");
			expect(d2).toBe("1995-12-04T08:00:00.000Z");
		});
		it("falls back to 'toString' with no format", function () {
			var str = correctDate._format(); // using underscore to test core func
			expect(str).toBe("Mon Dec 04 1995 00:00:00 GMT-0800 (PST)");
		});
	});
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