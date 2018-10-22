var expect = require('chai').expect;
var moment = require('moment');
var readable = require('..');

describe('readable.sizeOf()', function() {

	it('should calculate simple scalar sizes', ()=> {
		expect(readable.sizeOf(null)).to.equal(4);
		expect(readable.sizeOf(undefined)).to.equal(9);
		expect(readable.sizeOf(123)).to.equal(4);
		expect(readable.sizeOf(NaN)).to.equal(3);
		expect(readable.sizeOf('a')).to.equal(3);
		expect(readable.sizeOf('')).to.equal(2);
		expect(readable.sizeOf({})).to.equal(2);
		expect(readable.sizeOf([])).to.equal(2);
		expect(readable.sizeOf([{}])).to.equal(6); // Not true but near enough
		expect(readable.sizeOf({foo: 'abc'})).to.equal(14);
		expect(readable.sizeOf([1, 2, 3])).to.equal(20);
	});

	it('should fail gracefully when given invalid types', ()=> {
		expect(readable.sizeOf(new Date())).to.equal(70); // Dates expose a really weird toString() handler
		expect(readable.sizeOf(new Map())).to.equal(14); // Exposes as '[object Map]'
		expect(readable.sizeOf(new Set([1, 2, 3]))).to.equal(14); // Exposes as '[object Set]'
		expect(readable.sizeOf(moment())).to.equal(35); // Moments own weird string exposure function
		expect(readable.sizeOf(Infinity)).to.equal(4); // Should be a number
		expect(readable.sizeOf(Buffer.alloc(1))).to.equal(8);
	});

	it('should calculate UTF-8 character sizes when enabled', ()=> {
		expect(readable.sizeOf('🙂', {stringDeepScan: true})).to.equal(6);
		expect(readable.sizeOf('a🛆z', {stringDeepScan: true})).to.equal(8);
	});

	it('should calculate nested object sizes', ()=> {
		expect(readable.sizeOf([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.equal(68);
	});

});
