var _ = require('lodash');
var readable = module.exports = {};;

readable.defaults = {
	time: {
		units: {
			fallback:     'Just now',
			milliseconds: false,
			seconds:      true,
			minutes:      true,
			hours:        true,
			days:         true,
			weeks:        false,
			months:       false,
			years:        true,
		},
		formatters: {
			input:        v => _.isDate(v) ? Date.now() - v.getTime()
			                  : v.constructor.name == 'Moment' ? Date.now() - v.valueOf()
					  : Date.now() - v,
			milliseconds: v => `${v}ms`,
			seconds:      v => `${v}s`,
			minutes:      v => `${v}m`,
			hours:        v => `${v}h`,
			days:         v => `${v}D `,
			weeks:        v => `${v}W `,
			months:       v => `${v}M `,
			years:        v => `${v}Y `,
			combiner:     bits => bits.join('').replace(/\s+$/g, ''),
		},
		values: {
			milliseconds: 1,
			seconds:      1000,
			minutes:      1000 * 60,
			hours:        1000 * 60 * 60,
			days:         1000 * 60 * 60 * 24,
			weeks:        1000 * 60 * 60 * 24 * 7,
			months:       1000 * 60 * 60 * 24 * 30,
			years:        1000 * 60 * 60 * 24 * 356,
		},
	},
};


/**
* Show a readable relative time
* e.g. '1h2s'
*
* @param {number} diff The difference in milliseconds
* @param {Object} [options] Additional options to pass
*
* @example
* relativeTime(new Date(Date.now() - 50)) //= "Just now"
* relativeTime(new Date(Date.now() - 50), {precision: 'ms'}) //= "50ms"
* relativeTime(new Date(Date.now() - 5000)) //= "5s"
* relativeTime(new Date(Date.now() - 60000)) //= "1m"
* relativeTime(new Date(Date.now() - 65000)) //= "1m5s"
*/
readable.relativeTime = (diff, options) => {
	var settings = _.defaultsDeep(options, readable.defaults.time);
	diff = settings.formatters.input(diff);

	var result = Object.keys(settings.units)
		.filter(unit => settings.values[unit] && settings.units[unit])
		.map(unit => [unit, settings.values[unit]])
		.sort((a, b) => a[1] == b[1] ? 0 : a[1] > b[1] ? -1 : 1) // Sort decending
		.map(unit => unit[0])
		.reduce((ongoing, unit) => {
			var v = Math.floor(ongoing.value / settings.values[unit]);
			if (v > 0) {
				ongoing.bits.push(settings.formatters[unit](v));
				ongoing.value = ongoing.value - (v * settings.values[unit]);
			}
			return ongoing;
		}, {value: diff, bits: []})

	return result.bits.length ? settings.formatters.combiner(result.bits)
		: typeof settings.units.fallback == 'string' ? settings.units.fallback
		: settings.units.fallback(result.bits.value)
};


/**
* Show a readable file size
* e.g. '1.5kb'
*
* @param {number} bytes The bytes to format
*
* @example
* fileSize(1024) //= "1kb"
* fileSize(1536) //= "1.5kb"
* fileSize(1048576) //= "1mb"
* fileSize(1073741824) //= "1gb"
* fileSize(1288490188) //= "1.2gb"
*/
module.exports.fileSize = (bytes) => {
};
