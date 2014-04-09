(function () {
	"use strict";
		var gFn = function (attr) {
			return function () {
				return this[attr];
			};
		};
		
		var sFn = function (attr) {
			return function (val) {
				this[attr] = val;
				return this;
			};
		};
	/* 
	 * new TimeSpan(milliseconds);
	 * new TimeSpan(days, hours, minutes, seconds);
	 * new TimeSpan(days, hours, minutes, seconds, milliseconds);
	 */
	var TimeSpan = function (days, hours, minutes, seconds, milliseconds) {
		var attrs = "days hours minutes seconds milliseconds".split(/\s+/);
		
		for (var i = 0; i < attrs.length ; i++) {
			var $a = attrs[i], $b = $a.slice(0, 1).toUpperCase() + $a.slice(1);
			TimeSpan.prototype[$a] = 0;
			TimeSpan.prototype["get" + $b] = gFn($a);
			TimeSpan.prototype["set" + $b] = sFn($a);
		}
		TimeSpan.prototype.set = function (days, hours, minutes, seconds, milliseconds){
			this.setDays(days || this.getDays());
			this.setHours(hours || this.getHours());
			this.setMinutes(minutes || this.getMinutes());
			this.setSeconds(seconds || this.getSeconds());
			this.setMilliseconds(milliseconds || this.getMilliseconds());
		};

		if (arguments.length === 1 && typeof days === "number") {
			var orient = (days < 0) ? -1 : +1;
			this.setMilliseconds(Math.abs(days));

			this.setDays(Math.floor(this.getMilliseconds() / 86400000) * orient);
			this.setMilliseconds(this.getMilliseconds() % 86400000);

			this.setHours(Math.floor(this.getMilliseconds() / 3600000) * orient);
			this.setMilliseconds(this.getMilliseconds() % 3600000);

			this.setMinutes(Math.floor(this.getMilliseconds() / 60000) * orient);
			this.setMilliseconds(this.getMilliseconds() % 60000);

			this.setSeconds(Math.floor(this.getMilliseconds() / 1000) * orient);
			this.setMilliseconds(this.getMilliseconds() % 1000);

			this.setMilliseconds(this.getMilliseconds() * orient);
		} else {
			this.set(days, hours, minutes, seconds, milliseconds);
		}

		this.getTotalMilliseconds = function () {
			return	(this.getDays() * 86400000) +
					(this.getHours() * 3600000) +
					(this.getMinutes() * 60000) +
					(this.getSeconds() * 1000);
		};
		
		this.compareTo = function (time) {
			var t1 = new Date(1970, 1, 1, this.getHours(), this.getMinutes(), this.getSeconds()), t2;
			if (time === null) {
				t2 = new Date(1970, 1, 1, 0, 0, 0);
			}
			else {
				t2 = new Date(1970, 1, 1, time.getHours(), time.getMinutes(), time.getSeconds());
			}
			return (t1 < t2) ? -1 : (t1 > t2) ? 1 : 0;
		};

		this.equals = function (time) {
			return (this.compareTo(time) === 0);
		};

		this.add = function (time) {
			return (time === null) ? this : this.addSeconds(time.getTotalMilliseconds() / 1000);
		};

		this.subtract = function (time) {
			return (time === null) ? this : this.addSeconds(-time.getTotalMilliseconds() / 1000);
		};

		this.addDays = function (n) {
			return new TimeSpan(this.getTotalMilliseconds() + (n * 86400000));
		};

		this.addHours = function (n) {
			return new TimeSpan(this.getTotalMilliseconds() + (n * 3600000));
		};

		this.addMinutes = function (n) {
			return new TimeSpan(this.getTotalMilliseconds() + (n * 60000));
		};

		this.addSeconds = function (n) {
			return new TimeSpan(this.getTotalMilliseconds() + (n * 1000));
		};

		this.addMilliseconds = function (n) {
			return new TimeSpan(this.getTotalMilliseconds() + n);
		};

		this.get12HourHour = function () {
			return (this.getHours() > 12) ? this.getHours() - 12 : (this.getHours() === 0) ? 12 : this.getHours();
		};

		this.getDesignator = function () {
			return (this.getHours() < 12) ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
		};

		this.toString = function (format) {
			this._toString = function () {
				if (this.getDays() !== null && this.getDays() > 0) {
					return this.getDays() + "." + this.getHours() + ":" + this.p(this.getMinutes()) + ":" + this.p(this.getSeconds());
				} else {
					return this.getHours() + ":" + this.p(this.getMinutes()) + ":" + this.p(this.getSeconds());
				}
			};
			
			this.p = function (s) {
				return (s.toString().length < 2) ? "0" + s : s;
			};
			
			var me = this;
			
			return format ? format.replace(/dd?|HH?|hh?|mm?|ss?|tt?/g,
			function (format) {
				switch (format) {
				case "d":
					return me.getDays();
				case "dd":
					return me.p(me.getDays());
				case "H":
					return me.getHours();
				case "HH":
					return me.p(me.getHours());
				case "h":
					return me.get12HourHour();
				case "hh":
					return me.p(me.get12HourHour());
				case "m":
					return me.getMinutes();
				case "mm":
					return me.p(me.getMinutes());
				case "s":
					return me.getSeconds();
				case "ss":
					return me.p(me.getSeconds());
				case "t":
					return ((me.getHours() < 12) ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator).substring(0, 1);
				case "tt":
					return (me.getHours() < 12) ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
				}
			}
			) : this._toString();
		};
		return this;
	};

	/**
	 * Gets the time of day for this date instances. 
	 * @return {TimeSpan} TimeSpan
	 */
	Date.prototype.getTimeOfDay = function () {
		return new TimeSpan(0, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
	};

	/* 
	 * TimePeriod(startDate, endDate);
	 * TimePeriod(years, months, days, hours, minutes, seconds, milliseconds);
	 */
	var attrs = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
	var timePeriodSet = function (years, months, days, hours, minutes, seconds, milliseconds){
		this.setYears(years || this.getYears());
		this.setMonths(months || this.getMonths());
		this.setDays(days || this.getDays());
		this.setHours(hours || this.getHours());
		this.setMinutes(minutes || this.getMinutes());
		this.setSeconds(seconds || this.getSeconds());
		this.setMilliseconds(milliseconds || this.getMilliseconds());
	};
	var setMonthsAndYears = function (orient, d1, d2, context) {
		function inc() {
			d1.addMonths(-orient);
			context.months++;
			if (context.months === 12) {
				context.years++;
				context.months = 0;
			}
		}
		if (orient === +1) {
			while (d1 > d2) {
				inc();
			}
		} else {
			while (d1 < d2) {
				inc();
			}
		}
		context.months--;
		context.months *= orient;
		context.years *= orient;
	};
	var checkForDST = function(orient, startDate, endDate) {
		var hasDSTMismatch = (false === (startDate.isDaylightSavingTime() === endDate.isDaylightSavingTime()));
		if (hasDSTMismatch && orient === 1) {
			startDate.addHours(-1);
		} else if (hasDSTMismatch) {
			startDate.addHours(1);
		}
	};

	var TimePeriod = function (years, months, days, hours, minutes, seconds, milliseconds) {
		for (var i = 0; i < attrs.length ; i++) {
			var $a = attrs[i], $b = $a.slice(0, 1).toUpperCase() + $a.slice(1);
			TimePeriod.prototype[$a] = 0;
			TimePeriod.prototype["get" + $b] = gFn($a);
			TimePeriod.prototype["set" + $b] = sFn($a);
		}
		TimePeriod.prototype.set = timePeriodSet;

		if (arguments.length === 7) {
			this.set(years, months, days, hours, minutes, seconds, milliseconds);
		} else if (arguments.length === 2 &&
			arguments[0] instanceof Date &&
			arguments[1] instanceof Date) {
			// TODO - add closure/some form of encapsulating original dates.
			// startDate and endDate as arguments
			var startDate = arguments[0].clone();
			var endDate = arguments[1].clone();
			var orient = (startDate > endDate) ? +1 : -1;
			this.dates = {
				start: arguments[0].clone(),
				end: arguments[1].clone()
			};

			setMonthsAndYears(orient, startDate, endDate, this);
			checkForDST(orient, startDate, endDate);
			// // TODO - adjust for DST
			var diff = endDate - startDate;
			if (diff !== 0) {
				var ts = new TimeSpan(diff);
				this.set(this.years, this.months, ts.getDays(), ts.getHours(), ts.getMinutes(), ts.getSeconds(), ts.getMilliseconds());
			}
		}
		return this;
	};

	Date.TimeSpan = TimeSpan;
	Date.TimeSpan = TimePeriod;

	if (window) {
		// keeping API compatible for v1.x 
		window.TimeSpan = TimeSpan;
		window.TimePeriod = TimePeriod;
	}
}());