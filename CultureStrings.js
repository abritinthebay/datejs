Date.CultureStrings = {
	/* Culture Name */
	name: "en-US", // country code
	englishName: "English (United States)", // Language name in English
	nativeName: "English (United States)", // Language name in native script.
	/* Day Name Strings */
	Sunday: "Sunday",
	Monday: "Monday",
	Tuesday: "Tuesday",
	Wednesday: "Wednesday",
	Thursday: "Thursday",
	Friday: "Friday",
	Saturday: "Saturday",
	Sun: "Sun",
	Mon: "Mon",
	Tue: "Tue",
	Wed: "Wed",
	Thu: "Thu",
	Fri: "Fri",
	Sat: "Sat",
	Su: "Su",
	Mo: "Mo",
	Tu: "Tu",
	We: "We",
	Th: "Th",
	Fr: "Fr",
	Sa: "Sa",
	S_Sun_Initial: "S",
	M_Mon_Initial: "M",
	T_Tue_Initial: "T",
	W_Wed_Initial: "W",
	T_Thu_Initial: "T",
	F_Fri_Initial: "F",
	S_Sat_Initial: "S",
	/* Month Name Strings */
	January: "January",
	February: "February",
	March: "March",
	April: "April",
	May: "May",
	June: "June",
	July: "July",
	August: "August",
	September: "September",
	October: "October",
	November: "November",
	December: "December",
	Jan_Abbr: "Jan",
	Feb_Abbr: "Feb",
	Mar_Abbr: "Mar",
	Apr_Abbr: "Apr",
	May_Abbr: "May",		// same in English, not in other languages tho.
	Jun_Abbr: "Jun",
	Jul_Abbr: "Jul",
	Aug_Abbr: "Aug",
	Sep_Abbr: "Sep",
	Oct_Abbr: "Oct",
	Nov_Abbr: "Nov",
	Dec_Abbr: "Dec",
	/* AM/PM Designators */
	AM: "AM",
	PM: "PM",

	/* Non-DST Timezones */
	LINT: "LINT",	// UTC +1400
	TOT: "TOT",		// UTC +1300
	CHAST: "CHAST",	// UTC +1245
	NZST: "NZST",	// UTC +1200
	NFT: "NFT",		// UTC +1130
	SBT: "SBT",		// UTC +1100
	AEST: "AEST",	// UTC +1000
	ACST: "ACST",	// UTC +0930
	JST: "JST",		// UTC +0900
	CWST: "CWST",	// UTC +0845
	CT: "CT",		// UTC +0800
	ICT: "ICT",		// UTC +0700
	MMT: "MMT",		// UTC +0630
	BIOT: "BST",	// UTC +0600
	NPT: "NPT",		// UTC +0545
	IST: "IST",		// UTC +0530
	PKT: "PKT",		// UTC +0500
	AFT: "AFT",		// UTC +0430
	MSK: "MSK",		// UTC +0400
	IRST: "IRST",	// UTC +0330
	FET: "FET",		// UTC +0300
	EET: "EET",		// UTC +0200
	CET: "CET",		// UTC +0100
	UTC: "UTC",		// UTC +000
	GMT: "GMT",		// UTC +000
	CVT: "CVT",		// UTC -0100
	GST: "GST",		// UTC -0200
	BRT: "BRT",		// UTC -0300
	NST: "NST",		// UTC -0330
	AST: "AST",		// UTC -0400
	EST: "EST",		// UTC -0500
	CST: "CST",		// UTC -0600
	MST: "MST",		// UTC -0700
	PST: "PST",		// UTC -0800
	AKST: "AKST",	// UTC -0900
	MIT: "MIT",		// UTC -0930
	HST: "HST",		// UTC -1000
	SST: "SST",		// UTC -1100
	BIT: "BIT",		// UTC -1200

	/* DST Timezones */
	CHADT: "CHADT",	// UTC +1345 ( +1245's Daylight Savings Time) 
	NZDT: "NZDT",	// UTC +1300 ( +1200's Daylight Savings Time) 
	AEDT: "AEDT",	// UTC +1100 ( +1000's Daylight Savings Time) 
	ACDT: "ACDT",	// UTC +1030 ( +0930's Daylight Savings Time) 
	AZST: "AZST",	// UTC +0500 ( +0400's Daylight Savings Time) 
	IRDT: "IRDT",	// UTC +0430 ( +0330's Daylight Savings Time) 
	EEST: "EEST",	// UTC +0300 ( +0200's Daylight Savings Time) 
	CEST: "CEST",	// UTC +0200 ( +0100's Daylight Savings Time) 
	BST: "BST",		// UTC +0100 ( -0000's Daylight Savings Time) 
	PMDT: "PMDT",	// UTC -0200 ( -0300's Daylight Savings Time) 
	ADT: "ADT",		// UTC -0300 ( -0400's Daylight Savings Time) 
	NDT: "NDT",		// UTC -0230 ( -0230's Daylight Savings Time) 
	EDT: "EDT",		// UTC -0400 ( -0500's Daylight Savings Time) 
	CDT: "CDT",		// UTC -0500 ( -0600's Daylight Savings Time)
	MDT: "MDT",		// UTC -0600 ( -0700's Daylight Savings Time)
	PDT: "PDT",		// UTC -0700 ( -0800's Daylight Savings Time)
	AKDT: "AKDT",	// UTC -0800 ( -0900's Daylight Savings Time)
	HADT: "HADT",	// UTC -0900 ( -1000's Daylight Savings Time)
	/* Misc */
	firstDayOfWeek: 0,
	twoDigitYearMax: 2029,
	/*
     * The dateElementOrder is based on the order of the 
     * format specifiers in the formatPatterns.DatePattern. 
     *
     * Example:
	 *   shortDatePattern    dateElementOrder
	 *   ------------------  ---------------- 
	 *   "M/d/yyyy"          "mdy"
	 *   "dd/MM/yyyy"        "dmy"
	 *   "yyyy-MM-dd"        "ymd"
     *
     * The correct dateElementOrder is required by the parser to
     * determine the expected order of the date elements in the
     * string being parsed.
     */
	"mdy": "mdy", //dateElementOrder

	/* Standard date and time format patterns */
	"M/d/yyyy": "M/d/yyyy",												//shortDate
	"dddd, MMMM dd, yyyy": "dddd, MMMM dd, yyyy",						//longDate
	"h:mm tt": "h:mm tt",												//shortTime
	"h:mm:ss tt": "h:mm:ss tt",											//longTime
	"dddd, MMMM dd, yyyy h:mm:ss tt": "dddd, MMMM dd, yyyy h:mm:ss tt",	//fullDateTime
	"yyyy-MM-ddTHH:mm:ss": "yyyy-MM-ddTHH:mm:ss",						//sortableDateTime
	"yyyy-MM-dd HH:mm:ssZ": "yyyy-MM-dd HH:mm:ssZ",						//universalSortableDateTime
	"ddd, dd MMM yyyy HH:mm:ss GMT": "ddd, dd MMM yyyy HH:mm:ss GMT",	//rfc1123
	"MMMM dd": "MMMM dd",												//monthDay
	"MMMM, yyyy": "MMMM, yyyy",											//yearMonth

	/* Regex Patterns
	 * NOTE: If a string format is not parsing correctly, but you would expect
	 * it to parse, the problem likely lies below.
	 *
	 * Beyond the month and day name patterns are natural language strings.
	 * Example: "next", "today", "months"
	 */
	/* Months */
	"/^jan(uary)?/i": /^jan(uary)?/i,			// January
	"/^feb(ruary)?/i": /^feb(ruary)?/i,			// February
	"/^mar(ch)?/i": /^mar(ch)?/i,				// March
	"/^apr(il)?/i": /^apr(il)?/i,				// April
	"/^may/i": /^may/i,							// May
	"/^jun(e)?/i": /^jun(e)?/i,					// June
	"/^jul(y)?/i": /^jul(y)?/i,					// July
	"/^aug(ust)?/i": /^aug(ust)?/i,				// August
	"/^sep(t(ember)?)?/i": /^sep(t(ember)?)?/i,	// September
	"/^oct(ober)?/i": /^oct(ober)?/i,			// October
	"/^nov(ember)?/i": /^nov(ember)?/i,			// November
	"/^dec(ember)?/i": /^dec(ember)?/i,			// December
	/* Days */
	"/^su(n(day)?)?/i": /^su(n(day)?)?/i,					// Sunday
	"/^mo(n(day)?)?/i": /^mo(n(day)?)?/i,					// Monday
	"/^tu(e(s(day)?)?)?/i": /^tu(e(s(day)?)?)?/i,			// Tuesday
	"/^we(d(nesday)?)?/i": /^we(d(nesday)?)?/i,				// Wednesday
	"/^th(u(r(s(day)?)?)?)?/i": /^th(u(r(s(day)?)?)?)?/i,	// Thurday
	"/^fr(i(day)?)?/i": /^fr(i(day)?)?/i,					// Friday
	"/^sa(t(urday)?)?/i": /^sa(t(urday)?)?/i,				// Saturday
	/* Relative Terms */
	"/^next/i": /^next/i,											// Future term(s) (ie, next) "next week"
	"/^last|past|prev(ious)?/i": /^last|past|prev(ious)?/i,			// Past term(s) (ie, last, previous, etc) "last tuesday"
	"/^(\\+|aft(er)?|from|hence)/i": /^(\+|aft(er)?|from|hence)/i,	// Additive terms(s) (ie, after) "two days from now"
	"/^(\\-|bef(ore)?|ago)/i": /^(\-|bef(ore)?|ago)/i,				// Subtractive term(s) (ie, before) "6 days ago"

		yesterday: /^yes(terday)?/i,
		today: /^t(od(ay)?)?/i,
		tomorrow: /^tom(orrow)?/i,
		now: /^n(ow)?/i,
		/* Time Related */
		millisecond: /^ms|milli(second)?s?/i,
		second: /^sec(ond)?s?/i,
		minute: /^mn|min(ute)?s?/i,
		hour: /^h(our)?s?/i,
		week: /^w(eek)?s?/i,
		month: /^m(onth)?s?/i,
		day: /^d(ay)?s?/i,
		year: /^y(ear)?s?/i,

		shortMeridian: /^(a|p)/i,
		longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
		timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
		ordinalSuffix: /^\s*(st|nd|rd|th)/i,
		timeContext: /^\s*(\:|a(?!u|p)|p)/i
};

/********************
 ** Future Strings **
 ********************
 * 
 * The following list of strings may not be currently being used, but 
 * may be incorporated into the Datejs library later. 
 *
 * We would appreciate any help translating the strings below.
 *
 * English Name        Translated
 * ------------------  -----------------
 * about               about
 * ago                 ago
 * date                date
 * time                time
 * calendar            calendar
 * show                show
 * hourly              hourly
 * daily               daily
 * weekly              weekly
 * bi-weekly           bi-weekly
 * fortnight           fortnight
 * monthly             monthly
 * bi-monthly          bi-monthly
 * quarter             quarter
 * quarterly           quarterly
 * yearly              yearly
 * annual              annual
 * annually            annually
 * annum               annum
 * again               again
 * between             between
 * after               after
 * from now            from now
 * repeat              repeat
 * times               times
 * per                 per
 * min (abbrev minute) min
 * morning             morning
 * noon                noon
 * night               night
 * midnight            midnight
 * mid-night           mid-night
 * evening             evening
 * final               final
 * future              future
 * spring              spring
 * summer              summer
 * fall                fall
 * winter              winter
 * end of              end of
 * end                 end
 * long                long
 * short               short
 */