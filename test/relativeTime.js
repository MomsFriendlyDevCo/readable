var expect = require('chai').expect;
var moment = require('moment');
var readable = require('..');

describe('readable.relativeTime()', function() {

	it('should pass simple tests when given a date object', ()=> {
		expect(readable.relativeTime(new Date(Date.now() - 50))).to.equal('Just now');
		expect(readable.relativeTime(new Date(Date.now() - 50), {units: {milliseconds: true}})).to.be.oneOf(['50ms', '51ms']);
		expect(readable.relativeTime(new Date(Date.now() - 5000))).to.equal('5s');
		expect(readable.relativeTime(new Date(Date.now() - 60000))).to.equal('1m');
		expect(readable.relativeTime(new Date(Date.now() - 65000))).to.equal('1m5s');
	});

	it('should pass simple tests when given a millisecond value', ()=> {
		expect(readable.relativeTime(Date.now() - 50)).to.equal('Just now');
		expect(readable.relativeTime(Date.now() - 50, {units: {milliseconds: true}})).to.be.oneOf(['50ms', '51ms']);
		expect(readable.relativeTime(Date.now() - 5000)).to.equal('5s');
		expect(readable.relativeTime(Date.now() - 60000)).to.equal('1m');
		expect(readable.relativeTime(Date.now() - 65000)).to.equal('1m5s');
	});

	it('should pass simple tests when given a moment object', ()=> {
		expect(readable.relativeTime(moment().subtract(50, 'ms'))).to.equal('Just now');
		expect(readable.relativeTime(moment().subtract(50, 'ms'), {units: {milliseconds: true}})).to.be.oneOf(['50ms', '51ms']);
		expect(readable.relativeTime(moment().subtract(5, 's'))).to.equal('5s');
		expect(readable.relativeTime(moment().subtract(1, 'm'))).to.equal('1m');
		expect(readable.relativeTime(moment().subtract(1, 'm').subtract(5, 's'))).to.equal('1m5s');
		expect(readable.relativeTime(moment().subtract(1, 'w').subtract(2, 'd'))).to.equal('9D');
		expect(readable.relativeTime(moment().subtract(1, 'w').subtract(2, 'd'), {units: {weeks: true}})).to.equal('1W 2D');
		expect(readable.relativeTime(moment().subtract(1, 'y').subtract(3, 'd').subtract(2, 'w'), {units: {weeks: true}})).to.equal('1Y 3W 5D');
	});

});
