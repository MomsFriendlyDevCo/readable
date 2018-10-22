var expect = require('chai').expect;
var readable = require('..');

describe('readable.sizeOf()', function() {

	it('should calculate simple scalar sizes', ()=> {
		expect(readable.sizeOf(123)).to.equal(4);
		expect(readable.sizeOf('a')).to.equal(3);
		expect(readable.sizeOf({})).to.equal(2);
		expect(readable.sizeOf([])).to.equal(2);
		expect(readable.sizeOf([{}])).to.equal(6); // Not true but near enough
		expect(readable.sizeOf({foo: 'abc'})).to.equal(14);
		expect(readable.sizeOf([1, 2, 3])).to.equal(20);
	});

	it('should calculate UTF-8 character sizes when enabled', ()=> {
		expect(readable.sizeOf('🙂', {stringDeepScan: true})).to.equal(6);
		expect(readable.sizeOf('a🛆z', {stringDeepScan: true})).to.equal(8);
	});

	it('should calculate nested object sizes', ()=> {
		expect(readable.sizeOf([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.equal(68);
	});

});
