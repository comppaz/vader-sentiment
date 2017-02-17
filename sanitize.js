var PUNC_LIST = [".", "!", "?", ",", ";", ":", "-", "'", "\"",
             "!!", "!!!", "??", "???", "?!?", "!?!", "?!?!", "!?!?"];

function cartesianProduct(arr){
    return arr.reduce(function(a,b){
        return a.map(function(x){
            return b.map(function(y){
                return x.concat(y);
            })
        }).reduce(function(a,b){ return a.concat(b) },[])
    }, [[]])
}

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
