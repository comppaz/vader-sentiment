var Immutable = require('immutable'),
	fs = require('fs'),
	readline = require('readline'),
	sanitize = require('./sanitize');

/**
 * SentimentAnalyzer - Constructor
 **/
var SentimentAnalyzer = function(lexicon_file){
	
	if(typeof lexicon_file === "undefined"){
		this.lexicon_file = 'vader_lexicon.txt';
	}else{
		this.lexicon_file = lexicon_file;
	}
	this.lexicon = undefined;
	this.lexiconToMap();

};

/**
 * Getter function for the lexicon file path.
 * 
 * @return String
 **/
SentimentAnalyzer.prototype.getLexiconFile = function(){
	
	return this.lexicon_file;

};

/**
 * Parse the lexicon txt file to an Immutable Map.
 * 
 * @return void
 **/
SentimentAnalyzer.prototype.lexiconToMap = function(){
	
	var arr = [];

	fs.readFileSync(this.lexicon_file).toString().split('\n').forEach(function(line){
		elements = line.trim().split('\t');
		arr.push([elements[0], parseFloat(elements[1])]);
	}.bind(this));
	
	this.lexicon = Immutable.Map(arr);
	
};

module.exports = SentimentAnalyzer;
