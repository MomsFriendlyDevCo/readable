var expect = require('chai').expect;
var readable = require('..');

describe('readable.fileSize()', function() {

	it('should pass simple tests', ()=> {
		expect(readable.fileSize(0)).to.equal("");
		expect(readable.fileSize(0, {formatters: {fallback: 'empty'}})).to.equal("empty");
		expect(readable.fileSize(1024)).to.equal("1kb");
		expect(readable.fileSize(1536)).to.equal("1.5kb");
		expect(readable.fileSize(1048576)).to.equal("1mb");
		expect(readable.fileSize(Math.pow(1024, 3))).to.equal("1tb");
		expect(readable.fileSize(1288490188)).to.equal("1.2tb");
	});

});
