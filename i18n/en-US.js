/* 
 * DateJS Culture String File
 * Country Code: en-US
 * Name: English (United States)
 * Format: "key" : "value"
 * Key is the en-US term, Value is the Key in the current language.
 */
Date.CultureStrings = {
	"name": "en-US",
	"englishName": "English (United States)",
	"nativeName": "English (United States)",
	"Sunday": "Sunday",
	"Monday": "Monday",
	"Tuesday": "Tuesday",
	"Wednesday": "Wednesday",
	"Thursday": "Thursday",
	"Friday": "Friday",
	"Saturday": "Saturday",
	"Sun": "Sun",
	"Mon": "Mon",
	"Tue": "Tue",
	"Wed": "Wed",
	"Thu": "Thu",
	"Fri": "Fri",
	"Sat": "Sat",
	"Su": "Su",
	"Mo": "Mo",
	"Tu": "Tu",
	"We": "We",
	"Th": "Th",
	"Fr": "Fr",
	"Sa": "Sa",
	"S_Sun_Initial": "S",
	"M_Mon_Initial": "M",
	"T_Tue_Initial": "T",
	"W_Wed_Initial": "W",
	"T_Thu_Initial": "T",
	"F_Fri_Initial": "F",
	"S_Sat_Initial": "S",
	/* Month Name Strings */
	"January": "January",
	"February": "February",
	"March": "March",
	"April": "April",
	"May": "May",			// same in English, not in other languages tho.
	"June": "June",
	"July": "July",
	"August": "August",
	"September": "September",
	"October": "October",
	"November": "November",
	"December": "December",
	"Jan_Abbr": "Jan",
	"Feb_Abbr": "Feb",
	"Mar_Abbr": "Mar",
	"Apr_Abbr": "Apr",
	"May_Abbr": "May",
	"Jun_Abbr": "Jun",
	"Jul_Abbr": "Jul",
	"Aug_Abbr": "Aug",
	"Sep_Abbr": "Sep",
	"Oct_Abbr": "Oct",
	"Nov_Abbr": "Nov",
	"Dec_Abbr": "Dec",
	/* AM/PM Designators */
	"AM": "AM",
	"PM": "PM",
	"firstDayOfWeek": 0,
	"twoDigitYearMax": 2029,
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
	"M/d/yyyy": "M/d/yyyy",													//shortDate
	"dddd, MMMM dd, yyyy": "dddd, MMMM dd, yyyy",							//longDate
	"h:mm tt": "h:mm tt",													//shortTime
	"h:mm:ss tt": "h:mm:ss tt",												//longTime
	"dddd, MMMM dd, yyyy h:mm:ss tt": "dddd, MMMM dd, yyyy h:mm:ss tt",		//fullDateTime
	"yyyy-MM-ddTHH:mm:ss": "yyyy-MM-ddTHH:mm:ss",							//sortableDateTime
	"yyyy-MM-dd HH:mm:ssZ": "yyyy-MM-dd HH:mm:ssZ",							//universalSortableDateTime
	"ddd, dd MMM yyyy HH:mm:ss": "ddd, dd MMM yyyy HH:mm:ss",				//rfc1123 (GMT is added after parsing)
	"MMMM dd": "MMMM dd",													//monthDay
	"MMMM, yyyy": "MMMM, yyyy",												//yearMonth
	/* Regex Patterns
	 * NOTE: If a string format is not parsing correctly, but you would expect
	 * it to parse, the problem likely lies below.
	 *
	 * Beyond the month and day name patterns are natural language strings.
	 * Example: "next", "today", "months"
	 */
	/* Months */
	"^jan(uary)?": "^jan(uary)?",
	"^feb(ruary)?": "^feb(ruary)?",
	"^mar(ch)?": "^mar(ch)?",
	"^apr(il)?": "^apr(il)?",
	"^may": "^may",
	"^jun(e)?": "^jun(e)?",
	"^jul(y)?": "^jul(y)?",
	"^aug(ust)?": "^aug(ust)?",
	"^sep(t(ember)?)?": "^sep(t(ember)?)?",
	"^oct(ober)?": "^oct(ober)?",
	"^nov(ember)?": "^nov(ember)?",
	"^dec(ember)?": "^dec(ember)?",
	"^su(n(day)?)?": "^su(n(day)?)?",
	"^mo(n(day)?)?": "^mo(n(day)?)?",
	"^tu(e(s(day)?)?)?": "^tu(e(s(day)?)?)?",
	"^we(d(nesday)?)?": "^we(d(nesday)?)?",
	"^th(u(r(s(day)?)?)?)?": "^th(u(r(s(day)?)?)?)?",
	"^fr(i(day)?)?": "^fr(i(day)?)?",
	"^sa(t(urday)?)?": "^sa(t(urday)?)?",
	"^next": "^next",
	"^last|past|prev(ious)?": "^last|past|prev(ious)?",
	"^(\\+|aft(er)?|from|hence)": "^(\\+|aft(er)?|from|hence)",
	"^(\\-|bef(ore)?|ago)": "^(\\-|bef(ore)?|ago)",
	"^yes(terday)?": "^yes(terday)?",
	"^t(od(ay)?)?": "^t(od(ay)?)?",
	"^tom(orrow)?": "^tom(orrow)?",
	"^n(ow)?": "^n(ow)?",
	"^ms|milli(second)?s?": "^ms|milli(second)?s?",
	"^sec(ond)?s?": "^sec(ond)?s?",
	"^mn|min(ute)?s?": "^mn|min(ute)?s?",
	"^h(our)?s?": "^h(our)?s?",
	"^w(eek)?s?": "^w(eek)?s?",
	"^m(onth)?s?": "^m(onth)?s?",
	"^d(ay)?s?": "^d(ay)?s?",
	"^y(ear)?s?": "^y(ear)?s?",
	"^(a|p)": "^(a|p)",
	"^(a\\.?m?\\.?|p\\.?m?\\.?)": "^(a\\.?m?\\.?|p\\.?m?\\.?)",
	"^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\\s*(\\+|\\-)\\s*\\d\\d\\d\\d?)|gmt|utc)": "^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\\s*(\\+|\\-)\\s*\\d\\d\\d\\d?)|gmt|utc)",
	"^\\s*(st|nd|rd|th)": "^\\s*(st|nd|rd|th)",
	"^\\s*(\\:|a(?!u|p)|p)": "^\\s*(\\:|a(?!u|p)|p)",
	/* Non-DST Timezones */
	"LINT": "LINT",		// UTC +1400
	"TOT": "TOT",		// UTC +1300
	"CHAST": "CHAST",	// UTC +1245
	"NZST": "NZST",		// UTC +1200
	"NFT": "NFT",		// UTC +1130
	"SBT": "SBT",		// UTC +1100
	"AEST": "AEST",		// UTC +1000
	"ACST": "ACST",		// UTC +0930
	"JST": "JST",		// UTC +0900
	"CWST": "CWST",		// UTC +0845
	"CT": "CT",			// UTC +0800
	"ICT": "ICT",		// UTC +0700
	"MMT": "MMT",		// UTC +0630
	"BIOT": "BST",		// UTC +0600
	"NPT": "NPT",		// UTC +0545
	"IST": "IST",		// UTC +0530
	"PKT": "PKT",		// UTC +0500
	"AFT": "AFT",		// UTC +0430
	"MSK": "MSK",		// UTC +0400
	"IRST": "IRST",		// UTC +0330
	"FET": "FET",		// UTC +0300
	"EET": "EET",		// UTC +0200
	"CET": "CET",		// UTC +0100
	"UTC": "UTC",		// UTC +000
	"GMT": "GMT",		// UTC +000
	"CVT": "CVT",		// UTC -0100
	"GST": "GST",		// UTC -0200
	"BRT": "BRT",		// UTC -0300
	"NST": "NST",		// UTC -0330
	"AST": "AST",		// UTC -0400
	"EST": "EST",		// UTC -0500
	"CST": "CST",		// UTC -0600
	"MST": "MST",		// UTC -0700
	"PST": "PST",		// UTC -0800
	"AKST": "AKST",		// UTC -0900
	"MIT": "MIT",		// UTC -0930
	"HST": "HST",		// UTC -1000
	"SST": "SST",		// UTC -1100
	"BIT": "BIT",		// UTC -1200
	/* DST Timezones */
	"CHADT": "CHADT",	// UTC +1345 ( +1245's Daylight Savings Time) 
	"NZDT": "NZDT",		// UTC +1300 ( +1200's Daylight Savings Time) 
	"AEDT": "AEDT",		// UTC +1100 ( +1000's Daylight Savings Time) 
	"ACDT": "ACDT",		// UTC +1030 ( +0930's Daylight Savings Time)
	"AZST": "AZST",		// UTC +0500 ( +0400's Daylight Savings Time) 
	"IRDT": "IRDT",		// UTC +0430 ( +0330's Daylight Savings Time) 
	"EEST": "EEST",		// UTC +0300 ( +0200's Daylight Savings Time) 
	"CEST": "CEST",		// UTC +0200 ( +0100's Daylight Savings Time)
	"BST": "BST",		// UTC +0100 ( -0000's Daylight Savings Time) 
	"PMDT": "PMDT",		// UTC -0200 ( -0300's Daylight Savings Time) 
	"ADT": "ADT",		// UTC -0300 ( -0400's Daylight Savings Time)
	"NDT": "NDT",		// UTC -0230 ( -0230's Daylight Savings Time) 
	"EDT": "EDT",		// UTC -0400 ( -0500's Daylight Savings Time) 
	"CDT": "CDT",		// UTC -0500 ( -0600's Daylight Savings Time)
	"MDT": "MDT",		// UTC -0600 ( -0700's Daylight Savings Time)
	"PDT": "PDT",		// UTC -0700 ( -0800's Daylight Savings Time)
	"AKDT": "AKDT",		// UTC -0800 ( -0900's Daylight Savings Time)
	"HADT": "HADT"		// UTC -0900 ( -1000's Daylight Savings Time)
};