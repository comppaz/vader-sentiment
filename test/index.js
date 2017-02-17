var chai = require('chai'),
    SentimentAnalyzer = require('../index'),
    sanitize = require('../sanitize');

chai.use(require('chai-fs'));
var should = chai.should();
var expect = chai.expect;
describe('#lexicon', function(){
	var sa = new SentimentAnalyzer();	
	it('file exists', function(){
		sa.getLexiconFile().should.be.a.file();
	});

	it('lexicon map created', function(){
		sa.lexicon.should.not.be.undefined;
		sa.lexicon.isEmpty().should.be.false;
	});

});

describe('#sanitization', function(){
    
    it('is array', function(){
	sanitize("'This is a test sentence awesome.").should.be.a.array; 
    });

    it('sanitizes text', function(){
	expect(sanitize("'This is a test sentence'")).to.deep.equal(['This', 'is', 'a', 'test', 'sentence']); 
    });

});
