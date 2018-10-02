var expect = require('chai').expect;
var readable = require('..');

describe('readable.fileSize()', function() {

	it('should pass simple tests', ()=> {
		expect(readable.fileSize(1024)).to.equal("1kb");
		expect(readable.fileSize(1536)).to.equal("1.5kb");
		expect(readable.fileSize(1048576)).to.equal("1mb");
		expect(readable.fileSize(1073741824)).to.equal("1gb");
		expect(readable.fileSize(1288490188)).to.equal("1.2gb");
	});

});
