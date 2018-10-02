var expect = require('chai').expect;
var readable = require('..');

describe('readable.relativeTime()', function() {

	it('should pass simple tests', ()=> {
		expect(readable.relativeTime(new Date(Date.now() - 50))).to.equal("Just now");
		expect(readable.relativeTime(new Date(Date.now() - 50), {precision: 'ms'})).to.equal("50ms");
		expect(readable.relativeTime(new Date(Date.now() - 5000))).to.equal("5s");
		expect(readable.relativeTime(new Date(Date.now() - 60000))).to.equal("1m");
		expect(readable.relativeTime(new Date(Date.now() - 65000))).to.equal("1m5s");
	});

});
