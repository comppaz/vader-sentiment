var PUNC_LIST = [".", "!", "?", ",", ";", ":", "-", "'", "\"",
             "!!", "!!!", "??", "???", "?!?", "!?!", "?!?!", "!?!?"];
/**
 * Cartesian Product of Arrays.
 *
 * @param arr Array e.g.: [[1,2], ['a']]
 * @return Array e.g.: [[1, 'a'],[2, 'a']]]
 **/
function cartesianProduct(arr){
    
	return arr.reduce(function(a,b){
        return a.map(function(x){
            return b.map(function(y){
                return x.concat(y);
            })
        }).reduce(function(a,b){ return a.concat(b) },[])
    }, [[]])

}

/**
 * Takes a piece of text, removes the punctuation and splits it up into words
 * Generates all combinations of the words with punctuation before and after the words.
 *
 * @param text String e.g.: 'This is a test.'
 * @return Object e.g.: {'?This' : 'This' ... }
 **/
function words_plus_punctuation(text){
	var punctuationless = text.replace(/[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]/g,"").replace(/\s{2,}/g," ");
	
	var words = punctuationless.split(' ');
	var result = {};	
	
	words = words.filter(function(el){
		return el.length > 1;
	});

	after = cartesianProduct([words, PUNC_LIST]);
	before = cartesianProduct([PUNC_LIST, words]);
	
	after.forEach(function(el){
		result[el.join('')] = el[0];	
	});

	before.forEach(function(el){
		result[el.join('')] = el[1];
	});
	
	return result;

};

/**
 * Sanitize Text from any punctuation.
 *
 * @param text String e.g.: 'This is a test.'
 * @return Array i.e.: ['This', 'is' , 'a', 'test']
 **/
module.exports = function sanitizeText(text){
	
	words = text.split(' ');
	wpp = words_plus_punctuation(text);
	
	words.forEach(function(el,idx){
		if(el.length > 1 && el in wpp){
			words[idx] = wpp[el];
		}
	});	
	
	return words;

}
