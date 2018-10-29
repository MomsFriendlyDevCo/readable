var _ = require('lodash');
var expect = require('chai').expect;
var moment = require('moment');
var readable = require('..');

describe('readable.sizeOf()', ()=> {

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

	it('should calculate the size of circular recursion (simple)', ()=> {
		var foo = {foo: 'Foo!'};
		var bar = {bar: 'Bar!'};
		var test = foo;
		test.children = [foo, bar, bar, test];

		expect(readable.sizeOf(test, {circular: 2})).to.equal(58);
	});

});

describe('readable.sizeOf() - deep recursive structures', ()=> {

	var graph;
	before('create a complex graph', function() {
		this.timeout(60 * 1000);

		var foo = {foo: 'Foo!'};
		var bar = {bar: 'Bar!'};
		var baz = {baz: 'Baz!'};

		var mknode = (minChildren = 0, maxChildren = 10, childrenProb = 5) => {
			var base;
			switch (_.random(1, 3)) {
				case 1: base = foo; break;
				case 2: base = bar; break;
				case 3: base = baz; break;
			}

			if (childrenProb > 0 && _.random(0, 10) < childrenProb) {
				base.children = _.times(_.random(minChildren, maxChildren), ()=> mknode(minChildren = 0, maxChildren, childrenProb - 1));
			}

			return base;
		};

		graph = mknode(minChildren = 10, maxChildren = 100, childrenProb = 7);
	});

	it('should throw when circular recursion is disabled', ()=> {
		expect(()=> readable.sizeOf(graph, {circular: false})).to.throw;
	});

	it('should calculate the rough size of circular recursion', ()=> {
		var result = readable.sizeOf(graph, {circular: 2});
		expect(result).to.be.a('number');
		expect(result).to.be.above(10);
	});

});
